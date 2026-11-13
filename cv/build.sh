#!/bin/sh
# Renders cv/resume.html to public/Noman_Aqeel_CV.pdf with headless Chrome (A4) and checks it stays within two pages.
set -e
cd "$(dirname "$0")/.."
CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
OUT="public/Noman_Aqeel_CV.pdf"
"$CHROME" --headless=new --disable-gpu --no-pdf-header-footer \
  --user-data-dir="$(mktemp -d)" \
  --print-to-pdf="$OUT" "file://$(pwd)/cv/resume.html" 2>/dev/null
if command -v pdfinfo >/dev/null 2>&1; then
  pages=$(pdfinfo "$OUT" | awk '/^Pages:/ {print $2}')
  echo "$OUT: $pages page(s)"
  [ "$pages" -le 2 ] || { echo "CV is longer than two pages" >&2; exit 1; }
fi
