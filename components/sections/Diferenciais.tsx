'use client';
import Image from 'next/image';
import { useReveal } from '@/hooks/useReveal';
import SplitReveal from '@/components/SplitReveal';
import Icon3D from '@/components/Icon3D';

const ITEMS = [
  {
    n: '01',
    icon: '/icons/raio.png',
    title: 'Same Day garantido',
    desc: 'Coleta até 14h e entrega no mesmo dia, garantido.',
    color: '#FFD700',
  },
  {
    n: '02',
    icon: '/icons/localiza.png',
    title: 'Rastreio em tempo real',
    desc: 'Seu cliente acompanha a entrega ao vivo. Menos chamado no suporte, mais confiança.',
    color: '#C084FC',
  },
  {
    n: '03',
    icon: '/icons/balao.png',
    title: 'Sem burocracia',
    desc: 'Sem contrato mínimo, sem mensalidade. Você paga só pelo que envia.',
    color: '#34D399',
  },
  {
    n: '04',
    icon: '/icons/moto.png',
    title: 'Frota própria',
    desc: 'Entregadores treinados e monitorados. Sem depender de terceiros ou aplicativos.',
    color: '#60A5FA',
  },
  {
    n: '05',
    icon: '/icons/ml.png',
    title: 'Integrado ao ML',
    desc: 'Conecte sua conta Mercado Livre em 2 minutos. Do pedido à entrega no automático.',
    color: '#FFE600',
    isLogo: true,
  },
  {
    n: '06',
    icon: '/icons/dinheiro.png',
    title: 'Fechamento semanal',
    desc: 'Pagamento via Pix toda semana. Sem nota fiscal complicada, sem surpresa no boleto.',
    color: '#FB923C',
  },
];

export default function Diferenciais() {
  const ref = useReveal();

  return (
    <section className="py-32 px-6" style={{ background: '#050505' }}>
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div ref={ref} className="reveal flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] mb-4"
              style={{ color: '#FFD700', fontFamily: 'var(--font-rajdhani)' }}>
              Por que a Voltic
            </p>
            <SplitReveal
              lines={['Tudo que você', 'precisava.', 'Em um lugar.']}
              as="h2"
              direction="right"
              style={{
                fontFamily: 'var(--font-rajdhani)',
                fontSize: 'clamp(38px, 5.5vw, 72px)',
                fontWeight: 700,
                color: '#fff',
                letterSpacing: '-0.02em',
                lineHeight: 0.95,
              }}
            />
          </div>
          <p className="text-sm md:text-base md:max-w-xs md:text-right leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-inter)' }}>
            Logística que funciona do jeito que o seu negócio precisa.
          </p>
        </div>

        {/* Items — LN row style with dividers */}
        <div>
          {ITEMS.map((item, i) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const r = useReveal(0.1);
            return (
              <div
                key={item.n}
                ref={r}
                className="reveal group"
                style={{ transitionDelay: `${i * 0.06}s` }}
              >
                {/* Divider */}
                <div style={{ height: 1, background: 'rgba(255,255,255,0.06)' }} />

                {/* Row */}
                <div
                  className="grid grid-cols-12 gap-4 py-7 transition-all duration-300 cursor-default"
                  style={{ paddingLeft: 0, paddingRight: 0 }}
                  onMouseEnter={e => (e.currentTarget.style.paddingLeft = '12px')}
                  onMouseLeave={e => (e.currentTarget.style.paddingLeft = '0px')}
                >
                  {/* Number */}
                  <div className="col-span-1 flex items-center">
                    <span
                      className="text-xs font-bold"
                      style={{ color: 'rgba(255,255,255,0.18)', fontFamily: 'var(--font-rajdhani)', letterSpacing: '0.1em' }}
                    >
                      {item.n}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className="col-span-1 hidden md:flex items-center">
                    {(item as any).isLogo ? (
                      <div
                        className="transition-transform duration-300 group-hover:scale-125 rounded-lg flex items-center justify-center"
                        style={{ width: 44, height: 44, background: '#fff', padding: 5 }}
                      >
                        <Image src={item.icon} alt={item.title} width={34} height={26} style={{ objectFit: 'contain' }} />
                      </div>
                    ) : (
                      <Icon3D src={item.icon} size={44} className="transition-transform duration-300 group-hover:scale-125" />
                    )}
                  </div>

                  {/* Title */}
                  <div className="col-span-7 md:col-span-5 flex items-center">
                    <h3
                      className="transition-colors duration-300"
                      style={{
                        fontFamily: 'var(--font-rajdhani)',
                        fontSize: 'clamp(20px, 2.5vw, 32px)',
                        fontWeight: 700,
                        color: 'rgba(255,255,255,0.75)',
                        letterSpacing: '-0.01em',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.color = item.color)}
                      onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.75)')}
                    >
                      {item.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <div className="col-span-4 hidden md:flex items-center">
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-inter)' }}
                    >
                      {item.desc}
                    </p>
                  </div>

                  {/* Color accent bar on hover */}
                  <div className="col-span-3 md:col-span-1 flex items-center justify-end">
                    <div
                      className="h-px w-0 transition-all duration-500 group-hover:w-full"
                      style={{ background: item.color }}
                    />
                  </div>
                </div>

                {/* Mobile desc */}
                <p
                  className="md:hidden text-xs leading-relaxed pb-5"
                  style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-inter)', paddingLeft: 0 }}
                >
                  {item.desc}
                </p>
              </div>
            );
          })}
          {/* Final divider */}
          <div style={{ height: 1, background: 'rgba(255,255,255,0.06)' }} />
        </div>
      </div>
    </section>
  );
}
