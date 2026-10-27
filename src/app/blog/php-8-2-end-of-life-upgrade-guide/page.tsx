import Link from 'next/link';
import GuideLayout, { GuideFaq, Src, guideMetadata } from '../../components/GuideLayout';

const SLUG = 'php-8-2-end-of-life-upgrade-guide';
export const metadata = guideMetadata(SLUG);

// Sources read 2026-10-27 and re-checked 2026-10-28. The claim-by-claim source record is kept outside this
// public repository (see docs/content/sources/php-8-2-end-of-life-upgrade-guide.md). Only facts the record
// marks confirmed are used. Vendor and managed-host extended support is described generically: no vendor is
// named and no vendor's support terms are claimed. No prices or durations.
const SUPPORTED = 'https://www.php.net/supported-versions.php';
const ARCHIVE = 'https://www.php.net/archive/2026.php';
const LARAVEL = 'https://laravel.com/docs/releases';
const WORDPRESS = 'https://wordpress.org/about/requirements/';

export default function Guide() {
  return (
    <GuideLayout slug={SLUG}>
      <h2>Quick answer</h2>
      <p>
        PHP 8.2 reaches end of life after December 31, 2026: php.net lists that date as the{' '}
        <Src href={SUPPORTED}>end of security support for the 8.2 branch</Src>. As of October 28, 2026 the branch
        is still supported upstream, but only in its security-only phase. Ordinary bug fixes stopped at the end of
        2024, and security releases continue: the most recent is{' '}
        <Src href={ARCHIVE}>PHP 8.2.35, released on October 21, 2026</Src>.
      </p>
      <p>
        End of life describes the PHP project&apos;s release work, not the state of your server. Nothing on a PHP
        8.2 site breaks on January 1, 2027, and the date alone does not compromise anything. What changes is that a
        vulnerability discovered in 8.2 after that day will not get a fix from the PHP project. The sensible
        order is to assess first (what runs where, and what would block a newer version), then pick a target
        version, then upgrade.
      </p>

      <h2>PHP support timeline: 8.2 to 8.5</h2>
      <p>Dates from php.net&apos;s supported-versions page, checked on October 28, 2026:</p>
      <div className="cp-table-wrap">
        <table>
          <thead><tr><th>Branch</th><th>Initial release</th><th>Active support until</th><th>Security support until</th><th>Status on October 28, 2026</th></tr></thead>
          <tbody>
            <tr><td><strong>8.5</strong></td><td><Src href={SUPPORTED}>November 20, 2025</Src></td><td><Src href={SUPPORTED}>December 31, 2027</Src></td><td><Src href={SUPPORTED}>December 31, 2029</Src></td><td>Active support</td></tr>
            <tr><td><strong>8.4</strong></td><td><Src href={SUPPORTED}>November 21, 2024</Src></td><td><Src href={SUPPORTED}>December 31, 2026</Src></td><td><Src href={SUPPORTED}>December 31, 2028</Src></td><td>Active support; security fixes only from 2027</td></tr>
            <tr><td><strong>8.3</strong></td><td><Src href={SUPPORTED}>November 23, 2023</Src></td><td><Src href={SUPPORTED}>December 31, 2025</Src></td><td><Src href={SUPPORTED}>December 31, 2027</Src></td><td>Security fixes only</td></tr>
            <tr><td><strong>8.2</strong></td><td><Src href={SUPPORTED}>December 8, 2022</Src></td><td><Src href={SUPPORTED}>December 31, 2024</Src></td><td><Src href={SUPPORTED}>December 31, 2026</Src></td><td>Security fixes only; end of life after December 31, 2026</td></tr>
          </tbody>
        </table>
      </div>
      <p>Each branch passes through three phases:</p>
      <ul>
        <li><strong>Active support.</strong> The branch receives regular point releases with bug fixes and security fixes.</li>
        <li><strong>Security-only support.</strong> Bugs that are not security issues are no longer fixed; security issues still get releases.</li>
        <li><strong>End of life.</strong> The PHP project publishes no further releases for the branch, whatever is found later.</li>
      </ul>
      <p>
        Operating system vendors, Linux distributions and some managed hosts build their own PHP packages, and
        some of them keep backporting security fixes into a branch after upstream support ends. In October 2026,
        for example, php.net noted that{' '}
        <Src href={ARCHIVE}>Linux distributions and long-term support vendors received the patches in advance</Src>.
        Whether a given vendor does this for 8.2, for how long and for which fixes is specific to that vendor, so
        confirm it with yours in writing. It is also not the same as upstream support: you depend on one
        vendor&apos;s packages and schedule, and the frameworks and libraries you use will still drop 8.2 on their own
        timetable.
      </p>

      <h2>8.2 vs 8.3 vs 8.4 vs 8.5: choosing a target</h2>
      <div className="cp-table-wrap">
        <table>
          <thead><tr><th>Version</th><th>Upstream support ends</th><th>Compatibility considerations</th><th>When it may fit</th></tr></thead>
          <tbody>
            <tr>
              <td><strong>Stay on 8.2</strong></td>
              <td><Src href={SUPPORTED}>December 31, 2026</Src></td>
              <td>No change now; every dependency will eventually require a newer version</td>
              <td>Only as a short bridge with verified vendor patches and a dated plan to move</td>
            </tr>
            <tr>
              <td><strong>8.3</strong></td>
              <td>Security fixes only, until <Src href={SUPPORTED}>December 31, 2027</Src></td>
              <td>The smallest step from 8.2; supported by <Src href={LARAVEL}>Laravel 10 through 13</Src></td>
              <td>When a package, plugin or host is not ready for 8.4 yet, or when the change before December 31 has to be as small as possible. Expect another move within about a year.</td>
            </tr>
            <tr>
              <td><strong>8.4</strong></td>
              <td>Active until <Src href={SUPPORTED}>December 31, 2026</Src>, then security fixes until <Src href={SUPPORTED}>December 31, 2028</Src></td>
              <td>Two releases&apos; worth of deprecations and incompatible changes to work through; supported by <Src href={LARAVEL}>Laravel 11, 12 and 13</Src></td>
              <td>Applications whose framework, extensions and packages already support it, and which want two years of security support after the move</td>
            </tr>
            <tr>
              <td><strong>8.5</strong></td>
              <td>Active until <Src href={SUPPORTED}>December 31, 2027</Src>, security fixes until <Src href={SUPPORTED}>December 31, 2029</Src></td>
              <td>The newest release: check that every extension, Composer package, plugin and your host support it. Supported by <Src href={LARAVEL}>Laravel 12 and 13</Src>, not Laravel 11</td>
              <td>Applications on current framework versions with maintained dependencies and tests that cover the critical paths</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        There is no single right target. A workable rule is to choose the newest version that every part of the
        stack supports today, then confirm your host offers it. For WordPress sites, WordPress itself{' '}
        <Src href={WORDPRESS}>recommends PHP 8.3 or greater</Src>. PHP 8.6 is still a{' '}
        <Src href={ARCHIVE}>release candidate</Src>, so it is not a production target.
      </p>

      <h2>What happens if you don&apos;t upgrade</h2>
      <p>
        A PHP 8.2 server is not automatically vulnerable on January 1, 2027. The risk builds with time, from
        several directions:
      </p>
      <ul>
        <li>
          <strong>No upstream security fixes.</strong> Any vulnerability found in 8.2 after December 31, 2026 will
          not be fixed by the PHP project. The October 21 releases show why that matters: they{' '}
          <Src href={ARCHIVE}>fix two critical vulnerabilities that can allow unauthenticated remote code execution</Src>,
          with a release for each branch from 8.2 to 8.5. After end of life, 8.2 would not get the equivalent.
        </li>
        <li>
          <strong>Packages move on.</strong> Frameworks and libraries raise their minimum PHP version with new
          releases; <Src href={LARAVEL}>Laravel 13 already requires PHP 8.3</Src>. Staying on 8.2 gradually freezes
          your dependencies at old versions too.
        </li>
        <li>
          <strong>Maintenance gets harder.</strong> Fewer hosts, base images and tools carry an unsupported branch,
          and fixes for unrelated problems start to require a newer PHP first.
        </li>
        <li>
          <strong>Technical debt compounds.</strong> Every year of delay adds another release&apos;s changes to the
          eventual upgrade.
        </li>
        <li>
          <strong>Continuity risk.</strong> An upgrade forced by an incident or a host retiring the version is done
          under time pressure, with less testing than a planned one.
        </li>
      </ul>

      <h2>A ten-step migration checklist</h2>
      <ol>
        <li>
          <strong>Identify the actual PHP runtime.</strong> Record the version that serves web requests on every
          server, container, worker and scheduled job, plus staging. Example: the command line on a server reports
          8.3 while the PHP-FPM pool behind the site still runs 8.2, and a cron container uses a third image.
        </li>
        <li>
          <strong>Check vendor patch status.</strong> If a distribution or host supplies your PHP, ask which security
          fixes its current package includes and how long it will patch the branch. Example: a package whose version
          string looks older than the upstream release but contains backported fixes.
        </li>
        <li>
          <strong>Inventory the framework and dependencies.</strong> List the framework version, every Composer
          package or plugin, and every PHP extension installed on the server. Example: a PDF library whose last
          release does not declare support for anything newer than 8.2, or a theme that has not been updated in
          years.
        </li>
        <li>
          <strong>Select a compatible target version.</strong> Use the inventory and the matrix above. Example:
          everything supports 8.4 except one reporting package; either replace that package first or move to 8.3
          now and schedule 8.4.
        </li>
        <li>
          <strong>Prepare backups and a rollback.</strong> Keep a tested database backup, the previous release and
          the previous PHP image or package, and write down the rollback steps. Example: a restore rehearsed on
          staging, with the time it took noted.
        </li>
        <li>
          <strong>Set up staging.</strong> Match production: the target PHP version, the same extensions and
          settings, the same web server, and a recent copy of the data with personal information masked.
        </li>
        <li>
          <strong>Upgrade dependencies.</strong> Move Composer packages, plugins and extensions to releases that
          support the target version, and clear the deprecation notices that appear. Example: an older HTTP client
          library upgraded one major version, with its changed method names updated in the code.
        </li>
        <li>
          <strong>Run application and integration tests.</strong> Cover the paths that earn money or hold data.
          Example: sign-in, checkout and payment callbacks, a CSV import, a scheduled report email and a CRM
          webhook, each run against sandbox accounts on staging.
        </li>
        <li>
          <strong>Deploy in controlled stages.</strong> Move one server, one site or a small share of traffic first,
          in a quiet period, then the rest. Example: queue workers and cron jobs restarted on the new runtime in the
          same step, so no part keeps running the old one.
        </li>
        <li>
          <strong>Monitor errors and performance.</strong> Compare error logs, response times and failed jobs
          against the numbers from before the change. Example: watching through a full business cycle, including
          month-end jobs, before removing the rollback option.
        </li>
      </ol>

      <h2>Laravel applications</h2>
      <p>Laravel publishes the PHP range for each release in its support policy:</p>
      <div className="cp-table-wrap">
        <table>
          <thead><tr><th>Laravel</th><th>Supported PHP</th><th>Security fixes until</th></tr></thead>
          <tbody>
            <tr><td><strong>13</strong></td><td><Src href={LARAVEL}>8.3 to 8.5</Src></td><td><Src href={LARAVEL}>March 17, 2028</Src></td></tr>
            <tr><td><strong>12</strong></td><td><Src href={LARAVEL}>8.2 to 8.5</Src></td><td><Src href={LARAVEL}>February 24, 2027</Src></td></tr>
            <tr><td><strong>11</strong></td><td><Src href={LARAVEL}>8.2 to 8.4</Src></td><td><Src href={LARAVEL}>March 12, 2026</Src> (ended)</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        Patching the PHP runtime and upgrading Laravel are two different jobs. The runtime is the interpreter
        installed on the server or baked into the container image; Laravel is a package in your{' '}
        <code>composer.lock</code>. Running <code>composer update</code> changes packages and leaves the interpreter
        exactly as it was.
      </p>
      <p>
        In practice: a Laravel 12 application on PHP 8.2 can move to 8.3, 8.4 or 8.5 without a framework upgrade.
        A Laravel 11 application can go as far as 8.4, but the framework itself has had no security fixes since
        March 2026, so both need planning. Moving to Laravel 13 requires leaving 8.2 first. The phases for the
        framework side are in our{' '}
        <Link href="/blog/laravel-upgrade-checklist">Laravel upgrade and modernization checklist</Link>.
      </p>

      <h2>WordPress sites</h2>
      <p>
        WordPress <Src href={WORDPRESS}>recommends PHP 8.3 or greater</Src>, and treats PHP 7.4 or later as acceptable
        only in <Src href={WORDPRESS}>legacy environments, which are end of life</Src>. Moving a WordPress site to a newer
        PHP version is normally a compatibility exercise, not a rebuild. Work through it in this order:
      </p>
      <ul>
        <li><strong>Hosting.</strong> Find out which PHP versions your host offers and how it switches them: per site, per account, or only on request.</li>
        <li><strong>Themes and plugins.</strong> Check each one for a current release that supports the target version, and look for plugins that are no longer maintained.</li>
        <li><strong>Custom code.</strong> In-house plugins and child themes get no vendor updates, so they need a code review against the target version.</li>
        <li><strong>Staging.</strong> Switch PHP on a staging copy first.</li>
        <li><strong>Backups.</strong> Back up both files and database, and know how to restore them.</li>
        <li><strong>Regression testing.</strong> Test forms, checkout, member logins, search and anything that sends email.</li>
        <li><strong>Managed hosting.</strong> If a managed host patches or upgrades PHP for you, ask what it does for 8.2 and when it plans to change it.</li>
      </ul>

      <h2>PHP 5 and 7 systems</h2>
      <p>
        Older systems are a separate case. php.net says that{' '}
        <Src href={ARCHIVE}>PHP 8.1 and older no longer receive updates from the PHP project</Src>, so anything on
        PHP 5 or 7 has been outside upstream support for years. What fits depends on the system:
      </p>
      <ul>
        <li><strong>Vendor-supported patching</strong>, where an operating system or extended-support vendor still maintains the branch you run. Confirm exactly what it covers.</li>
        <li><strong>Interim risk reduction:</strong> limit who can reach the application, remove unused entry points, and watch logs and access closely. For what the October 2026 security releases meant for older branches, see our <Link href="/blog/php2shell-php-security-vulnerabilities-2026">guide to the PHP2Shell vulnerabilities</Link>.</li>
        <li><strong>Dependency modernization:</strong> replace abandoned libraries before the PHP version changes, so each step has fewer moving parts.</li>
        <li><strong>Incremental migration:</strong> move one PHP branch at a time with tests at each step, or route parts of the application to new code while the rest keeps running.</li>
        <li><strong>Full modernization</strong>, only where the code cannot be brought forward safely in steps.</li>
      </ul>

      <h2>What drives cost and timeline</h2>
      <p>No two upgrades are the same size. The factors that decide it:</p>
      <ul>
        <li><strong>Codebase size</strong>: how much code has to be checked against the target version.</li>
        <li><strong>Age</strong>: how many PHP branches the code has to cross.</li>
        <li><strong>Tests</strong>: whether there is a suite to catch regressions, or one has to be written first.</li>
        <li><strong>Dependency compatibility</strong>: how many packages, plugins and extensions need upgrades or replacements.</li>
        <li><strong>Database</strong>: driver and extension changes, and the database server version.</li>
        <li><strong>Hosting architecture</strong>: one server, several, containers, or a managed platform with its own PHP schedule.</li>
        <li><strong>Third-party integrations</strong>: payment, CRM and other connections that need sandbox testing.</li>
        <li><strong>Rollback requirements</strong>: how quickly the previous version must be restorable, and with what data.</li>
      </ul>
      <p>
        If you want these assessed for your application, our{' '}
        <Link href="/services/php-upgrade-migration">PHP upgrade and migration service</Link> starts with the
        runtime and compatibility review described above.
      </p>

      <GuideFaq slug={SLUG} items={[
        { question: 'Is PHP 8.2 still supported?', answer: ['Yes, until the end of 2026. It is in security-only support until ', ['December 31, 2026', SUPPORTED], ', and it received ', ['PHP 8.2.35 on October 21, 2026', ARCHIVE], '. It no longer receives ordinary bug fixes.'] },
        { question: 'When does PHP 8.2 reach end of life?', answer: ['After ', ['December 31, 2026', SUPPORTED], ', when its security support ends. From then on the PHP project publishes no further releases for 8.2.'] },
        { question: 'Should we upgrade to PHP 8.4 or 8.5?', answer: ['It depends on what your framework, extensions, packages and host support. PHP 8.4 has security support until ', ['December 31, 2028', SUPPORTED], ' and PHP 8.5 until ', ['December 31, 2029', SUPPORTED], '. 8.5 gives the longest runway but is the newest, so confirm every dependency supports it; if one does not, 8.4 or 8.3 can be the right step for now.'] },
        { question: 'Will my Laravel application break?', answer: ['It should not need to, as long as the target PHP version is inside your Laravel release’s range and your packages support it. ', ['Laravel 11 supports PHP 8.2 to 8.4, Laravel 12 supports 8.2 to 8.5, and Laravel 13 supports 8.3 to 8.5', LARAVEL], '. Deprecations and package constraints are what usually cause failures, which is why the move is tested on staging first.'] },
        { question: 'Will my WordPress plugins work?', answer: ['Check each one. WordPress ', ['recommends PHP 8.3 or greater', WORDPRESS], ', so actively maintained plugins have reason to keep up; plugins that are no longer maintained and custom in-house code are where problems usually appear. Switch PHP on a staging copy first and test the plugins you depend on.'] },
        { question: 'Can a legacy PHP application be upgraded without a rewrite?', answer: ['Usually, yes. Most applications can be moved one PHP branch at a time, with dependencies replaced and tests added along the way. A rewrite is only worth considering for the parts that cannot be brought forward safely.'] },
        { question: 'What if we cannot finish before December 31, 2026?', answer: ['Use verified vendor backports or a managed provider that patches 8.2 for you, and confirm in writing what they cover. Reduce exposure by limiting who can reach the system, keep monitoring and access controls tight, document the remaining risk, and put the upgrade plan first in the queue. None of this replaces running a supported, patched version.'] },
        { question: 'Do managed hosts provide extended patches for PHP 8.2?', answer: ['Some do, but it is vendor-specific: what is covered, for how long and how quickly varies. Ask your host directly which fixes its 8.2 packages will receive after the upstream end date, and when it plans to retire 8.2.'] },
      ]} />

      <p className="cp-note">
        Last reviewed October 28, 2026, against the linked php.net, Laravel and WordPress pages. Support dates
        change only rarely, but vendor and hosting policies do, so confirm them before you plan. This guide
        summarizes published information; it is not an assessment of your system.
      </p>
    </GuideLayout>
  );
}
