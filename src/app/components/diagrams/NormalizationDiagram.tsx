// Three source schemas merging into one canonical schema through a mapping layer, with the
// raw payload retained. Inline SVG, inline styling (no CSS file). Board names, field names
// and values are illustrative. The article repeats the content as a list under the figure.

const FONT = 'system-ui, sans-serif';
const BOX = '#162036';
const STROKE = '#2a3a59';
const TEXT = '#f1f5f9';
const MUTED = '#94a3b8';
const CYAN = '#22d3ee';
const BLUE = '#60a5fa';
const VIOLET = '#a78bfa';
const MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace';

const SOURCES = [
  { y: 70, name: 'Board A feed', lines: ['StandardStatus: Active', 'LivingArea: 1850'] },
  { y: 184, name: 'Board B feed', lines: ['MlsStatus: ACT', 'LivingArea: 172 (sq m)'] },
  { y: 298, name: 'Board C feed', lines: ['XYZ_Status: A', 'XYZ_SqFtTotal: "1,850"'] },
];
const SRC_X = 16;
const SRC_W = 214;
const SRC_H = 90;
const RAW_X = 270;
const RAW_W = 130;
const MAP_X = 440;
const MAP_W = 190;
const CAN_X = 670;
const CAN_W = 214;
const TOP = 70;
const BOTTOM = 388;

