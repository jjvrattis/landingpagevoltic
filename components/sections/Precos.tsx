'use client';
import { useReveal } from '@/hooks/useReveal';

const WA = 'https://wa.me/5511986997299';

const PLANS = [
  {
    name: 'Starter',
    subtitle: 'Até 50 pacotes/semana',
    price: 'R$ 13,90',
    unit: 'por pacote',
    color: '#C084FC',
    features: [
      'Coleta no polo mais próximo',
      'Entrega Same Day SP + Região Metropolitana',
      'Rastreio em tempo real',
      'Pagamento semanal via Pix',
      'Suporte via WhatsApp',
    ],
    cta: 'Começar agora',
    highlight: false,
  },
  {
    name: 'Growth',
    subtitle: '51 a 200 pacotes/semana',
    price: 'R$ 11,50',
    unit: 'por pacote',
    color: '#FFD700',
    features: [
      'Tudo do Starter',
      'Coleta prioritária no polo',
      'Dashboard com métricas',
      'Integração Mercado Livre',
      'Suporte dedicado',
    ],
    cta: 'Quero esse plano',
    highlight: true,
    badge: 'Mais popular',
  },
  {
    name: 'Scale',
    subtitle: '200+ pacotes/semana',
    price: 'Sob consulta',
    unit: 'personalizado',
    color: '#34D399',
    features: [
      'Tudo do Growth',
      'Coleta na sua operação',
      'SLA garantido em contrato',
      'Relatórios avançados',
      'Gerente de conta exclusivo',
    ],
    cta: 'Falar com comercial',
    highlight: false,
  },
];

export default function Precos() {
  const ref = useReveal();
  return (
    <section id="precos" className="py-28 px-5">
      <div className="max-w-6xl mx-auto">
        <div ref={ref} className="reveal text-center mb-16">
          <p
            className="text-xs uppercase tracking-widest font-bold mb-3"
            style={{ color: 'rgba(255,215,0,0.6)', fontFamily: 'var(--font-rajdhani)' }}
          >
            PREÇOS
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-rajdhani)',
              fontSize: 'clamp(34px,5vw,58px)',
              fontWeight: 700,
              color: '#fff',
            }}
          >
            Transparente do início ao fim.
          </h2>
          <p className="mt-4 text-base font-body" style={{ color: 'rgba(255,255,255,0.4)', maxWidth: 520, margin: '1rem auto 0' }}>
            Sem taxa de setup, sem mensalidade. Só paga pelo que envia.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {PLANS.map((plan, i) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const r = useReveal(0.1);
            return (
              <div
                key={plan.name}
                ref={r}
                className="reveal relative rounded-2xl px-7 py-8 flex flex-col"
                style={{
                  background: plan.highlight
                    ? `linear-gradient(145deg, rgba(255,215,0,0.07), rgba(147,51,234,0.05))`
                    : 'rgba(255,255,255,0.025)',
                  border: plan.highlight
                    ? `1px solid rgba(255,215,0,0.3)`
                    : '1px solid rgba(147,51,234,0.12)',
                  boxShadow: plan.highlight ? '0 0 60px rgba(255,215,0,0.08)' : 'none',
                  transitionDelay: `${i * 0.1}s`,
                }}
              >
                {plan.badge && (
                  <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase"
                    style={{
                      background: 'linear-gradient(135deg,#FFD700,#F59E0B)',
                      color: '#06040F',
                      fontFamily: 'var(--font-rajdhani)',
                    }}
                  >
                    {plan.badge}
                  </div>
                )}

                <div className="mb-6">
                  <p
                    className="text-xs uppercase tracking-widest mb-1 font-bold"
                    style={{ color: plan.color, fontFamily: 'var(--font-rajdhani)' }}
                  >
                    {plan.name}
                  </p>
                  <p className="text-xs font-body mb-5" style={{ color: 'rgba(255,255,255,0.35)' }}>
                    {plan.subtitle}
                  </p>
                  <div className="flex items-end gap-1.5">
                    <span
                      style={{
                        fontFamily: 'var(--font-rajdhani)',
                        fontSize: plan.price === 'Sob consulta' ? 28 : 38,
                        fontWeight: 800,
                        color: plan.highlight ? '#FFD700' : '#fff',
                        lineHeight: 1,
                      }}
                    >
                      {plan.price}
                    </span>
                  </div>
                  <p className="text-xs font-body mt-1" style={{ color: 'rgba(255,255,255,0.35)' }}>
                    {plan.unit}
                  </p>
                </div>

                <ul className="flex flex-col gap-3 mb-8 flex-1">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-start gap-2.5">
                      <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke={plan.color} strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm font-body" style={{ color: 'rgba(255,255,255,0.55)' }}>{f}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={WA}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold transition-all duration-200"
                  style={{
                    fontFamily: 'var(--font-rajdhani)',
                    letterSpacing: '0.04em',
                    background: plan.highlight
                      ? 'linear-gradient(135deg,#FFD700,#F59E0B)'
                      : 'rgba(255,255,255,0.06)',
                    color: plan.highlight ? '#06040F' : 'rgba(255,255,255,0.7)',
                    border: plan.highlight ? 'none' : `1px solid ${plan.color}30`,
                  }}
                >
                  {plan.cta}
                </a>
              </div>
            );
          })}
        </div>

        <p className="text-center text-xs font-body mt-8" style={{ color: 'rgba(255,255,255,0.2)' }}>
          * Preços válidos para SP capital e Região Metropolitana. Sem fidelidade mínima.
        </p>
      </div>
    </section>
  );
}
