# Growth Sprint 2: report

> **Superseded for release purposes by `RELEASE-S2.md`.** After this report the experimental Blob store was removed, webhook retry became opt-in, signatures gained a timestamp and click ids became consent-only. Statements below about the store describe the sprint, not the release candidate.

**Date:** 2026-10-10 · **Base:** `main` at `48ed23f` · **Nothing is merged to `main` or deployed.**

## Time
About 1 hour 10 minutes of wall-clock time (first commit 01:24, this report 02:33 local), not six hours. Agent working time, added up across the parallel streams, was about 2 hours 50 minutes. The sprint stopped when the selected backlog was done and the remaining items needed an owner decision or data; see "Why it stops here".

## Streams and tasks

| Stream | Tasks attempted | Completed | Notes |
|---|---|---|---|
| Main session | 3 | 3 | Backlog; case-study inline form; integration, review, fixes |
| A Lead engineering | 8 + 8 review fixes | 16 | One independent review between the two batches |
| B Commercial pages | 6 + 4 | 10 | Item 14 delivered as a proposal only, by design |
| C Technical content | 2 + 2 + 1 | 5 | Four guides and one bug fix |
| D Growth systems | 7 | 7 | CI workflow written but not active (see blockers) |
| Independent reviewer | 1 | 1 | Ten invariants attacked; six defects confirmed by running the app |

## Delivered

