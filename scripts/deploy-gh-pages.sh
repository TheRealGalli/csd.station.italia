#!/usr/bin/env bash
set -euo pipefail

# Build the project
npm ci
npm run build

# Publish dist/ to gh-pages using git subtree
git fetch origin
git branch -D gh-pages-tmp 2>/dev/null || true
git subtree split --prefix dist -b gh-pages-tmp
git push -f origin gh-pages-tmp:gh-pages
git branch -D gh-pages-tmp

echo "Deployed to gh-pages branch."

#!/bin/bash

# Script per deploy su branch gh-pages
# Builda il progetto e pusha su gh-pages

set -e

echo "🔨 Building project..."
npm run build

echo "📦 Preparing gh-pages branch..."

# Crea o resetta il branch gh-pages
git checkout --orphan gh-pages || git checkout gh-pages
git reset --hard

# Copia i file buildati
cp -r dist/* .

# Aggiungi e committa
git add -A
git commit -m "Deploy: $(date +'%Y-%m-%d %H:%M:%S')" || echo "No changes to commit"

# Push su gh-pages
echo "🚀 Pushing to gh-pages..."
git push origin gh-pages --force

# Torna al branch principale
git checkout main

echo "✅ Deploy completato! Il sito sarà disponibile tra qualche minuto."
echo "📝 Ricorda di impostare GitHub Pages → Source = gh-pages branch"
