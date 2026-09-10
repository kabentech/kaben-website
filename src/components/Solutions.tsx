import { motion } from 'framer-motion';
import {
  Database,
  Workflow,
  Sparkles,
  TrendingUp,
  Code2,
} from 'lucide-react';

const solutions = [
  {
    title: 'Data Governance & Platforms',
    desc: 'Governança centralizada, lineage e catalogação automática de dados.',
    icon: Database,
    span: 'lg:col-span-3',
  },
  {
    title: 'DataOps & Automação',
    desc: 'Pipelines automatizados, orquestração e validação em tempo real.',
    icon: Workflow,
    span: 'lg:col-span-3',
  },
  {
    title: 'AI & Copilots Corporativos',
    desc: 'Assistentes de IA, MLOps e agentic AI para automação inteligente.',
    icon: Sparkles,
    span: 'lg:col-span-2',
  },
  {
    title: 'Engenharia de Plataformas',
    desc: 'Cloud data architecture, API-first, segurança e compliance.',
    icon: Code2,
    span: 'lg:col-span-2',
  },
  {
    title: 'Consultoria Estratégica',
    desc: 'Roadmaps de transformação digital e identificação de ROI.',
    icon: TrendingUp,
    span: 'lg:col-span-2',
  },
];

const workSteps = [
  { step: '01', title: 'Diagnóstico', desc: 'Avaliamos arquitetura, maturidade de dados e riscos operacionais.' },
  { step: '02', title: 'Roadmap', desc: 'Plano pragmático com KPIs e quick-wins para curto e médio prazo.' },
  { step: '03', title: 'Execução', desc: 'Squads dedicados entregando de forma iterativa e orientada a valor.' },
];

export default function Solutions() {
  return (
    <section id="solutions" className="py-24 border-t border-line">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 className="text-3xl font-bold">Soluções</h2>
          <p className="mt-3 text-gray-400 max-w-xl">Governança de dados, automação e IA aplicadas a resultado de negócio.</p>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-6 gap-4">
          {solutions.map((solution, i) => (
            <motion.div
              key={solution.title}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className={`p-6 rounded-2xl border border-line bg-surface/40 hover:border-gray-700 transition-colors ${solution.span}`}
            >
              <div className="w-10 h-10 rounded-lg bg-white/5 border border-line flex items-center justify-center">
                <solution.icon className="w-5 h-5 text-accent-from" />
              </div>
              <h3 className="mt-4 font-semibold">{solution.title}</h3>
              <p className="mt-2 text-sm text-gray-400">{solution.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-20">
          <motion.h3
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xl font-semibold"
          >
            Como trabalhamos
          </motion.h3>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {workSteps.map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="p-6 rounded-2xl border border-line"
              >
                <span className="text-sm font-mono text-accent-from">{item.step}</span>
                <h4 className="mt-3 font-semibold">{item.title}</h4>
                <p className="mt-2 text-sm text-gray-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
