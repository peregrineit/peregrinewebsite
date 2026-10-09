import Link from 'next/link';
import GuideLayout, { GuideFaq, Src, guideMetadata } from '../../components/GuideLayout';

const SLUG = 'reso-web-api-vs-rets';
export const metadata = guideMetadata(SLUG);

// Sources checked 2026-10-09. Statements are as published by RESO, the platforms and
// the MLSs on that date. NAR's policy handbook required a login when checked, so NAR
// policy is cited through RESO's public certification page.
const RESO_API = 'https://www.reso.org/reso-web-api/';
const RESO_CORE = 'https://transport.reso.org/proposals/web-api-core/';
const RESO_CERT = 'https://www.reso.org/certification/';
const RESO_SUNSET = 'https://www.reso.org/blog/rets-sunset/';
const RESO_DD = 'https://dd.reso.org/';
const RESO_EVENTS = 'https://transport.reso.org/proposals/entity-events/';
const RESO_BOARD = 'https://www.reso.org/web-api-transition-leaderboard/';
const MLSGRID = 'https://docs.mlsgrid.com/';
const MLSGRID_V2 = 'https://docs.mlsgrid.com/api-documentation/api-version-2.0';
const TRESTLE_API = 'https://trestle-documentation.corelogic.com/web-api/';
const TRESTLE_REF = 'https://trestle-documentation.corelogic.com/web-api/reference/';
const TRESTLE_SCALE = 'https://trestle-documentation.corelogic.com/web-api/at-scale/';
const TRESTLE_RETS = 'https://trestle-documentation.corelogic.com/rets/';
const ARMLS = 'https://armls.com/rets-to-api';
const RLCAR = 'https://www.rlcar.org/rets-to-api';
const METRO = 'https://metromls.com/participant-data-feed-information/';
const SPARK_OVERVIEW = 'https://sparkplatform.com/docs/rets/overview';
const SPARK_SESSION = 'https://sparkplatform.com/docs/rets/tutorials/session';
const SPARK_DMQL = 'https://sparkplatform.com/docs/rets/tutorials/dmql';
const SPARK_REPLICATE = 'https://sparkplatform.com/docs/rets/tutorials/replicate';

