// Timeline of a parallel-run migration: legacy and new systems, backfill, continuous sync,
// verification gates, cutover and the rollback window. Inline SVG, inline styling (no CSS
// file). The article repeats the content as a list under the figure.

const FONT = 'system-ui, sans-serif';
const BOX = '#162036';
const STROKE = '#2a3a59';
const TEXT = '#f1f5f9';
const MUTED = '#94a3b8';
const CYAN = '#22d3ee';
const BLUE = '#60a5fa';
const VIOLET = '#a78bfa';

const X0 = 150; // timeline start
const X_SYNC = 300; // backfill ends, continuous sync begins
const X_CUT = 600; // cutover
const X_END = 780; // rollback window closes
const X1 = 884; // timeline end
const LEGACY_Y = 110;
const NEW_Y = 290;
const FEED_Y = 404;
const LANE_H = 56;

function Segment({ x1, x2, y, label, live = false, dashed = false, h = LANE_H }: { x1: number; x2: number; y: number; label: string; live?: boolean; dashed?: boolean; h?: number }) {
  return (
    <g>
      <rect x={x1} y={y} width={x2 - x1} height={h} rx={8} fill={BOX} stroke={live ? CYAN : STROKE} strokeWidth={live ? 1.6 : 1} strokeDasharray={dashed ? '6 4' : undefined} />
      <text x={(x1 + x2) / 2} y={y + h / 2 + 5} textAnchor="middle" fill={live ? TEXT : MUTED} fontSize={13} fontWeight={live ? 700 : 400}>{label}</text>
    </g>
  );
}

