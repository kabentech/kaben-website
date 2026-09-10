import { motion } from 'framer-motion';

const pillars = [
  'Automação & CI/CD',
  'Observabilidade & Telemetria',
  'Escalabilidade & Resiliência',
  'Segurança & Compliance',
];

export default function Technology() {
  return (
    <section id="technology" className="py-24 border-t border-line">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 className="text-3xl font-bold">Tecnologia</h2>
          <p className="mt-4 text-gray-400 max-w-md">
            Arquitetura API-first, orientada a eventos e pronta para escalar com segurança.
          </p>

          <ul className="mt-8 space-y-3 text-sm text-gray-300">
            {pillars.map((pillar) => (
              <li key={pillar} className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-from" />
                {pillar}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div className="rounded-2xl border border-line bg-surface/40 p-6 font-mono text-xs text-gray-400 overflow-x-auto">
            <pre>{`# data-pipelines
governance: enabled
quality: real-time
orchestration: automated

# ai-copilots
models: [gpt-4, claude]
latency: <100ms`}</pre>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
