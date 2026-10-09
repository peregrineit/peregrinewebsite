#!/usr/bin/env python3
"""External source-link checker for the guides, tools, service and industry pages. Stdlib only.

    SERVE_PORT=3080 scripts/serve-local.sh
    python3 scripts/check_sources.py http://localhost:3080 \\
        --out-md docs/growth/systems/reports/source-links-YYYY-MM-DD.md \\
        --out-json docs/growth/systems/reports/source-links-YYYY-MM-DD.json

Reads <base>/sitemap.xml, opens every page under /blog/, /tools/, /services/ and /industries/,
collects each external <a href>, and requests each distinct URL once.

Polite by construction: at most 4 requests in flight, at least 1 second between requests to the
same host, 15 second timeout, HEAD first with a GET fallback (GET reads at most 64 KB), at most
one retry, a browser-like User-Agent. It only reads; it never edits the site.

Each link is classified as one of:
  ok                 2xx, no redirect
  redirected         2xx after one or more redirects (the report says where to, and whether the
                     address merely changed form or the page moved)
  client-error       4xx other than 401/403/429  (the source is gone or the URL is wrong)
  server-error       5xx
  blocked-or-login   401/403/429/999, or a redirect to a sign-in page: cannot be checked by a
                     script; open it in a browser
  timeout            no answer within the timeout, twice
  connection-error   DNS, TLS or connection failure

Exit codes: 0 no broken link; 1 at least one client-error, server-error, timeout or
connection-error; 2 the site itself could not be crawled or bad arguments.
"""
import argparse, datetime as dt, html, http.client, json, re, socket, ssl, sys, threading, time
import urllib.error, urllib.parse, urllib.request
from concurrent.futures import ThreadPoolExecutor

PROD_HOSTS = {"peregrine-it.com", "www.peregrine-it.com"}
SECTIONS = ("/blog/", "/tools/", "/services/", "/industries/")
UA = ("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) "
      "Chrome/126.0.0.0 Safari/537.36")
HEADERS = {"User-Agent": UA, "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8", "Accept-Language": "en-US,en;q=0.9"}
MAX_WORKERS, HOST_INTERVAL, TIMEOUT, MAX_HOPS, MAX_BYTES = 4, 1.0, 15.0, 8, 65536
LOGIN = re.compile(r"(^|[/._-])(log-?in|sign-?in|signin|sso|oauth|authorize|auth|accounts?/login|session/new)([/?._-]|$)", re.I)
LOGIN_HOSTS = {"login", "signin", "sso", "auth", "accounts", "id", "identity"}
BROKEN = ("client-error", "server-error", "timeout", "connection-error")
ORDER = ("client-error", "server-error", "connection-error", "timeout", "blocked-or-login", "redirected", "ok")


class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, *a, **k): return None


class Throttle:
    """At least `interval` seconds between two requests to one host, across threads."""
    def __init__(self, interval):
        self.interval, self.lock, self.next_at = interval, threading.Lock(), {}
    def wait(self, host):
        with self.lock:
            now = time.monotonic(); at = max(now, self.next_at.get(host, 0.0)); self.next_at[host] = at + self.interval
        if at > now: time.sleep(at - now)


class Checker:
    def __init__(self, interval=HOST_INTERVAL, timeout=TIMEOUT):
        self.throttle, self.timeout = Throttle(interval), timeout
        self.opener = urllib.request.build_opener(NoRedirect, urllib.request.HTTPSHandler(context=ssl.create_default_context()))
        self.requests = 0; self.count_lock = threading.Lock()

    def once(self, url, method):
        """One request, no redirect following. Returns (status, location or None)."""
        host = urllib.parse.urlsplit(url).hostname or ""
        self.throttle.wait(host)
        with self.count_lock: self.requests += 1
        req = urllib.request.Request(url, method=method, headers=HEADERS)
        try:
            with self.opener.open(req, timeout=self.timeout) as r:
                if method == "GET": r.read(MAX_BYTES)
                return r.status, None
        except urllib.error.HTTPError as e:
            loc = e.headers.get("Location") if e.headers else None
            try: e.close()
            except Exception: pass
            return e.code, loc

    def follow(self, url, method):
        """Follow redirects by hand so the chain is recorded. Returns (status, final url, chain)."""
        chain, current = [], url
        for _ in range(MAX_HOPS):
            status, loc = self.once(current, method)
            if status in (301, 302, 303, 307, 308) and loc:
                nxt = urllib.parse.urljoin(current, loc)
                chain.append({"status": status, "from": current, "to": nxt}); current = nxt; continue
            return status, current, chain
        return 310, current, chain   # too many redirects

    def attempt(self, url):
        status, final, chain = self.follow(url, "HEAD")
        method = "HEAD"
        # Many servers answer HEAD badly (403, 404, 405, 5xx) and GET correctly.
        if status >= 400 or status == 310:
            method = "GET"; status, final, chain = self.follow(url, "GET")
        return status, final, chain, method

    def check(self, url):
        target = urllib.parse.urldefrag(url)[0]
        result = {"url": url, "status": None, "final_url": None, "redirects": [], "method": None, "attempts": 0, "error": None}
        for attempt in (1, 2):                      # at most one retry
            result["attempts"] = attempt
            try:
                status, final, chain, method = self.attempt(target)
                result.update(status=status, final_url=final, redirects=chain, method=method, error=None)
                if status < 500: break              # retry only server errors and failures
            except (socket.timeout, TimeoutError) as e:
                result.update(status=None, error=f"timeout after {self.timeout:g}s")
            except urllib.error.URLError as e:
                reason = e.reason
                if isinstance(reason, (socket.timeout, TimeoutError)) or "timed out" in str(reason): result.update(status=None, error=f"timeout after {self.timeout:g}s")
                else: result.update(status=None, error=f"{type(reason).__name__}: {reason}"[:200])
            except (http.client.HTTPException, ConnectionError, ssl.SSLError, OSError, ValueError) as e:
                result.update(status=None, error=("timeout after %gs" % self.timeout) if "timed out" in str(e) else f"{type(e).__name__}: {e}"[:200])
        result["class"], result["note"] = classify(target, result)
        return result


