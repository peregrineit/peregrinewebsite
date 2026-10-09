# Growth systems (Sprint 2, stream D)

Tools that report on the site and guard it. All Python is standard library only; nothing here needs a
secret, an account or a paid service. Every script has `--help` and a test that was run on 2026-10-10.

| Tool | Command | Exit codes | Test |
|---|---|---|---|
| Search Console report | `npm run report:gsc -- <folder> --out docs/growth/systems/reports/gsc-YYYY-MM-DD.md` | 0 written, 2 no usable export | `python3 scripts/test_gsc_report.py` (100 checks) |
| Lead-delivery health | `npm run check:leads` (production) | 0 ok, 1 warn, 2 fail | `python3 scripts/test_lead_health.py` (18) |
| Source links | `npm run check:links -- http://localhost:3057 --out-md … --out-json …` | 0 clean, 1 broken links, 2 crawl failed | `python3 scripts/test_check_sources.py` (42) |
| Metadata snapshot | `npm run check:meta` (local build against the baseline) | 0 same, 1 differences, 2 could not run | `python3 scripts/test_meta_snapshot.py` (19) |
| SEO invariants (existing) | `npm run check:seo` | 0 / 1 | n/a |
| All four tool tests | `npm run test:systems` | 0 / 1 | |

## Weekly Search Console report
1. In Search Console → Performance, set the date range to **Last 7 days** and press **Export** (Excel or CSV; both work).
2. Put the file in one folder that you keep, next to earlier weeks' exports. Do not rename or delete old ones:
   the report compares the newest window with the previous one of the same length.
3. For cannibalization and "next edits by page", also export once per watched page:
   **+ New → Page → URLs containing/exact URL → Export**. A site-wide export never says which URL served
   which query, so without these the report says "cannot be determined" rather than guessing.
4. `python3 scripts/gsc_report.py <folder> --out docs/growth/systems/reports/gsc-YYYY-MM-DD.md`

What the report will not do: give a title-experiment verdict before 300 impressions have accumulated after
the change date (`--experiments-start`, default 2026-10-10); judge a page's CTR under 100 impressions; count
7+ word queries (AI-surface fan-out, inferred from shape) in any CTR judgment. The expected-CTR curve is an
assumption printed in every report, not a measurement of this site.

**Not yet proven on real data:** no page-filtered export was available on 2026-10-10. The parser reads the
`Filters` sheet and treats a row named `Page` (or `URL`) as the filter; that is tested on fixtures only.
Check the "Exports read" table the first time a real page-filtered export is added: its role must say
`page-filtered`. Compare-mode exports (two date ranges in one file) are detected and skipped.

## Lead health
`python3 scripts/lead_health.py` sends one GET to `https://peregrine-it.com/api/lead` and never a POST.
It reports configuration, not delivery: only a real enquiry proves an email arrives. Suitable for cron:
`python3 scripts/lead_health.py --json || <alert>`.

## Source links
Needs a running build (`scripts/serve-local.sh`). About one minute for ~140 links. `blocked-or-login`
means the site refused a script (Clutch, BLS, FINRA, realtor.ca, the Wayback Machine under load); open
those by hand. `ok` means the address answers, not that the quoted figure is still on the page.

## Metadata snapshot
`tests/fixtures/meta-baseline.json` was captured from production on 2026-10-10 (57 URLs). CI compares
every build with it. **An intended change (a new page, a new title, new schema) fails the check until the
baseline is refreshed in the same pull request:**

    scripts/serve-local.sh && python3 scripts/meta_snapshot.py http://localhost:3057 --update

Read the diff first; the point of the check is that someone looks at it.

## CI (`.github/workflows/ci.yml`)
Runs on every pull request and every push to `main`: `npm ci`, `npx tsc --noEmit -p .`, `npx eslint src`
(errors fail, warnings do not), `npm run build`, the fee test, `npm run test:systems`,
`python3 scripts/test_lead_api.py`, then starts the build and runs `seo_check.py` and `meta_snapshot.py`.
Node 22 (Next 16 needs 20.9+, `--experimental-strip-types` needs 22.6+). Read-only token, no secrets, no
deploy step, 20-minute timeout, superseded runs cancelled. It makes no request to production or to any
third party; `check:leads` and `check:links` are deliberately not in CI.

**Status: unproven until GitHub runs it.** The YAML parses (Ruby `YAML.load_file`, `js-yaml`) and every
command was run locally in order on macOS with Node 22.22.2 and Python 3.12.8 on 2026-10-10, all exit 0.
Not verified: the `ubuntu-latest` image, `actions/setup-node` caching, and whether the repository's
Actions settings allow workflows on pull requests.

## Reports
`reports/gsc-2026-10-09.md`, `reports/source-links-2026-10-10.md` (+ `.json`): first real runs.

## First-run findings (2026-10-10)
- **Footer "Testimonials" link does not resolve.** `https://share.google.com/DOm7mkXoRAN5u1mWi`
  (`src/app/components/Footer.tsx`, every page): DNS has no `share.google.com`. The same path on
  `https://share.google/…` answers with a redirect. Not edited here (outside this stream's files).
- `https://northstarmls.com/third-party-data-usage/` (source in `/blog/how-to-get-mls-data-access`)
  answered 503 twice, and again on a manual request. Re-check; may be temporary.
- `https://www.facebook.com/peregrineitsolution` answers 400 to scripts. Facebook does this to
  non-browser clients; verify by hand, probably fine.
- Eight sources have moved to a new address (pricing pages of BoldTrail, Lofty, iHomefinder, Real Geeks,
  Wise Agent; two help articles; the MLS Grid access guide PDF). Each still redirects; re-read the new page
  before updating the link.
- Metadata: local build of this branch is identical to production on all 57 URLs.
- Lead health on production: OK (custom sender, sender domain verified, environment production).
