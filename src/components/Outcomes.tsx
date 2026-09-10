import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Gauge, ShieldCheck, LineChart, BrainCircuit, TrendingUp } from 'lucide-react';

const outcomes = [
  { title: 'Menos trabalho manual', desc: 'Automatização de tarefas repetitivas.', icon: Bot },
  { title: 'Mais eficiência', desc: 'Processos mais rápidos e integrados.', icon: Gauge },
  { title: 'Dados confiáveis', desc: 'Uma base consistente para decisões.', icon: ShieldCheck },
  { title: 'Decisões melhores', desc: 'Informações disponíveis no momento certo.', icon: LineChart },
  { title: 'IA aplicada ao negócio', desc: 'Inteligência artificial conectada aos dados e processos reais.', icon: BrainCircuit },
  { title: 'Escala', desc: 'Arquiteturas preparadas para crescimento.', icon: TrendingUp },
];

export default function Outcomes() {
  return (
    <section id="outcomes" className="py-24 border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 className="text-3xl font-bold">Resultados que buscamos entregar</h2>
          <p className="mt-3 text-gray-400 max-w-2xl">Tecnologia é meio, não fim. O que importa é o impacto direto na operação e nas decisões da empresa.</p>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {outcomes.map((o, i) => (
            <motion.div
              key={o.title}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="p-6 rounded-xl border border-gray-800 bg-gradient-to-b from-white/2 to-transparent"
            >
              <div className="w-10 h-10 rounded-lg bg-[#111217] flex items-center justify-center border border-gray-800 mb-4">
                <o.icon className="w-5 h-5 text-[#9FB4FF]" />
              </div>
              <h3 className="text-base font-semibold">{o.title}</h3>
              <p className="mt-2 text-sm text-gray-300">{o.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
