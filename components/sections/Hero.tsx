'use client';

import dynamic from 'next/dynamic';

const MapMoto = dynamic(() => import('@/components/MapMoto'), { ssr: false });

const WA = 'https://wa.me/5511986997299';

const STATS = [
  { value: 'Same Day',      label: 'Garantido' },
  { value: 'R$ 11,50',     label: 'por pacote ML' },
  { value: 'Sem contrato', label: 'mínimo' },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col" id="home">
      {/* Map — full viewport background */}
      <div className="absolute inset-0 z-0">
        <MapMoto />
        {/* Dark gradient overlay — heavier on left like LN */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(to right, rgba(5,5,5,0.97) 0%, rgba(5,5,5,0.90) 35%, rgba(5,5,5,0.50) 60%, rgba(5,5,5,0.10) 100%),
              linear-gradient(to top, rgba(5,5,5,0.95) 0%, transparent 30%)
            `,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex items-center max-w-7xl mx-auto px-6 w-full pt-24 md:pt-28 pb-10 md:pb-16">
        <div className="max-w-xl">

          {/* Eyebrow — LN style: small caps, no pill */}
          <p
            className="text-xs uppercase tracking-[0.22em] mb-7"
            style={{
              color: '#FFD700',
              fontFamily: 'var(--font-rajdhani)',
              animation: 'fadeUp 0.5s ease-out 0.1s both',
            }}
          >
            Logística Same Day · Capital &amp; Região Metropolitana
          </p>

          {/* Headline — brutal and large like LN */}
          <h1
            className="leading-[0.88] mb-8"
            style={{
              fontFamily: 'var(--font-rajdhani)',
              fontSize: 'clamp(64px, 10vw, 112px)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              animation: 'fadeUp 0.6s ease-out 0.2s both',
            }}
          >
            <span className="text-white block">Seu pacote</span>
            <span className="text-white block">entregue</span>
            <span className="text-gold-gradient block">hoje.</span>
          </h1>

          {/* Sub */}
          <p
            className="text-base mb-8 md:mb-10 leading-relaxed max-w-sm"
            style={{
              color: 'rgba(255,255,255,0.45)',
              fontFamily: 'var(--font-inter)',
              animation: 'fadeUp 0.6s ease-out 0.35s both',
            }}
          >
            O cliente compra de manhã e recebe ainda hoje.
            Coleta nos polos, entrega em toda SP e região metropolitana.
          </p>

          {/* CTAs — LN slash style */}
          <div
            className="flex flex-wrap gap-3 mb-10 md:mb-16"
            style={{ animation: 'fadeUp 0.6s ease-out 0.45s both' }}
          >
            <a
              href={WA}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 px-8 py-4 text-sm font-bold transition-all duration-200"
              style={{
                fontFamily: 'var(--font-rajdhani)',
                letterSpacing: '0.1em',
                background: '#FFD700',
                color: '#050505',
                clipPath: 'polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)',
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = '#fff')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = '#FFD700')}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.025.507 3.934 1.395 5.608L0 24l6.545-1.371A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.007-1.373l-.36-.214-3.724.978.993-3.641-.234-.374A9.818 9.818 0 1112 21.818z"/>
              </svg>
              QUERO COMEÇAR
            </a>
            <a
              href="#como-funciona"
              className="flex items-center gap-2 px-8 py-4 text-sm font-bold transition-all duration-200"
              style={{
                fontFamily: 'var(--font-rajdhani)',
                letterSpacing: '0.1em',
                color: 'rgba(255,255,255,0.55)',
                border: '1px solid rgba(255,255,255,0.12)',
                clipPath: 'polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.color = '#FFD700';
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,215,0,0.4)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.55)';
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.12)';
              }}
            >
              VER COMO FUNCIONA
            </a>
          </div>

          {/* Stats — inline, no cards */}
          <div
            className="flex flex-wrap gap-x-10 gap-y-4"
            style={{ animation: 'fadeUp 0.6s ease-out 0.55s both' }}
          >
            {STATS.map((s, i) => (
              <div key={s.label} className="flex flex-col">
                <span
                  className="text-2xl font-black leading-tight"
                  style={{ fontFamily: 'var(--font-rajdhani)', color: '#FFD700', letterSpacing: '0.02em' }}
                >
                  {s.value}
                </span>
                <span
                  className="text-[11px] uppercase tracking-widest mt-0.5"
                  style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-rajdhani)' }}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div className="relative z-10 flex justify-center pb-8" style={{ animation: 'fadeUp 1s ease-out 1.1s both' }}>
        <div className="flex flex-col items-center gap-1.5">
          <span className="text-[9px] uppercase tracking-[0.25em]" style={{ color: 'rgba(255,255,255,0.18)' }}>
            scroll
          </span>
          <div className="w-px h-10 animate-pulse" style={{ background: 'linear-gradient(to bottom, rgba(255,215,0,0.5), transparent)' }} />
        </div>
      </div>
    </section>
  );
}
