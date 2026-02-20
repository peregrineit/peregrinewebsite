import type { Metadata } from 'next';
import Link from 'next/link';
import '../../css/case-study-detail.css';

export const metadata: Metadata = {
  title: 'Manufacturing ERP for Production & Inventory — Case Study',
  description: 'How we built a manufacturing ERP system spanning 8 factories and 50K SKUs — with multi-plant sync, BOM management, shop floor data capture, and 30% inventory reduction.',
  keywords: ['manufacturing ERP', 'industrial', 'inventory', 'BOM', 'IoT', 'SAP', 'case study'],
  robots: { index: true, follow: true },
  authors: [{ name: 'Peregrine IT Solutions', url: 'https://peregrine-it.com' }],
  openGraph: {
    title: 'Case Study — Manufacturing ERP for Production & Inventory | Peregrine IT Solutions',
    description: 'How we built a manufacturing ERP system spanning 8 factories and 50K SKUs with SAP integration and real-time inventory visibility.',
    type: 'article',
    url: 'https://peregrine-it.com/case-studies/manufacturing-erp-system',
    siteName: 'Peregrine IT Solutions',
    locale: 'en_US',
    images: [{ url: 'https://peregrine-it.com/ogimage.png', width: 1200, height: 630, alt: 'Manufacturing ERP Case Study — Peregrine IT Solutions' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Case Study — Manufacturing ERP for Production & Inventory',
    description: 'Manufacturing ERP for 8 factories and 50K SKUs with 30% inventory reduction.',
    images: ['https://peregrine-it.com/ogimage.png'],
  },
  alternates: { canonical: 'https://peregrine-it.com/case-studies/manufacturing-erp-system' },
};

export default function ManufacturingErpSystem() {
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
            Manufacturing ERP for <em>Production &amp; Inventory</em>
          </h1>

          <p className="csd-hero-sub">
            How we built a manufacturing ERP system spanning 8 factories and 50K SKUs — with
            multi-plant sync, BOM management, shop floor data capture, and 30% inventory reduction.
          </p>

          <div className="csd-hero-meta">
            <div className="csd-hero-meta-item">
              <div className="csd-hero-meta-label">Industry</div>
              <div className="csd-hero-meta-value">Manufacturing / Industrial</div>
            </div>
            <div className="csd-hero-meta-item">
              <div className="csd-hero-meta-label">Duration</div>
              <div className="csd-hero-meta-value">12 Months</div>
            </div>
            <div className="csd-hero-meta-item">
              <div className="csd-hero-meta-label">Services</div>
              <div className="csd-hero-meta-value">Full-Stack &middot; MQTT &middot; SAP Integration</div>
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
                <i className="ri-factory-line" style={{ fontSize: 28, color: '#3b7dff' }} />
              </div>
              <div className="csd-placeholder-node">
                <i className="ri-stack-line" style={{ fontSize: 28, color: '#3b7dff' }} />
              </div>
              <div className="csd-placeholder-node">
                <i className="ri-bar-chart-box-line" style={{ fontSize: 28, color: '#3b7dff' }} />
              </div>
              <div className="csd-placeholder-node">
                <i className="ri-database-2-line" style={{ fontSize: 28, color: '#3b7dff' }} />
              </div>
              <div className="csd-placeholder-node">
                <i className="ri-wifi-line" style={{ fontSize: 28, color: '#3b7dff' }} />
              </div>
              <div className="csd-placeholder-node">
                <i className="ri-arrow-left-right-line" style={{ fontSize: 28, color: '#3b7dff' }} />
              </div>
            </div>
            <p>Multi-Plant ERP &middot; BOM &middot; Supply Chain</p>
          </div>
        </div>
      </div>

      {/* ═══ CONTENT ═══ */}
      <div className="csd-content">
        {/* KEY STATS */}
        <div className="csd-stats-row">
          <div className="csd-stat-card">
            <div className="csd-stat-number">8</div>
            <div className="csd-stat-label">Factories</div>
          </div>
          <div className="csd-stat-card">
            <div className="csd-stat-number">50K+</div>
            <div className="csd-stat-label">SKUs</div>
          </div>
          <div className="csd-stat-card">
            <div className="csd-stat-number">30%</div>
            <div className="csd-stat-label">Inventory Reduction</div>
          </div>
          <div className="csd-stat-card">
            <div className="csd-stat-number">Real-Time</div>
            <div className="csd-stat-label">Multi-Plant Sync</div>
          </div>
        </div>

        {/* OVERVIEW */}
        <div className="csd-section">
          <div className="csd-section-label">Overview</div>
          <h2>The Client&apos;s Vision</h2>
          <p>
            A mid-size manufacturer with 8 plants across three states was running on a mix of
            spreadsheets, legacy MRP software, and SAP for finance. Each plant had its own way of
            tracking production — some used paper travelers, others Excel. Inventory counts were
            done monthly and reconciliation took weeks.
          </p>
          <p>
            They wanted a unified ERP that could sync production and inventory across all plants in
            real time, manage complex bills of materials, capture shop floor data via tablets, and
            integrate with SAP for orders and financials.
          </p>
        </div>

        {/* CHALLENGES */}
        <div className="csd-section">
          <div className="csd-section-label">The Challenge</div>
          <h2>What Was Breaking</h2>

          <div className="csd-cs-grid">
            <div className="csd-cs-card csd-challenge">
              <div className="csd-cs-card-icon">
                <i className="ri-factory-line" />
              </div>
              <h4>Multi-Plant Sync</h4>
              <p>
                Each plant operated as a silo. Transfer orders between plants took days to reflect.
                Corporate had no real-time view of total inventory or production status across the
                network.
              </p>
            </div>
            <div className="csd-cs-card csd-challenge">
              <div className="csd-cs-card-icon">
                <i className="ri-stack-line" />
              </div>
              <h4>BOM Management</h4>
              <p>
                Bills of materials were managed in spreadsheets. Multi-level BOMs with dozens of
                components were error-prone. Changes propagated manually — version drift between plants
                caused production issues.
              </p>
            </div>
            <div className="csd-cs-card csd-challenge">
              <div className="csd-cs-card-icon">
                <i className="ri-tablet-line" />
              </div>
              <h4>Shop Floor Data</h4>
              <p>
                Operators recorded production and downtime on paper. Data entry happened at end of
                shift — by then accuracy suffered. No real-time visibility into line utilization or
                quality metrics.
              </p>
            </div>
            <div className="csd-cs-card csd-challenge">
              <div className="csd-cs-card-icon">
                <i className="ri-arrow-left-right-line" />
              </div>
              <h4>Supply Chain Visibility</h4>
              <p>
                Purchasing relied on reorder points in spreadsheets. Lead times and supplier
                performance were tracked manually. Stockouts and overstock were common — no demand
                forecasting.
              </p>
            </div>
          </div>
        </div>

        {/* SOLUTION */}
        <div className="csd-section">
          <div className="csd-section-label">Our Approach</div>
          <h2>The Architecture We Built</h2>
          <p>
            We built a centralized manufacturing ERP with event-driven architecture. Shop floor
            tablets publish production events via MQTT. A sync service aggregates data and updates
            inventory in real time. BOMs are versioned and shared across plants. SAP integration
            handles sales orders and financial posting.
          </p>

          <div className="csd-arch-block">
            <h3>System Architecture</h3>
            <div className="csd-arch-layers">
              <div className="csd-arch-layer">
                <div className="csd-arch-layer-icon">
                  <i className="ri-window-line" />
                </div>
                <div className="csd-arch-layer-content">
                  <div className="csd-arch-layer-name">Next.js Plant Dashboards &amp; Admin Portal</div>
                  <div className="csd-arch-layer-desc">
                    Per-plant production dashboards, inventory views, and BOM editor. Corporate
                    roll-up and supply chain analytics
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
                    Role-based access per plant and function. Plant managers, planners, and corporate
                    admins have scoped permissions
                  </div>
                </div>
              </div>
              <div className="csd-arch-arrow">↓</div>

              <div className="csd-arch-layer">
                <div className="csd-arch-layer-icon">
                  <i className="ri-database-2-line" />
                </div>
                <div className="csd-arch-layer-content">
                  <div className="csd-arch-layer-name">PostgreSQL — Inventory, BOMs &amp; Production</div>
                  <div className="csd-arch-layer-desc">
                    SKUs, multi-level BOMs, work orders, and plant-specific inventory. Transfer
                    orders and production events
                  </div>
                </div>
              </div>
              <div className="csd-arch-arrow">↓</div>

              <div className="csd-arch-layer">
                <div className="csd-arch-layer-icon">
                  <i className="ri-wifi-line" />
                </div>
                <div className="csd-arch-layer-content">
                  <div className="csd-arch-layer-name">MQTT Bridge — Shop Floor Data Capture</div>
                  <div className="csd-arch-layer-desc">
                    Shop floor tablets publish production counts, downtime, and quality events via
                    MQTT. Real-time ingestion and aggregation
                  </div>
                </div>
              </div>
              <div className="csd-arch-arrow">↓</div>

              <div className="csd-arch-layer">
                <div className="csd-arch-layer-icon">
                  <i className="ri-exchange-line" />
                </div>
                <div className="csd-arch-layer-content">
                  <div className="csd-arch-layer-name">SAP Integration &amp; Redis Cache</div>
                  <div className="csd-arch-layer-desc">
                    Bi-directional sync with SAP for sales orders, material masters, and financial
                    posting. Redis for inventory cache and real-time dashboards
                  </div>
                </div>
              </div>
            </div>
          </div>

          <p>
            The MQTT bridge was designed for unreliable shop floor networks. Tablets buffer events
            locally and retry until acknowledged. We use QoS 1 to ensure at-least-once delivery.
            Duplicate events are deduplicated server-side using event IDs.
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
              <span className="csd-tech-icon"><i className="ri-wifi-line" /></span> MQTT
            </div>
            <div className="csd-tech-tag">
              <span className="csd-tech-icon"><i className="ri-flashlight-line" /></span> Redis
            </div>
            <div className="csd-tech-tag">
              <span className="csd-tech-icon"><i className="ri-exchange-line" /></span> SAP Integration
            </div>
            <div className="csd-tech-tag">
              <span className="csd-tech-icon"><i className="ri-factory-line" /></span> Multi-Plant
            </div>
            <div className="csd-tech-tag">
              <span className="csd-tech-icon"><i className="ri-bar-chart-box-line" /></span> Analytics
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
              <div className="csd-timeline-phase">Phase 1 — Weeks 1–6</div>
              <div className="csd-timeline-title">Discovery &amp; Data Model Design</div>
              <p className="csd-timeline-desc">
                Mapped production workflows across 8 plants. Audited existing BOM structure and SAP
                integration points. Designed multi-plant schema with plant-specific inventory
                buckets.
              </p>
            </div>
            <div className="csd-timeline-item">
              <div className="csd-timeline-dot" />
              <div className="csd-timeline-phase">Phase 2 — Weeks 7–24</div>
              <div className="csd-timeline-title">Core ERP &amp; BOM Engine</div>
              <p className="csd-timeline-desc">
                Built inventory management with multi-plant sync. Implemented versioned BOM engine
                with multi-level explosion. Developed work order and production planning modules.
                Integrated with SAP for order and material data.
              </p>
            </div>
            <div className="csd-timeline-item">
              <div className="csd-timeline-dot" />
              <div className="csd-timeline-phase">Phase 3 — Weeks 25–36</div>
              <div className="csd-timeline-title">MQTT Shop Floor &amp; Dashboards</div>
              <p className="csd-timeline-desc">
                Deployed MQTT broker and built ingestion pipeline. Developed tablet app for
                production entry and downtime logging. Built real-time dashboards for plant and
                corporate views.
              </p>
            </div>
            <div className="csd-timeline-item">
              <div className="csd-timeline-dot" />
              <div className="csd-timeline-phase">Phase 4 — Weeks 37–48</div>
              <div className="csd-timeline-title">Supply Chain &amp; Rollout</div>
              <p className="csd-timeline-desc">
                Implemented demand forecasting and reorder logic. Built supplier performance
                tracking. Phased rollout — 2 pilot plants first, then 6 more over 8 weeks. Trained
                users and tuned workflows.
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
              <div className="csd-result-before">Inventory levels</div>
              <div className="csd-result-after">30% reduction</div>
              <div className="csd-result-label">Optimized reorder points and visibility</div>
            </div>
            <div className="csd-result-card">
              <div className="csd-result-before">8 plants</div>
              <div className="csd-result-after">Real-time sync</div>
              <div className="csd-result-label">Single source of truth across network</div>
            </div>
            <div className="csd-result-card">
              <div className="csd-result-before">50K SKUs</div>
              <div className="csd-result-after">Managed</div>
              <div className="csd-result-label">Versioned BOMs and inventory accuracy</div>
            </div>
            <div className="csd-result-card">
              <div className="csd-result-before">Shop floor data</div>
              <div className="csd-result-after">Real-time</div>
              <div className="csd-result-label">From paper travelers to live dashboards</div>
            </div>
          </div>
        </div>

        {/* QUOTE */}
        <div className="csd-quote-block">
          <div className="csd-quote-text">
            &ldquo;We finally have one system that all plants trust. Inventory reconciliation used to
            take two weeks — now it&apos;s real-time. The BOM versioning alone prevents costly
            production errors.&rdquo;
          </div>
          <div className="csd-quote-author">— VP of Operations, Manufacturing</div>
        </div>

        {/* KEY TAKEAWAYS */}
        <div className="csd-section">
          <div className="csd-section-label">Key Takeaways</div>
          <h2>What Made This Work</h2>
          <p>
            Manufacturing ERP complexity scales with plants and SKUs. The multi-plant sync had to
            handle conflicting updates — we used optimistic locking and event sourcing for inventory
            movements. Transfer orders between plants are treated as first-class transactions with
            atomic commit.
          </p>
          <p>
            MQTT was the right choice for shop floor data. Wi-Fi in plants is often spotty —
            tablets needed to work offline and replay when reconnected. We designed a thin client
            that buffers locally and syncs when network is available. Operators don&apos;t notice
            connectivity issues.
          </p>
          <p>
            SAP integration required careful mapping. Material masters, plants, and storage locations
            had to align. We built an abstraction layer so our schema could evolve independently —
            the SAP adapter handles translation. Bi-directional sync needed conflict resolution — we
            treat SAP as source of truth for orders, our system for production and inventory.
          </p>
        </div>

        {/* CTA */}
        <div className="csd-cta-section">
          <h2>Building a Manufacturing ERP?</h2>
          <p>
            We help manufacturers build production-grade ERP systems with real-time visibility. Let&apos;s
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
