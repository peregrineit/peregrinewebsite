# Sources: /blog/ai-home-search-mls-data-architecture

Opened and re-checked 2026-11-19. The detailed source record (claim, status, exact wording, caveats) is kept
outside this public repository, with the owner's audit notes. The guide uses only facts that record marks
confirmed or qualified.

Sources linked from the guide, each read on the organization's own page:
- https://www.zillow.com/news/when-people-ask-ai-about-housing-chatgpt-gemini-and-claude-all-connect-to-zillow/ (Zillow, October 21, 2026)
- https://www.reso.org/reso-web-api/ , https://transport.reso.org/ , https://dd.reso.org/ (RESO)
- https://www.nar.realtor/newsroom/national-association-of-realtors-announces-approval-of-four-mls-policy-recommendations-at-nar-nxt (NAR announcement, November 8, 2026)
- https://www.nar.realtor/news/aexperience/make-it-a-policy-to-protect-mls-data-from-ai-misuse (NAR AExperience, July 15, 2026)
- https://www.mlsgrid.com/s/MLS-Grid-AI-Use-Addendum.pdf , https://www.mlsgrid.com/resources , https://www.mlsgrid.com/faq (MLS Grid)
- https://www.cotality.com/resources/cotality-launches-trestle-mcp-connecting-ai-to-trusted-governed-mls-data (Cotality, October 19, 2026) and https://trestle-documentation.corelogic.com/support/faq/ (Trestle FAQ)
- https://help.flexmls.com/en/ai-settings--enable-the-mcp-server.html (FBS, Flexmls Help)
- https://repliers.com/repliers-mcp-server/ , https://help.repliers.com/en/article/can-i-process-mls-data-using-ai-hedwak/ , https://help.repliers.com/en/article/mls-requirements-for-data-licensing-when-signing-up-with-repliers-12fknh6/ (Repliers)
- https://modelcontextprotocol.io/docs/getting-started/intro , https://modelcontextprotocol.io/specification/2026-07-28/server/tools , https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization (Model Context Protocol)
- https://genai.owasp.org/llmrisk/llm01-prompt-injection/ (OWASP)

Rules the guide follows:
- The RESO Web API and MCP are described as standards. Neither is described as a license or a data source.
- A vendor or MLS is named only for a statement read on that organization's own page on the date above. The MLS
  whose AI policy NAR profiled is not named, because the policy text was read on NAR's page and not on the MLS's.
- Nothing says MLS data can be used for AI without the condition that each MLS's license decides.
- No fees, prices, coverage counts, approval times, latency figures or client results.
- The reference architecture is how we would approach the build. It does not describe a system we operate.
- The code sample is a JSON tool definition with invented names. It contains no real MLS, endpoint or credential.
- To re-check on any edit: the MLS Grid AI Use Addendum text, the MCP specification version, each vendor page,
  and whether NAR has published the November 2026 policy text.
