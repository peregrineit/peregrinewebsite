import Link from 'next/link';
import GuideLayout, { GuideFaq, Src, guideMetadata } from '../../components/GuideLayout';

const SLUG = 'laravel-upgrade-checklist';
export const metadata = guideMetadata(SLUG);

// Sources fetched and checked 2026-10-10; the sentence relied on for each link is logged in
// docs/growth/content/SOURCES-laravel-upgrade-checklist.md. Versions and dates are as the
// Laravel and PHP pages showed them on that date. Peregrine has no published Laravel case
// study, so this guide makes no claim about Peregrine Laravel projects, clients or results.
const RELEASES = 'https://laravel.com/docs/13.x/releases';
const UP13 = 'https://laravel.com/docs/13.x/upgrade';
const UP12 = 'https://laravel.com/docs/12.x/upgrade';
const UP11 = 'https://laravel.com/docs/11.x/upgrade';
const UP10 = 'https://laravel.com/docs/10.x/upgrade';
const UP9 = 'https://laravel.com/docs/9.x/upgrade';
const UP6 = 'https://laravel.com/docs/6.x/upgrade';
const DATABASE = 'https://laravel.com/docs/13.x/database';
const DEPLOY = 'https://laravel.com/docs/13.x/deployment';
const CONFIG = 'https://laravel.com/docs/13.x/configuration';
const QUEUES = 'https://laravel.com/docs/13.x/queues';
const TESTING = 'https://laravel.com/docs/13.x/testing';
const MIGRATIONS = 'https://laravel.com/docs/13.x/migrations';
const PINT = 'https://laravel.com/docs/13.x/pint';
const PULSE = 'https://laravel.com/docs/13.x/pulse';
const PHP_SUPPORTED = 'https://www.php.net/supported-versions.php';
const PHP_EOL = 'https://www.php.net/eol.php';
const PHP_MIGRATION = 'https://www.php.net/manual/en/migration85.php';
const COMPOSER = 'https://getcomposer.org/doc/03-cli.md';
const RECTOR = 'https://getrector.com/documentation';
const RECTOR_LARAVEL = 'https://github.com/driftingly/rector-laravel';
const PHPSTAN_LEVELS = 'https://phpstan.org/user-guide/rule-levels';
const PHPSTAN_BASELINE = 'https://phpstan.org/user-guide/baseline';
const LARASTAN = 'https://github.com/larastan/larastan';
const FOWLER = 'https://martinfowler.com/bliki/StranglerFigApplication.html';

