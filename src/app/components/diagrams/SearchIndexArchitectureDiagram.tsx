// Search architecture for a listing platform, drawn as inline SVG (viewBox only, no CSS classes).
// The database is the system of record; an indexer writes to versioned indices; the application
// reads through one alias. The guide repeats the same flow as a list under the figure.

const BOX = { fill: '#162036', stroke: '#2a3a59', strokeWidth: 1.5 };
const FONT = 'system-ui, sans-serif';
const TEXT = '#f1f5f9';
const MUTED = '#94a3b8';
const CYAN = '#22d3ee';
const BLUE = '#60a5fa';
const VIOLET = '#a78bfa';

export default function SearchIndexArchitectureDiagram() {
  return (
    <svg viewBox="0 0 900 520" role="img" aria-labelledby="sia-title sia-desc" fontFamily={FONT} style={{ maxWidth: 'none' }}>
      <title id="sia-title">Search architecture: database, indexer, versioned indices and an alias</title>
      <desc id="sia-desc">
        The primary database sends changed listings to an indexer. The indexer writes bulk upserts and deletes to
        the live index, listings_v7, and a full load plus the same changes to a new index, listings_v8, while it is
        being built. The website calls a search API, and the search API queries only the alias named listings. The
        alias points to listings_v7 now and is moved to listings_v8 in one atomic step after the new index is
        verified.
      </desc>
      <defs>
        <marker id="sia-arrow-blue" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto">
          <path d="M0 0 L10 5 L0 10 z" fill={BLUE} />
        </marker>
        <marker id="sia-arrow-cyan" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto">
          <path d="M0 0 L10 5 L0 10 z" fill={CYAN} />
        </marker>
        <marker id="sia-arrow-violet" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto">
          <path d="M0 0 L10 5 L0 10 z" fill={VIOLET} />
        </marker>
      </defs>

      {/* Lane labels */}
      <text x="20" y="28" fill={MUTED} fontSize="14" fontWeight="700" letterSpacing="1.5">WRITE PATH</text>
      <text x="20" y="338" fill={MUTED} fontSize="14" fontWeight="700" letterSpacing="1.5">READ PATH</text>
      <line x1="20" y1="308" x2="590" y2="308" stroke="#2a3a59" strokeWidth="1" strokeDasharray="4 6" />

      {/* Primary database */}
      <rect x="20" y="110" width="180" height="96" rx="10" {...BOX} />
      <text x="110" y="146" textAnchor="middle" fill={TEXT} fontSize="17" fontWeight="700">Primary database</text>
      <text x="110" y="168" textAnchor="middle" fill={MUTED} fontSize="14">system of record</text>
      <text x="110" y="187" textAnchor="middle" fill={MUTED} fontSize="14">displayable listings</text>

      {/* Indexer */}
      <rect x="310" y="110" width="200" height="96" rx="10" {...BOX} />
      <text x="410" y="146" textAnchor="middle" fill={TEXT} fontSize="17" fontWeight="700">Indexer</text>
      <text x="410" y="168" textAnchor="middle" fill={MUTED} fontSize="14">one document per listing</text>
      <text x="410" y="187" textAnchor="middle" fill={MUTED} fontSize="14">sends bulk requests</text>

      <line x1="200" y1="158" x2="306" y2="158" stroke={BLUE} strokeWidth="2" markerEnd="url(#sia-arrow-blue)" />
      <text x="253" y="148" textAnchor="middle" fill={BLUE} fontSize="14">changed rows</text>

      {/* Versioned indices */}
      <rect x="640" y="44" width="240" height="88" rx="10" fill="#162036" stroke={VIOLET} strokeWidth="1.5" strokeDasharray="6 4" />
      <text x="760" y="78" textAnchor="middle" fill={TEXT} fontSize="17" fontWeight="700">listings_v8</text>
      <text x="760" y="100" textAnchor="middle" fill={MUTED} fontSize="14">new mapping, being built</text>
      <text x="760" y="119" textAnchor="middle" fill={MUTED} fontSize="14">not searched yet</text>

      <rect x="640" y="184" width="240" height="88" rx="10" fill="#162036" stroke={CYAN} strokeWidth="1.5" />
      <text x="760" y="218" textAnchor="middle" fill={TEXT} fontSize="17" fontWeight="700">listings_v7</text>
      <text x="760" y="240" textAnchor="middle" fill={MUTED} fontSize="14">live index</text>
      <text x="760" y="259" textAnchor="middle" fill={MUTED} fontSize="14">serves every search</text>

      {/* Indexer -> v8 (full load + changes) */}
      <path d="M510 136 L636 92" fill="none" stroke={VIOLET} strokeWidth="2" strokeDasharray="6 4" markerEnd="url(#sia-arrow-violet)" />
      <text x="500" y="62" textAnchor="middle" fill={VIOLET} fontSize="14">full load, then</text>
      <text x="500" y="80" textAnchor="middle" fill={VIOLET} fontSize="14">the same changes</text>

      {/* Indexer -> v7 (bulk upserts and deletes) */}
      <path d="M510 180 L636 222" fill="none" stroke={BLUE} strokeWidth="2" markerEnd="url(#sia-arrow-blue)" />
      <text x="548" y="244" textAnchor="middle" fill={BLUE} fontSize="14">bulk upserts</text>
      <text x="548" y="262" textAnchor="middle" fill={BLUE} fontSize="14">and deletes</text>

      {/* Read path */}
      <rect x="20" y="380" width="180" height="96" rx="10" {...BOX} />
      <text x="110" y="416" textAnchor="middle" fill={TEXT} fontSize="17" fontWeight="700">Website and apps</text>
      <text x="110" y="438" textAnchor="middle" fill={MUTED} fontSize="14">search box, filters,</text>
      <text x="110" y="457" textAnchor="middle" fill={MUTED} fontSize="14">map, suggestions</text>

      <rect x="310" y="380" width="200" height="96" rx="10" {...BOX} />
      <text x="410" y="416" textAnchor="middle" fill={TEXT} fontSize="17" fontWeight="700">Search API</text>
      <text x="410" y="438" textAnchor="middle" fill={MUTED} fontSize="14">builds the query, adds</text>
      <text x="410" y="457" textAnchor="middle" fill={MUTED} fontSize="14">display filters</text>

      <line x1="200" y1="428" x2="306" y2="428" stroke={CYAN} strokeWidth="2" markerEnd="url(#sia-arrow-cyan)" />
      <text x="253" y="418" textAnchor="middle" fill={CYAN} fontSize="14">request</text>

      <rect x="640" y="380" width="240" height="96" rx="48" fill="#162036" stroke={CYAN} strokeWidth="2" />
      <text x="760" y="416" textAnchor="middle" fill={CYAN} fontSize="14" fontWeight="700" letterSpacing="1.5">ALIAS</text>
      <text x="760" y="440" textAnchor="middle" fill={TEXT} fontSize="17" fontWeight="700">listings</text>
      <text x="760" y="459" textAnchor="middle" fill={MUTED} fontSize="14">the only name the API knows</text>

      <line x1="510" y1="428" x2="636" y2="428" stroke={CYAN} strokeWidth="2" markerEnd="url(#sia-arrow-cyan)" />
      <text x="575" y="416" textAnchor="middle" fill={CYAN} fontSize="14">queries</text>

      {/* Alias -> v7 (now) */}
      <line x1="720" y1="380" x2="720" y2="276" stroke={CYAN} strokeWidth="2" markerEnd="url(#sia-arrow-cyan)" />
      <text x="708" y="322" textAnchor="end" fill={CYAN} fontSize="14">points to now</text>
      <text x="708" y="340" textAnchor="end" fill={MUTED} fontSize="14">kept for rollback</text>

      {/* Alias -> v8 (after the swap) */}
      <path d="M800 380 L800 300 Q800 290 810 290 L880 290 Q892 290 892 278 L892 100 Q892 88 884 88" fill="none" stroke={VIOLET} strokeWidth="2" strokeDasharray="6 4" markerEnd="url(#sia-arrow-violet)" />
      <text x="812" y="322" fill={VIOLET} fontSize="14">atomic</text>
      <text x="812" y="340" fill={VIOLET} fontSize="14">swap</text>
    </svg>
  );
}
