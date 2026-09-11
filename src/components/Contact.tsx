import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

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
  const { executeRecaptcha } = useGoogleReCaptcha();

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      setSubmitStatus({
        type: 'error',
        message: 'Preencha os campos corretamente antes de enviar.',
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      if (!executeRecaptcha) {
        throw new Error('reCAPTCHA não está configurado');
      }

      const token = await executeRecaptcha('submit');

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
          recaptchaToken: token,
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
    !!formData.message.trim();

  return (
    <section id="contact" className="py-24 border-t border-gray-900">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold">Vamos mapear seu desafio</h3>
          <p className="mt-3 text-gray-300">
            Quer entender onde dados, IA e automação podem gerar mais impacto na
            sua operação? Envie uma mensagem e vamos conversar.
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
                disabled={isFormValid === false || isSubmitting}
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

          {/* reCAPTCHA Badge Alternative - Google requires visible attribution */}
          <div className="mt-8 text-xs text-gray-500 text-center">
            Este site é protegido por reCAPTCHA e as{' '}
            <a
              href="https://policies.google.com/privacy?hl=pt-br"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-gray-400 transition-colors"
            >
              Políticas de Privacidade
            </a>
            {' '}e{' '}
            <a
              href="https://policies.google.com/terms?hl=pt-br"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-gray-400 transition-colors"
            >
              Termos de Serviço
            </a>
            {' '}do Google se aplicam.
          </div>
        </motion.div>
      </div>
    </section>
  );
}
