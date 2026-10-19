# Sources: self-storage-access-control-integration

All pages fetched and read on 2026-10-19, with curl (and, for the PTI page, whose table and body text load with JavaScript, a headless Chrome `--dump-dom` render plus WebFetch). Each phrase below was matched in the fetched text. Each row is the sentence or figure the article relies on. Vendors are quoted as examples of published behavior; Peregrine has not evaluated these products and claims no partnership with any of them.

| URL | Relied on | Date |
|---|---|---|
| https://www.spiderdoor.com/multi-site-gate-access-control/ ("Running Gate Access Across Multiple Storage Facilities", posted August 20, 2026; `?p=6713` redirects here) | "The management software at that location decides how fast a code reaches the keypad. Some platforms sync in real time. Others sync every eight to twelve minutes. Edited codes are slower than new ones: on SiteLink, an edited gate code syncs roughly three times in a twenty four hour period." | 2026-10-19 |
| same | "the Sync Location Codes button in the admin confirms everything is synced, and it can be used up to ten times in a 24-hour period." / "A tenant with a future move-in date will not have a working code until that date arrives." | 2026-10-19 |
| same | "Your management software holds each tenant's status and the rules that go with it. When an account goes past due, the software shuts off the gate code until the balance clears." / SiteLink per-tenant override "Always Lock Out at Gate" or "Never Lock Out at Gate" | 2026-10-19 |
| same | "Check for stray master codes while you are there. One left in place opens the gate no matter what the balance says." | 2026-10-19 |
| same | "Sites on different management software sit in separate accounts" | 2026-10-19 |
| same | "If the building's internet drops, cellular keypads keep running." / "Whether the gate stays shut or opens with the power out is set by the gate hardware, not the keypad." | 2026-10-19 |
| same | "These are the questions worth asking any vendor, including this one." ... "Where is a lockout decision made, in your system or in my management software?" | 2026-10-19 |
| https://www.insideselfstorage.com/suppliers-products/quikstor-self-storage-software-integrates-with-opentech-cia-access-control-insomniac-smartlock (Inside Self-Storage, datePublished 2026-01-16, reporting a press release) | "QuikStor serves as the system of record for tenant accounts, while OpenTech's systems execute access permissions automatically." | 2026-10-19 |
| https://www.ptisecurity.com/us/en/pti-partners/pms-integrations | "Our access control platform, StorLogix Cloud, integrates with nearly every PMS on the market." / "tenant information, payments, and access are automatically synced" / table columns "PMS", "BridgeApp", "API" (not defined on the page). Rows: SiteLink Yes/No; StorEdge Yes/No; StorEdge Webhooks No/Yes; Unit Trac No/Yes; Yardi Breeze Yes/Yes | 2026-10-19 |
| https://www.insideselfstorage.com/suppliers-products/pti-security-systems-partners-with-storable-to-launch-real-time-cloud-integration-for-self-storage-operators (Inside Self-Storage, datePublished 2026-03-16, reporting a press release) | "Events in Storable Edge can now transfer to StorLogix Cloud in near real time" (quoted PTI product manager) / "It also eliminates the need for onsite syncing tools" (the release, as reported) | 2026-10-19 |
| https://opentechalliance.com/solutions/insomniac-cia-access-control/ | "OpenTech IoE includes an open API so any property management software, call center, or other applications can easily integrate with the platform." / "Automate and monitor overlocks and unit access remotely from the IoE Control Center" | 2026-10-19 |
| https://www.janusintl.com/products/noke/noke-faqs | "The Nokē® Smart Entry System integrates with all major property management software providers." / "New integrations typically take 4-6 weeks." / "The current version of the system uses Bluetooth unit controllers at the door to control each lock." / "Automated overlocking and release" | 2026-10-19 |
| https://support.davincilock.com/facility-management-software-integration-partners | "If you have been using DaVinci Lock® prior to integrating a facility, the software will attempt to retroactively assign the locks to your units in your FMS. So no errors occur, ensure the unit numbers match the naming convention within your FMS." | 2026-10-19 |
| https://www.storable.com/products/access-control/ | "Automatically lock out tenants who miss payments and send them a payment link to restore access (Storable Edge only)." | 2026-10-19 |
| https://docs.stora.co/2025-09/guides/allocations-and-access (also read as the `.md` version) | Unit statuses `available`, `reserved`, `occupied`, `overlocked` / "Stora automatically transitions reserved units to `occupied` on the tenancy's start date. This runs at approximately 6:00 AM in the operator's local timezone." | 2026-10-19 |
| same | "Operators can also configure Stora to auto-overlock units when a payment fails." / "every status change described in this guide automatically syncs to the third-party access control system" / "the API is your single point of control for both the logical state of a unit and the physical access to it" | 2026-10-19 |
| https://docs.stora.co/2025-09/guides/webhooks (read as the `.md` version) | "Stora automatically retries failed deliveries up to 6 times" / "After 6 failed attempts, the delivery is marked as failed." | 2026-10-19 |
| https://docs.stripe.com/billing/revenue-recovery/smart-retries (HTML and `.md`) | "Stripe Billing can automatically retry failed subscription and invoice payments for you." / "The recommended default setting is 8 tries within 2 weeks." / "Use the `invoice.payment_failed` webhook to receive subscription payment failure events and retry attempt updates." | 2026-10-19 |
| same | "If a failure returns a hard decline code, we can't retry invoice payment without a new payment method." / "After the final payment attempt, Stripe makes no further payment attempts." / end-state settings: cancel, mark as unpaid, leave overdue (past_due), pause | 2026-10-19 |
| https://docs.stripe.com/billing/subscriptions/webhooks (`.md`) | `past_due`: "Stripe might retry payment while the subscription is `past_due`, but this status doesn't guarantee another payment attempt." / "After receiving `invoice.paid`, retrieve the associated subscription and confirm that its status is `active` before extending the customer's access expiry date." | 2026-10-19 |

## Peregrine statements (from the published case study only)

Source: `src/app/case-studies/self-storage-management-platform/page.tsx` (live at /case-studies/self-storage-management-platform).

- "A mid-size self-storage operator running 150+ facilities across 12 states"
- "Unified abstraction layer supporting Nokē, PTI, and Janus smart locks via MQTT"
- "We built an abstraction layer that normalizes commands (lock, unlock, check status) across all vendors"
- "Gate access setup" / "<3 seconds"
- "When the client later added a fourth lock vendor, integration took two weeks instead of two months."

## Not used

- PTI's "BridgeApp" and "API" columns are not defined on its page; the article says so and does not explain them.
- No public API reference was found for PTI, OpenTech, Nokē, SpiderDoor or Storable; no endpoint or authentication detail from those vendors is stated.
- apis.io claims about storEDGE OAuth 1.0 and SiteLink SOAP licensing (third-party, unofficial): not used.
- Storeganise's SpiderDoor setup article and the Storman API page: seen only in search summaries, not fetched; not used.
- DaVinci per-facility API keys: seen only in a search summary; not used.
- State lien and notice rules: deliberately not researched or stated.
