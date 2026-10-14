// Requirement groups mapped onto the data path of an IDX platform, for /blog/idx-website-features-checklist.
// Inline SVG, viewBox only; all styling is in attributes so no stylesheet is involved.
// maxWidth is reset inline because an older .cp-diagram rule caps SVGs at 520px.
// The guide repeats the same content as a list under the figure: keep the two in step.

const FONT = 'system-ui, sans-serif';
const BOX = '#162036';
const STROKE = '#2a3a59';
const TEXT = '#f1f5f9';
const MUTED = '#94a3b8';
const CYAN = '#22d3ee';
const BLUE = '#60a5fa';
const VIOLET = '#a78bfa';

const COL_W = 152;
const COL_X = [40, 212, 384, 556, 728];

const STAGES = [
  { title: 'MLS feeds', l1: 'RESO Web API,', l2: 'one per source' },
  { title: 'System of record', l1: 'replicated listings', l2: 'and raw payloads' },
  { title: 'Derived stores', l1: 'search index, cache,', l2: 'media copies' },
  { title: 'Display policy', l1: 'one layer in front', l2: 'of every output' },
  { title: 'Outputs', l1: 'pages, API, email,', l2: 'sitemaps' },
];

// from/to are stage indexes (inclusive): the part of the data path each group governs.
const GROUPS = [
  { ids: 'A1–A5', name: 'Architecture and data ownership', covers: 'own copy · raw payloads · rebuildable stores', from: 0, to: 2, color: CYAN },
  { ids: 'D1–D6', name: 'Data reliability', covers: 'resumable sync · freshness · removals · reconciliation', from: 0, to: 2, color: BLUE },
  { ids: 'S1–S5', name: 'Security', covers: 'feed credentials · access control · display rules on every output · consumer data · scraping', from: 0, to: 4, color: VIOLET },
  { ids: 'P1–P4', name: 'Performance', covers: 'server-rendered pages · Core Web Vitals · search latency budget', from: 2, to: 4, color: CYAN },
  { ids: 'O1–O5', name: 'Production operations', covers: 'monitoring · alerts and runbooks · restore drills · reversible deploys · incidents', from: 0, to: 4, color: BLUE },
];

const BAND_Y = 160;
const BAND_H = 58;
const BAND_GAP = 12;
const BANDS_END = BAND_Y + GROUPS.length * (BAND_H + BAND_GAP) - BAND_GAP;

export default function IdxRequirementLayersDiagram() {
  return (
    <svg viewBox="0 0 920 590" role="img" aria-labelledby="idx-req-title idx-req-desc" fontFamily={FONT} style={{ maxWidth: 'none' }}>
      <title id="idx-req-title">Five requirement groups mapped onto the data path of an IDX platform</title>
      <desc id="idx-req-desc">
        The top row is the data path, left to right: MLS feeds, the system of record holding replicated listings and
        raw payloads, derived stores (search index, cache and media copies), a display policy layer, and the outputs
        (pages, API, email and sitemaps). Below it, five bars show which part of the path each requirement group
        governs. Architecture and data ownership, A1 to A5, and data reliability, D1 to D6, span feeds to derived
        stores. Security, S1 to S5, spans the whole path. Performance, P1 to P4, spans derived stores to outputs.
        Production operations, O1 to O5, spans the whole path. A final box states that every requirement has a
        verification the team can run.
      </desc>
      <defs>
        <marker id="idx-req-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M1 1 L9 5 L1 9 z" fill={MUTED} />
        </marker>
      </defs>

      <text x={40} y={24} fill={MUTED} fontSize={13}>Data path</text>

      {/* Column guides, so each bar can be read against the stages above it */}
      {COL_X.map((x) => (
        <g key={x}>
          <line x1={x} y1={126} x2={x} y2={BANDS_END} stroke={STROKE} strokeWidth={1} strokeDasharray="2 5" />
          <line x1={x + COL_W} y1={126} x2={x + COL_W} y2={BANDS_END} stroke={STROKE} strokeWidth={1} strokeDasharray="2 5" />
        </g>
      ))}

      {/* Data path */}
      {STAGES.map((s, i) => {
        const x = COL_X[i];
        return (
          <g key={s.title}>
            <rect x={x} y={36} width={COL_W} height={90} rx={10} fill={BOX} stroke={i === 3 ? VIOLET : STROKE} strokeWidth={i === 3 ? 1.5 : 1} />
            <text x={x + COL_W / 2} y={62} textAnchor="middle" fill={TEXT} fontSize={15} fontWeight={700}>{s.title}</text>
            <text x={x + COL_W / 2} y={86} textAnchor="middle" fill={MUTED} fontSize={13}>{s.l1}</text>
            <text x={x + COL_W / 2} y={104} textAnchor="middle" fill={MUTED} fontSize={13}>{s.l2}</text>
            {i < STAGES.length - 1 && (
              <line x1={x + COL_W + 2} y1={81} x2={COL_X[i + 1] - 3} y2={81} stroke={MUTED} strokeWidth={1.4} markerEnd="url(#idx-req-arrow)" />
            )}
          </g>
        );
      })}

      <text x={40} y={150} fill={MUTED} fontSize={13}>Requirement groups, drawn under the stages they govern</text>

      {/* Requirement groups */}
      {GROUPS.map((g, i) => {
        const y = BAND_Y + i * (BAND_H + BAND_GAP);
        const x = COL_X[g.from];
        const w = COL_X[g.to] + COL_W - x;
        return (
          <g key={g.ids}>
            <rect x={x} y={y} width={w} height={BAND_H} rx={8} fill={BOX} stroke={g.color} strokeWidth={1.5} />
            <rect x={x} y={y} width={6} height={BAND_H} rx={3} fill={g.color} />
            <text x={x + 20} y={y + 24} fill={TEXT} fontSize={15} fontWeight={700}>
              {g.name} <tspan fill={g.color}>({g.ids})</tspan>
            </text>
            <text x={x + 20} y={y + 45} fill={MUTED} fontSize={13}>{g.covers}</text>
          </g>
        );
      })}

      {/* Acceptance */}
      <rect x={40} y={BANDS_END + 22} width={840} height={48} rx={10} fill="none" stroke={STROKE} strokeDasharray="5 4" />
      <text x={460} y={BANDS_END + 51} textAnchor="middle" fill={TEXT} fontSize={14}>
        Acceptance: every requirement has a verification the team can run and record
      </text>
    </svg>
  );
}
