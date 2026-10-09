import Link from 'next/link';
import GuideLayout, { GuideFaq, Src, guideMetadata } from '../../components/GuideLayout';

const SLUG = 'investor-portal-vs-file-sharing';
export const metadata = guideMetadata(SLUG);

// Sources checked 2026-10-09. Every third-party statement is as published on the
// vendor's own page on that date. Product feature labels are quoted from the vendors'
// sites; nothing here is based on using those products.
const DBX_PERMS = 'https://help.dropbox.com/share/set-folder-permissions';
const DBX_LINKS = 'https://help.dropbox.com/share/set-link-permissions';
const DBX_ACTIVITY = 'https://help.dropbox.com/account-access/view-activity';
const DBX_WATERMARK = 'https://help.dropbox.com/view-edit/add-a-watermark';
const GDRIVE_SHARE = 'https://support.google.com/drive/answer/2494822?hl=en';
const GDRIVE_LOG = 'https://knowledge.workspace.google.com/admin/reports/drive-log-events';
const BOX_ROLES = 'https://support.box.com/hc/en-us/articles/360044196413-Understanding-Collaborator-Permission-Levels';
const BOX_REPORTS = 'https://support.box.com/hc/en-us/articles/4415010860435-Using-Reports';
const BOX_WATERMARK = 'https://support.box.com/hc/en-us/articles/360044195253-Watermarking-Files';
const SP_SHARE = 'https://support.microsoft.com/en-us/office/share-sharepoint-files-or-folders-1fe37332-0f9a-4719-970e-d2578da4941c';
const MS_AUDIT = 'https://learn.microsoft.com/en-us/purview/audit-solutions-overview';
const MS_AUDIT_ACTIVITIES = 'https://learn.microsoft.com/en-us/purview/audit-log-activities';
const JSQ_PORTAL = 'https://www.junipersquare.com/finance-and-reporting/investor-portal';
const JSQ_HOME = 'https://www.junipersquare.com/';
const INVESTNEXT = 'https://www.investnext.com/pricing/';
const APPFOLIO = 'https://www.appfolio.com/pricing#investment-manager';
const APPFOLIO_IM = 'https://www.appfolio.com/investment-manager';
const AGORA = 'https://agorareal.com/pricing/';
const SPONSORCLOUD = 'https://www.sponsorcloud.io/pricing';
const COVERCY = 'https://www.covercy.com/pricing/investment-management/';
const CASHFLOW = 'https://www.cashflowportal.com/pricing';
const FINRA = 'https://www.finra.org/rules-guidance/key-topics/customer-information-protection';

