# Article briefs (T17)

Briefs for the next guides, in priority order. None is published yet: each needs its third-party figures gathered and linked before it is written, under the same rules as the existing guides (every figure sourced and dated, no Peregrine prices, no first-hand claims the owner has not confirmed).

A guide is added as `src/app/blog/<slug>/page.tsx` with metadata in `src/data/guides.ts`; `GuideLayout` supplies the byline, schema, related links and the consultation block.

## 1. Investor portal vs file sharing — PUBLISHED ON THE BRANCH (2026-10-09)
Written as `src/app/blog/investor-portal-vs-file-sharing/page.tsx`. The brief below is kept for reference.
- **URL:** `/blog/investor-portal-vs-file-sharing`
- **Evidence of demand:** Search Console shows `investor portal vs file sharing` at position 82 with no page; six more investor-portal queries land on the case study.
- **Intent:** comparison, informational. Reader is an IR lead or CFO at a real estate sponsor.
- **Working title (≤ 45 characters before the suffix):** Investor Portal vs File Sharing for LPs
- **H1:** Investor Portal vs File Sharing: What Real Estate Firms Need for LP Reporting
- **Outline:**
  1. The short answer (2–3 sentences).
  2. What file sharing does well, and where it stops: per-investor access, audit trail, watermarking, capital-call workflow.
  3. Comparison table: shared folder vs off-the-shelf portal vs custom portal.
  4. When file sharing is enough.
  5. Off-the-shelf portals: what they cover. Vendor pricing only where a vendor publishes it.
  6. When a custom portal makes sense.
  7. FAQ (five questions, FAQPage from the same array).
- **Facts already on the site:** the investor portal case study (six role types, watermarking with tracking ID, 3 weeks → 2 hours reporting, 280+ investors).
- **To gather before writing:** published pricing and feature pages for the main investor-portal vendors; the access-control and audit features of the common file-sharing tools, from their own documentation.
- **Links:** to `/services/investor-portal-development`, the case study, `/industries/real-estate`.
- **After publishing:** add the slug to `guides` on the investor portal service and to the real-estate industry.

## 2. RESO Web API vs RETS: migration guide
- **URL:** `/blog/reso-web-api-vs-rets`
- **Evidence:** the MLS service page ranks for `mls idx api`; the cost guide already cites NAR policy 7.90, RESO's deprecation statement and ARMLS's RETS shutdown date.
- **Intent:** informational, technical. Reader maintains a RETS integration.
- **H1:** RESO Web API vs RETS: What Changes and How to Migrate
- **Outline:** short answer; what each standard is; what changes for a developer (auth, query model, Data Dictionary fields, replication); a migration checklist; boards' published shutdown dates; FAQ.
- **To gather:** RESO's own documentation for the Web API and Data Dictionary versions; published RETS retirement dates from individual MLSs.
- **Do not include:** how long a migration takes, unless the owner supplies Peregrine's own experience (B8).

## 3. IDX vendor vs custom build
- **URL:** `/blog/idx-vendor-vs-custom-build`
- **Evidence:** `idx cost per month`, `how much is idx`, `idx` impressions on the cost guide.
- **Intent:** decision support for a brokerage outgrowing a plugin.
- **H1:** IDX Vendor or Custom Build: When to Switch
- **Outline:** short answer; what an IDX plugin gives you; the limits (design, data ownership, multi-MLS, lead handling); cost comparison using the cost guide's sourced figures and the calculator; signs it is time to build; FAQ.
- **Risk:** overlap with the cost guide. Keep cost detail there and link to it; this guide is about the decision.

## 4. Self-storage software: build or buy
- **URL:** `/blog/self-storage-software-build-vs-buy`
- **Evidence:** seven self-storage queries at positions 59–90.
- **Intent:** decision support for a multi-site operator.
- **H1:** Self-Storage Management Software: Build or Buy?
- **Outline:** short answer; what facility management systems cover; where multi-site operators hit limits (mixed lock hardware, billing and access in separate systems, portfolio reporting); published pricing of the main products where available; what a custom build involves, from the case study; FAQ.
- **To gather:** published feature and pricing pages of the main self-storage management products.
- **Blocked detail:** naming the smart-lock vendors (B10).

## 5. MLS data in Canada: CREA DDF and board feeds
- **URL:** `/blog/mls-data-access-canada`
- **Evidence:** Canada is 3% of impressions against a stated core market; the cost guide cites one CREA fee.
- **Intent:** informational for Canadian brokerages and proptech teams.
- **H1:** MLS Data Access in Canada: CREA DDF and Board Feeds
- **To gather:** CREA's DDF documentation and fee tiers; the data-access pages of the larger Canadian boards.
- **Do not include:** anything about boards Peregrine has not worked with, phrased as experience.

## 6. Odoo integrations (blocked)
- **Evidence:** `odoo refurbed integration` and `odoo orderstream integration` in Search Console.
- **Blocked on B6:** which systems Peregrine has actually integrated with Odoo. Without that, a guide naming Refurbed or OrderStream would imply experience that is not confirmed.

## 7. First-hand MLS onboarding notes (blocked)
- The audit's highest-leverage idea: publish Peregrine's own observed approval timelines by board.
- **Blocked on B8:** only the owner can supply them.
