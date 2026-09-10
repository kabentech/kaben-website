import { LogoFull } from './Logo';

const SOCIAL_LINKS = [
  { label: 'LinkedIn', href: 'https://linkedin.com/company/kaben' },
  { label: 'GitHub', href: 'https://github.com/kabentech' },
  { label: 'Instagram', href: 'https://instagram.com/kabentech' },
  { label: 'Twitter', href: 'https://twitter.com/kabentech' },
];

export default function Footer() {
  return (
    <footer className="py-10 border-t border-line">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <LogoFull className="w-24 h-7" />

        <p className="text-xs text-muted">© {new Date().getFullYear()} Kaben. Todos os direitos reservados.</p>

        <nav className="flex items-center gap-4 text-sm text-gray-400">
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
