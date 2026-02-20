import type { Metadata } from 'next';
import Link from 'next/link';
import '../../css/case-study-detail.css';

export const metadata: Metadata = {
  title: 'Restaurant POS & Online Ordering for QSR Chains — Case Study',
  description: 'How we built a restaurant POS and online ordering platform for QSR chains — 120+ locations, 25K daily orders, 98% uptime, with offline-first POS, kitchen display, and multi-location sync.',
  keywords: ['restaurant POS', 'FoodTech', 'online ordering', 'QSR', 'kitchen display', 'SaaS', 'case study'],
  robots: { index: true, follow: true },
  authors: [{ name: 'Peregrine IT Solutions', url: 'https://peregrine-it.com' }],
  openGraph: {
    title: 'Case Study — Restaurant POS & Online Ordering for QSR Chains | Peregrine IT Solutions',
    description: 'How we built a POS and online ordering platform for 120+ locations with 25K daily orders and 98% uptime.',
    type: 'article',
    url: 'https://peregrine-it.com/case-studies/restaurant-pos-ordering-system',
    siteName: 'Peregrine IT Solutions',
    locale: 'en_US',
    images: [{ url: 'https://peregrine-it.com/ogimage.png', width: 1200, height: 630, alt: 'Restaurant POS & Ordering Case Study — Peregrine IT Solutions' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Case Study — Restaurant POS & Online Ordering for QSR Chains',
    description: 'POS and online ordering platform for 120+ locations with offline-first and kitchen display.',
    images: ['https://peregrine-it.com/ogimage.png'],
  },
  alternates: { canonical: 'https://peregrine-it.com/case-studies/restaurant-pos-ordering-system' },
};

export default function RestaurantPOSOrderingSystem() {
  return (
    <div className="case-study-detail csd-green-accent">
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
            Restaurant POS &amp; Online Ordering for <em>QSR Chains</em>
          </h1>

          <p className="csd-hero-sub">
            How we built a restaurant POS and online ordering platform for QSR chains — with
            offline-first tablets, kitchen display systems, multi-location sync, and payment
            reconciliation — serving 120+ locations and 25K daily orders at 98% uptime.
          </p>

          <div className="csd-hero-meta">
            <div className="csd-hero-meta-item">
              <div className="csd-hero-meta-label">Industry</div>
              <div className="csd-hero-meta-value">Hospitality / FoodTech</div>
            </div>
            <div className="csd-hero-meta-item">
              <div className="csd-hero-meta-label">Duration</div>
              <div className="csd-hero-meta-value">8 Months</div>
            </div>
            <div className="csd-hero-meta-item">
              <div className="csd-hero-meta-label">Services</div>
              <div className="csd-hero-meta-value">Full-Stack &middot; Mobile &middot; Real-Time</div>
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
                <i className="ri-tablet-line" style={{ fontSize: 28, color: '#4ade80' }} />
              </div>
              <div className="csd-placeholder-node">
                <i className="ri-restaurant-2-line" style={{ fontSize: 28, color: '#4ade80' }} />
              </div>
              <div className="csd-placeholder-node">
                <i className="ri-shopping-bag-line" style={{ fontSize: 28, color: '#4ade80' }} />
              </div>
              <div className="csd-placeholder-node">
                <i className="ri-bank-card-line" style={{ fontSize: 28, color: '#4ade80' }} />
              </div>
              <div className="csd-placeholder-node">
                <i className="ri-cloud-off-line" style={{ fontSize: 28, color: '#4ade80' }} />
              </div>
              <div className="csd-placeholder-node">
                <i className="ri-building-4-line" style={{ fontSize: 28, color: '#4ade80' }} />
              </div>
            </div>
            <p>POS &amp; Online Ordering &middot; Offline-First</p>
          </div>
        </div>
      </div>

      {/* ═══ CONTENT ═══ */}
      <div className="csd-content">
        {/* KEY STATS */}
        <div className="csd-stats-row">
          <div className="csd-stat-card">
            <div className="csd-stat-number">120+</div>
            <div className="csd-stat-label">Locations</div>
          </div>
          <div className="csd-stat-card">
            <div className="csd-stat-number">25K</div>
            <div className="csd-stat-label">Daily Orders</div>
          </div>
          <div className="csd-stat-card">
            <div className="csd-stat-number">98%</div>
            <div className="csd-stat-label">Uptime</div>
          </div>
          <div className="csd-stat-card">
            <div className="csd-stat-number">Offline</div>
            <div className="csd-stat-label">POS Capable</div>
          </div>
        </div>

        {/* OVERVIEW */}
        <div className="csd-section">
          <div className="csd-section-label">Overview</div>
          <h2>The Client&apos;s Vision</h2>
          <p>
            A QSR (Quick Service Restaurant) chain with 120+ locations was stuck on legacy POS
            hardware that couldn&apos;t integrate with their growing online ordering channel. In-store
            and online orders lived in separate systems — managers had to manually reconcile
            daily sales across two spreadsheets. When the internet went down (common in strip malls
            and food courts), the POS froze and locations had to turn away customers. Kitchen
            printers churned out orders with no digital display; during rush, tickets piled up and
            cooks lost track of modifiers and special requests.
          </p>
          <p>
            They needed a unified platform: a tablet-based POS that worked offline and synced when
            connectivity returned, a kitchen display system that showed orders in real time with
            modifiers highlighted, online ordering that fed directly into the same order queue, and
            multi-location reporting with automatic payment reconciliation. The system had to
            handle 25K daily orders across 120 locations without latency or data loss.
          </p>
        </div>

        {/* CHALLENGES */}
        <div className="csd-section">
          <div className="csd-section-label">The Challenge</div>
          <h2>What Was Breaking</h2>

          <div className="csd-cs-grid">
            <div className="csd-cs-card csd-challenge">
              <div className="csd-cs-card-icon">
                <i className="ri-wifi-off-line" />
              </div>
              <h4>Offline-First POS</h4>
              <p>
                Restaurant internet is unreliable — strip malls, food courts, and rural locations
                often have outages. Legacy POS required constant connectivity. When the network
                dropped, registers froze and locations lost sales.
              </p>
            </div>
            <div className="csd-cs-card csd-challenge">
              <div className="csd-cs-card-icon">
                <i className="ri-tv-2-line" />
              </div>
              <h4>Kitchen Display</h4>
              <p>
                Paper tickets were hard to read during rush. Modifiers and special requests got
                missed. There was no way to prioritize or bump orders. Cooks had to manually
                track which orders were in progress vs. ready.
              </p>
            </div>
            <div className="csd-cs-card csd-challenge">
              <div className="csd-cs-card-icon">
                <i className="ri-refresh-line" />
              </div>
              <h4>Multi-Location Sync</h4>
              <p>
                Menu changes, pricing updates, and promotions had to be pushed to all 120 locations.
                There was no central source of truth — some locations ran outdated menus. Online
                orders sometimes showed items that weren&apos;t available in-store.
              </p>
            </div>
            <div className="csd-cs-card csd-challenge">
              <div className="csd-cs-card-icon">
                <i className="ri-money-dollar-circle-line" />
              </div>
              <h4>Payment Reconciliation</h4>
              <p>
                In-store POS, online orders, and third-party delivery had different payment flows.
                Reconciling daily sales took managers an hour per location. Discrepancies between
                Stripe, terminal, and internal records were common.
              </p>
            </div>
          </div>
        </div>

        {/* SOLUTION */}
        <div className="csd-section">
          <div className="csd-section-label">Our Approach</div>
          <h2>The Architecture We Built</h2>
          <p>
            We built a React Native POS app that runs on tablets with a local SQLite database for
            offline order storage. When connectivity returns, orders sync to the cloud via a
            conflict-resolution protocol. The Next.js online ordering site and admin portal share
            the same Node.js API. Kitchen displays are web clients that subscribe to order events
            via WebSocket. PostgreSQL holds menus, orders, and transactions; Redis caches
            real-time order state. Stripe handles all payments — in-store via Terminal API, online
            via Checkout. A reconciliation job runs nightly to match transactions across channels.
          </p>

          <div className="csd-arch-block">
            <h3>System Architecture</h3>
            <div className="csd-arch-layers">
              <div className="csd-arch-layer">
                <div className="csd-arch-layer-icon">
                  <i className="ri-tablet-line" />
                </div>
                <div className="csd-arch-layer-content">
                  <div className="csd-arch-layer-name">React Native POS &amp; Kitchen Display</div>
                  <div className="csd-arch-layer-desc">
                    Tablet POS with offline SQLite, order entry, and payment. Kitchen display
                    tablets showing live order queue with modifiers and bump buttons
                  </div>
                </div>
              </div>
              <div className="csd-arch-arrow">↓</div>

              <div className="csd-arch-layer">
                <div className="csd-arch-layer-icon">
                  <i className="ri-reactjs-line" />
                </div>
                <div className="csd-arch-layer-content">
                  <div className="csd-arch-layer-name">Next.js — Online Ordering &amp; Admin</div>
                  <div className="csd-arch-layer-desc">
                    Customer-facing ordering site with location picker and menu. Admin portal for
                    menu management, location config, and reporting
                  </div>
                </div>
              </div>
              <div className="csd-arch-arrow">↓</div>

              <div className="csd-arch-layer">
                <div className="csd-arch-layer-icon">
                  <i className="ri-server-line" />
                </div>
                <div className="csd-arch-layer-content">
                  <div className="csd-arch-layer-name">Node.js API &amp; Order Sync</div>
                  <div className="csd-arch-layer-desc">
                    Order ingestion from POS and web. Conflict resolution for offline sync. WebSocket
                    for real-time kitchen display updates
                  </div>
                </div>
              </div>
              <div className="csd-arch-arrow">↓</div>

              <div className="csd-arch-layer">
                <div className="csd-arch-layer-icon">
                  <i className="ri-database-2-line" />
                </div>
                <div className="csd-arch-layer-content">
                  <div className="csd-arch-layer-name">PostgreSQL — Menus, Orders &amp; Transactions</div>
                  <div className="csd-arch-layer-desc">
                    Locations, menus, modifiers, orders, and payment records. Multi-tenant with
                    location-level isolation. Versioned menu config for rollout
                  </div>
                </div>
              </div>
              <div className="csd-arch-arrow">↓</div>

              <div className="csd-arch-layer">
                <div className="csd-arch-layer-icon">
                  <i className="ri-flashlight-line" />
                </div>
                <div className="csd-arch-layer-content">
                  <div className="csd-arch-layer-name">Redis &amp; Stripe — Cache &amp; Payments</div>
                  <div className="csd-arch-layer-desc">
                    Redis for order queue state and WebSocket pub/sub. Stripe for in-store Terminal
                    and online Checkout. Nightly reconciliation job
                  </div>
                </div>
              </div>
            </div>
          </div>

          <p>
            Offline sync was the trickiest piece. We use a last-write-wins approach with server
            timestamps for conflict resolution. POS orders get a local UUID and sync when online —
            if two locations somehow create conflicting IDs (edge case), the server dedupes by
            order content and timestamp. We tested extensively with simulated network outages;
            zero order loss in production.
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
              <span className="csd-tech-icon"><i className="ri-bank-card-line" /></span> Stripe
            </div>
            <div className="csd-tech-tag">
              <span className="csd-tech-icon"><i className="ri-cloud-line" /></span> WebSocket
            </div>
            <div className="csd-tech-tag">
              <span className="csd-tech-icon"><i className="ri-database-line" /></span> SQLite
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
              <div className="csd-timeline-title">Discovery &amp; Offline Design</div>
              <p className="csd-timeline-desc">
                Mapped POS and online ordering workflows. Designed offline-first data model and
                sync protocol. Defined menu and modifier schema for multi-location. Evaluated
                Stripe Terminal for in-store payments.
              </p>
            </div>
            <div className="csd-timeline-item">
              <div className="csd-timeline-dot" />
              <div className="csd-timeline-phase">Phase 2 — Weeks 5–16</div>
              <div className="csd-timeline-title">POS &amp; Kitchen Display</div>
              <p className="csd-timeline-desc">
                Built React Native POS with SQLite and sync logic. Implemented kitchen display with
                WebSocket order stream. Integrated Stripe Terminal for in-store. Tested offline
                scenarios at pilot location.
              </p>
            </div>
            <div className="csd-timeline-item">
              <div className="csd-timeline-dot" />
              <div className="csd-timeline-phase">Phase 3 — Weeks 17–24</div>
              <div className="csd-timeline-title">Online Ordering &amp; Admin</div>
              <p className="csd-timeline-desc">
                Built Next.js ordering site with location picker and Stripe Checkout. Admin portal
                for menu management and multi-location rollout. Implemented reconciliation job for
                daily payment matching.
              </p>
            </div>
            <div className="csd-timeline-item">
              <div className="csd-timeline-dot" />
              <div className="csd-timeline-phase">Phase 4 — Weeks 25–32</div>
              <div className="csd-timeline-title">Rollout &amp; Scale</div>
              <p className="csd-timeline-desc">
                Rolled out to 120 locations in waves. Trained staff on POS and kitchen display.
                Monitored sync health and reconciliation accuracy. Achieved 98% uptime and zero
                order loss during rollout.
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
              <div className="csd-result-before">POS downtime</div>
              <div className="csd-result-after">Offline capable</div>
              <div className="csd-result-label">Sales continue during internet outages</div>
            </div>
            <div className="csd-result-card">
              <div className="csd-result-before">Paper tickets</div>
              <div className="csd-result-after">Digital KDS</div>
              <div className="csd-result-label">Kitchen display with live updates</div>
            </div>
            <div className="csd-result-card">
              <div className="csd-result-before">Manual reconciliation</div>
              <div className="csd-result-after">Automated daily</div>
              <div className="csd-result-label">Stripe + internal alignment</div>
            </div>
            <div className="csd-result-card">
              <div className="csd-result-before">Split systems</div>
              <div className="csd-result-after">Unified platform</div>
              <div className="csd-result-label">POS, web, and admin in one system</div>
            </div>
          </div>
        </div>

        {/* QUOTE */}
        <div className="csd-quote-block">
          <div className="csd-quote-text">
            &ldquo;When the internet goes down in a food court, we used to shut the register. Now we
            keep selling — orders sync when we&apos;re back online. The kitchen display alone
            cut our modifier errors by half. Managers finally have one report instead of three
            spreadsheets.&rdquo;
          </div>
          <div className="csd-quote-author">— VP of Operations, QSR Chain</div>
        </div>

        {/* KEY TAKEAWAYS */}
        <div className="csd-section">
          <div className="csd-section-label">Key Takeaways</div>
          <h2>What Made This Work</h2>
          <p>
            Offline-first is non-negotiable for restaurant POS. Internet in restaurants is
            notoriously bad — we designed the POS to assume connectivity is intermittent. Local
            SQLite holds everything needed to take and complete orders; sync runs in the
            background when the network is available. We use idempotent API design so retries
            never create duplicates. Zero order loss in 18 months of production.
          </p>
          <p>
            Kitchen display drove significant operational improvement. Cooks see orders in
            chronological order with modifiers and special requests highlighted. Bump buttons
            move orders through stages (prep, cooking, ready) so the front knows when to call
            for pickup. The client reported a 50% reduction in modifier-related remakes after
            rollout.
          </p>
          <p>
            Payment reconciliation was a hidden time-sink. In-store Stripe Terminal, online
            Checkout, and refunds flow differently. We built a nightly job that matches
            transaction IDs, amounts, and locations. Discrepancies trigger alerts for manager
            review. That cut reconciliation time from an hour per location to minutes.
          </p>
        </div>

        {/* CTA */}
        <div className="csd-cta-section">
          <h2>Building a Restaurant POS or Ordering Platform?</h2>
          <p>
            We help hospitality and FoodTech companies build offline-capable POS, kitchen displays,
            and unified ordering systems. Let&apos;s talk about your architecture.
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
