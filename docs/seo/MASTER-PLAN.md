# SEO and lead-generation master plan (90 days from 2026-10-09)

**Mission:** more qualified leads, organic impressions and clicks for Peregrine IT, US and Canada first.
**Focus:** MLS/IDX, self-storage software, investor portals, Shopify, Laravel, Next.js, React, WordPress, Odoo integrations.

**Inputs:** the 2026-10-09 audit and Search Console findings (`~/Code/peregrine-it.com-audit/AUDIT-2026-10-09.md`, `GSC-FINDINGS-2026-10-09.md`, `IMPLEMENTATION-BACKLOG-2026-10-09.md`) and the owner's execution brief of 2026-10-09. No separate strategy document exists in the repo or the audit folder; the brief's 18 tasks are the plan.

Related files: `TASKS.md` (status), `PROGRESS.md` (per-task log), `BLOCKERS.md` (what needs the owner), `../../SEO-PLAN.md` (Phases 1–11 history), `../../SEO-OFFPAGE.md` (owner's off-site checklist), `../../CLAUDE.md` (rules and commands).

## What the data says (8 days of Search Console, 468 impressions)
- The MLS/IDX content ranks: `/blog/mls-idx-integration-cost` has 23% of all impressions at position 6.5 but 1 click. It is the only page with enough volume to call under-clicked.
- Investor portal and self-storage queries land on case studies at positions 40–90. There is no service or landing page for either.
- Odoo queries name specific systems (Refurbed, OrderStream); the Odoo page names none.
- 17 of 88 queries look like AI-assistant fan-out (long, conversational). They need extractable answers, not click-bait.
- No Shopify, Laravel, WordPress, React or Next.js queries appear yet. Those pages are strategy-led.

## Audit vs repository: reconciled
| Audit statement | Repository reality | Action |
|---|---|---|
| "12 titles to rewrite" | The follow-up analysis supports one (MLS cost); the others are too low-volume to judge | T1: seven experiments, baselines recorded |
| "Person node has no image" | Fixed on `seo/phase-11` (unmerged) | merge 11 |
| "/indexnow.txt is 404" | The key file is `/ea7a…26a6.txt`; IndexNow returns 200 | none |
| "sitemap lastmod on 12 of 39" | Deliberate: only pages that declare `dateModified` | none |
| "INP unmeasured, add RUM" | `@vercel/speed-insights` is installed and collects INP | check the Vercel dashboard |
| "Add case-study dates from git history" | Owner decided earlier not to derive dates from git | not done |
| "Suggested title: $450–$7,500/yr" | That is one Stellar MLS fee, not a range | not used |
| "/industries links to zero case studies" | True | T9 |
| "Guides have no CTA" (found in repo audit) | True until `a4c6551` | done in T3 |
| "No conversion events, no CRM, leads written to /tmp" (repo audit) | True until `a4c6551` | done in T3/T4; destination needs the owner |
| "W3\|re hero label vs results label; Property Management Dashboard block" | Still present | T16 |
| "19 case studies lack max-image-preview; 20 pages have two robots tags" | True | T16 |
| "CSP has no report-to; jsDelivr still allow-listed" | jsDelivr removed in `a4c6551`; report-to open | T16 |

## Principles
1. Nothing invented: no prices, results, testimonials, MLS timelines or integration experience. Unknowns are `TODO(owner)` and listed in `BLOCKERS.md`.
2. One page per intent. No near-duplicate pages; a new page must have its own evidence and its own sections.
3. Pages come from data files and existing templates; the visual design does not change.
4. Measure first: conversion events ship before new pages so each page has a baseline.
5. Service pages for technologies with no published project are capability pages that say so, like the Odoo page.

## Order of work
1. Foundation and measurement: T3, T4.
2. Highest-evidence content: T1, T2.
3. Demand without a page: T7, T8, T9.
4. Technology pages: T12 (proof exists), then T10, T11, T13 (capability pages).
5. Calculator, linking, schema: T15, T16.
6. Credibility and first-hand content, as the owner supplies facts: T5, T6, T14.
7. Articles and outreach assets: T17, T18.

## Measurement
- Conversions: `lead_submit`, `cta_open`, `calendly_click` per page (Vercel Analytics now; GA4 once the ID is set).
- Search Console re-pull at weeks 3, 8 and 12. Per-page CTR is only judged after 300 impressions.
- `python3 scripts/seo_check.py https://peregrine-it.com` after every deploy.
