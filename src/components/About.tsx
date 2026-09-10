import { Fragment } from 'react';
import { motion } from 'framer-motion';

const stats = [
  { label: 'Fundação', value: '2025' },
  { label: 'Times', value: 'Engenharia · Dados · Produto' },
  { label: 'Expertise', value: 'Data · IA · Cloud' },
];

export default function About() {
  return (
    <section id="about" className="py-24 border-t border-line">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 className="text-3xl font-bold">A Kaben</h2>
          <p className="mt-6 text-gray-400 leading-relaxed">
            Nascemos da interseção entre engenharia e estratégia para transformar dados em vantagem competitiva.
          </p>
          <p className="mt-4 text-gray-400 leading-relaxed">
            Construímos plataformas SaaS B2B escaláveis e automação que conectam tecnologia a resultado de negócio.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-8">
            {stats.map((stat, i) => (
              <Fragment key={stat.label}>
                {i > 0 && <div className="hidden sm:block w-px h-10 bg-line" />}
                <div className="text-left">
                  <div className="text-xs text-muted uppercase tracking-wider">{stat.label}</div>
                  <div className="mt-1.5 font-semibold">{stat.value}</div>
                </div>
              </Fragment>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

