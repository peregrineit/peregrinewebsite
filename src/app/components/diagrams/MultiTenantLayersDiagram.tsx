// Layers of a multi-tenant real estate SaaS platform, for /blog/multi-tenant-real-estate-saas.
// Inline SVG, viewBox only; all styling is in attributes so no stylesheet is involved.
// maxWidth is reset inline because an older .cp-diagram rule caps SVGs at 520px.
// The guide repeats the same content as a list under the figure: keep the two in step.

const FONT = 'system-ui, sans-serif';
const BOX = '#162036';
const STROKE = '#2a3a59';
const TEXT = '#f1f5f9';
const MUTED = '#94a3b8';
const CYAN = '#22d3ee';
const BLUE = '#60a5fa';
const VIOLET = '#a78bfa';

const TENANTS = [
  { id: 'A', color: CYAN, how: 'subdomain' },
  { id: 'B', color: BLUE, how: 'custom domain' },
  { id: 'C', color: VIOLET, how: 'path prefix' },
];

export default function MultiTenantLayersDiagram() {
  return (
    <svg viewBox="0 0 900 660" role="img" aria-labelledby="mt-layers-title mt-layers-desc" fontFamily={FONT} style={{ maxWidth: 'none' }}>
      <title id="mt-layers-title">Isolated tenant layers over shared services in a multi-tenant real estate platform</title>
      <desc id="mt-layers-desc">
        Requests for three tenants arrive by subdomain, custom domain and path prefix. A shared edge terminates TLS
        and resolves each request to a tenant id. A shared, stateless application authenticates the user, checks
        membership in that tenant and sets the tenant context. Below it, each tenant has its own data partition for
        contacts, enquiries and saved searches, while one shared listing store is read through each tenant&apos;s
        MLS license filter. A per-tenant configuration store holds branding, domains, MLS licenses and plan limits
        and is read by the edge, the application and the license filter.
      </desc>
      <defs>
        <marker id="mt-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto">
          <path d="M1 1 L9 5 L1 9 z" fill={MUTED} />
        </marker>
      </defs>

      {/* Tenant requests */}
      {TENANTS.map((t, i) => {
        const x = 40 + i * 280;
        return (
          <g key={t.id}>
            <rect x={x} y={16} width={260} height={50} rx={25} fill="none" stroke={t.color} strokeWidth={1.5} />
            <text x={x + 130} y={38} textAnchor="middle" fill={TEXT} fontSize={15} fontWeight={700}>Tenant {t.id}</text>
            <text x={x + 130} y={56} textAnchor="middle" fill={MUTED} fontSize={13}>arrives by {t.how}</text>
            <line x1={x + 130} y1={66} x2={x + 130} y2={96} stroke={MUTED} strokeWidth={1.4} markerEnd="url(#mt-arrow)" />
          </g>
        );
      })}

      {/* Edge */}
      <rect x={40} y={100} width={820} height={64} rx={10} fill={BOX} stroke={STROKE} />
      <text x={60} y={127} fill={TEXT} fontSize={16} fontWeight={700}>Edge: TLS and tenant resolution</text>
      <text x={60} y={149} fill={MUTED} fontSize={13}>host name or path → tenant id · unknown host → not found · shared by all tenants</text>
      <line x1={450} y1={164} x2={450} y2={194} stroke={MUTED} strokeWidth={1.4} markerEnd="url(#mt-arrow)" />
      <text x={464} y={184} fill={CYAN} fontSize={13}>request + tenant id</text>

      {/* Application */}
      <rect x={40} y={198} width={820} height={64} rx={10} fill={BOX} stroke={STROKE} />
      <text x={60} y={225} fill={TEXT} fontSize={16} fontWeight={700}>Application (shared, stateless)</text>
      <text x={60} y={247} fill={MUTED} fontSize={13}>authenticate → check membership in this tenant → set tenant context for the transaction</text>
      <line x1={300} y1={262} x2={300} y2={296} stroke={MUTED} strokeWidth={1.4} markerEnd="url(#mt-arrow)" />
      <line x1={730} y1={262} x2={730} y2={296} stroke={MUTED} strokeWidth={1.4} markerEnd="url(#mt-arrow)" />

      {/* Per-tenant data partitions */}
      <rect x={40} y={300} width={540} height={196} rx={10} fill="none" stroke={STROKE} strokeDasharray="5 4" />
      <text x={60} y={326} fill={TEXT} fontSize={16} fontWeight={700}>Per-tenant data partitions</text>
      <text x={60} y={346} fill={MUTED} fontSize={13}>every row carries a tenant id; the database enforces it</text>
      {TENANTS.map((t, i) => {
        const x = 60 + i * 172;
        return (
          <g key={t.id}>
            <rect x={x} y={362} width={156} height={116} rx={8} fill={BOX} stroke={t.color} strokeWidth={1.5} />
            <text x={x + 14} y={386} fill={t.color} fontSize={14} fontWeight={700}>Tenant {t.id}</text>
            <text x={x + 14} y={410} fill={TEXT} fontSize={13}>contacts</text>
            <text x={x + 14} y={432} fill={TEXT} fontSize={13}>enquiries</text>
            <text x={x + 14} y={454} fill={TEXT} fontSize={13}>saved searches</text>
          </g>
        );
      })}

      {/* Shared listing store */}
      <rect x={620} y={300} width={240} height={196} rx={10} fill={BOX} stroke={STROKE} />
      <text x={640} y={326} fill={TEXT} fontSize={16} fontWeight={700}>Shared listing store</text>
      <text x={640} y={350} fill={MUTED} fontSize={13}>one copy per MLS source</text>
      <rect x={640} y={372} width={200} height={50} rx={8} fill="none" stroke={CYAN} strokeWidth={1.3} />
      <text x={740} y={393} textAnchor="middle" fill={CYAN} fontSize={13} fontWeight={700}>License filter</text>
      <text x={740} y={411} textAnchor="middle" fill={MUTED} fontSize={13}>tenant → licensed sources</text>
      <text x={640} y={450} fill={MUTED} fontSize={13}>a tenant reads only the</text>
      <text x={640} y={470} fill={MUTED} fontSize={13}>sources it holds a license for</text>

      {/* Per-tenant configuration */}
      <path d="M40 596 H20 V132 H36" fill="none" stroke={MUTED} strokeWidth={1.2} strokeDasharray="3 4" markerEnd="url(#mt-arrow)" />
      <path d="M20 230 H36" fill="none" stroke={MUTED} strokeWidth={1.2} strokeDasharray="3 4" markerEnd="url(#mt-arrow)" />
      <line x1={740} y1={548} x2={740} y2={502} stroke={MUTED} strokeWidth={1.2} strokeDasharray="3 4" markerEnd="url(#mt-arrow)" />
      <rect x={40} y={552} width={820} height={88} rx={10} fill={BOX} stroke={STROKE} />
      <text x={60} y={579} fill={TEXT} fontSize={16} fontWeight={700}>Per-tenant configuration</text>
      <text x={60} y={601} fill={MUTED} fontSize={13}>domains · theme and branding · MLS licenses · plan limits · feature flags</text>
      <text x={60} y={623} fill={MUTED} fontSize={13}>read by the edge (domains), the application (theme, limits) and the license filter (dashed arrows)</text>
    </svg>
  );
}
