// A lead timeline for /blog/real-estate-crm-architecture: one contact's events in time order,
// with the system that owns each step on the left. Inline SVG, viewBox only, styling in attributes.
// maxWidth is reset inline because an older .cp-diagram rule caps SVGs at 520px.
// The guide prints the same rows as a list under the figure (TIMELINE is exported).

const FONT = 'system-ui, sans-serif';
const BOX = '#162036';
const STROKE = '#2a3a59';
const TEXT = '#f1f5f9';
const MUTED = '#94a3b8';
const CYAN = '#22d3ee';
const BLUE = '#60a5fa';
const VIOLET = '#a78bfa';

export interface TimelineRow {
  phase?: string;
  owner: string;
  event: string;
  detail: string;
  /** A property interaction (viewed, saved, shared), drawn as a highlighted card. */
  property?: boolean;
}

export const TIMELINE: TimelineRow[] = [
  { phase: 'Before the enquiry', owner: 'Website', event: 'listing.viewed', detail: 'Listing A, reached from a search · anonymous visitor id', property: true },
  { owner: 'Website', event: 'listing.saved', detail: 'Listing A saved · same visitor id', property: true },
  { phase: 'Enquiry', owner: 'Website → CRM capture API', event: 'enquiry.created', detail: 'Form on listing A · source, campaign, listing, search and consent recorded' },
  { owner: 'CRM: identity', event: 'contact.resolved', detail: 'Matched by email or phone, or created · earlier views and saves joined' },
  { phase: 'Assignment', owner: 'CRM: routing', event: 'assignment.created', detail: 'Existing owner, else listing agent, area, round robin · response timer starts' },
  { phase: 'Follow-up', owner: 'Email or SMS provider', event: 'message.sent', detail: 'Sent through the provider · delivery and opt-out return by webhook' },
  { owner: 'Agent, in the CRM', event: 'call.logged · stage.changed', detail: 'Outcome recorded · pipeline stage New → Contacted' },
  { owner: 'CRM and website', event: 'listing.shared · listing.viewed', detail: 'Agent shares listing B · the view joins the same contact', property: true },
];

const ROW_H = 62;
const PHASE_H = 30;
const SPINE_X = 268;
const CARD_X = 296;
const CARD_W = 574;

export default function LeadTimelineDiagram() {
  // Lay rows out top to bottom, leaving room for a phase heading where one starts.
  const rows = TIMELINE.reduce<{ row: TimelineRow; y: number; next: number }[]>((acc, row) => {
    const start = (acc.length ? acc[acc.length - 1].next : 20) + (row.phase ? PHASE_H : 0);
    return [...acc, { row, y: start, next: start + ROW_H }];
  }, []);
  const height = rows[rows.length - 1].next + 44;
  const first = rows[0].y + 25;
  const last = rows[rows.length - 1].y + 25;
  return (
    <svg viewBox={`0 0 900 ${height}`} role="img" aria-labelledby="lead-tl-title lead-tl-desc" fontFamily={FONT} style={{ maxWidth: 'none' }}>
      <title id="lead-tl-title">A lead timeline from property interactions through enquiry and assignment to follow-up</title>
      <desc id="lead-tl-desc">
        A vertical timeline of eight events for one contact, each labeled with the system that owns the step. The
        website records a listing view and a save against an anonymous visitor. An enquiry form on the listing
        reaches the CRM capture API. The CRM resolves the contact and joins the earlier views and saves, then
        routing creates an assignment. Follow-up continues with a message sent through an email or SMS provider, a
        call logged by the agent with a stage change, and a listing shared by the agent that the contact views.
        Property interactions are drawn as highlighted cards.
      </desc>

      <text x={30} y={14} fill={MUTED} fontSize={13} fontWeight={700} letterSpacing="0.08em">OWNING SYSTEM</text>
      <text x={CARD_X} y={14} fill={MUTED} fontSize={13} fontWeight={700} letterSpacing="0.08em">EVENT ON THE CONTACT&apos;S TIMELINE</text>
      <line x1={SPINE_X} y1={first} x2={SPINE_X} y2={last + 34} stroke={MUTED} strokeWidth={1.5} />
      <path d={`M${SPINE_X - 5} ${last + 30} L${SPINE_X} ${last + 40} L${SPINE_X + 5} ${last + 30} z`} fill={MUTED} />
      <text x={SPINE_X + 14} y={last + 42} fill={MUTED} fontSize={13}>time</text>

      {rows.map(({ row, y }) => {
        const accent = row.property ? CYAN : STROKE;
        return (
          <g key={row.event + row.detail}>
            {row.phase && (
              <text x={CARD_X} y={y - 9} fill={VIOLET} fontSize={13} fontWeight={700} letterSpacing="0.06em">{row.phase.toUpperCase()}</text>
            )}
            {/* owner */}
            <rect x={30} y={y + 8} width={214} height={34} rx={17} fill="none" stroke={BLUE} strokeWidth={1.2} />
            <text x={137} y={y + 30} textAnchor="middle" fill={TEXT} fontSize={13}>{row.owner}</text>
            <line x1={244} y1={y + 25} x2={SPINE_X - 7} y2={y + 25} stroke={BLUE} strokeWidth={1.2} />
            {/* spine node */}
            <circle cx={SPINE_X} cy={y + 25} r={6} fill={row.property ? CYAN : BOX} stroke={row.property ? CYAN : MUTED} strokeWidth={1.5} />
            {/* event card */}
            <rect x={CARD_X} y={y} width={CARD_W} height={50} rx={8} fill={BOX} stroke={accent} strokeWidth={row.property ? 1.5 : 1} />
            <text x={CARD_X + 14} y={y + 21} fill={row.property ? CYAN : TEXT} fontSize={14} fontWeight={700}>{row.event}</text>
            <text x={CARD_X + 14} y={y + 40} fill={MUTED} fontSize={13}>{row.detail}</text>
          </g>
        );
      })}

      <rect x={30} y={height - 26} width={18} height={14} rx={3} fill={BOX} stroke={CYAN} strokeWidth={1.5} />
      <text x={56} y={height - 14} fill={MUTED} fontSize={13}>property interaction</text>
    </svg>
  );
}
