import { motion } from 'framer-motion';

export default function About() {
  return (
    <section id="about" className="py-24">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h3 className="text-2xl font-bold">Sobre a Kaben</h3>
          <p className="mt-4 text-gray-300">A Kaben nasceu da interseção entre engenharia e estratégia. Nosso propositó é impulsionar empresas com dados, software e governança, transformando informações em vantagem competitiva.</p>

          <div className="mt-8 flex items-center justify-center gap-6">
            <div className="text-left">
              <div className="text-xs text-gray-400">Fundação</div>
              <div className="font-semibold">2025</div>
            </div>
            <div className="text-left">
              <div className="text-xs text-gray-400">Times</div>
              <div className="font-semibold">Engenharia • Dados • Produto</div>
            </div>
            <div className="text-left">
              <div className="text-xs text-gray-400">Metodologia</div>
              <div className="font-semibold">API-first • Event-driven</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
