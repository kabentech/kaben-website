import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import ReCAPTCHA from 'react-google-recaptcha';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ContactFormData = {
  name: string;
  email: string;
  company: string;
  message: string;
};

type ContactFormErrors = {
  name: string;
  email: string;
  message: string;
};

export default function Contact() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [errors, setErrors] = useState<ContactFormErrors>({
    name: '',
    email: '',
    message: '',
  });
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const recaptchaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

  const validateForm = () => {
    const newErrors = { name: '', email: '', message: '' };

    if (!formData.name.trim()) {
      newErrors.name = 'Por favor, informe seu nome.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Por favor, informe seu e-mail.';
    } else if (!EMAIL_REGEX.test(formData.email.trim())) {
      newErrors.email = 'Por favor, informe um e-mail válido.';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Por favor, escreva uma mensagem.';
    }

    setErrors(newErrors);
    return !newErrors.name && !newErrors.email && !newErrors.message;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: '',
    }));
  };

  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token);
    setSubmitStatus({ type: null, message: '' });
  };

  const handleRecaptchaExpired = () => {
    setRecaptchaToken(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      setSubmitStatus({
        type: 'error',
        message: 'Preencha os campos corretamente antes de enviar.',
      });
      return;
    }

    if (!recaptchaToken) {
      setSubmitStatus({
        type: 'error',
        message: 'Por favor, complete o reCAPTCHA.',
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const response = await fetch('/api/send-contact-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          company: formData.company.trim(),
          message: formData.message.trim(),
          recaptchaToken,
        }),
      });

      const contentType = response.headers.get('content-type') || '';
      const isJson = contentType.includes('application/json');
      const data = isJson ? await response.json() : await response.text();

      if (response.ok) {
        const successMessage = typeof data === 'string'
          ? data
          : data?.message || 'Mensagem enviada com sucesso!';

        setSubmitStatus({
          type: 'success',
          message: successMessage,
        });
        setFormData({ name: '', email: '', company: '', message: '' });
        setRecaptchaToken(null);
        recaptchaRef.current?.reset();
      } else {
        const errorMessage = typeof data === 'string'
          ? data
          : data?.error || 'Erro ao enviar mensagem. Tente novamente.';

        setSubmitStatus({
          type: 'error',
          message: errorMessage,
        });
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro ao enviar mensagem. Verifique sua conexão.';
      setSubmitStatus({
        type: 'error',
        message,
      });
      console.error('Contact submit error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid =
    !!formData.name.trim() &&
    EMAIL_REGEX.test(formData.email.trim()) &&
    !!formData.message.trim() &&
    !!recaptchaToken;

  return (
    <section id="contact" className="py-24 border-t border-gray-900">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold">Conecte-se com a Kaben</h3>
          <p className="mt-3 text-gray-300">
            Interessado em modernizar sua plataforma, integrar APIs ou melhorar a
            governança de dados? Envie uma mensagem e vamos conversar.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-1 gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <input
                  type="text"
                  name="name"
                  placeholder="Nome"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-md bg-[#0b0b0d] border border-gray-800 text-gray-100 focus:border-[#5EE7FF] focus:outline-none transition-colors"
                />
                {errors.name && <p className="text-sm text-red-400">{errors.name}</p>}
              </div>

              <div className="space-y-1">
                <input
                  type="email"
                  name="email"
                  placeholder="E-mail"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-md bg-[#0b0b0d] border border-gray-800 text-gray-100 focus:border-[#5EE7FF] focus:outline-none transition-colors"
                />
                {errors.email && <p className="text-sm text-red-400">{errors.email}</p>}
              </div>
            </div>
            <input
              type="text"
              name="company"
              placeholder="Empresa (opcional)"
              value={formData.company}
              onChange={handleInputChange}
              className="w-full p-3 rounded-md bg-[#0b0b0d] border border-gray-800 text-gray-100 focus:border-[#5EE7FF] focus:outline-none transition-colors"
            />
            <div className="space-y-1">
              <textarea
                name="message"
                placeholder="Mensagem"
                rows={6}
                value={formData.message}
                onChange={handleInputChange}
                className="w-full p-3 rounded-md bg-[#0b0b0d] border border-gray-800 text-gray-100 focus:border-[#5EE7FF] focus:outline-none transition-colors"
              />
              {errors.message && <p className="text-sm text-red-400">{errors.message}</p>}
            </div>

            {recaptchaSiteKey ? (
              <div className="flex justify-end">
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={recaptchaSiteKey}
                  onChange={handleRecaptchaChange}
                  onExpired={handleRecaptchaExpired}
                  theme="dark"
                />
              </div>
            ) : (
              <div className="text-sm text-red-400">
                A chave do reCAPTCHA não está configurada.
              </div>
            )}

            {submitStatus.type && (
              <div
                className={`p-4 rounded-md ${submitStatus.type === 'success'
                    ? 'bg-green-900/20 border border-green-700 text-green-300'
                    : 'bg-red-900/20 border border-red-700 text-red-300'
                  }`}
              >
                {submitStatus.message}
              </div>
            )}

            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="text-sm text-gray-400">
                Nós responderemos em até 2 dias úteis.
              </div>
              <button
                type="submit"
                disabled={!isFormValid || isSubmitting}
                className="px-6 py-3 rounded-md bg-gradient-to-r from-[#5EE7FF] to-[#8A5CFF] text-black font-medium hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
              >
                {isSubmitting ? 'Enviando...' : 'Enviar mensagem'}
              </button>
            </div>
          </form>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-400">
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
