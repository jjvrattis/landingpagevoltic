'use client';

import Image from 'next/image';

const WA = 'https://wa.me/5511986997299';

export default function Footer() {
  return (
    <footer className="px-6 py-12" style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: '#050505' }}>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Brand */}
          <div>
            <Image src="/logo.png" alt="Voltic" width={90} height={36} style={{ objectFit: 'contain' }} />
            <p className="text-xs mt-3" style={{ color: 'rgba(255,255,255,0.2)', maxWidth: 240, fontFamily: 'var(--font-inter)', lineHeight: 1.6 }}>
              Logística Same Day para sellers.<br />
              São Paulo e região metropolitana.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-8">
            {[
              { label: 'Como funciona', href: '#como-funciona' },
              { label: 'Preços', href: '#precos' },
              { label: 'Área de atuação', href: '#area' },
              { label: 'WhatsApp', href: WA },
            ].map(l => (
              <a
                key={l.href}
                href={l.href}
                target={l.href.startsWith('http') ? '_blank' : undefined}
                rel={l.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="text-xs uppercase tracking-widest transition-colors duration-200"
                style={{ color: 'rgba(255,255,255,0.25)', fontFamily: 'var(--font-rajdhani)', letterSpacing: '0.12em' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#FFD700')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.25)')}
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.12)', fontFamily: 'var(--font-inter)' }}>
            © {new Date().getFullYear()} Voltic Logística. Todos os direitos reservados.
          </p>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.08)', fontFamily: 'var(--font-inter)' }}>
            São Paulo, SP
          </p>
        </div>
      </div>
    </footer>
  );
}
