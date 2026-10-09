// Reference architecture for an MLS data pipeline, drawn as inline SVG so it scales
// with the column (viewBox) and takes its colors from the .cp-page CSS variables.
// The drawing is portrait so the labels stay readable at 375 px. The same content is
// repeated as an ordered list in the guide; keep the two in step (STAGES is exported).

export interface PipelineStage {
  n: string;
  name: string;
  /** Short label drawn in the box. */
  sub: string;
  /** Sentence used in the text alternative under the diagram. */
  text: string;
  /** Compliance checkpoint drawn on the box, if any. */
  check?: string;
  /** Monitoring signal tapped from this stage, if any. */
  signal?: string;
}

export const STAGES: PipelineStage[] = [
  {
    n: '1',
    name: 'Connector',
    sub: 'OAuth 2 token · paging · rate limiter',
    text: 'One connector per feed holds the credentials, follows the server-driven paging links and keeps requests under that platform’s rate limits.',
    signal: 'HTTP 429 and error rate per feed',
  },
  {
    n: '2',
    name: 'Replication',
    sub: 'cursor per feed and resource',
    text: 'Three jobs share one cursor per feed and resource: the initial load, the incremental sync on ModificationTimestamp, and the reconciliation pass that finds records the feed no longer carries.',
    check: 'Removals applied inside the refresh window',
    signal: 'Sync lag: now minus the newest timestamp received',
  },
  {
    n: '3',
    name: 'Raw store',
    sub: 'payload as received, tagged by feed',
    text: 'Every record is saved as received, with its feed, originating system and license type, so mappings can be re-run without re-downloading.',
    check: 'License scope recorded per record',
  },
  {
    n: '4',
    name: 'Normalize',
    sub: 'Data Dictionary names and lookups',
    text: 'Field names and lookup values are mapped to the RESO Data Dictionary; local fields are kept under their own namespace.',
    signal: 'Unmapped fields and lookup values',
  },
  {
    n: '5',
    name: 'Media worker',
    sub: 'download once to your own storage',
    text: 'A separate queue downloads each photo once into your own storage and serves it from there, never from the source URL.',
    check: 'No display from source media URLs',
    signal: 'Media queue depth and failures',
  },
  {
    n: '6',
    name: 'Canonical store',
    sub: 'one row per listing per feed',
    text: 'The system of record holds one normalized row per listing per originating system, keyed by originating system and listing key.',
    signal: 'Record count against the feed’s count',
  },
  {
    n: '7',
    name: 'Link duplicates',
    sub: 'group cross-listed properties',
    text: 'Listings of the same property from different boards are linked into a group; neither record is deleted.',
    signal: 'Duplicate-group rate per market',
  },
  {
    n: '8',
    name: 'Display policy',
    sub: 'opt-outs · scope · attribution',
    text: 'A filter applies seller opt-outs, the license scope of each surface and the attribution each board requires before anything reaches search or a page.',
    check: 'Display rules enforced before the index',
  },
  {
    n: '9',
    name: 'Search index and API',
    sub: 'derived, rebuildable from the store',
    text: 'The search index and the API are derived from the canonical store and can be rebuilt from it; websites, apps and CRMs read from here.',
    signal: 'Index count against the store',
  },
];

// Geometry, in viewBox units.
const W = 360;
const BOX_X = 12;
const BOX_W = 250;
const BOX_H = 50;
const GAP = 22;
const TOP = 62;
const RAIL_X = 318;
const stageY = (i: number) => TOP + i * (BOX_H + GAP);
const H = stageY(STAGES.length) + 46;

