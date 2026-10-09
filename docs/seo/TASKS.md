# SEO tasks

**Status key:** `done` · `in progress` · `ready` · `partial` (shipped what is verifiable; rest blocked) · `blocked`
**Branch:** `seo/phase-12`, stacked on `seo/phase-11`. Merge order: 11, then 12.
Per-task detail, files, hashes and tests are in `PROGRESS.md`. Blockers are in `BLOCKERS.md`.

| ID | Task | Depends on | Status |
|---|---|---|---|
| T0 | Execution state: CLAUDE.md, docs/seo, `scripts/seo_check.py`, `scripts/serve-local.sh` | — | done |
| T1 | Seven title and description experiments | — | done (re-measure after 300 impressions each) |
| T2 | MLS/IDX pricing and integration content from verified (sourced) data | T3 | done |
| T3 | Technical consultation CTA and short lead qualification form | T0 | done (copy: B4) |
| T4 | GA4 events and CRM attribution | T3 | done in code (data: B2, B3) |
| T5 | About, team and client sections from verified information | — | partial: eight named clients linked; team blocked (B7) |
| T6 | Odoo integration content from verified capabilities | — | blocked (B6) |
| T7 | Self-storage software landing page | T9 | done (vendor names: B10) |
| T8 | Investor portal development page | — | done |
| T9 | Industry hub with relevant case studies | — | done |
| T10 | Shopify development service page | T12 | partial: capability page live on branch; project proof blocked (B5) |
| T11 | Laravel development service page | T12 | partial: capability page; project proof blocked (B5) |
| T12 | Next.js and React development pages | — | done |
| T13 | WordPress development service page | T12 | partial: capability page; project proof blocked (B5) |
| T14 | Verified MLS-specific content | — | blocked (B8) |
| T15 | MLS/IDX estimation calculator, from the guide's sourced fees only | T2 | done |
| T16 | Internal linking, schema, sitemap, metadata housekeeping | T9, T12 | partial: linking, robots, sitemap, Person url, W3\|re label done. homepage video and logo weight done. Open: CSP report-to (B15), W3\|re dashboard block (B9) |
| T17 | SEO articles from the content strategy | T8 | partial: first guide published on the branch (investor portal vs file sharing); four briefs remain in ARTICLES.md; two blocked (B6, B8) |
| T18 | Outreach assets and list of external account actions | — | done: OUTREACH.md (nothing sent) |

## Title experiments (T1)
Baseline: Search Console, 2026-09-28 to 2026-10-05 (8 days). Only the first row has enough volume to call under-clicked; the rest are experiments. Re-measure each after 300 further impressions; revert any whose position drops.

| Page | Impr. | Pos. | Clicks | Query signal | Old title | New title |
|---|---|---|---|---|---|---|
| `/blog/mls-idx-integration-cost` | 109 | 6.5 | 1 | mls api cost, mls grid pricing, idx cost per month | MLS/IDX Integration Cost (2026) | MLS & IDX Cost per Month and per Year (2026) |
| `/case-studies/proptech-investor-portal` | 36 | 48.4 | 1 | investor portal solutions, custom investor portal | Investor Portal for a Real Estate Developer | Custom Real Estate Investor Portal Case Study |
| `/case-studies/recruitment-ats-platform` | 34 | 5.2 | 0 | ats saas, resume parsing, candidate pipelines | Recruitment ATS with Resume Parsing | ATS SaaS with Resume Parsing: Case Study |
| `/case-studies/edtech-learning-platform` | 17 | 7.5 | 0 | edtechlms, edtech lms | EdTech LMS with Video Streaming | EdTech LMS Development Case Study |
| `/case-studies/self-storage-management-platform` | 17 | 40.7 | 0 | saas self storage software, self storage software with stripe | Self-Storage Management SaaS Platform | Self-Storage SaaS Case Study: 150+ Facilities |
| `/case-studies/event-ticketing-platform` | 14 | 8.7 | 1 | ticketing platform with custom checkout, refunds | Event Ticketing with Real-Time Availability | Event Ticketing Platform: Checkout & Refunds |
| `/services/odoo-erp` | 14 | 41.5 | 0 | odoo integration, odoo refurbed/orderstream integration | Odoo Custom Modules & API Integration | Odoo Integration & Custom Module Development |

All titles carry the ` | Peregrine IT` suffix and are 60 characters or fewer. Descriptions were rewritten to lead with the page type and the searched terms; every fact in them is already on the page.

## Tracking events (T4)
| Event | Fired when | Properties |
|---|---|---|
| `cta_open` | a `[data-open-contact]`, `#lets-talk-btn` or `[data-open-quick-project]` element is clicked | `form`, `location`, `page` |
| `lead_submit` | a lead form succeeds | `form`, `page`, `service` |
| `lead_error` | a lead form fails | `form`, `page`, `service` |
| `calendly_click` | a Calendly link is clicked | `location`, `page` |
| `email_click` | a `mailto:` link is clicked | `page` |
| `guide_cta_click` | a Calendly click, popup open or form submit inside a guide's consultation block | `guide`, `action` |
| `calculator_use` | first interaction with the cost calculator | `tool` |

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

## Review of Phases 11 and 12 (2026-10-09)
| ID | Item | Status |
|---|---|---|
| R1 | Independent code review of `origin/main...seo/phase-12`; ten findings, none critical or high | done; all fixed except the Resend sender (B3) |
| R2 | Integration tests for the lead API against mocked Resend and webhook | done: `scripts/test_lead_api.py`, 39 checks |
| R3 | GA4 consent | done: Consent Mode default denied + consent bar, only when the GA ID is set |
| R4 | Media: lazy CTA video, logo weight; footer data out of the client bundle; nav wrap | done |
| R5 | Production deployment checklist | done: `DEPLOYMENT.md` |
