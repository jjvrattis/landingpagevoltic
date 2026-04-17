'use client';
import { useReveal } from '@/hooks/useReveal';

const STEPS = [
  {
    n: '01',
    title: 'Você leva os pacotes',
    desc: 'Leve seus pacotes no ponto de coleta do seu polo até às 14h. Sem agendamento complicado. Sem burocracia.',
    color: '#FFD700',
  },
  {
    n: '02',
    title: 'A Voltic coleta',
    desc: 'Nossa equipe passa nos pontos de coleta e roteiriza tudo na hora no hub central.',
    color: '#C084FC',
  },
  {
    n: '03',
    title: 'Seu cliente recebe hoje',
    desc: 'Entrega realizada no mesmo dia em São Paulo capital e ABC Paulista. Com rastreio.',
    color: '#34D399',
  },
  {
    n: '04',
    title: 'Você paga no Pix',
    desc: 'Fechamento semanal via Pix. Simples, rápido e sem surpresa no boleto.',
    color: '#60A5FA',
  },
];

export default function HowItWorks() {
  const ref = useReveal();
  return (
    <section id="como-funciona" className="py-28 px-5">
      <div className="max-w-5xl mx-auto">
        <div ref={ref} className="reveal text-center mb-16">
          <p className="text-xs uppercase tracking-widest font-bold mb-3"
            style={{ color: 'rgba(255,215,0,0.6)', fontFamily: 'var(--font-rajdhani)' }}>
            PROCESSO
          </p>
          <h2 style={{ fontFamily: 'var(--font-rajdhani)', fontSize: 'clamp(34px,5vw,58px)', fontWeight: 700, color: '#fff' }}>
            Simples assim.
          </h2>
        </div>

        <div className="relative">
          {/* Connecting line */}
          <div
            className="absolute left-[27px] md:left-1/2 top-0 bottom-0 w-px hidden md:block"
            style={{ background: 'linear-gradient(180deg, rgba(255,215,0,0.3) 0%, rgba(147,51,234,0.3) 100%)' }}
          />

          <div className="flex flex-col gap-10">
            {STEPS.map((step, i) => {
              // eslint-disable-next-line react-hooks/rules-of-hooks
              const r = useReveal(0.1);
              return (
                <div
                  key={step.n}
                  ref={r}
                  className="reveal flex flex-col md:flex-row items-start md:items-center gap-6"
                  style={{ transitionDelay: `${i * 0.1}s` }}
                >
                  {/* Number bubble */}
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 relative z-10"
                    style={{
                      background: `${step.color}18`,
                      border: `1px solid ${step.color}35`,
                      boxShadow: `0 0 20px ${step.color}22`,
                    }}
                  >
                    <span style={{ fontFamily: 'var(--font-rajdhani)', fontSize: 20, fontWeight: 800, color: step.color }}>
                      {step.n}
                    </span>
                  </div>

                  {/* Card */}
                  <div
                    className="flex-1 rounded-2xl px-7 py-6"
                    style={{
                      background: 'rgba(255,255,255,0.025)',
                      border: '1px solid rgba(147,51,234,0.12)',
                    }}
                  >
                    <h3
                      className="text-xl font-bold mb-2"
                      style={{ fontFamily: 'var(--font-rajdhani)', color: '#fff', letterSpacing: '0.02em' }}
                    >
                      {step.title}
                    </h3>
                    <p className="text-sm font-body leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