export default function MlsPipelineDiagram() {
  const railTop = stageY(0) + BOX_H / 2;
  const railBottom = stageY(STAGES.length - 1) + BOX_H / 2;
  return (
    <figure className="cp-diagram">
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-labelledby="mls-pipe-title mls-pipe-desc" preserveAspectRatio="xMidYMin meet">
        <title id="mls-pipe-title">Reference architecture for an MLS data pipeline</title>
        <desc id="mls-pipe-desc">
          A top-to-bottom flow. MLS feeds enter a connector, then replication, a raw store, normalization and a media
          worker, a canonical store, duplicate linking, a display policy filter, and finally the search index and API
          that websites and apps read. Four stages carry a compliance checkpoint and seven send a signal to a
          monitoring rail on the right. Each stage is described in the list below the diagram.
        </desc>
        <defs>
          <marker id="mls-pipe-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M1 1 L8 5 L1 9" className="cp-dg-arrowhead" />
          </marker>
        </defs>

        {/* Source */}
        <rect x={BOX_X} y={8} width={BOX_W} height={34} rx={17} className="cp-dg-source" />
        <text x={BOX_X + BOX_W / 2} y={30} textAnchor="middle" className="cp-dg-name">MLS feeds (RESO Web API)</text>
        <line x1={BOX_X + BOX_W / 2} y1={42} x2={BOX_X + BOX_W / 2} y2={TOP - 4} className="cp-dg-flow" markerEnd="url(#mls-pipe-arrow)" />

        {/* Monitoring rail */}
        <line x1={RAIL_X} y1={railTop} x2={RAIL_X} y2={railBottom} className="cp-dg-rail" />
        <text x={RAIL_X + 22} y={(railTop + railBottom) / 2} textAnchor="middle" className="cp-dg-raillabel" transform={`rotate(90 ${RAIL_X + 22} ${(railTop + railBottom) / 2})`}>
          MONITORING AND ALERTS
        </text>

        {STAGES.map((s, i) => {
          const y = stageY(i);
          const mid = y + BOX_H / 2;
          return (
            <g key={s.n}>
              <rect x={BOX_X} y={y} width={BOX_W} height={BOX_H} rx={8} className="cp-dg-box" />
              <circle cx={BOX_X + 20} cy={mid} r={11} className="cp-dg-num" />
              <text x={BOX_X + 20} y={mid + 4} textAnchor="middle" className="cp-dg-numtext">{s.n}</text>
              <text x={BOX_X + 40} y={y + 21} className="cp-dg-name">{s.name}</text>
              <text x={BOX_X + 40} y={y + 38} className="cp-dg-sub">{s.sub}</text>
              {s.check && (
                <g>
                  <path d={`M${BOX_X + BOX_W - 18} ${y - 9} l9 9 l-9 9 l-9 -9 z`} className="cp-dg-check" />
                  <text x={BOX_X + BOX_W - 18} y={y + 3.5} textAnchor="middle" className="cp-dg-checktext">C</text>
                </g>
              )}
              {s.signal && (
                <g>
                  <line x1={BOX_X + BOX_W} y1={mid} x2={RAIL_X} y2={mid} className="cp-dg-tap" />
                  <circle cx={RAIL_X} cy={mid} r={4} className="cp-dg-dot" />
                </g>
              )}
              {i < STAGES.length - 1 && (
                <line x1={BOX_X + BOX_W / 2} y1={y + BOX_H} x2={BOX_X + BOX_W / 2} y2={y + BOX_H + GAP - 4} className="cp-dg-flow" markerEnd="url(#mls-pipe-arrow)" />
              )}
            </g>
          );
        })}

        {/* Legend */}
        <g transform={`translate(${BOX_X} ${H - 24})`}>
          <path d="M9 0 l9 9 l-9 9 l-9 -9 z" className="cp-dg-check" />
          <text x={9} y={12.5} textAnchor="middle" className="cp-dg-checktext">C</text>
          <text x={24} y={13} className="cp-dg-sub">compliance checkpoint</text>
          <circle cx={170} cy={9} r={4} className="cp-dg-dot" />
          <text x={180} y={13} className="cp-dg-sub">monitoring signal</text>
        </g>
      </svg>
      <figcaption>
        Reference architecture for an MLS data pipeline. Stages 4 and 5 both read from the raw store and run side by
        side; they are drawn in sequence to keep the diagram readable on a phone.
      </figcaption>
    </figure>
  );
}
