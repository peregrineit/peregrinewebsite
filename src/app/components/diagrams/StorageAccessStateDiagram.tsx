// Illustrative access-state model for one self-storage tenancy, drawn as inline SVG. Boxes are the
// access states the management software holds; arrow labels are the events or policy checks that
// move a tenancy between them. Timings (grace periods, lockout and overlock thresholds) are operator
// policy, so none are shown. Styling is inline (no CSS file). The article repeats the content as a
// list under the figure (ACCESS_STATES is exported for that).

const FONT = 'system-ui, sans-serif';
const BOX = '#162036';
const STROKE = '#2a3a59';
const TEXT = '#f1f5f9';
const MUTED = '#94a3b8';
const CYAN = '#22d3ee';
const BLUE = '#60a5fa';
const VIOLET = '#a78bfa';

export interface AccessState { name: string; access: string; text: string }

/** The states in the order the article lists them under the figure. */
export const ACCESS_STATES: AccessState[] = [
  { name: 'Reserved', access: 'no access yet', text: 'A unit is assigned to a lease that has not started. A credential may exist but is not active at the gate.' },
  { name: 'Active', access: 'gate and unit', text: 'The lease has started and the account is in good standing. The access platform allows the tenant through the gate and into the unit.' },
  { name: 'Past due', access: 'gate and unit', text: 'A payment failed or was not made. Access is unchanged while the processor retries and the operator’s grace period runs.' },
  { name: 'Gate locked out', access: 'none at the gate', text: 'The operator’s policy threshold passed. The management software disables the gate credential.' },
  { name: 'Overlocked', access: 'none', text: 'A further policy step: the unit itself is secured, by a smart-lock command or a staff task with a padlock.' },
  { name: 'Moved out', access: 'revoked', text: 'The lease ended. Every credential is revoked and the unit returns to inventory.' },
];

const W = 196;
const H = 84;
const ROW1 = 96;
const ROW2 = 330;
const X = [24, 252, 480, 700];
const RX = 360; // vertical of the restore path, under Active
const JY = 296; // where the path from Gate locked out joins it

function Arrow({ d, color = CYAN, dashed = false }: { d: string; color?: string; dashed?: boolean }) {
  const id = color === VIOLET ? 'access-arrow-v' : color === BLUE ? 'access-arrow-b' : 'access-arrow-c';
  return <path d={d} fill="none" stroke={color} strokeWidth={1.8} strokeDasharray={dashed ? '6 4' : undefined} markerEnd={`url(#${id})`} />;
}

function State({ x, y, name, access, accent }: { x: number; y: number; name: string; access: string; accent: string }) {
  return (
    <g>
      <rect x={x} y={y} width={W} height={H} rx={12} fill={BOX} stroke={STROKE} />
      <rect x={x} y={y} width={5} height={H} rx={2} fill={accent} />
      <text x={x + 20} y={y + 34} fill={TEXT} fontSize={17} fontWeight={700}>{name}</text>
      <text x={x + 20} y={y + 60} fill={MUTED} fontSize={14}>Access: {access}</text>
    </g>
  );
}

