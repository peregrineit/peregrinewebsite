import Link from 'next/link';
import GuideLayout, { GuideFaq, Src, guideMetadata } from '../../components/GuideLayout';

const SLUG = 'idx-crm-integration';
export const metadata = guideMetadata(SLUG);

// Sources fetched with curl and read on 2026-10-21; the sentence relied on for each link is logged in
// docs/content/sources/idx-crm-integration.md. Only each CRM vendor's own documentation is cited.
// Follow Up Boss
const FUB_IDX = 'https://docs.followupboss.com/reference/idx-integration';
const FUB_LEADS = 'https://docs.followupboss.com/reference/send-in-a-lead';
const FUB_EVENTS = 'https://docs.followupboss.com/reference/events-post';
const FUB_ID = 'https://docs.followupboss.com/reference/identification';
const FUB_RATE = 'https://docs.followupboss.com/reference/rate-limiting';
const FUB_START = 'https://docs.followupboss.com/docs/start-here-brand-new-integration';
const FUB_INTEGRATIONS = 'https://www.followupboss.com/integrations';
// HubSpot
const HS_NONHS = 'https://knowledge.hubspot.com/forms/use-non-hubspot-forms';
const HS_SUBMIT = 'https://developers.hubspot.com/docs/api-reference/legacy/marketing/forms/v3-legacy/submit-data-unauthenticated';
const HS_SUBMIT_AUTH = 'https://developers.hubspot.com/docs/api-reference/legacy/marketing/forms/v3-legacy/submit-data-authenticated';
// GoHighLevel (HighLevel)
const GHL_TRIGGER = 'https://help.gohighlevel.com/support/solutions/articles/155000003147-workflow-trigger-inbound-webhook';
const GHL_PREMIUM = 'https://help.gohighlevel.com/support/solutions/articles/48001237383';
const GHL_UPSERT = 'https://marketplace.gohighlevel.com/docs/ghl/contacts/upsert-contact';

