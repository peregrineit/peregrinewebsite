# Retirement recommendation: `/blog/cheapest-idx-options`

**Date:** 2026-10-13. **Status:** approved by the owner on 2026-10-14 (301 to `/blog/mls-idx-integration-cost`, no 410); implemented on branch `release/idx-housekeeping`, not yet deployed.

## Recommendation

Retire the page with a permanent (301) redirect to `/blog/mls-idx-integration-cost`, and remove it from the sitemap, the guide list, `llms.txt` and the two "related" lists that point to it.

The decision that is the owner's: whether the redirect goes to the cost guide (recommended) or the page is removed with a 410 and no redirect. The second is cleaner editorially, but it turns the one external signal the page may have gained (an IndexNow submission on 2026-10-12) into a dead URL.

## Evidence

| Question | Finding | How it was checked |
|---|---|---|
| Age | First published 2026-10-12, one day before this audit | `src/data/guides.ts` |
| Search traffic | **Not measurable.** The newest Search Console export on this machine is dated 2026-10-09, before the page existed. No Search Console access from here | `~/Code/peregrine-it.com-audit/` |
| Third-party traffic estimate | No data for the URL | SEO data tool, page overview, 2026-10-13 |
| Backlinks | None found | SEO data tool, URL-level backlink lookup, 2026-10-13. A one-day-old page would not be expected to show any, so this is weak evidence of absence |
| Index status | Unknown. The URL was in the sitemap and was submitted to IndexNow on 2026-10-12, so it may have been crawled | No Search Console access |
| Internal links in | 4: `/services/mls-idx-integration`, `/blog`, `/blog/mls-idx-integration-cost`, `/blog/idx-vendor-vs-custom-build` | Crawl of all 78 production URLs, main content only |
| Internal links out | `/blog/mls-idx-integration-cost`, `/blog/idx-vendor-vs-custom-build`, `/tools/mls-idx-cost-calculator`, `/services/mls-idx-integration`, `/contact` | Same crawl |

Before acting, the owner can close the two unknowns in Search Console in about two minutes: URL Inspection for the page (indexed or not), and Performance filtered to the page (any impressions).

## Replacement URL candidates

| Candidate | Fit | Verdict |
|---|---|---|
| `/blog/mls-idx-integration-cost` | Same intent (what IDX costs). Already names the same vendors and their published plan prices, and links to the calculator | **Recommended target** |
| `/tools/mls-idx-cost-calculator` | Answers "what will it cost me" interactively, but a tool page is a poor landing for a reader who clicked an article | Second choice |
| `/blog/idx-vendor-vs-custom-build` | Related decision, but about approach, not price. Mentions one vendor by name | Not a match for the query |
| `/blog/idx-website-features-checklist` | Being rewritten as engineering requirements; different reader | No |

A redirect is defensible here because the target answers the same question. It is not a redirect to an unrelated page to keep a URL alive.

## What would be lost

Three things on the page are not on the cost guide: the single ranked "lowest plan per vendor" table, the first-year totals per vendor, and the section on free MLS-provided search links. The first two are the content the owner rejected. The third (free MLS-provided links) is factual and useful; if wanted, it can be added to the cost guide as one short section, with its sources re-fetched at that time.

## Change list if approved (one small pull request)

1. `next.config.ts`: add a permanent redirect from `/blog/cheapest-idx-options` to the chosen target.
2. Delete `src/app/blog/cheapest-idx-options/` and its entry in `src/data/guides.ts`.
3. Remove the slug from `related` on `mls-idx-integration-cost` and `idx-vendor-vs-custom-build`, and from the `guides` list on the MLS/IDX service in `src/data/services.ts`. Replace each with a current guide so no list shrinks.
4. Remove its line from `public/llms.txt`.
5. Remove its cover from `public/images/blog/` and `design/blog-heroes/`.
6. Refresh `tests/fixtures/meta-baseline.json` (77 URLs) and run `seo_check.py`.
7. After deploy: confirm the old URL returns 308/301 to the target, submit both URLs to IndexNow, and in Search Console inspect the old URL once.

## Not recommended

- Leaving the page live: it is the topic the owner rejected, and its price table will go stale without upkeep.
- `noindex` and keep: leaves a rejected page reachable from internal links.
- Redirecting to the homepage or `/blog`: treated by search engines as a soft 404.
