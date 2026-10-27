import Link from 'next/link';
import GuideLayout, { GuideFaq, Src, guideMetadata } from '../../components/GuideLayout';

const SLUG = 'php2shell-php-security-vulnerabilities-2026';
export const metadata = guideMetadata(SLUG);

// Sources read 2026-10-27, re-checked 2026-10-28. The claim-by-claim source record is kept outside this public
// repository (see docs/content/sources/php2shell-php-security-vulnerabilities-2026.md).
// Only facts the record marks confirmed or qualified are used, with their caveats:
// honeypot observations are attempts, not confirmed breaches; no scan counts; no
// unverified government takedown or pre-disclosure claims. No exploit detail is given.
const ARCHIVE = 'https://www.php.net/archive/2026.php';
const SUPPORTED = 'https://www.php.net/supported-versions.php';
const GHSA_OOM = 'https://github.com/php/php-src/security/advisories/GHSA-w8hw-w9fx-j79w';
const GHSA_STATE = 'https://github.com/php/php-src/security/advisories/GHSA-6wmf-4rv5-p3rp';
const CISA = 'https://www.cisa.gov/news-events/alerts/2026/10/21/critical-vulnerabilities-php-require-immediate-patching';
const NCSC = 'https://www.ncsc.gov.uk/news/critical-security-issue-affecting-php';
const CCCS = 'https://www.cyber.gc.ca/en/alerts-advisories/al26-026-critical-vulnerabilities-impacting-php-cve-2026-109618-cve-2026-109619';
const WATCHTOWR = 'https://watchtowr.com/intelligence/php-cve-2026-109618-faq/';
const LARAVEL = 'https://laravel.com/docs/releases';
const WORDPRESS = 'https://wordpress.org/about/requirements/';

