'use client';

import { useEffect, useRef } from 'react';

interface Props {
  lines: string[];
  as?: 'h1' | 'h2' | 'h3' | 'p';
  className?: string;
  style?: React.CSSProperties;
  direction?: 'up' | 'right';
  delay?: number; // base delay in ms
}

export default function SplitReveal({ lines, as: Tag = 'h2', className, style, direction = 'up', delay = 0 }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const spans = Array.from(el.querySelectorAll<HTMLSpanElement>('.line-inner'));

    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        spans.forEach((s, i) => {
          s.style.transitionDelay = `${delay + i * 80}ms`;
          s.classList.add('revealed');
        });
        obs.disconnect();
      }
    }, { threshold: 0.2 });

    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);

  return (
    // @ts-ignore
    <Tag ref={ref} className={className} style={style}>
      {lines.map((line, i) => (
        <span
          key={i}
          style={{ display: 'block', overflow: 'hidden', lineHeight: 'inherit' }}
        >
          <span
            className="line-inner"
            style={{
              display: 'block',
              transform: direction === 'right' ? 'translateX(60px)' : 'translateY(105%)',
              opacity: 0,
              transition: 'transform 0.75s cubic-bezier(0.16,1,0.3,1), opacity 0.6s ease',
            }}
          >
            {line}
          </span>
        </span>
      ))}
      <style>{`
        .line-inner.revealed {
          transform: translate(0, 0) !important;
          opacity: 1 !important;
        }
      `}</style>
    </Tag>
  );
}
