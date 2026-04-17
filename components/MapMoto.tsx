'use client';

import { useEffect, useRef, useState } from 'react';

const HUB_LNG = -46.6276;
const HUB_LAT  = -23.5490;
const NUM_MOTOS = 13;


const COLORS = [
  { c: '#FFD700', r: 'rgba(255,215,0,' },
  { c: '#FFD700', r: 'rgba(255,215,0,' },
  { c: '#FFD700', r: 'rgba(255,215,0,' },
  { c: '#C084FC', r: 'rgba(192,132,252,' },
  { c: '#C084FC', r: 'rgba(192,132,252,' },
  { c: '#60A5FA', r: 'rgba(96,165,250,' },
  { c: '#34D399', r: 'rgba(52,211,153,' },
];

interface Moto {
  angle: number;
  angleVel: number;
  dist: number;
  maxDist: number;
  spd: number;
  trail: Array<[number, number]>;
  color: string;
  rgba: string;
}

interface Pop {
  x: number; y: number;
  color: string;
  age: number;
}

function makeMoto(index: number): Moto {
  // Spread motos evenly around the hub so they never clump
  const baseAngle = (index / NUM_MOTOS) * Math.PI * 2;
  const jitter    = (Math.random() - 0.5) * ((Math.PI * 2) / NUM_MOTOS) * 0.6;
  const col       = COLORS[Math.floor(Math.random() * COLORS.length)];
  return {
    angle:    baseAngle + jitter,
    angleVel: (Math.random() - 0.5) * 0.004, // very gentle curve
    dist:     Math.random() * 0.008,          // stagger starting distance
    maxDist:  0.120 + Math.random() * 0.100,  // cross well beyond the city
    spd:      0.00018 + Math.random() * 0.00018,
    trail:    [],
    color:    col.c,
    rgba:     col.r,
  };
}

function hexRgba(hex: string, a: number) {
  const h = hex.replace('#', '');
  return `rgba(${parseInt(h.slice(0,2),16)},${parseInt(h.slice(2,4),16)},${parseInt(h.slice(4,6),16)},${a.toFixed(2)})`;
}

// ── Custom motorcycle drawn on canvas ────────────────────────────────────────
function drawMoto(ctx: CanvasRenderingContext2D, x: number, y: number, color: string, angle: number) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);

  ctx.shadowColor = color;
  ctx.shadowBlur  = 18;

  // Rear wheel
  ctx.beginPath();
  ctx.arc(-12, 5, 6, 0, Math.PI * 2);
  ctx.strokeStyle = '#fff';
  ctx.lineWidth   = 1.8;
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(-12, 5, 2, 0, Math.PI * 2);
  ctx.fillStyle = '#fff';
  ctx.fill();

  // Front wheel
  ctx.beginPath();
  ctx.arc(13, 5, 6, 0, Math.PI * 2);
  ctx.strokeStyle = '#fff';
  ctx.lineWidth   = 1.8;
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(13, 5, 2, 0, Math.PI * 2);
  ctx.fillStyle = '#fff';
  ctx.fill();

  // Main frame
  ctx.beginPath();
  ctx.moveTo(-6, 5);
  ctx.lineTo(-3, -4);
  ctx.lineTo(5,  -5);
  ctx.lineTo(11, -2);
  ctx.lineTo(13,  1);
  ctx.strokeStyle = '#fff';
  ctx.lineWidth   = 2;
  ctx.lineJoin    = 'round';
  ctx.lineCap     = 'round';
  ctx.stroke();

  // Seat / fairing in brand color
  ctx.beginPath();
  ctx.ellipse(-1, -7, 5, 2.5, -0.08, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();

  // Headlight
  ctx.beginPath();
  ctx.arc(14, -1, 2, 0, Math.PI * 2);
  ctx.fillStyle = hexRgba(color, 0.9);
  ctx.fill();

  ctx.shadowBlur = 0;
  ctx.restore();
}

