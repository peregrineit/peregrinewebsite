# Growth Sprint 2

**Started:** 2026-10-10 · **Base:** `main` at `48ed23f` · **Integration branch:** `growth/sprint-2`
**Rule set:** `CLAUDE.md`. No invented client results, pricing, testimonials or expertise. Nothing is merged, deployed or sent.

## How the sprint runs
Four workstreams, each on its own branch and git worktree, each owning a disjoint set of files. The main session integrates, reviews and opens one pull request per workstream.

| Stream | Branch | Worktree | Owns |
|---|---|---|---|
| A Lead engineering | `growth/s2-lead` | `~/Code/pw-s2-lead` | `src/app/api/lead/**`, `src/lib/**`, `LeadForms.tsx`, `Tracking.tsx`, `ConsultationCta.tsx`, `scripts/test_lead_api.py`, `docs/growth/lead/**` |
| B Commercial pages | `growth/s2-commercial` | `~/Code/pw-s2-commercial` | `src/data/services.ts`, `technology-services.ts`, `industries.ts`, `src/app/page.tsx`, `contact/`, `services/`, `industries/`, `content-pages.css` |
| C Technical content | `growth/s2-content` | `~/Code/pw-s2-content` | `src/app/blog/**` (new guides), `src/data/guides.ts`, `src/app/components/diagrams/**`, `public/llms.txt` |
| D Growth systems | `growth/s2-systems` | `~/Code/pw-s2-systems` | new files under `scripts/`, `scripts/seo_check.py`, `.github/`, `docs/growth/research/**`, `docs/growth/systems/**`, `package.json` scripts |

## Candidate backlog

Value and effort: H / M / L. "Owner?" = needs owner access or a fact before it can ship.

