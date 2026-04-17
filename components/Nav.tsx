'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

const WA = 'https://wa.me/5511986997299';
const LINKS = [
  { label: 'Como funciona', href: '#como-funciona' },
  { label: 'Preços',        href: '#precos' },
  { label: 'Área de atuação', href: '#area' },
  { label: 'Contato',       href: '#contato' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? 'rgba(5,5,5,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(24px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(24px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-18" style={{ height: 72 }}>
        {/* Logo */}
        <a href="#" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Voltic"
            width={165}
            height={66}
            className="w-[110px] md:w-[165px] h-auto"
            style={{ objectFit: 'contain' }}
            priority
          />
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-10">
          {LINKS.map(l => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm tracking-wide transition-colors duration-200"
              style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-inter)', letterSpacing: '0.02em' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#FFD700')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href={WA}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex items-center gap-2 px-5 py-2.5 text-sm font-bold transition-all duration-200"
          style={{
            fontFamily: 'var(--font-rajdhani)',
            letterSpacing: '0.08em',
            background: '#FFD700',
            color: '#050505',
            clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)',
          }}
          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = '#fff')}
          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = '#FFD700')}
        >
          FALAR AGORA
        </a>

        {/* Hamburger */}
        <button className="md:hidden p-2" onClick={() => setOpen(!open)}>
          <span style={{ color: '#FFD700' }}>
            {open ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </span>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="md:hidden px-6 pb-6 flex flex-col gap-5"
          style={{ background: 'rgba(5,5,5,0.98)', borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          {LINKS.map(l => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-sm py-1 tracking-wide"
              style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-inter)' }}
            >
              {l.label}
            </a>
          ))}
          <a
            href={WA}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center py-3 text-sm font-bold"
            style={{
              background: '#FFD700',
              color: '#050505',
              fontFamily: 'var(--font-rajdhani)',
              letterSpacing: '0.08em',
              clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)',
            }}
          >
            FALAR AGORA
          </a>
        </div>
      )}
    </nav>
  );
}
