import Link from 'next/link';
import GuideLayout, { GuideFaq, Src, guideMetadata, type GuideFaqItem } from '../../components/GuideLayout';
import LaunchStagesDiagram, { STAGES } from '../../components/diagrams/LaunchStagesDiagram';

const SLUG = 'vibe-coded-app-security-checklist';
export const metadata = guideMetadata(SLUG);

// Sources fetched and checked 2026-10-19 (re-fetched with curl and the quoted phrase matched); the
// sentence relied on for each link is logged in docs/content/sources/vibe-coded-app-security-checklist.md.
// Defensive only: every "verify" step uses the owner's own app, test accounts and test-mode keys.
// No statistics except the arXiv preprint, cited once with its sample and its limits.
// /services/ai-app-to-production is added by a separate branch (PR 1); this branch links to it on purpose.
const A01 = 'https://owasp.org/Top10/2025/A01_2025-Broken_Access_Control/';
const A07 = 'https://owasp.org/Top10/2025/A07_2025-Authentication_Failures/';
const A09 = 'https://owasp.org/Top10/2025/A09_2025-Security_Logging_and_Alerting_Failures/';
const API1 = 'https://owasp.org/API-Security/editions/2023/en/0xa1-broken-object-level-authorization/';
const API4 = 'https://owasp.org/API-Security/editions/2023/en/0xa4-unrestricted-resource-consumption/';
const ASVS = 'https://owasp.org/www-project-application-security-verification-standard/';
const CS = 'https://cheatsheetseries.owasp.org/cheatsheets/';
const CS_AUTHZ = `${CS}Authorization_Cheat_Sheet.html`;
const CS_INPUT = `${CS}Input_Validation_Cheat_Sheet.html`;
const CS_LOG = `${CS}Logging_Cheat_Sheet.html`;
const CS_SECRETS = `${CS}Secrets_Management_Cheat_Sheet.html`;
const CS_MT = `${CS}Multi_Tenant_Security_Cheat_Sheet.html`;
const CS_ERROR = `${CS}Error_Handling_Cheat_Sheet.html`;
const CS_AI = `${CS}Secure_Coding_with_AI_Cheat_Sheet.html`;
const SUPA_RLS = 'https://supabase.com/docs/guides/database/postgres/row-level-security';
const SUPA_KEYS = 'https://supabase.com/docs/guides/api/api-keys';
const SUPA_PROD = 'https://supabase.com/docs/guides/deployment/going-into-prod';
const SUPA_BACKUPS = 'https://supabase.com/docs/guides/platform/backups';
const SUPA_MIG = 'https://supabase.com/docs/guides/deployment/database-migrations';
const SUPA_TEST = 'https://supabase.com/docs/guides/deployment/ci/testing';
const SUPA_SHARED = 'https://supabase.com/docs/guides/deployment/shared-responsibility-model';
const STRIPE_WH = 'https://docs.stripe.com/webhooks';
const STRIPE_VERIFY = 'https://docs.stripe.com/events/manage-webhook-endpoints';
const NEXT_DATA = 'https://nextjs.org/docs/app/guides/data-security';
const NEXT_ENV = 'https://nextjs.org/docs/app/guides/environment-variables';
const NEXT_PROD = 'https://nextjs.org/docs/app/guides/production-checklist';
const VITE_ENV = 'https://vite.dev/guide/env-and-mode';
const VERCEL_ENV = 'https://vercel.com/docs/environment-variables';
const LOVABLE_SEC = 'https://docs.lovable.dev/features/security';
const REPLIT_SEC = 'https://docs.replit.com/tutorials/vibe-code-security-checklist';
const GH_DEPENDABOT = 'https://docs.github.com/en/code-security/concepts/supply-chain-security/dependabot-alerts';
const GH_SECRETS = 'https://docs.github.com/en/code-security/concepts/secret-security/secret-scanning';
const NPM_AUDIT = 'https://docs.npmjs.com/cli/v11/commands/npm-audit';
const PG_BACKUP = 'https://www.postgresql.org/docs/current/backup.html';
const PG_RLS = 'https://www.postgresql.org/docs/current/ddl-rowsecurity.html';
const ARXIV = 'https://arxiv.org/abs/2606.23130';

const SERVICE = '/services/ai-app-to-production';

