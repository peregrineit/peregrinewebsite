# Post-deployment validation and Search Console monitoring

PR #7 was merged on 2026-10-09 (merge commit `48ed23f`). Day-0 results are at the end of this file.

## Day 0: within an hour of the deploy

| # | Check | How | Pass |
|---|---|---|---|
| 1 | All pages | `python3 scripts/seo_check.py https://peregrine-it.com` | `FAILS: 0`, 57 URLs |
| 2 | Lead configuration | open `/api/lead` | `ok: true`, `resend: true`, `senderDomainVerified: true` |
| 3 | Real lead | submit the form on `/services/mls-idx-integration` | notification and auto-reply both arrive |
| 4 | Sitemap | `/sitemap.xml` lists 57 URLs | new URLs present |
| 5 | IndexNow | resubmit all sitemap URLs (footer and nav changed on every page) | HTTP 200 or 202 |
| 6 | Search Console | Sitemaps → resubmit; URL Inspection → Request indexing for `/industries/self-storage`, `/services/investor-portal-development`, `/tools/mls-idx-cost-calculator`, and the six new guides | "URL is on Google" within days |
| 7 | Rich results | Rich Results Test on one service page, one guide, one case study | no errors |
| 8 | Speed | three mobile PageSpeed runs each on `/`, one guide, one case study | compare with Phase 9: homepage main-thread 1.13 s |
| 9 | Logs | Vercel → Logs, filter `Lead NOT accepted`, `failed step`, `CSP violation` | none of the first two |

## Weekly, for six weeks (Search Console)

1. **Pages → Indexing.** New URLs move from "Discovered" to "Indexed". Investigate any new URL still not indexed after 3 weeks: check inbound links and whether it overlaps another page.
2. **Performance → Pages**, last 7 days against the previous 7. Record clicks, impressions, CTR and position for the seven title-experiment pages (baselines in `TASKS.md`). Decide each experiment only after 300 further impressions; revert a title whose position drops by more than 3 with no CTR gain.
3. **Performance → Queries**, filter by page for each new page. Note queries with impressions and position 8–20: those are the next content edits. Do not write a new page for a query an existing page already ranks for.
4. **Cannibalization.** Filter queries containing `mls`, `idx`, `investor portal`, `self storage`, `odoo`. If two URLs trade places for one query, strengthen the internal links to the intended one. Pairs to watch:
   - `/blog/mls-idx-integration-cost` and `/tools/mls-idx-cost-calculator`
   - `/blog/how-to-get-mls-data-access` and `/blog/mls-data-access-canada`
   - `/services/investor-portal-development` and `/case-studies/proptech-investor-portal`
   - `/industries/self-storage`, the self-storage case study and the build-or-buy guide
   - `/services/react-development` and `/services/nextjs-development`
5. **Countries.** The goal is US and Canada. Record their share of clicks and impressions; a rise in other countries alone is not progress.
6. **Enhancements.** Breadcrumbs and FAQ reports show no new errors.
7. **Core Web Vitals** (field data, when there is enough traffic to report).

## Leads (the number that matters)

Weekly: count of enquiries received at `info@peregrine-it.com`, and for each, the `Landing page`, `Service` and `UTM` lines from the notification email. With GA4 set up: `lead_submit` by landing page, and `guide_cta_click` and `calculator_use` as leading indicators. A page with traffic and no `cta_open` after 200 visits needs its call to action looked at before it needs more traffic.

## Stop-and-fix triggers

- Any `Lead NOT accepted` or `failed step` log line, or a `lead_delivery_failed` event.
- `seo_check.py` on production reports a failure.
- A previously indexed URL leaves the index.
- Homepage position for the brand name drops.

## Day-0 results (2026-10-10, production at `48ed23f`)

