'use client';
import { useReveal } from '@/hooks/useReveal';
import SplitReveal from '@/components/SplitReveal';

export default function Problem() {
  const ref = useReveal();
  return (
    <section className="py-16 md:py-32 px-6" style={{ background: '#050505' }}>
      <div ref={ref} className="reveal max-w-5xl mx-auto">

        {/* Eyebrow */}
        <p className="text-xs uppercase tracking-[0.22em] mb-6"
          style={{ color: '#FFD700', fontFamily: 'var(--font-rajdhani)' }}>
          O problema
        </p>

        <SplitReveal
          lines={['Você ainda', 'entrega em D+3?']}
          as="h2"
          direction="right"
          className="mb-6"
          style={{
            fontFamily: 'var(--font-rajdhani)',
            fontSize: 'clamp(42px, 6vw, 80px)',
            fontWeight: 700,
            color: '#fff',
            letterSpacing: '-0.02em',
            lineHeight: 0.95,
          }}
        />

        <hr className="rule-gold mb-12" style={{ maxWidth: 120 }} />

        <p className="text-lg mb-16 leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)', maxWidth: 560, fontFamily: 'var(--font-inter)' }}>
          Enquanto você espera 3 dias pra sua transportadora entregar,
          seu concorrente já mandou, o cliente já recebeu e já avaliou com 5 estrelas.
        </p>

        {/* 3 statements — no cards, just raw text blocks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 stagger">
          {[
            { num: '01', text: 'Cada dia de atraso é uma avaliação ruim.' },
            { num: '02', text: 'Cada avaliação ruim é menos venda.' },
            { num: '03', text: 'Cada menos venda é dinheiro deixado na mesa.' },
          ].map(item => (
            <div
              key={item.num}
              className="reveal py-8 pr-8"
              style={{ borderLeft: '1px solid rgba(239,68,68,0.2)', paddingLeft: 28 }}
            >
              <span
                className="text-xs font-bold tracking-widest mb-3 block"
                style={{ color: 'rgba(239,68,68,0.5)', fontFamily: 'var(--font-rajdhani)' }}
              >
                {item.num}
              </span>
              <p className="text-base leading-snug" style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-inter)' }}>
                {item.text}
              </p>
            </div>
          ))}
        </div>

        {/* Impact line — LN style: huge isolated quote */}
        <div className="mt-20 pt-16" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <p
            style={{
              fontFamily: 'var(--font-rajdhani)',
              fontSize: 'clamp(28px, 4vw, 52px)',
              fontWeight: 700,
              color: '#FFD700',
              letterSpacing: '-0.01em',
            }}
          >
            Same day não é luxo.
            <br />
            <span style={{ color: 'rgba(255,255,255,0.35)' }}>É vantagem competitiva.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
