import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#0A0A10] via-background to-background" />
      <div className="absolute -top-40 right-0 -z-10 h-96 w-96 rounded-full bg-accent-to/10 blur-3xl" />

      <div className="max-w-6xl mx-auto px-6 pt-32 pb-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <p className="text-sm font-medium text-accent-from">Plataformas de Dados & IA</p>
          <h1 className="mt-5 text-4xl md:text-5xl font-bold tracking-tight leading-[1.1]">
            Transforme dados em decisões, não em planilhas.
          </h1>
          <p className="mt-6 text-lg text-gray-400 max-w-lg">
            Construímos plataformas de dados, automação e IA para empresas que precisam de resultado — não de mais um projeto de TI parado na gaveta.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#contact"
              className="px-6 py-3 rounded-full bg-accent-gradient text-black font-semibold hover:opacity-90 transition-opacity"
            >
              Falar com um especialista
            </a>
            <a
              href="#solutions"
              className="px-6 py-3 rounded-full border border-line text-gray-200 hover:border-gray-600 transition-colors"
            >
              Ver soluções
            </a>
          </div>

          <div className="mt-12 flex items-center gap-3 text-xs text-muted">
            <span>Empresas de médio e grande porte</span>
            <span className="w-1 h-1 rounded-full bg-muted" />
            <span>Dados · Automação · IA</span>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.1 }}>
          <div className="rounded-2xl border border-line bg-surface/60 p-6 font-mono text-sm shadow-2xl shadow-black/40">
            <div className="flex items-center justify-between text-xs text-muted mb-4">
              <span>data-platform · api/v1</span>
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> online
              </span>
            </div>
            <pre className="text-gray-300 whitespace-pre-wrap">{`{
  "throughput": "1M+ events/sec",
  "governance": "enabled",
  "ai_copilots": "active"
}`}</pre>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
