import type { Metadata } from 'next';
import Link from 'next/link';
import '../../css/case-study-detail.css';

export const metadata: Metadata = {
  title: 'Supply Chain Visibility for Shipment Tracking & Alerts — Case Study',
  description: 'How we built a supply chain visibility platform for 2M+ shipments across 12 carriers — with carrier API integration, ETA prediction, exception alerts, and 45% fewer customer inquiries.',
  keywords: ['supply chain', 'logistics', 'shipment tracking', 'carrier integration', 'IoT', 'SaaS', 'case study'],
  robots: { index: true, follow: true },
  authors: [{ name: 'Peregrine IT Solutions', url: 'https://peregrine-it.com' }],
  openGraph: {
    title: 'Case Study — Supply Chain Visibility for Shipment Tracking & Alerts | Peregrine IT Solutions',
    description: 'How we built a supply chain visibility platform for 2M+ shipments with carrier integration and ETA prediction.',
    type: 'article',
    url: 'https://peregrine-it.com/case-studies/supply-chain-visibility-platform',
    siteName: 'Peregrine IT Solutions',
    locale: 'en_US',
    images: [{ url: 'https://peregrine-it.com/ogimage.png', width: 1200, height: 630, alt: 'Supply Chain Visibility Case Study — Peregrine IT Solutions' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Case Study — Supply Chain Visibility for Shipment Tracking & Alerts',
    description: 'Supply chain visibility platform for 2M+ shipments with 45% fewer customer inquiries.',
    images: ['https://peregrine-it.com/ogimage.png'],
  },
  alternates: { canonical: 'https://peregrine-it.com/case-studies/supply-chain-visibility-platform' },
};

export default function SupplyChainVisibilityPlatform() {
  return (
    <div className="case-study-detail csd-orange">
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
            Supply Chain Visibility for <em>Shipment Tracking &amp; Alerts</em>
          </h1>

          <p className="csd-hero-sub">
            How we built a supply chain visibility platform for 2M+ shipments across 12 carriers —
            with carrier API integration, ETA prediction, exception alerts, and 45% fewer customer
            inquiries.
          </p>

          <div className="csd-hero-meta">
            <div className="csd-hero-meta-item">
              <div className="csd-hero-meta-label">Industry</div>
              <div className="csd-hero-meta-value">Logistics / Supply Chain</div>
            </div>
            <div className="csd-hero-meta-item">
              <div className="csd-hero-meta-label">Duration</div>
              <div className="csd-hero-meta-value">10 Months</div>
            </div>
            <div className="csd-hero-meta-item">
              <div className="csd-hero-meta-label">Services</div>
              <div className="csd-hero-meta-value">Full-Stack &middot; Carrier APIs &middot; TimescaleDB</div>
            </div>
            <div className="csd-hero-meta-item">
              <div className="csd-hero-meta-label">Markets</div>
              <div className="csd-hero-meta-value">North America</div>
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
                <i className="ri-truck-line" style={{ fontSize: 28, color: '#fb923c' }} />
              </div>
              <div className="csd-placeholder-node">
                <i className="ri-map-pin-line" style={{ fontSize: 28, color: '#fb923c' }} />
              </div>
              <div className="csd-placeholder-node">
                <i className="ri-time-line" style={{ fontSize: 28, color: '#fb923c' }} />
              </div>
              <div className="csd-placeholder-node">
                <i className="ri-error-warning-line" style={{ fontSize: 28, color: '#fb923c' }} />
              </div>
              <div className="csd-placeholder-node">
                <i className="ri-exchange-line" style={{ fontSize: 28, color: '#fb923c' }} />
              </div>
              <div className="csd-placeholder-node">
                <i className="ri-dashboard-3-line" style={{ fontSize: 28, color: '#fb923c' }} />
              </div>
            </div>
            <p>Carrier APIs &middot; ETA &middot; Exception Alerts</p>
          </div>
        </div>
      </div>

      {/* ═══ CONTENT ═══ */}
      <div className="csd-content">
        {/* KEY STATS */}
        <div className="csd-stats-row">
          <div className="csd-stat-card">
            <div className="csd-stat-number">2M+</div>
            <div className="csd-stat-label">Shipments</div>
          </div>
          <div className="csd-stat-card">
            <div className="csd-stat-number">12</div>
            <div className="csd-stat-label">Carriers</div>
          </div>
          <div className="csd-stat-card">
            <div className="csd-stat-number">45%</div>
            <div className="csd-stat-label">Fewer Inquiries</div>
          </div>
          <div className="csd-stat-card">
            <div className="csd-stat-number">Multi-Tenant</div>
            <div className="csd-stat-label">Visibility</div>
          </div>
        </div>

        {/* OVERVIEW */}
        <div className="csd-section">
          <div className="csd-section-label">Overview</div>
          <h2>The Client&apos;s Vision</h2>
          <p>
            A 3PL and freight brokerage managing shipments for hundreds of shippers was drowning in
            &ldquo;Where&apos;s my shipment?&rdquo; calls. Each carrier had a different tracking
            portal — FedEx, UPS, DHL, regional LTL carriers. Customer service manually looked up
            tracking numbers one by one.
          </p>
          <p>
            They wanted a unified visibility platform where shippers could see all shipments in one
            dashboard, get proactive exception alerts (delays, damage, customs hold), and receive
            predicted ETAs — with multi-tenant isolation so each customer sees only their data.
          </p>
        </div>

        {/* CHALLENGES */}
        <div className="csd-section">
          <div className="csd-section-label">The Challenge</div>
          <h2>What Was Breaking</h2>

          <div className="csd-cs-grid">
            <div className="csd-cs-card csd-challenge">
              <div className="csd-cs-card-icon">
                <i className="ri-exchange-line" />
              </div>
              <h4>Carrier API Integration</h4>
              <p>
                Twelve carriers, twelve different APIs — different auth, rate limits, and response
                formats. Some offered webhooks, others required polling. Error handling and retry
                logic varied wildly.
              </p>
            </div>
            <div className="csd-cs-card csd-challenge">
              <div className="csd-cs-card-icon">
                <i className="ri-time-line" />
              </div>
              <h4>ETA Prediction</h4>
              <p>
                Carrier ETAs were often wrong — especially for cross-border or multi-leg shipments.
                Customers wanted more accurate delivery windows. No historical data to train models.
              </p>
            </div>
            <div className="csd-cs-card csd-challenge">
              <div className="csd-cs-card-icon">
                <i className="ri-error-warning-line" />
              </div>
              <h4>Exception Alerts</h4>
              <p>
                Delays, damaged goods, and customs issues went unnoticed until customers called.
                No proactive notification. Support had no single view of exceptions across carriers.
              </p>
            </div>
            <div className="csd-cs-card csd-challenge">
              <div className="csd-cs-card-icon">
                <i className="ri-user-line" />
              </div>
              <h4>Multi-Tenant</h4>
              <p>
                Hundreds of shippers — each should only see their own shipments. The old system used
                shared spreadsheets. No role-based access or data isolation.
              </p>
            </div>
          </div>
        </div>

        {/* SOLUTION */}
        <div className="csd-section">
          <div className="csd-section-label">Our Approach</div>
          <h2>The Architecture We Built</h2>
          <p>
            We built a supply chain visibility platform with a carrier abstraction layer that
            normalizes APIs from 12 carriers. Tracking events are ingested, stored in TimescaleDB
            for time-series queries, and used for ETA prediction. Exception rules trigger alerts.
            Multi-tenant isolation is enforced at query time.
          </p>

          <div className="csd-arch-block">
            <h3>System Architecture</h3>
            <div className="csd-arch-layers">
              <div className="csd-arch-layer">
                <div className="csd-arch-layer-icon">
                  <i className="ri-window-line" />
                </div>
                <div className="csd-arch-layer-content">
                  <div className="csd-arch-layer-name">Next.js Shipper Portal &amp; Dashboard</div>
                  <div className="csd-arch-layer-desc">
                    Shipment list with filters, tracking detail view, and exception alerts. ETA
                    predictions and delivery window display
                  </div>
                </div>
              </div>
              <div className="csd-arch-arrow">↓</div>

              <div className="csd-arch-layer">
                <div className="csd-arch-layer-icon">
                  <i className="ri-server-line" />
                </div>
                <div className="csd-arch-layer-content">
                  <div className="csd-arch-layer-name">API Gateway &amp; Auth Layer</div>
                  <div className="csd-arch-layer-desc">
                    Multi-tenant isolation — each shipper&apos;s data scoped by tenant ID. API keys
                    and SSO for enterprise customers
                  </div>
                </div>
              </div>
              <div className="csd-arch-arrow">↓</div>

              <div className="csd-arch-layer">
                <div className="csd-arch-layer-icon">
                  <i className="ri-database-2-line" />
                </div>
                <div className="csd-arch-layer-content">
                  <div className="csd-arch-layer-name">PostgreSQL &amp; TimescaleDB — Shipments &amp; Events</div>
                  <div className="csd-arch-layer-desc">
                    Shipments, tracking numbers, and carrier assignments. TimescaleDB for
                    high-volume tracking events with time-series optimization
                  </div>
                </div>
              </div>
              <div className="csd-arch-arrow">↓</div>

              <div className="csd-arch-layer">
                <div className="csd-arch-layer-icon">
                  <i className="ri-exchange-line" />
                </div>
                <div className="csd-arch-layer-content">
                  <div className="csd-arch-layer-name">Carrier API Abstraction Layer</div>
                  <div className="csd-arch-layer-desc">
                    Unified interface for 12 carriers. Normalized tracking events, webhook/polling
                    ingestion. Rate limiting and retry per carrier
                  </div>
                </div>
              </div>
              <div className="csd-arch-arrow">↓</div>

              <div className="csd-arch-layer">
                <div className="csd-arch-layer-icon">
                  <i className="ri-line-chart-line" />
                </div>
                <div className="csd-arch-layer-content">
                  <div className="csd-arch-layer-name">ETA Engine &amp; Exception Alerts (Redis + AWS)</div>
                  <div className="csd-arch-layer-desc">
                    ETA prediction from historical lane data. Exception rule engine triggers email
                    and in-app alerts. Redis cache for real-time lookup
                  </div>
                </div>
              </div>
            </div>
          </div>

          <p>
            The carrier abstraction layer was the foundation. We defined a canonical tracking event
            schema (timestamp, location, status, description) and built adapters for each carrier.
            Polling runs on a schedule; webhooks push when available. Deduplication ensures we
            don&apos;t store the same scan twice. Failed API calls go to a retry queue with
            exponential backoff.
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
              <span className="csd-tech-icon"><i className="ri-database-2-line" /></span> PostgreSQL
            </div>
            <div className="csd-tech-tag">
              <span className="csd-tech-icon"><i className="ri-time-line" /></span> TimescaleDB
            </div>
            <div className="csd-tech-tag">
              <span className="csd-tech-icon"><i className="ri-flashlight-line" /></span> Redis
            </div>
            <div className="csd-tech-tag">
              <span className="csd-tech-icon"><i className="ri-amazon-line" /></span> AWS
            </div>
            <div className="csd-tech-tag">
              <span className="csd-tech-icon"><i className="ri-exchange-line" /></span> Carrier APIs
            </div>
            <div className="csd-tech-tag">
              <span className="csd-tech-icon"><i className="ri-user-line" /></span> Multi-Tenant
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
              <div className="csd-timeline-phase">Phase 1 — Weeks 1–4</div>
              <div className="csd-timeline-title">Discovery &amp; Carrier Mapping</div>
              <p className="csd-timeline-desc">
                Documented 12 carrier APIs — auth, endpoints, rate limits. Designed canonical
                tracking event schema. Defined multi-tenant data model.
              </p>
            </div>
            <div className="csd-timeline-item">
              <div className="csd-timeline-dot" />
              <div className="csd-timeline-phase">Phase 2 — Weeks 5–24</div>
              <div className="csd-timeline-title">Carrier Adapters &amp; Ingestion</div>
              <p className="csd-timeline-desc">
                Built adapter for each carrier with retry and rate limiting. Implemented webhook
                receivers and polling jobs. Stored events in TimescaleDB. Built shipment and tenant
                management.
              </p>
            </div>
            <div className="csd-timeline-item">
              <div className="csd-timeline-dot" />
              <div className="csd-timeline-phase">Phase 3 — Weeks 25–36</div>
              <div className="csd-timeline-title">ETA Engine &amp; Exception Alerts</div>
              <p className="csd-timeline-desc">
                Built ETA prediction using lane history. Implemented exception rule engine (delay,
                damage, customs). Integrated email and in-app notifications.
              </p>
            </div>
            <div className="csd-timeline-item">
              <div className="csd-timeline-dot" />
              <div className="csd-timeline-phase">Phase 4 — Weeks 37–40</div>
              <div className="csd-timeline-title">Portal &amp; Rollout</div>
              <p className="csd-timeline-desc">
                Built shipper portal with tracking and alerts. Migrated historical shipments.
                Onboarded 50 pilot shippers, then full rollout. Measured inquiry reduction.
              </p>
            </div>
          </div>
        </div>

        {/* RESULTS */}
        <div className="csd-section">
          <div className="csd-section-label">Results</div>
          <h2>The Impact</h2>

          <div className="csd-results-grid">
            <div className="csd-result-card">
              <div className="csd-result-before">Customer inquiries</div>
              <div className="csd-result-after">45% fewer</div>
              <div className="csd-result-label">Self-service tracking and proactive alerts</div>
            </div>
            <div className="csd-result-card">
              <div className="csd-result-before">2M+ shipments</div>
              <div className="csd-result-after">Tracked</div>
              <div className="csd-result-label">Across 12 carrier integrations</div>
            </div>
            <div className="csd-result-card">
              <div className="csd-result-before">12 carriers</div>
              <div className="csd-result-after">Unified</div>
              <div className="csd-result-label">Single dashboard for all tracking</div>
            </div>
            <div className="csd-result-card">
              <div className="csd-result-before">Exception visibility</div>
              <div className="csd-result-after">Proactive</div>
              <div className="csd-result-label">Alerts before customers call</div>
            </div>
          </div>
        </div>

        {/* QUOTE */}
        <div className="csd-quote-block">
          <div className="csd-quote-text">
            &ldquo;We used to spend half our day looking up tracking numbers. Now shippers see
            everything in one place and get alerted when something goes wrong. Our support team
            can focus on real problems.&rdquo;
          </div>
          <div className="csd-quote-author">— VP of Operations, 3PL</div>
        </div>

        {/* KEY TAKEAWAYS */}
        <div className="csd-section">
          <div className="csd-section-label">Key Takeaways</div>
          <h2>What Made This Work</h2>
          <p>
            Carrier API diversity is the main integration challenge. Each carrier has different
            auth (API key, OAuth, certificate), rate limits (per second, per day), and payload
            structure. The abstraction layer hides this — our application works with a single
            normalized format. Adding a new carrier is an adapter + config, not core changes.
          </p>
          <p>
            TimescaleDB was critical for tracking event volume. We ingest millions of scan events per
            month. PostgreSQL alone would struggle with time-range queries. TimescaleDB&apos;s
            hypertables and compression cut storage and query time significantly. We partition by
            carrier and time.
          </p>
          <p>
            ETA prediction improved over time as we collected lane-level history. Initial version
            used carrier ETAs when available; we layered on our own model using historical
            delivery times per origin-destination pair. Exception rules were built from common
            patterns — delayed, out for delivery, exception (damage, hold). Configurable thresholds
            let each tenant tune sensitivity.
          </p>
        </div>

        {/* CTA */}
        <div className="csd-cta-section">
          <h2>Building a Supply Chain Visibility Platform?</h2>
          <p>
            We help logistics companies build production-grade tracking and visibility systems. Let&apos;s
            talk about your architecture.
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
