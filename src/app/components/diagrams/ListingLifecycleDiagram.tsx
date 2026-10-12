// State-transition diagram for listing statuses, drawn as inline SVG. Each box shows the
// pipeline action taken when a listing enters that state; arrow labels are the trigger.
// Styling is inline (no CSS file). The article repeats the content as a list under the figure.

const FONT = 'system-ui, sans-serif';
const BOX = '#162036';
const STROKE = '#2a3a59';
const TEXT = '#f1f5f9';
const MUTED = '#94a3b8';
const CYAN = '#22d3ee';
const BLUE = '#60a5fa';
const VIOLET = '#a78bfa';

const W = 220;
const H = 92;
const ROW1 = 110;
const ROW2 = 320;
const COL = { left: 30, mid: 340, right: 650 };

type State = { x: number; y: number; name: string; lines: [string, string]; accent: string };
const STATES: State[] = [
  { x: COL.left, y: ROW1, name: 'Expired', lines: ['Leave active search;', 'page per license'], accent: BLUE },
  { x: COL.mid, y: ROW1, name: 'Active', lines: ['Index; page returns 200;', 'match saved searches'], accent: CYAN },
  { x: COL.right, y: ROW1, name: 'Pending', lines: ['Re-index with new status;', 'page stays 200'], accent: CYAN },
  { x: COL.mid, y: ROW2, name: 'Withdrawn / Canceled', lines: ['Leave active search;', 'page per license'], accent: BLUE },
  { x: COL.right, y: ROW2, name: 'Closed', lines: ['Leave active search; keep', 'as sold only if licensed'], accent: BLUE },
];

const REMOVED_Y = 510;

function Arrow({ d, color = CYAN, dashed = false }: { d: string; color?: string; dashed?: boolean }) {
  const id = color === VIOLET ? 'lifecycle-arrow-v' : 'lifecycle-arrow-c';
  return <path d={d} fill="none" stroke={color} strokeWidth={1.6} strokeDasharray={dashed ? '6 4' : undefined} markerEnd={`url(#${id})`} />;
}

