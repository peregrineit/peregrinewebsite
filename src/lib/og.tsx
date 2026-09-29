import { ImageResponse } from 'next/og';

// Per-article Open Graph image (1200x630), rendered at build time by next/og.
export const ogSize = { width: 1200, height: 630 };

export function ogImage({ eyebrow, title }: { eyebrow: string; title: string }) {
  const titleSize = title.length > 70 ? 54 : title.length > 45 ? 62 : 70;
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 72px',
          background: 'linear-gradient(135deg, #0f172a 0%, #13233f 60%, #0b3b4a 100%)',
          color: '#ffffff',
        }}
      >
        <div style={{ display: 'flex', fontSize: 26, letterSpacing: 4, textTransform: 'uppercase', color: '#22d3ee', fontWeight: 700 }}>
          {eyebrow}
        </div>
        <div style={{ display: 'flex', fontSize: titleSize, fontWeight: 800, lineHeight: 1.12, maxWidth: 1040 }}>{title}</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 28, color: '#cbd5e1' }}>
          <span>Peregrine IT Solutions</span>
          <span style={{ color: '#22d3ee' }}>peregrine-it.com</span>
        </div>
      </div>
    ),
    ogSize,
  );
}