export default function MapMoto() {
  const wrapRef   = useRef<HTMLDivElement>(null);
  const mapRef    = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mapInst   = useRef<any>(null);
  const motos     = useRef<Moto[]>([]);
  const pops      = useRef<Pop[]>([]);
  const raf       = useRef(0);
  const mouse     = useRef({ x: -9999, y: -9999 });
  const pulse     = useRef(0);
  const motoImg   = useRef<HTMLCanvasElement | null>(null);
  const [tip, setTip] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    let map: any;

    // Preload + strip black background from moto icon (once)
    const img = new window.Image();
    img.src = '/icons/moto-top.png';
    img.onload = () => {
      const off = document.createElement('canvas');
      off.width  = img.width;
      off.height = img.height;
      const offCtx = off.getContext('2d')!;
      offCtx.drawImage(img, 0, 0);
      const id   = offCtx.getImageData(0, 0, off.width, off.height);
      const d    = id.data;
      for (let i = 0; i < d.length; i += 4) {
        if (d[i + 3] === 0) continue;
        const maxCh = Math.max(d[i], d[i + 1], d[i + 2]);
        d[i + 3] = Math.min(255, maxCh * 1.6);
      }
      offCtx.putImageData(id, 0, 0);
      motoImg.current = off;
    };

    (async () => {
      const mgl = (await import('mapbox-gl')).default;
      if (!mapRef.current) return;

      mgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

      map = new mgl.Map({
        container: mapRef.current,
        style: 'mapbox://styles/mapbox/dark-v11',
        center: [HUB_LNG - 0.04, HUB_LAT + 0.04],
        zoom: 10.8,
        interactive: false,
        attributionControl: false,
        logoPosition: 'bottom-right',
      });
      mapInst.current = map;

      // Init motos spread evenly
      motos.current = Array.from({ length: NUM_MOTOS }, (_, i) => makeMoto(i));

      map.on('load', () => {
        startLoop();
      });
    })();

    function startLoop() {
      const canvas = canvasRef.current;
      const map    = mapInst.current;
      if (!canvas || !map) return;

      const resize = () => {
        if (wrapRef.current) {
          canvas.width  = wrapRef.current.offsetWidth;
          canvas.height = wrapRef.current.offsetHeight;
        }
      };
      resize();
      window.addEventListener('resize', resize);

      const ctx = canvas.getContext('2d')!;
      function tick() {
        ctx.clearRect(0, 0, canvas!.width, canvas!.height);
        pulse.current += 0.016;

        const bp = map.project([HUB_LNG, HUB_LAT]);

        // ── Hub pulse rings ──────────────────────────────────────────
        for (let i = 0; i < 4; i++) {
          const phase = (pulse.current + i * (Math.PI * 0.5)) % (Math.PI * 2);
          const r = 8 + (Math.sin(phase) * 0.5 + 0.5) * 44;
          const a = 0.5 - (Math.sin(phase) * 0.5 + 0.5) * 0.46;
          ctx.beginPath();
          ctx.arc(bp.x, bp.y, r, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(255,215,0,${a.toFixed(2)})`;
          ctx.lineWidth = 1.4;
          ctx.stroke();
        }

        // Hub core glow
        const gCore = ctx.createRadialGradient(bp.x, bp.y, 0, bp.x, bp.y, 10);
        gCore.addColorStop(0, '#fff');
        gCore.addColorStop(0.4, '#FFD700');
        gCore.addColorStop(1, 'rgba(255,215,0,0)');
        ctx.beginPath();
        ctx.arc(bp.x, bp.y, 9, 0, Math.PI * 2);
        ctx.shadowColor = '#FFD700';
        ctx.shadowBlur  = 30;
        ctx.fillStyle   = gCore;
        ctx.fill();
        ctx.shadowBlur  = 0;

        // Hub hover
        const dhx = bp.x - mouse.current.x;
        const dhy = bp.y - mouse.current.y;
        if (Math.sqrt(dhx*dhx + dhy*dhy) < 42) {
          setTip({ x: bp.x, y: bp.y });
        } else if (tip) {
          setTip(null);
        }

        // ── Motos ────────────────────────────────────────────────────
        motos.current.forEach((m, i) => {
          // Gentle curve — angleVel decays so they mostly go straight
          m.angle    += m.angleVel;
          m.angleVel *= 0.992;
          m.dist     += m.spd;

          const lng = HUB_LNG + Math.cos(m.angle) * m.dist;
          const lat = HUB_LAT + Math.sin(m.angle) * m.dist * 0.52;
          m.trail.unshift([lng, lat]);
          if (m.trail.length > 110) m.trail.pop();

          // Respawn with same even-spread slot
          if (m.dist >= m.maxDist) {
            if (m.trail.length > 0) {
              const ep = map.project(m.trail[0]);
              pops.current.push({ x: ep.x, y: ep.y, color: m.color, age: 0 });
            }
            motos.current[i] = makeMoto(i); // keep same index → keep same angle sector
            return;
          }

          // ── Trail ──────────────────────────────────────────────────
          for (let j = 0; j < m.trail.length - 1; j++) {
            const p1  = map.project(m.trail[j]);
            const p2  = map.project(m.trail[j + 1]);
            const pct = 1 - j / m.trail.length;

            // Colored trail
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = m.rgba + (pct * 0.82).toFixed(2) + ')';
            ctx.lineWidth   = pct * 2.4;
            ctx.lineCap     = 'round';
            ctx.stroke();

            // White flash at very tip (first 4 segments)
            if (j < 4) {
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = `rgba(255,255,255,${(pct * 0.88).toFixed(2)})`;
              ctx.lineWidth   = pct * 3.2;
              ctx.stroke();
            }
          }

          // Head — 3D moto icon (top-down) rotated toward direction of travel
          if (m.trail.length >= 2) {
            const h     = map.project(m.trail[0]);
            const h2    = map.project(m.trail[1]);
            const angle = Math.atan2(h.y - h2.y, h.x - h2.x);

            if (motoImg.current) {
              const size = 30;

              // 1. Draw glow halo BEFORE screen blend (no interference)
              ctx.save();
              ctx.beginPath();
              ctx.arc(h.x, h.y, 14, 0, Math.PI * 2);
              const grd = ctx.createRadialGradient(h.x, h.y, 0, h.x, h.y, 14);
              grd.addColorStop(0, hexRgba(m.color, 0.35));
              grd.addColorStop(1, hexRgba(m.color, 0));
              ctx.fillStyle = grd;
              ctx.fill();
              ctx.restore();

              // 2. Draw pre-processed image (black already removed) — no blend trick needed
              ctx.save();
              ctx.translate(h.x, h.y);
              ctx.rotate(angle + Math.PI / 2);
              ctx.drawImage(motoImg.current, -size / 2, -size / 2, size, size);
              ctx.restore();
            } else {
              drawMoto(ctx, h.x, h.y, m.color, angle);
            }
          }
        });

        // ── Delivery pops (subtle) ────────────────────────────────────
        pops.current = pops.current.filter(p => p.age < 40);
        pops.current.forEach(pop => {
          const t    = pop.age / 40;
          const ease = 1 - (1 - t) * (1 - t);

          // Single clean expanding ring
          ctx.beginPath();
          ctx.arc(pop.x, pop.y, ease * 22, 0, Math.PI * 2);
          ctx.strokeStyle = hexRgba(pop.color, (1 - t) * 0.7);
          ctx.lineWidth   = 1.5;
          ctx.stroke();

          // Small center flash that fades
          if (pop.age < 12) {
            const fa = (1 - pop.age / 12) * 0.9;
            ctx.beginPath();
            ctx.arc(pop.x, pop.y, (1 - pop.age / 12) * 6, 0, Math.PI * 2);
            ctx.fillStyle = hexRgba(pop.color, fa);
            ctx.fill();
          }

          pop.age++;
        });

        raf.current = requestAnimationFrame(tick);
      }

      raf.current = requestAnimationFrame(tick);
      return () => window.removeEventListener('resize', resize);
    }

    return () => {
      cancelAnimationFrame(raf.current);
      if (map) map.remove();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={wrapRef} className="relative w-full h-full">
      <div ref={mapRef} className="w-full h-full" />
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ zIndex: 10, cursor: tip ? 'crosshair' : 'default' }}
        onMouseMove={e => {
          const r = e.currentTarget.getBoundingClientRect();
          mouse.current = { x: e.clientX - r.left, y: e.clientY - r.top };
        }}
        onMouseLeave={() => {
          mouse.current = { x: -9999, y: -9999 };
          setTip(null);
        }}
      />
      {tip && (
        <div
          className="absolute pointer-events-none px-3 py-1.5 rounded-xl text-[11px] font-bold whitespace-nowrap"
          style={{
            left: tip.x + 18,
            top:  tip.y - 34,
            zIndex: 20,
            background: 'rgba(6,4,15,0.95)',
            border: '1px solid rgba(255,215,0,0.6)',
            color: '#FFD700',
            boxShadow: '0 0 14px rgba(255,215,0,0.35)',
            backdropFilter: 'blur(8px)',
            fontFamily: 'system-ui',
          }}
        >
          🏍️&nbsp; Hub Brás · Centro SP
        </div>
      )}
    </div>
  );
}
