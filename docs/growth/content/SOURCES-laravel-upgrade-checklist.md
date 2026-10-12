# Source verification log: /blog/laravel-upgrade-checklist

Every URL below was fetched on **2026-10-10** (HTTP 200) and the quoted text was read on the page that day. Quotes are verbatim. `https://laravel.com/docs/releases` and `https://laravel.com/docs/13.x/releases` returned the same table; the guide links the versioned URL.

## Laravel

| URL | Text relied on |
|---|---|
| https://laravel.com/docs/13.x/releases | "Major framework releases are released every year (~Q1)" · "we strive to always ensure you may update to a new major release in one day or less" · "For all Laravel releases, bug fixes are provided for 18 months and security fixes are provided for 2 years." · Table rows: "10 · 8.1 - 8.3 · February 14th, 2023 · August 6th, 2024 · February 4th, 2025"; "11 · 8.2 - 8.4 · March 12th, 2024 · September 3rd, 2025 · March 12th, 2026"; "12 · 8.2 - 8.5 · February 24th, 2025 · August 13th, 2026 · February 24th, 2027"; "13 · 8.3 - 8.5 · March 17th, 2026 · Q3 2027 · March 17th, 2028" · "Laravel 13.x requires a minimum PHP version of 8.3." |
| https://laravel.com/docs/13.x/upgrade | "Upgrading To 13.0 From 12.x" · "Estimated Upgrade Time: 10 Minutes" · "Shift is a community-maintained service that automates Laravel upgrades." · "Boost is a first-party MCP server that provides your AI assistant with guided upgrade prompts" · dependencies "phpunit/phpunit to ^12.0", "pestphp/pest to ^4.0" · "Laravel's CSRF middleware has been renamed from VerifyCsrfToken to PreventRequestForgery, and now includes request-origin verification using the Sec-Fetch-Site header." · "The default application cache configuration now includes a serializable_classes option set to false." · "updating this value from php to json will invalidate all active user sessions" |
| https://laravel.com/docs/12.x/upgrade | "Upgrading To 12.0 From 11.x" · "Estimated Upgrade Time: 5 Minutes" · "Support for Carbon 2.x has been removed." · "The HasUuids trait now returns UUIDs that are compatible with version 7 of the UUID spec (ordered UUIDs)." |
| https://laravel.com/docs/11.x/upgrade | "Upgrading To 11.0 From 10.x" · "Estimated Upgrade Time: 15 Minutes" · "Laravel now requires PHP 8.2.0 or greater." · "we do not recommend that Laravel 10 applications upgrading to Laravel 11 attempt to migrate their application structure, as Laravel 11 has been carefully tuned to also support the Laravel 10 application structure" · "When modifying a column, you must now explicitly include all the modifiers you want to keep on the column definition after it is changed." · "Cashier Stripe, Passport, Sanctum, Spark Stripe, and Telescope no longer automatically load migrations from their own migrations directory." · "SQLite 3.26.0 or greater is required" |
| https://laravel.com/docs/10.x/upgrade | "Upgrading to 10.0 from 9.x" · "Estimated Upgrade Time: 10 Minutes" · "Laravel now requires PHP 8.1.0 or greater." · "Laravel now requires Composer 2.2.0 or greater." · "You should update the minimum-stability setting in your application's composer.json file to stable." |
| https://laravel.com/docs/9.x/upgrade | "Upgrading To 9.0 From 8.x" · "Estimated Upgrade Time: 30 Minutes" · "Laravel now requires PHP 8.0.2 or greater." · High impact changes list: "Updating Dependencies · Flysystem 3.x · Symfony Mailer" |
| https://laravel.com/docs/6.x/upgrade | "Upgrading To 6.0 From 5.8" |
| https://laravel.com/docs/13.x/database | "MariaDB 10.3+ · MySQL 5.7+ · PostgreSQL 10.0+ · SQLite 3.26.0+ · SQL Server 2017+" |
| https://laravel.com/docs/13.x/testing | "Generally, most of your tests should be feature tests. These types of tests provide the most confidence that your system as a whole is functioning as intended." |
| https://laravel.com/docs/13.x/pint | "Pint is built on top of PHP CS Fixer" · "If you would like Pint to simply inspect your code for style errors without actually changing the files, you may use the --test option." |
| https://laravel.com/docs/13.x/configuration | "When your application is in maintenance mode, a custom view will be displayed for all requests into your application." · "To enable maintenance mode, execute the down Artisan command" |
| https://laravel.com/docs/13.x/deployment | "Laravel provides a single, convenient optimize Artisan command that will cache all of these files" (configuration, events, routes, views) · "any long-running services such as queue workers, Laravel Reverb, or Laravel Octane should be reloaded / restarted to use the new code. Laravel provides a single reload Artisan command that will terminate these services" · "If the APP_DEBUG variable is set to true in production, you risk exposing sensitive configuration values to your application's end users." · "By default, the health check route is served at /up and will return a 200 HTTP response if the application has booted without exceptions." |
| https://laravel.com/docs/13.x/queues | "queue workers are long-lived processes and store the booted application state in memory. As a result, they will not notice changes in your code base after they have been started." |
| https://laravel.com/docs/13.x/migrations | "you may \"squash\" your migrations into a single SQL file. To get started, execute the schema:dump command" |
| https://laravel.com/docs/13.x/pulse | "With Pulse, you can track down bottlenecks like slow jobs and endpoints, find your most active users, and more." |

