# SEO task tracker

Live status for the 90-day SEO programme. Requirements come from the 2026-10-09 audit and Search Console findings (`~/Code/peregrine-it.com-audit/AUDIT-2026-10-09.md`, `GSC-FINDINGS-2026-10-09.md`, `IMPLEMENTATION-BACKLOG-2026-10-09.md`). History of earlier phases is in `SEO-PLAN.md`.

**Status key:** `done` · `in progress` · `ready` (unblocked, not started) · `blocked` (needs the owner; see Blockers)

**Branch:** `seo/phase-12`, stacked on `seo/phase-11` (not yet merged to `main`). Merge order: 11, then 12.

## Tasks

| ID | Task | Depends on | Status | Commit |
|---|---|---|---|---|
| 12.0 | CLAUDE.md, this tracker, `scripts/seo_check.py`, `scripts/serve-local.sh` | — | done | see log |
| 12.1 | Conversion tracking library (`src/lib/track.ts`): GA4 behind `NEXT_PUBLIC_GA_ID`, Vercel Analytics events, delegated click tracking | 12.0 | ready | |
| 12.2 | Consultation CTA on every guide | 12.1 | ready | |
| 12.3 | Lead API: honeypot, rate limit, attribution fields, CRM webhook, honest failure, verified-sender env | 12.1 | ready | |
| 12.4 | Inline consultation form on service pages | 12.1 | ready | |
| 12.5 | MLS/IDX cost article: title, description, cost-at-a-glance table, MLS Grid and per-user sections, FAQ | 12.2 | ready | |
| 12.6 | Seven title and description experiments | — | ready | |
| 12.7 | Industry data model, `/industries` hub rebuild, `/industries/[slug]`, case-study and nav linking, schema | — | ready | |
| 12.8 | Self-storage landing page | 12.7 | ready | |
| 12.9 | Investor portal service page | — | ready | |
| 12.10 | Guide: investor portal vs file sharing (sourced) | 12.9 | ready | |
| 12.11 | Technology route + Next.js and React pages | — | ready | |
| 12.12 | Shopify, Laravel, WordPress pages | 12.11 | blocked (B4) | |
| 12.13 | Odoo named-integration content | — | blocked (B5) | |
| 12.14 | Engineering team on `/about` | — | blocked (B6) | |
| 12.15 | Client credibility: link all eight named clients | — | ready | |
| 12.16 | MLS content from first-hand experience (approval timelines) | — | blocked (B7) | |
| 12.17 | MLS/IDX cost calculator, built only from the guide's sourced fees | 12.5 | ready | |
| 12.18 | Housekeeping: W3\|re labels, robots meta, CSP report-to, image weight, Person url | — | ready | |
| 12.19 | Monitoring: production check run, Search Console re-pull at weeks 3, 8, 12 | 12.0 | ready | |

## Blockers (owner input needed)

| ID | Needed | Blocks |
|---|---|---|
| B1 | Merge `seo/phase-11`, then `seo/phase-12` (production change) | everything reaching production |
| B2 | GA4 measurement ID (`NEXT_PUBLIC_GA_ID`), plus a consent decision for analytics cookies | GA4 data (code is ready and inert without it) |
| B3 | Where leads are stored: CRM or automation webhook URL (`LEAD_WEBHOOK_URL`); verified Resend sender (`LEAD_FROM_EMAIL`, DNS); one response-time promise | durable lead storage, auto-reply delivery, consistent copy |
| B4 | One real project each for Shopify, Laravel and WordPress, or a decision to drop them. The repo has no evidence of any | 12.12 |
| B5 | Which third-party systems have actually been integrated with Odoo (Search Console shows demand for Refurbed and OrderStream) | 12.13 |
| B6 | Engineers to name: name, role, specialism, LinkedIn, photo | 12.14 |
| B7 | Peregrine's own observed MLS approval timelines, by board | 12.16 |
| B8 | W3\|re: how 94% valuation accuracy relates to "23% of prices off by more than 8%"; "$2.3M loss" vs "$1.8M savings"; measurement windows | W3\|re fixes beyond labels |
| B9 | May the self-storage page name the smart-lock vendors in the case study (Nokē, PTI)? Until confirmed the new page says "smart locks" | vendor names on 12.8 |

## Decisions

| Date | Decision | Why |
|---|---|---|
| 2026-10-09 | No written 90-day strategy file was found; the backlog areas in the owner's 2026-10-09 instruction are treated as the requirements | Nothing else to reconcile against |
| 2026-10-09 | The "seven title experiments" are the seven pages with a clear query signal in Search Console (listed under 12.6) | The owner did not name them; the 8-day sample only statistically supports the MLS cost page, so the other six are recorded as experiments with baselines |
| 2026-10-09 | GA4 is loaded only when `NEXT_PUBLIC_GA_ID` is set; events also go to Vercel Analytics | No credentials in the repo; tracking code can ship without changing production behaviour |
| 2026-10-09 | No headline dollar range in the MLS cost title | "$450–$7,500" is one Stellar MLS fee, not a general range |
| 2026-10-09 | Case-study dates are not derived from git history | Earlier owner decision (SEO-PLAN.md, Phase 2) |
| 2026-10-09 | Industry pages only where two or more case studies exist, plus self-storage (Search Console demand) | Avoid thin pages |
| 2026-10-09 | Technology pages only where at least two case studies list the technology in their stack | No unverified experience claims |

## Tracking events (12.1)

| Event | Fired when | Properties |
|---|---|---|
| `cta_open` | a `[data-open-contact]` or `[data-open-quick-project]` element is clicked | `form`, `location`, `page` |
| `lead_submit` | a lead form succeeds | `form`, `page`, `service` |
| `lead_error` | a lead form fails | `form`, `page` |
| `calendly_click` | a Calendly link is clicked | `location`, `page` |
| `email_click` | a `mailto:` link is clicked | `page` |
| `guide_cta_click` | the consultation CTA on a guide is clicked | `guide` |

## Title experiments (12.6)

Baseline: Search Console, 2026-09-28 to 2026-10-05. Re-measure after 300 further impressions per page.

| Page | Impr. | Pos. | Clicks | Old title | New title |
|---|---|---|---|---|---|

## Change log

| Date | Change |
|---|---|
| 2026-10-09 | Tracker created. |
