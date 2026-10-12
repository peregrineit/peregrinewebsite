// One cycle of an MLS sync job, drawn as inline SVG: the five steps of the loop on the
// left and the failure path of each step on the right. Styling is inline (no CSS file).
// The same content is repeated as a list under the figure in the article; keep them in step.

const FONT = 'system-ui, sans-serif';
const BOX = '#162036';
const STROKE = '#2a3a59';
const TEXT = '#f1f5f9';
const MUTED = '#94a3b8';
const CYAN = '#22d3ee';
const BLUE = '#60a5fa';
const VIOLET = '#a78bfa';

const STEP_X = 70;
const STEP_W = 330;
const STEP_H = 72;
const FAIL_X = 520;
const FAIL_W = 360;
const stepY = (i: number) => 64 + i * 104;

const STEPS = [
  { n: '1', name: 'Read checkpoint', sub: 'cursor for this feed and resource' },
  { n: '2', name: 'Fetch one page', sub: 'changed since cursor; rate limited' },
  { n: '3', name: 'Write page to raw store', sub: 'idempotent upsert by record key' },
  { n: '4', name: 'Advance cursor', sub: 'same transaction as step 3' },
  { n: '5', name: 'Enqueue downstream work', sub: 'normalize, media and index jobs' },
];

const FAILS = [
  { y: stepY(1), h: STEP_H, from: stepY(1) + STEP_H / 2, title: '429, 5xx or timeout', lines: ['Back off, then retry the same request.', 'Cursor unchanged.'] },
  { y: stepY(2) + 34, h: 110, from: -1, title: 'Write or commit fails', lines: ['The transaction rolls back, so the page', 'and the cursor move together or not at all.', 'The next run fetches the page again.'] },
  { y: stepY(4) - 20, h: STEP_H, from: stepY(4) + 20, title: 'Enqueue fails', lines: ['Rows stay marked unprocessed;', 'a sweeper re-queues them.'] },
  { y: stepY(4) + 68, h: STEP_H, from: stepY(4) + 52, title: 'A record keeps failing downstream', lines: ['Quarantine that record and alert.', 'The cursor is not held back.'] },
];

