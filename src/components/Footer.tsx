import React from 'react';
import { LogoIcon, LogoFull } from './Logo';

export default function Footer() {
  return (
    <footer className="py-8 border-t border-gray-900 mt-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {/* <div className="w-9 h-9 rounded-md bg-black border border-gray-800 flex items-center justify-center overflow-hidden">
            <LogoIcon />
          </div>
          <div>
            <div className="font-semibold">Kaben</div>
          </div> */}
          <LogoFull className="w-28 h-9" />
        </div>
        <div>
          <div className="text-xs text-gray-400">© {new Date().getFullYear()} Kaben. Todos os direitos reservados.</div>
        </div>
        <div className="text-sm text-gray-400">Siga-nos: <span className="ml-2"><a href="https://linkedin.com/company/kaben" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a> • <a href="https://github.com/kabentech" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a> • <a href="https://instagram.com/kabentech" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a> • <a href="https://twitter.com/kabentech" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Twitter</a></span></div>
      </div>
    </footer>
  );
}