export default function ListingLifecycleDiagram() {
  return (
    <svg
      viewBox="0 0 900 650"
      role="img"
      aria-labelledby="lifecycle-title lifecycle-desc"
      style={{ maxWidth: 'none' }}
      fontFamily={FONT}
    >
      <title id="lifecycle-title">Listing status transitions and the pipeline action on each</title>
      <desc id="lifecycle-desc">
        A listing first seen in the feed becomes Active. Active moves to Pending when an offer is accepted and can
        return to Active. Pending moves to Closed when the sale closes. Active moves to Expired when the listing term
        ends, or to Withdrawn or Canceled, and can return to Active from either. From any state a record can be
        removed from the feed, signalled by MlgCanView false, a Delete status, or its key being missing at
        reconciliation. Each state shows the pipeline action taken on entering it.
      </desc>
      <defs>
        <marker id="lifecycle-arrow-c" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto">
          <path d="M1 1 L9 5 L1 9 z" fill={CYAN} />
        </marker>
        <marker id="lifecycle-arrow-v" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto">
          <path d="M1 1 L9 5 L1 9 z" fill={VIOLET} />
        </marker>
      </defs>

      {/* Entry */}
      <text x={COL.mid + W / 2} y={36} textAnchor="middle" fill={MUTED} fontSize={13}>first seen in the feed</text>
      <Arrow d={`M${COL.mid + W / 2} 46 V${ROW1 - 6}`} />

      {/* States */}
      {STATES.map((s) => (
        <g key={s.name}>
          <rect x={s.x} y={s.y} width={W} height={H} rx={12} fill={BOX} stroke={STROKE} />
          <rect x={s.x} y={s.y} width={5} height={H} rx={2} fill={s.accent} />
          <text x={s.x + 20} y={s.y + 30} fill={TEXT} fontSize={16} fontWeight={700}>{s.name}</text>
          <text x={s.x + 20} y={s.y + 54} fill={MUTED} fontSize={13}>{s.lines[0]}</text>
          <text x={s.x + 20} y={s.y + 73} fill={MUTED} fontSize={13}>{s.lines[1]}</text>
        </g>
      ))}

      {/* Active <-> Expired */}
      <Arrow d={`M${COL.mid} ${ROW1 + 28} H${COL.left + W + 6}`} />
      <text x={(COL.left + W + COL.mid) / 2} y={ROW1 - 10} textAnchor="middle" fill={TEXT} fontSize={13}>term ends</text>
      <Arrow d={`M${COL.left + W} ${ROW1 + 64} H${COL.mid - 6}`} />
      <text x={(COL.left + W + COL.mid) / 2} y={ROW1 + H + 20} textAnchor="middle" fill={TEXT} fontSize={13}>relisted</text>

      {/* Active <-> Pending */}
      <Arrow d={`M${COL.mid + W} ${ROW1 + 28} H${COL.right - 6}`} />
      <text x={(COL.mid + W + COL.right) / 2} y={ROW1 - 10} textAnchor="middle" fill={TEXT} fontSize={13}>offer accepted</text>
      <Arrow d={`M${COL.right} ${ROW1 + 64} H${COL.mid + W + 6}`} />
      <text x={(COL.mid + W + COL.right) / 2} y={ROW1 + H + 20} textAnchor="middle" fill={TEXT} fontSize={13}>back on market</text>

      {/* Active <-> Withdrawn / Canceled */}
      <Arrow d={`M${COL.mid + 70} ${ROW1 + H} V${ROW2 - 6}`} />
      <text x={COL.mid + 62} y={(ROW1 + H + ROW2) / 2 + 10} textAnchor="end" fill={TEXT} fontSize={13}>withdrawn or canceled</text>
      <Arrow d={`M${COL.mid + 150} ${ROW2} V${ROW1 + H + 6}`} />
      <text x={COL.mid + 158} y={(ROW1 + H + ROW2) / 2 + 10} fill={TEXT} fontSize={13}>back on market</text>

      {/* Pending -> Closed */}
      <Arrow d={`M${COL.right + W / 2} ${ROW1 + H} V${ROW2 - 6}`} />
      <text x={COL.right + W / 2 + 8} y={(ROW1 + H + ROW2) / 2 + 10} fill={TEXT} fontSize={13}>sale closes</text>

      {/* Removed */}
      <Arrow d={`M${COL.left + W / 2} ${ROW1 + H} V${REMOVED_Y - 6}`} color={VIOLET} dashed />
      <Arrow d={`M${COL.mid + W / 2} ${ROW2 + H} V${REMOVED_Y - 6}`} color={VIOLET} dashed />
      <Arrow d={`M${COL.right + W / 2} ${ROW2 + H} V${REMOVED_Y - 6}`} color={VIOLET} dashed />
      <text x={COL.left + W / 2 + 10} y={REMOVED_Y - 44} fill={VIOLET} fontSize={13}>from any state,</text>
      <text x={COL.left + W / 2 + 10} y={REMOVED_Y - 26} fill={VIOLET} fontSize={13}>Active and Pending included</text>

      <rect x={30} y={REMOVED_Y} width={840} height={112} rx={12} fill={BOX} stroke={VIOLET} strokeOpacity={0.8} strokeDasharray="6 4" />
      <text x={50} y={REMOVED_Y + 30} fill={TEXT} fontSize={16} fontWeight={700}>Removed from the feed</text>
      <text x={50} y={REMOVED_Y + 56} fill={MUTED} fontSize={13}>
        Signal: MlgCanView false, a Delete status, or the key is missing at reconciliation.
      </text>
      <text x={50} y={REMOVED_Y + 76} fill={MUTED} fontSize={13}>
        Action: delete from the store and the index, purge the cached page, cancel pending alerts,
      </text>
      <text x={50} y={REMOVED_Y + 95} fill={MUTED} fontSize={13}>
        and return 404 or 410 for the listing URL.
      </text>
    </svg>
  );
}