/** One checklist item: the same five rows every time, so items can be compared at a glance. */
function Item({ id, title, check, why, verify, warning, refs }: {
  id: string; title: string; check: React.ReactNode; why: React.ReactNode; verify: React.ReactNode; warning: React.ReactNode; refs: React.ReactNode;
}) {
  return (
    <>
      <h3 id={id}>{title}</h3>
      <dl className="cp-factors" style={{ marginBottom: 28 }}>
        <div><dt>What to check</dt><dd>{check}</dd></div>
        <div><dt>Why it matters</dt><dd>{why}</dd></div>
        <div><dt>How to verify safely</dt><dd>{verify}</dd></div>
        <div><dt>Warning sign</dt><dd>{warning}</dd></div>
        <div><dt>Reference</dt><dd>{refs}</dd></div>
      </dl>
    </>
  );
}

const SUMMARY: [string, string, string][] = [
  ['Authentication', 'Log out and reuse an old URL; compare reset messages for known and unknown emails; MFA on your own admin accounts', 'Review of session handling, reset flow and any custom auth code'],
  ['Authorization per record', 'Open user A’s record while logged in as user B', 'Trace every read and write path to a server-side check'],
  ['Supabase RLS and keys', 'Security Advisor; RLS status per table; search the browser bundle for a secret key', 'Write and review policies per role; check views and security definer functions'],
  ['Tenant isolation', 'Repeat the A/B test across two test tenants, including files and exports', 'Isolation tests on the real connection path and role'],
  ['API access control', 'Open a protected API URL while logged out', 'Inventory of routes, Server Actions and functions with their checks'],
  ['Secrets and env vars', 'List every NEXT_PUBLIC_ / VITE_ value and ask if you would publish it', 'Rotate exposed keys; clean repository history if needed'],
  ['Input validation', 'Very long text and an unexpected file type in a test form', 'Server-side schemas for every endpoint'],
  ['Rate and spending limits', 'Spending caps and billing alerts at each paid provider', 'Rate limits on login, reset and paid endpoints'],
  ['Webhook signatures', 'Look for failed deliveries in the provider dashboard', 'Confirm verification on the raw body before any action'],
  ['Duplicate webhooks', 'Watch for double emails or credits during testing', 'Idempotent handlers keyed on event ID; ordering assumptions'],
  ['Background jobs', 'Find where failed jobs are visible', 'Retries, idempotency and tenant context in each job'],
  ['Migrations', 'Ask whether a fresh database can be built from the repository', 'Reconcile dashboard changes into migrations; plan data changes'],
  ['Backups and restore', 'Check plan, retention and the date of the last restore', 'Run and time a restore into a separate database'],
  ['Dependencies', 'Turn on Dependabot alerts; run npm audit', 'Triage alerts; check unfamiliar packages; plan upgrades'],
  ['Error monitoring', 'Trigger an error in test and see who is told', 'Set up reporting, alerts and generic error pages'],
  ['Logging hygiene', 'Search logs for a unique test password', 'Remove secrets and personal data from log statements'],
  ['Automated tests', 'Ask to see the access tests and their last run', 'Write tests for access rules, RLS and webhooks; gate deploys'],
  ['CI/CD and production config', 'List who has admin access; check MFA and which keys each environment uses', 'Pipeline from the main branch with tests; separate environments'],
];

const FAQ: GuideFaqItem[] = [
  {
    question: 'Are apps built with Lovable, Replit, Bolt or Cursor insecure?',
    answer: [
      'Not as a rule. The tool does not decide whether an app is secure; what was built and what was checked decides that. The tools say so themselves: Lovable’s documentation says its scans ',
      ['cannot guarantee complete security', LOVABLE_SEC],
      ' and that the app owner is responsible for meeting the security requirements of the use case. An AI-built app can pass every item on this checklist; the point is to check rather than assume.',
    ],
  },
  {
    question: 'Is it safe to have the Supabase publishable (anon) key in the browser?',
    answer: [
      'Yes, that is what it is for, as long as Row Level Security is on. Supabase’s key guide says of the publishable key that ',
      ['anyone can read it, so it only reaches what Row Level Security allows', SUPA_KEYS],
      '. The secret key (and the older service_role key) is different: it bypasses every policy and must stay on servers you control.',
    ],
  },
  {
    question: 'Is the built-in security scan in my AI app builder enough?',
    answer: [
      'It is a useful first pass, not a review. Lovable describes its Quick scan as a fixed set of checks that runs on every publish, and says its tools ',
      ['do not replace a thorough security review', LOVABLE_SEC],
      '. Scans catch configuration problems such as a table without row-level security; they cannot tell whether your business rules (who may approve, refund or export) are enforced on the server.',
    ],
  },
  {
    question: 'Which checks can I do myself, and which need an engineer?',
    answer: [
      'Anything you can test with two test accounts, the browser’s developer tools and your providers’ dashboards is a fair self-check: the record-swap test, a logged-out request to a protected URL, spending limits, Dependabot alerts and a search of the logs for a test password. Reading authorization code, writing RLS policies, making webhook handlers idempotent, cleaning up migrations and running a restore drill are engineering work. The summary table in this guide splits each item that way.',
    ],
  },
  {
    question: 'Do I need to rebuild an AI-built app before launch?',
    answer: [
      'Not by default. Most items on this checklist are fixed in place: a policy added, a key moved to the server, a handler made idempotent. A rebuild is worth discussing only when a review shows that access rules, data model and tenancy would all have to change at once. Decide after the review, not before.',
    ],
  },
];