def _norm(u):
    s = urllib.parse.urlsplit(u)
    host = (s.hostname or "").lower(); host = host[4:] if host.startswith("www.") else host
    return host, s.path.rstrip("/").lower(), s.query


def classify(url, r):
    if r["error"]:
        return ("timeout", r["error"]) if r["error"].startswith("timeout") else ("connection-error", r["error"])
    status, final = r["status"], r["final_url"] or url
    fs = urllib.parse.urlsplit(final)
    if r["redirects"] and (LOGIN.search(fs.path) or (fs.hostname or "").split(".")[0] in LOGIN_HOSTS):
        return "blocked-or-login", f"redirects to a sign-in page: {final}"
    if status in (401, 403, 429, 999): return "blocked-or-login", f"HTTP {status}: the site refuses automated requests; check in a browser"
    if status == 310: return "client-error", f"more than {MAX_HOPS} redirects"
    if 200 <= status < 300:
        if not r["redirects"]: return "ok", ""
        if _norm(url) == _norm(final): return "redirected", f"same page, address form changed (scheme, www or trailing slash): {final}"
        return "redirected", f"moved to {final}"
    if 300 <= status < 400: return "redirected", f"HTTP {status} without a usable Location"
    if 400 <= status < 500: return "client-error", f"HTTP {status}"
    return "server-error", f"HTTP {status}"


# ---- crawl ----------------------------------------------------------------------------------
def fetch_text(url, timeout=30):
    req = urllib.request.Request(url, headers={"User-Agent": "peregrine-source-check"})
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return r.read().decode("utf-8", "replace")


def text_of(fragment):
    return " ".join(html.unescape(re.sub(r"<[^>]+>", " ", fragment)).split())


def sitemap_paths(base):
    xml = fetch_text(base + "/sitemap.xml")
    out = []
    for loc in re.findall(r"<loc>([^<]+)</loc>", xml):
        s = urllib.parse.urlsplit(html.unescape(loc.strip())); out.append(s.path.rstrip("/") or "/")
    return out


def external_links(page_html, internal_hosts):
    """[(url, anchor text, is_source_citation)] for every external http(s) link in the page body."""
    body = re.sub(r"<(script|style)\b[^>]*>.*?</\1>", "", page_html, flags=re.S)
    out = []
    for m in re.finditer(r"<a\b([^>]*)>(.*?)</a>", body, re.S):
        href = re.search(r'href="([^"]+)"', m.group(1))
        if not href: continue
        url = html.unescape(href.group(1)).strip()
        s = urllib.parse.urlsplit(url)
        if s.scheme not in ("http", "https") or not s.hostname or s.hostname.lower() in internal_hosts: continue
        out.append((url, text_of(m.group(2))[:80], "cp-src" in m.group(1)))
    return out