| # | Check | Result |
|---|---|---|
| 1 | Release live | GitHub shows a Production deployment for `48ed23f`; production serves the new status endpoint and all new URLs |
| 2 | `seo_check.py https://peregrine-it.com` | **FAILS: 0** on 57 URLs; 152 schema nodes, 393 references resolve |
| 3 | Indexing readiness | 57 of 57: status 200, no `noindex` in meta or `X-Robots-Tag`, canonical equals the sitemap URL. `robots.txt` allows all and names the sitemap. `www` and `http` redirect with 308 |
| 4 | Lead configuration (`GET /api/lead`) | `ok: true`, `resend: true`, `sender: custom`, `senderDomainVerified: true`, `environment: production`, `webhook: false`, `durableStorage: none` |
| 5 | Real lead on production | **Not run by me** (I do not send test leads to the live inbox unasked). Preview test passed on the same code, reference `0a3efc8a`. Owner: one "TEST" submission on `/contact` |
| 6 | New pages | 6 service pages, 7 industry URLs, 6 new guides, calculator: all 200. Calculator computes on production (IDX Broker Core $60/month + Stellar back-office $450/year → $1,170/year) |
| 7 | Homepage | stats row and client logos as released; no client quotes; no console errors |
| 8 | IndexNow | 57 URLs submitted, HTTP 200 |
| 9 | Lighthouse mobile, local run against production | Accessibility 100, Best practices 100, SEO 100 on five pages. Performance: homepage 93, cost guide 97, investor-portal service 97, calculator 99, investor-portal case study 86. CLS 0 everywhere |
| 10 | Search Console | **No access from here**: the connected SEO data tool returns "Insufficient plan" for Search Console, and no Google API credentials are configured. Owner steps below |

**Note on case-study speed.** The lab runs put case-study LCP at 3.7 s simulated. Unthrottled first paint on this machine varied between 0.7 s and 2.6 s for the same page, and other pages showed the same scatter, so this is not a confirmed defect and nothing was changed. Real-user numbers are in Vercel → Speed Insights (already installed); check LCP for `/case-studies/*` there after a week of traffic before spending effort.

## Search Console: what the owner does once (about 5 minutes)

1. **Sitemaps** → enter `sitemap.xml` → Submit (resubmitting is fine). Expect "Success" and 57 discovered URLs.
2. **URL Inspection → Request indexing** for, in this order: `/services/investor-portal-development`, `/industries/self-storage`, `/tools/mls-idx-cost-calculator`, `/blog/investor-portal-vs-file-sharing`, `/blog/self-storage-software-build-vs-buy`, `/blog/idx-vendor-vs-custom-build`, `/blog/reso-web-api-vs-rets`, `/blog/mls-data-access-canada`, `/blog/odoo-implementation-cost`, and the homepage (to retire the old `http://` entry).
3. **For me to read the data:** either export Performance (Queries, Pages, Countries, Devices; last 28 days) to the `peregrine-it.com-audit` folder each Friday, or add a Google service account with read access to the property and put its path in `~/.config/claude-seo/google-api.json`.

## Next improvement queue (starts when data exists)

Every item in the October 9 Search Console findings that could be shipped has shipped. The next changes should follow new data, not guesses.

| # | Trigger (from Search Console) | Action |
|---|---|---|
| N1 | `/blog/mls-idx-integration-cost` reaches 300 further impressions | Compare CTR with the 0.9% baseline. Unchanged = stop optimizing the title; the query is being answered without a click |
| N2 | Each of the other six title experiments reaches 300 impressions | Keep or revert, per the table in `TASKS.md` |
| N3 | `investor portal …` and `self storage …` queries, 3 weeks after indexing | Baseline was positions 51–90 with no dedicated page. Which URL now ranks, and where? If the case study still outranks the service page, strengthen links to the service page |
| N4 | Queries at positions 8–20 on any new page | Edit that page to answer the query directly; no new page |
| N5 | Canada's share of impressions (baseline 3%) | If `/blog/mls-data-access-canada` earns impressions, add the board-level detail those queries ask for |
| N6 | `odoo refurbed integration`, `odoo orderstream integration` (baseline positions 51 and 25) | Blocked on B6: needs the list of systems actually integrated |
| N7 | Leads | Count enquiries by `Landing page` and `Service` from the notification emails; this, not impressions, is the result |