export default function Guide() {
  return (
    <GuideLayout slug={SLUG}>
      <h2>The short answer</h2>
      <p>
        File sharing is enough when you have a handful of investors who all receive the same documents. An investor
        portal becomes worth it when investors hold different positions in different funds or deals, because a portal
        knows who each investor is and what they own, while a shared folder only knows who has the link. Most firms
        that outgrow file sharing should look at an off-the-shelf investor portal first, and consider a custom build
        only when their structures or reports do not fit one.
      </p>

      <h2>What file sharing already does well</h2>
      <p>
        The common file-sharing tools cover more of the basics than they are given credit for. From each vendor&apos;s
        own documentation:
      </p>
      <div className="cp-table-wrap">
        <table>
          <thead><tr><th>Tool</th><th>Restrict access to named people</th><th>Limit downloads or expire links</th></tr></thead>
          <tbody>
            <tr>
              <td>Dropbox</td>
              <td><Src href={DBX_PERMS}>&ldquo;Only people invited&rdquo; can access a shared file or folder</Src></td>
              <td><Src href={DBX_LINKS}>Link expiry and disabled downloads on paid plans</Src></td>
            </tr>
            <tr>
              <td>Google Drive</td>
              <td><Src href={GDRIVE_SHARE}>&ldquo;Restricted: Only people with access can open the file&rdquo;</Src></td>
              <td><Src href={GDRIVE_SHARE}>Owners control whether viewers can download, print and copy; access expiry is for eligible work or school accounts</Src></td>
            </tr>
            <tr>
              <td>Box</td>
              <td><Src href={BOX_ROLES}>Editor and Viewer roles on all accounts; more roles on Business and Enterprise</Src></td>
              <td><Src href="https://support.box.com/hc/en-us/articles/360043697094-Creating-Shared-Links">Password, expiration and download restrictions on shared links</Src></td>
            </tr>
            <tr>
              <td>SharePoint</td>
              <td><Src href={SP_SHARE}>&ldquo;People you choose&rdquo; links give access only to the people you specify</Src></td>
              <td><Src href={SP_SHARE}>A &ldquo;Can&apos;t download&rdquo; permission; expiry dates only on &ldquo;anyone&rdquo; links</Src></td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        So for a small investor base, a folder per investor with named access is a workable start. The limits show up
        in three places.
      </p>

      <h2>Where file sharing stops</h2>
      <h3>Audit trails depend on the plan and on an administrator</h3>
      <p>
        Knowing who opened which document is possible, but it is an administrator report on higher plans rather than
        something attached to each investor&apos;s record:
      </p>
      <ul>
        <li><strong>Dropbox:</strong> file-operation events in the activity report are for <Src href={DBX_ACTIVITY}>Dropbox Business Plus, Advanced and Enterprise only</Src>.</li>
        <li><strong>Box:</strong> <Src href={BOX_REPORTS}>reports are available to Business plans and above</Src>, and you must be an organization administrator to run one.</li>
        <li><strong>Google Drive:</strong> admins can search Drive log events, but <Src href={GDRIVE_LOG}>most Drive audit events are logged only for files owned by users with supported editions</Src>.</li>
        <li><strong>Microsoft 365:</strong> the audit log records events such as <Src href={MS_AUDIT_ACTIVITIES}>a user accessing a file or downloading a document</Src>, and <Src href={MS_AUDIT}>Audit (Standard) retains records for 180 days</Src>.</li>
      </ul>

      <h3>Watermarking is limited or sits on the top plan</h3>
      <ul>
        <li><strong>Box</strong> has a per-viewer watermark showing the viewer&apos;s email or IP address and the access time, but <Src href={BOX_WATERMARK}>watermarking is available only for Box Enterprise plans and above</Src>.</li>
        <li><strong>Dropbox</strong> lets you add a watermark to a file, on paid plans, and <Src href={DBX_WATERMARK}>only to JPEG, PNG, BMP and PDF files</Src>. Its help page describes a watermark the owner adds, not one that changes per viewer.</li>
      </ul>
      <p>
        That matters if a confidential document leaks. In our{' '}
        <Link href="/case-studies/proptech-investor-portal">investor portal case study</Link>, the firm had shared
        offering documents through links with no access controls and no audit trail, and could not trace a leak to its
        source. The portal now watermarks every viewed or downloaded copy with the investor&apos;s name, a timestamp
        and a tracking ID.
      </p>

      <h3>A folder holds files, not positions</h3>
      <p>
        This is the real gap. A file-sharing tool does not know that an investor is a limited partner in one fund and a
        co-investor in a single deal, or what their capital account balance is. Someone has to prepare each
        investor&apos;s statement, put it in the right folder and repeat that every quarter. In our case study, that
        work took the investor relations team three weeks each quarter for 280+ investors before the portal, and two
        hours after it.
      </p>
      <p>
        Capital calls, subscription documents and distribution notices have the same problem: they are workflows with
        a status per investor, and a folder has no notion of &ldquo;signed&rdquo; or &ldquo;outstanding&rdquo;.
      </p>

      <h2>Comparison at a glance</h2>
      <div className="cp-table-wrap">
        <table>
          <thead><tr><th>Need</th><th>File sharing</th><th>Off-the-shelf investor portal</th><th>Custom portal</th></tr></thead>
          <tbody>
            <tr><td>Send the same documents to everyone</td><td>Yes</td><td>Yes</td><td>Yes</td></tr>
            <tr><td>Each investor sees only their own documents</td><td>Yes, with a folder per investor kept up by hand</td><td>Yes</td><td>Yes</td></tr>
            <tr><td>Access by fund, deal or entity</td><td>Manual</td><td>Yes, within the product&apos;s model</td><td>Modeled on your structure</td></tr>
            <tr><td>Who opened what</td><td>Admin reports on higher plans</td><td>Ask the vendor</td><td>Built in, per investor</td></tr>
            <tr><td>Per-investor watermark</td><td>Box Enterprise only, of the four tools above</td><td>Juniper Square lists <Src href="https://www.junipersquare.com/investor-relations/data-rooms">watermarking and download restrictions</Src> for its data rooms; ask other vendors</td><td>Yes</td></tr>
            <tr><td>Capital calls and e-signature</td><td>No</td><td>Listed by most of the products below</td><td>Yes</td></tr>
            <tr><td>Distribution and waterfall calculations</td><td>No</td><td>Listed by most of the products below</td><td>Your own rules</td></tr>
            <tr><td>Time to start</td><td>Immediate</td><td>Set up by the vendor</td><td>A development project</td></tr>
          </tbody>
        </table>
      </div>
      <p className="cp-muted">
        The first two columns summarize the vendor pages cited in this guide. The custom column describes the portal in
        our case study.
      </p>

      <h2>Off-the-shelf investor portals: what they list and what they publish on price</h2>
      <p>
        Several products are built for real estate sponsors and funds. This is what each one&apos;s own site says, as
        of October 9, 2026. We have not evaluated these products; this table reports their published information only.
      </p>
      <div className="cp-table-wrap">
        <table>
          <thead><tr><th>Product</th><th>Published price</th><th>Features its site lists</th></tr></thead>
          <tbody>
            <tr>
              <td>AppFolio Investment Manager</td>
              <td><Src href={APPFOLIO}>Core plan starting at $650 per month</Src>; Premier is custom</td>
              <td><Src href={APPFOLIO_IM}>Investor portal with downloadable K-1s and reports, electronic signatures, waterfall calculations</Src></td>
            </tr>
            <tr>
              <td>Agora</td>
              <td><Src href={AGORA}>Essential plan starts from $749 per month</Src>; Enterprise by quote</td>
              <td><Src href={AGORA}>Investor portal, CRM, document and K-1 management, waterfall automation, digital subscriptions, e-signatures, capital call and distribution notices</Src></td>
            </tr>
            <tr>
              <td>Cash Flow Portal</td>
              <td><Src href={CASHFLOW}>Syndication Suite starts at $699 per month</Src>; other plans unpriced</td>
              <td><Src href={CASHFLOW}>Branded investor portal, secure document sharing, K-1 distribution, e-signatures, waterfall modeling, distribution payments, CRM</Src></td>
            </tr>
            <tr>
              <td>Covercy</td>
              <td><Src href={COVERCY}>Priced per legal entity: $249, $283 or $406 per entity per month across three plans, as shown for two entities</Src></td>
              <td><Src href={COVERCY}>CRM, investor portal, fundraising, distributions, reporting, funds and capital calls</Src></td>
            </tr>
            <tr>
              <td>InvestNext</td>
              <td><Src href={INVESTNEXT}>No subscription price published; ACH payments cost 0.03% plus 25¢ each, capped at $25</Src></td>
              <td><Src href={INVESTNEXT}>Custom investor portal, investor CRM, distributions and payments, waterfalls, document and K-1 dissemination, e-signatures</Src></td>
            </tr>
            <tr>
              <td>Juniper Square</td>
              <td><Src href={JSQ_HOME}>No price published; the site offers a demo</Src></td>
              <td><Src href={JSQ_PORTAL}>Investor portal with granular permissions by contact, investor account, investment vehicle, document type and data field</Src></td>
            </tr>
            <tr>
              <td>SponsorCloud (formerly SyndicationPro)</td>
              <td><Src href={SPONSORCLOUD}>No price published; custom quote</Src></td>
              <td><Src href="https://www.sponsorcloud.io/platform/investor-portal-software">Investor portal with tax document access and signing of subscription agreements</Src></td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        For most sponsors one of these is the right next step after file sharing: they are running products with
        support, and none of them needs a development project.
      </p>

      <h2>When a custom portal makes sense</h2>
      <p>A custom portal is worth considering when one or more of these is true:</p>
      <ul>
        <li><strong>Your structure does not fit a product&apos;s model.</strong> The portal in our case study uses six role types and sets permissions at the entity level, so one investor can be an LP in a fund, a co-investor in a single deal and have a family office administrator with read-only access to both.</li>
        <li><strong>Your calculations are your own.</strong> Distribution waterfalls, IRR and equity multiple are computed from one system of record, to your rules, rather than adapted to a product&apos;s.</li>
        <li><strong>The portal has to connect to systems a product does not support,</strong> such as an internal accounting or deal system.</li>
        <li><strong>Document control is a requirement, not a preference:</strong> permission checks at the API level, per-investor watermarking and a complete audit trail.</li>
      </ul>
      <p>
        It is also a development project with a build cost and ongoing maintenance. Our{' '}
        <Link href="/services/investor-portal-development">investor portal development</Link> page describes what that
        involves; the one portal we have published as a case study took six months.
      </p>

      <h2>A note on obligations</h2>
      <p>
        We are engineers, not lawyers, and nothing here is legal advice. As a benchmark for how regulated firms are
        expected to treat client data, FINRA describes{' '}
        <Src href={FINRA}>protection of financial and personal customer information as a key responsibility and obligation of its member firms</Src>.
        That statement is about broker-dealers. Whether and how similar rules apply to your firm is a question for
        your counsel.
      </p>

      <GuideFaq slug={SLUG} items={[
        { question: 'Is Dropbox or Google Drive secure enough for investor documents?', answer: ['Both let you restrict a file to named people: Dropbox has an ', ['"Only people invited" setting', DBX_PERMS], ' and Google Drive has ', ['"Restricted: Only people with access can open the file"', GDRIVE_SHARE], '. What they do not provide is a record of each investor\'s holdings, so someone still has to place the right document in the right folder for every investor.'] },
        { question: 'Can file-sharing tools show who opened a document?', answer: ['On some plans, as an administrator report. In Dropbox, file-operation events are for ', ['Business Plus, Advanced and Enterprise only', DBX_ACTIVITY], ', and in Box, ', ['reports are available to Business plans and above', BOX_REPORTS], '.'] },
        { question: 'How much does an investor portal cost?', answer: ['Published starting prices include AppFolio Investment Manager\'s ', ['Core plan starting at $650 per month', APPFOLIO], ', Cash Flow Portal\'s ', ['Syndication Suite at $699 per month', CASHFLOW], ' and Agora\'s ', ['Essential plan from $749 per month', AGORA], '. Juniper Square, InvestNext and SponsorCloud do not publish subscription prices.'] },
        { question: 'Do file-sharing tools watermark documents per investor?', answer: ['Of the four tools covered here, only Box documents a per-viewer watermark, and ', ['watermarking is available only for Box Enterprise plans and above', BOX_WATERMARK], '. Dropbox lets the owner add a watermark ', ['to JPEG, PNG, BMP and PDF files', DBX_WATERMARK], '.'] },
        { question: 'When should a firm build a custom investor portal?', answer: ['When its fund, co-investment and SPV structures, its distribution calculations or its document rules do not fit an off-the-shelf product, or when the portal must connect to systems the product does not support. Otherwise an off-the-shelf portal is usually the better choice.'] },
      ]} />

      <p className="cp-note">
        Vendor features, plan limits and prices were taken from each vendor&apos;s public pages on October 9, 2026 and
        change often. Confirm them with the vendor before you decide.
      </p>
      {/* TODO(owner): add a disclosure line here if Peregrine has a partnership or referral arrangement with any vendor named above. */}
    </GuideLayout>
  );
}
