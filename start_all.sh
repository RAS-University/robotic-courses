#!/usr/bin/env bash
set -euo pipefail

PROJECT_ROOT="/home/developer/robotic-courses"
TUTORIAL_ROOT="/home/developer/Tutorial_DS_mapping"
BACKEND_PY="/home/developer/miniconda3/envs/tutorial_ds_mapping/bin/python"

JEKYLL_PORT=4000
FRONTEND_PORT=3000
BACKEND_PORT=8000
MAX_CONCURRENT_JOBS="${MAX_CONCURRENT_JOBS:-3}"

RUN_DIR="$PROJECT_ROOT/.run"
mkdir -p "$RUN_DIR"

is_port_open() {
  local port="$1"
  (echo >/dev/tcp/127.0.0.1/"$port") >/dev/null 2>&1
}

start_jekyll() {
  if is_port_open "$JEKYLL_PORT"; then
    echo "[OK] Jekyll already running on http://127.0.0.1:$JEKYLL_PORT"
    return
  fi
  echo "[..] Starting Jekyll on :$JEKYLL_PORT"
  nohup bash -lc "cd \"$PROJECT_ROOT\" && bundle exec jekyll serve --host 127.0.0.1 --port $JEKYLL_PORT" \
    > "$RUN_DIR/jekyll.log" 2>&1 &
}

start_tutorial_frontend() {
  if is_port_open "$FRONTEND_PORT"; then
    echo "[OK] Tutorial frontend already running on http://127.0.0.1:$FRONTEND_PORT"
    return
  fi
  if [[ ! -d "$TUTORIAL_ROOT/frontend" ]]; then
    echo "[ERR] Missing frontend folder: $TUTORIAL_ROOT/frontend"
    return 1
  fi
  echo "[..] Starting Tutorial frontend on :$FRONTEND_PORT"
  nohup bash -lc "cd \"$TUTORIAL_ROOT/frontend\" && python3 -m http.server $FRONTEND_PORT" \
    > "$RUN_DIR/tutorial_frontend.log" 2>&1 &
}

start_tutorial_backend() {
  if is_port_open "$BACKEND_PORT"; then
    echo "[OK] Tutorial backend already running on http://127.0.0.1:$BACKEND_PORT"
    return
  fi
  if [[ ! -f "$TUTORIAL_ROOT/backend/app.py" ]]; then
    echo "[ERR] Missing backend app: $TUTORIAL_ROOT/backend/app.py"
    return 1
  fi
  if [[ ! -x "$BACKEND_PY" ]]; then
    echo "[ERR] Missing Python env executable: $BACKEND_PY"
    return 1
  fi
  echo "[..] Starting Tutorial backend on :$BACKEND_PORT (${MAX_CONCURRENT_JOBS} workers, unlimited queue)"
  nohup bash -lc "cd \"$TUTORIAL_ROOT\" && MAX_CONCURRENT_JOBS=\"$MAX_CONCURRENT_JOBS\" \"$BACKEND_PY\" backend/app.py" \
    > "$RUN_DIR/tutorial_backend.log" 2>&1 &
}

print_status() {
  echo ""
  echo "=== Service Status ==="
  if is_port_open "$JEKYLL_PORT"; then
    echo "[UP]  Site (Jekyll):         http://127.0.0.1:$JEKYLL_PORT"
  else
    echo "[DOWN] Site (Jekyll):       :$JEKYLL_PORT"
  fi
  if is_port_open "$FRONTEND_PORT"; then
    echo "[UP]  Tutorial Frontend:     http://127.0.0.1:$FRONTEND_PORT"
  else
    echo "[DOWN] Tutorial Frontend:   :$FRONTEND_PORT"
  fi
  if is_port_open "$BACKEND_PORT"; then
    echo "[UP]  Tutorial Backend API:  http://127.0.0.1:$BACKEND_PORT/docs"
  else
    echo "[DOWN] Tutorial Backend API::$BACKEND_PORT"
  fi
  echo ""
  echo "Logs:"
  echo "  $RUN_DIR/jekyll.log"
  echo "  $RUN_DIR/tutorial_frontend.log"
  echo "  $RUN_DIR/tutorial_backend.log"
}

start_jekyll
start_tutorial_frontend
start_tutorial_backend

# Give processes a moment to bind ports.
sleep 1
print_status
