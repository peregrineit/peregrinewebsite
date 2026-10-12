// Annotated wireframe of a listing detail page: which element is the LCP candidate, which regions
// are deferred, and where each Core Web Vital is affected. Inline SVG, viewBox only, no CSS classes.

const FONT = 'system-ui, sans-serif';
const TEXT = '#f1f5f9';
const MUTED = '#94a3b8';
const CYAN = '#22d3ee';
const BLUE = '#60a5fa';
const VIOLET = '#a78bfa';
const BOX = '#162036';
const LINE = '#2a3a59';

type Tag = 'LCP' | 'CLS' | 'INP' | 'DEFER';
const TAG_COLOR: Record<Tag, string> = { LCP: CYAN, CLS: VIOLET, INP: BLUE, DEFER: MUTED };
const TAG_W: Record<Tag, number> = { LCP: 44, CLS: 44, INP: 44, DEFER: 86 };
const TAG_LABEL: Record<Tag, string> = { LCP: 'LCP', CLS: 'CLS', INP: 'INP', DEFER: 'DEFERRED' };

interface Note {
  /** y of the annotation block and of the leader line's end on the wireframe. */
  y: number;
  /** x on the wireframe where the leader line ends. */
  toX: number;
  toY: number;
  tags: Tag[];
  a: string;
  b: string;
}

const NOTES: Note[] = [
  { y: 96, toX: 500, toY: 150, tags: ['LCP', 'CLS'], a: 'Hero photo: an img in the HTML, loaded', b: 'eagerly at high priority, with dimensions' },
  { y: 212, toX: 500, toY: 290, tags: ['DEFER'], a: 'Other photos: lazy, fetched as', b: 'the visitor reaches them' },
  { y: 312, toX: 500, toY: 366, tags: ['INP'], a: 'Save, contact, gallery arrows: small', b: 'handlers, little script to hydrate' },
  { y: 412, toX: 500, toY: 476, tags: ['DEFER', 'CLS'], a: 'Map: script loads when visible or', b: 'on tap; the box is reserved' },
  { y: 512, toX: 500, toY: 590, tags: ['DEFER'], a: 'Similar homes: streamed after the', b: 'main content, images lazy' },
  { y: 612, toX: 494, toY: 652, tags: ['DEFER', 'INP'], a: 'Chat and tag scripts: after the page', b: 'is interactive, or when idle' },
];

function Chips({ x, y, tags }: { x: number; y: number; tags: Tag[] }) {
  // Left edge of each chip: the widths of the chips before it, plus an 8-unit gap each.
  const lefts = tags.map((_, i) => x + tags.slice(0, i).reduce((sum, t) => sum + TAG_W[t] + 8, 0));
  return (
    <g>
      {tags.map((t, i) => (
        <g key={t}>
          <rect x={lefts[i]} y={y} width={TAG_W[t]} height="22" rx="11" fill="none" stroke={TAG_COLOR[t]} strokeWidth="1.5" strokeDasharray={t === 'DEFER' ? '4 3' : undefined} />
          <text x={lefts[i] + TAG_W[t] / 2} y={y + 16} textAnchor="middle" fill={TAG_COLOR[t]} fontSize="13" fontWeight="700">{TAG_LABEL[t]}</text>
        </g>
      ))}
    </g>
  );
}