export default function SyncCycleDiagram() {
  const endY = stepY(5) + 6;
  return (
    <svg
      viewBox="0 0 900 650"
      role="img"
      aria-labelledby="sync-cycle-title sync-cycle-desc"
      style={{ maxWidth: 'none' }}
      fontFamily={FONT}
    >
      <title id="sync-cycle-title">One cycle of an MLS sync job, with its failure paths</title>
      <desc id="sync-cycle-desc">
        A loop of five steps: read the checkpoint, fetch one page of records changed since the cursor, write the page
        to the raw store, advance the cursor in the same transaction, and enqueue downstream work. If the response
        carried a next link the loop returns to the fetch step; otherwise the run records its success time and waits.
        Each step has a failure path: a failed fetch backs off and retries with the cursor unchanged, a failed write
        rolls back so the page is fetched again, a failed enqueue is repaired by a sweeper, and a record that keeps
        failing downstream is quarantined without holding back the cursor.
      </desc>
      <defs>
        <marker id="sync-cycle-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto">
          <path d="M1 1 L9 5 L1 9 z" fill={CYAN} />
        </marker>
        <marker id="sync-cycle-fail" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto">
          <path d="M1 1 L9 5 L1 9 z" fill={VIOLET} />
        </marker>
        <marker id="sync-cycle-loop" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto">
          <path d="M1 1 L9 5 L1 9 z" fill={BLUE} />
        </marker>
      </defs>

      <text x={STEP_X} y={34} fill={CYAN} fontSize={14} fontWeight={700} letterSpacing={1}>SYNC CYCLE (PER FEED AND RESOURCE)</text>
      <text x={FAIL_X} y={34} fill={VIOLET} fontSize={14} fontWeight={700} letterSpacing={1}>IF THE STEP FAILS</text>

      {/* Steps */}
      {STEPS.map((s, i) => {
        const y = stepY(i);
        return (
          <g key={s.n}>
            <rect x={STEP_X} y={y} width={STEP_W} height={STEP_H} rx={10} fill={BOX} stroke={STROKE} />
            <circle cx={STEP_X + 26} cy={y + STEP_H / 2} r={14} fill="none" stroke={CYAN} strokeWidth={1.5} />
            <text x={STEP_X + 26} y={y + STEP_H / 2 + 5} textAnchor="middle" fill={CYAN} fontSize={14} fontWeight={700}>{s.n}</text>
            <text x={STEP_X + 52} y={y + 30} fill={TEXT} fontSize={16} fontWeight={700}>{s.name}</text>
            <text x={STEP_X + 52} y={y + 52} fill={MUTED} fontSize={13}>{s.sub}</text>
            {i < STEPS.length - 1 && (
              <line x1={STEP_X + STEP_W / 2} y1={y + STEP_H} x2={STEP_X + STEP_W / 2} y2={stepY(i + 1) - 5} stroke={CYAN} strokeWidth={1.6} markerEnd="url(#sync-cycle-arrow)" />
            )}
          </g>
        );
      })}

      {/* Loop back: next page */}
      <path
        d={`M${STEP_X} ${stepY(4) + STEP_H / 2} H30 V${stepY(1) + STEP_H / 2} H${STEP_X - 5}`}
        fill="none" stroke={BLUE} strokeWidth={1.6} markerEnd="url(#sync-cycle-loop)"
      />
      <text x={20} y={(stepY(1) + stepY(4) + STEP_H) / 2} fill={BLUE} fontSize={13} textAnchor="middle" transform={`rotate(-90 20 ${(stepY(1) + stepY(4) + STEP_H) / 2})`}>
        next link present: fetch the next page
      </text>

      {/* Exit: run complete */}
      <line x1={STEP_X + STEP_W / 2} y1={stepY(4) + STEP_H} x2={STEP_X + STEP_W / 2} y2={endY - 5} stroke={CYAN} strokeWidth={1.6} markerEnd="url(#sync-cycle-arrow)" />
      <text x={STEP_X + STEP_W / 2 + 10} y={stepY(4) + STEP_H + 20} fill={MUTED} fontSize={13}>no next link</text>
      <rect x={STEP_X} y={endY} width={STEP_W} height={46} rx={23} fill="none" stroke={CYAN} strokeWidth={1.4} strokeDasharray="5 4" />
      <text x={STEP_X + STEP_W / 2} y={endY + 28} textAnchor="middle" fill={TEXT} fontSize={14} fontWeight={700}>Record last success; wait for next run</text>

      {/* Failure paths */}
      {FAILS.map((f, i) => (
        <g key={f.title}>
          <rect x={FAIL_X} y={f.y} width={FAIL_W} height={f.h} rx={10} fill={BOX} stroke={VIOLET} strokeOpacity={0.7} strokeDasharray="6 4" />
          <text x={FAIL_X + 16} y={f.y + 24} fill={TEXT} fontSize={15} fontWeight={700}>{f.title}</text>
          {f.lines.map((l, j) => (
            <text key={l} x={FAIL_X + 16} y={f.y + 44 + j * 18} fill={MUTED} fontSize={13}>{l}</text>
          ))}
          {i !== 1 && (
            <line x1={STEP_X + STEP_W} y1={f.from} x2={FAIL_X - 6} y2={f.y + f.h / 2} stroke={VIOLET} strokeWidth={1.4} strokeDasharray="5 4" markerEnd="url(#sync-cycle-fail)" />
          )}
        </g>
      ))}
      {/* Steps 3 and 4 share one failure path because they share one transaction */}
      <line x1={STEP_X + STEP_W} y1={stepY(2) + STEP_H / 2} x2={FAIL_X - 6} y2={stepY(2) + 60} stroke={VIOLET} strokeWidth={1.4} strokeDasharray="5 4" markerEnd="url(#sync-cycle-fail)" />
      <line x1={STEP_X + STEP_W} y1={stepY(3) + STEP_H / 2} x2={FAIL_X - 6} y2={stepY(3) + 20} stroke={VIOLET} strokeWidth={1.4} strokeDasharray="5 4" markerEnd="url(#sync-cycle-fail)" />
    </svg>
  );
}