export default function Guide() {
  return (
    <GuideLayout slug={SLUG}>
      <h2>The short answer</h2>
      <p>
        On October 21, 2026 the PHP project released PHP 8.5.12, 8.4.27, 8.3.36 and 8.2.35 to{' '}
        <Src href={ARCHIVE}>fix two critical vulnerabilities that can allow unauthenticated remote code execution</Src>,
        tracked as CVE-2026-109618 and CVE-2026-109619. PHP2Shell is the name{' '}
        <Src href={WATCHTOWR}>used in security coverage</Src> for that pair.
        Unauthenticated means an attacker does not need an account on your site; remote code execution means
        they could run their own code on your server.
      </p>
      <p>
        What matters is the exact PHP runtime serving your site, not your CMS or framework version. Check whether
        each site runs a fixed upstream release or a package your host or distribution has patched, starting from
        the <Src href={ARCHIVE}>PHP project&apos;s announcement</Src>. Treat any site on PHP 8.1 or older as a
        more urgent problem.
      </p>

      <h2>Timeline</h2>
      <ul>
        <li>
          <strong>October 21, 2026.</strong> PHP 8.5.12, 8.4.27, 8.3.36 and 8.2.35 are{' '}
          <Src href={ARCHIVE}>released with the fixes</Src>. The same day, CISA publishes{' '}
          <Src href={CISA}>an alert calling for immediate patching</Src>, the UK NCSC publishes{' '}
          <Src href={NCSC}>a news item on the issue</Src>, and the Canadian Centre for Cyber Security publishes{' '}
          <Src href={CCCS}>alert AL26-026</Src>.
        </li>
        <li>
          <strong>October 23, 2026.</strong> php.net publishes an{' '}
          <Src href={ARCHIVE}>informational advisory about a separate issue, CVE-2026-115560</Src>, covered
          below.
        </li>
        <li>
          <strong>October 26, 2026.</strong> CISA updates its alert:{' '}
          <Src href={CISA}>both CVEs are added to its Known Exploited Vulnerabilities catalog</Src>. The same day,
          php.net publishes <Src href={ARCHIVE}>rebuilt Windows packages, labelled 8.x.y-1</Src>, with Brotli
          1.2.1 for a separate issue (CVE-2026-111497) reachable through cURL&apos;s automatic decompression. PHP
          version numbers do not change, and only Windows builds are affected.
        </li>
      </ul>

      <h2>The two vulnerabilities, at a high level</h2>
      <p>
        Both concern how the PHP engine manages memory and state while it handles requests. Neither is a bug in
        WordPress, Laravel or your own code. This guide does not describe how either one is exploited.
      </p>
      <ul>
        <li>
          <strong>CVE-2026-109618, &ldquo;RCE via OOM corruption&rdquo;</strong> (
          <Src href={GHSA_OOM}>GHSA-w8hw-w9fx-j79w</Src>). When PHP runs out of memory, the out-of-memory
          handling can interrupt it while request data is only partly set up, and the cleanup that follows treats
          that data as valid. The advisory rates it <Src href={GHSA_OOM}>9.2 under CVSS v4</Src>.
        </li>
        <li>
          <strong>CVE-2026-109619, &ldquo;RCE via stale global state&rdquo;</strong> (
          <Src href={GHSA_STATE}>GHSA-6wmf-4rv5-p3rp</Src>). State that belongs to one request can survive after
          its memory is freed, and a later request handled by the same worker may use it. Also rated{' '}
          <Src href={GHSA_STATE}>9.2 under CVSS v4</Src>.
        </li>
      </ul>
      <p>
        php.net lists who is at risk as{' '}
        <Src href={ARCHIVE}>all PHP installations serving web requests</Src>, including PHP-FPM, Apache mod_php,
        php-cgi, FrankenPHP and LiteSpeed, with the highest risk for mod_php, where it says a pre-application
        exploit was demonstrated. A site can be exposed even if its own code is flawless.
      </p>
      <p>
        On exploitation, be precise. The Canadian Centre says{' '}
        <Src href={CCCS}>open-source reporting indicates both CVEs are being exploited in the wild</Src>, and CISA
        has added both to its catalog of known exploited vulnerabilities. The security firm watchTowr reports{' '}
        <Src href={WATCHTOWR}>exploitation observed in its honeypot network since October 21</Src>; honeypots are
        decoy systems, so that shows attempts against sensors, not confirmed breaches of real sites. None of this
        means every PHP site has been compromised, but an unpatched site should be treated as a target.
      </p>

      <h2>Which PHP versions are patched?</h2>
      <div className="cp-table-wrap">
        <table>
          <thead><tr><th>PHP branch</th><th>Upstream fixed version</th><th>Notes</th></tr></thead>
          <tbody>
            <tr><td><strong>8.5</strong></td><td><Src href={ARCHIVE}>8.5.12</Src></td><td>Active support</td></tr>
            <tr><td><strong>8.4</strong></td><td><Src href={ARCHIVE}>8.4.27</Src></td><td>Active support</td></tr>
            <tr><td><strong>8.3</strong></td><td><Src href={ARCHIVE}>8.3.36</Src></td><td>Security fixes only, until <Src href={SUPPORTED}>December 31, 2027</Src></td></tr>
            <tr><td><strong>8.2</strong></td><td><Src href={ARCHIVE}>8.2.35</Src></td><td>Security fixes only, until <Src href={SUPPORTED}>December 31, 2026</Src></td></tr>
            <tr><td><strong>8.1, 8.0, 7.4</strong></td><td>No upstream release</td><td>php.net provided <Src href={ARCHIVE}>minimal source backports</Src> for these three branches only. Your vendor may ship patched packages.</td></tr>
            <tr><td><strong>7.3 and older</strong></td><td>No upstream release</td><td>php.net provided backports only for 7.4, 8.0 and 8.1. Look for a vendor with extended support, or contain and migrate.</td></tr>
            <tr><td><strong>8.6</strong></td><td><Src href={ARCHIVE}>8.6.0 RC4</Src> includes the fixes</td><td>Still a release candidate. Not for production.</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        A recent PHP version is not necessarily a patched one. php.net says{' '}
        <Src href={ARCHIVE}>Linux distributions and long-term support vendors received the patches in advance</Src>.
        Vendors often backport fixes into their own packages, so a package&apos;s version string can differ from the
        upstream numbers in the table: a patched package may not show 8.3.36, and a number alone does not prove a
        package is patched. Ask your vendor or host whether the specific package you run includes the fixes for
        both CVEs.
      </p>
      <p>
        For PHP 8.1 and older, php.net states that{' '}
        <Src href={ARCHIVE}>these branches no longer receive updates from the PHP project</Src>. Its source
        backports are for people who build or package PHP, not an installable update for most site owners.
      </p>

      <h2>Is my WordPress site affected?</h2>
      <p>
        The PHP runtime under WordPress decides this, not the WordPress version. A fully updated WordPress site on
        an unpatched PHP build is exposed.
      </p>
      <p>
        To find the PHP version, look in your hosting control panel, or in the WordPress admin under Tools, Site
        Health, Info, Server. The version alone does not show whether a vendor backport is
        included, so ask your host. Do not create a public <code>phpinfo()</code> page
        to check: it shows your server&apos;s configuration to anyone who finds it. If one exists from earlier work,
        remove it.
      </p>
      <p>
        If the host can move you to a newer PHP version, check your theme and plugins first. WordPress itself{' '}
        <Src href={WORDPRESS}>recommends PHP 8.3 or greater</Src>, and says it can still run on PHP 7.4 or later
        only in <Src href={WORDPRESS}>legacy environments that are past end of life</Src>.
      </p>

      <h2>Is my Laravel application affected?</h2>
      <p>
        Laravel runs on top of the PHP runtime, so the question is which PHP build serves your application on every
        server and container. Running <code>composer update</code> updates your PHP
        packages; it does not change the PHP interpreter, and it does not fix these CVEs. The fix is a patched PHP
        package or image, deployed and loaded.
      </p>
      <p>
        If the patched version means moving to a newer PHP branch, check your Laravel version&apos;s range:{' '}
        <Src href={LARAVEL}>Laravel 12 supports PHP 8.2 to 8.5, and Laravel 13 supports PHP 8.3 to 8.5</Src>.
        For applications several versions behind, our{' '}
        <Link href="/blog/laravel-upgrade-checklist">Laravel upgrade and modernization checklist</Link> walks
        through the phases.
      </p>

      <h2>A safe response checklist</h2>
      <h3>You can do this without server access</h3>
      <ul className="cp-checklist">
        <li>List every PHP site you own, including staging copies and old subdomains, with its PHP version from the hosting panel or Site Health.</li>
        <li>Ask your host or IT provider, in writing, whether the package each site runs includes the fixes for CVE-2026-109618 and CVE-2026-109619, and when it was applied.</li>
        <li>Mark every site on PHP 8.1 or older. Those need a plan, not just a ticket.</li>
        <li>Confirm a recent backup exists for each site.</li>
        <li>Do not rely on a firewall. CISA says <Src href={CISA}>a web application firewall may provide some protection</Src>; that is not the same as a fix.</li>
      </ul>
      <h3>This needs server access or your host</h3>
      <ul className="cp-checklist">
        <li>Install the fixed upstream release or your vendor&apos;s patched package, then restart PHP-FPM or the web server so the new binary is actually loaded.</li>
        <li>Cover every PHP that serves requests, including worker pools and containers; rebuild images from a patched base image.</li>
        <li>Confirm the running version through the web server itself, not only the command line, since the two can differ. Remove any temporary check afterwards.</li>
        <li>If you cannot update yet, php.net lists interim measures, but says they <Src href={ARCHIVE}>reduce exposure but do not make an installation safe</Src>; only an update is a complete fix.</li>
        <li>If a system cannot be updated at all, restrict who can reach it. <Src href={CISA}>CISA</Src> and the <Src href={NCSC}>NCSC</Src> go further and advise taking such a system offline until it is fixed.</li>
        <li>If a server shows signs of compromise, such as files you did not upload, patching alone is not enough. Bring in a security specialist.</li>
      </ul>

      <h2>CVE-2026-115560: a separate session issue</h2>
      <p>
        On October 23, php.net published an informational advisory about another issue. It applies only under a
        specific combination: <code>session.serialize_handler</code> set to <code>php_binary</code> or{' '}
        <code>php_serialize</code> and then switched to <code>php</code> at runtime with <code>ini_set()</code>{' '}
        before <code>session_start()</code>, with session upload progress enabled. php.net{' '}
        <Src href={ARCHIVE}>suggests setting <code>session.upload_progress.enabled=0</code></Src> until the next
        regular bugfix release, which will carry the full advisory. As of October 28, 2026, that release has not
        shipped. This setting does not fix CVE-2026-109618 or CVE-2026-109619; it is in addition to the October 21
        update, not instead of it.
      </p>

      <h2>Still on PHP 5, 7 or early 8.x?</h2>
      <p>
        There is no upstream release for these branches (php.net published only minimal source backports for 7.4, 8.0 and 8.1), but there are options. First, check whether your operating
        system vendor or an extended-support vendor ships a patched package.
        Second, contain the exposure. Limiting who can reach the application helps; for organizations that cannot
        update or run PHP 8.1 or earlier,{' '}
        <Src href={CISA}>CISA advises taking PHP systems offline until they are patched</Src>, and the{' '}
        <Src href={NCSC}>NCSC suggests considering the same</Src>. Third, plan the move to a supported branch, which
        is the only lasting answer.
      </p>
      <p>
        Not every old installation is equally exposed. php.net&apos;s advisory concerns PHP serving web requests,
        with mod_php at the highest risk; a script run only from the command line on an internal machine is in a
        different position from a public website. That is a reason to prioritize, not a reason to wait.
      </p>

      <h2>After the urgent patch</h2>
      <p>
        Patching closes this pair of vulnerabilities. It does not change the support calendar. PHP 8.2 receives
        security fixes only until <Src href={SUPPORTED}>December 31, 2026</Src>, so an application patched to
        8.2.35 still needs a move to a newer branch planned before that date. PHP 8.3 has security support until{' '}
        <Src href={SUPPORTED}>December 31, 2027</Src>, PHP 8.4 until <Src href={SUPPORTED}>December 31, 2028</Src>{' '}
        and PHP 8.5 until <Src href={SUPPORTED}>December 31, 2029</Src>. Our{' '}
        <Link href="/blog/php-8-2-end-of-life-upgrade-guide">PHP 8.2 end-of-life planning guide</Link> compares
        those targets and lists the migration steps.
      </p>
      <p>
        Use the urgency to fix what made this patch hard: keep an inventory of which PHP runs where, add tests
        around the critical paths, and build a release process that can ship a runtime change quickly. Then put PHP,
        framework and dependency updates on a regular schedule.
      </p>

      <h2>When to bring in a development partner</h2>
      <p>Many teams can handle a patch with their host. Outside help makes sense when:</p>
      <ul>
        <li>the application has no active maintainer, or the original developer has left;</li>
        <li>your developers can change the code but not the runtime safely, or the host will not move without a compatibility check;</li>
        <li>plugins, extensions or packages block the move to a patched or supported version;</li>
        <li>payment, CRM or other integrations need regression tests before anything changes;</li>
        <li>several servers or environments have to be updated together.</li>
      </ul>
      <p>
        That is the work our{' '}
        <Link href="/services/php-upgrade-migration">PHP upgrade and migration service</Link> covers, from an
        urgent patch assessment to a staged move to a supported version.
      </p>

      <GuideFaq slug={SLUG} items={[
        { question: 'Has every PHP website been hacked?', answer: ['No. Agencies report that the two vulnerabilities are being exploited, and the Canadian Centre cites ', ['open-source reporting of exploitation in the wild', CCCS], ', but that is not the same as every site being compromised. An unpatched site is at risk. Patching closes these two vulnerabilities but does not undo an earlier compromise, so if you see signs of one, involve a security specialist.'] },
        { question: 'Does updating WordPress or running composer update fix PHP2Shell?', answer: ['No. Both CVEs are in the PHP runtime, below WordPress, Laravel and your own code. Only a patched PHP build fixes them: an upstream release such as ', ['8.3.36 or 8.4.27', ARCHIVE], ', or a vendor package that includes the fixes.'] },
        { question: 'My host says I am on PHP 8.3. Am I patched?', answer: ['Not necessarily. The upstream fix for that branch is ', ['PHP 8.3.36', ARCHIVE], '. Hosts and distributions often backport fixes without using the upstream version number, so ask your host whether the package you run includes the fixes for CVE-2026-109618 and CVE-2026-109619.'] },
        { question: 'Is a web application firewall enough?', answer: ['No. CISA says ', ['a web application firewall may provide some protection', CISA], ', and php.net says interim measures ', ['do not make an installation safe', ARCHIVE], '. Updating PHP is the fix.'] },
      ]} />

      <p className="cp-note">
        Last reviewed October 28, 2026, against the linked sources. Advisories change as the situation develops,
        so check them before you act. This guide summarizes published information; it is not a security
        assessment of your system.
      </p>
    </GuideLayout>
  );
}
