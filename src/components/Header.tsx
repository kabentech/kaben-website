import { LogoFull } from './Logo';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/30 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-black border border-gray-800 flex items-center justify-center shadow-lg overflow-hidden">
            <LogoIcon />
          </div>
          <div>
            <div className="text-white font-semibold tracking-wide">Kaben</div>
            <div className="text-xs text-gray-400 leading-3">Tech</div>
          </div>
        </div> */}
        <div className="flex items-center gap-4">
          <LogoFull className="w-32 h-10" />
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm">
          <a href="#hero" className="hover:text-white">Início</a>
          <a href="#solutions" className="hover:text-white">Soluções</a>
          <a href="#tech" className="hover:text-white">Tecnologia</a>
          <a href="#consulting" className="hover:text-white">Consultoria</a>
          <a href="#about" className="hover:text-white">Sobre</a>
          <a href="#contact" className="hover:text-white">Contato</a>
        </nav>

        <div className="flex items-center gap-3">
          <a href="#contact" className="hidden md:inline-block px-4 py-2 rounded-md bg-gradient-to-r from-[#5EE7FF] to-[#8A5CFF] text-black font-medium hover:opacity-95">Fale conosco</a>
          <button className="inline-flex items-center gap-2 p-2 rounded-md border border-gray-800 hover:bg-white/3">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L12 12" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M5 9L12 16L19 9" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
