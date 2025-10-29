import React from 'react';
import { motion } from 'framer-motion';
import {
  CodeXml,
  FolderCode,
  BetweenHorizonalStart,
  Move3D
} from 'lucide-react';


const solutions = [
  { title: 'Desenvolvimento Sob Demanda', desc: 'Portais, plataformas internas, SaaS e produtos digitais escaláveis.', icon: CodeXml },
  { title: 'APIs & Integrações', desc: 'Gateways, contratos OpenAPI, mensageria e conectores de ecossistema.', icon: FolderCode },
  { title: 'Governança de Dados', desc: 'Modelagem, políticas, lineage, catalog e compliance.', icon: BetweenHorizonalStart },
  { title: 'Consultoria & Estratégia', desc: 'Roadmaps, modernização e transformação digital com foco em ROI.', icon: Move3D }
];

export default function Solutions() {
  return (
    <section id="solutions" className="py-24 border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 className="text-3xl font-bold">Nossas soluções</h2>
          <p className="mt-3 text-gray-400 max-w-2xl">Soluções orientadas a resultados — engenharia de software, APIs corporativas, arquitetura de dados e consultoria estratégica.</p>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