| # | Area | Candidate | Value | Effort | Depends on | Evidence required | Acceptance | Owner? | Stream |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Lead persistence | Pluggable lead store behind a switch that is off by default; first adapter writes one JSON object per lead to Vercel Blob | H | M | Blob token (owner) to turn on | integration test against a mock store | with the switch off, behaviour and tests are unchanged; with it on (mock), each accepted lead is written once and `durableStorage` reports it | to enable | A |
| 2 | Webhook reliability | Retry with backoff inside the time budget; optional HMAC signature so the receiver can trust the sender | M | S | none | tests: 500 then 200, timeout, bad signature | one delivery per lead; signature verifiable with the shared secret | no | A |
| 3 | Attribution | First-touch and last-touch source, click ids (`gclid`, `msclkid`), CTA location that opened the form, pages viewed before submitting | H | S | none | browser test; payload in tests | notification email and webhook carry the new fields; nothing stored before the visitor submits | no | A |
| 4 | Booking attribution | Calendly links carry page and CTA location as UTM parameters, so a booked call can be tied to a page | H | S | none | rendered link check | every Calendly link has `utm_source=peregrine-it.com`, `utm_content=<page>` | no | A |
| 5 | Form abandonment | `lead_form_start` on first input and `lead_form_abandon` on leaving with a started, unsent form; no field values | M | S | GA4 ID for reporting (owner) | browser test | events fire once each, carry form and page only | no | A |
| 6 | Lead qualification | A priority line in the notification from fields already collected (timeline, company present, business vs free email domain, message length, service page) | M | S | none | unit tests of the scoring | deterministic, documented, never shown to the visitor | no | A |
| 7 | Error reporting | Owner alert when the notification fails but the webhook or store took the lead; client errors carry the HTTP status as an event property | M | S | none | tests | a lead never exists only in a place nobody looks | no | A |
| 8 | Privacy and retention | Document what each destination stores and for how long; draft policy wording for the owner | M | S | owner approves legal text | review of data flows | document matches the code; policy text is a proposal, not published | to publish | A |
| 9 | Service positioning | Each reviewed service page states who it is for, what a first engagement looks like and what to bring to a scoping call | H | M | case studies as the only proof | every Peregrine claim traceable to `case-studies.ts` or an owner-confirmed fact | `seo_check.py` passes; no new claim without a source | no | B |
| 10 | Buyer FAQs | Questions US and Canadian buyers ask before hiring an offshore engineering firm (time zones, contracts, IP, handover, security practices), answered only from confirmed facts | H | M | owner-confirmed facts list | each answer cites its source in a code comment | FAQ text equals FAQPage schema | partly | B |
| 11 | Project scoping | A "what determines scope" block per service (inputs, unknowns, typical phases) with no prices and no invented durations | H | M | none | neutral technical accuracy | reads as guidance, not a promise | no | B |
| 12 | Contact page | What happens after you submit, who replies, what to include; both forms and the Calendly path explained | H | S | none | page review at 375 px | clear next steps; no new promise beyond "within 1 business day" | no | B |
| 13 | Case-study connections | Service and industry pages link the specific case-study section that proves each capability | M | S | case studies | link check | every capability with a published proof links to it | no | B |
| 14 | Homepage | Unsupported technology lists (B11) trimmed to stacks that appear in case studies; clearer path to services and industries | M | M | owner may prefer the full list | list derived from `case-studies.ts` | every listed technology appears in at least one case study | decision | B |
| 15 | Navigation and discovery | Services index groups pages by need; related-service links; mobile menu depth | M | S | none | 375 px and desktop check | every service reachable in two taps | no | B |
| 16 | Original content | MLS data integration architecture: reference architecture with a diagram, replication, normalization, compliance checkpoints | H | M | RESO, MLS Grid, Trestle docs | every third-party fact linked and re-fetched | diagram is inline SVG with a text alternative; guide links service, calculator, case study | no | C |
| 17 | Original content | Laravel upgrade and modernization checklist from Laravel's own support policy and upgrade guides | M | M | laravel.com docs | version and support dates verified on the day | no claim of Peregrine Laravel projects (B5) | no | C |
| 18 | Original content | Shopify and Odoo synchronization: what to sync, which system owns what, API limits, webhooks, failure handling | M | M | Shopify and Odoo docs | limits quoted from official docs | no claim of a delivered integration (B6) | no | C |
| 19 | Original content | Investor portal security design checklist (roles, document access, audit trail, signing, data residency questions) | M | M | investor portal case study; public standards | standards cited (for example OWASP ASVS) | links service page and case study | no | C |
| 20 | Reporting | Weekly SEO report generated from Search Console exports: totals, movers, title experiments, cannibalization pairs, country share | H | M | owner drops exports in a folder | tested on fixture exports | one command produces a Markdown report | data only | D |
| 21 | Health check | Lead-delivery health script for production: status endpoint, expected values, exit code for cron or CI | M | S | none | run against production (read-only) | non-zero exit on any regression | no | D |
| 22 | Source links | Checker for the several hundred external source links in the guides: status, redirects, moved pages | H | M | network | run once, report committed | report lists every broken or redirected source | no | D |
| 23 | Regression tests | Metadata and canonical snapshot: titles, descriptions, canonicals, H1s compared with a committed baseline | M | S | none | baseline from production | unintended change fails the check | no | D |
| 24 | CI | GitHub Actions workflow running types, lint, build, SEO check, lead tests and fee tests on every pull request | H | S | Actions minutes on the repo (owner's plan) | workflow file reviewed; cannot be proven until pushed | checks appear on the pull request | maybe | D |
| 25 | Keyword mapping | One row per commercial query cluster: target page, current evidence, gap | M | S | October 9 Search Console data | only queries seen in data or stated as hypotheses | no two pages target one cluster | no | D |
| 26 | Partner research | Qualification programs Peregrine could truthfully apply to (RESO, MLS vendor programs, Odoo, Shopify, Vercel): requirements, cost, source URL, date checked | M | M | network | every row has a source and a checked date | dataset, no applications made | to act | D |
| 27 | Accessibility and performance | Reduced-motion and focus review of the forms and new blocks; real-user LCP for case studies | L | S | Speed Insights data (owner) | Lighthouse and keyboard pass | no regressions | data | main |

## Selected for execution
Batch 1: 1–7 (A) · 9–13, 15 (B) · 16, 17 (C) · 20–24 (D).
Batch 2 (as streams free up): 8 (A) · 14 as a proposal only (B) · 18 or 19 (C) · 25, 26 (D).
Not started on purpose: anything needing a fact Peregrine has not confirmed (B5, B6, B8 in `docs/seo/BLOCKERS.md`).

## Status
Done and integrated: 1–13, 15–26, plus item 8. Item 14 delivered as a proposal for the owner. Item 27: Lighthouse and keyboard-relevant checks run on the integrated build; real-user speed data still needed. Results, tests and pull requests: `SPRINT-2-REPORT.md`.

## Log
- 2026-10-10 01:24: backlog written; ports made configurable; four streams launched.
- Streams B, C, D first batches reviewed and integrated; B and C given second batches.
- Stream A independently reviewed; six confirmed defects sent back and fixed with failing-first tests; integrated.
- Stream C third batch (Odoo integration guide) integrated.
- 02:33: full suite passes on `growth/s2-integration`; report written.

## Resume checkpoint
Sprint complete. All work is on `growth/s2-integration` (pushed) and in draft pull requests 10–14 plus the integration pull request. Integration order: A, D, C, B. Verify each with `npx tsc --noEmit -p .`, `scripts/serve-local.sh`, `python3 scripts/seo_check.py`, `python3 scripts/test_lead_api.py`, `node --experimental-strip-types scripts/test_mls_fees.mjs`, then open one pull request per branch against `main`.
