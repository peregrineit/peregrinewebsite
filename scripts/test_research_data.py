#!/usr/bin/env python3
"""Structure checks for docs/growth/research/*.csv. Stdlib only.

Usage: python3 scripts/test_research_data.py   (exit 1 on any failure)

keyword-map.csv: one row per cluster, one target URL per cluster and per row, every URL exists in the
metadata baseline (the production sitemap), observed rows carry numbers and hypothesis rows carry none.
partner-programs.csv: every row has an official https URL, a fetch result, a checked date and a
confidence; a cost is either sourced or says "not published" / "could not verify".
"""
import csv, json, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
R = os.path.join(ROOT, "docs", "growth", "research")
results = []
def check(name, cond, detail=""):
    results.append(bool(cond)); print(("  ok   " if cond else "  FAIL ") + name + (f"  [{detail}]" if detail and not cond else ""))

if __name__ == "__main__":
    if "--help" in sys.argv or "-h" in sys.argv: print(__doc__); sys.exit(0)
    site = set(json.load(open(os.path.join(ROOT, "tests", "fixtures", "meta-baseline.json"), encoding="utf-8"))["pages"])
    km = list(csv.DictReader(open(os.path.join(R, "keyword-map.csv"), encoding="utf-8")))
    check("keyword map has rows", len(km) >= 10, str(len(km)))
    clusters = [r["cluster"] for r in km]; targets = [r["target_url"] for r in km]
    check("no cluster appears twice", len(clusters) == len(set(clusters)), str([c for c in clusters if clusters.count(c) > 1]))
    check("no URL is the target of two clusters", len(targets) == len(set(targets)), str([t for t in targets if targets.count(t) > 1]))
    check("every target URL is a live sitemap URL", all(t in site for t in targets), str([t for t in targets if t not in site]))
    comp = [(r["cluster"], u) for r in km for u in re.findall(r"(/[a-z0-9/-]+) \(", r["competing_urls"])]
    check("every competing URL is a live sitemap URL", all(u in site for _, u in comp), str([c for c in comp if c[1] not in site]))
    check("a row never competes with its own target", all(r["target_url"] not in re.findall(r"(/[a-z0-9/-]+) \(", r["competing_urls"]) for r in km))
    check("evidence is 'observed' or 'hypothesis'", {r["evidence"] for r in km} <= {"observed", "hypothesis"})
    obs = [r for r in km if r["evidence"] == "observed"]; hyp = [r for r in km if r["evidence"] == "hypothesis"]
    check("observed rows carry impressions and a position", all(int(r["query_impressions"]) > 0 and float(r["avg_position"]) > 0 for r in obs))
    check("hypothesis rows carry no numbers and say so", all(r["query_impressions"] == "0" and not r["avg_position"] and "hypothesis" in r["example_queries"] for r in hyp))
    check("every row has a gap and a next action", all(r["gap"].strip() and r["next_action"].strip() for r in km))
    pp = list(csv.DictReader(open(os.path.join(R, "partner-programs.csv"), encoding="utf-8")))
    check("partner programs has rows", len(pp) >= 10, str(len(pp)))
    check("every row has an official https URL", all(r["official_url"].startswith("https://") for r in pp))
    check("every row has a fetch result", all(re.search(r"HTTP \d{3}", r["fetch_result"]) for r in pp))
    check("every row has a checked date", all(re.fullmatch(r"\d{4}-\d{2}-\d{2}", r["date_checked"]) for r in pp))
    check("confidence is high, medium, low or none", {r["confidence"] for r in pp} <= {"high", "medium", "low", "none"})
    check("a stated cost has a source URL", all(r["cost_source_url"].startswith("https://") for r in pp))
    check("an unfetched page is recorded as 'could not verify', not guessed",
          all(r["requirements"] == "could not verify" and r["stated_cost"] == "could not verify" and r["confidence"] == "none"
              for r in pp if r["fetch_result"].startswith("could not verify")))
    check("requirements cite their source", all(r["requirements_source_url"].startswith("https://") for r in pp))
    print(f"\n{sum(results)} passed, {len(results) - sum(results)} failed"); sys.exit(0 if all(results) else 1)
