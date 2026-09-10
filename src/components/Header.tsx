import { LogoFull } from './Logo';

const NAV_LINKS = [
  { href: '#solutions', label: 'Soluções' },
  { href: '#technology', label: 'Tecnologia' },
  { href: '#about', label: 'Sobre' },
  { href: '#contact', label: 'Contato' },
];

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-line/60 bg-background/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#hero" aria-label="Kaben - início">
          <LogoFull className="w-28 h-8" />
        </a>

        <nav className="hidden md:flex items-center gap-8 text-sm text-gray-300">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-white transition-colors">
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="px-4 py-2 rounded-full bg-accent-gradient text-black text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          Fale conosco
        </a>
      </div>
    </header>
  );
}
