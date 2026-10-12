// Map search: a viewport with a drawn area, clusters and single markers, the result list beside it,
// and the request flow that keeps the two in step. Inline SVG, viewBox only, no CSS classes.
// Counts are illustrative and add up: 128 + 42 + 9 clustered + 5 single markers = 184 listings.

const FONT = 'system-ui, sans-serif';
const TEXT = '#f1f5f9';
const MUTED = '#94a3b8';
const CYAN = '#22d3ee';
const BLUE = '#60a5fa';
const VIOLET = '#a78bfa';
const BOX = '#162036';
const LINE = '#2a3a59';

const STEPS = [
  { n: '1', name: 'Map moves', sub: 'pan, zoom or draw' },
  { n: '2', name: 'Debounce', sub: 'cancel the old request' },
  { n: '3', name: 'Write the URL', sub: 'bounds, zoom, filters' },
  { n: '4', name: 'One query', sub: 'hits + grid buckets' },
  { n: '5', name: 'One response', sub: 'stale ones dropped' },
];

const CLUSTERS = [
  { x: 170, y: 170, r: 30, n: '128' },
  { x: 330, y: 150, r: 23, n: '42' },
  { x: 380, y: 265, r: 17, n: '9' },
];

const PINS = [
  { x: 235, y: 268 },
  { x: 285, y: 232 },
  { x: 120, y: 262 },
  { x: 425, y: 190 },
];

