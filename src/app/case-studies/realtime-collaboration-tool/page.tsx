import type { Metadata } from 'next';
import Link from 'next/link';
import '../../css/case-study-detail.css';

export const metadata: Metadata = {
  title: 'Real-Time Collaboration Tool for Documents & Chat — Case Study',
  description: 'How we built a real-time collaboration platform for 5K+ workspaces and 25K users — with operational transform, presence, permissions, and offline sync achieving <100ms sync latency.',
  keywords: ['real-time collaboration', 'document editing', 'SaaS', 'WebSocket', 'CRDT', 'case study'],
  robots: { index: true, follow: true },
  authors: [{ name: 'Peregrine IT Solutions', url: 'https://peregrine-it.com' }],
  openGraph: {
    title: 'Case Study — Real-Time Collaboration Tool for Documents & Chat | Peregrine IT Solutions',
    description: 'How we built a real-time collaboration platform for 5K+ workspaces with WebSocket and CRDT.',
    type: 'article',
    url: 'https://peregrine-it.com/case-studies/realtime-collaboration-tool',
    siteName: 'Peregrine IT Solutions',
    locale: 'en_US',
    images: [{ url: 'https://peregrine-it.com/ogimage.png', width: 1200, height: 630, alt: 'Real-Time Collaboration Tool Case Study — Peregrine IT Solutions' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Case Study — Real-Time Collaboration Tool for Documents & Chat',
    description: 'Real-time collaboration platform for 5K+ workspaces and 25K users with <100ms sync.',
    images: ['https://peregrine-it.com/ogimage.png'],
  },
  alternates: { canonical: 'https://peregrine-it.com/case-studies/realtime-collaboration-tool' },
};

export default function RealtimeCollaborationTool() {
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
            Real-Time Collaboration Tool for <em>Documents &amp; Chat</em>
          </h1>

          <p className="csd-hero-sub">
            How we built a real-time collaboration platform for 5K+ workspaces and 25K users — with
            operational transform, presence, permissions, and offline sync achieving &lt;100ms sync
            latency.
          </p>

          <div className="csd-hero-meta">
            <div className="csd-hero-meta-item">
              <div className="csd-hero-meta-label">Industry</div>
              <div className="csd-hero-meta-value">SaaS / Productivity</div>
            </div>
            <div className="csd-hero-meta-item">
              <div className="csd-hero-meta-label">Duration</div>
              <div className="csd-hero-meta-value">11 Months</div>
            </div>
            <div className="csd-hero-meta-item">
              <div className="csd-hero-meta-label">Services</div>
              <div className="csd-hero-meta-value">Full-Stack &middot; WebSocket &middot; CRDT</div>
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
                <i className="ri-file-edit-line" style={{ fontSize: 28, color: '#a78bfa' }} />
              </div>
              <div className="csd-placeholder-node">
                <i className="ri-chat-3-line" style={{ fontSize: 28, color: '#a78bfa' }} />
              </div>
              <div className="csd-placeholder-node">
                <i className="ri-user-follow-line" style={{ fontSize: 28, color: '#a78bfa' }} />
              </div>
              <div className="csd-placeholder-node">
                <i className="ri-lock-line" style={{ fontSize: 28, color: '#a78bfa' }} />
              </div>
              <div className="csd-placeholder-node">
                <i className="ri-wifi-off-line" style={{ fontSize: 28, color: '#a78bfa' }} />
              </div>
              <div className="csd-placeholder-node">
                <i className="ri-cloud-sync-line" style={{ fontSize: 28, color: '#a78bfa' }} />
              </div>
            </div>
            <p>OT &middot; Presence &middot; Offline Sync</p>
          </div>
        </div>
      </div>

      {/* ═══ CONTENT ═══ */}
      <div className="csd-content">
        {/* KEY STATS */}
        <div className="csd-stats-row">
          <div className="csd-stat-card">
            <div className="csd-stat-number">5K+</div>
            <div className="csd-stat-label">Workspaces</div>
          </div>
          <div className="csd-stat-card">
            <div className="csd-stat-number">25K</div>
            <div className="csd-stat-label">Users</div>
          </div>
          <div className="csd-stat-card">
            <div className="csd-stat-number">&lt;100ms</div>
            <div className="csd-stat-label">Sync Latency</div>
          </div>
          <div className="csd-stat-card">
            <div className="csd-stat-number">CRDT</div>
            <div className="csd-stat-label">Conflict Resolution</div>
          </div>
        </div>

        {/* OVERVIEW */}
        <div className="csd-section">
          <div className="csd-section-label">Overview</div>
          <h2>The Client&apos;s Vision</h2>
          <p>
            A productivity startup wanted to compete with Notion and Google Docs — documents and
            chat in one place, with real-time collaboration. The MVP used polling and had 2–3
            second lag when multiple users typed. Offline support was non-existent.
          </p>
          <p>
            They wanted sub-100ms sync for cursor presence and document edits, granular permissions
            (view vs edit vs comment), and offline sync so users could work without connectivity and
            merge changes when back online — without conflicts or data loss.
          </p>
        </div>

        {/* CHALLENGES */}
        <div className="csd-section">
          <div className="csd-section-label">The Challenge</div>
          <h2>What Was Breaking</h2>

          <div className="csd-cs-grid">
            <div className="csd-cs-card csd-challenge">
              <div className="csd-cs-card-icon">
                <i className="ri-file-edit-line" />
              </div>
              <h4>Operational Transform</h4>
              <p>
                When two users edit the same paragraph simultaneously, changes had to merge
                correctly. Plain last-write-wins caused overwrites. OT or CRDT was required for
                conflict-free merge.
              </p>
            </div>
            <div className="csd-cs-card csd-challenge">
              <div className="csd-cs-card-icon">
                <i className="ri-user-follow-line" />
              </div>
              <h4>Presence</h4>
              <p>
                Users needed to see who else was viewing a document and where their cursors were.
                High-frequency updates (cursor position) couldn&apos;t flood the server. Throttling
                and batching were critical.
              </p>
            </div>
            <div className="csd-cs-card csd-challenge">
              <div className="csd-cs-card-icon">
                <i className="ri-lock-line" />
              </div>
              <h4>Permissions</h4>
              <p>
                Workspaces had folders and documents with inherited permissions. View, edit, comment,
                and admin levels. Sharing links with expiry. Permissions had to be checked on every
                operation without slowing sync.
              </p>
            </div>
            <div className="csd-cs-card csd-challenge">
              <div className="csd-cs-card-icon">
                <i className="ri-wifi-off-line" />
              </div>
              <h4>Offline Sync</h4>
              <p>
                Users on trains or unreliable networks needed to keep working. Local edits had to be
                queued and merged when reconnected. Divergent edits required conflict resolution —
                CRDT could handle this automatically.
              </p>
            </div>
          </div>
        </div>

        {/* SOLUTION */}
        <div className="csd-section">
          <div className="csd-section-label">Our Approach</div>
          <h2>The Architecture We Built</h2>
          <p>
            We built a real-time collaboration platform with WebSocket connections, CRDT-based
            document sync, and Redis for presence broadcast. Documents use a CRDT (Yjs) for
            conflict-free merging. Presence updates are throttled and broadcast via Redis pub/sub.
            Permissions are cached and checked at sync layer. Offline queue replays on reconnect.
          </p>

          <div className="csd-arch-block">
            <h3>System Architecture</h3>
            <div className="csd-arch-layers">
              <div className="csd-arch-layer">
                <div className="csd-arch-layer-icon">
                  <i className="ri-window-line" />
                </div>
                <div className="csd-arch-layer-content">
                  <div className="csd-arch-layer-name">Next.js Document Editor &amp; Chat UI</div>
                  <div className="csd-arch-layer-desc">
                    Rich text editor with Yjs integration. Real-time cursor and presence overlay.
                    Inline chat threads and workspace switcher
                  </div>
                </div>
              </div>
              <div className="csd-arch-arrow">↓</div>

              <div className="csd-arch-layer">
                <div className="csd-arch-layer-icon">
                  <i className="ri-broadcast-line" />
                </div>
                <div className="csd-arch-layer-content">
                  <div className="csd-arch-layer-name">WebSocket Server &amp; Auth Layer</div>
                  <div className="csd-arch-layer-desc">
                    Persistent WebSocket connections per user. JWT validation on connect. Room-based
                    routing — documents and chat channels
                  </div>
                </div>
              </div>
              <div className="csd-arch-arrow">↓</div>

              <div className="csd-arch-layer">
                <div className="csd-arch-layer-icon">
                  <i className="ri-database-2-line" />
                </div>
                <div className="csd-arch-layer-content">
                  <div className="csd-arch-layer-name">PostgreSQL — Workspaces, Docs &amp; Permissions</div>
                  <div className="csd-arch-layer-desc">
                    Workspaces, documents, and folder hierarchy. Permission matrix and sharing
                    settings. Chat messages and thread metadata
                  </div>
                </div>
              </div>
              <div className="csd-arch-arrow">↓</div>

              <div className="csd-arch-layer">
                <div className="csd-arch-layer-icon">
                  <i className="ri-flashlight-line" />
                </div>
                <div className="csd-arch-layer-content">
                  <div className="csd-arch-layer-name">Redis — Presence &amp; Document State</div>
                  <div className="csd-arch-layer-desc">
                    Presence (user, cursor, doc) with TTL. Pub/sub for real-time broadcast. Cached
                    permissions. Document CRDT state for active sessions
                  </div>
                </div>
              </div>
              <div className="csd-arch-arrow">↓</div>

              <div className="csd-arch-layer">
                <div className="csd-arch-layer-icon">
                  <i className="ri-cloud-sync-line" />
                </div>
                <div className="csd-arch-layer-content">
                  <div className="csd-arch-layer-name">CRDT Sync &amp; Offline Queue</div>
                  <div className="csd-arch-layer-desc">
                    Yjs CRDT for document edits. Client-side offline queue. Merge on reconnect.
                    Periodic persistence to PostgreSQL
                  </div>
                </div>
              </div>
            </div>
          </div>

          <p>
            CRDT (Yjs) was the right choice for document sync. Unlike OT, it doesn&apos;t require a
            central server to transform operations — each client can merge independently. That
            enables offline editing: local changes are stored, and when the client reconnects, the
            merged state is computed. We persist document state to PostgreSQL on a debounced
            schedule and on room disconnect.
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
              <span className="csd-tech-icon"><i className="ri-broadcast-line" /></span> WebSocket
            </div>
            <div className="csd-tech-tag">
              <span className="csd-tech-icon"><i className="ri-git-merge-line" /></span> CRDT
            </div>
            <div className="csd-tech-tag">
              <span className="csd-tech-icon"><i className="ri-file-edit-line" /></span> Yjs
            </div>
            <div className="csd-tech-tag">
              <span className="csd-tech-icon"><i className="ri-user-follow-line" /></span> Presence
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
              <div className="csd-timeline-title">Discovery &amp; Sync Strategy</div>
              <p className="csd-timeline-desc">
                Evaluated OT vs CRDT. Chose Yjs for CRDT-based sync. Designed permission model and
                workspace hierarchy. Defined WebSocket room and message schemas.
              </p>
            </div>
            <div className="csd-timeline-item">
              <div className="csd-timeline-dot" />
              <div className="csd-timeline-phase">Phase 2 — Weeks 5–24</div>
              <div className="csd-timeline-title">Core Platform &amp; WebSocket</div>
              <p className="csd-timeline-desc">
                Built WebSocket server with room routing. Integrated Yjs for document sync. Implemented
                presence with throttling. Built workspace, doc, and permission APIs.
              </p>
            </div>
            <div className="csd-timeline-item">
              <div className="csd-timeline-dot" />
              <div className="csd-timeline-phase">Phase 3 — Weeks 25–36</div>
              <div className="csd-timeline-title">Offline Sync &amp; Chat</div>
              <p className="csd-timeline-desc">
                Implemented client-side offline queue and merge on reconnect. Built chat with
                Redis pub/sub. Added permission checks at sync layer. Persisted document state to
                PostgreSQL.
              </p>
            </div>
            <div className="csd-timeline-item">
              <div className="csd-timeline-dot" />
              <div className="csd-timeline-phase">Phase 4 — Weeks 37–44</div>
              <div className="csd-timeline-title">Performance &amp; Rollout</div>
              <p className="csd-timeline-desc">
                Optimized for &lt;100ms sync. Load-tested with 500 concurrent doc editors.
                Phased rollout — beta users first, then general availability. Monitored latency
                and conflict rates.
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
              <div className="csd-result-before">Sync latency</div>
              <div className="csd-result-after">&lt;100ms</div>
              <div className="csd-result-label">Real-time edits and cursor updates</div>
            </div>
            <div className="csd-result-card">
              <div className="csd-result-before">5K+ workspaces</div>
              <div className="csd-result-after">Active</div>
              <div className="csd-result-label">Multi-tenant with isolated data</div>
            </div>
            <div className="csd-result-card">
              <div className="csd-result-before">25K users</div>
              <div className="csd-result-after">On platform</div>
              <div className="csd-result-label">Collaborative docs and chat</div>
            </div>
            <div className="csd-result-card">
              <div className="csd-result-before">Offline edits</div>
              <div className="csd-result-after">Conflict-free merge</div>
              <div className="csd-result-label">CRDT handles divergent changes</div>
            </div>
          </div>
        </div>

        {/* QUOTE */}
        <div className="csd-quote-block">
          <div className="csd-quote-text">
            &ldquo;The real-time sync feels like magic — we went from 2–3 second lag to sub-100ms.
            Offline support was the killer feature for our remote teams. No more lost edits.&rdquo;
          </div>
          <div className="csd-quote-author">— CTO, Productivity Startup</div>
        </div>

        {/* KEY TAKEAWAYS */}
        <div className="csd-section">
          <div className="csd-section-label">Key Takeaways</div>
          <h2>What Made This Work</h2>
          <p>
            CRDT (Yjs) vs OT is a fundamental choice. OT requires a central authority to transform
            operations — good for simple cases but complex for offline. CRDT allows merge without
            server — any two replicas can converge. The tradeoff is CRDT state size grows with
            history; we use Yjs&apos;s garbage collection to bound it. For documents under 1MB, it
            works well.
          </p>
          <p>
            Presence is high-frequency and must be throttled. We send cursor updates at most every
            100ms per user. Presence is ephemeral — stored in Redis with 30s TTL. When a user
            disconnects, we don&apos;t persist; they simply disappear from the presence list. Redis
            pub/sub broadcasts to all clients in the document room.
          </p>
          <p>
            Permissions are checked at the WebSocket layer before accepting document updates. We
            cache permission results in Redis (short TTL) to avoid hitting PostgreSQL on every
            keystroke. Folder inheritance is computed on permission grant/revoke and stored — we
            don&apos;t walk the tree on each sync. When permissions change, we invalidate the cache
            and disconnect affected clients so they re-auth.
          </p>
        </div>

        {/* CTA */}
        <div className="csd-cta-section">
          <h2>Building a Real-Time Collaboration Tool?</h2>
          <p>
            We help SaaS companies build production-grade real-time and offline-first applications.
            Let&apos;s talk about your architecture.
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
