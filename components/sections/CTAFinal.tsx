'use client';
import { useReveal } from '@/hooks/useReveal';

const WA = 'https://wa.me/5511986997299';

export default function CTAFinal() {
  const ref = useReveal();
  return (
    <section id="contato" className="py-32 px-5 relative overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(255,215,0,0.06) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(147,51,234,0.05) 0%, transparent 65%)',
        }}
      />

      <div ref={ref} className="reveal relative max-w-3xl mx-auto text-center">
        <p
          className="text-xs uppercase tracking-widest font-bold mb-4"
          style={{ color: 'rgba(255,215,0,0.6)', fontFamily: 'var(--font-rajdhani)' }}
        >
          PRONTO PARA COMEÇAR?
        </p>

        <h2
          className="mb-6"
          style={{
            fontFamily: 'var(--font-rajdhani)',
            fontSize: 'clamp(38px,6vw,72px)',
            fontWeight: 700,
            color: '#fff',
            lineHeight: 0.95,
            letterSpacing: '-0.01em',
          }}
        >
          Seu concorrente já<br />
          <span className="text-gold-gradient">entrega hoje.</span>
        </h2>

        <p
          className="text-base md:text-lg mb-12 font-body leading-relaxed"
          style={{ color: 'rgba(255,255,255,0.45)', maxWidth: 520, margin: '0 auto 3rem' }}
        >
          Fale com a gente agora e comece a entregar no mesmo dia ainda essa semana.
          Sem contrato, sem burocracia.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={WA}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-8 py-4 rounded-2xl text-base font-bold transition-all duration-300 w-full sm:w-auto justify-center"
            style={{
              fontFamily: 'var(--font-rajdhani)',
              letterSpacing: '0.04em',
              background: 'linear-gradient(135deg,#FFD700,#F59E0B)',
              color: '#06040F',
              boxShadow: '0 0 40px rgba(255,215,0,0.3), 0 8px 32px rgba(0,0,0,0.4)',
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.boxShadow = '0 0 60px rgba(255,215,0,0.55), 0 8px 32px rgba(0,0,0,0.5)')}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.boxShadow = '0 0 40px rgba(255,215,0,0.3), 0 8px 32px rgba(0,0,0,0.4)')}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.025.507 3.934 1.395 5.608L0 24l6.545-1.371A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.007-1.373l-.36-.214-3.724.978.993-3.641-.234-.374A9.818 9.818 0 1112 21.818z"/>
            </svg>
            Falar agora no WhatsApp
          </a>

          <a
            href="tel:+5511986997299"
            className="flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-bold transition-all duration-300 w-full sm:w-auto justify-center"
            style={{
              fontFamily: 'var(--font-rajdhani)',
              letterSpacing: '0.04em',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'rgba(255,255,255,0.65)',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,215,0,0.3)';
              (e.currentTarget as HTMLElement).style.color = '#FFD700';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)';
              (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.65)';
            }}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            (11) 98699-7299
          </a>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-14">
          {[
            { icon: '🔒', text: 'Sem contrato mínimo' },
            { icon: '📍', text: 'SP + Região Metropolitana' },
            { icon: '⚡', text: 'Ativo em 24h' },
          ].map(badge => (
            <div key={badge.text} className="flex items-center gap-2">
              <span className="text-base">{badge.icon}</span>
              <span className="text-xs font-body" style={{ color: 'rgba(255,255,255,0.3)' }}>{badge.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