export default function ParallelRunMigrationDiagram() {
  const gateY = 228;
  const gates = [
    { x: 430, label: 'counts' },
    { x: 500, label: 'checksums' },
    { x: 570, label: 'samples' },
  ];
  return (
    <svg
      viewBox="0 0 900 520"
      role="img"
      aria-labelledby="parallel-run-title parallel-run-desc"
      style={{ maxWidth: 'none' }}
      fontFamily={FONT}
    >
      <title id="parallel-run-title">Timeline of a parallel-run migration from a legacy system to a new one</title>
      <desc id="parallel-run-desc">
        Time runs left to right in four phases. In phase one the legacy system serves all traffic while its data is
        bulk-copied to the new system. In phase two, changes flow continuously from legacy to new and three
        verification gates are checked: counts, checksums and sampled records. At cutover, writes are frozen, a final
        sync and gate run, and traffic switches to the new system. In phase three, the rollback window, the new system
        is the source of truth and changes are synced back to the legacy system, which stands by read-only. In phase
        four the legacy system is retired. Listing data is not copied from legacy: the new system imports it fresh
        from the MLS feed and then syncs incrementally.
      </desc>
      <defs>
        <marker id="parallel-run-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto">
          <path d="M1 1 L9 5 L1 9 z" fill={CYAN} />
        </marker>
        <marker id="parallel-run-arrow-v" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto">
          <path d="M1 1 L9 5 L1 9 z" fill={VIOLET} />
        </marker>
        <marker id="parallel-run-arrow-b" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto">
          <path d="M1 1 L9 5 L1 9 z" fill={BLUE} />
        </marker>
      </defs>

      {/* Phase headings */}
      <text x={(X0 + X_SYNC) / 2} y={40} textAnchor="middle" fill={CYAN} fontSize={13} fontWeight={700}>1. BACKFILL</text>
      <text x={(X_SYNC + X_CUT) / 2} y={40} textAnchor="middle" fill={CYAN} fontSize={13} fontWeight={700}>2. SYNC AND VERIFY</text>
      <text x={(X_CUT + X_END) / 2} y={40} textAnchor="middle" fill={VIOLET} fontSize={13} fontWeight={700}>3. ROLLBACK WINDOW</text>
      <text x={(X_END + X1) / 2} y={40} textAnchor="middle" fill={MUTED} fontSize={13} fontWeight={700}>4. RETIRE</text>
      <line x1={X0} y1={56} x2={X1} y2={56} stroke={STROKE} />
      {[X0, X_SYNC, X_CUT, X_END, X1].map((x) => (
        <line key={x} x1={x} y1={50} x2={x} y2={62} stroke={MUTED} />
      ))}
      <text x={X1} y={78} textAnchor="end" fill={MUTED} fontSize={13}>time</text>

      {/* Lane labels */}
      <text x={16} y={LEGACY_Y + 26} fill={TEXT} fontSize={14} fontWeight={700}>Legacy</text>
      <text x={16} y={LEGACY_Y + 44} fill={MUTED} fontSize={13}>system</text>
      <text x={16} y={NEW_Y + 26} fill={TEXT} fontSize={14} fontWeight={700}>New</text>
      <text x={16} y={NEW_Y + 44} fill={MUTED} fontSize={13}>system</text>
      <text x={16} y={FEED_Y + 22} fill={TEXT} fontSize={14} fontWeight={700}>MLS feed</text>
      <text x={16} y={FEED_Y + 40} fill={MUTED} fontSize={13}>listing data</text>

      {/* Legacy lane */}
      <Segment x1={X0} x2={X_CUT - 4} y={LEGACY_Y} label="Source of truth: serves all traffic" live />
      <Segment x1={X_CUT + 4} x2={X_END - 4} y={LEGACY_Y} label="Read-only standby" dashed />
      <Segment x1={X_END + 4} x2={X1} y={LEGACY_Y} label="Retired" />

      {/* New lane */}
      <Segment x1={X0} x2={X_SYNC - 4} y={NEW_Y} label="Bulk load" />
      <Segment x1={X_SYNC + 4} x2={X_CUT - 4} y={NEW_Y} label="Kept in sync; shadow reads" />
      <Segment x1={X_CUT + 4} x2={X1} y={NEW_Y} label="Source of truth: serves all traffic" live />

      {/* Legacy -> new flows */}
      <line x1={225} y1={LEGACY_Y + LANE_H} x2={225} y2={NEW_Y - 6} stroke={CYAN} strokeWidth={1.6} markerEnd="url(#parallel-run-arrow)" />
      <text x={233} y={196} fill={TEXT} fontSize={13}>bulk</text>
      <text x={233} y={213} fill={TEXT} fontSize={13}>copy</text>
      <line x1={320} y1={LEGACY_Y + LANE_H} x2={320} y2={NEW_Y - 6} stroke={CYAN} strokeWidth={1.6} markerEnd="url(#parallel-run-arrow)" />
      <text x={328} y={196} fill={TEXT} fontSize={13}>changes:</text>
      <text x={328} y={213} fill={TEXT} fontSize={13}>CDC or</text>
      <text x={328} y={230} fill={TEXT} fontSize={13}>dual writes</text>

      {/* Verification gates */}
      <text x={500} y={196} textAnchor="middle" fill={BLUE} fontSize={13} fontWeight={700}>verification gates</text>
      {gates.map((g) => (
        <g key={g.label}>
          <path d={`M${g.x} ${gateY - 14} l14 14 l-14 14 l-14 -14 z`} fill={BOX} stroke={BLUE} strokeWidth={1.5} />
          <text x={g.x} y={gateY + 34} textAnchor="middle" fill={MUTED} fontSize={13}>{g.label}</text>
        </g>
      ))}

      {/* Cutover line */}
      <line x1={X_CUT} y1={62} x2={X_CUT} y2={468} stroke={TEXT} strokeWidth={1.6} strokeDasharray="3 4" />
      <text x={X_CUT} y={488} textAnchor="middle" fill={TEXT} fontSize={13} fontWeight={700}>Cutover: freeze writes, final sync, final gate,</text>
      <text x={X_CUT} y={506} textAnchor="middle" fill={TEXT} fontSize={13} fontWeight={700}>switch traffic, turn on redirects</text>

      {/* Reverse sync during rollback window */}
      <line x1={690} y1={NEW_Y} x2={690} y2={LEGACY_Y + LANE_H + 6} stroke={VIOLET} strokeWidth={1.6} strokeDasharray="6 4" markerEnd="url(#parallel-run-arrow-v)" />
      <text x={698} y={222} fill={VIOLET} fontSize={13}>reverse</text>
      <text x={698} y={239} fill={VIOLET} fontSize={13}>sync</text>

      {/* Point of no return */}
      <line x1={X_END} y1={62} x2={X_END} y2={380} stroke={VIOLET} strokeWidth={1.2} strokeDasharray="3 4" />
      <text x={X_END + 8} y={222} fill={MUTED} fontSize={13}>rollback</text>
      <text x={X_END + 8} y={239} fill={MUTED} fontSize={13}>no longer</text>
      <text x={X_END + 8} y={256} fill={MUTED} fontSize={13}>possible</text>

      {/* MLS feed lane */}
      <Segment x1={X0} x2={X1} y={FEED_Y} h={46} label="Fresh import from the MLS feed, then incremental sync; never copied from legacy" />
      <line x1={262} y1={FEED_Y} x2={262} y2={NEW_Y + LANE_H + 6} stroke={BLUE} strokeWidth={1.6} markerEnd="url(#parallel-run-arrow-b)" />
    </svg>
  );
}
