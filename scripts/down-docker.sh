#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
API_DIR="${ROOT_DIR}/../personal-api"

echo "🛑 Stopping personal-website container..."
cd "$ROOT_DIR"
docker compose down

if [ -d "$API_DIR" ]; then
  echo "🛑 Stopping personal-api container..."
  cd "$API_DIR"
  docker compose down
fi

echo "✓ All local Docker services stopped."
