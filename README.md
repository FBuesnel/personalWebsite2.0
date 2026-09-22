# fynnbuesnel.me

Personal website and private content editor, live at [fynnbuesnel.me](https://www.fynnbuesnel.me).

Everything lives in [`next-frontend/`](next-frontend/). It's a Next.js (App Router + TypeScript + styled-components) app backed by Neon Postgres via Prisma, deployed on Vercel. Site content is database-driven and edited through a private admin area authenticated with my personal Google Account. Content used to be editable only from new deploys, and that was an issue because it made me rarely want to update the site. 

See [`next-frontend/README.md`](next-frontend/README.md) for setup, environment variables, and architecture notes.

## Running locally

```
cd next-frontend
npm install
npm run dev
```

## Deploy

- Vercel builds from `next-frontend/` on every push.
- Pending Prisma migrations are applied automatically during the build.
