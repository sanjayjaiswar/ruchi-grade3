#!/usr/bin/env bash
set -euo pipefail

GRADE3_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

exec "$GRADE3_ROOT/scripts/grade3_app_start.sh" restart
