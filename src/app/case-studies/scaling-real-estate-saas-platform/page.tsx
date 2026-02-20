import type { Metadata } from 'next';
import Link from 'next/link';
import '../../css/case-study-detail.css';

export const metadata: Metadata = {
  title: 'Scaling a Real Estate SaaS Platform — Case Study',
  description:
    'How we re-architected a property search platform across the US and Canada — handling millions of MLS listings with sub-second response times. From 5 agents to 200+.',
  keywords: ['real estate SaaS', 'PropTech', 'MLS integration', 'property search', 'Elasticsearch', 'Next.js', 'case study'],
  robots: { index: true, follow: true },
  authors: [{ name: 'Peregrine IT Solutions', url: 'https://peregrine-it.com' }],
  openGraph: {
    title: 'Case Study — Scaling a Real Estate SaaS Platform | Peregrine IT Solutions',
    description:
      'How we re-architected a property search platform across the US and Canada — handling millions of MLS listings with sub-second response times.',
    type: 'article',
    url: 'https://peregrine-it.com/case-studies/scaling-real-estate-saas-platform',
    siteName: 'Peregrine IT Solutions',
    locale: 'en_US',
    images: [{ url: 'https://peregrine-it.com/ogimage.png', width: 1200, height: 630, alt: 'Real Estate SaaS Platform Case Study — Peregrine IT Solutions' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Case Study — Scaling a Real Estate SaaS Platform',
    description: 'From 5 agents to 200+. How we rebuilt a real estate SaaS platform to handle millions of MLS listings with sub-second search.',
    images: ['https://peregrine-it.com/ogimage.png'],
  },
  alternates: { canonical: 'https://peregrine-it.com/case-studies/scaling-real-estate-saas-platform' },
};

export default function ScalingRealEstateSaas() {
  return (
    <div className="case-study-detail">
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
            Case Study
          </div>

          <h1>
            Scaling a Real Estate SaaS Platform from <em>5 Agents to 200+</em>
          </h1>

          <p className="csd-hero-sub">
            How we re-architected a property search platform across the US and Canada — handling
            millions of MLS listings with sub-second response times.
          </p>

          <div className="csd-hero-meta">
            <div className="csd-hero-meta-item">
              <div className="csd-hero-meta-label">Industry</div>
              <div className="csd-hero-meta-value">Real Estate / PropTech</div>
            </div>
            <div className="csd-hero-meta-item">
              <div className="csd-hero-meta-label">Duration</div>
              <div className="csd-hero-meta-value">8 Months</div>
            </div>
            <div className="csd-hero-meta-item">
              <div className="csd-hero-meta-label">Services</div>
              <div className="csd-hero-meta-value">Architecture &middot; Backend &middot; DevOps</div>
            </div>
            <div className="csd-hero-meta-item">
              <div className="csd-hero-meta-label">Markets</div>
              <div className="csd-hero-meta-value">USA &amp; Canada</div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Hero Image ═══ */}
      <div className="csd-hero-image-wrapper">
        <div className="csd-hero-image">
          <div className="csd-hero-image-placeholder">
            <div className="csd-icon-grid">
              <div className="csd-placeholder-node">
                <i className="ri-search-line" style={{ fontSize: 28, color: '#93b4f5' }} />
              </div>
              <div className="csd-placeholder-node">
                <i className="ri-flashlight-line" style={{ fontSize: 28, color: '#93b4f5' }} />
              </div>
              <div className="csd-placeholder-node">
                <i className="ri-home-4-line" style={{ fontSize: 28, color: '#93b4f5' }} />
              </div>
              <div className="csd-placeholder-node">
                <i className="ri-bar-chart-box-line" style={{ fontSize: 28, color: '#93b4f5' }} />
              </div>
              <div className="csd-placeholder-node">
                <i className="ri-database-2-line" style={{ fontSize: 28, color: '#93b4f5' }} />
              </div>
              <div className="csd-placeholder-node">
                <i className="ri-cloud-line" style={{ fontSize: 28, color: '#93b4f5' }} />
              </div>
            </div>
            <p>Real Estate SaaS &middot; Platform Architecture</p>
          </div>
        </div>
      </div>

      {/* ═══ CONTENT ═══ */}
      <div className="csd-content">
        {/* KEY STATS */}
        <div className="csd-stats-row">
          <div className="csd-stat-card">
            <div className="csd-stat-number">200+</div>
            <div className="csd-stat-label">Active Agents</div>
          </div>
          <div className="csd-stat-card">
            <div className="csd-stat-number">2M+</div>
            <div className="csd-stat-label">Property Listings</div>
          </div>
          <div className="csd-stat-card">
            <div className="csd-stat-number">&lt;200ms</div>
            <div className="csd-stat-label">Search Response</div>
          </div>
          <div className="csd-stat-card">
            <div className="csd-stat-number">99.9%</div>
            <div className="csd-stat-label">Uptime SLA</div>
          </div>
        </div>

        {/* OVERVIEW */}
        <div className="csd-section">
          <div className="csd-section-label">Overview</div>
          <h2>The Client&apos;s Vision</h2>
          <p>
            A growing real estate brokerage needed a modern, white-label website platform that could
            serve individual agents across the United States and Canada. Each agent needed their own
            branded IDX website with MLS-integrated property search, lead capture, and CRM
            capabilities — all powered by a single, centralized backend.
          </p>
          <p>
            The initial version worked for 5 agents. But as demand grew, the platform buckled under
            the weight of multi-tenant data, slow property searches, and infrastructure that
            wasn&apos;t built to scale. They came to us to rebuild the core architecture and turn a
            fragile MVP into a production-grade SaaS platform.
          </p>
        </div>

        {/* CHALLENGES */}
        <div className="csd-section">
          <div className="csd-section-label">The Challenge</div>
          <h2>What Was Breaking</h2>
          <p>
            When we audited the existing system, we identified four critical bottlenecks that were
            preventing the platform from scaling beyond a handful of agents.
          </p>

          <div className="csd-cs-grid">
            <div className="csd-cs-card csd-challenge">
              <div className="csd-cs-card-icon">
                <i className="ri-timer-line" />
              </div>
              <h4>Slow Property Search</h4>
              <p>
                MongoDB direct queries for property search were taking 3–5 seconds under load.
                Auto-suggestions were unusable for agents showing properties to buyers in real-time.
              </p>
            </div>
            <div className="csd-cs-card csd-challenge">
              <div className="csd-cs-card-icon">
                <i className="ri-refresh-line" />
              </div>
              <h4>MLS Data Sync Failures</h4>
              <p>
                The cron-based sync was running as a single process with no error recovery. One
                failed MLS feed would stall updates for all agents across the platform.
              </p>
            </div>
            <div className="csd-cs-card csd-challenge">
              <div className="csd-cs-card-icon">
                <i className="ri-building-line" />
              </div>
              <h4>No Multi-Tenant Isolation</h4>
              <p>
                All agents shared configuration, leads, and property data in flat collections. One
                agent&apos;s misconfiguration could affect every other agent&apos;s website.
              </p>
            </div>
            <div className="csd-cs-card csd-challenge">
              <div className="csd-cs-card-icon">
                <i className="ri-hard-drive-2-line" />
              </div>
              <h4>Sold &amp; Active Data Conflicts</h4>
              <p>
                Sold and active properties lived in the same collection with no clear status
                management. Agents were showing sold properties as active listings on their sites.
              </p>
            </div>
          </div>
        </div>

        {/* SOLUTION */}
        <div className="csd-section">
          <div className="csd-section-label">Our Approach</div>
          <h2>The Architecture We Built</h2>
          <p>
            We designed a three-layer data architecture that separates concerns cleanly: MongoDB as
            the source of truth, Elasticsearch for fast search, and Redis as a high-speed cache layer
            sitting on top. Each layer does what it&apos;s best at — nothing more.
          </p>

          <div className="csd-arch-block">
            <h3>Data Flow Architecture</h3>
            <div className="csd-arch-layers">
              <div className="csd-arch-layer">
                <div className="csd-arch-layer-icon">
                  <i className="ri-global-line" />
                </div>
                <div className="csd-arch-layer-content">
                  <div className="csd-arch-layer-name">MLS Data Feeds (RETS / RESO Web API)</div>
                  <div className="csd-arch-layer-desc">
                    Property data ingested from multiple US &amp; Canadian MLS boards via scheduled
                    sync
                  </div>
                </div>
              </div>
              <div className="csd-arch-arrow">↓</div>

              <div className="csd-arch-layer">
                <div className="csd-arch-layer-icon">
                  <i className="ri-time-line" />
                </div>
                <div className="csd-arch-layer-content">
                  <div className="csd-arch-layer-name">Cron Sync Engine — Every 2 Hours</div>
                  <div className="csd-arch-layer-desc">
                    Delta detection, error handling, retry logic. Processes only changed records to
                    minimize load.
                  </div>
                </div>
              </div>
              <div className="csd-arch-arrow">↓</div>

              <div className="csd-arch-layer">
                <div className="csd-arch-layer-icon">
                  <i className="ri-database-2-line" />
                </div>
                <div className="csd-arch-layer-content">
                  <div className="csd-arch-layer-name">MongoDB — Source of Truth</div>
                  <div className="csd-arch-layer-desc">
                    Stores all property data (active + sold), website configurations, lead data, and
                    agent profiles
                  </div>
                </div>
              </div>
              <div className="csd-arch-arrow">↓</div>

              <div className="csd-arch-layer">
                <div className="csd-arch-layer-icon">
                  <i className="ri-search-line" />
                </div>
                <div className="csd-arch-layer-content">
                  <div className="csd-arch-layer-name">Elasticsearch — Search Layer</div>
                  <div className="csd-arch-layer-desc">
                    Handles property search, filters, geo-queries, auto-suggestions. Local per
                    environment.
                  </div>
                </div>
              </div>
              <div className="csd-arch-arrow">↓</div>

              <div className="csd-arch-layer">
                <div className="csd-arch-layer-icon">
                  <i className="ri-flashlight-line" />
                </div>
                <div className="csd-arch-layer-content">
                  <div className="csd-arch-layer-name">Redis — Cache Layer</div>
                  <div className="csd-arch-layer-desc">
                    Sits on top of Elasticsearch. Serves repeated queries instantly. Refreshed every
                    2 hours with cron sync.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <p>
            For individual property detail pages, we bypass both Redis and Elasticsearch entirely and
            query MongoDB directly. This ensures agents always see the most current property data —
            including status changes, price updates, and newly uploaded photos — without waiting for
            the cache to refresh.
          </p>
        </div>

        {/* TECH STACK */}
        <div className="csd-section">
          <div className="csd-section-label">Technology</div>
          <h2>Tech Stack</h2>
          <div className="csd-tech-grid">
            <div className="csd-tech-tag">
              <span className="csd-tech-icon"><i className="ri-reactjs-line" /></span> Next.js
            </div>
            <div className="csd-tech-tag">
              <span className="csd-tech-icon"><i className="ri-nodejs-line" /></span> Node.js
            </div>
            <div className="csd-tech-tag">
              <span className="csd-tech-icon"><i className="ri-leaf-line" /></span> MongoDB
            </div>
            <div className="csd-tech-tag">
              <span className="csd-tech-icon"><i className="ri-search-eye-line" /></span> Elasticsearch
            </div>
            <div className="csd-tech-tag">
              <span className="csd-tech-icon"><i className="ri-flashlight-line" /></span> Redis
            </div>
            <div className="csd-tech-tag">
              <span className="csd-tech-icon"><i className="ri-amazon-line" /></span> AWS (SES, S3)
            </div>
            <div className="csd-tech-tag">
              <span className="csd-tech-icon"><i className="ri-server-line" /></span> Linode / VPS
            </div>
            <div className="csd-tech-tag">
              <span className="csd-tech-icon"><i className="ri-link" /></span> MLS / RETS API
            </div>
          </div>
        </div>

        {/* EXECUTION TIMELINE */}
        <div className="csd-section">
          <div className="csd-section-label">Execution</div>
          <h2>How We Delivered It</h2>

          <div className="csd-timeline">
            <div className="csd-timeline-item">
              <div className="csd-timeline-dot" />
              <div className="csd-timeline-phase">Phase 1 — Weeks 1–3</div>
              <div className="csd-timeline-title">Audit &amp; Architecture Design</div>
              <p className="csd-timeline-desc">
                Full codebase audit. Mapped existing data models, identified bottlenecks, designed
                the three-layer architecture (MongoDB → Elasticsearch → Redis). Defined multi-tenant
                data isolation strategy.
              </p>
            </div>
            <div className="csd-timeline-item">
              <div className="csd-timeline-dot" />
              <div className="csd-timeline-phase">Phase 2 — Weeks 4–10</div>
              <div className="csd-timeline-title">Search Engine &amp; Cache Layer</div>
              <p className="csd-timeline-desc">
                Deployed Elasticsearch per environment. Built property search indexing pipeline,
                auto-suggestion engine, and geo-based filtering. Implemented Redis as a read-through
                cache with 2-hour TTL synced to the cron schedule.
              </p>
            </div>
            <div className="csd-timeline-item">
              <div className="csd-timeline-dot" />
              <div className="csd-timeline-phase">Phase 3 — Weeks 11–18</div>
              <div className="csd-timeline-title">Cron Sync &amp; Multi-Tenant Hardening</div>
              <p className="csd-timeline-desc">
                Rewrote the MLS sync engine with delta detection, retry logic, and per-feed error
                isolation. Restructured MongoDB collections for clean multi-tenant separation. Split
                environment configs for USA Live, Canada Live, and Staging.
              </p>
            </div>
            <div className="csd-timeline-item">
              <div className="csd-timeline-dot" />
              <div className="csd-timeline-phase">Phase 4 — Weeks 19–24</div>
              <div className="csd-timeline-title">Frontend Optimization &amp; Launch</div>
              <p className="csd-timeline-desc">
                Optimized Next.js frontend with ISR, dynamic imports, image optimization via S3 +
                CDN. Deployed white-label agent themes. Load-tested the full stack with simulated
                200-agent traffic before go-live.
              </p>
            </div>
          </div>
        </div>

        {/* RESULTS */}
        <div className="csd-section">
          <div className="csd-section-label">Results</div>
          <h2>The Impact</h2>
          <p>
            Within 3 months of the new architecture going live, the platform handled a 40x increase
            in agent count without any degradation in performance or reliability.
          </p>

          <div className="csd-results-grid">
            <div className="csd-result-card">
              <div className="csd-result-before">Search response time</div>
              <div className="csd-result-after">3.5s → 180ms</div>
              <div className="csd-result-label">94% faster property search</div>
            </div>
            <div className="csd-result-card">
              <div className="csd-result-before">Active agents on platform</div>
              <div className="csd-result-after">5 → 200+</div>
              <div className="csd-result-label">40x scale with zero downtime</div>
            </div>
            <div className="csd-result-card">
              <div className="csd-result-before">MLS sync reliability</div>
              <div className="csd-result-after">99.9% uptime</div>
              <div className="csd-result-label">Zero missed sync cycles post-launch</div>
            </div>
            <div className="csd-result-card">
              <div className="csd-result-before">Lead capture rate</div>
              <div className="csd-result-after">+65% increase</div>
              <div className="csd-result-label">Faster pages = more conversions</div>
            </div>
          </div>
        </div>

        {/* QUOTE */}
        <div className="csd-quote-block">
          <div className="csd-quote-text">
            &ldquo;Our agents used to complain about slow search and broken listings. After the
            rebuild, the platform became our biggest competitive advantage — agents actually want to
            sign up now.&rdquo;
          </div>
          <div className="csd-quote-author">— Brokerage Operations Director</div>
        </div>

        {/* KEY LEARNINGS */}
        <div className="csd-section">
          <div className="csd-section-label">Key Takeaways</div>
          <h2>What Made This Work</h2>
          <p>
            Real estate SaaS platforms fail when they treat scaling as a hosting problem. The real
            challenge is data architecture — how property data flows from MLS feeds through your
            search layer and into the agent&apos;s browser. Getting that pipeline right is what
            separates platforms that cap out at 10 agents from ones that can serve hundreds.
          </p>
          <p>
            The combination of Elasticsearch for search, Redis for cache, and MongoDB for
            source-of-truth isn&apos;t novel — but configuring them to refresh in sync with a 2-hour
            cron cycle, while keeping property detail pages on direct-to-DB reads, is the kind of
            nuance that only comes from building in this space repeatedly.
          </p>
          <p>
            Every environment — USA Live, Canada Live, and Staging — runs its own local
            Elasticsearch and Redis instances. This isolation means a Canadian MLS sync failure never
            impacts US agent websites, and staging changes never touch production data.
          </p>
        </div>

        {/* CTA */}
        <div className="csd-cta-section">
          <h2>Building a Real Estate Platform?</h2>
          <p>
            We help PropTech companies scale from MVP to production-grade SaaS. Let&apos;s talk about
            your architecture.
          </p>
          <div className="csd-cta-buttons">
            <a href="#" data-open-contact className="csd-cta-btn">
              Tell Us About Your Project
              <i className="ri-arrow-right-line" />
            </a>
            <a
              href="https://calendly.com/mukesh-peregrine-it/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="csd-cta-btn csd-cta-btn-secondary"
            >
              Book a Strategy Call
              <i className="ri-calendar-line" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
