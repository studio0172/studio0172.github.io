#!/bin/bash
# Deploy recipes to mealie.ai/recipes
# Run from anywhere: ./deploy.sh

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REMOTE="vicky@5.78.126.244"
REMOTE_PATH="/var/www/mealie-recipes/"

echo "🚀 Deploying recipes to mealie.ai..."
rsync -avz --delete \
  --exclude='.DS_Store' \
  --exclude='deploy.sh' \
  "$SCRIPT_DIR/" \
  "$REMOTE:$REMOTE_PATH"

echo "✅ Done! Live at https://mealie.ai/recipes/"
