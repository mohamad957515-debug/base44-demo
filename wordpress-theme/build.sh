#!/bin/sh
# Builds the theme CSS and packages the theme as sahand-theme.zip
set -e

cd "$(dirname "$0")"

# 1. Rebuild Tailwind (uses the project's node_modules when run from the repo root).
CSS="sahand/assets/css/theme.css"
if [ -x ../../node_modules/.bin/tailwindcss ]; then
  ../../node_modules/.bin/tailwindcss \
    -c sahand/tailwind.config.cjs \
    -i sahand/assets/css/input.css \
    -o "$CSS" \
    --minify
elif command -v npx >/dev/null 2>&1; then
  ( cd sahand && npx tailwindcss -c tailwind.config.cjs -i assets/css/input.css -o assets/css/theme.css --minify )
else
  echo "Tailwind CLI پیدا نشد؛ از assets/css/theme.css فعلی استفاده می‌شود."
fi

# 2. Package (wordpress-theme/sahand-theme.zip).
rm -f sahand-theme.zip
if command -v zip >/dev/null 2>&1; then
  ( cd sahand && zip -qr ../sahand-theme.zip . -x "*.DS_Store" -x "tailwind.config.cjs" -x "README.md" )
elif command -v python3 >/dev/null 2>&1; then
  python3 - <<'PY'
import os, zipfile

root = "sahand"
skip = {"tailwind.config.cjs", "README.md"}
with zipfile.ZipFile("sahand-theme.zip", "w", zipfile.ZIP_DEFLATED) as archive:
    for folder, _, files in os.walk(root):
        for name in files:
            if name in skip or name == ".DS_Store":
                continue
            path = os.path.join(folder, name)
            archive.write(path, os.path.relpath(path, root))
PY
else
  echo "zip یا python3 پیدا نشد؛ پوشه sahand را دستی zip کنید."
  exit 1
fi

echo "ساخته شد: wordpress-theme/sahand-theme.zip"
