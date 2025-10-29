import React, { useState } from 'react';
import { motion } from 'framer-motion';
// import nodemailer from "nodemailer";
import { GoogleReCaptcha, GoogleReCaptchaProvider, useGoogleReCaptcha } from "react-google-recaptcha-v3";

export default function Contact() {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [canSend, setCanSend] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    const filled = form.name && form.email && form.company && form.message;
    if (filled) setCanSend(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");

    if (!executeRecaptcha) {
      setErrorMsg("Erro ao carregar validação.");
      setLoading(false);
      return;
    }

    const token = await executeRecaptcha("contactForm");

    // Valida o reCAPTCHA
    const recaptchaRes = await fetch(
        `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
        { method: "POST" }
    );
    const recaptchaData = await recaptchaRes.json();

    if (!recaptchaData.success) {
      setErrorMsg("Ocorreu um erro ao enviar. Tente novamente!");
      // return res.status(403).json({ success: false, error: "Falha reCAPTCHA" });
    }

    // Configurar o SMTP
    // const transporter = nodemailer.createTransport({
    //     host: process.env.SMTP_HOST,
    //     port: Number(process.env.SMTP_PORT),
    //     secure: Boolean(process.env.SMTP_SECURE),
    //     auth: {
    //         user: process.env.SMTP_USER,
    //         pass: process.env.SMTP_PASS,
    //     },
    // });

    // try {
    //     await transporter.sendMail({
    //         from: `"Site Kaben" <${process.env.SMTP_USER}>`,
    //         to: process.env.MAIL_TO,
    //         subject: "Novo contato do site",
    //         html: `
    //     <h3>Nova mensagem de contato</h3>
    //     <p><strong>Nome:</strong> ${form.name}</p>
    //     <p><strong>Email:</strong> ${form.email}</p>
    //     <p><strong>Empresa:</strong> ${form.company}</p>
    //     <p><strong>Mensagem:</strong><br/>${form.message}</p>
    //   `,
    //     });
    //     setSuccessMsg("Mensagem enviada com sucesso!");
    //     setForm({ name: "", email: "", company: "", message: "" });
    // } catch (e) {
    //     setErrorMsg("Ocorreu um erro ao enviar. Tente novamente!");
    // }
    
    // const res = await fetch("/api/contact", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ ...form, token }),
    // });

    // const data = await res.json();

    // if (data.success) {
    //   setSuccessMsg("Mensagem enviada com sucesso!");
    //   setForm({ name: "", email: "", company: "", message: "" });
    // } else {
    //   setErrorMsg("Ocorreu um erro ao enviar. Tente novamente!");
    // }

    setLoading(false);
  };

  return (
    <section id="contact" className="py-24 border-t border-gray-900" onSubmit={handleSubmit}>
      <div className="max-w-3xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h3 className="text-2xl font-bold">Conecte-se com a Kaben</h3>
          <p className="mt-3 text-gray-300">Interessado em modernizar sua plataforma, integrar APIs ou melhorar a governança de dados? Envie uma mensagem e vamos conversar.</p>

          <form className="mt-8 grid grid-cols-1 gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                placeholder="Nome" 
                className="w-full p-3 rounded-md bg-[#0b0b0d] border border-gray-800 text-gray-100"
                value={form.name}
                onChange={handleChange}
              />
              <input
                type="email"
                name="email"
                placeholder="E-mail"
                className="w-full p-3 rounded-md bg-[#0b0b0d] border border-gray-800 text-gray-100"
                value={form.email}
                onChange={handleChange}
              />
            </div>
            <input
              type="text"
              name="company"
              placeholder="Empresa"
              className="w-full p-3 rounded-md bg-[#0b0b0d] border border-gray-800 text-gray-100"
              value={form.company}
              onChange={handleChange}
            />
            <textarea 
              name="message"
              placeholder="Mensagem"
              rows={6}
              className="w-full p-3 rounded-md bg-[#0b0b0d] border border-gray-800 text-gray-100"
              value={form.message}
              onChange={handleChange}
            />

            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-400">Nós responderemos em até 2 dias úteis.</div>

              {!canSend ? (
                <button
                  disabled
                  className="px-6 py-3 rounded-md bg-gradient-to-r bg-gray-700 cursor-not-allowed"
                >
                  Preencha para ativar
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 rounded-md bg-gradient-to-r from-[#5EE7FF] to-[#8A5CFF] text-black font-medium"
                >
                  {loading ? "Enviando..." : "Enviar Mensagem"}
                  </button>
                  // <button type="submit" className="px-6 py-3 rounded-md bg-gradient-to-r from-[#5EE7FF] to-[#8A5CFF] text-black font-medium">Enviar mensagem</button>
              )}

              {errorMsg && <p className="text-red-400">{errorMsg}</p>}
              {successMsg && <p className="text-green-400">{successMsg}</p>}
            </div>
          </form>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-400">
            {/* <div>
              <div className="font-semibold text-gray-200">E-mail</div>
              <div>contato@kaben.tech</div>
            </div> */}
            {/* <div>
              <div className="font-semibold text-gray-200">Telefone</div>
              <div>+55 (31) 9XXXX-XXXX</div>
            </div> */}
            <div>
              <div className="font-semibold text-gray-200">Local</div>
              <div>São Paulo, Brasil</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
