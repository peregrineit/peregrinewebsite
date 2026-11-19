# Sources: /blog/mls-idx-integration-cost (additions of 2026-10-21)

Earlier sources for this guide are logged in docs/growth/systems/reports/source-links-2026-10-10.md and in `src/data/mls-fees.ts` (FEES_CHECKED). This file records only the three notes added on 2026-10-21. Each quote below was fetched with curl and matched against the page text.

| URL | Exact text relied on | Retrieved |
|---|---|---|
| https://trestle-documentation.corelogic.com/data-pricing.html | "Effective January 2027 the connection fee Cotality charges to Technology Providers will increase 5% across all Tiers." Table: "All RESO feeds $105 $115 $131 $157 $183" | 2026-10-21 |
| https://repliers.com/plans-and-pricing/ | Monthly Payments: "$199 / month Standard", Professional $299, Advanced $399 (plan cards and the "Compare Plans" table). Single Annual Payment: "$182 / month Standard", "$275 / month Professional", "$365 / month Advanced" | 2026-10-21 |
| https://www.mlsgrid.com/resources | "Below is our Master Data License Agreement, the AI Use Addendum if you intend to utilize MLS Data with AI, and corresponding rules to IDX and VOW uses of MLS Data." | 2026-10-21 |

Note: one feature-comparison block on the Repliers page shows "$149 /month Standard". The plan cards and the "Compare Plans" table both show $199, so the guide uses $199. `src/data/mls-fees.ts` is unchanged: its Repliers figures are the monthly plan prices, and those still match.