export default function Guide() {
  return (
    <GuideLayout slug={SLUG}>
      <h2>The short answer</h2>
      <p>
        Before an AI-built app takes real users, real data or real money, check that every request is authorized on
        the server for the specific record it touches; that database access rules (row-level security, if you use
        Supabase) are on for every exposed table; that no secret key reaches the browser; that payment webhooks are
        verified and processed once; and that you can restore a backup. Those five cover the failures that cost the
        most. The full checklist below has eighteen items. For each one it says what to check, why it matters, how
        to verify it safely, the warning sign to look for and the official documentation behind it.
      </p>
      <p>
        Nothing here assumes your app is insecure because an AI tool wrote it. Many generated apps get several of
        these right. The aim is to know which ones, before a customer or a stranger finds out for you.
      </p>

      <h2>Prototype, test environment or production: which one do you have?</h2>
      <p>
        Most of the risk sits in the gap between three different things that can all look like &ldquo;the app
        works&rdquo;. A <strong>prototype that appears to work</strong> does what it should for the person who built
        it, on sample data. A <strong>working test environment</strong> has its own database, test keys and several
        test accounts, so you can try things without touching anything real. A <strong>production system</strong>{' '}
        holds real people&apos;s data and money, and has to keep working when someone uses it in a way nobody planned.
        This checklist is written for the step from the second to the third. If you only have the first, set up the
        second before you work through it.
      </p>
      <figure className="cp-diagram">
        <div className="cp-diagram-scroll"><LaunchStagesDiagram /></div>
        <figcaption>
          What is typically true at each stage. The same app can look identical in all three; what differs is who can
          reach it, what data it holds and what a mistake costs.
        </figcaption>
      </figure>
      <ul>
        {STAGES.map((s) => <li key={s.name}>{s.text}</li>)}
      </ul>

      <h2>What the AI tools say about their own checks</h2>
      <p>
        The platforms are clear that their checks are a starting point. Lovable&apos;s documentation describes a Quick
        scan that <Src href={LOVABLE_SEC}>runs automatically every time you publish</Src> and looks, among other
        things, for tables without row-level security. The same page says these tools{' '}
        <Src href={LOVABLE_SEC}>do not replace a thorough security review</Src> and that{' '}
        <Src href={LOVABLE_SEC}>you are responsible for ensuring that your app meets the security requirements appropriate for its use case</Src>.
        Replit publishes its own <Src href={REPLIT_SEC}>security checklist for vibe-coded apps</Src>, covering
        secrets, authorization, rate limiting and dependencies. Supabase puts it the same way for the database:
        running it is <Src href={SUPA_SHARED}>a shared responsibility between you and Supabase</Src>, and access
        management, data and security controls stay with you.
      </p>
      <p>
        For context only: a 2026 preprint by Deng, Fan and Meng (<Src href={ARXIV}>arXiv:2606.23130</Src>, not peer
        reviewed as far as the arXiv page shows) audited 200 publicly deployed applications built with Claude Code
        and Lovable and reported that <Src href={ARXIV}>91.0% of audited applications contain at least one vulnerability</Src>,
        concentrated in broken access control, injection and authentication failures. That is one research
        team&apos;s sample of 200 apps. It does not establish a rate for AI-built apps in general and says nothing
        about yours, which is why the rest of this guide is about checking.
      </p>

      <h2>How to use this checklist safely</h2>
      <ul>
        <li>Run every check on an app you own, in your test environment, with test accounts and test-mode payment keys.</li>
        <li>None of the self-checks needs a security tool. Two test accounts, the browser&apos;s developer tools (the Network tab) and your providers&apos; dashboards are enough.</li>
        <li>Do not load-test or probe production yourself. If a check suggests real data is exposed in production, treat it as an incident: close the gap, rotate any exposed keys and have an engineer check the logs for access.</li>
        <li>The references are to official documentation. OWASP&apos;s <Src href={ASVS}>Application Security Verification Standard</Src> is the long-form version of most of these items if you want the full requirement list.</li>
      </ul>

      <h2>Who can get in, and what they can see</h2>

      <Item
        id="authentication"
        title="1. Authentication"
        check={<>Sign-up, login, password reset and logout use the platform&apos;s auth service or an established library, not hand-written code. Logging out ends the session. Your own admin accounts on the hosting, database and code platforms use multi-factor authentication.</>}
        why={<>OWASP&apos;s Top 10 lists <Src href={A07}>missing or ineffective multi-factor authentication</Src> and sessions that are not invalidated <Src href={A07}>during logout or a period of inactivity</Src> among authentication failures. Replit&apos;s checklist says that if you build custom auth, <Src href={REPLIT_SEC}>use established libraries</Src>.</>}
        verify={<>Log in, copy the URL of a private page, log out and paste it back: you should land on the login page. Request a password reset for an address that has an account and for one that does not; OWASP recommends <Src href={A07}>using the same messages for all outcomes</Src>. Supabase&apos;s production checklist asks you to <Src href={SUPA_PROD}>protect your Supabase Account with multi-factor authentication (MFA)</Src>; do the same for GitHub and your host.</>}
        warning={<>Passwords checked in front-end code, an &ldquo;admin&rdquo; flag stored where the browser can change it, or different reset messages that reveal who has an account.</>}
        refs={<>OWASP Top 10:2025 <Src href={A07}>A07 Authentication Failures</Src>; <Src href={REPLIT_SEC}>Replit security checklist</Src>.</>}
      />

      <Item
        id="authorization"
        title="2. Authorization on the server, per record"
        check={<>Every request that reads or changes a record checks, on the server, that this user may do this to this record. Hiding a button or a menu item is not a check.</>}
        why={<>OWASP: <Src href={A01}>access control is only effective when implemented in trusted server-side code or serverless APIs</Src>. Its first listed failure pattern includes <Src href={A01}>viewing or editing someone else&apos;s account by providing its unique identifier</Src>. In Next.js, a Server Action <Src href={NEXT_DATA}>is reachable via a direct POST request, not just through your application&apos;s UI</Src>, and the docs say to verify authentication and authorization inside each one.</>}
        verify={<>Create two test accounts, A and B. As A, create a record and note its ID in the address bar or the Network tab. Log in as B and open the same URL. You should get &ldquo;not found&rdquo; or &ldquo;access denied&rdquo;. Repeat for edit pages and downloads.</>}
        warning={<>B can open A&apos;s record, or an API response in the Network tab contains other users&apos; records that the interface filters out before display.</>}
        refs={<>OWASP Top 10:2025 <Src href={A01}>A01 Broken Access Control</Src>; OWASP API Security <Src href={API1}>API1:2023</Src>; <Src href={NEXT_DATA}>Next.js data security guide</Src>.</>}
      />

      <Item
        id="supabase-rls"
        title="3. Supabase row-level security and the secret key"
        check={<>If the app uses Supabase: row-level security (RLS) is enabled on every table in an exposed schema, each table has policies that match what each role may do, and the secret key (or the older service_role key) is only ever used on a server.</>}
        why={<>Supabase: <Src href={SUPA_RLS}>a table in an exposed schema without RLS is readable and writable by any role with a grant on it</Src>. The publishable key is meant for the browser: <Src href={SUPA_KEYS}>anyone can read it, so it only reaches what Row Level Security allows</Src>. A secret key <Src href={SUPA_KEYS}>bypasses every Row Level Security policy you have</Src>; Supabase says never to put one in a browser, a shipped application or source control. In PostgreSQL itself, RLS with no policy is <Src href={PG_RLS}>a default-deny policy</Src>, so a table that suddenly returns nothing usually means RLS is on and a policy is missing.</>}
        verify={<>In the Supabase dashboard, run the <Src href={SUPA_PROD}>Security Advisor</Src> and check the RLS status of each table. In the browser, open the developer tools on your deployed app and search the loaded scripts for <code>sb_secret_</code> and <code>service_role</code>; neither should appear. Then repeat the two-account test from item 2.</>}
        warning={<>A policy <Src href={SUPA_RLS}>to anon using (true)</Src> on a table that holds private data. A view over a protected table: Supabase notes that <Src href={SUPA_RLS}>views bypass RLS by default</Src>. A secret key in any file the browser downloads.</>}
        refs={<>Supabase: <Src href={SUPA_RLS}>Row Level Security</Src>, <Src href={SUPA_KEYS}>API keys</Src>, <Src href={SUPA_PROD}>production checklist</Src>.</>}
      />

      <Item
        id="tenant-isolation"
        title="4. Tenant isolation"
        check={<>If the app serves several companies or teams (tenants), every query, file path, cache key and search index is scoped to the tenant, and the tenant comes from the signed-in user&apos;s verified membership, not from a value the browser sends.</>}
        why={<>OWASP&apos;s multi-tenant cheat sheet: <Src href={CS_MT}>a single vulnerability can expose all tenants&apos; data</Src>. It advises to <Src href={CS_MT}>treat client-supplied tenant identifiers as selectors only</Src> and to verify that the user is authorized to act in that tenant.</>}
        verify={<>Create two test tenants with one user each and repeat the record-swap test across them, including file downloads, exports, search results and emails sent by the system. Thorough isolation tests are engineering work: OWASP asks to <Src href={CS_MT}>test isolation through the same role, connection path, and pooling mode used by the application</Src>.</>}
        warning={<>A tenant ID in a header, body or URL that the server trusts; admin screens that can reach every tenant without a record of who looked. For a full treatment, see <Link href="/blog/multi-tenant-real-estate-saas">building a multi-tenant SaaS platform</Link>.</>}
        refs={<>OWASP <Src href={CS_MT}>Multi-Tenant Application Security Cheat Sheet</Src>.</>}
      />

      <Item
        id="api-access"
        title="5. API access control"
        check={<>There is a list of every API route, Server Action, edge function and database function the app exposes, each marked public or protected, and each protected one checks the caller itself.</>}
        why={<>OWASP: <Src href={CS_AUTHZ}>permission should be validated correctly on every request</Src>, whatever started the request. Next.js warns that <Src href={NEXT_DATA}>a page-level authentication check does not extend to the Server Actions defined within it</Src>. Replit&apos;s checklist says to <Src href={REPLIT_SEC}>add authentication to sensitive endpoints</Src>.</>}
        verify={<>While logged in, note the API calls the app makes in the Network tab. Open a private browser window (logged out) and request one of those URLs that only reads data. Expect a 401 or 403 response, not data. Leave anything that writes or deletes to an engineer in the test environment.</>}
        warning={<>Nobody can produce the list of routes, or an admin route answers a logged-out request.</>}
        refs={<>OWASP <Src href={CS_AUTHZ}>Authorization Cheat Sheet</Src>; <Src href={NEXT_DATA}>Next.js data security</Src>.</>}
      />

      <h2>Secrets, input and limits</h2>

      <Item
        id="secrets"
        title="6. Secrets and environment variables"
        check={<>No secret is in the source code, the repository history or the browser bundle. Variables with a client-exposed prefix hold only values you would publish. Test and production use different keys. Any key that was ever exposed has been rotated.</>}
        why={<>Next.js copies any variable prefixed <code>NEXT_PUBLIC_</code> <Src href={NEXT_ENV}>into the js bundle that is delivered to the client</Src>. Vite: <Src href={VITE_ENV}>VITE_* variables should not contain sensitive information such as API keys</Src>. On Vercel, environment variable changes <Src href={VERCEL_ENV}>only apply to new deployments</Src>, so a rotated key needs a redeploy. GitHub&apos;s advice for a leaked secret is to <Src href={GH_SECRETS}>rotate the affected credential immediately</Src>.</>}
        verify={<>List every variable in the hosting dashboard and in <code>.env.example</code>. For each one with a <code>NEXT_PUBLIC_</code> or <code>VITE_</code> prefix, ask: would I put this on a public web page? If the repository is on GitHub, turn on <Src href={GH_SECRETS}>secret scanning</Src>.</>}
        warning={<>A payment, email or AI provider secret with a public prefix; a committed <code>.env</code> file; the same key in test and production.</>}
        refs={<><Src href={NEXT_ENV}>Next.js environment variables</Src>; <Src href={VITE_ENV}>Vite env variables</Src>; <Src href={VERCEL_ENV}>Vercel environment variables</Src>; OWASP <Src href={CS_SECRETS}>Secrets Management Cheat Sheet</Src>.</>}
      />

      <Item
        id="input-validation"
        title="7. Input validation"
        check={<>The server checks the type, length, format and allowed values of every input, including uploaded files, whatever the form already checks.</>}
        why={<>OWASP: <Src href={CS_INPUT}>validate on the server even when the browser checks the same fields</Src>; browser checks are for quick feedback. The API Security Top 10 asks for a maximum size on <Src href={API4}>all incoming parameters and payloads</Src>.</>}
        verify={<>In the test environment, paste a very long block of text into a form field and upload a file of a type the app should not accept. Expect a clear rejection, not a crash, a stack trace or the value saved as-is. Ask an engineer where the server-side validation for each endpoint lives.</>}
        warning={<>Validation only inside form components, or database queries built by joining user input into a string.</>}
        refs={<>OWASP <Src href={CS_INPUT}>Input Validation Cheat Sheet</Src>; <Src href={API4}>API4:2023 Unrestricted Resource Consumption</Src>.</>}
      />

      <Item
        id="rate-limiting"
        title="8. Rate limiting and spending limits"
        check={<>Login, sign-up, password reset and every feature that costs money per call (AI model calls, SMS, email) are limited per user or per client. Each paid provider has a spending cap or a billing alert.</>}
        why={<>OWASP asks you to <Src href={API4}>implement a limit on how often a client can interact with the API within a defined timeframe</Src> and to <Src href={API4}>configure spending limits for all service providers/API integrations</Src>. For logins it says to <Src href={A07}>limit or increasingly delay failed login attempts</Src> without locking real users out.</>}
        verify={<>Open the billing settings of each paid provider and confirm a limit or alert is set. Ask where rate limits are configured and what a user sees when one is hit. Do not try to trigger them against production.</>}
        warning={<>An AI feature that calls a paid model on every request with no per-user cap and no billing alert.</>}
        refs={<>OWASP <Src href={API4}>API4:2023</Src>; <Src href={A07}>A07:2025</Src>; <Src href={REPLIT_SEC}>Replit security checklist</Src>.</>}
      />

      <h2>Payments, events and background work</h2>

      <Item
        id="webhook-signatures"
        title="9. Payment and webhook signature verification"
        check={<>Every webhook endpoint (payments, auth, third-party events) verifies the sender&apos;s signature on the raw request body before it does anything.</>}
        why={<>Stripe: <Src href={STRIPE_VERIFY}>without verification, an attacker could send fake webhook events to your endpoint to trigger actions like fulfilling orders, granting account access or modifying records</Src>. Verification needs the untouched body: <Src href={STRIPE_WH}>Stripe requires the raw body of the request to perform signature verification</Src>.</>}
        verify={<>Find the webhook handler and ask to be shown the line that verifies the signature with the signing secret. In the provider dashboard (in test mode), look at recent deliveries and their responses. Sending a deliberately unsigned request belongs in the test environment, done by an engineer.</>}
        warning={<>The handler parses the JSON first and never verifies; or paid access is granted when the browser reaches a &ldquo;success&rdquo; page, not when a verified payment event arrives. Our guide to <Link href="/blog/webhook-event-driven-integrations">reliable webhook integrations</Link> covers the full receive path.</>}
        refs={<>Stripe: <Src href={STRIPE_VERIFY}>verify events are sent from Stripe</Src>, <Src href={STRIPE_WH}>receive events in your webhook endpoint</Src>.</>}
      />

      <Item
        id="idempotency"
        title="10. Duplicate webhook delivery and idempotency"
        check={<>Processing the same event twice has the same effect as processing it once: one order, one email, one credit. Event IDs are recorded and repeats skipped. Nothing assumes events arrive in order.</>}
        why={<>Stripe: <Src href={STRIPE_WH}>webhook endpoints might occasionally receive the same event more than once</Src>, and it recommends logging processed event IDs and skipping them. Stripe also <Src href={STRIPE_WH}>doesn&apos;t guarantee the delivery of events in the order that they&apos;re generated</Src>, and in live mode retries delivery <Src href={STRIPE_WH}>for up to three days with an exponential backoff</Src>.</>}
        verify={<>Ask an engineer to deliver the same test event twice in the test environment and confirm one order, one email and one credit. During your own testing, note any duplicate emails or double charges.</>}
        warning={<>Duplicate emails or credits in testing; a handler that expects &ldquo;created&rdquo; to arrive before &ldquo;updated&rdquo;.</>}
        refs={<>Stripe <Src href={STRIPE_WH}>webhooks: handle duplicate events, event ordering</Src>.</>}
      />

      <Item
        id="background-jobs"
        title="11. Background jobs"
        check={<>Work that runs outside a web request (emails, imports, AI processing, scheduled tasks) has a retry limit, is safe to run twice, re-checks which user or tenant it acts for, and leaves a visible record when it fails.</>}
        why={<>OWASP: <Src href={CS_MT}>a shared queue or topic is not itself a tenant-isolation boundary</Src>; a job must not trust an unverified tenant field in its message. Jobs that retry also run twice, so the idempotency rule from item 10 applies to them too.</>}
        verify={<>Ask where jobs run, what happens when one fails and where you can see failed jobs. In test, cause a known failure (for example an invalid email address) and check that it shows up somewhere a person will see it.</>}
        warning={<>No record of failed jobs anywhere, or jobs that use the database secret key with no tenant check. Our guide to <Link href="/blog/background-jobs-redis-bullmq">reliable background jobs with Redis and BullMQ</Link> covers retries, stalled jobs and idempotent handlers.</>}
        refs={<>OWASP <Src href={CS_MT}>Multi-Tenant Application Security Cheat Sheet</Src> (tenant-aware asynchronous work).</>}
      />

      <h2>Data you cannot afford to lose</h2>

      <Item
        id="migrations"
        title="12. Database migrations"
        check={<>Every schema change, including access policies, is a migration file in the repository, applied to the test environment before production. Nobody edits the production schema by hand in a dashboard.</>}
        why={<>Supabase describes migrations as SQL statements that change your schema and <Src href={SUPA_MIG}>a common way of tracking changes to your database over time</Src>. When policies live in migration files, they are reviewed like code and can be rebuilt in a fresh environment.</>}
        verify={<>Ask whether a fresh database can be built from the repository alone, then compare its tables and policies with production.</>}
        warning={<>Production has tables or policies that exist in no file; a migration drops or renames a column with no plan for the data already in it.</>}
        refs={<>Supabase <Src href={SUPA_MIG}>database migrations</Src>.</>}
      />

      <Item
        id="backups"
        title="13. Backups and restore tests"
        check={<>Automatic backups are on, you know how far back they go, and someone has restored one into a separate database and checked the data.</>}
        why={<>PostgreSQL&apos;s manual: <Src href={PG_BACKUP}>PostgreSQL databases should be backed up regularly</Src>. On Supabase, Pro plan projects <Src href={SUPA_BACKUPS}>can access the last 7 days of daily backups</Src>; <Src href={SUPA_PROD}>database backups are not available for download for Free Plan projects</Src>, and Supabase recommends that free projects <Src href={SUPA_BACKUPS}>regularly export their data using the Supabase CLI db dump command and maintain off-site backups</Src>. A backup nobody has restored is an assumption, not a plan.</>}
        verify={<>Check your plan and the backups page. Write down the date of the last restore test and how long it took. If there has never been one, schedule it before launch.</>}
        warning={<>A free-plan project holding customer data with no exports, or no one able to say how a restore would work. Backups also go with the project: when you delete one, Supabase says <Src href={SUPA_BACKUPS}>we permanently remove all associated data, including any backups</Src>.</>}
        refs={<>PostgreSQL <Src href={PG_BACKUP}>Backup and Restore</Src>; Supabase <Src href={SUPA_BACKUPS}>database backups</Src>.</>}
      />

      <h2>Running it in production</h2>

      <Item
        id="dependencies"
        title="14. Dependency management"
        check={<>The lockfile is committed, dependency alerts are on, every package is one you meant to install, and updates are reviewed rather than skipped.</>}
        why={<>GitHub: <Src href={GH_DEPENDABOT}>Dependabot alerts help you find and fix vulnerable dependencies</Src>. <code>npm audit</code> <Src href={NPM_AUDIT}>asks for a report of known vulnerabilities</Src> in your dependencies, though <Src href={NPM_AUDIT}>some vulnerabilities cannot be fixed automatically</Src>. OWASP notes a risk specific to AI tools: they <Src href={CS_AI}>frequently suggest package names that do not exist on public registries</Src>, which attackers can then register.</>}
        verify={<>Turn on Dependabot alerts for the repository and run <code>npm audit</code> locally to see the report. Look up any package name you do not recognize on the public registry.</>}
        warning={<>Hundreds of open alerts nobody reads; a package with an unfamiliar name, few downloads and a recent creation date.</>}
        refs={<>GitHub <Src href={GH_DEPENDABOT}>Dependabot alerts</Src>; npm <Src href={NPM_AUDIT}>npm audit</Src>; OWASP <Src href={CS_AI}>Secure Coding with AI Cheat Sheet</Src>.</>}
      />

      <Item
        id="error-monitoring"
        title="15. Error monitoring"
        check={<>Errors in production are reported to a tool that alerts a named person. Users see a plain error message, not a stack trace or a database error.</>}
        why={<>OWASP lists as a failure that <Src href={A09}>the application cannot detect, escalate, or alert for active attacks in real-time or near real-time</Src>. Detailed error output helps an attacker: <Src href={CS_ERROR}>unhandled errors can assist an attacker</Src> in the reconnaissance phase.</>}
        verify={<>In the test environment, open a page with an ID that does not exist and submit a form with a missing field. Check what the user sees and whether the error reached your monitoring and someone was told.</>}
        warning={<>Errors visible only in the browser console; stack traces or SQL in responses; alerts going to an inbox nobody reads.</>}
        refs={<>OWASP Top 10:2025 <Src href={A09}>A09</Src>; OWASP <Src href={CS_ERROR}>Error Handling Cheat Sheet</Src>.</>}
      />

      <Item
        id="logging"
        title="16. Logging hygiene"
        check={<>Logs record security events (logins, failed logins, denied requests, admin actions) and leave out secrets and personal data.</>}
        why={<>OWASP&apos;s logging guidance lists access tokens, authentication passwords, database connection strings, encryption keys, payment card data and sensitive personal data among things that <Src href={CS_LOG}>should usually not be recorded directly in the logs</Src>. The Top 10 names <Src href={A09}>logging sensitive information that should not be logged (such as PII or PHI)</Src> as a failure.</>}
        verify={<>Sign up in the test environment with a distinctive test password, then search your log viewer for that password and for the names of your secret keys. Neither should appear.</>}
        warning={<>Whole request bodies or headers logged; debugging statements that print the full user object; logs anyone on the project can read.</>}
        refs={<>OWASP <Src href={CS_LOG}>Logging Cheat Sheet</Src>; <Src href={A09}>A09:2025</Src>.</>}
      />

      <Item
        id="tests"
        title="17. Automated tests"
        check={<>Tests cover the rules that matter: user B cannot read user A&apos;s records, each role sees what it should, RLS policies hold, a repeated webhook is processed once. They run on every change.</>}
        why={<>OWASP&apos;s API guidance: <Src href={API1}>write tests to evaluate the vulnerability of the authorization mechanism. Do not deploy changes that make the tests fail.</Src> Supabase documents running database tests in CI so you <Src href={SUPA_TEST}>run your tests when you or your team make changes</Src>. For RLS, OWASP asks to <Src href={CS_MT}>prove that expected cross-tenant operations are denied and expected same-tenant operations succeed</Src>.</>}
        verify={<>Ask to see the access-control tests and when they last ran. A quick way for an engineer to prove a test is real: remove one check on a branch and confirm the test fails.</>}
        warning={<>No tests, tests that only cover the happy path, or tests switched off to get a deploy through.</>}
        refs={<>OWASP <Src href={API1}>API1:2023</Src>; Supabase <Src href={SUPA_TEST}>automated testing</Src>.</>}
      />

      <Item
        id="ci-cd"
        title="18. CI/CD and production configuration"
        check={<>The code is in a repository your company controls. Production deploys from the main branch through a pipeline that runs the tests. Production, preview and development have separate settings and keys. Admin access is limited to current people, with MFA.</>}
        why={<>Next.js&apos;s production checklist: <Src href={NEXT_PROD}>ensure your .env.* files are added to .gitignore and only public variables are prefixed with NEXT_PUBLIC_</Src>. On Vercel <Src href={VERCEL_ENV}>you can select one or more Environments to apply the Variable to</Src> (Production, Preview, Development), so preview deployments can use test keys. Supabase reminds owners that they are <Src href={SUPA_SHARED}>always responsible for</Src> account and access management.</>}
        verify={<>List who has admin access to the repository, hosting, database, payment provider and domain registrar, and remove anyone who has left. Confirm MFA on each. Confirm preview deployments do not point at the production database or live payment keys.</>}
        warning={<>Production deployed from someone&apos;s laptop or a builder&apos;s publish button with no tests; a former contractor still an admin; preview builds writing to production data.</>}
        refs={<><Src href={NEXT_PROD}>Next.js production checklist</Src>; <Src href={VERCEL_ENV}>Vercel environment variables</Src>; <Src href={SUPA_SHARED}>Supabase shared responsibility model</Src>.</>}
      />

      <h2>Summary: what you can check, and what needs an engineer</h2>
      <div className="cp-table-wrap">
        <table>
          <thead><tr><th>Item</th><th>Self-check</th><th>Needs an engineer</th></tr></thead>
          <tbody>
            {SUMMARY.map(([item, self, eng]) => (
              <tr key={item}><td><strong>{item}</strong></td><td>{self}</td><td>{eng}</td></tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>When the self-checks are not enough</h2>
      <p>
        The self-checks tell you whether a problem is likely. They do not prove its absence. If the record-swap test
        fails, if nobody can list the API routes, if the webhook handler has never been tested twice, or if a restore
        has never been tried, the next step is an engineer reading the code paths behind those items. The work is
        usually specific: policies written per role, checks moved to the server, keys rotated, handlers made
        idempotent, migrations reconciled, a restore run and timed. That is the scope of our{' '}
        <Link href={SERVICE}>AI app to production service</Link>, which takes an existing AI-built codebase and
        makes it ready for real users.
      </p>
      <p>
        If you want a second opinion on your own results, the first step is a 30-minute technical discovery call
        with an engineer. Bring the summary table with your answers filled in. We will tell you which items look
        fine, which need work, and whether that is a small fix or a larger piece of work. More on how that works is
        on the <Link href={SERVICE}>AI app to production page</Link>.
      </p>

      <GuideFaq slug={SLUG} items={FAQ} />
    </GuideLayout>
  );
}
