// Receive path and send path for webhooks, side by side, for /blog/webhook-event-driven-integrations.
// Inline SVG, viewBox only, styling in attributes.
// maxWidth is reset inline because an older .cp-diagram rule caps SVGs at 520px.
// The guide prints the same steps as two lists under the figure (RECEIVE and SEND are exported).

const FONT = 'system-ui, sans-serif';
const BOX = '#162036';
const STROKE = '#2a3a59';
const TEXT = '#f1f5f9';
const MUTED = '#94a3b8';
const CYAN = '#22d3ee';
const BLUE = '#60a5fa';
const VIOLET = '#a78bfa';

export interface PathStep { name: string; sub: string; text: string }

export const RECEIVE: PathStep[] = [
  { name: 'Verify', sub: 'signature over the raw body + timestamp', text: 'Check the signature over the raw request body and reject a timestamp outside the tolerance.' },
  { name: 'Enqueue', sub: 'store the event; event id is unique', text: 'Store the raw event durably under its unique event id; a duplicate id is accepted and skipped.' },
  { name: 'Ack', sub: 'return 2xx to the sender, fast', text: 'Return a 2xx status to the sender straight away, before any business logic runs.' },
  { name: 'Worker', sub: 'takes the event from the queue', text: 'A worker takes the event from the queue; a failed attempt is retried and finally dead-lettered.' },
  { name: 'Idempotent apply', sub: 'skip if seen; compare versions; commit', text: 'Apply the change once: skip an event already processed, write only if the version is newer than the stored one, and commit the change with the processed marker.' },
];

export const SEND: PathStep[] = [
  { name: 'Write + outbox', sub: 'state change and event, one transaction', text: 'Write the state change and an outbox row for the event in one database transaction.' },
  { name: 'Relay', sub: 'reads committed outbox rows', text: 'A relay reads committed outbox rows and creates a delivery per subscribed endpoint.' },
  { name: 'Deliver', sub: 'signed POST with event id and timestamp', text: 'Send a signed POST carrying the event id and a timestamp to the subscriber’s URL, with a timeout.' },
  { name: 'Retry', sub: 'backoff with jitter, capped attempts', text: 'On a timeout or a non-2xx reply, schedule another attempt with exponential backoff and jitter.' },
  { name: 'Dead letter', sub: 'kept for inspection and replay', text: 'When attempts are exhausted, park the delivery for inspection and replay, and alert.' },
];

const W = 370;
const H = 58;
const GAP = 30;
const TOP = 112;
const LEFT = 40;
const RIGHT = 490;
const y = (i: number) => TOP + i * (H + GAP);

function Column({ x, steps, color }: { x: number; steps: PathStep[]; color: string }) {
  return (
    <g>
      {steps.map((s, i) => (
        <g key={s.name}>
          <rect x={x} y={y(i)} width={W} height={H} rx={9} fill={BOX} stroke={STROKE} />
          <circle cx={x + 26} cy={y(i) + H / 2} r={13} fill="none" stroke={color} strokeWidth={1.5} />
          <text x={x + 26} y={y(i) + H / 2 + 5} textAnchor="middle" fill={color} fontSize={14} fontWeight={700}>{i + 1}</text>
          <text x={x + 52} y={y(i) + 25} fill={TEXT} fontSize={16} fontWeight={700}>{s.name}</text>
          <text x={x + 52} y={y(i) + 45} fill={MUTED} fontSize={13}>{s.sub}</text>
          {i < steps.length - 1 && (
            <line x1={x + W / 2} y1={y(i) + H} x2={x + W / 2} y2={y(i + 1) - 4} stroke={MUTED} strokeWidth={1.4} markerEnd="url(#wh-arrow)" />
          )}
        </g>
      ))}
    </g>
  );
}

