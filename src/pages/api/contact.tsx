import nodemailer from "nodemailer";

export default async function handler(req, res) {
    if (req.method !== "POST") return res.status(405).end();

    const { name, email, company, message, token } = req.body;

    // Valida o reCAPTCHA
    const recaptchaRes = await fetch(
        `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
        { method: "POST" }
    );
    const recaptchaData = await recaptchaRes.json();

    if (!recaptchaData.success) {
        return res.status(403).json({ success: false, error: "Falha reCAPTCHA" });
    }

    // Configurar o SMTP
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: Boolean(process.env.SMTP_SECURE),
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    try {
        await transporter.sendMail({
            from: `"Site Kaben" <${process.env.SMTP_USER}>`,
            to: process.env.MAIL_TO,
            subject: "Novo contato do site",
            html: `
        <h3>Nova mensagem de contato</h3>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Empresa:</strong> ${company}</p>
        <p><strong>Mensagem:</strong><br/>${message}</p>
      `,
        });

        return res.status(200).json({ success: true });
    } catch (e) {
        return res.status(500).json({ success: false });
    }
}
