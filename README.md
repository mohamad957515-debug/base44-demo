# آتلیهٔ طباطبایی — Atelier Tabatabaei

وب‌سایت آکادمی خیاطی و طراحی لباس «خانمک طباطبایی»؛ یک تجربهٔ فارسی و کاملاً راست‌به‌چپ با
زبان بصریِ کاغذ، پارچه و طلا.

A premium, fully RTL Persian website for a couture sewing academy — editorial minimalism,
paper-white palette with a metallic gold accent, cinematic fabric hero, course gallery,
masterclass pages and a smooth, motion-led reading experience.

## Stack

- React 18 + TypeScript + Vite
- Tailwind CSS (design tokens in `tailwind.config.js`)
- Framer Motion for scroll reveals, parallax and counters
- React Router (`/` و `/courses/:slug`)
- Self-hosted Persian type: Vazirmatn (display + body) with Cormorant Garamond for Latin accents

## Run locally (Docker)

```bash
docker compose -f docker-compose.base44.yml up -d
# → http://localhost:3000
```

The container installs dependencies from `package-lock.json` on start and runs the Vite dev
server with polling, so source edits hot-reload.

## Scripts (inside the container)

```bash
docker compose -f docker-compose.base44.yml exec -T web npm run build   # type-check + build
```

## Structure

```
src/
  components/layout/     Nav, Footer, Logo, Cursor
  components/sections/   Hero, Courses, Philosophy, Experience, Stats, …
  components/ui/         Icons, motion helpers (Reveal, ZoomImage, Counter)
  pages/                 Home, CoursePage, NotFound
  data/site.ts           All Persian content, courses, prices, imagery
```

Content and prices live in `src/data/site.ts`; imagery is served from the Pexels CDN and the
hero video from the Pexels video CDN.
