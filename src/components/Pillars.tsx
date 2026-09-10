import React from 'react';
import { motion } from 'framer-motion';
import { Database, BrainCircuit, Workflow } from 'lucide-react';

const pillars = [
  {
    title: 'Data',
    desc: 'Transformamos dados dispersos em uma base confiável para análise, operação e IA — com engenharia de dados, integração e governança.',
    icon: Database,
  },
  {
    title: 'AI',
    desc: 'Aplicamos inteligência artificial aos dados e processos da empresa para gerar novas capacidades, com IA generativa, agentes e modelos preditivos.',
    icon: BrainCircuit,
  },
  {
    title: 'Automation',
    desc: 'Automatizamos tarefas e processos para reduzir esforço manual, integrar sistemas e aumentar a eficiência operacional.',
    icon: Workflow,
  },
];

export default function Pillars() {
  return (
    <section id="pillars" className="py-24 border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 className="text-3xl font-bold">Como podemos ajudar</h2>
          <p className="mt-3 text-gray-400 max-w-2xl">Três pilares que trabalham juntos para transformar processos: dados como base, IA como inteligência aplicada e automação como execução.</p>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="p-8 rounded-xl border border-gray-800 bg-gradient-to-b from-white/2 to-transparent"
            >
              <div className="w-12 h-12 rounded-lg bg-[#111217] flex items-center justify-center border border-gray-800 mb-5">
                <p.icon className="w-6 h-6 text-[#9FB4FF]" />
              </div>
              <h3 className="text-xl font-semibold">{p.title}</h3>
              <p className="mt-3 text-sm text-gray-300">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
