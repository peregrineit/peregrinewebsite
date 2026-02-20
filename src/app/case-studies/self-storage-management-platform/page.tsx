import type { Metadata } from 'next';
import Link from 'next/link';
import '../../css/case-study-detail.css';

export const metadata: Metadata = {
  title: 'Building a Self-Storage Management Platform — Case Study',
  description:
    'How we engineered a full-stack SaaS platform for self-storage operators — with smart lock integration, automated billing, and real-time occupancy dashboards serving 150+ facilities.',
  keywords: ['self-storage SaaS', 'IoT access control', 'PropTech', 'smart locks', 'automated billing', 'case study'],
  robots: { index: true, follow: true },
  authors: [{ name: 'Peregrine IT Solutions', url: 'https://peregrine-it.com' }],
  openGraph: {
    title: 'Case Study — Self-Storage Management Platform with IoT Access Control | Peregrine IT Solutions',
    description: 'How we engineered a full-stack SaaS platform for self-storage operators — with smart lock integration, automated billing, and real-time occupancy dashboards.',
    type: 'article',
    url: 'https://peregrine-it.com/case-studies/self-storage-management-platform',
    siteName: 'Peregrine IT Solutions',
    locale: 'en_US',
    images: [{ url: 'https://peregrine-it.com/ogimage.png', width: 1200, height: 630, alt: 'Self-Storage Management Platform Case Study — Peregrine IT Solutions' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Case Study — Self-Storage Management Platform with IoT Access Control',
    description: 'How we built a unified SaaS platform with IoT-powered access control, automated billing, and real-time dashboards for 150+ self-storage facilities.',
    images: ['https://peregrine-it.com/ogimage.png'],
  },
  alternates: { canonical: 'https://peregrine-it.com/case-studies/self-storage-management-platform' },
};

export default function SelfStorageManagementPlatform() {
  return (
    <div className="case-study-detail csd-purple">
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
            Building a Self-Storage Management Platform with <em>IoT-Powered Access Control</em>
          </h1>

          <p className="csd-hero-sub">
            How we engineered a full-stack SaaS platform for self-storage operators — with smart lock
            integration, automated billing, and real-time occupancy dashboards serving 150+ facilities.
          </p>

          <div className="csd-hero-meta">
            <div className="csd-hero-meta-item">
              <div className="csd-hero-meta-label">Industry</div>
              <div className="csd-hero-meta-value">Self-Storage / Property Management</div>
            </div>
            <div className="csd-hero-meta-item">
              <div className="csd-hero-meta-label">Duration</div>
              <div className="csd-hero-meta-value">10 Months</div>
            </div>
            <div className="csd-hero-meta-item">
              <div className="csd-hero-meta-label">Services</div>
              <div className="csd-hero-meta-value">Full-Stack &middot; IoT Integration &middot; DevOps</div>
            </div>
            <div className="csd-hero-meta-item">
              <div className="csd-hero-meta-label">Markets</div>
              <div className="csd-hero-meta-value">United States</div>
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
                <i className="ri-door-lock-box-line" style={{ fontSize: 28, color: '#c4b5fd' }} />
              </div>
              <div className="csd-placeholder-node">
                <i className="ri-wifi-line" style={{ fontSize: 28, color: '#c4b5fd' }} />
              </div>
              <div className="csd-placeholder-node">
                <i className="ri-money-dollar-circle-line" style={{ fontSize: 28, color: '#c4b5fd' }} />
              </div>
              <div className="csd-placeholder-node">
                <i className="ri-dashboard-3-line" style={{ fontSize: 28, color: '#c4b5fd' }} />
              </div>
              <div className="csd-placeholder-node">
                <i className="ri-building-3-line" style={{ fontSize: 28, color: '#c4b5fd' }} />
              </div>
              <div className="csd-placeholder-node">
                <i className="ri-cloud-line" style={{ fontSize: 28, color: '#c4b5fd' }} />
              </div>
            </div>
            <p>Self-Storage SaaS &middot; IoT Access Control</p>
          </div>
        </div>
      </div>

      {/* ═══ CONTENT ═══ */}
      <div className="csd-content">
        {/* KEY STATS */}
        <div className="csd-stats-row">
          <div className="csd-stat-card">
            <div className="csd-stat-number">150+</div>
            <div className="csd-stat-label">Facilities</div>
          </div>
          <div className="csd-stat-card">
            <div className="csd-stat-number">45K+</div>
            <div className="csd-stat-label">Active Units</div>
          </div>
          <div className="csd-stat-card">
            <div className="csd-stat-number">99.7%</div>
            <div className="csd-stat-label">Billing Accuracy</div>
          </div>
          <div className="csd-stat-card">
            <div className="csd-stat-number">&lt;3s</div>
            <div className="csd-stat-label">Gate Access</div>
          </div>
        </div>

        {/* OVERVIEW */}
        <div className="csd-section">
          <div className="csd-section-label">Overview</div>
          <h2>The Client&apos;s Vision</h2>
          <p>
            A mid-size self-storage operator running 150+ facilities across 12 states needed to replace
            a patchwork of legacy software — separate systems for unit reservations, billing, gate
            access, and occupancy tracking that didn&apos;t talk to each other. Staff were manually
            reconciling data across three different dashboards every morning.
          </p>
          <p>
            They wanted a single, unified SaaS platform where facility managers could manage units,
            tenants, billing, and smart locks from one screen — and where corporate leadership could see
            real-time occupancy and revenue data across the entire portfolio.
          </p>
        </div>

        {/* CHALLENGES */}
        <div className="csd-section">
          <div className="csd-section-label">The Challenge</div>
          <h2>What Was Breaking</h2>

          <div className="csd-cs-grid">
            <div className="csd-cs-card csd-challenge">
              <div className="csd-cs-card-icon">
                <i className="ri-lock-unlock-line" />
              </div>
              <h4>Fragmented Access Control</h4>
              <p>
                Each facility used a different gate access vendor. Some had keypads, others had Bluetooth
                locks, and a few still used physical keys. There was no centralized way to grant, revoke,
                or audit access.
              </p>
            </div>
            <div className="csd-cs-card csd-challenge">
              <div className="csd-cs-card-icon">
                <i className="ri-money-dollar-circle-line" />
              </div>
              <h4>Manual Billing Chaos</h4>
              <p>
                Invoices were generated in one system, payments tracked in another, and late fees
                calculated in spreadsheets. Autopay failures went unnoticed for days, costing the
                operator thousands in missed revenue.
              </p>
            </div>
            <div className="csd-cs-card csd-challenge">
              <div className="csd-cs-card-icon">
                <i className="ri-bar-chart-box-line" />
              </div>
              <h4>No Real-Time Occupancy Data</h4>
              <p>
                Occupancy rates were updated weekly via manual reports. Corporate had no way to spot
                underperforming facilities or adjust pricing dynamically based on demand.
              </p>
            </div>
            <div className="csd-cs-card csd-challenge">
              <div className="csd-cs-card-icon">
                <i className="ri-stack-line" />
              </div>
              <h4>Disconnected Tech Stack</h4>
              <p>
                The reservation system, billing engine, and access control software were three separate
                vendors with no API integration. Data lived in silos, and syncing required nightly CSV
                exports.
              </p>
            </div>
          </div>
        </div>

        {/* SOLUTION */}
        <div className="csd-section">
          <div className="csd-section-label">Our Approach</div>
          <h2>The Architecture We Built</h2>
          <p>
            We built a centralized event-driven architecture with Node.js microservices. The platform
            acts as a single source of truth — when a tenant pays, access is granted automatically. When
            a lease expires, the lock deactivates within seconds. Everything flows through a unified
            event bus.
          </p>

          <div className="csd-arch-block">
            <h3>System Architecture</h3>
            <div className="csd-arch-layers">
              <div className="csd-arch-layer">
                <div className="csd-arch-layer-icon">
                  <i className="ri-smartphone-line" />
                </div>
                <div className="csd-arch-layer-content">
                  <div className="csd-arch-layer-name">Tenant Mobile App &amp; Manager Portal</div>
                  <div className="csd-arch-layer-desc">
                    React Native app for tenants (payments, lock control) and Next.js admin dashboard
                    for facility managers
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
                    JWT-based auth with role-based access. Facility managers, corporate admins, and
                    tenants each see only their data
                  </div>
                </div>
              </div>
              <div className="csd-arch-arrow">↓</div>

              <div className="csd-arch-layer">
                <div className="csd-arch-layer-icon">
                  <i className="ri-database-2-line" />
                </div>
                <div className="csd-arch-layer-content">
                  <div className="csd-arch-layer-name">PostgreSQL — Core Data Store</div>
                  <div className="csd-arch-layer-desc">
                    Tenants, units, leases, payments, and facility configurations. Multi-tenant schema
                    isolation per operator
                  </div>
                </div>
              </div>
              <div className="csd-arch-arrow">↓</div>

              <div className="csd-arch-layer">
                <div className="csd-arch-layer-icon">
                  <i className="ri-wifi-line" />
                </div>
                <div className="csd-arch-layer-content">
                  <div className="csd-arch-layer-name">IoT Bridge — Smart Lock Integration</div>
                  <div className="csd-arch-layer-desc">
                    Unified abstraction layer supporting Nok&#x113;, PTI, and Janus smart locks via
                    MQTT. Real-time lock status and event streaming
                  </div>
                </div>
              </div>
              <div className="csd-arch-arrow">↓</div>

              <div className="csd-arch-layer">
                <div className="csd-arch-layer-icon">
                  <i className="ri-line-chart-line" />
                </div>
                <div className="csd-arch-layer-content">
                  <div className="csd-arch-layer-name">Analytics Engine &amp; Billing Automation</div>
                  <div className="csd-arch-layer-desc">
                    Stripe-powered billing with auto-retry logic. Real-time occupancy and revenue
                    dashboards with configurable alerts
                  </div>
                </div>
              </div>
            </div>
          </div>

          <p>
            The IoT bridge was the most technically challenging piece. Each lock vendor uses a different
            protocol — Bluetooth LE, Wi-Fi, or cellular. We built an abstraction layer that normalizes
            commands (lock, unlock, check status) across all vendors, so the application logic never
            needs to know which hardware is installed at a given facility.
          </p>
        </div>

        {/* TECH STACK */}
        <div className="csd-section">
          <div className="csd-section-label">Technology</div>
          <h2>Tech Stack</h2>
          <div className="csd-tech-grid">
            <div className="csd-tech-tag">
              <span className="csd-tech-icon"><i className="ri-smartphone-line" /></span> React Native
            </div>
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
              <span className="csd-tech-icon"><i className="ri-flashlight-line" /></span> Redis
            </div>
            <div className="csd-tech-tag">
              <span className="csd-tech-icon"><i className="ri-wifi-line" /></span> MQTT / IoT
            </div>
            <div className="csd-tech-tag">
              <span className="csd-tech-icon"><i className="ri-bank-card-line" /></span> Stripe
            </div>
            <div className="csd-tech-tag">
              <span className="csd-tech-icon"><i className="ri-amazon-line" /></span> AWS
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
              <div className="csd-timeline-title">Discovery &amp; System Design</div>
              <p className="csd-timeline-desc">
                Mapped all existing workflows across facilities. Documented lock vendor APIs (Nok&#x113;,
                PTI, Janus). Designed the multi-tenant schema and event-driven architecture. Defined the
                IoT abstraction layer spec.
              </p>
            </div>
            <div className="csd-timeline-item">
              <div className="csd-timeline-dot" />
              <div className="csd-timeline-phase">Phase 2 — Weeks 5–16</div>
              <div className="csd-timeline-title">Core Platform Build</div>
              <p className="csd-timeline-desc">
                Built the tenant management system, unit reservation engine, and facility manager portal.
                Implemented PostgreSQL with per-operator schema isolation. Integrated Stripe for
                automated billing with retry logic.
              </p>
            </div>
            <div className="csd-timeline-item">
              <div className="csd-timeline-dot" />
              <div className="csd-timeline-phase">Phase 3 — Weeks 17–28</div>
              <div className="csd-timeline-title">IoT Integration &amp; Mobile App</div>
              <p className="csd-timeline-desc">
                Developed the MQTT-based IoT bridge. Integrated three smart lock vendors behind a
                unified API. Built the React Native tenant app with Bluetooth and remote unlock
                capabilities.
              </p>
            </div>
            <div className="csd-timeline-item">
              <div className="csd-timeline-dot" />
              <div className="csd-timeline-phase">Phase 4 — Weeks 29–40</div>
              <div className="csd-timeline-title">Dashboards, Testing &amp; Rollout</div>
              <p className="csd-timeline-desc">
                Built real-time occupancy and revenue dashboards for corporate. Load-tested with
                simulated 45K-unit traffic. Phased rollout across facilities — 10 pilot sites, then full
                150+ deployment.
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
              <div className="csd-result-before">Manual billing errors</div>
              <div className="csd-result-after">99.7% accuracy</div>
              <div className="csd-result-label">Automated billing with Stripe</div>
            </div>
            <div className="csd-result-card">
              <div className="csd-result-before">Gate access setup</div>
              <div className="csd-result-after">&lt;3 seconds</div>
              <div className="csd-result-label">IoT-powered instant access</div>
            </div>
            <div className="csd-result-card">
              <div className="csd-result-before">Occupancy reporting</div>
              <div className="csd-result-after">Real-time</div>
              <div className="csd-result-label">From weekly CSVs to live dashboards</div>
            </div>
            <div className="csd-result-card">
              <div className="csd-result-before">Revenue leakage</div>
              <div className="csd-result-after">-82% reduction</div>
              <div className="csd-result-label">Auto-retry catches failed payments</div>
            </div>
          </div>
        </div>

        {/* QUOTE */}
        <div className="csd-quote-block">
          <div className="csd-quote-text">
            &ldquo;We went from juggling three dashboards and a spreadsheet every morning to having
            everything in one place. The IoT access control alone saved us two full-time staff positions
            across our facilities.&rdquo;
          </div>
          <div className="csd-quote-author">— VP of Operations, Storage Operator</div>
        </div>

        {/* KEY TAKEAWAYS */}
        <div className="csd-section">
          <div className="csd-section-label">Key Takeaways</div>
          <h2>What Made This Work</h2>
          <p>
            Self-storage SaaS is deceptively complex. On the surface it looks like a simple CRUD app —
            units, tenants, payments. But the moment you add IoT hardware, multi-vendor lock protocols,
            and real-time occupancy tracking, the architecture complexity jumps significantly.
          </p>
          <p>
            The key insight was treating the IoT bridge as a first-class service, not an afterthought.
            By abstracting lock vendor protocols behind a unified API, we made it possible to add new
            hardware vendors without touching the core application. When the client later added a fourth
            lock vendor, integration took two weeks instead of two months.
          </p>
          <p>
            Automated billing with intelligent retry logic was the quiet hero of this project. The old
            system was losing an estimated $180K/year in missed payments from autopay failures. The new
            system detects failures immediately, retries with exponential backoff, and alerts facility
            managers only when human intervention is actually needed.
          </p>
        </div>

        {/* CTA */}
        <div className="csd-cta-section">
          <h2>Building a Storage Management Platform?</h2>
          <p>
            We help PropTech and facility management companies build production-grade SaaS. Let&apos;s
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
