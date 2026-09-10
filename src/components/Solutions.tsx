import React from 'react';
import { motion } from 'framer-motion';
import {
  Database,
  Workflow,
  Sparkles,
  TrendingUp,
  Code2
} from 'lucide-react';


const solutions = [
  { title: 'Data Governance & Platforms', desc: 'Governança centralizada, lineage tracking, políticas de conformidade, catalogação automática de dados.', icon: Database },
  { title: 'DataOps & Automação', desc: 'Pipelines de dados automatizadas, orchestration, transformações e validação em tempo real.', icon: Workflow },
  { title: 'AI & Copilots Corporativos', desc: 'Assistentes de IA integrados, MLOps, Agentic AI para automação inteligente.', icon: Sparkles },
  { title: 'Consultoria Estratégica', desc: 'Roadmaps de transformação digital, market intelligence, identificação de use cases, ROI.', icon: TrendingUp },
  { title: 'Engenharia de Plataformas', desc: 'Custom AI/ML, cloud data architecture, API-first, segurança e compliance.', icon: Code2 }
];

export default function Solutions() {
  return (
    <section id="solutions" className="py-24 border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 className="text-3xl font-bold">Nossas Soluções</h2>
          <p className="mt-3 text-gray-400 max-w-2xl">Soluções orientadas a resultados — governança de dados, automação, IA, consultoria estratégica e engenharia de plataformas cloud.</p>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {solutions.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="p-6 rounded-xl border border-gray-800 bg-gradient-to-b from-white/2 to-transparent"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm text-gray-300">{s.desc}</p>
                </div>
                <div className="ml-4 flex-shrink-0 w-12 h-12 rounded-lg bg-[#111217] flex items-center justify-center border border-gray-800">
                  {s.icon ? React.createElement(s.icon, { className: 'w-6 h-6 text-[#9FB4FF]' }) :
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 12h18" stroke="#9FB4FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  }
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