## PHP

| URL | Text relied on |
|---|---|
| https://www.php.net/supported-versions.php | "Each release branch of PHP is fully supported for two years from its initial stable release. ... each branch is then supported for two additional years for critical security issues only." · Table (page showed "Today: 9 Oct 2026"): 8.2 active until 31 Dec 2024, security until 31 Dec 2026; 8.3 active until 31 Dec 2025, security until 31 Dec 2027; 8.4 active until 31 Dec 2026, security until 31 Dec 2028; 8.5 active until 31 Dec 2027, security until 31 Dec 2029 |
| https://www.php.net/eol.php | "8.1 · 31 Dec 2025 · 8.1.34" |
| https://www.php.net/manual/en/migration85.php | Section titles "Backward Incompatible Changes" and "Deprecated Features" |

## Tooling

| URL | Text relied on |
|---|---|
| https://getcomposer.org/doc/03-cli.md | "The outdated command shows a list of installed packages that have updates available" · "The prohibits command tells you which packages are blocking a given package from being installed." (heading "prohibits / why-not") · audit: "It checks for and lists security vulnerability advisories ... The command also detects abandoned packages and packages flagged as malware" |
| https://getrector.com/documentation | "Fast, deterministic PHP code upgrades and automated refactoring" |
| https://github.com/driftingly/rector-laravel | "Rector upgrades rules for Laravel" · "This package is a Rector extension developed by the Laravel community." |
| https://phpstan.org/user-guide/rule-levels | "you can currently choose from 11 levels (0 is the loosest and 10 is the strictest)" |
| https://phpstan.org/user-guide/baseline | "PHPStan allows you to declare the currently reported list of errors as \"the baseline\" and cause it not being reported in subsequent runs. It allows you to be interested in violations only in new and changed code." |
| https://github.com/larastan/larastan | "is a PHPStan extension for Laravel" |
| https://martinfowler.com/bliki/StranglerFigApplication.html | "we've seen this simple-sounding plan go down in flames most of the time" · "The alternative that my colleagues and I prefer, is to do a gradual process of modernization. ... built on top of, yet separate to the legacy code base." · "Understand the outcomes you want to achieve · Decide how to break the problem up into smaller parts" (attributed on the page to Ian Cartwright, Rob Horn and James Lewis) |

## Derived statements (computed from the tables above, not quoted)

- "PHP 8.3 is the only PHP version inside the supported range of Laravel 10, 11, 12 and 13": intersection of 8.1-8.3, 8.2-8.4, 8.2-8.5 and 8.3-8.5.
- "Laravel 13 is the only release still receiving bug fixes; Laravel 12 security fixes only; Laravel 11 and earlier nothing": release table compared with 2026-10-10.
- "An application that skips two annual upgrades no longer gets security fixes": yearly majors plus the 2-year security window.
- "Laravel 12 minimum PHP 8.2": from the release table's "8.2 - 8.5"; the 12.x upgrade guide does not state a PHP requirement.

## Left out because it was not verified

- Any duration for a real upgrade project: only Laravel's own per-guide estimates are quoted, labeled as Laravel's.
- Laravel Shift's own pricing and feature claims: Shift is described only in the words of Laravel's upgrade guide.
- PHP's release cadence ("a new version every year"): not stated on the pages read, so not asserted.
- Upgrade guides for 7.x and 8.x were not read in detail and are not quoted.

## Statements about Peregrine and where they come from

- "Peregrine has not published a Laravel case study, and nothing here describes a client project": `src/data/technology-services.ts` (laravel-development: "We have not published a Laravel case study yet") and `src/data/guides.ts` (no `caseStudy`).
- "Engagements are fixed-scope projects, monthly retainers, or a combination, agreed after a 30-minute technical discovery call": `public/llms.txt`, "How engagements start".
- The guide makes no claim of Laravel projects, clients, results, prices or timelines.
