import { ImageResponse } from 'next/og';

export const alt = 'DontDieFishing — safe spots, live conditions, come home safe';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// The lifebuoy brand mark (public/favicon.svg), inlined as a data URI so
// satori renders the real mark without raster assets.
const MARK_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none"><rect width="64" height="64" rx="14" fill="#0C1E30"/><circle cx="32" cy="32" r="21" stroke="#F59E0B" stroke-width="11"/><g fill="#0C1E30"><rect x="29" y="9" width="6" height="14" rx="3"/><rect x="29" y="41" width="6" height="14" rx="3"/><rect x="9" y="29" width="14" height="6" rx="3"/><rect x="41" y="29" width="14" height="6" rx="3"/></g></svg>`;
const MARK_URI = `data:image/svg+xml;base64,${Buffer.from(MARK_SVG).toString('base64')}`;

/**
 * Branded homepage Open Graph image. The water at night: a near-black sea,
 * one deliberate point of amber signal light, the lifebuoy mark.
 */
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          background: '#0A0A0F',
          position: 'relative',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Ambient amber glow — the signal light on the water. */}
        <div
          style={{
            position: 'absolute',
            top: -180,
            left: '50%',
            width: 1000,
            height: 560,
            transform: 'translateX(-50%)',
            background: 'radial-gradient(ellipse, rgba(245,158,11,0.14), transparent 65%)',
            display: 'flex',
          }}
        />

        <div style={{ display: 'flex', flexDirection: 'column', padding: '0 90px' }}>
          <img
            src={MARK_URI}
            width={96}
            height={96}
            style={{ marginBottom: 32, borderRadius: 20 }}
            alt=""
          />

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 30 }}>
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: 2,
                background: '#F59E0B',
                display: 'flex',
              }}
            />
            <span
              style={{
                color: '#F59E0B',
                fontSize: 22,
                fontWeight: 600,
                letterSpacing: 6,
                textTransform: 'uppercase',
              }}
            >
              DontDieFishing
            </span>
          </div>

          <div
            style={{
              fontSize: 84,
              fontWeight: 600,
              lineHeight: 1.05,
              letterSpacing: -2,
              color: '#FFFFFF',
            }}
          >
            Find the fish.
          </div>
          <div
            style={{
              fontSize: 84,
              fontWeight: 600,
              lineHeight: 1.05,
              letterSpacing: -2,
              color: '#F59E0B',
            }}
          >
            Come home safe.
          </div>

          <div
            style={{
              display: 'flex',
              marginTop: 40,
              color: '#8F8F8F',
              fontSize: 26,
            }}
          >
            Safe fishing spots with real-time water conditions, weather, and hazard alerts
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
