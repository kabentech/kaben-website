import React from 'react';
import { motion } from 'framer-motion';

const groups = [
  {
    title: 'Data Engineering',
    items: ['Data pipelines', 'ETL / ELT', 'Data Lake & Lakehouse', 'Data Warehouse', 'Data Integration', 'Data Modeling'],
  },
  {
    title: 'Data & Analytics',
    items: ['Analytics Engineering', 'Data Quality & Governance', 'BI & Dashboards', 'KPIs e Data Products', 'Self-service BI', 'Decisões orientadas a dados'],
  },
  {
    title: 'AI',
    items: ['Generative AI', 'AI Agents', 'RAG', 'Machine Learning', 'AI Copilots', 'IA sobre dados corporativos'],
  },
  {
    title: 'Automation',
    items: ['Automação de processos', 'Integração de sistemas', 'Workflows automatizados', 'APIs e integrações', 'Automação inteligente', 'Process orchestration'],
  },
];

export default function WhatWeDo() {
  return (
    <section id="what-we-do" className="py-24 border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 className="text-3xl font-bold">O que fazemos</h2>
          <p className="mt-3 text-gray-400 max-w-2xl">Capacidades que combinamos conforme o desafio de cada empresa — do dado bruto à automação inteligente.</p>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {groups.map((g, i) => (
            <motion.div
              key={g.title}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="p-6 rounded-xl border border-gray-800 bg-[#0b0b0d]"
            >
              <h3 className="text-base font-semibold text-[#9FB4FF]">{g.title}</h3>
              <ul className="mt-4 space-y-2 text-sm text-gray-300">
                {g.items.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-gray-600 mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
