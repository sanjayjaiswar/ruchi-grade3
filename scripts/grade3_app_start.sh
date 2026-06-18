#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
GRADE3_ROOT=$(cd "$SCRIPT_DIR/.." && pwd)
APP_DIR="${GRADE3_APP_DIR:-$GRADE3_ROOT/interactive-grade3-app}"
PORT="${GRADE3_PORT:-4220}"
HOST="${GRADE3_HOST:-127.0.0.1}"
PUBLIC_HOST="${GRADE3_PUBLIC_HOST:-localhost}"
CHECK_HOST="${GRADE3_CHECK_HOST:-$HOST}"
LOG_DIR="${GRADE3_LOG_DIR:-$GRADE3_ROOT/tmp/logs}"
CONTEXT_FILE="${GRADE3_CONTEXT_FILE:-$GRADE3_ROOT/tmp/grade3-app-context-latest.txt}"
APP_LOG="$LOG_DIR/grade3-app-latest.log"
APP_PID_FILE="$LOG_DIR/grade3-app.pid"
SCREEN_SESSION="${GRADE3_SCREEN_SESSION:-grade3-interactive-app}"

mkdir -p "$LOG_DIR" "$(dirname "$CONTEXT_FILE")"

kill_pids() {
  local name=$1
  shift
  local pids=("$@")
  if [[ ${#pids[@]} -eq 0 ]]; then
    return 0
  fi

  kill "${pids[@]}" >/dev/null 2>&1 || true
  for _ in {1..10}; do
    local alive=()
    for pid in "${pids[@]}"; do
      if ps -p "$pid" >/dev/null 2>&1; then
        alive+=("$pid")
      fi
    done
    if [[ ${#alive[@]} -eq 0 ]]; then
      return 0
    fi
    sleep 0.2
  done

  echo "Force stopping ${name}: ${pids[*]}"
  kill -9 "${pids[@]}" >/dev/null 2>&1 || true
}

stop_if_running() {
  local pid_file=$1
  if [[ -f "$pid_file" ]]; then
    local pid
    pid=$(cat "$pid_file")
    if [[ -n "$pid" ]] && ps -p "$pid" >/dev/null 2>&1; then
      echo "Stopping PID from $pid_file: $pid"
      kill_pids "Grade 3 app PID" "$pid"
    fi
    rm -f "$pid_file"
  fi
}

stop_listener_on_port() {
  local port=$1
  local name=$2
  local pids_raw
  pids_raw=$(lsof -t -nP -iTCP:"$port" -sTCP:LISTEN 2>/dev/null || true)
  if [[ -n "$pids_raw" ]]; then
    echo "Stopping ${name} listener(s) on port ${port}: ${pids_raw}"
    local pids=()
    while IFS= read -r pid; do
      [[ -n "$pid" ]] && pids+=("$pid")
    done <<< "$pids_raw"
    kill_pids "${name} listener(s) on port ${port}" "${pids[@]}"
  fi
}

stop_screen_session() {
  if command -v screen >/dev/null 2>&1; then
    screen -S "$SCREEN_SESSION" -X quit >/dev/null 2>&1 || true
  fi
}

write_context() {
  cat > "$CONTEXT_FILE" <<EOF
Grade 3 Eureka Math Interactive App Context
Generated: $(date)

Workspace:
  $GRADE3_ROOT

Angular app:
  $APP_DIR

Dev server:
  URL: http://${PUBLIC_HOST}:${PORT}/ruchika-grade3/
  Host bind: ${HOST}
  Port: ${PORT}

Commands:
  Start/restart: scripts/grade3_app_start.sh
  Stop:          scripts/grade3_app_start.sh stop
  Status:        scripts/grade3_app_start.sh status
  Context:       scripts/grade3_app_start.sh context
  Build:         cd interactive-grade3-app && npm run build

Logs:
  App log: $APP_LOG
  PID file: $APP_PID_FILE
  Screen session: $SCREEN_SESSION

Source of truth:
  EurekaMath-Sources/Module_1/g3_m1_teacher_edition_v1_3_1.pdf
  EurekaMath-Sources/Module_2/g3_m2_teacher_edition_v1_3_0.pdf
  EurekaMath-Sources/Module_3/g3_m3_teacher_edition_v1_3_0.pdf
  EurekaMath-Sources/Module_4/g3_m4_teacher_edition_v1_3_0.pdf
  EurekaMath-Sources/Module_5/g3_m5_teacher_edition_v1_3_0.pdf
  EurekaMath-Sources/Module_6/g3_m6_teacher_edition_v1_3_0.pdf
  EurekaMath-Sources/Module_7/g3_m7_teacher_edition_v1_3_1.pdf

Docs:
  README.md
  docs/interactive-grade3/

Reference projects, read-only:
  /Volumes/Data/EdZillaPrj/EdZilla/edzilla-gtm/
  /Volumes/Data/EdZillaPrj/EdZilla/scratch-prjs/design-spec/

Scope rules:
  Work inside the Grade3 workspace.
  Do not edit the EdZilla reference projects.
  Curriculum facts come from the teacher editions.
  tmp/req.txt is tone/workflow guidance only, not curriculum truth.
EOF
}

print_context() {
  write_context
  cat "$CONTEXT_FILE"
}

status() {
  write_context
  local listener_pid
  listener_pid=$(lsof -t -nP -iTCP:"$PORT" -sTCP:LISTEN 2>/dev/null | head -n1 || true)
  echo "Grade 3 app context: $CONTEXT_FILE"
  echo "URL: http://${PUBLIC_HOST}:${PORT}/ruchika-grade3/"
  echo "Log: $APP_LOG"
  if command -v screen >/dev/null 2>&1 && screen -list 2>/dev/null | grep -q "[.]${SCREEN_SESSION}[[:space:]]"; then
    echo "Screen: ${SCREEN_SESSION}"
  fi
  if [[ -n "$listener_pid" ]]; then
    echo "Status: running on port ${PORT} (PID ${listener_pid})"
  else
    echo "Status: not running on port ${PORT}"
  fi
}

stop_app() {
  stop_screen_session
  stop_if_running "$APP_PID_FILE"
  stop_listener_on_port "$PORT" "Grade 3 app"
}

start_app() {
  if [[ ! -d "$APP_DIR" ]]; then
    echo "Error: Angular app directory not found: $APP_DIR" >&2
    exit 1
  fi

  if [[ ! -f "$APP_DIR/package.json" ]]; then
    echo "Error: package.json not found in $APP_DIR" >&2
    exit 1
  fi

  if [[ ! -d "$APP_DIR/node_modules" ]]; then
    echo "Installing npm dependencies because node_modules is missing..."
    (
      cd "$APP_DIR"
      npm install
    )
  fi

  if [[ ! -x "$APP_DIR/node_modules/.bin/ng" ]]; then
    echo "Error: Angular CLI binary not found at $APP_DIR/node_modules/.bin/ng" >&2
    echo "Try: cd interactive-grade3-app && npm install" >&2
    exit 1
  fi

  write_context
  : > "$APP_LOG"

  echo "Starting Grade 3 Angular app..."
  if command -v screen >/dev/null 2>&1; then
    screen -dmS "$SCREEN_SESSION" bash -lc \
      'cd "$1" && exec ./node_modules/.bin/ng serve --host "$2" --port "$3" > "$4" 2>&1' \
      _ "$APP_DIR" "$HOST" "$PORT" "$APP_LOG"
  else
    (
      cd "$APP_DIR"
      nohup ./node_modules/.bin/ng serve --host "$HOST" --port "$PORT" > "$APP_LOG" 2>&1 < /dev/null &
      echo $! > "$APP_PID_FILE"
    )
  fi

  local app_ok=false
  for _ in {1..45}; do
    if curl -sf "http://${CHECK_HOST}:${PORT}/ruchika-grade3/" >/dev/null; then
      app_ok=true
      break
    fi
    sleep 1
  done

  if [[ "$app_ok" != "true" ]]; then
    echo "Grade 3 app failed to respond on port ${PORT}. Check ${APP_LOG}." >&2
    tail -n 80 "$APP_LOG" >&2 || true
    exit 1
  fi

  sleep 2
  if ! lsof -t -nP -iTCP:"$PORT" -sTCP:LISTEN >/dev/null 2>&1; then
    echo "Grade 3 app started and then stopped listening on port ${PORT}. Check ${APP_LOG}." >&2
    tail -n 80 "$APP_LOG" >&2 || true
    exit 1
  fi

  local listener_pid
  listener_pid=$(lsof -t -nP -iTCP:"$PORT" -sTCP:LISTEN 2>/dev/null | head -n1 || true)
  if [[ -n "$listener_pid" ]]; then
    echo "$listener_pid" > "$APP_PID_FILE"
  fi

  echo "Grade 3 app PID: $(cat "$APP_PID_FILE")"
  echo "URL: http://${PUBLIC_HOST}:${PORT}/ruchika-grade3/"
  echo "Log: $APP_LOG"
  echo "Context: $CONTEXT_FILE"
  if command -v screen >/dev/null 2>&1; then
    echo "Screen session: $SCREEN_SESSION"
  fi
}

command="${1:-restart}"

case "$command" in
  start|restart)
    stop_app
    start_app
    ;;
  stop)
    stop_app
    echo "Grade 3 app stopped."
    ;;
  status)
    status
    ;;
  context)
    print_context
    ;;
  *)
    echo "Usage: $0 [start|restart|stop|status|context]" >&2
    exit 2
    ;;
esac
