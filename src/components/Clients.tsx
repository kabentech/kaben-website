import { motion } from 'framer-motion';

type ClientLogo = { name: string; logo: string };

// Preencher com logos reais de clientes/parceiros quando disponíveis.
const clients: ClientLogo[] = [];

export default function Clients() {
  if (clients.length === 0) return null;

  return (
    <section className="py-16 border-t border-line">
      <div className="max-w-6xl mx-auto px-6">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center text-sm text-muted"
        >
          Empresas que confiam na Kaben
        </motion.p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {clients.map((client) => (
            <img
              key={client.name}
              src={client.logo}
              alt={client.name}
              className="h-8 w-auto opacity-60 hover:opacity-100 transition-opacity"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

