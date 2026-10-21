import type { Metadata } from 'next';
import Link from 'next/link';
import CaseStudySchema from '../../components/CaseStudySchema';
import RelatedCaseStudies from '../../components/RelatedCaseStudies';
import CaseStudyByline from '../../components/CaseStudyByline';
import CaseStudyGlance from '../../components/CaseStudyGlance';
import CaseStudyCta from '../../components/CaseStudyCta';
import { NO_OUTCOMES, caseStudyUrl, getCaseStudy } from '@/data/case-studies';
import '../../css/case-study-detail.css';

/**
 * Engineering case study of RealFoyer, Peregrine's own product (not a client project).
 *
 * Sources, and nothing else:
 * - realfoyer.com pages, each quote re-fetched and matched with curl on 2026-10-21;
 * - two owner confirmations of 2026-10-21: one shared database with a tenant key per
 *   site, the tenant resolved from the request hostname; board integrations for TRREB
 *   (via PropTx) and MLS PIN, a feed activated per agent after that agent's board approves it;
 * - Peregrine's published guides, linked where the engineering topic is explained.
 * No stack names, hosting, dates, team size or outcomes: none is approved for publication.
 * TODO(owner): stack, MLS internals, operations and outcomes are open questions in
 * peregrine-it.com-audit/2026-10-21/REALFOYER-FACT-SHEET.md. Passages dropped from the
 * draft are listed in peregrine-it.com-audit/2026-10-22/notes-A1.md.
 */

const SLUG = 'realfoyer';
const study = getCaseStudy(SLUG);
const url = caseStudyUrl(SLUG);
const title = 'Engineering RealFoyer, a Real Estate SaaS';

const RF = {
  home: 'https://realfoyer.com/',
  about: 'https://realfoyer.com/about',
  idxWebsites: 'https://realfoyer.com/products/idx-websites',
  mls: 'https://realfoyer.com/products/mls-idx-integration',
  trreb: 'https://realfoyer.com/mls-boards/trreb',
  mlsPin: 'https://realfoyer.com/mls-boards/mls-pin',
  helpMls: 'https://realfoyer.com/help-center/idx-mls',
  features: 'https://realfoyer.com/features',
  crm: 'https://realfoyer.com/products/crm',
  leadAutomation: 'https://realfoyer.com/products/lead-automation',
  integrations: 'https://realfoyer.com/help-center/integrations',
  cms: 'https://realfoyer.com/products/cms-builder',
};

export const metadata: Metadata = {
  title,
  description: study.description,
  authors: [{ name: 'Peregrine IT Solutions', url: 'https://peregrine-it.com' }],
  openGraph: {
    title: `${title} | Peregrine IT Solutions`,
    description: study.description,
    type: 'article',
    url,
    siteName: 'Peregrine IT Solutions',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description: study.description,
  },
  alternates: { canonical: url },
};

const inline = { display: 'inline', color: 'var(--csd-accent)', fontWeight: 600, textDecoration: 'underline', textUnderlineOffset: 2 } as const;

/** Link to a realfoyer.com page that a quote or statement comes from. */
function Src({ href, children }: { href: string; children: React.ReactNode }) {
  return <a href={href} target="_blank" rel="noopener" style={inline}>{children}</a>;
}

/** Link to a page on this site. */
function In({ href, children }: { href: string; children: React.ReactNode }) {
  return <Link href={href} style={inline}>{children}</Link>;
}

const listStyle = { color: '#444', fontSize: 15.5, lineHeight: 1.75, paddingLeft: 22, margin: '0 0 16px', listStyleType: 'disc' } as const;

