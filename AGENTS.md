# AGENTS.md

Non-obvious notes for working in this repo.

## Environment

- The app is a static Vite SPA. `docker-compose.base44.yml` (repo root) runs a single `web`
  service from `node:22-alpine`, bind-mounts the checkout at `/workspace`, installs from
  `package-lock.json` on every start, and serves the Vite dev server on host port `3000`.
- `node_modules` is a named volume, so dependencies persist across restarts but are not part of
  the source mount. After changing `package.json`, run
  `docker compose -f docker-compose.base44.yml exec -T web npm install` (or restart the service)
  and commit the updated lockfile.
- The platform has no `configure_environment` step for this app, so the compose file and
  `.base44/environment.json` are kept in the repo root. They are development-only: no app image
  is built, and the source stays live-mounted.
- Vite runs with `server.host: 0.0.0.0`, `strictPort: 3000` and file-watch polling
  (`usePolling` in `vite.config.ts`, `CHOKIDAR_USEPOLLING=1` in compose) because the checkout is a
  bind mount. The preview proxy host is allow-listed through the platform-provided
  `__VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS` variable, which is passed through compose untouched.

## Verification

```bash
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/          # expect 200
docker compose -f docker-compose.base44.yml exec -T web npm run build  # tsc -b + vite build
```

Routes: `/` (home) and `/courses/:slug` (six courses defined in `src/data/site.ts`).
There is no backend, database, auth or secrets — forms (newsletter, enrollment) are client-side
only and show a local success state.

## Gotchas

- The site is RTL: layout logic follows `dir="rtl"`, so "start" is the right edge. Use logical
  spacing (`ms-*`, `me-*`) rather than left/right where possible.
- Persian digits are produced by `toFa` / `faPrice` in `src/lib/format.ts` (thousands separator is
  `٬`). Keep new numeric copy consistent with that.
- `WordReveal` animates on mount (not on viewport intersection) because its clipping wrapper hides
  the words from IntersectionObserver.
- Imagery and the hero video are remote (Pexels CDN); an offline environment shows the poster and
  empty media frames.