export default function MapSearchFlowDiagram() {
  return (
    <svg viewBox="0 0 900 540" role="img" aria-labelledby="msf-title msf-desc" fontFamily={FONT} style={{ maxWidth: 'none' }}>
      <title id="msf-title">Map search: viewport, drawn area, clusters and the request flow that updates map and list together</title>
      <desc id="msf-desc">
        On the left, a map viewport defined by its top-left and bottom-right corners. Inside it a drawn polygon
        contains three clusters labeled 128, 42 and 9 and five single listing markers, one of them highlighted.
        On the right, a result list headed 184 homes in drawn area, with one row highlighted and linked to the
        highlighted marker. Along the bottom, five steps: the map moves; the change is debounced and the old
        request canceled; the bounds, zoom and filters are written to the URL; one query returns hits and grid
        buckets; and one response updates both the map and the list, with stale responses dropped.
      </desc>
      <defs>
        <marker id="msf-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto">
          <path d="M0 0 L10 5 L0 10 z" fill={BLUE} />
        </marker>
        <marker id="msf-arrow-cyan" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto">
          <path d="M0 0 L10 5 L0 10 z" fill={CYAN} />
        </marker>
        <clipPath id="msf-map-clip"><rect x="20" y="44" width="500" height="320" rx="10" /></clipPath>
      </defs>

      {/* Map viewport */}
      <text x="20" y="28" fill={MUTED} fontSize="13" fontWeight="700" letterSpacing="1.5">MAP VIEWPORT</text>
      <rect x="20" y="44" width="500" height="320" rx="10" fill="#0f1a30" stroke={LINE} strokeWidth="1.5" />
      <g clipPath="url(#msf-map-clip)" stroke="#1d2a45" strokeWidth="1">
        <path d="M20 124 H520 M20 204 H520 M20 284 H520 M145 44 V364 M270 44 V364 M395 44 V364" />
        <path d="M20 330 C140 300 200 345 300 318 S470 300 520 322" fill="none" stroke="#24365a" strokeWidth="6" />
      </g>
      <text x="30" y="64" fill={MUTED} fontSize="13">top left corner</text>
      <text x="510" y="354" textAnchor="end" fill={MUTED} fontSize="13">bottom right corner</text>
      <circle cx="20" cy="44" r="4" fill={MUTED} />
      <circle cx="520" cy="364" r="4" fill={MUTED} />

      {/* Drawn polygon */}
      <path d="M90 120 L250 86 L420 96 L478 196 L440 300 L300 322 L120 306 L72 214 Z" fill="rgba(167,139,250,0.10)" stroke={VIOLET} strokeWidth="2" strokeDasharray="7 5" />
      <text x="262" y="110" textAnchor="middle" fill={VIOLET} fontSize="13">drawn area (polygon filter)</text>

      {/* Clusters */}
      {CLUSTERS.map((c) => (
        <g key={c.n}>
          <circle cx={c.x} cy={c.y} r={c.r + 6} fill="rgba(96,165,250,0.18)" />
          <circle cx={c.x} cy={c.y} r={c.r} fill="#1e3a6b" stroke={BLUE} strokeWidth="2" />
          <text x={c.x} y={c.y + 5} textAnchor="middle" fill={TEXT} fontSize="15" fontWeight="700">{c.n}</text>
        </g>
      ))}

      {/* Single markers */}
      {PINS.map((p) => (
        <circle key={`${p.x}-${p.y}`} cx={p.x} cy={p.y} r="7" fill={CYAN} stroke="#0f1a30" strokeWidth="2" />
      ))}
      {/* Highlighted marker, linked to the highlighted list row */}
      <circle cx="455" cy="250" r="12" fill="none" stroke={CYAN} strokeWidth="2" />
      <circle cx="455" cy="250" r="7" fill={CYAN} stroke="#0f1a30" strokeWidth="2" />
      <path d="M467 250 L560 196" fill="none" stroke={CYAN} strokeWidth="1.5" strokeDasharray="3 4" />

      {/* Result list */}
      <text x="560" y="28" fill={MUTED} fontSize="13" fontWeight="700" letterSpacing="1.5">RESULT LIST</text>
      <rect x="560" y="44" width="320" height="320" rx="10" fill={BOX} stroke={LINE} strokeWidth="1.5" />
      <text x="576" y="72" fill={TEXT} fontSize="15" fontWeight="700">184 homes in drawn area</text>
      <text x="576" y="92" fill={MUTED} fontSize="13">same filters and bounds as the map</text>
      {[112, 170, 228, 286].map((y, i) => (
        <g key={y}>
          <rect x="572" y={y} width="296" height="50" rx="8" fill="#0f1a30" stroke={i === 1 ? CYAN : LINE} strokeWidth={i === 1 ? 2 : 1} />
          <rect x="580" y={y + 8} width="46" height="34" rx="4" fill="#24365a" />
          <rect x="638" y={y + 12} width="130" height="9" rx="4" fill={i === 1 ? CYAN : '#3b4d70'} />
          <rect x="638" y={y + 29} width="200" height="7" rx="3" fill="#2a3a59" />
        </g>
      ))}
      <text x="720" y="354" textAnchor="middle" fill={MUTED} fontSize="13">first page of 184</text>

      {/* Legend */}
      <g>
        <circle cx="74" cy="388" r="9" fill="#1e3a6b" stroke={BLUE} strokeWidth="2" />
        <text x="90" y="393" fill={MUTED} fontSize="13">cluster with count</text>
        <circle cx="236" cy="388" r="6" fill={CYAN} />
        <text x="250" y="393" fill={MUTED} fontSize="13">one listing</text>
        <circle cx="346" cy="388" r="9" fill="none" stroke={CYAN} strokeWidth="2" />
        <circle cx="346" cy="388" r="5" fill={CYAN} />
        <text x="362" y="393" fill={MUTED} fontSize="13">highlighted</text>
      </g>

      {/* Request flow */}
      {STEPS.map((s, i) => {
        const x = 20 + i * 175;
        return (
          <g key={s.n}>
            <rect x={x} y="438" width="160" height="72" rx="10" fill={BOX} stroke={i === 4 ? CYAN : LINE} strokeWidth="1.5" />
            <circle cx={x + 20} cy="462" r="11" fill="none" stroke={CYAN} strokeWidth="1.5" />
            <text x={x + 20} y="467" textAnchor="middle" fill={CYAN} fontSize="13" fontWeight="700">{s.n}</text>
            <text x={x + 38} y="467" fill={TEXT} fontSize="15" fontWeight="700">{s.name}</text>
            <text x={x + 12} y="494" fill={MUTED} fontSize="13">{s.sub}</text>
            {i < 4 && <line x1={x + 160} y1="474" x2={x + 173} y2="474" stroke={BLUE} strokeWidth="2" markerEnd="url(#msf-arrow)" />}
          </g>
        );
      })}

      {/* Map -> step 1 */}
      <path d="M40 364 L40 434" fill="none" stroke={BLUE} strokeWidth="2" markerEnd="url(#msf-arrow)" />
      {/* Step 5 -> list and -> map */}
      <path d="M840 438 L840 368" fill="none" stroke={CYAN} strokeWidth="2" markerEnd="url(#msf-arrow-cyan)" />
      <text x="830" y="412" textAnchor="end" fill={CYAN} fontSize="13">rows</text>
      <path d="M760 438 L760 424 Q760 414 750 414 L510 414 Q500 414 500 404 L500 368" fill="none" stroke={CYAN} strokeWidth="2" markerEnd="url(#msf-arrow-cyan)" />
      <text x="630" y="406" textAnchor="middle" fill={CYAN} fontSize="13">markers and clusters</text>
    </svg>
  );
}
