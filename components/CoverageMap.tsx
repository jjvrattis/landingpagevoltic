'use client';

import { useEffect, useRef, useState } from 'react';

const HUB = { lng: -46.6276, lat: -23.5490 };
const SP_CAPITAL_CODE = '3550308';

// Areas Voltic does NOT serve yet
const NOT_SERVED = new Set([
  '3515103', // Embu-Guaçu
  '3526209', // Juquitiba
  '3549953', // São Lourenço da Serra
  '3545001', // Santa Isabel — far east, near coast (lng center -45.84)
  '3506607', // Biritiba-Mirim — east of Mogi, extends to coast side
  '3518305', // Itaquaquecetuba extended / far east (lng -45.95)
]);

// Calculate visual centroid of a GeoJSON geometry (bbox midpoint of largest ring)
function centroid(geometry: any): [number, number] {
  const rings: number[][][] =
    geometry.type === 'MultiPolygon'
      ? geometry.coordinates.flat(1)
      : geometry.coordinates;
  const ring = rings.reduce((a: any, b: any) => (a.length >= b.length ? a : b));
  const lngs = ring.map((c: number[]) => c[0]);
  const lats  = ring.map((c: number[]) => c[1]);
  return [
    (Math.min(...lngs) + Math.max(...lngs)) / 2,
    (Math.min(...lats) + Math.max(...lats)) / 2,
  ];
}

