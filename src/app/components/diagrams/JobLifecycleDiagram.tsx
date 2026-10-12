// Job lifecycle states for /blog/background-jobs-redis-bullmq. State names are the ones the
// BullMQ documentation uses (Architecture and Getters pages, read 2026-10-12): wait, prioritized,
// delayed, active, completed, failed, waiting-children. Inline SVG, viewBox only, styling in attributes.
// maxWidth is reset inline because an older .cp-diagram rule caps SVGs at 520px.

const FONT = 'system-ui, sans-serif';
const BOX = '#162036';
const STROKE = '#2a3a59';
const TEXT = '#f1f5f9';
const MUTED = '#94a3b8';
const CYAN = '#22d3ee';
const BLUE = '#60a5fa';
const VIOLET = '#a78bfa';

function State({ x, y, w = 180, name, sub, color = STROKE }: { x: number; y: number; w?: number; name: string; sub: string; color?: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={56} rx={9} fill={BOX} stroke={color} strokeWidth={color === STROKE ? 1 : 1.5} />
      <text x={x + w / 2} y={y + 24} textAnchor="middle" fill={TEXT} fontSize={16} fontWeight={700}>{name}</text>
      <text x={x + w / 2} y={y + 43} textAnchor="middle" fill={MUTED} fontSize={13}>{sub}</text>
    </g>
  );
}

export default function JobLifecycleDiagram() {
  return (
    <svg viewBox="0 0 900 480" role="img" aria-labelledby="job-life-title job-life-desc" fontFamily={FONT} style={{ maxWidth: 'none' }}>
      <title id="job-life-title">Lifecycle states of a BullMQ job, including the retry path</title>
      <desc id="job-life-desc">
        A job added with queue.add enters the wait, delayed or prioritized state. A delayed job moves on when its
        delay has elapsed. A worker takes a job from wait or prioritized and it becomes active. From active it
        ends as completed when the processor returns, or as failed when it throws with no attempts left. If
        attempts remain, or the job stalls, it goes from active back to wait: this is the retry path. A parent
        job added with FlowProducer.add starts in waiting-children and joins the queued states when its last
        child completes.
      </desc>
      <defs>
        <marker id="job-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto">
          <path d="M1 1 L9 5 L1 9 z" fill={MUTED} />
        </marker>
        <marker id="job-arrow-retry" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto">
          <path d="M1 1 L9 5 L1 9 z" fill={VIOLET} />
        </marker>
      </defs>

      {/* Producers */}
      <rect x={16} y={170} width={160} height={44} rx={22} fill="none" stroke={CYAN} strokeWidth={1.4} strokeDasharray="5 4" />
      <text x={96} y={197} textAnchor="middle" fill={TEXT} fontSize={14}>queue.add()</text>
      <rect x={16} y={400} width={160} height={44} rx={22} fill="none" stroke={CYAN} strokeWidth={1.4} strokeDasharray="5 4" />
      <text x={96} y={427} textAnchor="middle" fill={TEXT} fontSize={14}>FlowProducer.add()</text>

      {/* Queued states */}
      <rect x={236} y={46} width={208} height={292} rx={12} fill="none" stroke={STROKE} strokeDasharray="5 4" />
      <State x={250} y={60} name="delayed" sub="until the delay elapses" />
      <State x={250} y={164} name="wait" sub="the waiting list" color={CYAN} />
      <State x={250} y={268} name="prioritized" sub="lower number first" />
      <State x={250} y={394} name="waiting-children" sub="parent of a flow" />

      {/* Processing and final states */}
      <State x={540} y={164} w={160} name="active" sub="locked by a worker" color={BLUE} />
      <State x={756} y={72} w={128} name="completed" sub="processor returned" />
      <State x={756} y={256} w={128} name="failed" sub="no attempts left" />

      {/* add → queued states */}
      <line x1={176} y1={192} x2={246} y2={192} stroke={MUTED} strokeWidth={1.4} markerEnd="url(#job-arrow)" />
      <line x1={166} y1={172} x2={247} y2={96} stroke={MUTED} strokeWidth={1.4} markerEnd="url(#job-arrow)" />
      <text x={150} y={128} fill={MUTED} fontSize={13}>delay</text>
      <line x1={166} y1={212} x2={247} y2={290} stroke={MUTED} strokeWidth={1.4} markerEnd="url(#job-arrow)" />
      <text x={140} y={262} fill={MUTED} fontSize={13}>priority</text>

      {/* delayed → wait */}
      <line x1={340} y1={116} x2={340} y2={160} stroke={MUTED} strokeWidth={1.4} markerEnd="url(#job-arrow)" />
      <text x={350} y={143} fill={MUTED} fontSize={13}>elapsed</text>

      {/* flow */}
      <line x1={176} y1={422} x2={246} y2={422} stroke={MUTED} strokeWidth={1.4} markerEnd="url(#job-arrow)" />
      <line x1={340} y1={394} x2={340} y2={342} stroke={MUTED} strokeWidth={1.4} markerEnd="url(#job-arrow)" />
      <text x={350} y={372} fill={MUTED} fontSize={13}>last child completed</text>

      {/* queued → active */}
      <line x1={430} y1={200} x2={536} y2={200} stroke={MUTED} strokeWidth={1.4} markerEnd="url(#job-arrow)" />
      <text x={452} y={220} fill={MUTED} fontSize={13}>worker takes</text>
      <line x1={430} y1={290} x2={556} y2={224} stroke={MUTED} strokeWidth={1.4} markerEnd="url(#job-arrow)" />

      {/* active → final */}
      <line x1={700} y1={180} x2={753} y2={118} stroke={MUTED} strokeWidth={1.4} markerEnd="url(#job-arrow)" />
      <line x1={700} y1={206} x2={753} y2={268} stroke={MUTED} strokeWidth={1.4} markerEnd="url(#job-arrow)" />
      <text x={640} y={262} fill={MUTED} fontSize={13}>throws</text>

      {/* retry path: active → wait */}
      <path d="M620 164 V134 H472 V178 H434" fill="none" stroke={VIOLET} strokeWidth={1.6} markerEnd="url(#job-arrow-retry)" />
      <text x={472} y={104} fill={VIOLET} fontSize={13} fontWeight={700}>retry path</text>
      <text x={472} y={123} fill={MUTED} fontSize={13}>attempts remain, or the job stalled</text>

      <text x={500} y={404} fill={MUTED} fontSize={13}>A retry with a backoff waits for its delay first.</text>
      <text x={500} y={424} fill={MUTED} fontSize={13}>Rate-limited jobs stay in wait.</text>
      <text x={500} y={444} fill={MUTED} fontSize={13}>There is no stalled state, only a stalled event.</text>
    </svg>
  );
}
