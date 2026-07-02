import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-[72vh] overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#06060A] via-[#071026] to-[#0b0710]" />
        <svg className="absolute inset-0 w-full h-full opacity-10" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="lg" x1="0" x2="1">
              <stop offset="0%" stopColor="#051124" />
              <stop offset="100%" stopColor="#0b0410" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#lg)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="text-sm text-[#8aa1ff] font-medium">Kaben • Tecnologia & Inovação</p>
            <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              Tecnologia que conecta <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#7EE7FF] to-[#9B7CFF]">inovação</span> e dados ao futuro do seu negócio.
            </h1>

            <p className="mt-6 text-gray-300 max-w-xl">Desenvolvemos software sob demanda, APIs corporativas e estratégias de governança de dados para empresas que buscam performance, automação e decisões guiadas por dados.</p>

            <div className="mt-8 flex gap-4">
              <a href="#contact" className="inline-flex items-center gap-3 px-5 py-3 rounded-md bg-gradient-to-r from-[#5EE7FF] to-[#8A5CFF] text-black font-medium shadow-md">Solicitar proposta</a>
              <a href="#solutions" className="inline-flex items-center gap-3 px-5 py-3 rounded-md border border-gray-700 hover:bg-white/3">Conheça nossas soluções</a>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-4 max-w-md text-xs text-gray-400">
              <div className="flex flex-col">
                <span className="text-xs text-gray-300 font-semibold">Clientes</span>
                <span>Empresas de médio e grande porte</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-gray-300 font-semibold">Foco</span>
                <span>APIs, DataOps, Governança</span>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="relative">
            <div className="rounded-2xl border border-gray-800 p-6 bg-gradient-to-b from-white/3 to-white/2 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <div className="text-xs text-gray-400">API • v1</div>
                <div className="text-xs text-gray-400">Status: <span className="text-green-300">Online</span></div>
              </div>

              <pre className="bg-transparent text-sm font-mono text-gray-100 p-4 rounded-md overflow-auto">{`GET /api/v1/insights?companyId=abc123
200 OK
{
  "revenueImpact": ">15%",
  "recommendations": ["data-pipeline","api-gateway","policy-governance"]
}`}</pre>
            </div>

            <div className="absolute -right-8 -bottom-8 w-48 h-48 rounded-xl bg-gradient-to-br from-[#6EE7B7]/30 to-[#8A5CFF]/30 blur-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
