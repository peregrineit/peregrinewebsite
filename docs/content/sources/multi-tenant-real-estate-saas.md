# Sources: multi-tenant-real-estate-saas

All pages fetched and read on 2026-10-12. Each row is the sentence or figure the article relies on.

| URL | Relied on | Date |
|---|---|---|
| https://www.postgresql.org/docs/current/ddl-rowsecurity.html | "When row security is enabled on a table ... all normal access to the table for selecting rows or modifying rows must be allowed by a row security policy." | 2026-10-12 |
| same | "If no policy exists for the table, a default-deny policy is used, meaning that no rows are visible or can be modified." | 2026-10-12 |
| same | "Superusers and roles with the BYPASSRLS attribute always bypass the row security system when accessing a table. Table owners normally bypass row security as well, though a table owner can choose to be subject to row security with ALTER TABLE ... FORCE ROW LEVEL SECURITY." | 2026-10-12 |
| same | "The policy above implicitly provides a WITH CHECK clause identical to its USING clause" | 2026-10-12 |
| same | "Referential integrity checks, such as unique or primary key constraints and foreign key references, always bypass row security to ensure that data integrity is maintained. Care must be taken ... to avoid 'covert channel' leaks of information through such referential integrity checks." | 2026-10-12 |
| https://www.postgresql.org/docs/current/sql-set.html | "The effects of SET LOCAL last only till the end of the current transaction, whether committed or not." | 2026-10-12 |
| https://www.postgresql.org/docs/current/functions-admin.html | set_config: "If is_local is true, the new value will only apply during the current transaction." current_setting: "Returns the current value of the setting setting_name." | 2026-10-12 |
| https://www.postgresql.org/docs/current/ddl-schemas.html | Reasons to use schemas: "To allow many users to use one database without interfering with each other." | 2026-10-12 |
| https://www.postgresql.org/docs/current/ddl-partitioning.html | "Dropping an individual partition using DROP TABLE, or doing ALTER TABLE DETACH PARTITION, is far faster than a bulk operation. These commands also entirely avoid the VACUUM overhead caused by a bulk DELETE." | 2026-10-12 |
| same | "Too many partitions can mean longer query planning times and higher memory consumption during both query planning and execution" | 2026-10-12 |
| https://www.pgbouncer.org/features.html | SQL feature map: "SET/RESET" is "Yes" for session pooling and "Never" for transaction pooling. | 2026-10-12 |
| https://www.mongodb.com/docs/atlas/build-multi-tenant-arch/ | "If you have a small and stable number (up to a few hundred) tenants with varied data requirements and strict access control requirements, consider one database per tenant." | 2026-10-12 |
| same | "You can use a tenantId field in each document to logically segment data between tenants." | 2026-10-12 |
| same | "The multi-tenancy logic exists in the application layer. Every document must have a tenantId field, and every database query must filter by that field." | 2026-10-12 |
| same | "Avoid putting all tenants with their own collections into a single database." | 2026-10-12 |
| https://letsencrypt.org/docs/rate-limits/ | "Up to 300 new orders can be created by a single account every 3 hours." | 2026-10-12 |
| same | "Up to 50 certificates can be issued per registered domain (or IPv4 address, or IPv6 /64 range) every 7 days." | 2026-10-12 |
| https://letsencrypt.org/docs/challenge-types/ | HTTP-01: "This challenge cannot be used to issue wildcard certificates." DNS-01: "It also allows you to issue wildcard certificates." | 2026-10-12 |
| https://www.mlsgrid.com/s/MLS-Grid-IDX-Rules.pdf (Updated September 17, 2026) | Rule 6: "Any IDX display must be under the actual and apparent control of a single Member Participant who has executed a MLS GRID Data License Agreement." | 2026-10-12 |
| same | Rule 6, apparent control: "that the domain name and branding on the website distinguish the Member Participant from nonparticipating firms" | 2026-10-12 |
| https://docs.mlsgrid.com/ | "Once a subscription has been created, a licensee added, and the MLS has approved, an API token will be generated and presented on the token tab when viewing a subscription." | 2026-10-12 |

## Peregrine statements and their source
- White-label agent website platform; "All agents shared configuration, leads, and property data in flat collections. One agent's misconfiguration could affect every other agent's website"; "Restructured MongoDB collections for clean multi-tenant separation"; "Deployed white-label agent themes"; 5 to 200+ agents: `src/app/case-studies/scaling-real-estate-saas-platform/page.tsx`.

## Left out as unverifiable
- NAR's IDX policy wording on participant control (handbook needs a member login): MLS Grid's public IDX Rules quoted instead, as one example.
- Whether a single vendor feed may serve several brokerages at any particular MLS: phrased as a question to ask each MLS.
- Certificate limits of managed edge providers; email authentication requirements of mailbox providers; any measured performance of the tenancy models.
