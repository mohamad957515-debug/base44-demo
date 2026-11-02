#!/bin/sh
# Builds the theme CSS and packages the theme as sahand-theme.zip
set -e

cd "$(dirname "$0")"

# 1. Rebuild Tailwind (uses the project's node_modules when run from the repo root).
CSS="sahand/assets/css/theme.css"
build_css() {
  if [ -x ../node_modules/.bin/tailwindcss ]; then
    ../node_modules/.bin/tailwindcss \
      -c sahand/tailwind.config.cjs \
      -i sahand/assets/css/input.css \
      -o "$CSS" \
      --minify
  elif command -v npx >/dev/null 2>&1; then
    ( cd sahand && npx --yes tailwindcss@3 -c tailwind.config.cjs -i assets/css/input.css -o assets/css/theme.css --minify )
  else
    return 1
  fi
}

# A CSS build failure must not block packaging: fall back to the committed theme.css.
if ! build_css; then
  echo "Tailwind CLI اجرا نشد؛ از assets/css/theme.css فعلی استفاده می‌شود."
fi

# 2. Package (wordpress-theme/sahand-theme.zip).
#    WordPress expects the zip to contain one top-level folder named after the
#    theme, so the archive root is `sahand/`, not its contents.
rm -f sahand-theme.zip
if command -v python3 >/dev/null 2>&1; then
  python3 - <<'PY'
import os, zipfile

root = "sahand"
skip_names = {"tailwind.config.cjs", "README.md", ".DS_Store", "node_modules"}
with zipfile.ZipFile("sahand-theme.zip", "w", zipfile.ZIP_DEFLATED) as archive:
    for folder, dirs, files in os.walk(root):
        dirs[:] = [d for d in dirs if d not in skip_names]
        for name in files:
            if name in skip_names or name.endswith(".zip"):
                continue
            path = os.path.join(folder, name)
            archive.write(path, path)  # keeps the `sahand/` prefix
PY
elif command -v zip >/dev/null 2>&1; then
  zip -qr sahand-theme.zip sahand -x "sahand/tailwind.config.cjs" -x "sahand/README.md" -x "*.DS_Store"
else
  echo "zip یا python3 پیدا نشد؛ پوشه sahand را دستی zip کنید."
  exit 1
fi

echo "ساخته شد: wordpress-theme/sahand-theme.zip"
