'use client';
import dynamic from 'next/dynamic';
import { useReveal } from '@/hooks/useReveal';
import SplitReveal from '@/components/SplitReveal';

const CoverageMap = dynamic(() => import('@/components/CoverageMap'), { ssr: false });

const STATS = [
  { value: 'SP Capital', label: 'Cobertura total' },
  { value: 'Metropolitana SP', label: 'Região metropolitana completa' },
  { value: '1 Hub', label: 'Hub Brás · Centro' },
  { value: 'Expandindo', label: 'para toda Grande SP' },
];

export default function AreaAtuacao() {
  const ref = useReveal();

  return (
    <section id="area" className="py-32 px-6" style={{ background: '#050505' }}>
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div ref={ref} className="reveal mb-16">
          <p className="text-xs uppercase tracking-[0.22em] mb-4"
            style={{ color: '#FFD700', fontFamily: 'var(--font-rajdhani)' }}>
            Cobertura
          </p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <SplitReveal
              lines={['Onde a', 'Voltic entrega.']}
              as="h2"
              direction="right"
              style={{
                fontFamily: 'var(--font-rajdhani)',
                fontSize: 'clamp(42px, 6vw, 80px)',
                fontWeight: 700,
                color: '#fff',
                letterSpacing: '-0.02em',
                lineHeight: 0.95,
              }}
            />
            <p className="text-sm md:max-w-xs leading-relaxed md:text-right"
              style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-inter)' }}>
              São Paulo capital e toda a região metropolitana, com expansão contínua.
            </p>
          </div>
        </div>

        {/* 2-col: stats + map */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Left: stats table */}
          <div>
            <div style={{ height: 1, background: 'rgba(255,255,255,0.06)' }} />

            {STATS.map((stat, i) => {
              // eslint-disable-next-line react-hooks/rules-of-hooks
              const r = useReveal(0.1);
              return (
                <div key={stat.label} ref={r} className="reveal group" style={{ transitionDelay: `${i * 0.07}s` }}>
                  <div
                    className="grid grid-cols-12 items-center py-7 transition-all duration-300 cursor-default"
                    onMouseEnter={e => (e.currentTarget.style.paddingLeft = '12px')}
                    onMouseLeave={e => (e.currentTarget.style.paddingLeft = '0px')}
                  >
                    {/* Index */}
                    <div className="col-span-1">
                      <span className="text-xs font-bold"
                        style={{ color: 'rgba(255,255,255,0.15)', fontFamily: 'var(--font-rajdhani)', letterSpacing: '0.1em' }}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>

                    {/* Value */}
                    <div className="col-span-6">
                      <span
                        className="font-black transition-colors duration-300"
                        style={{
                          fontFamily: 'var(--font-rajdhani)',
                          fontSize: 'clamp(20px, 2.5vw, 36px)',
                          color: 'rgba(255,255,255,0.8)',
                          letterSpacing: '-0.01em',
                        }}
                      >
                        {stat.value}
                      </span>
                    </div>

                    {/* Label */}
                    <div className="col-span-4">
                      <span className="text-xs leading-snug"
                        style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-inter)' }}>
                        {stat.label}
                      </span>
                    </div>

                    {/* Accent bar */}
                    <div className="col-span-1 flex justify-end">
                      <div className="h-px w-0 transition-all duration-500 group-hover:w-6"
                        style={{ background: '#FFD700' }} />
                    </div>
                  </div>
                  <div style={{ height: 1, background: 'rgba(255,255,255,0.06)' }} />
                </div>
              );
            })}

            {/* Hub spotlight */}
            <div className="mt-10 flex items-center gap-4">
              <div
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ background: '#FFD700', boxShadow: '0 0 10px #FFD700', flexShrink: 0 }}
              />
              <div>
                <span style={{ fontFamily: 'var(--font-rajdhani)', fontSize: 18, fontWeight: 700, color: '#FFD700' }}>
                  Hub Brás
                </span>
                <span className="text-xs ml-3" style={{ color: 'rgba(255,255,255,0.25)', fontFamily: 'var(--font-inter)' }}>
                  Centro de SP · Ativo
                </span>
              </div>
            </div>
          </div>

          {/* Right: map */}
          <div style={{ height: 480, minHeight: 380 }}>
            <CoverageMap />
          </div>

        </div>
      </div>
    </section>
  );
}