export default function CoverageMap() {
  const mapRef    = useRef<HTMLDivElement>(null);
  const markerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let map: any;

    (async () => {
      const mgl = (await import('mapbox-gl')).default;
      if (!mapRef.current) return;

      mgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

      // Start without center/zoom — fitBounds will handle it after load
      map = new mgl.Map({
        container: mapRef.current,
        style: 'mapbox://styles/mapbox/dark-v11',
        center: [HUB.lng, HUB.lat],
        zoom: 9,
        interactive: false,
        attributionControl: false,
      });

      map.on('load', async () => {
        const geojson = await fetch('/rmsp.geojson').then(r => r.json());
        const all: any[] = geojson.features ?? [];

        const notServed  = all.filter(f => NOT_SERVED.has(f.properties.code));
        const capital    = all.filter(f => f.properties.code === SP_CAPITAL_CODE);
        const otherServed = all.filter(
          f => !NOT_SERVED.has(f.properties.code) && f.properties.code !== SP_CAPITAL_CODE
        );
        const served = [...capital, ...otherServed];

        // ── fitBounds to served area ──────────────────────────────────
        const allCoords: number[][] = served.flatMap(f => {
          const g = f.geometry;
          return g.type === 'MultiPolygon'
            ? g.coordinates.flat(2)
            : g.coordinates.flat(1);
        });
        const lngs = allCoords.map(c => c[0]);
        const lats  = allCoords.map(c => c[1]);
        map.fitBounds(
          [[Math.min(...lngs), Math.min(...lats)], [Math.max(...lngs), Math.max(...lats)]],
          { padding: { top: 48, bottom: 64, left: 48, right: 48 }, duration: 0 }
        );

        // ── Not served (gray, no label) ───────────────────────────────
        map.addSource('not-served', {
          type: 'geojson',
          data: { type: 'FeatureCollection', features: notServed },
        });
        map.addLayer({
          id: 'not-served-fill',
          type: 'fill',
          source: 'not-served',
          paint: { 'fill-color': '#555', 'fill-opacity': 0.18 },
        });
        map.addLayer({
          id: 'not-served-line',
          type: 'line',
          source: 'not-served',
          paint: { 'line-color': '#666', 'line-opacity': 0.35, 'line-width': 0.8 },
        });

        // ── RMSP other municipalities ─────────────────────────────────
        map.addSource('rmsp', {
          type: 'geojson',
          data: { type: 'FeatureCollection', features: otherServed },
        });
        map.addLayer({
          id: 'rmsp-fill',
          type: 'fill',
          source: 'rmsp',
          paint: { 'fill-color': '#C084FC', 'fill-opacity': 0.10 },
        });
        map.addLayer({
          id: 'rmsp-line',
          type: 'line',
          source: 'rmsp',
          paint: { 'line-color': '#C084FC', 'line-opacity': 0.45, 'line-width': 0.8 },
        });

        // ── SP Capital ────────────────────────────────────────────────
        map.addSource('sp-capital', {
          type: 'geojson',
          data: { type: 'FeatureCollection', features: capital },
        });
        map.addLayer({
          id: 'sp-capital-fill',
          type: 'fill',
          source: 'sp-capital',
          paint: { 'fill-color': '#FFD700', 'fill-opacity': 0.14 },
        });
        map.addLayer({
          id: 'sp-capital-line',
          type: 'line',
          source: 'sp-capital',
          paint: { 'line-color': '#FFD700', 'line-opacity': 0.75, 'line-width': 1.5 },
        });

        // ── Price labels on served polygons ───────────────────────────
        const labelPoints = served.map(f => ({
          type: 'Feature' as const,
          geometry: { type: 'Point' as const, coordinates: centroid(f.geometry) },
          properties: {
            price: 'R$11,50',
            isCapital: f.properties.code === SP_CAPITAL_CODE,
          },
        }));

        map.addSource('labels', {
          type: 'geojson',
          data: { type: 'FeatureCollection', features: labelPoints },
        });
        map.addLayer({
          id: 'price-labels',
          type: 'symbol',
          source: 'labels',
          layout: {
            'text-field': ['get', 'price'],
            'text-font': ['DIN Pro Bold', 'Arial Unicode MS Bold'],
            'text-size': ['case', ['get', 'isCapital'], 13, 10],
            'text-allow-overlap': false,
            'text-ignore-placement': false,
          },
          paint: {
            'text-color': ['case', ['get', 'isCapital'], '#FFD700', '#C084FC'],
            'text-halo-color': 'rgba(0,0,0,0.85)',
            'text-halo-width': 1.5,
            'text-opacity': 0.9,
          },
        });

        // ── Hub Brás marker ───────────────────────────────────────────
        if (markerRef.current) {
          new mgl.Marker({ element: markerRef.current, anchor: 'center' })
            .setLngLat([HUB.lng, HUB.lat])
            .addTo(map);
        }

        setLoading(false);
      });
    })();

    return () => { if (map) map.remove(); };
  }, []);

  return (
    <div
      className="relative w-full h-full rounded-2xl overflow-hidden"
      style={{ border: '1px solid rgba(255,255,255,0.06)' }}
    >
      <div ref={mapRef} className="w-full h-full" />

      {loading && (
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ background: 'rgba(8,8,8,0.7)', backdropFilter: 'blur(4px)', zIndex: 15 }}
        >
          <div className="flex flex-col items-center gap-3">
            <div
              className="w-8 h-8 rounded-full border-2 border-transparent animate-spin"
              style={{ borderTopColor: '#FFD700', borderRightColor: 'rgba(255,215,0,0.3)' }}
            />
            <span className="text-[11px] uppercase tracking-widest"
              style={{ color: 'rgba(255,215,0,0.6)', fontFamily: 'var(--font-rajdhani)' }}>
              Carregando cobertura…
            </span>
          </div>
        </div>
      )}

      {/* Hub Brás marker — all children anchor to the same (0,0) point */}
      <div ref={markerRef} className="pointer-events-none" style={{ width: 0, height: 0, position: 'relative' }}>
        {/* Outer pulse ring */}
        <div style={{
          position: 'absolute',
          width: 52, height: 52,
          borderRadius: '50%',
          border: '1px solid rgba(255,215,0,0.4)',
          transform: 'translate(-50%,-50%)',
          animation: 'hubPulse 2s ease-out infinite',
        }} />
        {/* Inner pulse ring */}
        <div style={{
          position: 'absolute',
          width: 32, height: 32,
          borderRadius: '50%',
          border: '1px solid rgba(255,215,0,0.55)',
          transform: 'translate(-50%,-50%)',
          animation: 'hubPulse 2s ease-out 0.65s infinite',
        }} />
        {/* Core dot */}
        <div style={{
          position: 'absolute',
          width: 12, height: 12,
          borderRadius: '50%',
          background: '#FFD700',
          transform: 'translate(-50%,-50%)',
          boxShadow: '0 0 16px rgba(255,215,0,0.9), 0 0 32px rgba(255,215,0,0.4)',
        }} />
      </div>

      {/* Legend */}
      <div
        className="absolute bottom-4 left-4 flex flex-col gap-2 px-4 py-3 rounded-xl"
        style={{
          background: 'rgba(6,4,15,0.88)',
          border: '1px solid rgba(255,255,255,0.08)',
          backdropFilter: 'blur(12px)',
          zIndex: 10,
        }}
      >
        {[
          { color: '#FFD700', label: 'SP Capital' },
          { color: '#C084FC', label: 'Região Metropolitana' },
          { color: '#555',    label: 'Em breve' },
        ].map(({ color, label }) => (
          <div key={label} className="flex items-center gap-2">
            <div style={{ width: 20, height: 2, background: color, borderRadius: 1 }} />
            <span className="text-[11px] uppercase tracking-wider"
              style={{ color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-rajdhani)' }}>
              {label}
            </span>
          </div>
        ))}
        <div className="flex items-center gap-2 mt-1">
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FFD700', boxShadow: '0 0 6px #FFD700' }} />
          <span className="text-[11px] uppercase tracking-wider"
            style={{ color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-rajdhani)' }}>
            Hub Brás
          </span>
        </div>
      </div>

      <style>{`
        @keyframes hubPulse {
          0%   { opacity: 0.8; transform: translate(-50%,-50%) scale(1); }
          100% { opacity: 0;   transform: translate(-50%,-50%) scale(2.5); }
        }
      `}</style>
    </div>
  );
}
