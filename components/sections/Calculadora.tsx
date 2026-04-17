'use client';

import { useState, useCallback } from 'react';

const WA = 'https://wa.me/5511986997299';

function getPrice(pkgs: number) {
  if (pkgs <= 50)  return 13.90;
  if (pkgs <= 200) return 11.50;
  return 10.50; // Scale
}

function getPlan(pkgs: number) {
  if (pkgs <= 50)  return 'Starter';
  if (pkgs <= 200) return 'Growth';
  return 'Scale';
}

const TRADITIONAL_PRICE = 28.00; // avg same-day competitor

export default function Calculadora() {
  const [pkgs, setPkgs] = useState(80);

  const price      = getPrice(pkgs);
  const plan       = getPlan(pkgs);
  const weekly     = pkgs * price;
  const monthly    = weekly * 4.3;
  const tradWeekly = pkgs * TRADITIONAL_PRICE;
  const saving     = tradWeekly - weekly;
  const savingPct  = Math.round((saving / tradWeekly) * 100);

  const handleSlider = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPkgs(Number(e.target.value));
  }, []);

  return (
    <section className="py-32 px-6" style={{ background: '#080808' }}>
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-16">
          <p className="text-xs uppercase tracking-[0.22em] mb-4"
            style={{ color: '#FFD700', fontFamily: 'var(--font-rajdhani)' }}>
            Calculadora
          </p>
          <h2 style={{
            fontFamily: 'var(--font-rajdhani)',
            fontSize: 'clamp(38px, 5.5vw, 72px)',
            fontWeight: 700,
            color: '#fff',
            letterSpacing: '-0.02em',
            lineHeight: 0.95,
          }}>
            Quanto você<br />
            <span style={{ color: '#FFD700' }}>vai economizar?</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Left: slider */}
          <div>
            <div className="flex items-end justify-between mb-4">
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-inter)' }}>
                Pacotes por semana
              </p>
              <div className="flex items-baseline gap-1">
                <span style={{
                  fontFamily: 'var(--font-rajdhani)',
                  fontSize: 48,
                  fontWeight: 800,
                  color: '#FFD700',
                  lineHeight: 1,
                }}>
                  {pkgs}
                </span>
                <span className="text-sm" style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-inter)' }}>
                  pkgs/sem
                </span>
              </div>
            </div>

            {/* Slider */}
            <div className="relative mb-3">
              <input
                type="range"
                min={1}
                max={400}
                value={pkgs}
                onChange={handleSlider}
                className="w-full appearance-none h-1 rounded-full outline-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #FFD700 ${(pkgs / 400) * 100}%, rgba(255,255,255,0.1) ${(pkgs / 400) * 100}%)`,
                  accentColor: '#FFD700',
                }}
              />
            </div>
            <div className="flex justify-between text-xs" style={{ color: 'rgba(255,255,255,0.2)', fontFamily: 'var(--font-rajdhani)' }}>
              <span>1</span>
              <span>100</span>
              <span>200</span>
              <span>300</span>
              <span>400+</span>
            </div>

            {/* Plan badge */}
            <div className="mt-8 flex items-center gap-3">
              <div
                className="px-4 py-1.5 text-xs font-bold uppercase tracking-widest"
                style={{
                  background: 'rgba(255,215,0,0.1)',
                  border: '1px solid rgba(255,215,0,0.3)',
                  color: '#FFD700',
                  fontFamily: 'var(--font-rajdhani)',
                  clipPath: 'polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)',
                }}
              >
                Plano {plan}
              </div>
              <span className="text-sm" style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-inter)' }}>
                R$ {price.toFixed(2).replace('.', ',')} por pacote
              </span>
            </div>

            {/* Savings highlight */}
            <div
              className="mt-6 p-5 rounded-2xl"
              style={{ background: 'rgba(52,211,153,0.06)', border: '1px solid rgba(52,211,153,0.2)' }}
            >
              <p className="text-xs uppercase tracking-widest mb-1"
                style={{ color: 'rgba(52,211,153,0.7)', fontFamily: 'var(--font-rajdhani)' }}>
                Economia vs concorrência
              </p>
              <div className="flex items-end gap-2">
                <span style={{
                  fontFamily: 'var(--font-rajdhani)',
                  fontSize: 40,
                  fontWeight: 800,
                  color: '#34D399',
                  lineHeight: 1,
                }}>
                  {savingPct}%
                </span>
                <span className="text-sm pb-1" style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-inter)' }}>
                  menos por semana
                </span>
              </div>
              <p className="text-xs mt-2" style={{ color: 'rgba(255,255,255,0.25)', fontFamily: 'var(--font-inter)' }}>
                *Comparado à média de R$ {TRADITIONAL_PRICE.toFixed(2).replace('.', ',')} de concorrentes same-day
              </p>
            </div>
          </div>

          {/* Right: cost breakdown */}
          <div className="flex flex-col gap-0">
            <div style={{ height: 1, background: 'rgba(255,255,255,0.06)' }} />

            {[
              { label: 'Custo semanal', value: `R$ ${weekly.toFixed(2).replace('.', ',')}`, accent: false },
              { label: 'Custo mensal estimado', value: `R$ ${monthly.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`, accent: false },
              { label: 'Concorrência cobaria', value: `R$ ${tradWeekly.toFixed(2).replace('.', ',')}`, accent: false, muted: true },
              { label: 'Você economiza por semana', value: `R$ ${saving.toFixed(2).replace('.', ',')}`, accent: true },
            ].map((row) => (
              <div key={row.label}>
                <div className="flex items-center justify-between py-6">
                  <span className="text-sm" style={{
                    color: row.muted ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.45)',
                    fontFamily: 'var(--font-inter)',
                    textDecoration: row.muted ? 'line-through' : 'none',
                  }}>
                    {row.label}
                  </span>
                  <span style={{
                    fontFamily: 'var(--font-rajdhani)',
                    fontSize: row.accent ? 28 : 22,
                    fontWeight: 700,
                    color: row.accent ? '#34D399' : row.muted ? 'rgba(255,255,255,0.2)' : '#fff',
                    letterSpacing: '-0.01em',
                  }}>
                    {row.value}
                  </span>
                </div>
                <div style={{ height: 1, background: 'rgba(255,255,255,0.06)' }} />
              </div>
            ))}

            <a
              href={`${WA}?text=Ol%C3%A1!%20Tenho%20${pkgs}%20pacotes%20por%20semana%20e%20quero%20come%C3%A7ar%20com%20a%20Voltic.`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 flex items-center justify-center gap-2 py-4 text-sm font-bold transition-all duration-200"
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
              QUERO ENTREGAR {pkgs} PACOTES/SEMANA
            </a>
          </div>
        </div>
      </div>

      <style>{`
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #FFD700;
          cursor: pointer;
          box-shadow: 0 0 12px rgba(255,215,0,0.5);
        }
        input[type=range]::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #FFD700;
          cursor: pointer;
          border: none;
          box-shadow: 0 0 12px rgba(255,215,0,0.5);
        }
      `}</style>
    </section>
  );
}
