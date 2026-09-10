import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  { n: '1', title: 'Entendemos o negócio', desc: 'Mapeamos processos, desafios, dados e oportunidades reais da operação.' },
  { n: '2', title: 'Identificamos oportunidades', desc: 'Encontramos onde dados, IA e automação podem gerar maior impacto.' },
  { n: '3', title: 'Desenhamos a solução', desc: 'Definimos arquitetura, tecnologias, integrações e estratégia de dados.' },
  { n: '4', title: 'Implementamos', desc: 'Construímos pipelines, plataformas, automações e soluções de IA.' },
  { n: '5', title: 'Medimos o impacto', desc: 'Acompanhamos resultados e evoluímos a solução continuamente.' },
];

export default function HowWeWork() {
  return (
    <section id="how-we-work" className="py-24 border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h3 className="text-2xl font-bold">Como trabalhamos</h3>
          <p className="mt-3 text-gray-300 max-w-2xl">Não vendemos apenas tecnologia. Somos parceiros de transformação — do entendimento do negócio à automação em produção.</p>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-5 gap-6">
            {steps.map((step) => (
              <div key={step.n} className="p-6 rounded-xl border border-gray-800 bg-[#0b0b0d]">
                <div className="text-xs font-mono text-[#7EE7FF]">{step.n}</div>
                <h4 className="mt-2 font-semibold">{step.title}</h4>
                <p className="mt-2 text-sm text-gray-300">{step.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
