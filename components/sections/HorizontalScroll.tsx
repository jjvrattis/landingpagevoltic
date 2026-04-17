'use client';

import { useEffect, useRef } from 'react';
import SplitReveal from '@/components/SplitReveal';
import Icon3D from '@/components/Icon3D';

const WA = 'https://wa.me/5511986997299';

const PANELS = [
  {
    n: '01',
    icon: '/icons/balao.png',
    title: ['Você leva', 'os pacotes.'],
    body: 'Leve seus pacotes no ponto de coleta do seu polo até às 14h. Sem agendamento complicado. Sem burocracia.',
    color: '#FFD700',
    bg: 'rgba(255,215,0,0.04)',
  },
  {
    n: '02',
    icon: '/icons/moto.png',
    title: ['A Voltic', 'coleta tudo.'],
    body: 'Nossa equipe passa nos pontos de coleta e roteiriza tudo na hora no hub central da Brás.',
    color: '#C084FC',
    bg: 'rgba(192,132,252,0.04)',
  },
  {
    n: '03',
    icon: '/icons/localiza.png',
    title: ['Seu cliente', 'recebe hoje.'],
    body: 'Entrega realizada no mesmo dia em São Paulo capital e toda a região metropolitana. Com rastreio ao vivo.',
    color: '#34D399',
    bg: 'rgba(52,211,153,0.04)',
  },
  {
    n: '04',
    icon: '/icons/dinheiro.png',
    title: ['Você paga', 'no Pix.'],
    body: 'Fechamento semanal via Pix. Simples, rápido e sem surpresa no boleto.',
    color: '#60A5FA',
    bg: 'rgba(96,165,250,0.04)',
    cta: true,
  },
];

export default function HorizontalScroll() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef   = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track   = trackRef.current;
    if (!section || !track) return;

    const onScroll = () => {
      const sectionTop  = section.offsetTop;
      const scrolled    = window.scrollY - sectionTop;
      const totalScroll = section.offsetHeight - window.innerHeight;
      const progress    = Math.max(0, Math.min(1, scrolled / totalScroll));

      const maxTranslate = track.scrollWidth - window.innerWidth;
      track.style.transform = `translateX(${-progress * maxTranslate}px)`;

      if (progressRef.current) {
        progressRef.current.style.width = `${progress * 100}%`;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* ── MOBILE: vertical steps ──────────────────────────────────── */}
      <div id="como-funciona" className="md:hidden py-20 px-6" style={{ background: '#050505' }}>
        <p className="text-xs uppercase tracking-[0.22em] mb-12"
          style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-rajdhani)' }}>
          Processo — Simples assim
        </p>
        <div className="flex flex-col gap-0">
          {PANELS.map((panel, i) => (
            <div key={panel.n} style={{ borderLeft: `2px solid ${panel.color}22` }}>
              <div className="pl-6 py-10" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <span className="text-xs font-bold mb-3 block"
                  style={{ color: panel.color, fontFamily: 'var(--font-rajdhani)', letterSpacing: '0.1em' }}>
                  {panel.n}
                </span>
                <h2 className="mb-4"
                  style={{
                    fontFamily: 'var(--font-rajdhani)',
                    fontSize: 'clamp(32px,8vw,48px)',
                    fontWeight: 700,
                    color: '#fff',
                    letterSpacing: '-0.02em',
                    lineHeight: 0.95,
                  }}>
                  {panel.title.join(' ')}
                </h2>
                <p className="text-sm leading-relaxed mb-6"
                  style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-inter)' }}>
                  {panel.body}
                </p>
                {panel.cta && (
                  <a href={WA} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold"
                    style={{
                      fontFamily: 'var(--font-rajdhani)',
                      letterSpacing: '0.1em',
                      background: '#FFD700',
                      color: '#050505',
                      clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)',
                    }}>
                    QUERO COMEÇAR
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── DESKTOP: horizontal scroll ──────────────────────────────── */}
      <div
        ref={sectionRef}
        className="hidden md:block"
        style={{ height: `${PANELS.length * 100}vh` }}
      >
        <div className="sticky top-0 h-screen overflow-hidden flex flex-col">

          <div className="absolute top-0 left-0 right-0 h-px z-20" style={{ background: 'rgba(255,255,255,0.06)' }}>
            <div ref={progressRef} className="h-full transition-none" style={{ background: '#FFD700', width: '0%' }} />
          </div>

          <div className="absolute top-8 left-12 z-20 flex items-center gap-3">
            <p className="text-xs uppercase tracking-[0.22em]"
              style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-rajdhani)' }}>
              Processo
            </p>
            <span style={{ color: 'rgba(255,255,255,0.1)' }}>—</span>
            <p className="text-xs uppercase tracking-[0.22em]"
              style={{ color: 'rgba(255,255,255,0.15)', fontFamily: 'var(--font-rajdhani)' }}>
              Simples assim
            </p>
          </div>

          <div
            ref={trackRef}
            className="flex h-full"
            style={{ width: `${PANELS.length * 100}vw`, willChange: 'transform', transition: 'transform 0.05s linear' }}
          >
            {PANELS.map((panel, i) => (
              <div
                key={panel.n}
                className="flex-shrink-0 w-screen h-full flex items-center"
                style={{ background: panel.bg, borderRight: i < PANELS.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}
              >
                <div className="max-w-7xl mx-auto px-16 w-full grid grid-cols-2 gap-12 items-center">
                  <div>
                    <span className="font-black leading-none select-none block"
                      style={{ fontFamily: 'var(--font-rajdhani)', fontSize: 120, color: panel.color, opacity: 0.12, marginBottom: -32, lineHeight: 1 }}>
                      {panel.n}
                    </span>
                    <SplitReveal lines={panel.title} as="h2" direction="right" delay={100}
                      style={{ fontFamily: 'var(--font-rajdhani)', fontSize: 'clamp(48px,7vw,88px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', lineHeight: 0.95, marginBottom: 28 }}
                    />
                    <p className="text-base leading-relaxed mb-10"
                      style={{ color: 'rgba(255,255,255,0.4)', maxWidth: 400, fontFamily: 'var(--font-inter)' }}>
                      {panel.body}
                    </p>
                    {panel.cta && (
                      <a href={WA} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-8 py-4 text-sm font-bold transition-all duration-200"
                        style={{ fontFamily: 'var(--font-rajdhani)', letterSpacing: '0.1em', background: '#FFD700', color: '#050505', clipPath: 'polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)' }}
                        onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = '#fff')}
                        onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = '#FFD700')}>
                        QUERO COMEÇAR
                      </a>
                    )}
                  </div>
                  <div className="flex items-center justify-center">
                    <Icon3D src={panel.icon} size={280} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="absolute bottom-8 right-12 z-20 flex gap-2">
            {PANELS.map((p) => (
              <div key={p.n} className="h-px" style={{ width: 24, background: p.color, opacity: 0.3 }} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