export default function ListingPageVitalsDiagram() {
  return (
    <svg viewBox="0 0 900 700" role="img" aria-labelledby="lpv-title lpv-desc" fontFamily={FONT} style={{ maxWidth: 'none' }}>
      <title id="lpv-title">Listing detail page wireframe annotated with Core Web Vitals</title>
      <desc id="lpv-desc">
        A wireframe of a listing detail page with six annotations. The hero photo at the top is the Largest
        Contentful Paint candidate and has reserved dimensions. The other gallery photos are deferred. The price
        and facts block with its Save and Contact buttons is where Interaction to Next Paint is affected. The map
        is deferred until visible or tapped, in a reserved box. The similar homes row is streamed after the main
        content. The chat widget and tag scripts load after the page is interactive.
      </desc>

      <text x="20" y="28" fill={MUTED} fontSize="13" fontWeight="700" letterSpacing="1.5">LISTING DETAIL PAGE</text>
      <text x="560" y="28" fill={MUTED} fontSize="13" fontWeight="700" letterSpacing="1.5">WHAT TO DO, AND WHICH METRIC</text>

      {/* Page frame */}
      <rect x="20" y="44" width="500" height="640" rx="12" fill="#0f1a30" stroke={LINE} strokeWidth="1.5" />

      {/* Header */}
      <rect x="36" y="58" width="468" height="30" rx="6" fill={BOX} stroke={LINE} strokeWidth="1" />
      <rect x="46" y="68" width="70" height="10" rx="5" fill="#3b4d70" />
      <rect x="380" y="68" width="40" height="10" rx="5" fill="#2a3a59" />
      <rect x="430" y="68" width="40" height="10" rx="5" fill="#2a3a59" />

      {/* Hero photo: LCP candidate */}
      <rect x="36" y="98" width="468" height="150" rx="8" fill="#1a2c4f" stroke={CYAN} strokeWidth="2.5" />
      <path d="M36 228 L150 150 L230 200 L310 130 L504 236 L504 240 Q504 248 496 248 L44 248 Q36 248 36 240 Z" fill="#22386a" />
      <circle cx="430" cy="130" r="14" fill="#2c4780" />
      <text x="52" y="124" fill={CYAN} fontSize="14" fontWeight="700">LCP candidate</text>
      <text x="52" y="142" fill={TEXT} fontSize="13">first photo of the listing</text>

      {/* Thumbnails: deferred */}
      {[36, 131, 226, 321, 416].map((x, i) => (
        <rect key={x} x={x} y="258" width={i === 4 ? 88 : 87} height="60" rx="6" fill={BOX} stroke={MUTED} strokeWidth="1.2" strokeDasharray="4 3" />
      ))}
      <rect x="152" y="277" width="236" height="24" rx="12" fill="#0f1a30" />
      <text x="270" y="293" textAnchor="middle" fill={MUTED} fontSize="13">photos 2 to 40: not requested yet</text>

      {/* Price, facts and actions */}
      <rect x="36" y="330" width="468" height="78" rx="8" fill={BOX} stroke={LINE} strokeWidth="1" />
      <rect x="50" y="344" width="120" height="14" rx="6" fill="#52658c" />
      <rect x="50" y="368" width="220" height="9" rx="4" fill="#3b4d70" />
      <rect x="50" y="386" width="170" height="9" rx="4" fill="#2a3a59" />
      <rect x="330" y="342" width="76" height="26" rx="13" fill="none" stroke={BLUE} strokeWidth="1.5" />
      <text x="368" y="360" textAnchor="middle" fill={BLUE} fontSize="13">Save</text>
      <rect x="414" y="342" width="80" height="26" rx="13" fill="none" stroke={BLUE} strokeWidth="1.5" />
      <text x="454" y="360" textAnchor="middle" fill={BLUE} fontSize="13">Contact</text>
      <text x="412" y="394" textAnchor="middle" fill={MUTED} fontSize="13">price and facts: server HTML</text>

      {/* Fold marker */}
      <line x1="20" y1="420" x2="520" y2="420" stroke={MUTED} strokeWidth="1" strokeDasharray="2 5" />
      <text x="508" y="436" textAnchor="end" fill={MUTED} fontSize="13">below the first screen (illustrative)</text>

      {/* Map: deferred, reserved box */}
      <rect x="36" y="446" width="468" height="96" rx="8" fill={BOX} stroke={MUTED} strokeWidth="1.2" strokeDasharray="4 3" />
      <text x="270" y="490" textAnchor="middle" fill={TEXT} fontSize="14" fontWeight="700">Map</text>
      <text x="270" y="510" textAnchor="middle" fill={MUTED} fontSize="13">placeholder at final size until needed</text>

      {/* Similar homes: deferred */}
      {[36, 196, 356].map((x) => (
        <rect key={x} x={x} y="556" width="148" height="68" rx="8" fill={BOX} stroke={MUTED} strokeWidth="1.2" strokeDasharray="4 3" />
      ))}
      <text x="270" y="595" textAnchor="middle" fill={MUTED} fontSize="13">similar homes</text>

      {/* Chat widget */}
      <circle cx="476" cy="652" r="18" fill={BOX} stroke={MUTED} strokeWidth="1.2" strokeDasharray="4 3" />
      <text x="476" y="657" textAnchor="middle" fill={MUTED} fontSize="13">chat</text>

      {/* Annotations with leader lines */}
      {NOTES.map((n) => (
        <g key={n.y}>
          <path d={`M${n.toX} ${n.toY} L540 ${n.toY} L540 ${n.y + 11} L556 ${n.y + 11}`} fill="none" stroke={TAG_COLOR[n.tags[0]]} strokeWidth="1.2" strokeDasharray={n.tags[0] === 'DEFER' ? '3 4' : undefined} />
          <circle cx={n.toX} cy={n.toY} r="3.5" fill={TAG_COLOR[n.tags[0]]} />
          <Chips x={560} y={n.y} tags={n.tags} />
          <text x="560" y={n.y + 44} fill={TEXT} fontSize="13">{n.a}</text>
          <text x="560" y={n.y + 62} fill={TEXT} fontSize="13">{n.b}</text>
        </g>
      ))}
    </svg>
  );
}