export default function WebhookPathsDiagram() {
  const bottom = y(4) + H;
  return (
    <svg viewBox={`0 0 900 ${bottom + 96}`} role="img" aria-labelledby="wh-paths-title wh-paths-desc" fontFamily={FONT} style={{ maxWidth: 'none' }}>
      <title id="wh-paths-title">The webhook receive path and send path, side by side</title>
      <desc id="wh-paths-desc">
        Two vertical flows. On the left, receiving: a sender&apos;s request is verified, enqueued, acknowledged with a
        2xx status, taken by a worker and applied idempotently. On the right, sending: a state change is written
        with an outbox row, a relay reads the outbox, the event is delivered as a signed request to the
        subscriber, failed deliveries are retried and loop back to delivery, and exhausted deliveries go to a dead
        letter store. A reconciliation job that polls and compares both sides sits under both paths.
      </desc>
      <defs>
        <marker id="wh-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto">
          <path d="M1 1 L9 5 L1 9 z" fill={MUTED} />
        </marker>
      </defs>

      {/* Headings and endpoints */}
      <text x={LEFT} y={24} fill={CYAN} fontSize={15} fontWeight={700} letterSpacing="0.06em">RECEIVING A WEBHOOK</text>
      <text x={RIGHT} y={24} fill={BLUE} fontSize={15} fontWeight={700} letterSpacing="0.06em">SENDING A WEBHOOK</text>
      <rect x={LEFT} y={40} width={W} height={40} rx={20} fill="none" stroke={CYAN} strokeWidth={1.4} strokeDasharray="5 4" />
      <text x={LEFT + W / 2} y={65} textAnchor="middle" fill={TEXT} fontSize={14}>Sender (a provider&apos;s system)</text>
      <line x1={LEFT + W / 2} y1={80} x2={LEFT + W / 2} y2={TOP - 4} stroke={MUTED} strokeWidth={1.4} markerEnd="url(#wh-arrow)" />
      <rect x={RIGHT} y={40} width={W} height={40} rx={20} fill="none" stroke={BLUE} strokeWidth={1.4} strokeDasharray="5 4" />
      <text x={RIGHT + W / 2} y={65} textAnchor="middle" fill={TEXT} fontSize={14}>Your application changes state</text>
      <line x1={RIGHT + W / 2} y1={80} x2={RIGHT + W / 2} y2={TOP - 4} stroke={MUTED} strokeWidth={1.4} markerEnd="url(#wh-arrow)" />

      <Column x={LEFT} steps={RECEIVE} color={CYAN} />
      <Column x={RIGHT} steps={SEND} color={BLUE} />

      {/* Receive: the 2xx goes back to the sender */}
      <path d={`M${LEFT} ${y(2) + H / 2} H18 V60 H${LEFT - 4}`} fill="none" stroke={CYAN} strokeWidth={1.3} strokeDasharray="3 4" markerEnd="url(#wh-arrow)" />
      <text x={6} y={y(2) + H / 2 - 9} fill={CYAN} fontSize={13}>2xx</text>

      {/* Send: deliver goes out to the subscriber; retry loops back to deliver */}
      <path d={`M${RIGHT + W} ${y(3) + H / 2} H882 V${y(2) + H / 2} H${RIGHT + W + 4}`} fill="none" stroke={VIOLET} strokeWidth={1.3} markerEnd="url(#wh-arrow)" />
      <text x={RIGHT + W / 2 + 10} y={y(3) - 10} fill={MUTED} fontSize={13}>timeout or non-2xx</text>
      <text x={RIGHT + W / 2 + 10} y={y(4) - 10} fill={MUTED} fontSize={13}>attempts exhausted</text>
      <text x={LEFT + W / 2 + 10} y={y(3) - 10} fill={MUTED} fontSize={13}>later, from the queue</text>

      {/* Safety net under both */}
      <rect x={LEFT} y={bottom + 28} width={RIGHT + W - LEFT} height={52} rx={9} fill="none" stroke={VIOLET} strokeWidth={1.3} strokeDasharray="5 4" />
      <text x={LEFT + 20} y={bottom + 50} fill={VIOLET} fontSize={14} fontWeight={700}>Reconciliation by polling</text>
      <text x={LEFT + 20} y={bottom + 69} fill={MUTED} fontSize={13}>a scheduled comparison of current state on both sides catches what either path missed</text>
    </svg>
  );
}
