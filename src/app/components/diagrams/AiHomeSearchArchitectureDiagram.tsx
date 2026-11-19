// "Reference architecture for AI home search on MLS data", for /blog/ai-home-search-mls-data-architecture.
// Inline SVG, viewBox only, styling in attributes. Two layouts from the same data: a left-to-right row
// for wide screens and a top-to-bottom stack under 640px (.cp-diagram-wide / .cp-diagram-narrow in
// content-pages.css). The guide lists the same six stages in the text below the figure.

const FONT = 'system-ui, sans-serif';
const BOX = '#162036';
const STROKE = '#2a3a59';
const TEXT = '#f1f5f9';
const MUTED = '#94a3b8';
const CYAN = '#22d3ee';
const AMBER = '#fbbf24';

const STEPS = [
  { name: 'MLS feed', sub: ['RESO Web API,', 'under your license'] },
  { name: 'Replication', sub: ['and normalization into', 'one canonical schema'] },
  { name: 'Search index', sub: ['filters, plus vectors', 'only where licensed'] },
  { name: 'Tool layer', sub: ['or MCP server: auth,', 'per-MLS rules, audit log'] },
  { name: 'AI assistant', sub: ['calls typed tools,', 'writes the reply'] },
  { name: 'User', sub: ['sees listings with', 'attribution and time'] },
];
const GATE = 3; // index of the tool layer, where license rules are enforced
const GATE_LABEL = 'License rules enforced here';
const FOOT = 'The model calls tools. It never queries the feed or the index directly.';
const DESC =
  'Six stages in order. An MLS feed delivered over the RESO Web API under your license is replicated and ' +
  'normalized into one canonical schema. A search index holds structured filters, plus vectors only where the ' +
  'license permits them. A tool layer or MCP server enforces authentication, per-MLS rules and an audit log; a ' +
  'dashed box marks it as the place where license rules are enforced. The AI assistant calls typed tools and ' +
  'writes the reply, and the user sees listings with attribution and a last-updated time.';

function Wide() {
  const W = 128, H = 104, GAP = 20, X0 = 8, Y = 62;
  const x = (i: number) => X0 + i * (W + GAP);
  return (
    <svg className="cp-diagram-wide" viewBox="0 0 884 232" role="img" aria-labelledby="ai-arch-w-title ai-arch-w-desc" fontFamily={FONT} style={{ maxWidth: 'none' }}>
      <title id="ai-arch-w-title">Reference architecture for AI home search on MLS data</title>
      <desc id="ai-arch-w-desc">{DESC}</desc>
      <defs>
        <marker id="ai-arch-w-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0 0L10 5L0 10z" fill={MUTED} />
        </marker>
      </defs>
      <rect x={x(GATE) - 9} y={Y - 34} width={W + 18} height={H + 46} rx={16} fill="none" stroke={AMBER} strokeWidth={1.4} strokeDasharray="6 5" />
      <text x={x(GATE) + W / 2} y={Y - 16} textAnchor="middle" fill={AMBER} fontSize={11} fontWeight={700}>{GATE_LABEL}</text>
      {STEPS.map((s, i) => (
        <g key={s.name}>
          <rect x={x(i)} y={Y} width={W} height={H} rx={12} fill={BOX} stroke={i === GATE ? CYAN : STROKE} strokeWidth={i === GATE ? 1.6 : 1.2} />
          <text x={x(i) + 12} y={Y + 24} fill={CYAN} fontSize={11.5} fontWeight={700}>{i + 1}</text>
          <text x={x(i) + 12} y={Y + 48} fill={TEXT} fontSize={14.5} fontWeight={700}>{s.name}</text>
          {s.sub.map((line, j) => (
            <text key={line} x={x(i) + 12} y={Y + 68 + j * 15} fill={MUTED} fontSize={10.6}>{line}</text>
          ))}
          {i < STEPS.length - 1 && (
            <line x1={x(i) + W + 3} y1={Y + H / 2} x2={x(i + 1) - 5} y2={Y + H / 2} stroke={MUTED} strokeWidth={1.4} markerEnd="url(#ai-arch-w-arrow)" />
          )}
        </g>
      ))}
      <text x={442} y={212} textAnchor="middle" fill={MUTED} fontSize={12.5}>{FOOT}</text>
    </svg>
  );
}

function Narrow() {
  const W = 288, H = 74, GAP = 30, X = 26, Y0 = 14;
  const y = (i: number) => Y0 + i * (H + GAP) + (i >= GATE ? 22 : 0) + (i > GATE ? 10 : 0);
  return (
    <svg className="cp-diagram-narrow" viewBox="0 0 340 720" role="img" aria-labelledby="ai-arch-n-title ai-arch-n-desc" fontFamily={FONT} style={{ maxWidth: 'none' }}>
      <title id="ai-arch-n-title">Reference architecture for AI home search on MLS data</title>
      <desc id="ai-arch-n-desc">{DESC}</desc>
      <defs>
        <marker id="ai-arch-n-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0 0L10 5L0 10z" fill={MUTED} />
        </marker>
      </defs>
      <rect x={X - 12} y={y(GATE) - 30} width={W + 24} height={H + 42} rx={16} fill="none" stroke={AMBER} strokeWidth={1.4} strokeDasharray="6 5" />
      <text x={X + W / 2} y={y(GATE) - 11} textAnchor="middle" fill={AMBER} fontSize={12.5} fontWeight={700}>{GATE_LABEL}</text>
      {STEPS.map((s, i) => (
        <g key={s.name}>
          <rect x={X} y={y(i)} width={W} height={H} rx={12} fill={BOX} stroke={i === GATE ? CYAN : STROKE} strokeWidth={i === GATE ? 1.6 : 1.2} />
          <text x={X + 16} y={y(i) + 30} fill={CYAN} fontSize={13} fontWeight={700}>{i + 1}</text>
          <text x={X + 38} y={y(i) + 30} fill={TEXT} fontSize={16} fontWeight={700}>{s.name}</text>
          <text x={X + 16} y={y(i) + 54} fill={MUTED} fontSize={12.5}>{s.sub.join(' ')}</text>
          {i < STEPS.length - 1 && (
            <line
              x1={X + W / 2} y1={y(i) + H + (i === GATE ? 14 : 3)} x2={X + W / 2} y2={y(i + 1) - (i + 1 === GATE ? 34 : 5)}
              stroke={MUTED} strokeWidth={1.4} markerEnd="url(#ai-arch-n-arrow)"
            />
          )}
        </g>
      ))}
      <text x={170} y={690} textAnchor="middle" fill={MUTED} fontSize={12}>The model calls tools. It never queries</text>
      <text x={170} y={707} textAnchor="middle" fill={MUTED} fontSize={12}>the feed or the index directly.</text>
    </svg>
  );
}

export default function AiHomeSearchArchitectureDiagram() {
  return (
    <>
      <Wide />
      <Narrow />
    </>
  );
}
