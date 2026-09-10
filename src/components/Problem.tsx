import React from 'react';
import { motion } from 'framer-motion';
import { Database, FileSpreadsheet, RefreshCcw, Puzzle, BrainCircuit, ClipboardX } from 'lucide-react';

const problems = [
  { title: 'Dados espalhados em vários sistemas', desc: 'ERP, CRM, planilhas e ferramentas que não conversam entre si.', icon: Database },
  { title: 'Processos manuais e planilhas', desc: 'Tarefas repetitivas que consomem tempo do time e geram retrabalho.', icon: FileSpreadsheet },
  { title: 'Informações inconsistentes', desc: 'Números diferentes para a mesma pergunta, dependendo de quem responde.', icon: RefreshCcw },
  { title: 'Falta de integração entre sistemas', desc: 'Dados duplicados e processos que dependem de intervenção humana.', icon: Puzzle },
  { title: 'Dificuldade para aplicar IA na prática', desc: 'Vontade de usar inteligência artificial, sem uma base de dados pronta para isso.', icon: BrainCircuit },
  { title: 'Decisões sem dados confiáveis', desc: 'Excesso de tarefas operacionais e pouca visibilidade para decidir com segurança.', icon: ClipboardX },
];

export default function Problem() {
  return (
    <section id="problem" className="py-24 border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 className="text-3xl font-bold">Sua empresa já tem dados e processos.</h2>
          <p className="mt-3 text-gray-400 max-w-2xl">O problema raramente é falta de informação — é a falta de estrutura para transformar o que já existe em eficiência e inteligência.</p>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {problems.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="p-6 rounded-xl border border-gray-800 bg-gradient-to-b from-white/2 to-transparent"
            >
              <div className="w-10 h-10 rounded-lg bg-[#111217] flex items-center justify-center border border-gray-800 mb-4">
                <p.icon className="w-5 h-5 text-[#9FB4FF]" />
              </div>
              <h3 className="text-base font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm text-gray-300">{p.desc}</p>
            </motion.div>
          ))}
        </div>

        <p className="mt-10 text-lg text-gray-200 font-medium">Nós transformamos isso em eficiência e inteligência.</p>
      </div>
    </section>
  );
}