def crawl(base, sections=SECTIONS):
    base_host = urllib.parse.urlsplit(base).hostname
    internal = PROD_HOSTS | {base_host}
    paths = [p for p in sitemap_paths(base) if any(p.startswith(s) for s in sections)]
    def one(p):
        try: return p, external_links(fetch_text(base + p), internal), None
        except Exception as e: return p, [], f"{type(e).__name__}: {e}"
    with ThreadPoolExecutor(6) as ex: pages = list(ex.map(one, paths))
    links, errors = {}, []
    for p, found, err in pages:
        if err: errors.append((p, err))
        for url, anchor, is_src in found:
            d = links.setdefault(url, {"pages": [], "anchors": [], "source_citation": False})
            if p not in d["pages"]: d["pages"].append(p)
            if anchor and anchor not in d["anchors"]: d["anchors"].append(anchor)
            d["source_citation"] = d["source_citation"] or is_src
    return paths, links, errors


# ---- report ---------------------------------------------------------------------------------
def md_escape(s): return str(s).replace("|", "\\|")
def pages_cell(pages):
    shown = ", ".join(f"`{p}`" for p in pages[:3])
    return shown + (f" and {len(pages) - 3} more" if len(pages) > 3 else "")


def markdown(base, paths, results, crawl_errors, started, elapsed, requests, today):
    counts = {c: sum(1 for r in results if r["class"] == c) for c in ORDER}
    n_pages = len(paths); chrome_at = max(2, int(n_pages * 0.8))
    L = [f"# External source links: {today}", "",
         f"Generated by `scripts/check_sources.py {base}` on {today} (started {started}, {elapsed:.0f} s, {requests} requests). "
         f"{len(results)} distinct external links on {n_pages} pages under {', '.join(SECTIONS)}.", "",
         "A script cannot read a page: `ok` means the address answers, not that the page still says what the guide quotes. "
         "Re-read a source before changing a guide's `dateModified` (CLAUDE.md).", "",
         "| Class | Links | Meaning |", "|---|---|---|"]
    meaning = {"ok": "answers 2xx, no redirect", "redirected": "answers after a redirect; update the link if the page moved",
               "client-error": "4xx: the page is gone or the URL is wrong", "server-error": "5xx after one retry",
               "blocked-or-login": "401/403/429 or a sign-in redirect: check in a browser", "timeout": "no answer in 15 s, twice",
               "connection-error": "DNS, TLS or connection failure"}
    for c in ORDER: L.append(f"| {c} | {counts[c]} | {meaning[c]} |")
    L += ["", f"**Broken (needs a fix or a manual check): {sum(counts[c] for c in BROKEN)}.** "
              f"**Moved: {sum(1 for r in results if r['class'] == 'redirected' and r['note'].startswith('moved'))}.** "
              f"**Could not be checked automatically: {counts['blocked-or-login']}.**", ""]
    if crawl_errors:
        L += ["## Pages that could not be read", ""] + [f"- `{p}`: {e}" for p, e in crawl_errors] + [""]

    def section(title, rows, intro, head, fmt):
        L.append(f"## {title} ({len(rows)})"); L.append("")
        if not rows: L.append("None."); L.append(""); return
        L.append(intro); L.append("")
        L.append("| " + " | ".join(head) + " |"); L.append("|" + "---|" * len(head))
        for r in rows: L.append("| " + " | ".join(md_escape(c) for c in fmt(r)) + " |")
        L.append("")
    kind = lambda r: "source" if r["source_citation"] else ("site-wide" if len(r["pages"]) >= chrome_at else "link")
    broken = [r for r in results if r["class"] in BROKEN]
    section("Broken", sorted(broken, key=lambda r: (ORDER.index(r["class"]), r["url"])),
            "Open each in a browser first: a few sites answer scripts with an error and people with a page.",
            ["Link", "Result", "Kind", "Found on"], lambda r: [r["url"], f"{r['class']}: {r['note']}", kind(r), pages_cell(r["pages"])])
    moved = [r for r in results if r["class"] == "redirected" and r["note"].startswith("moved")]
    section("Redirected: the page moved", sorted(moved, key=lambda r: r["url"]),
            "The old address still works through a redirect. Confirm the new page carries the quoted fact, then update the link.",
            ["Link", "Now at", "Hops", "Kind", "Found on"],
            lambda r: [r["url"], r["final_url"], " → ".join(str(h["status"]) for h in r["redirects"]), kind(r), pages_cell(r["pages"])])
    form = [r for r in results if r["class"] == "redirected" and not r["note"].startswith("moved")]
    section("Redirected: same page, different address form", sorted(form, key=lambda r: r["url"]),
            "Scheme, `www` or trailing-slash changes only. Low priority; tidy when the guide is next edited.",
            ["Link", "Now at", "Found on"], lambda r: [r["url"], r["final_url"] or r["note"], pages_cell(r["pages"])])
    blocked = [r for r in results if r["class"] == "blocked-or-login"]
    section("Blocked or behind a sign-in", sorted(blocked, key=lambda r: r["url"]),
            "The site refused an automated request. This says nothing about whether the page exists; check by hand.",
            ["Link", "Result", "Kind", "Found on"], lambda r: [r["url"], r["note"], kind(r), pages_cell(r["pages"])])
    ok = [r for r in results if r["class"] == "ok"]
    hosts = {}
    for r in ok: hosts[urllib.parse.urlsplit(r["url"]).hostname] = hosts.get(urllib.parse.urlsplit(r["url"]).hostname, 0) + 1
    L += [f"## OK ({len(ok)})", "", "By host (every URL is in the JSON file next to this report):", "",
          ", ".join(f"{h} ({n})" for h, n in sorted(hosts.items(), key=lambda kv: (-kv[1], kv[0]))) or "None.", ""]
    L += ["## Method", "",
          f"- Pages: every sitemap URL under {', '.join(SECTIONS)} ({n_pages} pages). Links in page chrome (header, footer) are included and marked `site-wide` when on 80% or more of the pages.",
          f"- Request: HEAD, then GET if HEAD answers 4xx/5xx; redirects followed by hand (up to {MAX_HOPS} hops); one retry on a timeout, connection failure or 5xx.",
          f"- Politeness: {MAX_WORKERS} requests in flight at most, {HOST_INTERVAL:g} s between requests to one host, {TIMEOUT:g} s timeout, a desktop Chrome User-Agent.",
          "- `source` = a `<Src>` citation in a guide (`class=\"cp-src\"`); `link` = any other external link in the page body.", ""]
    return "\n".join(L)


