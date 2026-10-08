# SEO tasks

**Status key:** `done` · `in progress` · `ready` · `partial` (shipped what is verifiable; rest blocked) · `blocked`
**Branch:** `seo/phase-12`, stacked on `seo/phase-11`. Merge order: 11, then 12.
Per-task detail, files, hashes and tests are in `PROGRESS.md`. Blockers are in `BLOCKERS.md`.

| ID | Task | Depends on | Status |
|---|---|---|---|
| T0 | Execution state: CLAUDE.md, docs/seo, `scripts/seo_check.py`, `scripts/serve-local.sh` | — | done |
| T1 | Seven title and description experiments | — | ready |
| T2 | MLS/IDX pricing and integration content from verified (sourced) data | T3 | ready |
| T3 | Technical consultation CTA and short lead qualification form | T0 | done (copy: B4) |
| T4 | GA4 events and CRM attribution | T3 | done in code (data: B2, B3) |
| T5 | About, team and client sections from verified information | — | ready (clients); blocked (team: B7) |
| T6 | Odoo integration content from verified capabilities | — | blocked (B6) |
| T7 | Self-storage software landing page | T9 | ready |
| T8 | Investor portal development page | — | ready |
| T9 | Industry hub with relevant case studies | — | ready |
| T10 | Shopify development service page | T12 | ready as capability page (B5) |
| T11 | Laravel development service page | T12 | ready as capability page (B5) |
| T12 | Next.js and React development pages | — | ready |
| T13 | WordPress development service page | T12 | ready as capability page (B5) |
| T14 | Verified MLS-specific content | — | blocked (B8) |
| T15 | MLS/IDX estimation calculator, from the guide's sourced fees only | T2 | ready |
| T16 | Internal linking, schema, sitemap, metadata housekeeping | T9, T12 | ready |
| T17 | SEO articles from the content strategy | T8 | ready |
| T18 | Outreach assets and list of external account actions | — | ready |

## Tracking events (T4)
| Event | Fired when | Properties |
|---|---|---|
| `cta_open` | a `[data-open-contact]` or `[data-open-quick-project]` element is clicked | `form`, `location`, `page` |
| `lead_submit` | a lead form succeeds | `form`, `page`, `service` |
| `lead_error` | a lead form fails | `form`, `page`, `service` |
| `calendly_click` | a Calendly link is clicked | `location`, `page` |
| `email_click` | a `mailto:` link is clicked | `page` |
| `guide_cta_click` | a CTA inside a guide's consultation block is clicked | `guide` |

Lead payload (email and `LEAD_WEBHOOK_URL`): `name`, `email`, `company`, `form`, `projectType`, `timeline`, `service`, `message`, `pageUrl`, `landingPage`, `referrer`, `utm`, `receivedAt`, `source`.

## Decisions
| Date | Decision | Why |
|---|---|---|
| 2026-10-09 | The brief's 18 tasks are the plan; no separate strategy file exists | nothing else to reconcile |
| 2026-10-09 | Title experiments: the seven pages with a clear query signal in Search Console | owner did not name them |
| 2026-10-09 | GA4 loads only when `NEXT_PUBLIC_GA_ID` is set | no credentials in the repo |
| 2026-10-09 | No headline dollar range in the MLS cost title | "$450–$7,500" is one Stellar MLS fee |
| 2026-10-09 | Case-study dates are not derived from git | earlier owner decision |
| 2026-10-09 | Industry pages only where two or more case studies exist, plus self-storage | avoid thin pages |
| 2026-10-09 | Shopify, Laravel and WordPress are capability pages with no project claims until B5 | brief approves the pages; repo has no project evidence |