export default function StorageAccessStateDiagram() {
  return (
    <svg
      viewBox="0 0 920 560"
      role="img"
      aria-labelledby="access-title access-desc"
      style={{ maxWidth: 'none', minWidth: 760 }}
      fontFamily={FONT}
    >
      <title id="access-title">Illustrative access states for a self-storage tenancy and the events that move between them</title>
      <desc id="access-desc">
        A tenancy starts Reserved and becomes Active on move-in. A failed or missed payment moves it to Past due; a
        posted payment returns it to Active. When the operator&apos;s grace period ends, Past due moves to Gate locked
        out, and a later policy step moves it to Overlocked. A cleared balance restores Gate locked out or Overlocked
        to Active. From any state, a move-out moves the tenancy to Moved out, where every credential is revoked.
        Thresholds are operator policy; lien steps are set by state law and are outside the diagram.
      </desc>
      <defs>
        <marker id="access-arrow-c" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto">
          <path d="M1 1 L9 5 L1 9 z" fill={CYAN} />
        </marker>
        <marker id="access-arrow-b" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto">
          <path d="M1 1 L9 5 L1 9 z" fill={BLUE} />
        </marker>
        <marker id="access-arrow-v" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto">
          <path d="M1 1 L9 5 L1 9 z" fill={VIOLET} />
        </marker>
      </defs>

      <text x={24} y={30} fill={MUTED} fontSize={14}>Illustrative. Thresholds are operator policy; lien steps follow state law and are not shown.</text>

      {/* Row 1 */}
      <State x={X[0]} y={ROW1} name="Reserved" access="not yet" accent={BLUE} />
      <State x={X[1]} y={ROW1} name="Active" access="gate and unit" accent={CYAN} />
      <State x={X[2]} y={ROW1} name="Past due" access="unchanged" accent={BLUE} />
      <State x={X[3]} y={ROW1} name="Gate locked out" access="none at gate" accent={VIOLET} />

      {/* Row 2 */}
      <State x={X[3]} y={ROW2} name="Overlocked" access="none" accent={VIOLET} />
      <State x={X[0]} y={ROW2} name="Moved out" access="revoked" accent={MUTED} />

      {/* Reserved -> Active */}
      <Arrow d={`M${X[0] + W} ${ROW1 + 42} H${X[1] - 6}`} />
      <text x={(X[0] + W + X[1]) / 2} y={ROW1 - 12} textAnchor="middle" fill={TEXT} fontSize={14}>move-in</text>

      {/* Active -> Past due, and back */}
      <Arrow d={`M${X[1] + W} ${ROW1 + 26} H${X[2] - 6}`} color={BLUE} />
      <text x={(X[1] + W + X[2]) / 2} y={ROW1 - 12} textAnchor="middle" fill={TEXT} fontSize={14}>payment fails</text>
      <Arrow d={`M${X[2]} ${ROW1 + 62} H${X[1] + W + 6}`} />
      <text x={(X[1] + W + X[2]) / 2} y={ROW1 + H + 22} textAnchor="middle" fill={TEXT} fontSize={14}>payment posted</text>

      {/* Past due -> Gate locked out */}
      <Arrow d={`M${X[2] + W} ${ROW1 + 42} H${X[3] - 6}`} color={VIOLET} />
      <text x={(X[2] + W + X[3]) / 2} y={ROW1 - 26} textAnchor="middle" fill={TEXT} fontSize={14}>grace period</text>
      <text x={(X[2] + W + X[3]) / 2} y={ROW1 - 10} textAnchor="middle" fill={TEXT} fontSize={14}>ends</text>

      {/* Gate locked out -> Overlocked */}
      <Arrow d={`M${X[3] + W / 2} ${ROW1 + H} V${ROW2 - 6}`} color={VIOLET} />
      <text x={X[3] + W / 2 + 10} y={ROW1 + H + 58} fill={TEXT} fontSize={14}>next policy</text>
      <text x={X[3] + W / 2 + 10} y={ROW1 + H + 76} fill={TEXT} fontSize={14}>step</text>

      {/* Restore: Gate locked out / Overlocked -> Active */}
      <Arrow d={`M${X[3]} ${ROW2 + 42} H${RX} V${ROW1 + H + 6}`} />
      <path d={`M${X[3] + 20} ${ROW1 + H} V${JY} H${RX}`} fill="none" stroke={CYAN} strokeWidth={1.8} />
      <text x={RX + 16} y={ROW2 + 32} fill={CYAN} fontSize={14} fontWeight={700}>balance cleared: restore</text>
      <text x={RX + 16} y={ROW2 + 66} fill={MUTED} fontSize={14}>restore takes priority</text>
      <text x={RX + 16} y={ROW2 + 84} fill={MUTED} fontSize={14}>over any pending lockout</text>

      {/* Move-out from any state */}
      <Arrow d={`M${X[1] + 40} ${ROW1 + H} V${ROW1 + H + 70} H${X[0] + W / 2} V${ROW2 - 6}`} color={MUTED} dashed />
      <text x={X[0] + 10} y={ROW1 + H + 62} fill={MUTED} fontSize={14}>move-out, from any state</text>

      {/* Footer */}
      <rect x={24} y={460} width={872} height={76} rx={12} fill={BOX} stroke={STROKE} strokeDasharray="6 4" />
      <text x={44} y={490} fill={TEXT} fontSize={15} fontWeight={700}>Each change is an event the access platform must apply, and confirm.</text>
      <text x={44} y={516} fill={MUTED} fontSize={14}>A scheduled reconciliation compares these states with what the gate and locks actually enforce.</text>
    </svg>
  );
}