export default function Guide() {
  return (
    <GuideLayout slug={SLUG}>
      <h2>The short answer</h2>
      <p>
        Laravel&apos;s support policy sets the deadline: for every release,{' '}
        <Src href={RELEASES}>bug fixes are provided for 18 months and security fixes for 2 years</Src>, and{' '}
        <Src href={RELEASES}>major releases arrive every year, around the first quarter</Src>. An application that
        skips two annual upgrades is running a framework that no longer gets security fixes. For most
        applications the answer is an in-place upgrade, one major version at a time, with tests written first.
        Replacing the application in stages or rewriting it is for cases where the code cannot be upgraded safely,
        and the table below says when.
      </p>

      <h2>Where each version stands</h2>
      <p>
        From Laravel&apos;s release table and PHP&apos;s supported-versions page, as shown on October 10, 2026:
      </p>
      <div className="cp-table-wrap">
        <table>
          <thead><tr><th>Laravel</th><th>PHP versions</th><th>Released</th><th>Bug fixes until</th><th>Security fixes until</th></tr></thead>
          <tbody>
            <tr><td><strong>13</strong></td><td>8.3 to 8.5</td><td><Src href={RELEASES}>March 17, 2026</Src></td><td><Src href={RELEASES}>Q3 2027</Src></td><td><Src href={RELEASES}>March 17, 2028</Src></td></tr>
            <tr><td><strong>12</strong></td><td>8.2 to 8.5</td><td><Src href={RELEASES}>February 24, 2025</Src></td><td><Src href={RELEASES}>August 13, 2026</Src> (ended)</td><td><Src href={RELEASES}>February 24, 2027</Src></td></tr>
            <tr><td><strong>11</strong></td><td>8.2 to 8.4</td><td><Src href={RELEASES}>March 12, 2024</Src></td><td><Src href={RELEASES}>September 3, 2025</Src> (ended)</td><td><Src href={RELEASES}>March 12, 2026</Src> (ended)</td></tr>
            <tr><td><strong>10</strong></td><td>8.1 to 8.3</td><td><Src href={RELEASES}>February 14, 2023</Src></td><td><Src href={RELEASES}>August 6, 2024</Src> (ended)</td><td><Src href={RELEASES}>February 4, 2025</Src> (ended)</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        So on that date Laravel 13 is the only release still receiving bug fixes, Laravel 12 receives security
        fixes only, and Laravel 11 and earlier receive nothing.
      </p>
      <div className="cp-table-wrap">
        <table>
          <thead><tr><th>PHP</th><th>Active support until</th><th>Security support until</th></tr></thead>
          <tbody>
            <tr><td><strong>8.5</strong></td><td><Src href={PHP_SUPPORTED}>December 31, 2027</Src></td><td><Src href={PHP_SUPPORTED}>December 31, 2029</Src></td></tr>
            <tr><td><strong>8.4</strong></td><td><Src href={PHP_SUPPORTED}>December 31, 2026</Src></td><td><Src href={PHP_SUPPORTED}>December 31, 2028</Src></td></tr>
            <tr><td><strong>8.3</strong></td><td><Src href={PHP_SUPPORTED}>December 31, 2025</Src> (ended)</td><td><Src href={PHP_SUPPORTED}>December 31, 2027</Src></td></tr>
            <tr><td><strong>8.2</strong></td><td><Src href={PHP_SUPPORTED}>December 31, 2024</Src> (ended)</td><td><Src href={PHP_SUPPORTED}>December 31, 2026</Src></td></tr>
            <tr><td><strong>8.1</strong></td><td colSpan={2}>End of life since <Src href={PHP_EOL}>December 31, 2025</Src></td></tr>
          </tbody>
        </table>
      </div>
      <p>
        PHP&apos;s policy is that each branch is{' '}
        <Src href={PHP_SUPPORTED}>fully supported for two years, then supported for two more years for critical security issues only</Src>.
        The two tables have to be read together: the framework and the language each have their own clock, and
        the application is unsupported as soon as either one runs out.
      </p>
      <p>
        One reading of the first table is worth planning around. PHP 8.3 is the only PHP version inside the
        supported range of Laravel 10, 11, 12 and 13. An application on Laravel 10 can therefore move to PHP 8.3
        first and then take three framework upgrades without touching the PHP version again, which keeps each
        step to one kind of change.
      </p>

      <h2>Upgrade in place, replace in stages, or rewrite</h2>
      <p>
        There are three routes. An <strong>in-place upgrade</strong> keeps the codebase and moves it through each
        major version. <strong>Replacing in stages</strong> is the strangler fig approach Martin Fowler describes
        as <Src href={FOWLER}>a gradual process of modernization</Src>: new code is built{' '}
        <Src href={FOWLER}>on top of, yet separate to the legacy code base</Src>, and behavior moves across piece
        by piece. A <strong>rewrite</strong> builds a replacement and switches over. Fowler&apos;s warning about
        the third is direct: replacement looks simple, but he has{' '}
        <Src href={FOWLER}>seen this simple-sounding plan go down in flames most of the time</Src>.
      </p>
      <div className="cp-table-wrap">
        <table>
          <thead><tr><th>Question</th><th>Upgrade in place</th><th>Replace in stages</th><th>Rewrite</th></tr></thead>
          <tbody>
            <tr>
              <td><strong>Is it a Laravel application today?</strong></td>
              <td>Yes, on any version that has an upgrade guide</td>
              <td>Plain PHP, another framework, or a Laravel version so old that packages block every step</td>
              <td>Either, when the product itself is being redefined</td>
            </tr>
            <tr>
              <td><strong>Does the code follow framework conventions?</strong></td>
              <td>Mostly: routes, controllers, Eloquent, queues, standard packages</td>
              <td>Partly: some areas are conventional, others are not</td>
              <td>No, and the logic is not worth carrying over</td>
            </tr>
            <tr>
              <td><strong>Can you write tests around the critical paths?</strong></td>
              <td>Yes, through HTTP</td>
              <td>Only for some areas; those move first</td>
              <td>No, and nobody can say what correct behavior is</td>
            </tr>
            <tr>
              <td><strong>What blocks the upgrade?</strong></td>
              <td>Version constraints that newer package releases resolve</td>
              <td>Abandoned packages, edits inside <code>vendor</code>, or code that depends on removed framework internals</td>
              <td>The data model itself is wrong for the business</td>
            </tr>
            <tr>
              <td><strong>Can features keep shipping during the work?</strong></td>
              <td>Yes, with short pauses per version step</td>
              <td>Yes; new features are built on the new side</td>
              <td>Only by building them twice, or by freezing the old system</td>
            </tr>
            <tr>
              <td><strong>How do you go back?</strong></td>
              <td>Redeploy the previous release; keep migrations reversible</td>
              <td>Send the route back to the old code</td>
              <td>Only at the switch-over, and only if data has been kept in step</td>
            </tr>
            <tr>
              <td><strong>When is it the wrong choice?</strong></td>
              <td>When each step needs changes in code nobody understands and nothing tests</td>
              <td>When the old and new sides cannot share sessions, authentication or the database cleanly</td>
              <td>When the main reason is that the code is unpleasant to work in</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        If the answers fall mostly in the first column, the rest of this guide is the plan. If they fall in the
        second, the same phases apply to each slice you move. Mixed answers are normal: upgrade the conventional
        core in place and replace the two or three areas that block it.
      </p>

      <h2>Phase 0: inventory</h2>
      <ul className="cp-checklist">
        <li>Record the exact Laravel version from <code>composer.lock</code>, the PHP version in production (not only on a laptop), and the database engine and version.</li>
        <li>Check the database against what the target Laravel supports: <Src href={DATABASE}>MariaDB 10.3+, MySQL 5.7+, PostgreSQL 10.0+, SQLite 3.26.0+ and SQL Server 2017+</Src> for Laravel 13.</li>
        <li>Run <code>composer outdated</code>, which <Src href={COMPOSER}>shows a list of installed packages that have updates available</Src>.</li>
        <li>Run <code>composer audit</code>, which <Src href={COMPOSER}>lists security vulnerability advisories and detects abandoned packages</Src>. Every abandoned package needs a named replacement before you start.</li>
        <li>For the target version, run <code>composer why-not laravel/framework</code> with that version. The command <Src href={COMPOSER}>tells you which packages are blocking a given package from being installed</Src>; its output is your list of blockers.</li>
        <li>Search for edits inside <code>vendor</code>, forked packages and classes that extend framework internals. These are what turn a short upgrade into a long one.</li>
        <li>List everything that runs outside a web request: queue workers, scheduled tasks, cron entries that bypass the scheduler, and long-running services.</li>
        <li>Note the test count and what the tests cover. Zero is an answer; write it down.</li>
      </ul>

      <h2>Phase 1: build the safety net</h2>
      <ul className="cp-checklist">
        <li>Write feature tests for the paths that earn or move money, sign users in, and change permissions. Laravel&apos;s own advice is that <Src href={TESTING}>most of your tests should be feature tests</Src>, because they exercise a full request.</li>
        <li>Run the tests in CI on every push, on the PHP version production uses.</li>
        <li>Add static analysis at a level the code passes today. PHPStan has <Src href={PHPSTAN_LEVELS}>11 levels, 0 the loosest and 10 the strictest</Src>, and a <Src href={PHPSTAN_BASELINE}>baseline that records current errors so only new and changed code is reported</Src>. <Src href={LARASTAN}>Larastan is the PHPStan extension for Laravel</Src>.</li>
        <li>Fix code style once, in its own commit, so later diffs show only real changes. <Src href={PINT}>Laravel Pint is built on PHP CS Fixer</Src> and has a <Src href={PINT}>--test option that reports style errors without changing files</Src>.</li>
        <li>Stand up a staging environment with the same PHP, database and queue driver as production, and a recent copy of production data with personal data masked.</li>
        <li>Confirm you can restore a database backup, by doing it.</li>
        <li>Turn on error tracking and a baseline of response times before the first change, so you can tell what the upgrade altered.</li>
      </ul>

      <h2>Phase 2: move PHP first</h2>
      <ul className="cp-checklist">
        <li>Pick the highest PHP version your current Laravel supports, from the first table, and move to it before changing the framework.</li>
        <li>Read the PHP migration guide for each version you cross. Each has a section on <Src href={PHP_MIGRATION}>backward incompatible changes and deprecated features</Src>.</li>
        <li>Run the test suite with deprecation notices visible and clear them; a deprecation in one PHP version is often a removal in a later one.</li>
        <li>Use Rector for mechanical changes. It describes itself as <Src href={RECTOR}>fast, deterministic PHP code upgrades and automated refactoring</Src>. Review its diff like any other pull request.</li>
        <li>Deploy the PHP change on its own and let it run in production before the first framework step.</li>
      </ul>

      <h2>Phase 3: one major version at a time</h2>
      <p>
        Laravel publishes one upgrade guide per major version, each written from the version before it: the
        Laravel 6 guide is titled <Src href={UP6}>Upgrading To 6.0 From 5.8</Src> and the current one{' '}
        <Src href={UP13}>Upgrading To 13.0 From 12.x</Src>. Each guide sorts its changes by likelihood of impact.
        Do not skip a guide; an application three versions behind has three guides to work through.
      </p>
      <p>For every step:</p>
      <ul className="cp-checklist">
        <li>Read the whole guide for that version and mark the items that touch code you use.</li>
        <li>Update <code>laravel/framework</code> and the packages the guide lists, then resolve what <code>composer why-not</code> reports.</li>
        <li>Apply the high-impact changes, then the medium ones, then search the code for each low-impact item.</li>
        <li>Optionally run the community <Src href={RECTOR_LARAVEL}>Rector rules for Laravel</Src> for that version.</li>
        <li>Run tests and static analysis; fix; repeat until clean.</li>
        <li>Deploy to staging, run the non-web jobs from your inventory by hand, then release.</li>
        <li>Let the release run in production before starting the next step.</li>
      </ul>
      <p>What Laravel&apos;s own guides flag for the last four steps:</p>
      <div className="cp-table-wrap">
        <table>
          <thead><tr><th>Step</th><th>Minimum PHP</th><th>Laravel&apos;s estimate</th><th>Check these first</th></tr></thead>
          <tbody>
            <tr>
              <td><strong>9 to 10</strong></td>
              <td><Src href={UP10}>8.1.0</Src></td>
              <td><Src href={UP10}>10 minutes</Src></td>
              <td><Src href={UP10}>Composer 2.2.0 or greater is required</Src>; set <Src href={UP10}>minimum-stability to stable</Src></td>
            </tr>
            <tr>
              <td><strong>10 to 11</strong></td>
              <td><Src href={UP11}>8.2.0</Src></td>
              <td><Src href={UP11}>15 minutes</Src></td>
              <td>When modifying a column you must now <Src href={UP11}>explicitly include all the modifiers you want to keep</Src>; Cashier, Passport, Sanctum and Telescope <Src href={UP11}>no longer load their own migrations</Src>; <Src href={UP11}>SQLite 3.26.0 or greater</Src>. Laravel says it does <Src href={UP11}>not recommend migrating to the new application structure</Src> during this upgrade</td>
            </tr>
            <tr>
              <td><strong>11 to 12</strong></td>
              <td>8.2 (per the release table)</td>
              <td><Src href={UP12}>5 minutes</Src></td>
              <td><Src href={UP12}>Support for Carbon 2.x has been removed</Src>; the <Src href={UP12}>HasUuids trait now returns version 7 UUIDs</Src></td>
            </tr>
            <tr>
              <td><strong>12 to 13</strong></td>
              <td><Src href={RELEASES}>8.3</Src></td>
              <td><Src href={UP13}>10 minutes</Src></td>
              <td>The CSRF middleware is <Src href={UP13}>renamed to PreventRequestForgery and now verifies request origin</Src>; the cache config gains <Src href={UP13}>a serializable_classes option set to false</Src>; copying the new session config <Src href={UP13}>will invalidate all active user sessions</Src> if serialization changes to JSON; <Src href={UP13}>PHPUnit ^12.0 and Pest ^4.0</Src></td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Read those estimates for what they are. Laravel says it{' '}
        <Src href={RELEASES}>strives to ensure you may update to a new major release in one day or less</Src>, and
        the minutes cover the framework&apos;s own breaking changes. They do not include third-party packages
        that have not released a compatible version, code that leans on undocumented behavior, or the time to
        test. The inventory in Phase 0 is what tells you how far your application is from the estimate.
      </p>
      <p>
        Two automation options are named in the Laravel 13 guide: Shift, which it calls{' '}
        <Src href={UP13}>a community-maintained service that automates Laravel upgrades</Src>, and Laravel Boost,{' '}
        <Src href={UP13}>a first-party MCP server that provides an AI assistant with guided upgrade prompts</Src>.
        Either can produce the first diff. Neither replaces the tests that tell you whether the diff is right.
      </p>

      <h2>Phase 4: deploy and verify</h2>
      <ul className="cp-checklist">
        <li>Use maintenance mode only if a migration needs it; <code>php artisan down</code> <Src href={CONFIG}>shows a custom view for all requests</Src> while it is on.</li>
        <li>Rebuild caches as part of the deploy: <Src href={DEPLOY}>the optimize command caches configuration, events, routes and views</Src>.</li>
        <li>Restart workers. <Src href={QUEUES}>Queue workers are long-lived processes and will not notice changes in your code base</Src>; the deployment guide&apos;s <Src href={DEPLOY}>reload command terminates queue workers, Reverb and Octane</Src> so they start on the new code.</li>
        <li>Drain or version queued jobs whose payload shape changed, so a job serialized by the old release is not run by the new one unprepared.</li>
        <li>Confirm <code>APP_DEBUG</code> is false: Laravel warns that with it on in production <Src href={DEPLOY}>you risk exposing sensitive configuration values</Src>.</li>
        <li>Point your uptime monitor at the health route, which is <Src href={DEPLOY}>served at /up and returns 200 if the application has booted without exceptions</Src>.</li>
        <li>Watch error rate, slow requests and failed jobs against the baseline from Phase 1. <Src href={PULSE}>Laravel Pulse tracks slow jobs and endpoints</Src> if you have no other tool.</li>
        <li>Keep the previous release and a database backup ready until the new one has run through a full business cycle, including scheduled jobs.</li>
      </ul>

      <h2>Phase 5: modernize after you are current</h2>
      <p>
        Upgrading gets you onto a supported version. Modernizing is what makes the next upgrade short. Do it
        after, as separate changes:
      </p>
      <ul className="cp-checklist">
        <li>Replace each abandoned or forked package with a maintained one or with framework features that have since been added.</li>
        <li>Raise the static-analysis level one step at a time and shrink the baseline.</li>
        <li>Move logic out of controllers and closures into classes that can be tested without a request.</li>
        <li>Squash old migrations: <Src href={MIGRATIONS}>schema:dump writes them into a single SQL file</Src>.</li>
        <li>Move loose cron entries into the scheduler so the schedule is in source control.</li>
        <li>Decide deliberately whether to adopt the newer application structure; it is optional, and Laravel 11 was <Src href={UP11}>tuned to also support the Laravel 10 application structure</Src>.</li>
        <li>Put the next upgrade on the calendar. With a major release each year and security fixes for two, one upgrade a year keeps an application inside support.</li>
      </ul>

      <h2>If the application is plain PHP or very old</h2>
      <p>
        Here the staged route usually fits. Put a new Laravel application in front of the same domain, send it the
        routes it implements and pass everything else to the old code. Fowler&apos;s article lists what an incremental
        replacement needs, starting with{' '}
        <Src href={FOWLER}>understanding the outcomes you want to achieve and deciding how to break the problem up into smaller parts</Src>.
        In practice the first decisions are technical: how the two sides share a login session, which side owns
        each database table, and how a route is switched back if the new version misbehaves. Move a read-only area
        first, then one with writes, and retire old code as each route leaves it. The checklist above then applies
        to the new side from its first day.
      </p>
      <p>
        Older Laravel versions also need older PHP steps on the way: the Laravel 9 guide, for example, required{' '}
        <Src href={UP9}>PHP 8.0.2 or greater</Src> and estimated <Src href={UP9}>30 minutes</Src>, with Flysystem
        3 and Symfony Mailer as its high-impact changes. Count the hops in Phase 0 before choosing between an
        in-place upgrade and a staged replacement.
      </p>

      <GuideFaq slug={SLUG} items={[
        { question: 'How long is a Laravel version supported?', answer: ['For all Laravel releases, ', ['bug fixes are provided for 18 months and security fixes for 2 years', RELEASES], '. Laravel 13, released ', ['March 17, 2026', RELEASES], ', has security fixes until ', ['March 17, 2028', RELEASES], '.'] },
        { question: 'Is Laravel 11 still supported?', answer: ['No. Laravel’s release table lists security fixes for Laravel 11 until ', ['March 12, 2026', RELEASES], '. Laravel 12 has security fixes until ', ['February 24, 2027', RELEASES], ', and its bug fixes ended on ', ['August 13, 2026', RELEASES], '.'] },
        { question: 'Can we skip Laravel versions when upgrading?', answer: ['The official guides are written one step at a time, for example ', ['Upgrading To 13.0 From 12.x', UP13], ', so every skipped version’s guide still has to be applied. Working through them in order, with a deploy after each, keeps any failure traceable to one step.'] },
        { question: 'Which PHP version should a Laravel application run?', answer: ['One that both Laravel and PHP still support. Laravel 13 requires ', ['a minimum PHP version of 8.3', RELEASES], ' and supports up to 8.5. PHP 8.4 has active support until ', ['December 31, 2026', PHP_SUPPORTED], ' and PHP 8.5 until ', ['December 31, 2027', PHP_SUPPORTED], '.'] },
        { question: 'Should we upgrade or rewrite an old Laravel application?', answer: ['Upgrade in place when the code follows framework conventions and you can put tests around the critical paths. Replace it in stages when abandoned packages or modified framework code block the steps. A full rewrite is the riskiest route; Martin Fowler writes that he has ', ['seen this simple-sounding plan go down in flames most of the time', FOWLER], '.'] },
      ]} />

      <p className="cp-note">
        Versions, dates and support windows were read from the linked Laravel, PHP, Composer, PHPStan, Rector and
        Larastan pages on October 10, 2026. Both support tables change with every release, so check them again
        before you plan. This guide is drawn from that documentation; Peregrine has not
        published a Laravel case study, and nothing here describes a client project.
      </p>
      <p>
        Need a second opinion on an upgrade plan? See our{' '}
        <Link href="/services/laravel-development">Laravel development service</Link>, or read how we approach{' '}
        <Link href="/services/api-integration">API integration</Link> when the upgrade also touches third-party
        systems. Engagements are fixed-scope projects, monthly retainers, or a combination, agreed after a
        30-minute technical discovery call.
      </p>
    </GuideLayout>
  );
}
