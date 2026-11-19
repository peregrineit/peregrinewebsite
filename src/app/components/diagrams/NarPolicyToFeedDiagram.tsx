// "From NAR policy to your feed", for /blog/nar-mls-policy-changes-november-2026.
// Inline SVG, viewBox only, styling in attributes.
// maxWidth is reset inline because an older .cp-diagram rule caps SVGs at 520px.
// The guide states the same three steps in the paragraph above the figure.

const FONT = 'system-ui, sans-serif';
const BOX = '#162036';
const STROKE = '#2a3a59';
const TEXT = '#f1f5f9';
const MUTED = '#94a3b8';
const CYAN = '#22d3ee';
const AMBER = '#fbbf24';

const W = 212;
const H = 124;
const Y = 34;
const XS = [14, 274, 534];

const STEPS = [
  { name: 'NAR model policy', sub: ['Approved at NAR NXT 2026,', 'announced November 8, 2026'] },
  { name: 'Your local MLS decides', sub: ['whether to adopt each', 'optional policy, and when'] },
  { name: 'Your agreement changes', sub: ['participation or data', 'license terms, per MLS'] },
];

export default function NarPolicyToFeedDiagram() {
  return (
    <svg viewBox="0 0 760 284" role="img" aria-labelledby="nar-feed-title nar-feed-desc" fontFamily={FONT} style={{ maxWidth: 'none' }}>
      <title id="nar-feed-title">From NAR policy to your feed</title>
      <desc id="nar-feed-desc">
        Three steps from left to right. First, NAR approves a model policy. Second, your local MLS decides whether
        to adopt each optional policy. Third, your participation or data license agreement changes. The optional
        copyright and data feed policies stop at the second step unless your MLS adopts them.
      </desc>
      <defs>
        <marker id="nar-feed-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto">
          <path d="M0 0L10 5L0 10z" fill={MUTED} />
        </marker>
      </defs>

      {STEPS.map((s, i) => (
        <g key={s.name}>
          <rect
            x={XS[i]} y={Y} width={W} height={H} rx={14} fill={BOX}
            stroke={i === 1 ? CYAN : STROKE} strokeWidth={i === 1 ? 1.6 : 1.2} strokeDasharray={i === 1 ? '6 5' : undefined}
          />
          <circle cx={XS[i] + 28} cy={Y + 30} r={13} fill="none" stroke={CYAN} strokeWidth={1.4} />
          <text x={XS[i] + 28} y={Y + 35} textAnchor="middle" fill={CYAN} fontSize={14} fontWeight={700}>{i + 1}</text>
          <text x={XS[i] + 18} y={Y + 68} fill={TEXT} fontSize={16} fontWeight={700}>{s.name}</text>
          {s.sub.map((line, j) => (
            <text key={line} x={XS[i] + 18} y={Y + 90 + j * 17} fill={MUTED} fontSize={12.5}>{line}</text>
          ))}
        </g>
      ))}

      <line x1={XS[0] + W + 4} y1={Y + H / 2} x2={XS[1] - 6} y2={Y + H / 2} stroke={MUTED} strokeWidth={1.4} markerEnd="url(#nar-feed-arrow)" />
      <line x1={XS[1] + W + 4} y1={Y + H / 2} x2={XS[2] - 6} y2={Y + H / 2} stroke={MUTED} strokeWidth={1.4} strokeDasharray="5 5" markerEnd="url(#nar-feed-arrow)" />

      {/* The stop under the middle box: the optional policies go no further without a local decision. */}
      <line x1={XS[1] + W / 2} y1={Y + H} x2={XS[1] + W / 2} y2={196} stroke={AMBER} strokeWidth={1.4} strokeDasharray="3 4" />
      <rect x={XS[1] + W / 2 - 9} y={196} width={18} height={6} rx={3} fill={AMBER} />
      <text x={380} y={226} textAnchor="middle" fill={AMBER} fontSize={13.5} fontWeight={700}>
        Optional policies stop here unless your MLS adopts them.
      </text>
      <text x={380} y={254} textAnchor="middle" fill={MUTED} fontSize={12}>
        Optional: copyright protection of MLS data, and MLS data feed services.
      </text>
      <text x={380} y={272} textAnchor="middle" fill={MUTED} fontSize={12}>
        The policy statement on the use of MLS data is not labeled optional.
      </text>
    </svg>
  );
}