export default function Guide() {
  return (
    <GuideLayout slug={SLUG}>
      <h2>The short answer</h2>
      <p>
        An IDX website produces leads: registrations, property inquiries, saved homes and searches. Each of the
        three CRMs below documents its own way to receive them, and the right path is the one the vendor documents,
        not the one that happens to work in a quick test:
      </p>
      <ul>
        <li><strong>Follow Up Boss</strong>: send every lead and activity to its Events API. Its documentation calls <code>POST /v1/events</code> <Src href={FUB_EVENTS}>the only correct option to send leads and their activity to Follow Up Boss from an IDX website</Src>.</li>
        <li><strong>HubSpot</strong>: either let HubSpot collect submissions from your existing HTML forms with its non-HubSpot forms tool, or post each lead to its <Src href={HS_SUBMIT}>Submit data to a form</Src> endpoint from your own code.</li>
        <li><strong>GoHighLevel (HighLevel)</strong>: post the lead as JSON to a workflow&apos;s Inbound Webhook URL, or create it through the <Src href={GHL_UPSERT}>Upsert Contact</Src> API.</li>
      </ul>
      <p>
        Before building anything, check whether your IDX vendor already has a native connection. Follow Up Boss, for
        example, has an <Src href={FUB_INTEGRATIONS}>IDX WEBSITES</Src> category in its integrations directory, which
        lists <Src href={FUB_INTEGRATIONS}>IDX Broker</Src>. A custom connection is worth building when the vendor has
        none, when it sends only a name and an email, or when the website is your own build.
      </p>

      <h2>The three documented paths side by side</h2>
      <div className="cp-table-wrap cp-table-wide">
        <table>
          <thead><tr><th></th><th>Follow Up Boss</th><th>HubSpot</th><th>GoHighLevel (HighLevel)</th></tr></thead>
          <tbody>
            <tr>
              <td><strong>Where leads go</strong></td>
              <td><code>POST https://api.followupboss.com/v1/events</code></td>
              <td>Non-HubSpot forms tool, or <code>POST /submissions/v3/integration/submit/&#123;portalId&#125;/&#123;formGuid&#125;</code> on <code>api.hsforms.com</code></td>
              <td>A workflow&apos;s Inbound Webhook URL, or <code>POST /contacts/upsert</code></td>
            </tr>
            <tr>
              <td><strong>How you authenticate</strong></td>
              <td>The customer&apos;s API key as the HTTP Basic username, plus your registered <code>X-System</code> and <code>X-System-Key</code> headers</td>
              <td>The standard submit endpoint takes no credentials; a second endpoint <Src href={HS_SUBMIT_AUTH}>requires authentication and has higher rate limits</Src></td>
              <td>The webhook URL itself, which is <Src href={GHL_TRIGGER}>unique for each trigger</Src>; the API uses its own authorization</td>
            </tr>
            <tr>
              <td><strong>Existing contacts</strong></td>
              <td><Src href={FUB_LEADS}>Follow Up Boss will automatically search for existing contacts and update them</Src></td>
              <td>The forms tool will <Src href={HS_NONHS}>either create a new contact or update any existing contact record with the same email address</Src></td>
              <td>Upsert follows the <Src href={GHL_UPSERT}>&ldquo;Allow Duplicate Contact&rdquo; setting at the Location level</Src></td>
            </tr>
            <tr>
              <td><strong>Required to create a contact</strong></td>
              <td>The lead&apos;s details in the event&apos;s <code>person</code> object; <Src href={FUB_EVENTS}>providing an ID in the Person object</Src> links the event to a known contact</td>
              <td>For the forms tool, <Src href={HS_NONHS}>the form must have an email input field</Src>; for the API, the fields your HubSpot form requires</td>
              <td>For the webhook, <Src href={GHL_PREMIUM}>an Email or Phone is required to Find or Create the Contact</Src></td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Follow Up Boss</h2>
      <h3>Use the Events API, not the People API</h3>
      <p>
        Follow Up Boss is explicit: <Src href={FUB_IDX}>use the Events API, not the People API to send all data from an IDX website</Src>.
        Its lead guide warns that <code>POST /v1/people</code> <Src href={FUB_LEADS}>will create a person but will not run any automations</Src>.
        Sending an event instead gets the lead deduplicated, recorded with its activity, assigned
        (<Src href={FUB_LEADS}>correct agent is assigned as per Lead Flow screen</Src>) and announced to the agent.
      </p>
      <p>
        Its <Src href={FUB_IDX}>IDX integration page</Src> lists the events to send: Registration, Inquiry, Saved
        Property, Viewed Property, Property Search and Visited Open House, plus{' '}
        <Src href={FUB_IDX}>any other forms on the website that send data to Follow Up Boss</Src>.
      </p>
      <p>
        The event type matters for automation. New leads created by an event <Src href={FUB_EVENTS}>will only trigger action plans if they are of the following types: Registration, Seller Inquiry, Property Inquiry, General Inquiry or Visited Open House</Src>.
        A plain &ldquo;Inquiry&rdquo; is converted to a Property Inquiry when the request includes a property, so send
        the listing with every property inquiry.
      </p>

      <h3>Fields and credentials</h3>
      <ul>
        <li><strong>Register your system.</strong> <Src href={FUB_ID}>If you are accessing the FUB API in order to provide services to a FUB customer, you MUST register your system.</Src> Every request then carries your <code>X-System</code> and <code>X-System-Key</code> headers.</li>
        <li><strong>Authenticate as the customer.</strong> Each customer generates an API key in Follow Up Boss, and <Src href={FUB_START}>authentication is done with HTTP Basic Authentication over HTTPS</Src>, with the key as the username.</li>
        <li><strong>Keep the key on the server.</strong> Follow Up Boss asks you to <Src href={FUB_IDX}>ensure the API key is secure and not exposed in the browser</Src>, so the website posts to your backend and the backend calls Follow Up Boss.</li>
        <li><strong>Set source and system.</strong> <Src href={FUB_IDX}>Set the source field to be the domain of the website without &ldquo;www.&rdquo;</Src>, include the system field in every call, and link back to the lead in your own system with <code>sourceUrl</code>.</li>
        <li><strong>Pass campaign data.</strong> The IDX checklist includes <Src href={FUB_IDX}>all PPC data (&ldquo;campaign&rdquo; section)</Src>, so carry UTM parameters from the landing page to the event.</li>
      </ul>

      <h3>Responses to handle</h3>
      <ul>
        <li><strong>204 with no body:</strong> <Src href={FUB_EVENTS}>the lead flow associated with this source has been archived and ignored</Src>. Log it and alert someone; the lead did not reach an agent.</li>
        <li><strong>429:</strong> clients that exceed a limit <Src href={FUB_RATE}>will receive a 429 (Too Many Requests) response code, and a Retry-After header</Src>, and the request <Src href={FUB_RATE}>was not processed</Src>. Retry after the stated delay. Rate limits are applied <Src href={FUB_RATE}>based on a sliding 10 second window</Src>, and the limits for requests without a valid system key are lower.</li>
      </ul>

      <h2>HubSpot</h2>
      <h3>Option 1: the non-HubSpot forms tool</h3>
      <p>
        HubSpot can collect submissions from forms it did not build. <Src href={HS_NONHS}>To use the non-HubSpot forms tool, you must install the HubSpot tracking code on your external page</Src>,
        then turn on collection in the settings. It is quick to set up, but IDX forms often break its rules. Among the
        requirements:
      </p>
      <ul>
        <li><Src href={HS_NONHS}>The form must not be in an &lt;iframe&gt;.</Src> Many hosted IDX search pages are framed.</li>
        <li><Src href={HS_NONHS}>The form must not have JavaScript bound to the form submit event or submit button click event.</Src></li>
        <li><Src href={HS_NONHS}>The form must not be on a single-page app.</Src></li>
        <li><Src href={HS_NONHS}>The form must not contain hidden fields.</Src> A hidden listing ID would not be collected.</li>
      </ul>
      <p>
        Field mapping is automatic only: submitted fields <Src href={HS_NONHS}>will only match to single-line text field type properties in HubSpot</Src>,
        and <Src href={HS_NONHS}>non-HubSpot form fields cannot be manually mapped</Src>. Submissions also depend on the
        tracking script loading in the visitor&apos;s browser. HubSpot itself suggests, as an alternative, <Src href={HS_NONHS}>working with a developer to connect your non-HubSpot forms directly using HubSpot&apos;s Submit data to a form API</Src>.
      </p>

      <h3>Option 2: submit each lead through the Forms API</h3>
      <p>
        Create a form in HubSpot with the fields you need (including properties for the listing), then post each
        lead to <code>https://api.hsforms.com/submissions/v3/integration/submit/&#123;portalId&#125;/&#123;formGuid&#125;</code>.
        The request carries <Src href={HS_SUBMIT}>a list of form field names and the values for those fields, up to 1000 fields</Src>,
        and a <code>context</code> object with the page URL and <code>hutk</code>, <Src href={HS_SUBMIT}>the tracking cookie token value used for HubSpot lead activity tracking</Src>.
        Pass <code>hutk</code> from the visitor&apos;s browser to your backend so the submission joins the visitor&apos;s
        page history.
      </p>
      <p>
        Two details catch integrations. The standard endpoint <Src href={HS_SUBMIT}>supports cross-origin (CORS) AJAX requests</Src>,
        so it can be called from a browser, but posting from your server lets you validate, log and retry. And a
        backdated <code>submittedAt</code> <Src href={HS_SUBMIT}>more than one month old will result in an error</Src>,
        so a retry queue that holds failures longer than a month will need a different route.
      </p>

      <h2>GoHighLevel (HighLevel)</h2>
      <h3>Option 1: an Inbound Webhook workflow trigger</h3>
      <p>
        The trigger <Src href={GHL_TRIGGER}>captures incoming POST/GET/PUT requests sent to a HighLevel Webhook URL (unique for each trigger)</Src>,
        and HighLevel lists lead capture from web forms among its uses. The rules from its help center:
      </p>
      <ul>
        <li>Send JSON: <Src href={GHL_PREMIUM}>the only supported data format</Src>.</li>
        <li>Keys <Src href={GHL_PREMIUM}>must be a single string without space separations</Src>.</li>
        <li><Src href={GHL_PREMIUM}>Providing an Email or Phone number in the payload is mandatory</Src>.</li>
        <li>If the data structure changes, re-select the mapping reference in the trigger setup so later workflow actions read the right fields.</li>
        <li>If the URL leaks, delete the trigger and add a new one; <Src href={GHL_PREMIUM}>incoming requests from the old URL won&apos;t enter your workflow</Src>.</li>
      </ul>
      <p>
        Because the URL is the only credential, keep it on your server rather than in website JavaScript. The Inbound
        Webhook is one of HighLevel&apos;s premium triggers: once enabled, sub-accounts get <Src href={GHL_PREMIUM}>100 free executions</Src>,
        and the article tells agencies how <Src href={GHL_PREMIUM}>to avoid accruing execution costs</Src> through
        rebilling. It does not state a per-execution price, so check the agency&apos;s billing settings before sending high
        volumes through it.
      </p>

      <h3>Option 2: the Upsert Contact API</h3>
      <p>
        <code>POST /contacts/upsert</code> creates or updates a contact in one call and
        <Src href={GHL_UPSERT}> will adhere to the configuration defined under the &ldquo;Allow Duplicate Contact&rdquo; setting at the Location level</Src>.
        The request needs a <code>locationId</code> and accepts a <code>source</code> and custom fields for the
        listing. One trap: the <code>tags</code> field <Src href={GHL_UPSERT}>will overwrite all current tags associated with the contact</Src>,
        so a repeat inquiry can wipe tags an agent added. Use the separate tag endpoints to add tags instead.
      </p>

      <h2>What every IDX-to-CRM connection needs</h2>
      <p>Whichever CRM you use, the same design keeps leads from going missing:</p>
      <ul className="cp-checklist">
        <li>The website posts to your own backend first; the backend stores the lead, then calls the CRM. Credentials stay on the server.</li>
        <li>Each lead gets an ID in your system before the CRM call, so a retry after a timeout does not create a second lead on your side.</li>
        <li>Failed calls go to a retry queue that respects 429 responses and gives up into an alert, not into silence.</li>
        <li>The listing travels with the lead: MLS listing ID, address, price, listing URL and the search that led there.</li>
        <li>Campaign and UTM values from the landing page are kept and sent with the lead.</li>
        <li>Consent choices are recorded as shown on the form, with the time and the page.</li>
        <li>A weekly check compares leads stored on your side with leads in the CRM, so a revoked key or archived lead source is noticed.</li>
      </ul>
      <p>
        The retry, idempotency and reconciliation patterns are covered in detail in our guide to{' '}
        <Link href="/blog/webhook-event-driven-integrations">reliable webhook and event-driven integrations</Link>, and
        the CRM side of the design (deduplication, routing, a single timeline per contact) in{' '}
        <Link href="/blog/real-estate-crm-architecture">real estate CRM architecture</Link>. Getting the listings onto
        the site in the first place is covered in <Link href="/blog/how-to-get-mls-data-access">how to get MLS data
        access</Link>.
      </p>

      <h2>Questions to ask your IDX vendor</h2>
      <ul>
        <li>Does it have a native connection to our CRM, and which events does it send: registration only, or inquiries, saved homes and searches too?</li>
        <li>Does it send the listing ID and URL with each property inquiry?</li>
        <li>Can it post to a webhook URL we control, so our backend can forward leads to the CRM and keep a copy?</li>
        <li>What happens to a lead when the CRM is down or rejects the request: is it retried, and are we told?</li>
        <li>Are its forms in an iframe or a single-page app? (This decides whether HubSpot&apos;s forms tool can see them.)</li>
      </ul>

      <GuideFaq slug={SLUG} items={[
        { question: 'How do I send IDX leads to Follow Up Boss?', answer: ['Send them to the Events API, POST /v1/events, from your server. Follow Up Boss calls it ', ['the only correct option to send leads and their activity to Follow Up Boss from an IDX website', FUB_EVENTS], ' and says POST /v1/people ', ['will create a person but will not run any automations', FUB_LEADS], '.'] },
        { question: 'Can HubSpot capture leads from IDX plugin forms without an integration?', answer: ['Sometimes. Its non-HubSpot forms tool collects HTML form submissions once the tracking code is installed, but ', ['the form must not be in an <iframe>', HS_NONHS], ' and ', ['the form must not be on a single-page app', HS_NONHS], ', which rules out many IDX forms. The alternative is HubSpot’s ', ['Submit data to a form', HS_SUBMIT], ' API called from your own code.'] },
        { question: 'How do website leads get into GoHighLevel?', answer: ['Through a workflow’s Inbound Webhook trigger, which ', ['captures incoming POST/GET/PUT requests sent to a HighLevel Webhook URL (unique for each trigger)', GHL_TRIGGER], ', or through the ', ['Upsert Contact', GHL_UPSERT], ' API. For the webhook, ', ['an Email or Phone is required to Find or Create the Contact', GHL_PREMIUM], '.'] },
        { question: 'Should the website call the CRM directly from the browser?', answer: ['No. Post to your own backend and call the CRM from there, so credentials stay private and failed calls can be retried. Follow Up Boss asks integrators to ', ['ensure the API key is secure and not exposed in the browser', FUB_IDX], '.'] },
      ]} />

      <p className="cp-note">
        Statements about Follow Up Boss, HubSpot and GoHighLevel were read from the vendors&apos; own documentation,
        linked above, on October 21, 2026. Endpoints, limits, plan terms and premium-feature billing change; confirm
        them in each vendor&apos;s documentation and your account before you build. This guide describes the
        vendors&apos; documented options and does not describe a Peregrine client project.
      </p>
      <p>
        Connecting an IDX website or MLS feed to your CRM? See our{' '}
        <Link href="/services/api-integration">API integration service</Link> or{' '}
        <Link href="/contact">talk to an engineer</Link>.
      </p>
    </GuideLayout>
  );
}
