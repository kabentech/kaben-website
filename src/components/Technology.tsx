import { motion } from 'framer-motion';

export default function Technology() {
  return (
    <section id="tech" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h3 className="text-2xl font-bold">Tecnologia e Inovação</h3>
            <p className="mt-4 text-gray-300 max-w-xl">Construímos plataformas com foco em alta disponibilidade, observabilidade, segurança e automação. Priorizamos contratos API-first, arquitetura orientada a eventos e pipelines reprodutíveis.</p>

            <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-300">
              <li className="flex items-start gap-3"><strong className="text-[#7EE7FF]">•</strong> Automação & CI/CD</li>
              <li className="flex items-start gap-3"><strong className="text-[#8A5CFF]">•</strong> Observabilidade & Telemetria</li>
              <li className="flex items-start gap-3"><strong className="text-[#6EE7B7]">•</strong> Escalabilidade & Resiliência</li>
              <li className="flex items-start gap-3"><strong className="text-[#9B7CFF]">•</strong> Segurança & Compliance</li>
            </ul>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="rounded-2xl border border-gray-800 p-6 bg-gradient-to-b from-white/3 to-transparent">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-md bg-[#0f1724] flex items-center justify-center border border-gray-800">API</div>
                <div>
                  <div className="text-sm text-gray-300 font-semibold">Platform Design</div>
                  <div className="text-xs text-gray-500">Contracts • OpenAPI • Event Mesh</div>
                </div>
              </div>

              <div className="text-xs text-gray-400 font-mono overflow-x-auto">{`# components/serviceA
- responsibilities: ingest
- contracts: openapi: 3.0

# infra
default: k8s
`}</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
