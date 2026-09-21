# fynnbuesnel.me

Personal website and private content editor, live at [fynnbuesnel.me](https://www.fynnbuesnel.me).

Everything lives in [`next-frontend/`](next-frontend/) - a Next.js (App Router + TypeScript + styled-components) app backed by Neon Postgres via Prisma, deployed on Vercel. Site content (experience, portfolio, posts) is database-driven and edited through a private admin area, so publishing never requires a redeploy.

See [`next-frontend/README.md`](next-frontend/README.md) for setup, environment variables, and architecture notes.

## Running locally

```
cd next-frontend
npm install
npm run dev
```

## Deploy

Vercel builds from `next-frontend/` on every push; pending Prisma migrations are applied automatically during the build.
