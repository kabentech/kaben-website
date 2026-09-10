import React from 'react';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <section id="about" className="py-24 border-t border-gray-900">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h3 className="text-3xl font-bold">A Kaben</h3>
          <p className="mt-6 text-gray-300 max-w-2xl mx-auto leading-relaxed">A Kaben nasceu da interseção entre engenharia e estratégia. Nosso propósito é impulsionar empresas com dados, software e governança, transformando informações em vantagem competitiva.</p>
          
          <p className="mt-4 text-gray-300 max-w-2xl mx-auto leading-relaxed">Somos especialistas em construir plataformas SaaS B2B escaláveis, arquiteturas de dados modernas e soluções de automação que conectam tecnologia ao resultado de negócio.</p>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-8">
            <div className="text-left">
              <div className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Fundação</div>
              <div className="text-lg font-semibold mt-2">2025</div>
            </div>
            <div className="hidden sm:block w-px h-12 bg-gray-800" />
            <div className="text-left">
              <div className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Times</div>
              <div className="text-lg font-semibold mt-2">Engenharia • Dados • Produto</div>
            </div>
            <div className="hidden sm:block w-px h-12 bg-gray-800" />
            <div className="text-left">
              <div className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Expertise</div>
              <div className="text-lg font-semibold mt-2">Data Engineering • AI • Cloud</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

