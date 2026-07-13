import nodemailer from 'nodemailer';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function parseBody(req) {
  if (!req.body) return {};

  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }

  return req.body;
}

function getSmtpErrorMessage(error) {
  const message = error?.message || '';

  if (error?.code === 'EAUTH' || error?.responseCode === 534 || message.includes('Application-specific password required')) {
    return 'Falha na autenticação SMTP. Para Gmail, use uma senha de aplicativo (App Password).';
  }

  if (error?.code === 'ECONNECTION' || error?.code === 'ETIMEDOUT' || message.includes('ECONN')) {
    return 'Não foi possível conectar ao servidor SMTP. Verifique o host e a porta.';
  }

  return 'Erro interno ao enviar e-mail. Verifique as configurações SMTP.';
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido. Use POST.' });
  }

  const body = parseBody(req);
  const name = String(body.name || '').trim();
  const email = String(body.email || '').trim();
  const company = String(body.company || '').trim();
  const message = String(body.message || '').trim();
  const recaptchaToken = String(body.recaptchaToken || body.token || '').trim();

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Campos obrigatórios ausentes.' });
  }

  const isLocalDevelopment = process.env.NODE_ENV !== 'production';
  const shouldSkipRecaptcha = isLocalDevelopment && (!recaptchaToken || recaptchaToken === 'dummy');

  if (!shouldSkipRecaptcha && !recaptchaToken) {
    return res.status(400).json({ error: 'Por favor, complete o reCAPTCHA.' });
  }

  if (!EMAIL_REGEX.test(email)) {
    return res.status(400).json({ error: 'E-mail inválido.' });
  }

  const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
  if (!recaptchaSecret) {
    return res.status(500).json({ error: 'Chave secreta do reCAPTCHA não configurada.' });
  }

  if (!shouldSkipRecaptcha) {
    try {
      const recaptchaResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `secret=${encodeURIComponent(recaptchaSecret)}&response=${encodeURIComponent(recaptchaToken)}`,
      });

      const recaptchaData = await recaptchaResponse.json();
      if (!recaptchaData.success) {
        console.error('reCAPTCHA falhou:', recaptchaData);
        return res.status(400).json({ error: 'Verificação reCAPTCHA falhou.' });
      }
    } catch (error) {
      console.error('Erro ao validar reCAPTCHA:', error);
      return res.status(502).json({ error: 'Erro ao validar reCAPTCHA.' });
    }
  }

  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = parseInt(process.env.SMTP_PORT || '465', 10);
  const smtpSecure = process.env.SMTP_SECURE === 'true';
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const mailTo = process.env.MAIL_TO;

  if (!smtpHost || !smtpPort || !smtpUser || !smtpPass || !mailTo) {
    return res.status(500).json({ error: 'Configuração SMTP incompleta.' });
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpSecure,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  const htmlBody = `
    <div style="font-family:Arial,sans-serif;color:#111;line-height:1.6;">
      <h2>Nova mensagem de contato</h2>
      <p><strong>Nome:</strong> ${name}</p>
      <p><strong>E-mail:</strong> ${email}</p>
      ${company ? `<p><strong>Empresa:</strong> ${company}</p>` : ''}
      <p><strong>Mensagem:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: smtpUser,
      to: mailTo,
      subject: `Nova mensagem de contato - ${name}`,
      html: htmlBody,
      replyTo: email,
    });

    return res.status(200).json({ success: true, message: 'Mensagem enviada com sucesso!' });
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
    return res.status(500).json({ error: getSmtpErrorMessage(error) });
  }
}
