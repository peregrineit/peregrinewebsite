#!/bin/bash
# Renders every design/blog-heroes/*.html to public/images/blog/<slug>-hero.png and .webp (1200x630, 2x for sharpness).
set -e
cd "$(dirname "$0")/../.."
CHROME="${CHROME:-$(ls -d ~/Library/Caches/ms-playwright/chromium-*/chrome-mac*/*.app/Contents/MacOS/* 2>/dev/null | head -1)}"
[ -x "$CHROME" ] || CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
for f in design/blog-heroes/*.html; do
  slug=$(basename "$f" .html)
  # A supplied image in design/blog-heroes/custom/<slug>.webp replaces the HTML design for that guide.
  if [ -f "design/blog-heroes/custom/$slug.webp" ]; then
    python3 -c "from PIL import Image; im=Image.open('design/blog-heroes/custom/$slug.webp').convert('RGB'); im.save('public/images/blog/$slug-hero.webp', quality=86, method=6); im.resize((1200,630), Image.LANCZOS).save('public/images/blog/$slug-hero.png', optimize=True)"
    echo "copied custom $slug"; continue
  fi
  "$CHROME" --headless=new --hide-scrollbars --force-device-scale-factor=2 --window-size=1200,630 \
    --screenshot="public/images/blog/$slug-hero.png" "file://$PWD/$f" >/dev/null 2>&1
  python3 -c "from PIL import Image; im=Image.open('public/images/blog/$slug-hero.png').convert('RGB'); im.save('public/images/blog/$slug-hero.webp', quality=86, method=6); im.resize((1200,630), Image.LANCZOS).save('public/images/blog/$slug-hero.png', optimize=True)"
  echo "rendered $slug"
done
