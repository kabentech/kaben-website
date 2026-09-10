import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ContactFormData = {
  name: string;
  email: string;
  company: string;
  message: string;
};

type ContactFormErrors = Partial<Record<'name' | 'email' | 'message', string>>;

export default function Contact() {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [recaptchaReady, setRecaptchaReady] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  // reCAPTCHA v3 carrega de forma assíncrona; só liberamos o botão de envio quando ele estiver pronto.
  useEffect(() => {
    setRecaptchaReady(!!executeRecaptcha);
  }, [executeRecaptcha]);

  const validateForm = () => {
    const newErrors: ContactFormErrors = {};

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
    return Object.keys(newErrors).length === 0;
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
      [name]: undefined,
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

    if (!executeRecaptcha) {
      setSubmitStatus({
        type: 'error',
        message: 'Verificação de segurança ainda não carregou. Aguarde um instante e tente novamente.',
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const recaptchaToken = await executeRecaptcha('submit');

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
    <section id="contact" className="py-24 border-t border-line">
      <div className="max-w-2xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold">Fale com a gente</h2>
          <p className="mt-3 text-gray-400">
            Conte um pouco sobre o desafio da sua empresa. Respondemos em até 2 dias úteis.
          </p>

          <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Nome"
                  value={formData.name}
                  onChange={handleInputChange}
                  aria-invalid={!!errors.name}
                  className="w-full p-3 rounded-lg bg-surface border border-line text-gray-100 placeholder:text-muted focus:border-accent-from focus:outline-none transition-colors"
                />
                {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="E-mail"
                  value={formData.email}
                  onChange={handleInputChange}
                  aria-invalid={!!errors.email}
                  className="w-full p-3 rounded-lg bg-surface border border-line text-gray-100 placeholder:text-muted focus:border-accent-from focus:outline-none transition-colors"
                />
                {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
              </div>
            </div>

            <input
              type="text"
              name="company"
              placeholder="Empresa (opcional)"
              value={formData.company}
              onChange={handleInputChange}
              className="w-full p-3 rounded-lg bg-surface border border-line text-gray-100 placeholder:text-muted focus:border-accent-from focus:outline-none transition-colors"
            />

            <div>
              <textarea
                name="message"
                placeholder="Como podemos ajudar?"
                rows={5}
                value={formData.message}
                onChange={handleInputChange}
                aria-invalid={!!errors.message}
                className="w-full p-3 rounded-lg bg-surface border border-line text-gray-100 placeholder:text-muted focus:border-accent-from focus:outline-none transition-colors"
              />
              {errors.message && <p className="mt-1 text-sm text-red-400">{errors.message}</p>}
            </div>

            {submitStatus.type && (
              <div
                className={`p-4 rounded-lg text-sm ${submitStatus.type === 'success'
                    ? 'bg-emerald-900/20 border border-emerald-800 text-emerald-300'
                    : 'bg-red-900/20 border border-red-800 text-red-300'
                  }`}
              >
                {submitStatus.message}
              </div>
            )}

            <div className="flex flex-col gap-3">
              {recaptchaReady ? (
                <button
                  type="submit"
                  disabled={!isFormValid || isSubmitting}
                  className="w-full sm:w-auto self-start px-8 py-3 rounded-full bg-accent-gradient text-black font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar mensagem'}
                </button>
              ) : (
                <button
                  type="button"
                  disabled
                  className="w-full sm:w-auto self-start px-8 py-3 rounded-full border border-line text-muted cursor-not-allowed"
                >
                  Verificando segurança...
                </button>
              )}

              <p className="text-xs text-muted">
                Protegido por reCAPTCHA. Este site está sujeito à{' '}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-300">
                  Política de Privacidade
                </a>{' '}
                e aos{' '}
                <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-300">
                  Termos de Serviço
                </a>{' '}
                do Google.
              </p>
            </div>
          </form>

          <p className="mt-8 text-sm text-gray-500">São Paulo, Brasil</p>
        </motion.div>
      </div>
    </section>
  );
}


