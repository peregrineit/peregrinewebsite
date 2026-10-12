#!/bin/bash
# Build the site and serve it on http://localhost:3057 for scripts/seo_check.py.
# Usage: scripts/serve-local.sh        (stop it with: scripts/serve-local.sh stop)
# SERVE_PORT overrides the port, so several checkouts can run side by side.
set -e
cd "$(dirname "$0")/.."
PORT=${SERVE_PORT:-3057}
# `pkill -f "next start"` does not match the next-server process; kill by port instead.
lsof -tiTCP:$PORT -sTCP:LISTEN | xargs kill 2>/dev/null || true
[ "$1" = "stop" ] && exit 0
sleep 1
npm run build > .next-build.log 2>&1 || { tail -30 .next-build.log; exit 1; }
(PORT=$PORT npm start > /dev/null 2>&1 &)
for i in $(seq 1 30); do curl -s -o /dev/null http://localhost:$PORT/ && break; sleep 1; done
echo "serving build $(cat .next/BUILD_ID) on http://localhost:$PORT"
