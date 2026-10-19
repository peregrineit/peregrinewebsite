// Prototype, test environment and production side by side, for /blog/vibe-coded-app-security-checklist.
// Inline SVG, viewBox only, styling in attributes.
// maxWidth is reset inline because an older .cp-diagram rule caps SVGs at 520px.
// The guide prints the same stages as a list under the figure (STAGES is exported), so the text
// alternative and the drawing cannot drift apart.

const FONT = 'system-ui, sans-serif';
const BOX = '#162036';
const STROKE = '#2a3a59';
const TEXT = '#f1f5f9';
const MUTED = '#94a3b8';
const CYAN = '#22d3ee';
const BLUE = '#60a5fa';
const VIOLET = '#a78bfa';

export interface Stage { name: string; sub: string; items: string[][]; text: string }

// Each item is one or two short lines so it fits a 270-wide column at 13-14px.
export const STAGES: Stage[] = [
  {
    name: 'Prototype',
    sub: 'appears to work',
    items: [
      ['Works for the person', 'who built it'],
      ['Sample data or none'],
      ['Keys and settings left', 'from the builder'],
      ['Rules mostly enforced', 'in the interface'],
    ],
    text: 'Prototype that appears to work: it works for the person who built it, with sample data or none, keys and settings left from the builder, and rules mostly enforced in the interface.',
  },
  {
    name: 'Test environment',
    sub: 'works, safely',
    items: [
      ['Its own database and', 'test API keys'],
      ['Several test accounts', 'with different roles'],
      ['Payments in test mode'],
      ['Schema changes applied', 'from migration files'],
    ],
    text: 'Working test environment: its own database and test API keys, several test accounts with different roles, payments in test mode, and schema changes applied from migration files.',
  },
  {
    name: 'Production',
    sub: 'real users, data, money',
    items: [
      ['Access enforced on the', 'server and in the database'],
      ['Secrets kept server-side;', 'live keys only here'],
      ['Backups with a', 'tested restore'],
      ['Errors reported to', 'someone who acts on them'],
    ],
    text: 'Production system with real users, data and money: access enforced on the server and in the database, secrets kept server-side with live keys only here, backups with a tested restore, and errors reported to someone who acts on them.',
  },
];

const COL = 270;
const GAP = 45;
const x = (i: number) => i * (COL + GAP);
const COLORS = [MUTED, BLUE, CYAN];
const HEAD_Y = 10;
const HEAD_H = 64;
const ITEM_Y = 100;
const ITEM_H = 62;
const ITEM_GAP = 12;

export default function LaunchStagesDiagram() {
  const bottom = ITEM_Y + 4 * (ITEM_H + ITEM_GAP);
  return (
    <svg viewBox={`0 0 900 ${bottom + 70}`} role="img" aria-labelledby="ls-title ls-desc" fontFamily={FONT} style={{ maxWidth: 'none' }}>
      <title id="ls-title">Prototype, test environment and production compared</title>
      <desc id="ls-desc">
        Three columns from left to right. A prototype that appears to work runs for its builder with sample data,
        builder-supplied keys and rules in the interface. A working test environment has its own database and test
        keys, several test accounts, payments in test mode and migrations from files. A production system has real
        users, data and money, with access enforced on the server and in the database, secrets kept server-side,
        backups with a tested restore and errors reported to someone who acts on them.
      </desc>
      <defs>
        <marker id="ls-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto">
          <path d="M1 1 L9 5 L1 9 z" fill={MUTED} />
        </marker>
      </defs>

      {STAGES.map((s, i) => (
        <g key={s.name}>
          <rect x={x(i)} y={HEAD_Y} width={COL} height={HEAD_H} rx={10} fill="none" stroke={COLORS[i]} strokeWidth={1.6} />
          <text x={x(i) + COL / 2} y={HEAD_Y + 28} textAnchor="middle" fill={TEXT} fontSize={18} fontWeight={700}>{s.name}</text>
          <text x={x(i) + COL / 2} y={HEAD_Y + 50} textAnchor="middle" fill={COLORS[i]} fontSize={14}>{s.sub}</text>
          {i < STAGES.length - 1 && (
            <line x1={x(i) + COL + 6} y1={HEAD_Y + HEAD_H / 2} x2={x(i + 1) - 6} y2={HEAD_Y + HEAD_H / 2} stroke={MUTED} strokeWidth={1.5} markerEnd="url(#ls-arrow)" />
          )}
          {s.items.map((lines, j) => {
            const top = ITEM_Y + j * (ITEM_H + ITEM_GAP);
            const first = lines.length === 1 ? top + ITEM_H / 2 + 5 : top + 26;
            return (
              <g key={j}>
                <rect x={x(i)} y={top} width={COL} height={ITEM_H} rx={9} fill={BOX} stroke={STROKE} />
                <rect x={x(i)} y={top} width={4} height={ITEM_H} rx={2} fill={COLORS[i]} />
                {lines.map((line, k) => (
                  <text key={k} x={x(i) + 20} y={first + k * 20} fill={TEXT} fontSize={14}>{line}</text>
                ))}
              </g>
            );
          })}
        </g>
      ))}

      <rect x={0} y={bottom + 12} width={900} height={50} rx={9} fill="none" stroke={VIOLET} strokeWidth={1.3} strokeDasharray="5 4" />
      <text x={20} y={bottom + 43} fill={MUTED} fontSize={14}>
        <tspan fill={VIOLET} fontWeight={700}>Each step raises the cost of a mistake: </tspan>
        who can reach the app, what data it holds, and whose money moves.
      </text>
    </svg>
  );
}
