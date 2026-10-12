// Saved-search matching and alert delivery, drawn as inline SVG (viewBox only, no CSS classes).
// Top row, left to right: listing change, matcher, dedupe, alert events. Bottom row, right to left:
// scheduler, send-time gate, channel, delivery status, with a feedback path into the gate.

const FONT = 'system-ui, sans-serif';
const TEXT = '#f1f5f9';
const MUTED = '#94a3b8';
const CYAN = '#22d3ee';
const BLUE = '#60a5fa';
const VIOLET = '#a78bfa';
const BOX = '#162036';
const LINE = '#2a3a59';

const W = 185;
const H = 92;
const X = [20, 245, 470, 695];
const TOP = 56;
const BOTTOM = 336;

const ROW1 = [
  { name: 'Listing change', a: 'new, price or status', b: 'from the sync pipeline' },
  { name: 'Matcher', a: 'which saved searches', b: 'match this listing?' },
  { name: 'Dedupe', a: 'one alert per search,', b: 'listing and change' },
  { name: 'Alert events', a: 'stored before', b: 'anything is sent' },
];

// Drawn right to left: index 0 sits under "Alert events".
const ROW2 = [
  { name: 'Scheduler', a: 'instant or digest;', b: 'time zone, quiet hours' },
  { name: 'Send-time gate', a: 'listing still displayable?', b: 'user still subscribed?' },
  { name: 'Channel', a: 'email, push or SMS;', b: 'idempotency key per send' },
  { name: 'Delivery status', a: 'delivered, delayed,', b: 'bounced, complained' },
];

export default function AlertFlowDiagram() {
  return (
    <svg viewBox="0 0 900 540" role="img" aria-labelledby="afd-title afd-desc" fontFamily={FONT} style={{ maxWidth: 'none' }}>
      <title id="afd-title">Saved-search matching and alert delivery flow</title>
      <desc id="afd-desc">
        A listing change from the sync pipeline goes to a matcher, which reads stored saved-search criteria and
        finds the searches the listing matches. A dedupe step keeps one alert per search, listing and change, and
        the result is stored as an alert event. A scheduler then decides between instant and digest sending using
        the user&apos;s time zone and quiet hours. A send-time gate checks that the listing is still displayable
        and the user still subscribed. The channel sends by email, push or SMS with an idempotency key, and the
        delivery status is recorded. Bounces, complaints and unsubscribes feed a suppression list that the gate
        reads.
      </desc>
      <defs>
        <marker id="afd-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto">
          <path d="M0 0 L10 5 L0 10 z" fill={BLUE} />
        </marker>
        <marker id="afd-arrow-violet" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto">
          <path d="M0 0 L10 5 L0 10 z" fill={VIOLET} />
        </marker>
        <marker id="afd-arrow-cyan" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto">
          <path d="M0 0 L10 5 L0 10 z" fill={CYAN} />
        </marker>
      </defs>

      <text x="20" y="30" fill={MUTED} fontSize="13" fontWeight="700" letterSpacing="1.5">MATCHING</text>
      <text x="20" y="312" fill={MUTED} fontSize="13" fontWeight="700" letterSpacing="1.5">DELIVERY</text>

      {/* Row 1 */}
      {ROW1.map((s, i) => (
        <g key={s.name}>
          <rect x={X[i]} y={TOP} width={W} height={H} rx="10" fill={BOX} stroke={LINE} strokeWidth="1.5" />
          <text x={X[i] + W / 2} y={TOP + 32} textAnchor="middle" fill={TEXT} fontSize="16" fontWeight="700">{s.name}</text>
          <text x={X[i] + W / 2} y={TOP + 56} textAnchor="middle" fill={MUTED} fontSize="13">{s.a}</text>
          <text x={X[i] + W / 2} y={TOP + 74} textAnchor="middle" fill={MUTED} fontSize="13">{s.b}</text>
          {i < 3 && <line x1={X[i] + W} y1={TOP + H / 2} x2={X[i + 1] - 4} y2={TOP + H / 2} stroke={BLUE} strokeWidth="2" markerEnd="url(#afd-arrow)" />}
        </g>
      ))}

      {/* Saved searches store feeding the matcher */}
      <rect x={X[1]} y="196" width={W} height="60" rx="30" fill={BOX} stroke={CYAN} strokeWidth="1.5" />
      <text x={X[1] + W / 2} y="222" textAnchor="middle" fill={TEXT} fontSize="15" fontWeight="700">Saved searches</text>
      <text x={X[1] + W / 2} y="242" textAnchor="middle" fill={MUTED} fontSize="13">structured criteria</text>
      <line x1={X[1] + W / 2} y1="196" x2={X[1] + W / 2} y2={TOP + H + 4} stroke={CYAN} strokeWidth="2" markerEnd="url(#afd-arrow-cyan)" />

      {/* Dedupe key note */}
      <text x={X[2] + W / 2} y="176" textAnchor="middle" fill={CYAN} fontSize="13">unique key: search +</text>
      <text x={X[2] + W / 2} y="194" textAnchor="middle" fill={CYAN} fontSize="13">listing + event + version</text>

      {/* Alert events -> Scheduler */}
      <line x1={X[3] + W / 2} y1={TOP + H} x2={X[3] + W / 2} y2={BOTTOM - 4} stroke={BLUE} strokeWidth="2" markerEnd="url(#afd-arrow)" />

      {/* Row 2, right to left */}
      {ROW2.map((s, i) => {
        const x = X[3 - i];
        const gate = i === 1;
        return (
          <g key={s.name}>
            <rect x={x} y={BOTTOM} width={W} height={H} rx="10" fill={BOX} stroke={gate ? VIOLET : LINE} strokeWidth={gate ? 2 : 1.5} />
            <text x={x + W / 2} y={BOTTOM + 32} textAnchor="middle" fill={TEXT} fontSize="16" fontWeight="700">{s.name}</text>
            <text x={x + W / 2} y={BOTTOM + 56} textAnchor="middle" fill={MUTED} fontSize="13">{s.a}</text>
            <text x={x + W / 2} y={BOTTOM + 74} textAnchor="middle" fill={MUTED} fontSize="13">{s.b}</text>
            {i < 3 && <line x1={x} y1={BOTTOM + H / 2} x2={X[3 - i - 1] + W + 4} y2={BOTTOM + H / 2} stroke={BLUE} strokeWidth="2" markerEnd="url(#afd-arrow)" />}
          </g>
        );
      })}

      {/* What the gate stops */}
      <text x={X[2] + W / 2} y="290" textAnchor="middle" fill={VIOLET} fontSize="13">stops: removed listing,</text>
      <text x={X[2] + W / 2} y="308" textAnchor="middle" fill={VIOLET} fontSize="13">license scope, opt-out</text>

      {/* Feedback: delivery status -> suppression list -> gate */}
      <path d={`M${X[0] + W / 2} ${BOTTOM + H} L${X[0] + W / 2} 478 Q${X[0] + W / 2} 490 ${X[0] + W / 2 + 12} 490 L${X[2] + W / 2 - 12} 490 Q${X[2] + W / 2} 490 ${X[2] + W / 2} 478 L${X[2] + W / 2} ${BOTTOM + H + 4}`} fill="none" stroke={VIOLET} strokeWidth="2" strokeDasharray="6 4" markerEnd="url(#afd-arrow-violet)" />
      <text x={(X[0] + X[2] + W) / 2} y="514" textAnchor="middle" fill={VIOLET} fontSize="13">bounces, complaints and unsubscribes update the suppression list the gate reads</text>
    </svg>
  );
}
