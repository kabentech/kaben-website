import { motion } from 'framer-motion';

const consultingItems = [
  {
    title: 'Diagnóstico',
    description: 'Avaliação de arquitetura, gaps em dados e riscos operacionais.'
  },
  {
    title: 'Roadmap',
    description: 'Plano pragmático para curto e médio prazo com KPIs e quick-wins.'
  },
  {
    title: 'Execução',
    description: 'Times dedicados, squads e entregas iterativas orientadas a valor.'
  }
];

export default function Consulting() {
  return (
    <section id="consulting" className="py-24 border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h3 className="text-2xl font-bold">Consultoria Estratégica</h3>
          <p className="mt-3 text-gray-300 max-w-2xl">Apoiamos times executivos e técnicos em decisões que conectam tecnologia ao resultado de negócio. Roadmaps, governança, maturidade de dados e execução técnica.</p>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {consultingItems.map((item) => (
              <div key={item.title} className="p-6 rounded-xl border border-gray-800 bg-[#0b0b0d]">
                <h4 className="font-semibold">{item.title}</h4>
                <p className="mt-2 text-sm text-gray-300">{item.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
