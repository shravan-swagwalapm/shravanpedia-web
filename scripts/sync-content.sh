#!/bin/bash
# Sync wiki markdown from Obsidian vault to content/ directory
# Run this before committing to ensure Vercel has the latest articles

VAULT="${SHRAVANPEDIA_PATH:-$HOME/ProductBrain/Shravanpedia}"
DEST="$(dirname "$0")/../content"

if [ ! -d "$VAULT" ]; then
  echo "Error: Vault not found at $VAULT"
  exit 1
fi

# Clean and recreate
rm -rf "$DEST"
mkdir -p "$DEST"

# Copy all category directories with .md files
for dir in People Projects Learnings Inspirations Ideas Interests Places; do
  if [ -d "$VAULT/$dir" ]; then
    mkdir -p "$DEST/$dir"
    cp "$VAULT/$dir"/*.md "$DEST/$dir/" 2>/dev/null
  fi
done

# Count
count=$(find "$DEST" -name "*.md" | wc -l | tr -d ' ')
echo "Synced $count articles from $VAULT to $DEST"
