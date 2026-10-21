import Link from 'next/link';
import GuideLayout, { GuideFaq, Src, guideMetadata } from '../../components/GuideLayout';
import MultiTenantLayersDiagram from '../../components/diagrams/MultiTenantLayersDiagram';

const SLUG = 'multi-tenant-real-estate-saas';
export const metadata = guideMetadata(SLUG);

// Sources fetched and checked 2026-10-12; the sentence relied on for each link is logged in
// docs/content/sources/multi-tenant-real-estate-saas.md. NAR's policy handbook needs a member
// login, so the per-participant licensing point is quoted from MLS Grid's public IDX Rules.
const PG_RLS = 'https://www.postgresql.org/docs/current/ddl-rowsecurity.html';
const PG_SET = 'https://www.postgresql.org/docs/current/sql-set.html';
const PG_FUNCS = 'https://www.postgresql.org/docs/current/functions-admin.html';
const PG_SCHEMAS = 'https://www.postgresql.org/docs/current/ddl-schemas.html';
const PG_PART = 'https://www.postgresql.org/docs/current/ddl-partitioning.html';
const PGBOUNCER = 'https://www.pgbouncer.org/features.html';
const MDB_MT = 'https://www.mongodb.com/docs/atlas/build-multi-tenant-arch/';
const LE_RATE = 'https://letsencrypt.org/docs/rate-limits/';
const LE_CHALLENGE = 'https://letsencrypt.org/docs/challenge-types/';
const GRID = 'https://docs.mlsgrid.com/';
const GRID_IDX = 'https://www.mlsgrid.com/s/MLS-Grid-IDX-Rules.pdf';

