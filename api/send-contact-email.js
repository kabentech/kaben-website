import nodemailer from 'nodemailer';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Rate limiting: Map para armazenar tentativas por IP
// Estrutura: { ip: { count: number, resetTime: timestamp } }
const rateLimitStore = new Map();
const RATE_LIMIT_WINDOW = 3600000; // 1 hora em ms
const MAX_REQUESTS_PER_HOUR = 5;

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

// Escapa caracteres HTML para evitar XSS
function escapeHtml(text) {
  const htmlEscapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  };
  return text.replace(/[&<>"']/g, (char) => htmlEscapeMap[char]);
}

// Obtém IP do cliente (suporta proxies como Vercel)
function getClientIp(req) {
  return (
    req.headers['x-forwarded-for']?.split(',')[0] ||
    req.headers['x-real-ip'] ||
    req.socket?.remoteAddress ||
    'unknown'
  ).trim();
}

// Valida rate limit por IP
function checkRateLimit(ip) {
  const now = Date.now();
  const limitData = rateLimitStore.get(ip);

  if (!limitData) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return { allowed: true, remaining: MAX_REQUESTS_PER_HOUR - 1 };
  }

  if (now > limitData.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return { allowed: true, remaining: MAX_REQUESTS_PER_HOUR - 1 };
  }

  if (limitData.count >= MAX_REQUESTS_PER_HOUR) {
    return {
      allowed: false,
      remaining: 0,
      resetTime: limitData.resetTime,
    };
  }

  limitData.count += 1;
  return {
    allowed: true,
    remaining: MAX_REQUESTS_PER_HOUR - limitData.count,
  };
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

function getRateLimitErrorMessage(resetTime) {
  const minutesRemaining = Math.ceil((resetTime - Date.now()) / 60000);
  return `Muitas tentativas. Tente novamente em ${minutesRemaining} minuto(s).`;
}

export default async function handler(req, res) {
  // Headers de segurança
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Content-Type', 'application/json');

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido. Use POST.' });
  }

  // Validar rate limit
  const clientIp = getClientIp(req);
  const rateLimitCheck = checkRateLimit(clientIp);

  if (!rateLimitCheck.allowed) {
    return res.status(429).json({
      error: getRateLimitErrorMessage(rateLimitCheck.resetTime),
    });
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

      // Validar score reCAPTCHA v3 (threshold: 0.5)
      // Score próximo a 1: humano confiável
      // Score próximo a 0: provável bot
      const SCORE_THRESHOLD = 0.5;
      if (typeof recaptchaData.score === 'number' && recaptchaData.score < SCORE_THRESHOLD) {
        console.warn(`reCAPTCHA score baixo (${recaptchaData.score}), rejeitando`, {
          ip: clientIp,
          email,
        });
        return res.status(400).json({
          error: 'Validação falhou. Tente novamente em alguns momentos.',
        });
      }

      // Log para analytics (opcional: pode ser salvo em DB)
      console.log('reCAPTCHA validado', {
        score: recaptchaData.score,
        action: recaptchaData.action,
        ip: clientIp,
        email,
      });
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

  // Escapa HTML para evitar XSS
  const escapedName = escapeHtml(name);
  const escapedCompany = escapeHtml(company);
  const escapedMessage = escapeHtml(message);

  const htmlBody = `
    <div style="font-family:Arial,sans-serif;color:#111;line-height:1.6;">
      <h2>Nova mensagem de contato</h2>
      <p><strong>Nome:</strong> ${escapedName}</p>
      <p><strong>E-mail:</strong> ${email}</p>
      ${escapedCompany ? `<p><strong>Empresa:</strong> ${escapedCompany}</p>` : ''}
      <p><strong>Mensagem:</strong></p>
      <p>${escapedMessage.replace(/\n/g, '<br>')}</p>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: smtpUser,
      to: mailTo,
      subject: `Nova mensagem de contato - ${escapedName}`,
      html: htmlBody,
      replyTo: email,
    });

    return res.status(200).json({ success: true, message: 'Mensagem enviada com sucesso!' });
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
    return res.status(500).json({ error: getSmtpErrorMessage(error) });
  }
}
