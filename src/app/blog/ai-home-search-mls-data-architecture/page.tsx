import Link from 'next/link';
import GuideLayout, { GuideFaq, Src, guideMetadata } from '../../components/GuideLayout';
import AiHomeSearchArchitectureDiagram from '../../components/diagrams/AiHomeSearchArchitectureDiagram';

const SLUG = 'ai-home-search-mls-data-architecture';
export const metadata = guideMetadata(SLUG);

// Sources opened and re-checked 2026-11-19; the public source list is in
// docs/content/sources/ai-home-search-mls-data-architecture.md. The claim-by-claim record is kept
// outside this public repository. Rules for edits:
// - A vendor or MLS is named only for a statement read on that organization's own page. The MLS whose
//   AI policy NAR profiled is not named here because the policy text was read on NAR's page, not the MLS's.
// - Nothing says MLS data "can" be used for AI without the condition that each MLS's license decides.
// - No fees, prices, coverage counts, latency figures or client results.
// - The architecture is how we would approach the build. It does not describe a system we operate for an MLS.
// - NAR's IDX policy page (Policy Statement 7.58) asked for a login on 2026-11-19, so no refresh interval or
//   attribution wording is quoted from it here.
const ZILLOW = 'https://www.zillow.com/news/when-people-ask-ai-about-housing-chatgpt-gemini-and-claude-all-connect-to-zillow/';
const RESO_API = 'https://www.reso.org/reso-web-api/';
const RESO_TRANSPORT = 'https://transport.reso.org/';
const RESO_DD = 'https://dd.reso.org/';
const NAR_PR = 'https://www.nar.realtor/newsroom/national-association-of-realtors-announces-approval-of-four-mls-policy-recommendations-at-nar-nxt';
const NAR_AI = 'https://www.nar.realtor/news/aexperience/make-it-a-policy-to-protect-mls-data-from-ai-misuse';
const GRID_AI = 'https://www.mlsgrid.com/s/MLS-Grid-AI-Use-Addendum.pdf';
const GRID_RES = 'https://www.mlsgrid.com/resources';
const GRID_FAQ = 'https://www.mlsgrid.com/faq';
const TRESTLE_FAQ = 'https://trestle-documentation.corelogic.com/support/faq/';
const TRESTLE_MCP = 'https://www.cotality.com/resources/cotality-launches-trestle-mcp-connecting-ai-to-trusted-governed-mls-data';
const FBS_HELP = 'https://help.flexmls.com/en/ai-settings--enable-the-mcp-server.html';
const REPLIERS_MCP = 'https://repliers.com/repliers-mcp-server/';
const REPLIERS_AI = 'https://help.repliers.com/en/article/can-i-process-mls-data-using-ai-hedwak/';
const REPLIERS_LIC = 'https://help.repliers.com/en/article/mls-requirements-for-data-licensing-when-signing-up-with-repliers-12fknh6/';
const MCP_INTRO = 'https://modelcontextprotocol.io/docs/getting-started/intro';
const MCP_TOOLS = 'https://modelcontextprotocol.io/specification/2026-07-28/server/tools';
const MCP_AUTH = 'https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization';
const OWASP_LLM01 = 'https://genai.owasp.org/llmrisk/llm01-prompt-injection/';

