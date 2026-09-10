import { motion } from 'framer-motion';

export default function CallToAction() {
  return (
    <section className="py-24 border-t border-line">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold">
            Pronto para transformar dados em vantagem competitiva?
          </h2>
          <p className="mt-4 text-gray-400">
            Fale com a gente e descubra como aplicar dados e IA no seu negócio.
          </p>
          <a
            href="#contact"
            className="mt-8 inline-flex px-8 py-3.5 rounded-full bg-accent-gradient text-black font-semibold hover:opacity-90 transition-opacity"
          >
            Enviar mensagem
          </a>
        </motion.div>
      </div>
    </section>
  );
}