**Lead capture (A, pull request #14)**
- First-touch and last-touch attribution, click ids, form-open location and pages viewed, in the notification email and webhook.
- Calendly links tagged with page and CTA.
- `lead_form_start`, `lead_form_abandon`; HTTP status on `lead_error`.
- A priority line in the notification, with reasons.
- Webhook retry inside a shared time budget, optional signature, HTML or `ok: false` answers no longer accepted.
- Deadlines on Resend calls; single-line fields cannot forge lines; edited retries are no longer dropped.
- Optional owner alert. Optional durable store, off by default and experimental.
- Consent-gated storage: without analytics consent nothing outlives the tab.

**Commercial pages (B, #11)**
- Fit and not-fit, scope inputs, first phase and scoping checklist on 12 service pages and 6 industry pages; case-study proof links.
- Services index grouped by need with a buyer FAQ; contact page explains routes, next steps and what to include.

**Technical content (C, #12; the fourth guide is in the integration pull request)**
- `/blog/mls-data-pipeline-architecture` (diagram, compliance checkpoints, 12 failure modes).
- `/blog/laravel-upgrade-checklist`.
- `/blog/investor-portal-security-checklist` (OWASP ASVS 5.0.0, NIST SP 800-63B-4).
- `/blog/odoo-shopify-marketplace-integration` (record-ownership table, failure modes, go-live checklist).

**Growth systems (D, #13)**
- `gsc_report.py`, `lead_health.py`, `check_sources.py`, `meta_snapshot.py`, with tests and fixtures.
- Keyword map (31 clusters) and partner-program dataset (13 programs, sources fetched on the day).
- CI workflow as a proposal file.

**Main session (#10 and the integration pull request)**
- Inline project form on all 19 case studies, tagged with the case study.
- Footer reviews link fixed (it pointed at a host that does not resolve, on every page).
- Eight moved source links updated after re-reading each page.
- New guides linked from their service pages.

## Tests on the integrated build (`growth/s2-integration`)

| Check | Result |
|---|---|
| TypeScript | clean |
| ESLint | 0 errors (68 legacy warnings) |
| `seo_check.py` | FAILS: 0 on 61 URLs; 165 schema nodes, 421 references |
| Lead API integration | 229 passed (83 before the sprint) |
| Lead priority / client unit tests | 54 / 87 passed |
| Lead browser checks (headless Chrome, stream A) | 39 passed |
| Tool tests (`npm run test:systems`) | 197 passed across five files |
| Calculator fees | 56 passed |
| Metadata snapshot | 0 differences from the refreshed baseline (61 URLs) |
| Lighthouse, eight changed pages, local | accessibility 100, SEO 100; performance 95–96, case study 89; CLS 0 |
| End-to-end in a browser, mock mail server | a case-study lead arrived with landing page, UTM, click id, first touch, form location, priority and reference; no cookie, no local storage without consent |

**Source verification by the main session:** samples from every guide's source log were re-fetched and matched (RESO, MLS Grid, Trestle, Laravel, PHP, OWASP ASVS, NIST, Shopify, Odoo). Sixteen new statements about case studies were checked against the case-study pages.

**Not verified:** anything against real Resend, a real Apps Script receiver, a real Blob store, Calendly recording the UTM values, browsers other than Chrome, the CI workflow on GitHub.

## Pull requests (all drafts, against `main`)

| # | Content | Merge note |
|---|---|---|
| 10 | Base: case-study form, backlog | included in every other one |
| 11 | B: commercial pages | |
| 12 | C: three guides | the Odoo guide is only in the integration pull request |
| 13 | D: tools and research | |
| 14 | A: lead path | highest risk; test a real lead on its preview first |
| integration | Everything, tested together, plus the cross-stream fixes and the refreshed baseline | **Recommended: review 10–14, merge only this one** |

Merging the stream pull requests one by one also works, but the cross-stream fixes (source links, footer link, guide links from service pages, metadata baseline, lead tests in npm scripts) exist only in the integration branch.

## Mistakes made during the sprint
- A wrong edit briefly pointed the real estate SaaS case study at the investor portal service; caught by the check that followed and corrected before committing further.
- The owner's untracked `public/case-studies/` images were staged in one unpushed merge commit; removed from the commit before any push. The files were not touched.
- Unpushed history on two local branches was rewritten to move the CI workflow file out of `.github/`; a file-name error in that step was repaired with ordinary commits.

## Remaining blockers
| What | Needs |
|---|---|
| CI workflow inactive | The owner copies `docs/growth/systems/ci-workflow.yml` to `.github/workflows/ci.yml`; the token here lacks the `workflow` scope |
| Durable lead store | A Vercel Blob store and token, and a real test on a preview; the endpoint used is the SDK's, not a documented one |
| Search Console data | Exports in the audit folder, or a read-only service account |
| Refurbed and OrderStream by name | Their developer documentation could not be fetched, and no Odoo integration is confirmed (B6); the Odoo guide is generic |
| GA4 | A measurement ID; form start and abandon events and consented first-touch storage only matter once it exists |

## Decisions required
1. Merge the integration pull request, or the stream pull requests individually.
2. Homepage technology lists: 10 of 40 appear in a case study (`docs/growth/commercial/HOMEPAGE-TECH-PROPOSAL.md`).
3. Privacy policy: review the draft paragraph in `docs/growth/lead/ARCHITECTURE.md` before the attribution changes go live.
4. Whether to enable the owner alert and webhook signature (optional variables).
5. Partner programs worth applying to (`docs/growth/research/partner-programs.csv`; RESO Class B dues are published from $550 a year).

## Why it stops here
The selected items are done and reviewed. What is left in the backlog is item 14 (an owner decision), item 27's real-user speed question (needs Speed Insights data) and content that would need facts Peregrine has not confirmed. More guides were possible, but four reviewed assets in one sprint is already more than search demand on record justifies, and the brief asked for a small number.

## Recommended next sprint
1. Release this one behind a preview lead test, then measure: leads by landing page and priority, Calendly bookings by `utm_content`.
2. Feed two or three weeks of Search Console exports to `gsc_report.py` and act on its "next edits" list.
3. Enable CI.
4. Decide on a durable lead record (Google Sheet receiver or Blob) and test it for real.
5. Owner facts that unlock pages: Odoo integrations delivered, Shopify, Laravel and WordPress projects, team members.

## Worktrees left on disk
`~/Code/pw-s2-lead`, `pw-s2-commercial`, `pw-s2-content`, `pw-s2-systems` (each with `node_modules`), and the earlier `peregrinewebsite-favicon`. Safe to remove once the pull requests are merged or closed.
