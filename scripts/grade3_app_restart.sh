#!/usr/bin/env bash
set -euo pipefail

GRADE3_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
APP_DIR="${GRADE3_APP_DIR:-$GRADE3_ROOT/interactive-grade3-app}"
PORT="${GRADE3_PORT:-4220}"
CHECK_HOST="${GRADE3_CHECK_HOST:-127.0.0.1}"
STARTUP_TIMEOUT="${GRADE3_STARTUP_TIMEOUT:-120}"
READY_URL="http://${CHECK_HOST}:${PORT}/ruchika/grade3"

if ! command -v curl >/dev/null 2>&1; then
  echo "Error: curl is required to verify the Grade 3 app." >&2
  exit 1
fi

if [[ ! -x "$APP_DIR/node_modules/.bin/ng" ]]; then
  echo "Installing locked npm dependencies..."
  (
    cd "$APP_DIR"
    npm ci
  )
else
  echo "Dependencies unchanged; keeping the current install."
fi

echo "Building Grade 3 app..."
(
  cd "$APP_DIR"
  npm run build
)

echo "Build passed; restarting Grade 3 app..."
"$GRADE3_ROOT/scripts/grade3_app_start.sh" restart

deadline=$((SECONDS + STARTUP_TIMEOUT))
echo "Waiting up to ${STARTUP_TIMEOUT} seconds for ${READY_URL}..."
while (( SECONDS < deadline )); do
  if curl -fsS --connect-timeout 2 --max-time 5 "$READY_URL" >/dev/null 2>&1; then
    echo "Grade 3 app is ready: $READY_URL"
    exit 0
  fi
  sleep 1
done

echo "Error: Grade 3 app did not become ready within ${STARTUP_TIMEOUT} seconds." >&2
echo "Log: $GRADE3_ROOT/tmp/logs/grade3-app-latest.log" >&2
tail -n 80 "$GRADE3_ROOT/tmp/logs/grade3-app-latest.log" >&2 || true
exit 1
