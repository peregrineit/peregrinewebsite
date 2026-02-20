import type { Metadata } from 'next';
import Link from 'next/link';
import '../../css/case-study-detail.css';

export const metadata: Metadata = {
  title: 'Fitness Subscription App with Workout Tracking & Live Classes — Case Study',
  description: 'How we built a fitness subscription app with 80K+ subscribers, 2M+ workouts logged, 4.8 app rating — featuring video streaming, workout sync, subscription management, and offline mode.',
  keywords: ['fitness app', 'wellness', 'subscription', 'mobile app', 'video streaming', 'SaaS', 'case study'],
  robots: { index: true, follow: true },
  authors: [{ name: 'Peregrine IT Solutions', url: 'https://peregrine-it.com' }],
  openGraph: {
    title: 'Case Study — Fitness Subscription App with Workout Tracking & Live Classes | Peregrine IT Solutions',
    description: 'How we built a fitness app with 80K+ subscribers, 2M+ workouts, and 4.8 app rating with video and offline.',
    type: 'article',
    url: 'https://peregrine-it.com/case-studies/fitness-wellness-subscription-app',
    siteName: 'Peregrine IT Solutions',
    locale: 'en_US',
    images: [{ url: 'https://peregrine-it.com/ogimage.png', width: 1200, height: 630, alt: 'Fitness Subscription App Case Study — Peregrine IT Solutions' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Case Study — Fitness Subscription App with Workout Tracking & Live Classes',
    description: 'Fitness app with 80K+ subscribers, 2M+ workouts, and live video streaming.',
    images: ['https://peregrine-it.com/ogimage.png'],
  },
  alternates: { canonical: 'https://peregrine-it.com/case-studies/fitness-wellness-subscription-app' },
};

export default function FitnessWellnessSubscriptionApp() {
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
            Fitness Subscription App with <em>Workout Tracking &amp; Live Classes</em>
          </h1>

          <p className="csd-hero-sub">
            How we built a fitness subscription app with on-demand and live video classes, workout
            tracking, and offline mode — serving 80K+ subscribers, 2M+ workouts logged, and a
            4.8 app store rating.
          </p>

          <div className="csd-hero-meta">
            <div className="csd-hero-meta-item">
              <div className="csd-hero-meta-label">Industry</div>
              <div className="csd-hero-meta-value">Health &amp; Wellness</div>
            </div>
            <div className="csd-hero-meta-item">
              <div className="csd-hero-meta-label">Duration</div>
              <div className="csd-hero-meta-value">7 Months</div>
            </div>
            <div className="csd-hero-meta-item">
              <div className="csd-hero-meta-label">Services</div>
              <div className="csd-hero-meta-value">Mobile &middot; Video &middot; Subscriptions</div>
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
                <i className="ri-run-line" style={{ fontSize: 28, color: '#a78bfa' }} />
              </div>
              <div className="csd-placeholder-node">
                <i className="ri-video-line" style={{ fontSize: 28, color: '#a78bfa' }} />
              </div>
              <div className="csd-placeholder-node">
                <i className="ri-pie-chart-line" style={{ fontSize: 28, color: '#a78bfa' }} />
              </div>
              <div className="csd-placeholder-node">
                <i className="ri-vip-crown-line" style={{ fontSize: 28, color: '#a78bfa' }} />
              </div>
              <div className="csd-placeholder-node">
                <i className="ri-smartphone-line" style={{ fontSize: 28, color: '#a78bfa' }} />
              </div>
              <div className="csd-placeholder-node">
                <i className="ri-cloud-off-line" style={{ fontSize: 28, color: '#a78bfa' }} />
              </div>
            </div>
            <p>Fitness App &middot; Live &amp; On-Demand</p>
          </div>
        </div>
      </div>

      {/* ═══ CONTENT ═══ */}
      <div className="csd-content">
        {/* KEY STATS */}
        <div className="csd-stats-row">
          <div className="csd-stat-card">
            <div className="csd-stat-number">80K+</div>
            <div className="csd-stat-label">Subscribers</div>
          </div>
          <div className="csd-stat-card">
            <div className="csd-stat-number">2M+</div>
            <div className="csd-stat-label">Workouts Logged</div>
          </div>
          <div className="csd-stat-card">
            <div className="csd-stat-number">4.8</div>
            <div className="csd-stat-label">App Rating</div>
          </div>
          <div className="csd-stat-card">
            <div className="csd-stat-number">Live</div>
            <div className="csd-stat-label">Classes</div>
          </div>
        </div>

        {/* OVERVIEW */}
        <div className="csd-section">
          <div className="csd-section-label">Overview</div>
          <h2>The Client&apos;s Vision</h2>
          <p>
            A fitness brand with a loyal following wanted to transition from in-person studio
            classes to a digital subscription model. They had a library of recorded workouts and
            plans to add live classes with real-time instructor interaction. Their existing app
            was a simple video player — no workout tracking, no progress history, and no offline
            support. Subscribers complained about buffering during peak hours and the inability
            to workout in gyms or outdoors without Wi‑Fi.
          </p>
          <p>
            They needed a React Native app with high-quality video streaming (on-demand and live),
            workout tracking that synced progress across devices, subscription management via
            Stripe with trials and upgrades, and an offline mode that let users download classes
            for use without connectivity. The app had to feel native — smooth scrolling, quick
            load times, and a 4.8+ rating target. Live classes required low-latency streaming;
            we evaluated Agora and Twilio for real-time video.
          </p>
        </div>

        {/* CHALLENGES */}
        <div className="csd-section">
          <div className="csd-section-label">The Challenge</div>
          <h2>What Was Breaking</h2>

          <div className="csd-cs-grid">
            <div className="csd-cs-card csd-challenge">
              <div className="csd-cs-card-icon">
                <i className="ri-video-line" />
              </div>
              <h4>Video Streaming</h4>
              <p>
                On-demand videos buffered during morning and evening rush. Live classes had 5–10
                second latency — by the time users saw the move, the instructor was already on
                the next one. No adaptive bitrate for varying connections.
              </p>
            </div>
            <div className="csd-cs-card csd-challenge">
              <div className="csd-cs-card-icon">
                <i className="ri-refresh-line" />
              </div>
              <h4>Workout Sync</h4>
              <p>
                Users logged workouts on one device and switched to another — progress didn&apos;t
                follow. No cross-device history. Recommended &ldquo;next workout&rdquo; logic
                didn&apos;t account for completed sessions.
              </p>
            </div>
            <div className="csd-cs-card csd-challenge">
              <div className="csd-cs-card-icon">
                <i className="ri-vip-crown-line" />
              </div>
              <h4>Subscription Management</h4>
              <p>
                Trials, monthly, and annual plans lived in separate flows. Upgrades and
                cancellations required support. Webhook handling was incomplete — some cancellations
                didn&apos;t revoke access promptly.
              </p>
            </div>
            <div className="csd-cs-card csd-challenge">
              <div className="csd-cs-card-icon">
                <i className="ri-cloud-off-line" />
              </div>
              <h4>Offline Mode</h4>
              <p>
                Many users worked out in gyms with poor cell service or ran outdoors without
                data. There was no way to download classes. The app was unusable without
                connectivity — a major churn driver.
              </p>
            </div>
          </div>
        </div>

        {/* SOLUTION */}
        <div className="csd-section">
          <div className="csd-section-label">Our Approach</div>
          <h2>The Architecture We Built</h2>
          <p>
            We built a React Native app with a Node.js backend. On-demand video uses HLS via AWS
            MediaConvert and CloudFront; we added adaptive bitrate so mobile users get lower
            quality during slow connections. Live classes use Agora (with Twilio fallback) for
            sub-second latency. Workout tracking stores completed sessions in PostgreSQL and syncs
            via a REST API with conflict resolution. Stripe powers subscriptions with a single
            webhook handler that updates access and triggers in-app notifications. Offline mode
            downloads encrypted video segments to local storage; the app checks entitlement before
            playback.
          </p>

          <div className="csd-arch-block">
            <h3>System Architecture</h3>
            <div className="csd-arch-layers">
              <div className="csd-arch-layer">
                <div className="csd-arch-layer-icon">
                  <i className="ri-smartphone-line" />
                </div>
                <div className="csd-arch-layer-content">
                  <div className="csd-arch-layer-name">React Native — iOS &amp; Android App</div>
                  <div className="csd-arch-layer-desc">
                    Video player (HLS + offline), workout tracking UI, subscription management,
                    and live class viewer. Native modules for background download and storage
                  </div>
                </div>
              </div>
              <div className="csd-arch-arrow">↓</div>

              <div className="csd-arch-layer">
                <div className="csd-arch-layer-icon">
                  <i className="ri-server-line" />
                </div>
                <div className="csd-arch-layer-content">
                  <div className="csd-arch-layer-name">Node.js API &amp; Auth</div>
                  <div className="csd-arch-layer-desc">
                    User auth, workout sync, subscription status, and content metadata. Integrates
                    Stripe webhooks, Agora/Twilio tokens, and AWS signed URLs
                  </div>
                </div>
              </div>
              <div className="csd-arch-arrow">↓</div>

              <div className="csd-arch-layer">
                <div className="csd-arch-layer-icon">
                  <i className="ri-video-add-line" />
                </div>
                <div className="csd-arch-layer-content">
                  <div className="csd-arch-layer-name">Video Pipeline — HLS &amp; Live (Agora/Twilio)</div>
                  <div className="csd-arch-layer-desc">
                    On-demand: AWS MediaConvert + CloudFront HLS. Live: Agora SDK for low-latency
                    streaming. Token-based access control
                  </div>
                </div>
              </div>
              <div className="csd-arch-arrow">↓</div>

              <div className="csd-arch-layer">
                <div className="csd-arch-layer-icon">
                  <i className="ri-database-2-line" />
                </div>
                <div className="csd-arch-layer-content">
                  <div className="csd-arch-layer-name">PostgreSQL — Users, Workouts &amp; Content</div>
                  <div className="csd-arch-layer-desc">
                    Users, workouts, content catalog, and subscription state. Workout sync with
                    last-write-wins and timestamp reconciliation
                  </div>
                </div>
              </div>
              <div className="csd-arch-arrow">↓</div>

              <div className="csd-arch-layer">
                <div className="csd-arch-layer-icon">
                  <i className="ri-bank-card-line" />
                </div>
                <div className="csd-arch-layer-content">
                  <div className="csd-arch-layer-name">Stripe — Subscriptions &amp; Entitlements</div>
                  <div className="csd-arch-layer-desc">
                    Monthly and annual plans with trials. Webhook handler for subscription lifecycle.
                    Access grants and revocations in real time
                  </div>
                </div>
              </div>
            </div>
          </div>

          <p>
            Offline mode was the most complex piece. We built a download manager that fetches HLS
            segments, stores them encrypted, and registers them in a local SQLite index. The video
            player checks the index first — if segments exist locally, playback is from disk.
            Entitlement is checked at download time and at playback; expired subscribers lose
            access to downloaded content. We added a 48-hour grace period for subscriptions that
            failed to renew, reducing involuntary churn.
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
              <span className="csd-tech-icon"><i className="ri-nodejs-line" /></span> Node.js
            </div>
            <div className="csd-tech-tag">
              <span className="csd-tech-icon"><i className="ri-database-2-line" /></span> PostgreSQL
            </div>
            <div className="csd-tech-tag">
              <span className="csd-tech-icon"><i className="ri-amazon-line" /></span> AWS
            </div>
            <div className="csd-tech-tag">
              <span className="csd-tech-icon"><i className="ri-bank-card-line" /></span> Stripe
            </div>
            <div className="csd-tech-tag">
              <span className="csd-tech-icon"><i className="ri-video-line" /></span> Agora/Twilio
            </div>
            <div className="csd-tech-tag">
              <span className="csd-tech-icon"><i className="ri-film-line" /></span> HLS
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
              <div className="csd-timeline-title">Discovery &amp; Video Strategy</div>
              <p className="csd-timeline-desc">
                Audited existing video library and live class requirements. Evaluated Agora vs.
                Twilio for live streaming. Designed HLS pipeline and offline download architecture.
                Defined workout tracking schema and sync protocol.
              </p>
            </div>
            <div className="csd-timeline-item">
              <div className="csd-timeline-dot" />
              <div className="csd-timeline-phase">Phase 2 — Weeks 5–14</div>
              <div className="csd-timeline-title">Core App &amp; Video Playback</div>
              <p className="csd-timeline-desc">
                Built React Native app with video player (HLS.js / exo). Implemented Node.js API
                for content and auth. Integrated Stripe subscriptions with webhooks. Added workout
                tracking and sync.
              </p>
            </div>
            <div className="csd-timeline-item">
              <div className="csd-timeline-dot" />
              <div className="csd-timeline-phase">Phase 3 — Weeks 15–24</div>
              <div className="csd-timeline-title">Live Classes &amp; Offline Mode</div>
              <p className="csd-timeline-desc">
                Integrated Agora for live streaming. Built offline download manager with encrypted
                storage. Added subscription grace period and entitlement checks. Optimized for
                performance and battery.
              </p>
            </div>
            <div className="csd-timeline-item">
              <div className="csd-timeline-dot" />
              <div className="csd-timeline-phase">Phase 4 — Weeks 25–28</div>
              <div className="csd-timeline-title">Polish, Launch &amp; Scale</div>
              <p className="csd-timeline-desc">
                Beta with 2K users. Fixed playback and sync edge cases. Launched to 80K+ subscribers.
                Monitored retention and churn. Achieved 4.8 app store rating and 2M+ workouts logged.
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
              <div className="csd-result-before">Buffering complaints</div>
              <div className="csd-result-after">Adaptive HLS</div>
              <div className="csd-result-label">Smooth playback on varying connections</div>
            </div>
            <div className="csd-result-card">
              <div className="csd-result-before">No offline</div>
              <div className="csd-result-after">Download &amp; go</div>
              <div className="csd-result-label">Work out anywhere without connectivity</div>
            </div>
            <div className="csd-result-card">
              <div className="csd-result-before">5–10s live latency</div>
              <div className="csd-result-after">Sub-second</div>
              <div className="csd-result-label">Agora-powered real-time classes</div>
            </div>
            <div className="csd-result-card">
              <div className="csd-result-before">Support-driven subs</div>
              <div className="csd-result-after">Self-service</div>
              <div className="csd-result-label">Stripe + webhooks for instant access</div>
            </div>
          </div>
        </div>

        {/* QUOTE */}
        <div className="csd-quote-block">
          <div className="csd-quote-text">
            &ldquo;We went from a basic video app to a full fitness platform. Our subscribers can
            now workout in the gym without Wi‑Fi, join live classes without lag, and see their
            progress across devices. The 4.8 rating and 2M+ workouts logged speak for themselves.&rdquo;
          </div>
          <div className="csd-quote-author">— Head of Product, Fitness Brand</div>
        </div>

        {/* KEY TAKEAWAYS */}
        <div className="csd-section">
          <div className="csd-section-label">Key Takeaways</div>
          <h2>What Made This Work</h2>
          <p>
            Fitness apps live or die by video quality and offline support. Users work out in
            environments with unreliable connectivity — gyms, parks, hotels. Adaptive bitrate HLS
            eliminated buffering complaints. Offline downloads were a top feature request; we
            built a background download manager that respects storage limits and battery. Users
            can queue classes before a trip and watch without data. That drove significant
            retention improvement.
          </p>
          <p>
            Live classes needed sub-second latency. Pre-recorded HLS has 10–30 second delay,
            which is fine for on-demand but unusable for live. Agora gave us real-time streaming
            with interactive features (chat, reactions). We added Twilio as fallback for regions
            where Agora has issues. The live class adoption exceeded expectations — 30% of
            subscribers joined at least one live session per week.
          </p>
          <p>
            Workout sync had to be seamless. Users switch between phone and tablet; progress must
            follow. We use last-write-wins with server timestamps — conflicts are rare (same user,
            same workout) but we handle them gracefully. The &ldquo;next workout&rdquo;
            recommendations use completed sessions to avoid repetition and encourage variety.
            That drove engagement: users who tracked 5+ workouts had 2x retention vs. those
            who didn&apos;t.
          </p>
        </div>

        {/* CTA */}
        <div className="csd-cta-section">
          <h2>Building a Fitness or Wellness App?</h2>
          <p>
            We help health &amp; wellness brands build subscription apps with video, tracking, and
            offline. Let&apos;s talk about your architecture.
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
