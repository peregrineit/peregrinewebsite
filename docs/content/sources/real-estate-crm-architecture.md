# Sources: real-estate-crm-architecture

All pages fetched and read on 2026-10-12. Each row is the sentence or figure the article relies on.

| URL | Relied on | Date |
|---|---|---|
| https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business | "Your message must include a clear and conspicuous explanation of how the recipient can opt out of getting marketing email from you in the future." | 2026-10-12 |
| same | "Any opt-out mechanism you offer must be able to process opt-out requests for at least 30 days after you send your message. You must honor a recipient's opt-out request within 10 business days." | 2026-10-12 |
| same | "Your message must include your valid physical postal address." | 2026-10-12 |
| same | "even if you hire another company to handle your email marketing, you can't contract away your legal responsibility to comply with the law." | 2026-10-12 |
| https://www.fcc.gov/consumers/guides/stop-unwanted-robocalls-and-texts | "FCC rules ban text messages sent to a mobile phone using an autodialer unless the phone owner previously gave consent to receive the message or the message is sent for emergency purposes. Commercial texts require written consent; for informational texts, your consent may be oral." | 2026-10-12 |
| same | "You may opt out of any robocall or robotext at any time and in any reasonable manner, even if you previously gave consent for such calls." | 2026-10-12 |
| https://www.ecfr.gov/current/title-47/chapter-I/subchapter-B/part-64/subpart-L/section-64.1200 (page showed "up to date as of 10/08/2026") | (a)(10): "using the words 'stop,' 'quit,' 'end,' 'revoke,' 'opt out,' 'cancel,' or 'unsubscribe' sent in reply to an incoming text message ... constitutes a reasonable means per se to revoke consent." | 2026-10-12 |
| same | (a)(10): "All requests to revoke prior express consent or prior express written consent made in any reasonable manner must be honored within a reasonable time not to exceed ten business days from receipt of such request." | 2026-10-12 |
| https://ised-isde.canada.ca/site/canada-anti-spam-legislation/en | "CASL has caused companies to be more disciplined in managing their electronic marketing programs, by requesting amongst other things, that businesses obtain consent before sending commercial electronic messages." | 2026-10-12 |
| https://oag.ca.gov/privacy/ccpa | "The right to know about the personal information a business collects about them and how it is used and shared; The right to delete personal information collected from them (with some exceptions); ... The right to correct inaccurate personal information that a business has about them" | 2026-10-12 |
| same | "Right to delete: You can request that businesses delete personal information they collected from you and tell their service providers to do the same, subject to certain exceptions" | 2026-10-12 |
| https://www.postgresql.org/docs/current/sql-insert.html | "ON CONFLICT DO UPDATE guarantees an atomic INSERT or UPDATE outcome; provided there is no independent error, one of those two outcomes is guaranteed, even under high concurrency." | 2026-10-12 |
| https://support.google.com/analytics/answer/10917952?hl=en | "utm_source: Referrer, for example: google, newsletter4, billboard; utm_medium: Marketing medium, for example: cpc, banner, email; utm_campaign: Product, slogan, promo code, for example: spring_sale" | 2026-10-12 |
| https://dd.reso.org/DD2.0/Property/ListingKey/ | "A unique identifier for this record from the immediate source." | 2026-10-12 |
| https://dd.reso.org/DD2.0/Property/ListingId/ | "In a multiple originating system or a merged system, this value may not be unique" | 2026-10-12 |

Note: ftc.gov returned 404 to a plain curl request and its content was read through the WebFetch tool instead; the quoted sentences are as that tool returned them from the page.

## Peregrine statements and their source
- "Inbound leads were routed to a shared inbox"; a lead-qualification chatbot that "Qualifies by budget, timeline, location, and pre-approval status": `src/app/case-studies/w3re-ai-real-estate-platform/page.tsx`. No figures from that page are repeated.

## Left out as unverifiable
- CTIA Messaging Principles and Best Practices: the page did not return its content to a fetch, so no CTIA requirement is stated.
- Any statistic about response time and conversion; none found in a primary source, none used.
- Whether TCPA rules cover a particular texting setup, and what consent wording suffices: phrased as a question for counsel.
- Portal lead APIs of specific portals (none named or described).
- GDPR, PIPEDA and state privacy laws other than the CCPA summary: not fetched, so framed as questions.
