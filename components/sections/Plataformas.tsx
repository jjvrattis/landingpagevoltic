'use client';
import Image from 'next/image';
import { useReveal } from '@/hooks/useReveal';

const PLATFORMS = [
  {
    name: 'Mercado Livre',
    desc: 'Conecte sua conta ML em 2 minutos. Cada pedido aprovado vira entrega Same Day automaticamente.',
    icon: '/icons/ml.png',
    color: '#FFE600',
    status: 'Disponível agora',
    isLogo: true,
  },
  {
    name: 'Shopee',
    desc: 'Integração direta com sua loja Shopee. Gerencie seus pedidos e entregas em um só lugar.',
    icon: '/icons/shopee.png',
    color: '#EE4D2D',
    status: 'Disponível agora',
    isLogo: true,
  },
  {
    name: 'Loja Própria',
    desc: 'Vende pelo seu site ou WhatsApp? Gere etiquetas de entrega direto pelo app do vendedor.',
    icon: '🏪',
    color: '#34D399',
    status: 'Em breve',
  },
];

export default function Plataformas() {
  const ref = useReveal();
  return (
    <section className="py-28 px-5">
      <div className="max-w-5xl mx-auto">
        <div ref={ref} className="reveal text-center mb-16">
          <p
            className="text-xs uppercase tracking-widest font-bold mb-3"
            style={{ color: 'rgba(255,215,0,0.6)', fontFamily: 'var(--font-rajdhani)' }}
          >
            INTEGRAÇÕES
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-rajdhani)',
              fontSize: 'clamp(34px,5vw,58px)',
              fontWeight: 700,
              color: '#fff',
            }}
          >
            Plugue na sua loja.{' '}
            <span style={{ color: '#FFD700' }}>Pronto.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {PLATFORMS.map((p, i) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const r = useReveal(0.1);
            const available = p.status === 'Disponível agora';
            return (
              <div
                key={p.name}
                ref={r}
                className="reveal flex gap-5 items-start rounded-2xl px-6 py-6"
                style={{
                  background: 'rgba(255,255,255,0.025)',
                  border: '1px solid rgba(147,51,234,0.12)',
                  transitionDelay: `${i * 0.08}s`,
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 text-2xl"
                  style={{
                    background: (p as any).isLogo ? '#fff' : `${p.color}12`,
                    border: `1px solid ${p.color}25`,
                    padding: (p as any).isLogo ? 6 : 0,
                  }}
                >
                  {(p as any).isLogo
                    ? <Image src={p.icon} alt={p.name} width={36} height={28} style={{ objectFit: 'contain' }} />
                    : p.icon
                  }
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1.5">
                    <h3
                      className="text-base font-bold"
                      style={{ fontFamily: 'var(--font-rajdhani)', color: '#fff', letterSpacing: '0.02em' }}
                    >
                      {p.name}
                    </h3>
                    <span
                      className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                      style={{
                        background: available ? 'rgba(52,211,153,0.12)' : 'rgba(255,255,255,0.06)',
                        color: available ? '#34D399' : 'rgba(255,255,255,0.3)',
                        border: available ? '1px solid rgba(52,211,153,0.25)' : '1px solid rgba(255,255,255,0.08)',
                        fontFamily: 'var(--font-rajdhani)',
                      }}
                    >
                      {p.status}
                    </span>
                  </div>
                  <p className="text-sm font-body leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)' }}>
                    {p.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