export default function RealFoyerCaseStudy() {
  return (
    <main className="case-study-detail">
      <CaseStudySchema slug={SLUG} />
      {/* ═══ HERO ═══ */}
      <section className="csd-hero">
        <div className="csd-back-nav" style={{ maxWidth: 960, margin: '0 auto', paddingBottom: 24 }}>
          <Link href="/case-studies" className="csd-back-link">
            <i className="ri-arrow-left-s-line" style={{ fontSize: 18 }} />
            Back to Case Studies
          </Link>
        </div>

        <div className="csd-hero-inner">
          <div className="csd-hero-badge">
            <span className="csd-badge-dot" />
            Case Study &middot; Own Product
          </div>

          <h1>
            Engineering RealFoyer: Building a <em>Multi-Tenant Real Estate SaaS</em> Platform
          </h1>

          <p className="csd-hero-sub">
            RealFoyer is Peregrine&apos;s own product, not a client project. This is how we engineered it: many
            branded agent sites on one shared database, MLS feeds activated board by board, a search index, a lead
            CRM and a site CMS.
          </p>

          <div className="csd-hero-meta">
            <div className="csd-hero-meta-item">
              <div className="csd-hero-meta-label">Product</div>
              <div className="csd-hero-meta-value">RealFoyer</div>
            </div>
            <div className="csd-hero-meta-item">
              <div className="csd-hero-meta-label">Owner</div>
              <div className="csd-hero-meta-value">Peregrine IT Solutions LLP</div>
            </div>
            <div className="csd-hero-meta-item">
              <div className="csd-hero-meta-label">Markets</div>
              <div className="csd-hero-meta-value">United States &amp; Canada</div>
            </div>
            <div className="csd-hero-meta-item">
              <div className="csd-hero-meta-label">Outcomes</div>
              <div className="csd-hero-meta-value">{NO_OUTCOMES}</div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Hero Image ═══ */}
      <div className="csd-hero-image-wrapper">
        <div className="csd-hero-image">
          <div className="csd-hero-image-placeholder">
            <div className="csd-icon-grid">
              <div className="csd-placeholder-node"><i className="ri-global-line" style={{ fontSize: 28, color: '#3b7dff' }} /></div>
              <div className="csd-placeholder-node"><i className="ri-building-line" style={{ fontSize: 28, color: '#3b7dff' }} /></div>
              <div className="csd-placeholder-node"><i className="ri-database-2-line" style={{ fontSize: 28, color: '#3b7dff' }} /></div>
              <div className="csd-placeholder-node"><i className="ri-flow-chart" style={{ fontSize: 28, color: '#3b7dff' }} /></div>
              <div className="csd-placeholder-node"><i className="ri-search-line" style={{ fontSize: 28, color: '#3b7dff' }} /></div>
              <div className="csd-placeholder-node"><i className="ri-user-follow-line" style={{ fontSize: 28, color: '#3b7dff' }} /></div>
            </div>
            <p>Agent sites &middot; MLS feeds &middot; Search &middot; CRM</p>
          </div>
        </div>
      </div>

      {/* ═══ CONTENT ═══ */}
      <div className="csd-content">
        <div className="csd-section">
          <p>
            <strong>Our own product, not a client project.</strong> RealFoyer is owned and operated by Peregrine IT
            Solutions LLP, as the footer of <Src href={RF.home}>realfoyer.com</Src> states. This page contains no
            client data and no customer metrics. For what the product does today, see our{' '}
            <In href="/products/realfoyer">RealFoyer product page</In>; for plans and MLS coverage, see{' '}
            <Src href={RF.home}>realfoyer.com</Src>. The agent-website platform in our{' '}
            <In href="/case-studies/scaling-real-estate-saas-platform">real estate SaaS scaling case study</In> is a
            different client&apos;s product, and nothing on this page comes from it.
          </p>
        </div>

        <CaseStudyGlance slug={SLUG} />

        {/* OVERVIEW */}
        <div className="csd-section">
          <div className="csd-section-label">Overview</div>
          <h2>The Product Problem</h2>
          <p>
            RealFoyer is for real estate agents, teams and brokerages in the United States and Canada. Its premise is
            stated on its <Src href={RF.about}>about page</Src>: &ldquo;Agents shouldn&apos;t need five different
            platforms just to run one digital real estate business.&rdquo; When the website, the IDX search, the CRM
            and the marketing tools are separate subscriptions, each holds its own copy of the lead and none knows
            what the others saw.
          </p>
          <p>
            The engineering goal followed from that: one data model shared by the agent&apos;s website, the listing
            search and the CRM, so that an enquiry arrives, in the words of the{' '}
            <Src href={RF.idxWebsites}>IDX websites page</Src>, &ldquo;with the property and the search that
            produced it attached.&rdquo; Everything below is a consequence of serving that model to many agents, in
            more than one market, from one platform.
          </p>
        </div>

        {/* CONSTRAINTS */}
        <div className="csd-section">
          <div className="csd-section-label">The Constraints</div>
          <h2>What Shaped the Design</h2>
          <p>
            Four constraints came before any technology choice. None of them is specific to RealFoyer; any platform
            that serves agent websites from MLS data runs into them.
          </p>
          <div className="csd-cs-grid">
            <div className="csd-cs-card csd-challenge">
              <div className="csd-cs-card-icon"><i className="ri-team-line" /></div>
              <h3>Many Branded Sites, One Platform</h3>
              <p>Each agent or brokerage gets its own site, domain, theme, pages and leads, while the code and the listing pipeline stay shared rather than copied per customer.</p>
            </div>
            <div className="csd-cs-card csd-challenge">
              <div className="csd-cs-card-icon"><i className="ri-lock-line" /></div>
              <h3>MLS Access Belongs to the Board</h3>
              <p>
                <Src href={RF.mls}>&ldquo;RealFoyer cannot grant you MLS access.&rdquo;</Src> A board decides what
                an agent may display, so the platform has to switch data on per agent, not per market.
              </p>
            </div>
            <div className="csd-cs-card csd-challenge">
              <div className="csd-cs-card-icon"><i className="ri-time-line" /></div>
              <h3>Freshness Is Set by the Feed</h3>
              <p>
                Each board publishes on its own schedule, and <Src href={RF.trreb}>&ldquo;a site can be no fresher
                than the data reaching it.&rdquo;</Src>
              </p>
            </div>
            <div className="csd-cs-card csd-challenge">
              <div className="csd-cs-card-icon"><i className="ri-file-list-3-line" /></div>
              <h3>Display Rules Differ by Market</h3>
              <p>
                Attribution, disclaimers and sold data vary by board. RealFoyer{' '}
                <Src href={RF.helpMls}>&ldquo;shows only the capabilities that board actually permits&rdquo;</Src>,
                so two sites can legitimately differ.
              </p>
            </div>
          </div>
        </div>

        {/* ARCHITECTURE */}
        <div className="csd-section">
          <div className="csd-section-label">Architecture</div>
          <h2>How the Platform Is Put Together</h2>
          <p>
            The layers below are described by role, not by product name: we do not publish RealFoyer&apos;s stack or
            hosting. Each layer links to the guide in which we explain that part of the engineering in general terms.
          </p>
          <div className="csd-arch-block">
            <h3>System Overview</h3>
            <div className="csd-arch-layers">
              <div className="csd-arch-layer">
                <div className="csd-arch-layer-icon"><i className="ri-global-line" /></div>
                <div className="csd-arch-layer-content">
                  <div className="csd-arch-layer-name">Agent and Brokerage Sites</div>
                  <div className="csd-arch-layer-desc">Each site on its own domain or a RealFoyer subdomain, with its own theme, pages, menus and SEO settings.</div>
                </div>
              </div>
              <div className="csd-arch-arrow">↓</div>
              <div className="csd-arch-layer">
                <div className="csd-arch-layer-icon"><i className="ri-links-line" /></div>
                <div className="csd-arch-layer-content">
                  <div className="csd-arch-layer-name">Tenant Resolution by Hostname</div>
                  <div className="csd-arch-layer-desc">The hostname of each request identifies the site, and with it the tenant key used for everything that request reads or writes.</div>
                </div>
              </div>
              <div className="csd-arch-arrow">↓</div>
              <div className="csd-arch-layer">
                <div className="csd-arch-layer-icon"><i className="ri-database-2-line" /></div>
                <div className="csd-arch-layer-content">
                  <div className="csd-arch-layer-name">One Shared Database, a Tenant Key per Site</div>
                  <div className="csd-arch-layer-desc">Sites, pages, leads and CRM records live in one database, separated by tenant key rather than by a database or schema per customer.</div>
                </div>
              </div>
              <div className="csd-arch-arrow">↓</div>
              <div className="csd-arch-layer">
                <div className="csd-arch-layer-icon"><i className="ri-flow-chart" /></div>
                <div className="csd-arch-layer-content">
                  <div className="csd-arch-layer-name">MLS Ingestion per Board</div>
                  <div className="csd-arch-layer-desc">&ldquo;Feed → normalisation → database and search index → search, property pages and map results&rdquo;, as RealFoyer describes the path, on a schedule per feed.</div>
                </div>
              </div>
              <div className="csd-arch-arrow">↓</div>
              <div className="csd-arch-layer">
                <div className="csd-arch-layer-icon"><i className="ri-search-line" /></div>
                <div className="csd-arch-layer-content">
                  <div className="csd-arch-layer-name">Search Index and CRM</div>
                  <div className="csd-arch-layer-desc">Search, map results and listing pages read from the index; visitor activity and enquiries land on the lead record in the CRM.</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* TENANCY */}
        <div className="csd-section">
          <div className="csd-section-label">Decision 1</div>
          <h2>Tenancy: One Database, a Key per Site, Resolved by Hostname</h2>
          <p>
            Every RealFoyer site is a tenant in one shared database. Each site has a tenant key, and the platform
            works out which tenant a request belongs to from the hostname it arrives on, whether that is the
            agent&apos;s own domain or a RealFoyer subdomain. Custom domains are, as the{' '}
            <Src href={RF.cms}>CMS page</Src> puts it, &ldquo;validated and issued an SSL certificate by the
            platform&rdquo;.
          </p>
          <p>
            A shared database fits a product whose tenants are many sites running the same code: there is one schema
            to migrate and no per-customer database to provision. The trade-off is that isolation is not given by
            separate databases; the tenant key has to be applied to everything that reads or writes tenant data.
            Branding, themes, menus and SEO fields are tenant data as well, so a new site is not a fork of the code.
          </p>
          <p>
            We do not describe here how RealFoyer enforces that isolation inside the database. Our guide to{' '}
            <In href="/blog/multi-tenant-real-estate-saas">building a multi-tenant real estate SaaS platform</In>{' '}
            compares the three tenancy models and covers enforcing isolation in the database, tenant resolution
            and custom-domain TLS, and a pre-launch isolation checklist.
          </p>
        </div>

        {/* MLS */}
        <div className="csd-section">
          <div className="csd-section-label">Decision 2</div>
          <h2>MLS Feeds: Integrated per Board, Activated per Agent</h2>
          <p>
            RealFoyer&apos;s first board integrations are the Toronto Regional Real Estate Board (TRREB), through
            PropTx, and MLS PIN. For TRREB, RealFoyer <Src href={RF.trreb}>&ldquo;connects there rather than through
            a third-party aggregator&rdquo;</Src>; MLS PIN&apos;s data route is listed as{' '}
            <Src href={RF.mlsPin}>&ldquo;Direct / approved feed&rdquo;</Src>. Other boards are on RealFoyer&apos;s
            roadmap, not live.
          </p>
          <p>
            Having an integration with a board does not mean every agent in that market sees its listings. A feed is
            activated for an agent only after that agent&apos;s board has approved it. That puts the entitlement on
            the agent, not on the market or the platform: two agents in the same city can be at different stages,
            and the site of an agent without approval shows no feed from that board. RealFoyer says the same from
            the agent&apos;s side: its connection follows the board&apos;s entitlement, and its board pages state
            that it <Src href={RF.trreb}>&ldquo;implements what that agreement permits without widening it.&rdquo;</Src>
          </p>
          <p>
            On the wire, RealFoyer uses the RESO Web API{' '}
            <Src href={RF.mls}>&ldquo;over OData as the primary route; the method depends on the MLS&rdquo;</Src>.
            Its help center names <Src href={RF.helpMls}>&ldquo;Trestle, MLS Grid, CREA DDF and PropTx&rdquo;</Src>{' '}
            as the common routes, so each board&apos;s route is built and tested on its own.
            Our guides on <In href="/blog/how-to-get-mls-data-access">getting MLS data access</In> and the{' '}
            <In href="/blog/mls-data-pipeline-architecture">MLS data pipeline architecture</In> cover the approval
            process and the feed routes in general.
          </p>
        </div>

        {/* SYNC + NORMALIZATION + LIFECYCLE */}
        <div className="csd-section">
          <div className="csd-section-label">Decision 3</div>
          <h2>Scheduled Sync, One Normalized Model, Reconciled Removals</h2>
          <h3 style={{ fontSize: 20, margin: '8px 0 12px' }}>Sync on a schedule, by design</h3>
          <p>
            RealFoyer does not stream listing changes. On its{' '}
            <Src href={RF.mls}>MLS integration page</Src>: &ldquo;Listings, media and geocoding sync on cron rather
            than streaming, so a change on the board appears after the next run, not the same second.&rdquo; Because
            boards publish at different cadences, the product{' '}
            <Src href={RF.helpMls}>&ldquo;reports the actual sync status for your connection&rdquo;</Src> rather than
            promising one refresh rate for every market. A scheduled pull is simpler to retry and to reason about
            than a stream, and the board&apos;s own publishing cadence limits freshness either way. Our guides on{' '}
            <In href="/blog/mls-sync-engine">building an MLS synchronization engine</In> and{' '}
            <In href="/blog/background-jobs-redis-bullmq">designing reliable background jobs</In> cover checkpoints,
            incremental sync, retries and failure recovery in general terms.
          </p>
          <h3 style={{ fontSize: 20, margin: '24px 0 12px' }}>Normalize before anything reads the data</h3>
          <p>
            Each board&apos;s feed is mapped into one model before search, listing pages or the map see it. RealFoyer
            lists what is imported:{' '}
            <Src href={RF.mls}>&ldquo;Identifiers, status, price, address, details, photos, rooms, open houses,
            coordinates, price history and, where the board permits, sold history, with attribution and
            timestamps.&rdquo;</Src> Attribution is carried with each listing because the board&apos;s display rules
            depend on it. Our guide to{' '}
            <In href="/blog/mls-data-normalization">MLS data normalization across multiple boards</In> covers
            identifiers, property types, units, media and rules that travel with the data.
          </p>
          <h3 style={{ fontSize: 20, margin: '24px 0 12px' }}>Removals are part of the sync</h3>
          <p>
            A listing that leaves the feed must leave the site. RealFoyer states that{' '}
            <Src href={RF.mls}>&ldquo;Status changes carry through; listings that leave the feed stop showing&rdquo;</Src>,
            and that <Src href={RF.trreb}>&ldquo;listings removed at the source are reconciled rather than left
            behind.&rdquo;</Src> Our guide to{' '}
            <In href="/blog/listing-lifecycle-sold-expired-deleted">handling deleted, expired and sold listings</In>{' '}
            covers the ways a removal reaches you and the reconciliation job.
          </p>
        </div>

        {/* SEARCH */}
        <div className="csd-section">
          <div className="csd-section-label">Decision 4</div>
          <h2>Search: a Separate Index, Ungated Listing Pages</h2>
          <p>
            Normalized listings go to both the database and a search index, and search, property pages and map results
            are served from that path. Keeping the index separate means the store of record is not answering every
            filter change and map move.
          </p>
          <p>
            Listing pages are open to everyone. RealFoyer&apos;s help center says listing pages are{' '}
            <Src href={RF.helpMls}>ungated by default</Src>, because &ldquo;Gated listings are not indexed
            listings.&rdquo; Registration is instead earned by saved searches: a visitor saves a search and chooses{' '}
            <Src href={RF.features}>instant, daily or weekly alerts</Src>, and that opt-in is, as RealFoyer&apos;s{' '}
            <Src href={RF.trreb}>board page</Src> puts it, &ldquo;how an anonymous visitor becomes someone you can talk
            to.&rdquo; Our guides cover{' '}
            <In href="/blog/real-estate-search-elasticsearch">designing a real estate search engine</In> and{' '}
            <In href="/blog/saved-searches-listing-alerts">reliable saved searches and listing alerts</In>.
          </p>
        </div>

        {/* CRM */}
        <div className="csd-section">
          <div className="csd-section-label">Decision 5</div>
          <h2>CRM: the Website Writes to the Lead</h2>
          <p>
            Because the website and the CRM share one data model, what a visitor does on the site lands on the same
            lead record the agent works from. The lead then moves through stages{' '}
            <Src href={RF.crm}>&ldquo;from new and contacted through qualified, viewing booked, closed won and
            lost&rdquo;</Src>, with tasks, assignment and routing for teams and brokerages.
          </p>
          <p>
            Where a rule is enough, RealFoyer uses a rule. Its lead health score combines five factors (budget,
            activity, engagement, response and timeline fit), and the{' '}
            <Src href={RF.leadAutomation}>lead automation page</Src> says plainly: &ldquo;No AI produces this
            score.&rdquo; A rule-based score can be explained to the agent who has to act on it. Our guide to{' '}
            <In href="/blog/real-estate-crm-architecture">real estate CRM architecture</In> covers capture,
            the contact timeline, property interactions, and assignment and routing in general terms.
          </p>
        </div>

        {/* INTEGRATIONS + CMS */}
        <div className="csd-section">
          <div className="csd-section-label">Decision 6</div>
          <h2>Narrow Integrations and a Configurable CMS</h2>
          <p>
            Integrations are deliberately narrow and say what they do not do. New leads can be sent out to Zoho CRM,
            GoHighLevel or Zapier, and the <Src href={RF.integrations}>integrations help page</Src> calls this
            &ldquo;a one-time push outward, not an ongoing sync.&rdquo; In the other direction, RealFoyer issues an
            inbound webhook URL and a token that another system can post leads to. A one-way push and a
            token-protected inbound endpoint are easy to secure and easy to explain. Our guide to{' '}
            <In href="/blog/webhook-event-driven-integrations">reliable webhook and event-driven integrations</In>{' '}
            covers signatures, idempotency keys, retries and reconciliation.
          </p>
          <p>
            The site CMS follows the same restraint. It offers{' '}
            <Src href={RF.cms}>&ldquo;Configurable sections and page controls, not a freeform canvas&rdquo;</Src>:
            pages, menus, homepage sections, themes and per-page SEO fields, stored as tenant data. Saves publish to
            the live site with &ldquo;no separate deploy&rdquo;: a site is configuration on the shared platform, not its
            own codebase.
          </p>
        </div>

        {/* NOT PUBLISHED */}
        <div className="csd-section">
          <div className="csd-section-label">Outcomes</div>
          <h2>{NO_OUTCOMES}</h2>
          <p>
            This case study states no user counts, customer numbers, listing volumes, performance figures, uptime or
            business results for RealFoyer, because none has been published with a measurement we can stand behind.
            It also leaves out what we have not approved for publication:
          </p>
          <ul style={listStyle}>
            <li>the names of the frameworks, databases, search engine and queue in RealFoyer&apos;s stack;</li>
            <li>hosting, environments and monitoring;</li>
            <li>development dates, team size and who built which part;</li>
            <li>how tenant isolation is enforced and tested inside the database.</li>
          </ul>
          <p>
            If we publish any of these, it will be with how and when it was measured. Until then, the guides linked
            above explain how we approach each topic, and the{' '}
            <In href="/services/mls-idx-integration">MLS and IDX integration service</In> describes how we would
            approach yours.
          </p>
        </div>

        <CaseStudyByline />
        <RelatedCaseStudies slug={SLUG} />

        <CaseStudyCta slug={SLUG} heading="Building a Real Estate Platform?">
          We can walk you through the MLS, search and CRM decisions behind RealFoyer on a 30-minute technical
          discovery call with an engineer.
        </CaseStudyCta>
      </div>
    </main>
  );
}