export default function NormalizationDiagram() {
  const mid = (TOP + BOTTOM) / 2;
  return (
    <svg
      viewBox="0 0 900 480"
      role="img"
      aria-labelledby="norm-title norm-desc"
      style={{ maxWidth: 'none' }}
      fontFamily={FONT}
    >
      <title id="norm-title">Several MLS source schemas normalized into one canonical schema</title>
      <desc id="norm-desc">
        Three board feeds with different field names and units are saved unchanged in a raw store. A mapping layer
        with versioned rules per source renames fields, maps lookup values, converts units and casts types, and
        writes one canonical listing. Each canonical value records the source field, the raw record and the rule
        version it came from, so normalization can be re-run from the raw store when a rule changes. All names and
        values shown are illustrative.
      </desc>
      <defs>
        <marker id="norm-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto">
          <path d="M1 1 L9 5 L1 9 z" fill={CYAN} />
        </marker>
        <marker id="norm-arrow-v" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto">
          <path d="M1 1 L9 5 L1 9 z" fill={VIOLET} />
        </marker>
      </defs>

      {/* Column headings */}
      <text x={SRC_X} y={44} fill={CYAN} fontSize={14} fontWeight={700} letterSpacing={1}>SOURCE SCHEMAS</text>
      <text x={RAW_X} y={44} fill={CYAN} fontSize={14} fontWeight={700} letterSpacing={1}>RAW STORE</text>
      <text x={MAP_X} y={44} fill={CYAN} fontSize={14} fontWeight={700} letterSpacing={1}>MAPPING LAYER</text>
      <text x={CAN_X} y={44} fill={CYAN} fontSize={14} fontWeight={700} letterSpacing={1}>CANONICAL SCHEMA</text>

      {/* Sources */}
      {SOURCES.map((s) => (
        <g key={s.name}>
          <rect x={SRC_X} y={s.y} width={SRC_W} height={SRC_H} rx={10} fill={BOX} stroke={STROKE} />
          <text x={SRC_X + 14} y={s.y + 26} fill={TEXT} fontSize={15} fontWeight={700}>{s.name}</text>
          <text x={SRC_X + 14} y={s.y + 50} fill={MUTED} fontSize={13} fontFamily={MONO}>{s.lines[0]}</text>
          <text x={SRC_X + 14} y={s.y + 70} fill={MUTED} fontSize={13} fontFamily={MONO}>{s.lines[1]}</text>
          <line x1={SRC_X + SRC_W} y1={s.y + SRC_H / 2} x2={RAW_X - 6} y2={s.y + SRC_H / 2} stroke={CYAN} strokeWidth={1.6} markerEnd="url(#norm-arrow)" />
        </g>
      ))}

      {/* Raw store */}
      <rect x={RAW_X} y={TOP} width={RAW_W} height={BOTTOM - TOP} rx={10} fill={BOX} stroke={BLUE} />
      <text x={RAW_X + RAW_W / 2} y={mid - 40} textAnchor="middle" fill={TEXT} fontSize={15} fontWeight={700}>Payload</text>
      <text x={RAW_X + RAW_W / 2} y={mid - 20} textAnchor="middle" fill={TEXT} fontSize={15} fontWeight={700}>as received</text>
      <text x={RAW_X + RAW_W / 2} y={mid + 8} textAnchor="middle" fill={MUTED} fontSize={13}>one row per</text>
      <text x={RAW_X + RAW_W / 2} y={mid + 26} textAnchor="middle" fill={MUTED} fontSize={13}>source record,</text>
      <text x={RAW_X + RAW_W / 2} y={mid + 44} textAnchor="middle" fill={MUTED} fontSize={13}>never edited</text>

      {/* Raw -> mapping */}
      <line x1={RAW_X + RAW_W} y1={mid} x2={MAP_X - 6} y2={mid} stroke={CYAN} strokeWidth={1.6} markerEnd="url(#norm-arrow)" />

      {/* Mapping layer */}
      <rect x={MAP_X} y={TOP + 34} width={MAP_W} height={BOTTOM - TOP - 68} rx={10} fill={BOX} stroke={CYAN} />
      <text x={MAP_X + 16} y={TOP + 64} fill={TEXT} fontSize={15} fontWeight={700}>Rules per source</text>
      {['rename fields', 'map lookup values', 'convert units', 'cast types', 'keep local fields', 'flag what is unmapped'].map((l, i) => (
        <text key={l} x={MAP_X + 16} y={TOP + 92 + i * 22} fill={MUTED} fontSize={13}>{`${i + 1}. ${l}`}</text>
      ))}
      <text x={MAP_X + 16} y={BOTTOM - 48} fill={BLUE} fontSize={13}>versioned config</text>

      {/* Mapping -> canonical */}
      <line x1={MAP_X + MAP_W} y1={mid} x2={CAN_X - 6} y2={mid} stroke={CYAN} strokeWidth={1.6} markerEnd="url(#norm-arrow)" />

      {/* Canonical */}
      <rect x={CAN_X} y={TOP} width={CAN_W} height={BOTTOM - TOP} rx={10} fill={BOX} stroke={STROKE} />
      <text x={CAN_X + 14} y={TOP + 28} fill={TEXT} fontSize={15} fontWeight={700}>One listing shape</text>
      {['status: Active', 'living_area_sqft: 1850', 'local: { ... }', 'display flags'].map((l, i) => (
        <text key={l} x={CAN_X + 14} y={TOP + 58 + i * 22} fill={MUTED} fontSize={13} fontFamily={MONO}>{l}</text>
      ))}
      <line x1={CAN_X + 14} y1={TOP + 152} x2={CAN_X + CAN_W - 14} y2={TOP + 152} stroke={STROKE} />
      <text x={CAN_X + 14} y={TOP + 178} fill={VIOLET} fontSize={14} fontWeight={700}>Provenance per value</text>
      {['source system and field', 'raw record id', 'rule version', 'transform applied'].map((l, i) => (
        <text key={l} x={CAN_X + 14} y={TOP + 204 + i * 22} fill={MUTED} fontSize={13}>{l}</text>
      ))}

      {/* Provenance back to raw */}
      <path
        d={`M${CAN_X + CAN_W / 2} ${BOTTOM} V430 H${RAW_X + RAW_W / 2} V${BOTTOM + 6}`}
        fill="none" stroke={VIOLET} strokeWidth={1.4} strokeDasharray="6 4" markerEnd="url(#norm-arrow-v)"
      />
      <text x={(RAW_X + RAW_W / 2 + CAN_X + CAN_W / 2) / 2} y={452} textAnchor="middle" fill={VIOLET} fontSize={13}>
        every canonical value points back to its raw record; re-run the rules from raw when they change
      </text>
    </svg>
  );
}
