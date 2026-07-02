import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

const clientsData = [
  { name: 'Cliente 1', logo: 'https://placehold.co/150x60/1a1a1a/ffffff?text=Cliente+1' },
  { name: 'Cliente 2', logo: 'https://placehold.co/150x60/1a1a1a/ffffff?text=Cliente+2' },
  { name: 'Cliente 3', logo: 'https://placehold.co/150x60/1a1a1a/ffffff?text=Cliente+3' },
  { name: 'Cliente 4', logo: 'https://placehold.co/150x60/1a1a1a/ffffff?text=Cliente+4' },
];

const partnersData = [
  { name: 'Parceiro 1', logo: 'https://placehold.co/150x60/1a1a1a/cccccc?text=Parceiro+1' },
  { name: 'Parceiro 2', logo: 'https://placehold.co/150x60/1a1a1a/cccccc?text=Parceiro+2' },
  { name: 'Parceiro 3', logo: 'https://placehold.co/150x60/1a1a1a/cccccc?text=Parceiro+3' },
  { name: 'Parceiro 4', logo: 'https://placehold.co/150x60/1a1a1a/cccccc?text=Parceiro+4' },
];

function ScrollableLogos({ items, title }: { items: typeof clientsData; title: string }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (scrollRef.current?.offsetLeft || 0));
    setScrollLeft(scrollRef.current?.scrollLeft || 0);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (scrollRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="mb-12">
      <h4 className="text-lg font-semibold mb-6 text-gray-300">{title}</h4>

      <div className="relative group">
        <div
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className={`flex gap-6 overflow-x-auto pb-2 scrollbar-hide ${isDragging ? 'cursor-grabbing' : 'cursor-grab'
            }`}
          style={{ scrollBehavior: 'smooth' }}
        >
          {items.map((item, index) => (
            <div
              key={index}
              className="flex-shrink-0 flex items-center justify-center h-20 w-48 rounded-lg border border-gray-800 bg-gradient-to-b from-white/5 to-transparent hover:border-gray-700 transition-colors"
            >
              <img
                src={item.logo}
                alt={item.name}
                className="max-w-full max-h-full object-contain opacity-70 hover:opacity-100 transition-opacity pointer-events-none select-none"
                draggable={false}
              />
            </div>
          ))}
        </div>

        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-[#08070A] to-transparent p-3 rounded-r-lg"
          aria-label="Scroll left"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-l from-[#08070A] to-transparent p-3 rounded-l-lg"
          aria-label="Scroll right"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default function Clients() {
  return (
    <section className="py-16 border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h3 className="text-2xl font-bold">Clientes e Parceiros</h3>
          <p className="mt-3 text-gray-400">
            Empresas que confiam na Kaben para transformação digital
          </p>
        </motion.div>

        <ScrollableLogos items={clientsData} title="Clientes" />
        <ScrollableLogos items={partnersData} title="Parceiros" />
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
