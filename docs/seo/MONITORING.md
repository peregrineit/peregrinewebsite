# Post-deployment validation and Search Console monitoring

For use after PR #7 is merged. Nothing here has been run against production yet.

## Day 0: within an hour of the deploy

| # | Check | How | Pass |
|---|---|---|---|
| 1 | All pages | `python3 scripts/seo_check.py https://peregrine-it.com` | `FAILS: 0`, 57 URLs |
| 2 | Lead configuration | open `/api/lead` | `ok: true`, `sender: "verified-domain"` |
| 3 | Real lead | submit the form on `/services/mls-idx-integration` | notification and auto-reply both arrive |
| 4 | Sitemap | `/sitemap.xml` lists 57 URLs | new URLs present |
| 5 | IndexNow | resubmit all sitemap URLs (footer and nav changed on every page) | HTTP 200 or 202 |
| 6 | Search Console | Sitemaps → resubmit; URL Inspection → Request indexing for `/industries/self-storage`, `/services/investor-portal-development`, `/tools/mls-idx-cost-calculator`, and the six new guides | "URL is on Google" within days |
| 7 | Rich results | Rich Results Test on one service page, one guide, one case study | no errors |
| 8 | Speed | three mobile PageSpeed runs each on `/`, one guide, one case study | compare with Phase 9: homepage main-thread 1.13 s |
| 9 | Logs | Vercel → Logs, filter `Lead not delivered`, `Lead notification email failed`, `CSP violation` | none of the first two |

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

- Any `Lead not delivered` log line.
- `seo_check.py` on production reports a failure.
- A previously indexed URL leaves the index.
- Homepage position for the brand name drops.
