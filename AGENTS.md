# Horizon Properties — Base44 Sandbox Notes

Premium real-estate marketing + property-browsing site (Vite + React 18 +
Tailwind 3 + React Router + Embla). No backend; property data lives in
`src/data/properties.js` behind the async access layer
`src/services/propertyService.js`, so it can be swapped for a real API later.

## Run

```bash
docker compose -f docker-compose.base44.yml up -d
```

- Dev server (Vite) binds `0.0.0.0:3000`; host port 3000 is the preview entry.
- Source is bind-mounted at `/workspace`; edits hot-reload without rebuilds.
- `node_modules` live in the `hp_node_modules` named volume and are installed
  by the container startup command (`npm install`) — no host Node needed.
- Vite reads `__VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS` (passed through from
  the sandbox env) to accept the preview proxy host. Outside the sandbox this
  is unset and behavior is the default.
- `BASE44_PREVIEW_MODE` is passed to the container but not used to change any
  app behavior (kept for parity with sandbox conventions).

## Health / verify

- `docker compose -f docker-compose.base44.yml ps` — web service healthy.
- `curl http://localhost:3000/` — serves the SPA (`index.html`).
- All images are CDN URLs (Unsplash / Pexels) with width params; the hero
  image is local at `public/images/hero.jpg`.
- Hero is a scroll-scrubbed video (`public/videos/hero-{desktop,mobile}.mp4`):
  `src/sections/Hero.jsx` pins a 100vh sticky stage inside a ~350vh scroll
  track and drives `video.currentTime` from scroll progress via rAF + lerp
  (never `play()`). The MP4s are re-encoded for random-access seeking —
  faststart + a keyframe every 0.5s + CRF 21/24 — see the header comment in
  Hero.jsx before replacing them.

## Structure

- `src/sections/*` — homepage sections (hero, about, featured carousel,
  services, why-choose, team, CTA).
- `src/pages/*` — Home, Properties (filter/search/sort), PropertyDetail
  (gallery, agent CTAs, similar), Contact, NotFound.
- `src/components/*` — reusable Header/Footer/PropertyCard/Gallery/Modal/
  Reveal/FavoriteButton (localStorage-backed favorites).
- `src/data/content.js` — brand constants, nav, services, team, stats.

## Gotchas

- Vite dev server is `strictPort` — make sure 3000 is free before `up`.
- Compose project name is fixed (`horizon-properties`) so the same volumes
  are reused across restarts.
- UI is fully Persian (fa-IR) + RTL: `<html lang="fa" dir="rtl">`, Vazirmatn
  font, all copy in `src/data/*`. Render numbers with `faNum()` from
  `src/lib/format.js`, never raw Latin digits. Directional icons/positions
  follow RTL ("next" points left); the Embla carousel runs `direction: "rtl"`.
