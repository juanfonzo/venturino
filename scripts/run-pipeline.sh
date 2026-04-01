#!/bin/sh
# =============================================================================
# run-pipeline.sh — Execute the live pipeline inside the Docker container
#
# Usage (from host — Dockerfile-based container):
#   docker exec -it <container_name> sh scripts/run-pipeline.sh
#   docker exec -it <container_name> sh scripts/run-pipeline.sh --dry-run
#   docker exec -it <container_name> sh scripts/run-pipeline.sh --since 2026-03-01
#
# Or directly inside the container:
#   sh scripts/run-pipeline.sh
#
# Prerequisites:
#   - MONGODB_URI and DATABASE_URL must be set in .env (or container env)
#   - MongoDB driver: npm install mongodb (already in package.json)
#   - Prisma client generated: npx prisma generate
# =============================================================================

set -eu

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

cd "$PROJECT_DIR"

echo "================================================"
echo "  Venturino Pipeline — $(date '+%Y-%m-%d %H:%M:%S')"
echo "================================================"
echo ""

# 1. Ensure Prisma client is up to date
echo "[1/3] Generating Prisma client..."
npx prisma generate --no-hints
echo ""

# 2. Run database migrations (if any pending)
echo "[2/3] Applying database migrations..."
npx prisma db push --accept-data-loss=false --skip-generate 2>/dev/null || {
  echo "  Running prisma db push..."
  npx prisma db push --skip-generate
}
echo ""

# 3. Run the live pipeline
echo "[3/3] Running pipeline-live.js..."
node scripts/pipeline-live.js "$@"

echo ""
echo "================================================"
echo "  Pipeline completed — $(date '+%Y-%m-%d %H:%M:%S')"
echo "================================================"
