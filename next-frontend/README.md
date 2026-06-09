# fynnbuesnel.me — Next.js app

Next.js (App Router + TypeScript + styled-components) port of the personal website.
Replaces both `react-frontend/` (CRA) and `node-backend/` (the Express mailer is now
`app/api/send-email/route.ts`).

## Local development

```bash
cd next-frontend
npm install
npm run dev
```

Requires `.env.local` with the mailer credentials (same three vars the old
`node-backend/.env` used):

```
EMAIL_USER=...
EMAIL_PASS=...
RECEIVER_EMAIL=...
```

## Structure

- `app/` — routes; each `page.tsx` exports metadata and renders a client component from `components/pages/`
- `components/` — styled-components UI (theme shell, navbar, footer, panels)
- `lib/` — theme, posts registry (`posts-data.ts` = slugs/titles/quotes, `posts.ts` = server-side markdown reader), styled-components SSR registry
- `content/posts/` — markdown post files
- `images/` — statically imported images
- SEO is handled by the Metadata API: per-page titles/descriptions, `app/sitemap.ts`, `app/robots.ts`, `app/manifest.ts`, JSON-LD in `app/layout.tsx`

## Vercel cutover (one-time)

1. Push this folder to the repo.
2. In the Vercel project settings: **Root Directory** → change `react-frontend` to `next-frontend` (framework preset auto-detects Next.js).
3. Add `EMAIL_USER`, `EMAIL_PASS`, `RECEIVER_EMAIL` env vars to the Vercel project.
4. Redeploy. The domain stays the same.
5. Afterwards: the separate node-backend Vercel project can be deleted, and `react-frontend/` + `node-backend/` can be removed from the repo whenever you're comfortable.
