import type { Metadata } from 'next';
import Link from 'next/link';
import '../../css/case-study-detail.css';

export const metadata: Metadata = {
  title: 'Event Ticketing Platform with Real-Time Availability — Case Study',
  description: 'How we built an event ticketing platform for 500+ events and 120K tickets — with scalable checkout, fraud prevention, refund workflows, and 99.5% availability accuracy.',
  keywords: ['event ticketing', 'event tech', 'FinTech', 'Stripe', 'real-time', 'SaaS', 'case study'],
  robots: { index: true, follow: true },
  authors: [{ name: 'Peregrine IT Solutions', url: 'https://peregrine-it.com' }],
  openGraph: {
    title: 'Case Study — Event Ticketing Platform with Real-Time Availability | Peregrine IT Solutions',
    description: 'How we built an event ticketing platform for 500+ events and 120K tickets with Stripe and Redis.',
    type: 'article',
    url: 'https://peregrine-it.com/case-studies/event-ticketing-platform',
    siteName: 'Peregrine IT Solutions',
    locale: 'en_US',
    images: [{ url: 'https://peregrine-it.com/ogimage.png', width: 1200, height: 630, alt: 'Event Ticketing Platform Case Study — Peregrine IT Solutions' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Case Study — Event Ticketing Platform with Real-Time Availability',
    description: 'Event ticketing platform for 500+ events and 120K tickets with 99.5% availability accuracy.',
    images: ['https://peregrine-it.com/ogimage.png'],
  },
  alternates: { canonical: 'https://peregrine-it.com/case-studies/event-ticketing-platform' },
};

export default function EventTicketingPlatform() {
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
            Event Ticketing Platform with <em>Real-Time Availability</em>
          </h1>

          <p className="csd-hero-sub">
            How we built an event ticketing platform for 500+ events and 120K tickets sold — with
            scalable checkout, fraud prevention, refund workflows, and 99.5% availability accuracy.
          </p>

          <div className="csd-hero-meta">
            <div className="csd-hero-meta-item">
              <div className="csd-hero-meta-label">Industry</div>
              <div className="csd-hero-meta-value">Events / E-Commerce</div>
            </div>
            <div className="csd-hero-meta-item">
              <div className="csd-hero-meta-label">Duration</div>
              <div className="csd-hero-meta-value">7 Months</div>
            </div>
            <div className="csd-hero-meta-item">
              <div className="csd-hero-meta-label">Services</div>
              <div className="csd-hero-meta-value">Full-Stack &middot; Stripe &middot; Redis</div>
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
                <i className="ri-calendar-event-line" style={{ fontSize: 28, color: '#4ade80' }} />
              </div>
              <div className="csd-placeholder-node">
                <i className="ri-ticket-2-line" style={{ fontSize: 28, color: '#4ade80' }} />
              </div>
              <div className="csd-placeholder-node">
                <i className="ri-shopping-cart-line" style={{ fontSize: 28, color: '#4ade80' }} />
              </div>
              <div className="csd-placeholder-node">
                <i className="ri-shield-check-line" style={{ fontSize: 28, color: '#4ade80' }} />
              </div>
              <div className="csd-placeholder-node">
                <i className="ri-refund-line" style={{ fontSize: 28, color: '#4ade80' }} />
              </div>
              <div className="csd-placeholder-node">
                <i className="ri-building-4-line" style={{ fontSize: 28, color: '#4ade80' }} />
              </div>
            </div>
            <p>Checkout &middot; Fraud Prevention &middot; Multi-Venue</p>
          </div>
        </div>
      </div>

      {/* ═══ CONTENT ═══ */}
      <div className="csd-content">
        {/* KEY STATS */}
        <div className="csd-stats-row">
          <div className="csd-stat-card">
            <div className="csd-stat-number">500+</div>
            <div className="csd-stat-label">Events</div>
          </div>
          <div className="csd-stat-card">
            <div className="csd-stat-number">120K</div>
            <div className="csd-stat-label">Tickets Sold</div>
          </div>
          <div className="csd-stat-card">
            <div className="csd-stat-number">99.5%</div>
            <div className="csd-stat-label">Availability Accuracy</div>
          </div>
          <div className="csd-stat-card">
            <div className="csd-stat-number">Multi-Venue</div>
            <div className="csd-stat-label">Support</div>
          </div>
        </div>

        {/* OVERVIEW */}
        <div className="csd-section">
          <div className="csd-section-label">Overview</div>
          <h2>The Client&apos;s Vision</h2>
          <p>
            An events company running concerts, conferences, and festivals across multiple venues
            was losing sales to double-bookings and slow checkout. Popular events would sell out in
            minutes — their legacy system couldn&apos;t handle concurrent purchases. Customers
            complained about over-sold seats and refund delays.
          </p>
          <p>
            They wanted a ticketing platform that could handle flash sales, prevent overselling with
            real-time inventory locks, detect fraud, and support refund workflows — plus
            multi-venue seat maps and tiered pricing.
          </p>
        </div>

        {/* CHALLENGES */}
        <div className="csd-section">
          <div className="csd-section-label">The Challenge</div>
          <h2>What Was Breaking</h2>

          <div className="csd-cs-grid">
            <div className="csd-cs-card csd-challenge">
              <div className="csd-cs-card-icon">
                <i className="ri-shopping-cart-line" />
              </div>
              <h4>Scalable Checkout</h4>
              <p>
                During flash sales, thousands of users added tickets to cart simultaneously. The old
                system reserved inventory at add-to-cart but didn&apos;t handle race conditions.
                Overselling was common.
              </p>
            </div>
            <div className="csd-cs-card csd-challenge">
              <div className="csd-cs-card-icon">
                <i className="ri-shield-check-line" />
              </div>
              <h4>Fraud Prevention</h4>
              <p>
                Bots and scalpers were buying tickets in bulk. Chargebacks and disputed transactions
                cost the business. No velocity checks or device fingerprinting — fraud went
                undetected until after the fact.
              </p>
            </div>
            <div className="csd-cs-card csd-challenge">
              <div className="csd-cs-card-icon">
                <i className="ri-refund-line" />
              </div>
              <h4>Refund Workflow</h4>
              <p>
                Refund requests were manually processed via email. No self-service portal.
                Cancelled events required batch refunds — the old system couldn&apos;t handle
                thousands of refunds at once.
              </p>
            </div>
            <div className="csd-cs-card csd-challenge">
              <div className="csd-cs-card-icon">
                <i className="ri-building-4-line" />
              </div>
              <h4>Multi-Venue Support</h4>
              <p>
                Different venues had different seat maps — some general admission, others reserved.
                The old system assumed a single venue model. Supporting multiple layouts and pricing
                tiers required custom code per event.
              </p>
            </div>
          </div>
        </div>

        {/* SOLUTION */}
        <div className="csd-section">
          <div className="csd-section-label">Our Approach</div>
          <h2>The Architecture We Built</h2>
          <p>
            We built a ticketing platform with Redis-based inventory locking, Stripe for payments,
            and Twilio for SMS confirmations. Inventory is reserved with time-limited locks (e.g.,
            10 minutes) at add-to-cart. Fraud detection uses velocity rules and Stripe Radar. Refund
            workflows are automated with configurable policies.
          </p>

          <div className="csd-arch-block">
            <h3>System Architecture</h3>
            <div className="csd-arch-layers">
              <div className="csd-arch-layer">
                <div className="csd-arch-layer-icon">
                  <i className="ri-window-line" />
                </div>
                <div className="csd-arch-layer-content">
                  <div className="csd-arch-layer-name">Next.js Event Catalog &amp; Checkout</div>
                  <div className="csd-arch-layer-desc">
                    Event discovery, seat map selection, and checkout flow. Admin portal for event
                    creation and venue management
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
                    Rate limiting and anti-bot measures. Optional account creation for returning
                    buyers. Guest checkout supported
                  </div>
                </div>
              </div>
              <div className="csd-arch-arrow">↓</div>

              <div className="csd-arch-layer">
                <div className="csd-arch-layer-icon">
                  <i className="ri-database-2-line" />
                </div>
                <div className="csd-arch-layer-content">
                  <div className="csd-arch-layer-name">PostgreSQL — Events, Orders &amp; Inventory</div>
                  <div className="csd-arch-layer-desc">
                    Events, venues, seat maps, ticket tiers. Orders and line items. Inventory
                    allocations with audit trail
                  </div>
                </div>
              </div>
              <div className="csd-arch-arrow">↓</div>

              <div className="csd-arch-layer">
                <div className="csd-arch-layer-icon">
                  <i className="ri-flashlight-line" />
                </div>
                <div className="csd-arch-layer-content">
                  <div className="csd-arch-layer-name">Redis — Real-Time Inventory Locks</div>
                  <div className="csd-arch-layer-desc">
                    Time-limited reservations per seat/tier. Atomic decrement on purchase. Lock
                    expiry returns inventory to pool. Prevents overselling
                  </div>
                </div>
              </div>
              <div className="csd-arch-arrow">↓</div>

              <div className="csd-arch-layer">
                <div className="csd-arch-layer-icon">
                  <i className="ri-bank-card-line" />
                </div>
                <div className="csd-arch-layer-content">
                  <div className="csd-arch-layer-name">Stripe &amp; Twilio — Payments &amp; Notifications</div>
                  <div className="csd-arch-layer-desc">
                    Stripe Checkout and Stripe Radar for fraud. Twilio SMS for order confirmation and
                    ticket delivery
                  </div>
                </div>
              </div>
            </div>
          </div>

          <p>
            Inventory locking was the critical piece. We use Redis Lua scripts for atomic
            reserve-and-lock. When a user adds tickets, we decrement available count and set an
            expiration. If they complete purchase, we confirm the allocation. If they abandon or
            expire, we release. Under load, Lua ensures no race conditions.
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
              <span className="csd-tech-icon"><i className="ri-flashlight-line" /></span> Redis
            </div>
            <div className="csd-tech-tag">
              <span className="csd-tech-icon"><i className="ri-bank-card-line" /></span> Stripe
            </div>
            <div className="csd-tech-tag">
              <span className="csd-tech-icon"><i className="ri-question-answer-line" /></span> Twilio
            </div>
            <div className="csd-tech-tag">
              <span className="csd-tech-icon"><i className="ri-shield-check-line" /></span> Fraud Prevention
            </div>
            <div className="csd-tech-tag">
              <span className="csd-tech-icon"><i className="ri-calendar-event-line" /></span> Multi-Venue
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
              <div className="csd-timeline-phase">Phase 1 — Weeks 1–2</div>
              <div className="csd-timeline-title">Discovery &amp; Data Model</div>
              <p className="csd-timeline-desc">
                Mapped event and venue workflows. Designed seat map and ticket tier models. Defined
                inventory locking strategy and Redis key structure.
              </p>
            </div>
            <div className="csd-timeline-item">
              <div className="csd-timeline-dot" />
              <div className="csd-timeline-phase">Phase 2 — Weeks 3–12</div>
              <div className="csd-timeline-title">Core Platform &amp; Checkout</div>
              <p className="csd-timeline-desc">
                Built event catalog and seat map selector. Implemented Redis-based inventory locks
                with Lua scripts. Integrated Stripe Checkout. Developed order confirmation and ticket
                delivery flow.
              </p>
            </div>
            <div className="csd-timeline-item">
              <div className="csd-timeline-dot" />
              <div className="csd-timeline-phase">Phase 3 — Weeks 13–20</div>
              <div className="csd-timeline-title">Fraud &amp; Refund Workflows</div>
              <p className="csd-timeline-desc">
                Configured Stripe Radar rules. Built velocity and device checks. Implemented refund
                workflow with policy engine. Added Twilio SMS for confirmations.
              </p>
            </div>
            <div className="csd-timeline-item">
              <div className="csd-timeline-dot" />
              <div className="csd-timeline-phase">Phase 4 — Weeks 21–28</div>
              <div className="csd-timeline-title">Multi-Venue &amp; Load Test</div>
              <p className="csd-timeline-desc">
                Extended seat maps for multiple venue types. Load-tested with simulated flash sale
                (5K concurrent users). Phased rollout — 50 events first, then full catalog.
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
              <div className="csd-result-before">Overselling</div>
              <div className="csd-result-after">99.5% accuracy</div>
              <div className="csd-result-label">Real-time inventory locks prevent double-sale</div>
            </div>
            <div className="csd-result-card">
              <div className="csd-result-before">500+ events</div>
              <div className="csd-result-after">Supported</div>
              <div className="csd-result-label">Multi-venue seat maps and tiered pricing</div>
            </div>
            <div className="csd-result-card">
              <div className="csd-result-before">120K tickets</div>
              <div className="csd-result-after">Sold</div>
              <div className="csd-result-label">Scalable checkout under flash sale load</div>
            </div>
            <div className="csd-result-card">
              <div className="csd-result-before">Refund delays</div>
              <div className="csd-result-after">Automated</div>
              <div className="csd-result-label">Self-service and batch refund workflows</div>
            </div>
          </div>
        </div>

        {/* QUOTE */}
        <div className="csd-quote-block">
          <div className="csd-quote-text">
            &ldquo;We used to oversell every popular event. Now we have real-time locks and 99.5%
            accuracy. The fraud prevention cut our chargebacks in half. Refunds happen in minutes,
            not days.&rdquo;
          </div>
          <div className="csd-quote-author">— COO, Events Company</div>
        </div>

        {/* KEY TAKEAWAYS */}
        <div className="csd-section">
          <div className="csd-section-label">Key Takeaways</div>
          <h2>What Made This Work</h2>
          <p>
            Ticketing inventory is a classic concurrent access problem. Redis with Lua scripts gave us
            atomic operations — reserve, confirm, release. Lock expiry (e.g., 10 minutes) is critical;
            too short and users lose their selection mid-checkout, too long and inventory is
            stranded. We tune per event type.
          </p>
          <p>
            Stripe Radar plus custom velocity rules caught most fraud. We added device fingerprinting
            and blocked high-risk patterns (many cards, same IP). The tradeoff is false positives —
            some legitimate buyers get blocked. We built an override flow for support to manually
            approve.
          </p>
          <p>
            Multi-venue support required an abstract seat map model. We defined zones (GA vs
            reserved), tiers (VIP, standard), and capacity per zone. Each venue maps to this model.
            General admission is a single zone with capacity; reserved seating uses a grid. The
            checkout UI adapts to the map type.
          </p>
        </div>

        {/* CTA */}
        <div className="csd-cta-section">
          <h2>Building an Event Ticketing Platform?</h2>
          <p>
            We help events and e-commerce companies build production-grade ticketing systems. Let&apos;s
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
