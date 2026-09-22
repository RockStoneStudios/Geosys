'use client';
import { ReactNode, useState } from 'react';

interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'VISOR', href: 'visor' },
  { label: 'PLATAFORMA', href: 'platform' },
  { label: 'PIPELINE', href: '#pipeline' },
  { label: 'CASOS', href: '#cases' },
];

export function Header(): ReactNode {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0A0A0B]/90 backdrop-blur-md border-b border-[rgba(237,234,227,0.11)]">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <a href="#" className="flex items-center gap-3">
          <div className="w-3 h-3 bg-[#FF9E1B] cut-corner" />
          <span className="font-mono text-sm tracking-[0.18em] font-semibold uppercase text-[#EDEAE3]">
            GEO<span className="text-[#FF9E1B]">SYS</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="font-mono text-[11px] tracking-[0.16em] uppercase text-[#9A968C] hover:text-[#EDEAE3] transition-colors duration-200"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* CTA & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <a
            href="#access"
            className="hidden sm:inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] uppercase px-4 py-2.5 bg-[#FF9E1B] border border-[#FF9E1B] text-[#0A0A0B] font-semibold hover:bg-[#EDEAE3] hover:border-[#EDEAE3] transition-all duration-200 cut-corner"
          >
            SOLICITAR ACCESO
          </a>

          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden p-2 text-[#9A968C] hover:text-[#EDEAE3]"
            aria-label="Toggle Navigation"
            type="button"
          >
            <div className="w-5 flex flex-col gap-1.5">
              <span className={`h-0.5 bg-current transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`h-0.5 bg-current transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`h-0.5 bg-current transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[rgba(237,234,227,0.11)] bg-[#0D0D0F] px-4 py-6 flex flex-col gap-4">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="font-mono text-xs tracking-[0.16em] uppercase text-[#9A968C] hover:text-[#EDEAE3]"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#access"
            onClick={() => setMobileMenuOpen(false)}
            className="mt-2 inline-flex justify-center items-center font-mono text-xs tracking-[0.14em] uppercase px-4 py-3 bg-[#FF9E1B] text-[#0A0A0B] font-semibold cut-corner"
          >
            SOLICITAR ACCESO
          </a>
        </div>
      )}
    </header>
  );
}