def main(argv=None):
    ap = argparse.ArgumentParser(description="Check every external link on the guide, tool, service and industry pages.",
                                 epilog="Exit codes: 0 nothing broken; 1 broken links found; 2 the site could not be crawled.")
    ap.add_argument("base", nargs="?", default="http://localhost:3057", help="site base URL (default http://localhost:3057)")
    ap.add_argument("--out-md", help="write the Markdown report here (default: stdout)")
    ap.add_argument("--out-json", help="write the full JSON result here")
    ap.add_argument("--timeout", type=float, default=TIMEOUT, help=f"seconds per request (default {TIMEOUT:g})")
    ap.add_argument("--host-interval", type=float, default=HOST_INTERVAL, help=f"seconds between requests to one host (default {HOST_INTERVAL:g}; lower only for local tests)")
    ap.add_argument("--max-links", type=int, default=0, help="check only the first N links (for a quick trial)")
    ap.add_argument("--today", help="override the report date")
    a = ap.parse_args(argv)
    base = a.base.rstrip("/"); today = a.today or dt.date.today().isoformat()
    try: paths, links, crawl_errors = crawl(base)
    except Exception as e:
        print(f"check_sources: cannot read {base}/sitemap.xml: {type(e).__name__}: {e}", file=sys.stderr); return 2
    if not paths:
        print(f"check_sources: no guide, tool, service or industry page in {base}/sitemap.xml", file=sys.stderr); return 2
    urls = sorted(links)
    if a.max_links: urls = urls[:a.max_links]
    print(f"check_sources: {len(paths)} pages, {len(urls)} distinct external links; checking (this takes a few minutes)...", file=sys.stderr)
    checker = Checker(a.host_interval, a.timeout)
    started = dt.datetime.now().strftime("%H:%M:%S"); t0 = time.monotonic()
    with ThreadPoolExecutor(MAX_WORKERS) as ex: results = list(ex.map(checker.check, urls))
    elapsed = time.monotonic() - t0
    for r in results: r.update(pages=sorted(links[r["url"]]["pages"]), anchors=links[r["url"]]["anchors"][:3], source_citation=links[r["url"]]["source_citation"])
    counts = {c: sum(1 for r in results if r["class"] == c) for c in ORDER}
    md = markdown(base, paths, results, crawl_errors, started, elapsed, checker.requests, today)
    if a.out_md:
        with open(a.out_md, "w", encoding="utf-8") as f: f.write(md + "\n")
    else: print(md)
    if a.out_json:
        with open(a.out_json, "w", encoding="utf-8") as f:
            json.dump({"base": base, "date": today, "pages": paths, "counts": counts, "crawl_errors": crawl_errors,
                       "links": sorted(results, key=lambda r: (ORDER.index(r["class"]), r["url"]))}, f, indent=1, sort_keys=True); f.write("\n")
    print("check_sources: " + ", ".join(f"{counts[c]} {c}" for c in ORDER if counts[c]) + f" ({len(results)} links, {checker.requests} requests, {elapsed:.0f} s)", file=sys.stderr)
    if crawl_errors: return 2
    return 1 if any(counts[c] for c in BROKEN) else 0


if __name__ == "__main__":
    sys.exit(main())
