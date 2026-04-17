'use client';

import { useEffect, useRef } from 'react';

interface Props {
  src: string;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
  transparent?: boolean; // skip black-removal for images already transparent
}

export default function Icon3D({ src, size = 80, className, style, transparent = false }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const img = new window.Image();
    img.src = src;
    img.onload = () => {
      canvas.width  = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(img, 0, 0);

      if (!transparent) {
        // Erase bottom-right sparkle watermark
        const cw = canvas.width;
        const ch = canvas.height;
        ctx.clearRect(cw * 0.80, ch * 0.80, cw * 0.20, ch * 0.20);

        // Remove dark background using max channel (works for all hues, including blue)
        const id = ctx.getImageData(0, 0, cw, ch);
        const d  = id.data;
        for (let i = 0; i < d.length; i += 4) {
          if (d[i + 3] === 0) continue; // already transparent, skip
          const maxCh = Math.max(d[i], d[i + 1], d[i + 2]);
          d[i + 3] = Math.min(d[i + 3], Math.min(255, maxCh * 1.6));
        }
        ctx.putImageData(id, 0, 0);
      }
    };
  }, [src]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: size, height: size, ...style }}
    />
  );
}