export default function Guide() {
  return (
    <GuideLayout slug={SLUG}>
      <h2>The problem: the second brokerage</h2>
      <p>
        A real estate product built for one brokerage usually has that brokerage baked in: one logo, one MLS
        feed, one list of agents, one leads table. The engineering problem starts when a second customer signs.
        Now every query, cache key, background job, uploaded file and email has to answer a question it never had
        to answer before: <em>whose is this?</em> Adding a <code>brokerage_id</code> column to a few tables is the
        easy part. The rest is deciding where the tenant boundary runs through the edge, the application, the
        data, the MLS licenses and the invoice, and enforcing it somewhere a forgotten <code>WHERE</code>{' '}
        clause cannot defeat it.
      </p>
      <p>
        This article is the architecture view. Whether to build a platform at all is covered in{' '}
        <Link href="/blog/custom-saas-vs-off-the-shelf-crm-for-brokerages">custom SaaS vs an off-the-shelf CRM</Link>,
        and the choice of database, search engine and cache in the{' '}
        <Link href="/blog/real-estate-platform-tech-stack">tech stack guide</Link>.
      </p>

      <h2>What a tenant is in real estate SaaS</h2>
      <p>
        &ldquo;Tenant&rdquo; is not one thing in this industry, and the model has to say which level owns what
        before any table is designed. A workable hierarchy has three levels:
      </p>
      <ul>
        <li>
          <strong>Brokerage (the account).</strong> The legal customer. It signs the contract, holds the MLS
          participation that listing data is licensed under, pays the invoice and, in most brokerages, owns the
          leads. This is the isolation boundary.
        </li>
        <li>
          <strong>Team or office.</strong> A grouping inside a brokerage, used for lead routing, reporting and
          sometimes its own branding. It is a scope <em>inside</em> the boundary, not a second boundary.
        </li>
        <li>
          <strong>Agent site.</strong> A website or subsite for one agent: its own domain, theme and lead-capture
          forms, but the brokerage&apos;s listing data and compliance rules.
        </li>
      </ul>
      <p>
        Our recommendation is one hard boundary (the brokerage) and a tree of scopes inside it, because most
        awkward requirements are about movement within that tree. An agent leaves a team: which leads go with
        them? An agent moves to another brokerage on the same platform: nothing should move without an explicit
        export. A platform sold directly to solo agents collapses the tree to one level, but it is worth keeping
        the brokerage row anyway, because the MLS license still belongs to a broker.
      </p>

      <h2>The layers, and which are shared</h2>
      <figure className="cp-diagram">
        <div className="cp-diagram-scroll"><MultiTenantLayersDiagram /></div>
        <figcaption>
          Illustrative layering: the edge and application are shared; operational data is partitioned per tenant;
          listing data is stored once and read through each tenant&apos;s license filter.
        </figcaption>
      </figure>
      <p>The same picture as a list:</p>
      <ol>
        <li><strong>Edge.</strong> Shared. Terminates TLS and turns a host name or path into a tenant id; an unknown host gets a not-found response, never a default tenant.</li>
        <li><strong>Application.</strong> Shared and stateless. Authenticates the user, checks that the user belongs to the resolved tenant, and sets the tenant context for the database transaction.</li>
        <li><strong>Per-tenant data partitions.</strong> Contacts, enquiries, saved searches and other operational records, each row carrying a tenant id that the database enforces.</li>
        <li><strong>Shared listing store.</strong> One copy of listing data per MLS source, read through a filter that maps each tenant to the sources it is licensed for.</li>
        <li><strong>Per-tenant configuration.</strong> Domains, theme, MLS licenses, plan limits and feature flags, read by the edge, the application and the license filter.</li>
      </ol>

      <h2>Three tenancy models</h2>
      <p>
        The data layer has three standard shapes. They differ in how isolation is enforced, what a schema change
        costs, and what happens when one tenant is very large or asks for its own environment.
      </p>
      <div className="cp-table-wrap cp-table-wide">
        <table>
          <thead>
            <tr><th>Question</th><th>Shared schema, tenant key</th><th>Schema per tenant</th><th>Database per tenant</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>What isolates tenants</strong></td>
              <td>A tenant id on every row, enforced by the application and, better, by row-level security</td>
              <td>Namespaces: PostgreSQL lists <Src href={PG_SCHEMAS}>allowing many users to use one database without interfering with each other</Src> as a reason to use schemas</td>
              <td>Separate databases and, if wanted, separate credentials and hosts</td>
            </tr>
            <tr>
              <td><strong>Schema migration</strong></td>
              <td>Once</td>
              <td>Once per tenant, so migrations need orchestration and a record of which tenant is on which version</td>
              <td>Once per tenant, plus per-database connection handling</td>
            </tr>
            <tr>
              <td><strong>Connections</strong></td>
              <td>One pool</td>
              <td>One pool; the search path or qualified names select the tenant</td>
              <td>A pool per database, or a router in front</td>
            </tr>
            <tr>
              <td><strong>Queries across tenants</strong> (platform reporting, support tools)</td>
              <td>Ordinary SQL under a privileged role</td>
              <td>A union across schemas</td>
              <td>An export to a separate reporting store</td>
            </tr>
            <tr>
              <td><strong>One tenant&apos;s backup, restore or move</strong></td>
              <td>Hardest: a filtered export and import</td>
              <td>Per-schema dump</td>
              <td>Simplest: the database is the unit</td>
            </tr>
            <tr>
              <td><strong>Large tenant count</strong></td>
              <td>Fits naturally</td>
              <td>Catalog size and migration time grow with every tenant</td>
              <td>Operational cost grows with every tenant</td>
            </tr>
            <tr>
              <td><strong>When we would pick it</strong></td>
              <td>The default for many similar tenants: agents, teams, small and mid-size brokerages</td>
              <td>Rarely as a first choice; a middle step for a modest, stable number of tenants</td>
              <td>A few large customers with contractual isolation, data-residency or custom-schema demands</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        MongoDB&apos;s own guidance lines up with this. It suggests{' '}
        <Src href={MDB_MT}>one database per tenant for a small and stable number of tenants (up to a few hundred) with varied data requirements and strict access control requirements</Src>,
        and shared collections with{' '}
        <Src href={MDB_MT}>a tenantId field in each document</Src> when the number of tenants keeps growing and
        their data looks alike. It also names the cost of the shared model plainly:{' '}
        <Src href={MDB_MT}>the multi-tenancy logic exists in the application layer, and every database query must filter by that field</Src>.
        The third option, a collection per tenant in one database, is one it{' '}
        <Src href={MDB_MT}>tells readers to avoid</Src>.
      </p>
      <p>
        The models combine. A sound default is a shared schema for everyone, with the tenant id designed so that
        a single large brokerage can later be moved to its own database without changing application code: the
        application always asks a router for &ldquo;the connection for tenant X&rdquo;, even while the router
        returns the same pool for all of them.
      </p>

      <h2>Enforcing isolation in the database</h2>
      <p>
        In the shared-schema model, the weakest design is one where every query author must remember the tenant
        filter. PostgreSQL can enforce it instead. With row-level security enabled on a table,{' '}
        <Src href={PG_RLS}>all normal access to the table for selecting rows or modifying rows must be allowed by a row security policy</Src>,
        and if no policy exists, <Src href={PG_RLS}>a default-deny policy is used, meaning that no rows are visible or can be modified</Src>.
        A missing policy fails closed, which is the property you want.
      </p>
      <p><strong>Illustrative schema</strong> (names and columns are examples, not a client system):</p>
      <pre className="cp-code"><code>{`-- Illustrative. The tenant boundary is the brokerage (account).
CREATE TABLE tenant (
  id          uuid PRIMARY KEY,
  name        text NOT NULL,
  status      text NOT NULL DEFAULT 'active',   -- active | suspended | deleting
  plan        text NOT NULL,
  created_at  timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE tenant_domain (
  host        text PRIMARY KEY,                 -- 'oak.example-platform.com' or 'www.oakrealty.com'
  tenant_id   uuid NOT NULL REFERENCES tenant(id),
  site_id     uuid,                             -- which agent or team site, if any
  verified_at timestamptz,                      -- ownership proven before it is served
  tls_status  text NOT NULL DEFAULT 'pending'
);

CREATE TABLE tenant_mls_license (
  tenant_id     uuid NOT NULL REFERENCES tenant(id),
  mls_source    text NOT NULL,                  -- originating system
  license_type  text NOT NULL,                  -- e.g. IDX, VOW, back office
  approved_at   timestamptz,
  PRIMARY KEY (tenant_id, mls_source, license_type)
);

CREATE TABLE contact (
  tenant_id   uuid NOT NULL REFERENCES tenant(id),
  id          uuid NOT NULL,
  team_id     uuid,                             -- scope inside the tenant
  owner_agent uuid,
  email       text,
  created_at  timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (tenant_id, id),                  -- tenant first: every key and index starts with it
  UNIQUE (tenant_id, email)                     -- uniqueness is per tenant, never global
);`}</code></pre>
      <p><strong>Illustrative policy:</strong></p>
      <pre className="cp-code"><code>{`-- Illustrative. One policy per tenant-owned table.
ALTER TABLE contact ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact FORCE ROW LEVEL SECURITY;    -- the owner is subject to it too

CREATE POLICY tenant_isolation ON contact
  USING      (tenant_id = current_setting('app.tenant_id')::uuid)
  WITH CHECK (tenant_id = current_setting('app.tenant_id')::uuid);

-- Per request, inside the transaction, with a parameter (never string-built SQL):
BEGIN;
SELECT set_config('app.tenant_id', $1, true);    -- true = local to this transaction
SELECT id, email FROM contact;                   -- returns this tenant's rows only
COMMIT;`}</code></pre>
      <p>Five details in that example come straight from the documentation, and each one is a way to get it wrong:</p>
      <ul>
        <li>
          <strong>Owners and superusers skip it.</strong>{' '}
          <Src href={PG_RLS}>Superusers and roles with the BYPASSRLS attribute always bypass the row security system</Src>,
          and table owners normally do too unless the table is set to{' '}
          <Src href={PG_RLS}>FORCE ROW LEVEL SECURITY</Src>. The application should connect as a role that owns
          nothing; migrations and support tooling use a different one.
        </li>
        <li>
          <strong>Writes need the check as well.</strong> A policy with only <code>USING</code>{' '}
          <Src href={PG_RLS}>implicitly provides a WITH CHECK clause identical to its USING clause</Src>; writing
          both out makes the intent visible, and stops a row being inserted into, or moved to, another tenant.
        </li>
        <li>
          <strong>The setting must be transaction-local.</strong> <code>set_config</code> with{' '}
          <Src href={PG_FUNCS}>is_local true applies only during the current transaction</Src>, as does{' '}
          <Src href={PG_SET}>SET LOCAL, whose effects last only till the end of the current transaction</Src>.
          This matters behind a pooler: PgBouncer&apos;s feature table marks session-level{' '}
          <Src href={PGBOUNCER}>SET/RESET as never compatible with transaction pooling</Src>, so a session-level
          tenant setting could be seen by the next customer&apos;s request on the same connection.
        </li>
        <li>
          <strong>An unset tenant is an error, not an empty filter.</strong> <code>current_setting</code>{' '}
          <Src href={PG_FUNCS}>throws an error if there is no such setting</Src>, unless its optional{' '}
          <code>missing_ok</code> argument is true, in which case it returns NULL. Leave that argument off: a
          request that reaches the table without a tenant context should fail loudly.
        </li>
        <li>
          <strong>Constraints can leak.</strong>{' '}
          <Src href={PG_RLS}>Referential integrity checks, such as unique or primary key constraints and foreign key references, always bypass row security</Src>.
          A globally unique email column would tell tenant A that an address exists in tenant B. Hence{' '}
          <code>UNIQUE (tenant_id, email)</code> above.
        </li>
      </ul>
      <p>
        If the tenant-owned tables grow large, the same tenant id is a natural partition key. PostgreSQL notes
        that <Src href={PG_PART}>dropping an individual partition is far faster than a bulk operation</Src> and
        avoids the vacuum overhead of a bulk delete, which is useful at offboarding; it also warns that{' '}
        <Src href={PG_PART}>too many partitions can mean longer query planning times and higher memory consumption</Src>,
        so a partition per tenant suits a bounded number of large tenants, not an open-ended count of agent sites.
      </p>
      <p>
        The database is only one store. The same tenant id has to prefix every cache key, sit in every search
        query as a filter the caller cannot remove, and form the first path segment of every object-storage key.
        A cache entry keyed by URL path alone is the classic leak: two agent sites share the path{' '}
        <code>/listings</code> and one receives the other&apos;s page.
      </p>

      <h2>Tenant resolution and custom-domain TLS</h2>
      <p>There are three ways a request names its tenant, and most platforms end up supporting two:</p>
      <ul>
        <li><strong>Subdomain</strong> (for example <code>oak.example-platform.com</code>). One wildcard DNS record and one wildcard certificate cover every tenant. Nothing to provision per signup.</li>
        <li><strong>Custom domain</strong> (for example <code>www.oakrealty.com</code>). What agents and brokerages actually want on a business card. It needs a domain table, proof of ownership, a certificate per domain and renewal.</li>
        <li><strong>Path prefix</strong> (for example <code>/t/oak/...</code>). Simple for an internal dashboard; a poor fit for public sites because cookies, robots rules and search-engine identity are shared across tenants.</li>
      </ul>
      <p>
        Resolve the tenant once, at the edge, from a lookup table, and pass the id inward as trusted context.
        Never take the tenant id from a query parameter, a request body or an unvalidated header: that turns
        tenant selection into something the caller controls.
      </p>
      <p>
        Custom-domain TLS is a system to plan, not a checkbox. If certificates come from Let&apos;s Encrypt, the
        published limits shape the design:{' '}
        <Src href={LE_RATE}>up to 300 new orders can be created by a single account every 3 hours</Src>, and{' '}
        <Src href={LE_RATE}>up to 50 certificates can be issued per registered domain every 7 days</Src>. The
        second limit bites when you issue a certificate per subdomain of your own platform domain instead of one
        wildcard, and wildcards have their own condition: the HTTP-01 challenge{' '}
        <Src href={LE_CHALLENGE}>cannot be used to issue wildcard certificates</Src>, while DNS-01{' '}
        <Src href={LE_CHALLENGE}>allows you to issue wildcard certificates</Src>. A workable plan is a DNS-01
        wildcard for platform subdomains and on-demand HTTP-01 certificates for customer domains, issued only for
        hosts already present and verified in the domain table, with a queue for issuance and an alert on
        renewals that fail.
      </p>

      <h2>Authentication and authorization boundaries</h2>
      <p>Two questions are easy to merge and must stay separate: <em>who is this user</em>, and <em>which tenant is this request for</em>.</p>
      <ul>
        <li><strong>Membership, not a column on the user.</strong> A person can belong to more than one tenant (an agent who changes brokerage, a transaction coordinator who serves two). Model a membership row per user and tenant, with the role on the membership.</li>
        <li><strong>Sessions are scoped to a tenant.</strong> A session issued on one tenant&apos;s domain is not valid on another&apos;s. Host-only cookies on custom domains give this for free; on shared subdomains, set the cookie for the exact host, not the parent domain.</li>
        <li><strong>Check order.</strong> Tenant from the host, user from the session, membership of that user in that tenant, then the role check. Fail at the first missing link with the same not-found response, so the reply does not reveal that a record exists in another tenant.</li>
        <li><strong>Platform staff are a separate path.</strong> Support access to a tenant goes through an explicit, time-limited, logged impersonation flow under its own role, not a flag that bypasses checks.</li>
      </ul>
      <p>
        Role design inside a tenant (record visibility, field-level restrictions, audit trails) is covered in
        the <Link href="/blog/investor-portal-security-checklist">investor portal security checklist</Link>.
      </p>

      <h2>Per-tenant configuration and white-label branding</h2>
      <p>
        White-label means the tenant&apos;s visitors never see the platform. The discipline is to keep that as
        data, not code: design tokens, navigation and page content, lead-form settings, email sender identity,
        feature flags and plan limits, stored per tenant and per site. A tenant that needs a custom template
        gets it through the same theme interface, not a fork of the application.
      </p>
      <p>Three engineering points follow:</p>
      <ul>
        <li><strong>Configuration is read on every request,</strong> so it is cached per tenant and invalidated by a version number on the tenant row, not by a timer.</li>
        <li><strong>Email identity is per tenant.</strong> Sending from a tenant&apos;s own domain depends on DNS records that tenant has to publish, so onboarding needs a verification step; until it passes, mail goes from a platform address that names the brokerage.</li>
        <li><strong>Tenant-supplied content is untrusted input.</strong> Custom scripts, HTML blocks and uploaded logos are served from the tenant&apos;s own origin and sanitized, so one site&apos;s embed cannot run against another site&apos;s session.</li>
      </ul>
      <p>
        Our{' '}
        <Link href="/case-studies/scaling-real-estate-saas-platform">real estate SaaS case study</Link> describes
        this problem from the failing side: a white-label agent website platform where all agents shared
        configuration, leads and property data in flat collections, so that one agent&apos;s misconfiguration
        could affect every other agent&apos;s website. The page reports that the MongoDB collections were
        restructured for multi-tenant separation and white-label agent themes deployed, and that the platform
        grew from 5 agents to more than 200.
      </p>

      <h2>The tenant boundary is also a data-license boundary</h2>
      <p>
        This is the part general SaaS guides leave out. Listing data is not the platform&apos;s to share out as
        it likes: each brokerage displays it under its own MLS participation. MLS Grid&apos;s public IDX Rules,
        used here as one published example, say that{' '}
        <Src href={GRID_IDX}>any IDX display must be under the actual and apparent control of a single Member Participant who has executed a MLS GRID Data License Agreement</Src>,
        and count as evidence of apparent control that{' '}
        <Src href={GRID_IDX}>the domain name and branding on the website distinguish the Member Participant from nonparticipating firms</Src>.
        Access itself is granted per subscription: MLS Grid issues an API token{' '}
        <Src href={GRID}>once a subscription has been created, a licensee added, and the MLS has approved</Src>.
      </p>
      <p>What that means for the architecture, as recommendations:</p>
      <ul>
        <li><strong>Record licenses as tenant data.</strong> The <code>tenant_mls_license</code> table above is what the listing filter reads. A tenant with no approved license for a source sees no listings from it, whatever the platform holds.</li>
        <li><strong>Store listings once, authorize per tenant.</strong> Whether one vendor feed may serve many brokerages&apos; sites, or each brokerage needs its own credentials and feed, is set by each MLS and platform. Ask that question in writing for every MLS before choosing between a shared listing store and per-tenant feeds.</li>
        <li><strong>Display rules are per source and per site.</strong> Attribution, brokerage identification and seller opt-outs apply to each tenant&apos;s display, so the display-policy filter in the <Link href="/blog/mls-data-pipeline-architecture">MLS data pipeline</Link> takes the tenant as an input.</li>
        <li><strong>Offboarding ends the license.</strong> When a brokerage leaves, or its MLS approval lapses, its sites stop showing that source the same day. Make this a status on the license row, checked on read.</li>
      </ul>
      <p>
        Rules differ between MLSs and change; the{' '}
        <Link href="/blog/how-to-get-mls-data-access">guide to MLS data access</Link> covers who may license what.
      </p>

      <h2>Noisy neighbors, limits and background work</h2>
      <p>
        In a shared system one tenant&apos;s activity is every tenant&apos;s latency. The typical causes in this
        domain are a bulk contact import, a large email campaign, an agent site being crawled hard, and a report
        that scans years of activity.
      </p>
      <ul>
        <li><strong>Rate limits keyed by tenant</strong> at the edge and the API, with separate budgets for public site traffic and authenticated API use, so a crawler on one site cannot exhaust that brokerage&apos;s CRM, or anyone else&apos;s.</li>
        <li><strong>Quotas from plan limits:</strong> sites, seats, contacts, storage, monthly sends. Enforced where the resource is created, and visible to the tenant before they hit them.</li>
        <li><strong>Database guardrails:</strong> statement timeouts on the application role, tenant-leading indexes so one tenant&apos;s query never scans another&apos;s rows, and heavy reports sent to a replica or an asynchronous export.</li>
        <li><strong>Fair background work.</strong> Every job carries the tenant id and re-establishes tenant context before touching data. A single first-in, first-out queue lets one tenant&apos;s 50,000-row import (an illustrative figure) delay everyone&apos;s lead notifications, so we would separate queues by urgency and cap concurrency per tenant within each. The mechanics are in <Link href="/blog/background-jobs-redis-bullmq">reliable background jobs with Redis and BullMQ</Link>.</li>
      </ul>

      <h2>Billing boundaries</h2>
      <p>
        Billing is a consumer of tenancy data, not its source: the platform decides what a tenant has and has
        used, and the billing system turns that into invoices. A feature check should never need to call the
        payment provider.
      </p>
      <ul>
        <li><strong>Usage is an append-only record</strong> per tenant, written by the system that did the work, with an idempotency key so a retried job is not counted twice.</li>
        <li><strong>Entitlements live in the platform.</strong> The tenant row holds the plan and limits; billing events update them through a webhook handler built as described in <Link href="/blog/webhook-event-driven-integrations">reliable webhook integrations</Link>.</li>
        <li><strong>Suspension is a tenant state,</strong> with defined behavior: public sites keep serving or not, logins read-only or blocked, data retained for how long. Decide it before the first failed payment.</li>
        <li><strong>The hierarchy shows up on the invoice.</strong> A brokerage paying for its agents, and an agent paying for their own site under a brokerage, are different billing parents for the same site row.</li>
      </ul>

      <h2>Tenant lifecycle: provisioning, export, deletion</h2>
      <p><strong>Provisioning</strong> should be one idempotent workflow that can be re-run after a failure at any step: create the tenant row, default configuration and first admin membership; reserve the subdomain; record requested MLS sources as pending; create the billing customer; then mark the tenant active. Custom domains and MLS approval finish later, on their own clocks, and the tenant can see their status.</p>
      <p><strong>Export</strong> is a feature, not a support ticket. A brokerage will ask for its contacts, enquiry history and site content when it leaves, and sometimes when one agent leaves. Because every row carries the tenant id, an export is a walk over the tenant-owned tables. Listing data is not part of it: that belongs to the MLS license, not the tenant.</p>
      <p><strong>Deletion</strong> has to reach every store the tenant id reached: primary database, search index, caches, object storage, queued jobs, analytics, and backups according to a stated retention period. We would run it as a staged job (suspend, export offered, soft-delete with a grace period, hard-delete, certificate and domain release) and keep a deletion record that holds no personal data. What must be retained, and for how long, is a question for the customer&apos;s counsel and your contract, not something to assume.</p>

      <h2>A pre-launch isolation checklist</h2>
      <ul className="cp-checklist">
        <li>Every tenant-owned table has a tenant id, a tenant-leading primary key and a row-level policy; a test fails the build if a new table lacks one.</li>
        <li>The application&apos;s database role owns no tables and has no bypass attribute.</li>
        <li>An automated test signs in as tenant A and requests tenant B&apos;s record ids through every API route; the expected result is not-found every time.</li>
        <li>Cache keys, search filters and storage paths include the tenant id; a test requests the same path on two tenant hosts and compares the responses.</li>
        <li>Background jobs fail if they are enqueued without a tenant id.</li>
        <li>An unknown host returns not-found; a custom domain is served only after verification.</li>
        <li>A tenant with no approved license for an MLS source gets zero listings from it.</li>
        <li>Export and deletion have been run end to end on a test tenant, including the search index and object storage.</li>
      </ul>

      <GuideFaq slug={SLUG} items={[
        { question: 'Which tenancy model should a real estate SaaS start with?', answer: ['For many similar tenants, a shared schema with a tenant id on every row, enforced by the database, is a sound default. MongoDB’s guidance points the same way: shared collections with ', ['a tenantId field in each document', MDB_MT], ' when tenant numbers keep growing, and ', ['one database per tenant for a small and stable number of tenants with strict access control requirements', MDB_MT], '. Design the connection layer so a large tenant can be moved to its own database later.'] },
        { question: 'Is row-level security enough to isolate tenants in PostgreSQL?', answer: ['It is a strong second line, not the only one. With it enabled and no policy, ', ['a default-deny policy is used', PG_RLS], ', but ', ['superusers and roles with the BYPASSRLS attribute always bypass the row security system', PG_RLS], ', and caches, search indexes and file storage sit outside the database. Keep the application filter, connect as a role that owns no tables, and test cross-tenant access through the API.'] },
        { question: 'Can several brokerages share one MLS feed on a multi-tenant platform?', answer: ['That is decided by each MLS, not by the platform. As one published example, MLS Grid’s IDX Rules require that ', ['any IDX display be under the actual and apparent control of a single Member Participant who has executed a data license agreement', GRID_IDX], '. Record each tenant’s approved licenses and filter listings by them, and ask each MLS in writing whether a shared vendor feed is permitted.'] },
      ]} />

      <p className="cp-note">
        Documentation and rules were read from the linked PostgreSQL, MongoDB, PgBouncer, Let&apos;s Encrypt and
        MLS Grid pages on October 12, 2026. MLS Grid&apos;s IDX Rules are quoted as one public example; every MLS
        sets its own terms, and your license agreement decides. Schemas, policies, host names and figures marked
        illustrative are examples, not measurements or descriptions of a client system.
      </p>
      <p>
        Designing a multi-tenant platform, or{' '}
        <Link href="/blog/legacy-real-estate-platform-data-migration">untangling a single-tenant one</Link>? See our{' '}
        <Link href="/services/saas-development">SaaS development service</Link>, and the companion article on{' '}
        <Link href="/blog/real-estate-crm-architecture">real estate CRM architecture</Link> for the lead data
        that lives inside each tenant. Every project starts with a 30-minute technical discovery call with an
        engineer.
      </p>
    </GuideLayout>
  );
}
