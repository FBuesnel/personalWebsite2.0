# fynnbuesnel.me — Next.js app

Next.js (App Router + TypeScript + styled-components) personal website with a
database-backed content editor. The contact-form mailer is
`app/api/send-email/route.ts`.

Content (experience, portfolio, posts) lives in Postgres (Neon) and is edited at
`/admin` — no redeploys needed. Signing in opens the experience editor; admin
navigation also links directly to portfolio and posts. Resume uploads use Vercel Blob.

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
BLOB_READ_WRITE_TOKEN=... # Vercel Blob store, used by resume + post image uploads
```

## Admin

- **Secret entrance:** there is no visible login link. Type `bench` anywhere on the site (desktop), or tap the footer copyright 5 times quickly (mobile), to reach `/login`.
- **Google-only sign-in:** requires `AUTH_GOOGLE_ID` + `AUTH_GOOGLE_SECRET` (Google Cloud Console → APIs & Services → Credentials → OAuth client ID, type "Web application"). Authorized redirect URIs: `https://www.fynnbuesnel.me/api/auth/callback/google` and `http://localhost:3018/api/auth/callback/google`. Only the Google accounts listed in `ADMIN_EMAILS` (comma-separated) are allowed through; every other account is rejected. There is no password login.
- Route protection in `proxy.ts`; every server action also calls `requireAdmin()`.
- Editing experience/portfolio/posts calls `revalidatePath`, so public pages update instantly while staying statically cached.
- `/admin` and successful sign-in both lead to `/admin/experience`. Login failures show a message on `/login`; existing sessions skip the login form.
- Experience, education, portfolio, posts (including book reviews), and resume uploads are independent of the retired trackers.
- `/resume` uses `public/Resume.pdf` unless a newer admin upload exists for the version in `lib/resume.ts`. When replacing the bundled PDF, bump `RESUME_VERSION` so an older upload cannot override it.

## Database

The personal tracker routes, actions, components, sync/export endpoints, and
seeding script have been removed. The legacy Prisma models and existing
migrations remain to preserve stored data and migration history; no active
application code queries those tables. This cleanup does not add a data-deletion
migration. Book reviews are regular posts and no longer require a tracked book.

```bash
npx prisma migrate dev    # apply schema changes (dev)
npx prisma studio         # DB GUI
npm run db:seed           # one-time content seed (skips non-empty tables)
```

The build script runs `prisma generate && prisma migrate deploy && next build`,
so Vercel applies pending migrations automatically on deploy.

## Structure

- `app/` — routes; each `page.tsx` exports metadata and renders a client component from `components/pages/` (public) or `components/admin/` (dashboard)
- `components/` — styled-components UI (theme shell, navbar, footer, panels)
- `lib/` — theme, db/auth helpers, date and stats utilities, styled-components SSR registry
- `prisma/` — schema, migrations, seed scripts
- Post content is markdown stored in the database, rendered by `components/PostBody.tsx`
- SEO is handled by the Metadata API: per-page titles/descriptions, `app/sitemap.ts`, `app/robots.ts`, `app/manifest.ts`, JSON-LD in `app/layout.tsx`

## Deploy

Vercel builds this folder (project Root Directory is `next-frontend`); the build
script runs pending Prisma migrations, and env-var changes need a manual Redeploy
to take effect.
