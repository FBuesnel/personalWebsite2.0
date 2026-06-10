# fynnbuesnel.me — Next.js app

Next.js (App Router + TypeScript + styled-components) port of the personal website,
now with a database-backed admin dashboard. Replaces both `react-frontend/` (CRA)
and `node-backend/` (the Express mailer is now `app/api/send-email/route.ts`).

Content (experience, portfolio, posts) lives in Postgres (Neon) and is edited at
`/admin` — no redeploys needed. The dashboard also has a daily habit tracker and
resume upload (Vercel Blob).

## Local development

```bash
cd next-frontend
npm install
npm run dev
```

`.env.local` needs:

```
EMAIL_USER=...            # contact form (Gmail)
EMAIL_PASS=...
RECEIVER_EMAIL=...
DATABASE_URL=...          # Neon Postgres (also in .env for the Prisma CLI)
AUTH_SECRET=...           # openssl rand -base64 32
AUTH_GOOGLE_ID=...        # Google OAuth client (the only way to log in)
AUTH_GOOGLE_SECRET=...
ADMIN_EMAILS=...          # comma-separated Google accounts allowed into /admin
BLOB_READ_WRITE_TOKEN=... # Vercel Blob store, used by resume upload
```

## Admin

- **Secret entrance:** there is no visible login link. Type `bench` anywhere on the site (desktop), or tap the footer copyright 5 times quickly (mobile), to reach `/login`.
- **Google-only sign-in:** requires `AUTH_GOOGLE_ID` + `AUTH_GOOGLE_SECRET` (Google Cloud Console → APIs & Services → Credentials → OAuth client ID, type "Web application"). Authorized redirect URIs: `https://www.fynnbuesnel.me/api/auth/callback/google` and `http://localhost:3018/api/auth/callback/google`. Only the Google accounts listed in `ADMIN_EMAILS` (comma-separated) are allowed through; every other account is rejected. There is no password login.
- Route protection in `proxy.ts`; every server action also calls `requireAdmin()`.
- Editing experience/portfolio/posts calls `revalidatePath`, so public pages update instantly while staying statically cached.
- Habit dates are `YYYY-MM-DD` keys in `America/Los_Angeles` (`lib/dates.ts`) so Vercel's UTC runtime never shifts the day.

## Database

```bash
npx prisma migrate dev    # apply schema changes (dev)
npx prisma studio         # DB GUI
npm run db:seed           # one-time content seed (skips non-empty tables)
```

The build script runs `prisma generate && prisma migrate deploy && next build`,
so Vercel applies pending migrations automatically on deploy.

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
3. Add env vars to the Vercel project: `EMAIL_USER`, `EMAIL_PASS`, `RECEIVER_EMAIL`, `AUTH_SECRET`, `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET`, `ADMIN_EMAILS`. `DATABASE_URL` is already set.
4. Storage tab → create a **Blob** store and connect it (adds `BLOB_READ_WRITE_TOKEN`); pull it locally with `vercel env pull` or paste into `.env.local`.
5. Redeploy. The domain stays the same.
6. Afterwards: the separate node-backend Vercel project can be deleted, and `react-frontend/` + `node-backend/` can be removed from the repo whenever you're comfortable.
