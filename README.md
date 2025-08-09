# TruView Glass — Vite + React + Tailwind (Glassmorphism)

Production-ready starter matching the design you approved. Hash routing means it deploys cleanly on any static host.

## Tech
- Vite + React + TypeScript
- TailwindCSS
- lucide-react (icons)
- framer-motion (animations)
- Canonical + OGP + JSON-LD injection

## One‑click deploy (after you push this repo to GitHub)

**Replace `your-username` with your GitHub username first.**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/truview-glass&project-name=truview-glass&repository-name=truview-glass)
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/your-username/truview-glass)
[![Deploy to Cloudflare Pages](https://img.shields.io/badge/Deploy%20to-Cloudflare%20Pages-orange)](https://pages.cloudflare.com/new?url=https://github.com/your-username/truview-glass)

## Local dev
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
# output: dist/
```

## Notes
- Meta tags (OG/Twitter), canonical, and JSON‑LD are injected at runtime in `src/App.tsx` via the `HeadTags` helper.
- Update social links and logo URL inside the JSON‑LD block when going live on `truview.glass`.
- Contact form is static; wire it to Netlify Forms, a lightweight Railway API, or any provider when ready.
---

## Quick GitHub Upload (no terminal)
1. Create a new repo at https://github.com/new (name it `truview-glass`).
2. Click **“uploading an existing file”** on the empty repo page.
3. Drag **all files** from this folder into the upload area (including hidden ones like `.nvmrc`).
4. Commit. Done.

> Hosts will auto-detect Node **20** from `package.json` `"engines"` and `.nvmrc`.

## Deploy
Use the buttons in this README for Vercel/Netlify/Cloudflare Pages, or:
- **Netlify**: build `npm run build`, publish `dist`
- **Cloudflare Pages**: framework preset Vite, build command `npm run build`, output `dist`
- **Vercel**: import the repo, default settings are fine
