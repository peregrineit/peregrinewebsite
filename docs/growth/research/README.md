# Growth research (Sprint 2, stream D)

Two datasets. Both are research only: nothing was applied for, signed up to, submitted or sent.
`python3 scripts/test_research_data.py` checks their structure (it runs in `npm run test:systems`).

## keyword-map.csv (item 25)
One row per commercial query cluster, each mapped to exactly one target URL.

- **Source:** the Search Console export of 2026-10-09 (window 2026-09-28 to 2026-10-05, 8 days,
  468 impressions, 88 listed queries holding 198 impressions) and
  `peregrine-it.com-audit/GSC-FINDINGS-2026-10-09.md`. Numbers were computed from the export, not typed.
- **`evidence` column:** `observed` = every example query is in that export, with its impressions and
  position. `hypothesis` = no query for the cluster is in the export; the example phrases are guesses at
  what the page is for and carry no data. 18 rows are observed, 13 are hypotheses.
- **`query_impressions` / `avg_position`:** sum and impression-weighted mean over the cluster's listed
  queries only. Search Console hides rare and anonymised queries, so a page can have far more impressions
  than its cluster shows (the ATS case study: 34 page impressions, 2 query impressions).
- **`target_page_in_export`:** that URL's own row in the Pages sheet. Pages published after the export
  say "no impressions in the export".
- **`query_to_page_attribution`:** the export never says which URL served which query. Where the row
  says "inferred from topic", the pairing is a judgment, not a measurement; a page-filtered export
  settles it (see `docs/growth/systems/README.md`).
- **Rule kept:** no cluster appears twice and no URL is the target of two clusters. Other URLs that
  could take the same queries are in `competing_urls`; those are the cannibalization watch list.
- **Not mapped on purpose:** brand queries (13 queries such as "peregrine it solutions", 44 impressions)
  and five off-topic queries ("idx scams", "is idx credit monitoring legit", a persona prompt, a
  conversational follow-up, "real estate virtual spinner services"). 149 of the 198 listed query
  impressions are mapped.
- **Small sample:** the largest cluster has 25 impressions. Nothing here is a ranking conclusion; it is
  a map of where to look when the next exports arrive.

## partner-programs.csv (item 26)
Programs Peregrine could apply to or be listed in, judged against what the site says the firm does.

- **Every row was fetched on 2026-10-10** with a plain GET from the official page named in
  `official_url`; `fetch_result` records the HTTP outcome. Text in quotation marks is copied from the
  page; everything else is a close paraphrase of it.
- **`stated_cost`** is filled only when the amount is on the page named in `cost_source_url`;
  otherwise it says "not published".
- **"could not verify"** means the page could not be fetched or the fact was not on a page that was
  fetched. Clutch refused automated requests (HTTP 403) on both URLs tried, so its whole row is
  "could not verify"; check it in a browser.
- **`confidence`:** high = quoted from the official page; medium = official page read but part of the
  answer is inferred or the page is inconsistent; low = requirements not public; none = not fetched.
- **Odoo prices are shown in rupees** because Odoo localizes the page to the visitor's country and the
  request came from India. The US price was not seen.
- **Truthfulness limits to keep in mind before any application** (see `caveats`): RESO membership is
  not RESO certification; MLS data programs need a broker client in that MLS; Shopify's directory and
  Odoo's tiers have revenue or sales thresholds; Shopify, Odoo, Laravel and WordPress project claims are
  blocked on owner evidence (BLOCKERS B5, B6).
- Fees and requirements change. Re-fetch the page before acting on any row; `date_checked` is the
  only date these facts are known to hold.