export default function Guide() {
  return (
    <GuideLayout slug={SLUG}>
      <h2>The short answer</h2>
      <p>
        RETS is the old way to pull MLS data and the RESO Web API is its replacement. RESO says RETS{' '}
        <Src href={RESO_API}>has been deprecated and is no longer supported</Src>, and MLSs are switching it off. If
        you still run a RETS integration, plan the move now: authentication, queries, field names and media handling
        all change, but the overall job, copying listings into your own database and keeping them current, stays the
        same.
      </p>

      <h2>What each standard is</h2>
      <p>
        <strong>RETS</strong> (Real Estate Transaction Standard) is{' '}
        <Src href={SPARK_OVERVIEW}>a legacy real estate data standard based on XML</Src>. Its last release was 1.9:
        RESO announced in 2017 that <Src href={RESO_SUNSET}>the RETS Workgroup had completed its final release and would be retired</Src>,
        and it <Src href={RESO_CERT}>discontinued certifying RETS in 2018</Src>.
      </p>
      <p>
        The <strong>RESO Web API</strong> is, in RESO&apos;s words,{' '}
        <Src href={RESO_API}>the modern way to transport data in the real estate industry</Src>. It is built on a
        general web standard rather than a real-estate-specific one: <Src href={RESO_API}>RESO uses the OData V4 standard specification</Src>.
        It is paired with the RESO Data Dictionary, which{' '}
        <Src href={RESO_DD}>defines standard resources, fields and lookups</Src>; the current certified version is{' '}
        <Src href={RESO_DD}>Data Dictionary 2.0, with 1,745 fields and 3,683 lookups</Src>.
      </p>

      <h2>What changes for a developer</h2>
      <div className="cp-table-wrap">
        <table>
          <thead><tr><th></th><th>RETS</th><th>RESO Web API</th></tr></thead>
          <tbody>
            <tr>
              <td><strong>Session and auth</strong></td>
              <td>A Login transaction; <Src href={SPARK_SESSION}>a successful login establishes a cookie that keeps the session alive</Src></td>
              <td><Src href={RESO_CORE}>OAuth2 bearer tokens and client credentials</Src>, over <Src href={RESO_CORE}>TLS 1.2 or above</Src></td>
            </tr>
            <tr>
              <td><strong>Queries</strong></td>
              <td>DMQL, <Src href={SPARK_DMQL}>name-value pair conditions passed in the request URL</Src></td>
              <td>OData query options such as <code>$filter</code>, <code>$select</code> and <code>$top</code></td>
            </tr>
            <tr>
              <td><strong>Field names</strong></td>
              <td>Specific to each MLS; ARMLS notes that <Src href={ARMLS}>RETS field names are not human-readable and apply only to one MLS</Src></td>
              <td>RESO Data Dictionary names, shared across MLSs that have adopted them</td>
            </tr>
            <tr>
              <td><strong>Response format</strong></td>
              <td><Src href={SPARK_SESSION}>Tab-delimited</Src> (COMPACT) or XML</td>
              <td><Src href={RESO_CORE}>JSON for data, XML for metadata</Src></td>
            </tr>
            <tr>
              <td><strong>Paging</strong></td>
              <td>Limit and offset parameters, set by each server</td>
              <td><Src href={RESO_CORE}>Server-driven paging with @odata.nextLink</Src></td>
            </tr>
            <tr>
              <td><strong>Photos</strong></td>
              <td>GetObject, which can return several images in <Src href={SPARK_SESSION}>one multi-part (MIME) response</Src></td>
              <td>A Media resource with a URL per image; download rules vary by platform (below)</td>
            </tr>
            <tr>
              <td><strong>Incremental updates</strong></td>
              <td>A DMQL filter on the modification timestamp, which <Src href={SPARK_REPLICATE}>returns only records modified since a given time</Src></td>
              <td>A <code>$filter</code> on ModificationTimestamp; RESO calls timestamp polling <Src href={RESO_EVENTS}>the current state of the art</Src> and has ratified an event-log alternative</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        The replication pattern itself carries over. RESO describes it the same way for the Web API:{' '}
        <Src href={RESO_API}>replicators initially pull an entire data set, and then continually request the most recent changes</Src>.
        What you rewrite is the transport and the field mapping, not the idea.
      </p>

      <h2>The platforms differ more than the standard suggests</h2>
      <p>
        &ldquo;RESO Web API&rdquo; describes the interface, but each delivery platform publishes its own limits. Two
        examples from their documentation:
      </p>
      <div className="cp-table-wrap">
        <table>
          <thead><tr><th></th><th>MLS Grid</th><th>Trestle (Cotality)</th></tr></thead>
          <tbody>
            <tr>
              <td><strong>Auth</strong></td>
              <td><Src href={MLSGRID}>A simplified OAuth 2 scheme with long-term tokens</Src></td>
              <td><Src href={TRESTLE_API}>OAuth2 client credentials; a token is good for up to 8 hours</Src></td>
            </tr>
            <tr>
              <td><strong>Access model</strong></td>
              <td>Replication only: <Src href={MLSGRID}>&ldquo;We do not support real time data access at this time&rdquo;</Src></td>
              <td>Queries, plus <Src href={TRESTLE_REF}>a replication endpoint for more than 1,000,000 records</Src></td>
            </tr>
            <tr>
              <td><strong>Page size</strong></td>
              <td><Src href={MLSGRID_V2}>At most 5,000 records per request</Src></td>
              <td><Src href={TRESTLE_API}>A maximum of 1,000 records per query</Src></td>
            </tr>
            <tr>
              <td><strong>Rate limits</strong></td>
              <td><Src href={MLSGRID}>No more than 2 requests per second</Src>, with hourly and daily caps</td>
              <td><Src href={TRESTLE_API}>7,200 queries per hour and 180 per minute</Src> as the baseline</td>
            </tr>
            <tr>
              <td><strong>Incremental updates</strong></td>
              <td><Src href={MLSGRID_V2}>Query using the greatest ModificationTimestamp in your local database</Src>; a <Src href={MLSGRID_V2}>MlgCanView</Src> flag tells you whether to keep a record</td>
              <td><Src href={TRESTLE_SCALE}>Filter on ModificationTimestamp</Src>; removed listings need a reconciliation process</td>
            </tr>
            <tr>
              <td><strong>Media</strong></td>
              <td><Src href={MLSGRID}>&ldquo;You must maintain your own copy of all media files&rdquo;</Src></td>
              <td>Photos are fetched individually from media URLs</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        So a migration is not finished when the code speaks OData. Page sizes, rate limits, how deletions are
        signaled and whether you must host photos yourself all come from the platform your MLS uses, and they shape
        the sync job.
      </p>

      <h2>How far along the industry is</h2>
      <p>
        RESO tracks the transition publicly. Its leaderboard says{' '}
        <Src href={RESO_BOARD}>at least 90% of MLSs in the industry have RESO-certified Web API services</Src>, and
        that <Src href={RESO_BOARD}>MLS feeds converted to Web API now cover 62.4% of U.S. subscribers</Src>. The gap
        between those two numbers is the point: most MLSs offer the Web API, but many data consumers are still on
        RETS feeds. RESO also notes that{' '}
        <Src href={RESO_CERT}>NAR MLS policy requires compliance with RESO&apos;s most recent standards</Src>.
      </p>
      <p>Shutdown dates are set by each MLS. Examples from their own pages:</p>
      <ul>
        <li><strong>ARMLS (Arizona):</strong> <Src href={ARMLS}>RETS shutoff on December 15, 2023</Src>.</li>
        <li><strong>RLCAR (Florida):</strong> <Src href={RLCAR}>RETS shutoff on March 31, 2024</Src>.</li>
        <li><strong>Metro MLS (Wisconsin):</strong> says <Src href={METRO}>RETS will be sunset soon</Src>, without a date.</li>
        <li><strong>Trestle:</strong> <Src href={TRESTLE_RETS}>continues to provide data access via RETS for customers who do not wish to or cannot switch</Src>, and publishes no end date.</li>
      </ul>
      <p>
        If your MLS has not announced a date, ask. An MLS that still serves RETS is not obliged to keep doing so, and
        notice periods vary.
      </p>

      <h2>A migration checklist</h2>
      <ol>
        <li><strong>List every RETS feed you consume</strong> and, for each, whether the MLS offers the Web API directly or through a platform such as MLS Grid, Trestle or Bridge.</li>
        <li><strong>Check your license.</strong> A new feed type can mean a new agreement. Our guide on <Link href="/blog/how-to-get-mls-data-access">how to get MLS data access</Link> covers the license types and approval steps.</li>
        <li><strong>Map fields from each MLS&apos;s RETS names to Data Dictionary names.</strong> Expect local fields that have no standard equivalent and decide where they go.</li>
        <li><strong>Rewrite authentication and the query layer</strong> for OAuth2 and OData, then the paging loop for <code>@odata.nextLink</code>.</li>
        <li><strong>Rebuild incremental sync around ModificationTimestamp</strong> and the platform&apos;s way of signaling removed listings.</li>
        <li><strong>Decide where photos live.</strong> If the platform requires you to host media, add storage and a download queue that respects its rate limits.</li>
        <li><strong>Run both feeds side by side</strong> and compare record counts and a sample of listings before you switch.</li>
        <li><strong>Keep your downstream schema stable</strong> where you can, so search and listing pages do not change on the same day as the feed.</li>
      </ol>
      <p>
        We have built pipelines of this kind: our{' '}
        <Link href="/case-studies/scaling-real-estate-saas-platform">real estate SaaS case study</Link> describes a
        rebuilt MLS sync engine with delta detection, retry logic and per-feed error isolation, and the{' '}
        <Link href="/case-studies/w3re-ai-real-estate-platform">W3|re case study</Link> a pipeline that unifies four
        MLS systems. Fees for the feeds themselves are in our{' '}
        <Link href="/blog/mls-idx-integration-cost">MLS and IDX cost guide</Link>.
      </p>

      <GuideFaq slug={SLUG} items={[
        { question: 'Is RETS still supported?', answer: ['Not by RESO, which says RETS ', ['has been deprecated and is no longer supported', RESO_API], ' and ', ['discontinued certifying it in 2018', RESO_CERT], '. Individual MLSs and platforms decide when to switch their RETS servers off, and some still run them.'] },
        { question: 'What is the difference between RETS and the RESO Web API?', answer: ['RETS is a real-estate-specific, XML-based standard with its own login transaction and query language. The RESO Web API is built on general web standards: RESO ', ['uses the OData V4 standard specification', RESO_API], ' with ', ['OAuth2 bearer tokens and client credentials', RESO_CORE], ' and JSON responses.'] },
        { question: 'When will my MLS turn off RETS?', answer: ['Each MLS sets its own date. ARMLS, for example, set its ', ['RETS shutoff for December 15, 2023', ARMLS], ', and RLCAR for ', ['March 31, 2024', RLCAR], '. Ask your MLS or its data platform directly; many have not published a date.'] },
        { question: 'Do field names change when moving from RETS to the Web API?', answer: ['Usually, yes. RETS field names were specific to each MLS, while the Web API is paired with the RESO Data Dictionary, whose current certified version is ', ['Data Dictionary 2.0, with 1,745 fields and 3,683 lookups', RESO_DD], '. Plan a field-by-field mapping for every MLS you consume.'] },
        { question: 'Can I still replicate MLS data into my own database with the Web API?', answer: ['Yes. RESO describes the pattern for the Web API: ', ['replicators initially pull an entire data set, and then continually request the most recent data changes', RESO_API], '. Some platforms are replication-only; MLS Grid says ', ['it does not support real time data access at this time', MLSGRID], '.'] },
      ]} />

      <p className="cp-note">
        Standards, platform limits and shutdown dates were taken from the linked pages on October 9, 2026. Platform
        limits change, so check the current documentation before you size a sync job.
      </p>
    </GuideLayout>
  );
}