export default function Guide() {
  return (
    <GuideLayout slug={SLUG}>
      <p>
        Home buyers now ask AI assistants for listings. Zillow says its app in ChatGPT and its connector in
        Claude, the second of which <Src href={ZILLOW}>launched on October 19, 2026</Src>, use{' '}
        <Src href={ZILLOW}>the same Model Context Protocol (MCP) connection</Src>. A brokerage or PropTech team
        can build AI home search of the same kind, but only on MLS data whose license allows that use. The model
        is the easy part. The hard parts are the license that says what you may do with the data, and the data
        layer that keeps every answer current and attributed.
      </p>
      <p>
        Two points come before any design work. The RESO Web API is a standard for moving data, and RESO{' '}
        <Src href={RESO_API}>does not provide MLS real estate data</Src>. An MCP server is a way to connect an
        assistant to tools. Neither one is a license. The right to use an MLS&apos;s data comes from that MLS, in
        writing.
      </p>

      <h2>AI home search on MLS data at a glance</h2>
      <div className="cp-table-wrap cp-table-wide">
        <table>
          <thead><tr><th>Question</th><th>Short answer</th></tr></thead>
          <tbody>
            <tr>
              <td><strong>Can I feed MLS data to an LLM?</strong></td>
              <td>
                Only as far as each MLS&apos;s license allows. MLS Grid&apos;s AI Use Addendum, for example, permits{' '}
                <Src href={GRID_AI}>AI search and response for IDX and VOW uses</Src> under stated conditions.
                Other MLSs set their own terms, and some may have none yet.
              </td>
            </tr>
            <tr>
              <td><strong>Can I train or fine-tune on it?</strong></td>
              <td>
                Not without express authorization under either published policy we read for this guide. Treat the
                answer as no until an MLS says yes in writing.
              </td>
            </tr>
            <tr>
              <td><strong>RESO Web API or MCP?</strong></td>
              <td>
                Both, at different layers. The RESO Web API brings licensed data into your system. MCP, or any
                tool layer, exposes a controlled part of it to an assistant.
              </td>
            </tr>
            <tr>
              <td><strong>Who approves?</strong></td>
              <td>
                Each MLS whose data you use. RESO, an aggregator and a model provider cannot approve it for them.
                Repliers, for one, says it <Src href={REPLIERS_AI}>cannot authorize AI use on behalf of an MLS</Src>.
              </td>
            </tr>
            <tr>
              <td><strong>What do MLSs expect to see?</strong></td>
              <td>
                Going by MLS Grid&apos;s published terms: attribution that follows its IDX or VOW rules, no
                retention by the AI tool beyond the query, no training without authorization, and the ability to
                cut off an AI tool&apos;s access at any time.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>How AI assistants get listing data today</h2>
      <p>There are three patterns, and only two of them are worth building.</p>
      <ul>
        <li>
          <strong>Scraped or stale copies.</strong> A crawler or a one-time export fills a database that nobody
          licensed and nothing refreshes. It usually breaks the terms of the site it came from, shows homes that
          have already sold, and carries no attribution. We do not build this and do not recommend it.
        </li>
        <li>
          <strong>A licensed feed queried at request time.</strong> You hold a data license, keep your own copy of
          the listings current, and let the model call your search service when a user asks a question. The model
          sees only the listings returned for that request.
        </li>
        <li>
          <strong>A governed MCP endpoint.</strong> The organization that holds the data publishes an MCP server
          and decides what each caller can reach. The assistant connects to it instead of to a copy.
        </li>
      </ul>
      <p>
        Zillow is the public example of the third pattern. It says its connector makes its{' '}
        <Src href={ZILLOW}>MLS-approved display of real estate listings</Src> available in the conversation{' '}
        <Src href={ZILLOW}>with the same broker and MLS attribution</Src>, and that in these AI applications{' '}
        <Src href={ZILLOW}>Zillow controls the data and tools available through the connector, while Claude generates the conversational response</Src>.
        Of its ChatGPT app it says{' '}
        <Src href={ZILLOW}>AI models are not allowed to train on or have access to licensed data</Src>.
      </p>
      <p>
        MLS technology vendors have published MCP servers of their own. On each vendor&apos;s own pages, as of
        November 19, 2026:
      </p>
      <ul>
        <li>
          FBS&apos;s Flexmls help says a member can connect an AI client{' '}
          <Src href={FBS_HELP}>if your MLS has enabled the Flexmls Model Context Protocol (MCP)</Src>, after
          accepting a Terms of Use agreement and signing in with Flexmls credentials.
        </li>
        <li>
          Cotality announced Trestle MCP on October 19, 2026 as{' '}
          <Src href={TRESTLE_MCP}>available to MLS organizations on the Trestle platform</Src>, and says it{' '}
          <Src href={TRESTLE_MCP}>extends the permissions, licensing, and controls already established through Trestle</Src>.
        </li>
        <li>
          Repliers publishes an <Src href={REPLIERS_MCP}>open-source, MIT-licensed MCP server</Src> on top of its
          API. The open-source license covers the server code, not the listings.
        </li>
      </ul>
      <p>
        In all three, whether an MLS&apos;s data is reachable is that MLS&apos;s decision. None of these pages is
        evidence that your MLS offers such an endpoint, or that your license covers what you plan to build.
      </p>

      <h2>The RESO Web API and MCP are standards, not licenses</h2>
      <p>
        RESO describes the RESO Web API as{' '}
        <Src href={RESO_API}>the modern way to transport data in the real estate industry</Src>, built on open
        standards such as OData. Its specifications are published as{' '}
        <Src href={RESO_TRANSPORT}>modular endorsements</Src>, and the field names come from the Data Dictionary,
        where <Src href={RESO_DD}>DD 2.1 is the current version for RESO certification</Src>. RESO is equally
        clear about what it does not do:{' '}
        <Src href={RESO_API}>&ldquo;RESO does not provide MLS real estate data. RESO creates data standards.&rdquo;</Src>{' '}
        Access, it says, <Src href={RESO_API}>is gained through local MLSs</Src>, after you agree to an
        MLS&apos;s data use and licensing policies.
      </p>
      <p>
        MCP is the same kind of thing one layer up. Its documentation calls it{' '}
        <Src href={MCP_INTRO}>an open-source standard for connecting AI applications to external systems</Src>.
        The specification even makes <Src href={MCP_AUTH}>authorization optional</Src>, so the existence of an
        MCP server says nothing about who is allowed to see what. A standard tells you the format of the request.
        A license tells you whether you may make it, and what you may do with the answer. Our{' '}
        <Link href="/blog/reso-web-api-vs-rets">RESO Web API vs RETS</Link> guide covers the transport side in
        detail.
      </p>

      <h2>What your MLS data license allows</h2>
      <p>
        The license decides, not the technology. NAR restated this in November 2026: its new policy statement
        says use of MLS data{' '}
        <Src href={NAR_PR}>must comply with applicable MLS participation or data licensing agreements</Src> and be
        connected to brokerage services, appraisals or other valuations. NAR&apos;s announcement does not mention
        AI. Our guide to the{' '}
        <Link href="/blog/nar-mls-policy-changes-november-2026">November 2026 NAR MLS policy changes</Link> covers
        the four changes, including an optional policy under which an MLS may{' '}
        <Src href={NAR_PR}>establish local eligibility and licensing requirements for data feeds</Src>. Rules can
        therefore differ from one board to the next.
      </p>
      <p>
        Many agreements say nothing about AI at all. NAR&apos;s AExperience publication describes AI systems as{' '}
        <Src href={NAR_AI}>outside the scope of original data licenses</Src>, and Repliers tells its customers
        that <Src href={REPLIERS_AI}>most data license agreements predate the widespread use of large language models</Src>.
        Silence in a license is not permission. Two published texts show how MLS organizations are filling the
        gap.
      </p>
      <h3>MLS Grid&apos;s AI Use Addendum</h3>
      <p>
        MLS Grid lists the addendum as{' '}
        <Src href={GRID_RES}>required if you intend to use MLS data with AI</Src>. For the usage options a
        licensee has selected, it permits AI search and response, and AI-written marketing content for a
        participant&apos;s own listings or business. It prohibits all other AI use unless an MLS approves in
        writing. The terms that matter for search:
      </p>
      <ul>
        <li>
          <strong>Search and response is permitted for IDX and VOW uses.</strong> The definition includes{' '}
          <Src href={GRID_AI}>semantic and natural language searching, contextual relevance and ranking, conversational guidance</Src>.
        </li>
        <li>
          <strong>No retention by the AI tool.</strong> Data{' '}
          <Src href={GRID_AI}>may not be cached, stored, archived or retained by an AI Tool beyond the duration reasonably necessary to fulfill an individual user query</Src>.
        </li>
        <li>
          <strong>No training without authorization.</strong> Data may not be used for AI training{' '}
          <Src href={GRID_AI}>without the prior express authorization of MLS GRID or an MLS</Src>.
        </li>
        <li>
          <strong>A cut-off.</strong> The vendor{' '}
          <Src href={GRID_AI}>must retain the ability to restrict, suspend, and terminate an AI Tool&apos;s access</Src>.
        </li>
        <li>
          <strong>Display rules still apply.</strong> Other participants&apos; listings shown in an AI response{' '}
          <Src href={GRID_AI}>must comply with the attribution and related display policies</Src> in MLS
          Grid&apos;s IDX or VOW rules.
        </li>
      </ul>
      <h3>An MLS policy that requires written permission</h3>
      <p>
        NAR&apos;s AExperience publication profiled one MLS whose policy says its data{' '}
        <Src href={NAR_AI}>may not be used for AI training or machine learning in any way without its express written permission</Src>,
        and that treats a violation as a material breach of the agreement.
      </p>
      <h3>Retrieval is not automatically safe</h3>
      <p>
        The usual summary is &ldquo;retrieval at query time is fine, training is not.&rdquo; Both texts are
        stricter than that. MLS Grid defines AI training to include{' '}
        <Src href={GRID_AI}>the creation of vector embeddings, retrieval indices, knowledge graphs, or similar representations that persist beyond a single user session</Src>.
        The policy NAR profiled defines training to include{' '}
        <Src href={NAR_AI}>creating embeddings or vector databases</Src>. A stored vector index over listing
        remarks is the standard way to build semantic search, and under both definitions it counts as training.
        Plan for it to need explicit written approval, MLS by MLS.
      </p>
      <p>
        This guide is not legal advice. Send each MLS a written description of your use and get its answer in
        writing before you build.
      </p>

      <h2>MLS API options: RESO Web API direct, aggregator APIs and MCP</h2>
      <p>
        &ldquo;MLS API&rdquo; means three different things in practice. They are layers, not alternatives, and
        none of them changes who has to approve your use.
      </p>
      <div className="cp-table-wrap cp-table-wide">
        <table>
          <thead><tr><th>Option</th><th>What it is</th><th>Who it suits</th><th>License path</th><th>Effort</th></tr></thead>
          <tbody>
            <tr>
              <td><strong>RESO Web API, direct from an MLS</strong></td>
              <td>The MLS&apos;s own endpoint, or its software provider&apos;s, implementing the standard.</td>
              <td>Teams working in one market or a few.</td>
              <td>An agreement with that MLS. You then work with <Src href={RESO_API}>that MLS&apos;s software provider or technical staff to receive credentials</Src>.</td>
              <td>Replication, normalization and each board&apos;s local fields are yours to build.</td>
            </tr>
            <tr>
              <td><strong>Aggregator or delivery platform API</strong></td>
              <td>One technical integration that carries data from many MLSs, such as MLS Grid, Trestle or Repliers.</td>
              <td>Multi-market products that want one schema and one connection.</td>
              <td>
                Still per MLS. MLS Grid has <Src href={GRID_FAQ}>one standard license agreement</Src>, and{' '}
                <Src href={GRID_FAQ}>participation in MLS Grid is at your MLS&apos;s discretion</Src>. Trestle{' '}
                <Src href={TRESTLE_FAQ}>only facilitates the license agreement between you and the MLO</Src>.
                Repliers says a vendor license{' '}
                <Src href={REPLIERS_LIC}>must be obtained independently from each MLS</Src>.
              </td>
              <td>Less plumbing. The same approvals.</td>
            </tr>
            <tr>
              <td><strong>MCP server</strong></td>
              <td>A tool interface for AI assistants, placed on top of one of the two rows above. Yours or a vendor&apos;s.</td>
              <td>Products whose users will reach listings through an assistant.</td>
              <td>No new rights. It inherits the license of the data behind it, plus any AI-specific terms that MLS has set.</td>
              <td>Small once a search API exists. The controls take most of the work.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        The application process, broker sponsorship and license types are in our guide on{' '}
        <Link href="/blog/how-to-get-mls-data-access">how to get MLS data access</Link>, so they are not repeated
        here.
      </p>

      <h2>What an MCP server is, and what it changes</h2>
      <p>
        An MCP server publishes a list of tools. Each tool has{' '}
        <Src href={MCP_TOOLS}>a name, a description, an input schema and optionally an output schema</Src>. An AI
        application connects, reads the list, and the model decides when to call a tool. The server runs the call
        and returns the result. A protected server acts as{' '}
        <Src href={MCP_AUTH}>an OAuth 2.1 resource server</Src> and must check that each access token was issued
        for it. The specification also says servers{' '}
        <Src href={MCP_TOOLS}>must validate all tool inputs, implement proper access controls, rate limit tool invocations and sanitize tool outputs</Src>.
      </p>
      <p>
        What changes is that there is one governed entry point between a model and your listings, with
        authentication, scopes and a log. What does not change is everything underneath it. You still need the
        feed, the license and the display rules. MCP is also optional: if the assistant is your own chat window,
        the same tools can be plain function calls. MCP matters when assistants you do not control should be able
        to reach your tools.
      </p>

      <h2>A reference architecture for AI home search</h2>
      <p>
        This is how we would approach the build. It is a design from engineering principle, not a description of
        a system we operate for an MLS.
      </p>
      <figure className="cp-diagram">
        <div className="cp-diagram-scroll"><AiHomeSearchArchitectureDiagram /></div>
        <figcaption>
          Reference architecture. Licensed data moves from the feed to the user in six stages, and the tool
          layer is the only path from the model to a listing.
        </figcaption>
      </figure>
      <ol>
        <li>
          <strong>Ingest.</strong> Replicate each licensed feed over the RESO Web API into your own store and map
          it to one schema, as in our guides to{' '}
          <Link href="/blog/mls-data-normalization">MLS data normalization</Link> and the{' '}
          <Link href="/blog/mls-sync-engine">MLS sync engine</Link>. Keep the source MLS and the license it came
          under on every record.
        </li>
        <li>
          <strong>Search.</strong> Start with structured filters, as described in{' '}
          <Link href="/blog/real-estate-search-elasticsearch">real estate search with Elasticsearch</Link>. A
          model can turn &ldquo;three bedrooms under $600,000 with a garage&rdquo; into typed filters without any
          vector index. Add vector search over remarks and features only for MLSs that have approved stored
          embeddings, and make it a per-MLS switch.
        </li>
        <li>
          <strong>Tool layer.</strong> Expose a small set of typed tools, for example{' '}
          <code>search_listings</code>, <code>get_listing</code> and <code>get_comparables</code>. Each one
          applies the display rules of the MLS a listing came from, on the server.
        </li>
        <li>
          <strong>Model.</strong> The model receives listings only as the result of a tool call, for the length
          of one request. No listing data goes into training or fine-tuning, and the contract with the model
          provider should say the same about your prompts.
        </li>
        <li>
          <strong>Response.</strong> Attribution, the listing brokerage, the MLS disclaimer and a last-updated
          time travel with every listing and are rendered by your code. The model writes the sentence around
          them. It does not write them.
        </li>
      </ol>

      <h2>A data rights matrix to fill in for each MLS</h2>
      <p>
        There are no blanket answers here. The middle column is what a license usually speaks to. The right
        column is the question to put to each MLS.
      </p>
      <div className="cp-table-wrap cp-table-wide">
        <table>
          <thead><tr><th>Data</th><th>What the license usually governs</th><th>What to confirm with the MLS</th></tr></thead>
          <tbody>
            <tr><td><strong>Listing text and public remarks</strong></td><td>Where it may be displayed, to whom, and with what attribution.</td><td>May a model summarize or rephrase it, and must the original stay visible?</td></tr>
            <tr><td><strong>Photos</strong></td><td>Display with the listing. Copyright may sit with the broker, the photographer or, where adopted, partly with the MLS.</td><td>May photos be sent to a model at all, for example for image description?</td></tr>
            <tr><td><strong>Sold history</strong></td><td>Whether your feed type includes it, and who may see it.</td><td>May the assistant quote sold prices, and to which users?</td></tr>
            <tr><td><strong>Private or agent-only remarks</strong></td><td>Whether the field is in your feed, and that it never reaches a consumer.</td><td>Nothing to ask if you exclude it. Keep it out of every index the model can reach.</td></tr>
            <tr><td><strong>Agent and office contact details</strong></td><td>Required attribution on one side, limits on reuse for marketing on the other.</td><td>Which contact fields must be shown with a listing, and which may not be used for outreach?</td></tr>
            <tr><td><strong>Derived embeddings and indexes</strong></td><td>Often nothing. Where AI terms exist, they may count as training.</td><td>May we store embeddings of this MLS&apos;s listings, and must they be deleted when the listing or the license ends?</td></tr>
            <tr><td><strong>Prompts, caches and model training</strong></td><td>Retention and onward use by third parties, where AI terms exist.</td><td>How long may a model provider hold a prompt that contains listings, and is training on it excluded by contract?</td></tr>
          </tbody>
        </table>
      </div>

      <h2>The controls to have ready before an MLS review</h2>
      <p>
        This is our engineering list, drawn from the published AI terms above and ordinary security practice. It
        is not a requirement set published by any MLS.
      </p>
      <ul className="cp-checklist">
        <li>Authorization is enforced on the server for every tool call, never only in the model&apos;s prompt.</li>
        <li>Tool inputs are typed and validated. The model cannot send free-form SQL or a raw search query.</li>
        <li>Every listing in a reply is checked against the records the tool returned before it is displayed.</li>
        <li>Listing remarks are treated as untrusted text. OWASP describes <Src href={OWASP_LLM01}>indirect prompt injection</Src> as input from external sources that alters a model&apos;s behavior, and remarks are exactly that.</li>
        <li>License terms are stored as configuration per MLS: permitted uses, feed type, retention and notice text.</li>
        <li>Each tool has a field-level allow list, so a new feed field is not exposed by default.</li>
        <li>Attribution and disclaimers are rendered by code from stored fields, not generated.</li>
        <li>Listings that are no longer active are purged from the index and from any cache on the feed&apos;s refresh schedule.</li>
        <li>Rate limits apply per user and per client, so the assistant cannot be used to copy the database.</li>
        <li>Every tool call is logged with the user, the client, the inputs and the listing keys returned.</li>
        <li>The model provider&apos;s terms exclude training on your prompts and limit how long they are kept.</li>
        <li>Prompts, filters and ranking are reviewed for fair housing risk before launch and after each change.</li>
        <li>One switch disables AI access to one MLS&apos;s data without a release.</li>
      </ul>
      <p>
        If the first version of your assistant was built quickly with an AI coding tool, expect the gaps every
        prototype has: authorization in the browser, secrets in client code, no logs. Our{' '}
        <Link href="/blog/vibe-coded-app-security-checklist">security checklist for AI-built apps</Link> covers
        them, and our <Link href="/services/ai-app-to-production">AI app to production</Link> service is the
        review and hardening that takes a working demo to something an MLS data team can examine.
      </p>

      <h2>A minimal MCP tool definition for search_listings</h2>
      <p>
        One tool, as it would appear in the server&apos;s tool list. The input schema is closed, so the model can
        send only these five fields. There is no MLS or user parameter: the server takes both from the
        authenticated session. The output schema makes the attribution fields required, so a listing without
        them fails validation and is never shown.
      </p>
      <pre className="cp-code"><code>{`{
  "name": "search_listings",
  "description": "Search active listings the signed-in user may see. Returns at most 10.",
  "inputSchema": {
    "type": "object",
    "additionalProperties": false,
    "required": ["city", "state"],
    "properties": {
      "city": { "type": "string", "maxLength": 80 },
      "state": { "type": "string", "pattern": "^[A-Z]{2}$" },
      "max_price": { "type": "integer", "minimum": 0 },
      "min_beds": { "type": "integer", "minimum": 0, "maximum": 20 },
      "limit": { "type": "integer", "minimum": 1, "maximum": 10, "default": 5 }
    }
  },
  "outputSchema": {
    "type": "object",
    "required": ["listings"],
    "properties": {
      "listings": {
        "type": "array",
        "maxItems": 10,
        "items": {
          "type": "object",
          "required": ["listing_key", "source_mls", "listing_office", "disclaimer", "modified_at"],
          "properties": {
            "listing_key": { "type": "string" },
            "address": { "type": "string" },
            "list_price": { "type": "integer" },
            "source_mls": { "type": "string" },
            "listing_office": { "type": "string" },
            "disclaimer": { "type": "string" },
            "modified_at": { "type": "string", "format": "date-time" }
          }
        }
      }
    }
  }
}`}</code></pre>
      <p>
        A result for an invented listing would carry <code>&quot;source_mls&quot;: &quot;Example Regional MLS&quot;</code>,{' '}
        <code>&quot;listing_office&quot;: &quot;Sample Realty Co.&quot;</code>, the disclaimer text stored for that
        MLS and the time the record last changed. Those names are placeholders. No real MLS, endpoint or
        credential appears in this example.
      </p>

      <h2>Cost and timeline</h2>
      <p>
        We do not publish a price range for an AI search build, and no MLS approval time is ours to promise. The
        cost drivers are these:
      </p>
      <ul>
        <li><strong>Number of MLSs.</strong> Each one is a separate license, a separate mapping and a separate answer on AI use.</li>
        <li><strong>License and platform fees.</strong> These are set by each MLS and delivery platform. Published figures are in our <Link href="/blog/mls-idx-integration-cost">MLS and IDX integration cost guide</Link> and the <Link href="/tools/mls-idx-cost-calculator">MLS and IDX cost calculator</Link>.</li>
        <li><strong>Replication volume.</strong> Listing counts and photo storage decide the size of the store and the index.</li>
        <li><strong>Model usage.</strong> Cost follows the number of conversations and how many listings each tool call returns.</li>
        <li><strong>Controls.</strong> Logging, per-MLS configuration and review of prompts are engineering time that a demo skips.</li>
      </ul>
      <p>
        On timeline, the written answers from each MLS are the part you do not control, so ask the licensing
        questions before the build starts, not after.
      </p>

      <h2>Common mistakes</h2>
      <ul>
        <li><strong>Scraping a portal</strong> or reusing someone&apos;s signed-in session to collect listings. There is no compliant version of this.</li>
        <li><strong>Caching past the refresh window,</strong> in a search index, a vector store or the model&apos;s conversation memory.</li>
        <li><strong>Dropping attribution in chat.</strong> A listing shown in a sentence is still a listing display.</li>
        <li><strong>Assuming one license covers every board.</strong> AI terms differ, and some boards may not have written theirs yet.</li>
        <li><strong>Sending listings to a model provider that trains on them,</strong> or that keeps prompts longer than your license allows.</li>
        <li><strong>Building a vector index first</strong> and asking about embeddings afterward.</li>
      </ul>

      <GuideFaq slug={SLUG} items={[
        { question: 'Can I use MLS data to train AI?', answer: ['Not without the MLS’s express authorization under the published policies we read. MLS Grid’s AI Use Addendum bars AI training ', ['without the prior express authorization of MLS GRID or an MLS', GRID_AI], ', and an MLS policy profiled by NAR requires ', ['express written permission', NAR_AI], '. Other MLSs set their own terms, so ask each one in writing.'] },
        { question: 'Can ChatGPT or Claude access MLS listings?', answer: ['Only through a connection that a licensed data holder provides. Zillow says its ChatGPT app and Claude connector show its ', ['MLS-approved display of real estate listings', ZILLOW], '. Flexmls members can connect an AI client ', ['if their MLS has enabled the Flexmls MCP server', FBS_HELP], '. Neither is open access to MLS data.'] },
        { question: 'What is an MCP server for real estate?', answer: ['It is a server that offers listing tools, such as search and listing detail, to AI assistants over the Model Context Protocol, ', ['an open-source standard for connecting AI applications to external systems', MCP_INTRO], '. It is an integration layer. It is not a data license and it does not replace the feed underneath.'] },
        { question: 'Is the RESO Web API a license to MLS data?', answer: ['No. RESO says it ', ['does not provide MLS real estate data', RESO_API], ' and that access ', ['is gained through local MLSs', RESO_API], ' after you agree to their data use and licensing policies.'] },
        { question: 'Are vector embeddings of MLS listings allowed?', answer: ['It depends on each MLS’s license. MLS Grid’s addendum defines AI training to include ', ['the creation of vector embeddings, retrieval indices, knowledge graphs, or similar representations that persist beyond a single user session', GRID_AI], ', and AI training needs prior express authorization. Get written approval before storing embeddings of any MLS’s listings.'] },
        { question: 'Who approves an AI feature built on MLS data?', answer: ['Each MLS whose data the feature uses. An aggregator cannot approve it for them: Repliers, for example, says it ', ['cannot authorize AI use on behalf of an MLS', REPLIERS_AI], '. Describe the use in writing and keep the written answer.'] },
        { question: 'How much does MLS API access cost?', answer: ['It depends on the MLS and the delivery platform, and each sets its own fees. This guide quotes none. The published fees we have collected are in our MLS and IDX integration cost guide, linked in the cost section above.'] },
      ]} />

      <h2>Sources</h2>
      <ul>
        <li><Src href={ZILLOW}>Zillow: ChatGPT, Gemini and Claude all connect to Zillow</Src> (primary; Zillow&apos;s own account of its connectors)</li>
        <li><Src href={RESO_API}>RESO: RESO Web API</Src>, <Src href={RESO_TRANSPORT}>RESO transport specifications</Src> and <Src href={RESO_DD}>RESO Data Dictionary</Src> (primary)</li>
        <li><Src href={NAR_PR}>NAR newsroom: approval of four MLS policy recommendations at NAR NXT</Src> (November 8, 2026; primary)</li>
        <li><Src href={NAR_AI}>NAR AExperience: Make It a Policy to Protect MLS Data From AI Misuse</Src> (July 15, 2026; NAR&apos;s report of one MLS&apos;s policy)</li>
        <li><Src href={GRID_AI}>MLS Grid: AI Use Addendum to the MLS Grid Data License Agreement</Src>, <Src href={GRID_RES}>resources page</Src> and <Src href={GRID_FAQ}>FAQ</Src> (primary)</li>
        <li><Src href={TRESTLE_MCP}>Cotality: Trestle MCP announcement</Src> (October 19, 2026) and <Src href={TRESTLE_FAQ}>Trestle FAQ</Src> (vendor&apos;s own pages)</li>
        <li><Src href={FBS_HELP}>Flexmls Help: AI Settings, Enable the MCP Server</Src> (vendor&apos;s own page)</li>
        <li><Src href={REPLIERS_MCP}>Repliers MCP Server</Src>, <Src href={REPLIERS_AI}>Can I Process MLS Data Using AI?</Src> and <Src href={REPLIERS_LIC}>MLS requirements for data licensing</Src> (vendor&apos;s own pages)</li>
        <li><Src href={MCP_INTRO}>Model Context Protocol: introduction</Src>, <Src href={MCP_TOOLS}>tools specification</Src> and <Src href={MCP_AUTH}>authorization specification</Src> (version 2026-07-28)</li>
        <li><Src href={OWASP_LLM01}>OWASP: LLM01 Prompt Injection</Src></li>
      </ul>

      <p className="cp-note">
        Last reviewed November 19, 2026, against the linked sources. Vendors and MLS organizations are named
        only for statements on their own pages, and naming one is not a recommendation. This guide is not legal
        advice. Confirm what your licenses allow with each MLS and your counsel.
      </p>

      <p>
        Planning AI search on MLS data? See our{' '}
        <Link href="/services/mls-idx-integration">MLS and IDX integration service</Link> for the feed, license
        and search work, <Link href="/services/api-integration">API integration</Link> for the tool layer, or{' '}
        <Link href="/contact">talk to an engineer</Link>.
      </p>
    </GuideLayout>
  );
}
