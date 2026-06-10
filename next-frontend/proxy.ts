import NextAuth from 'next-auth';
import { authConfig } from './lib/auth.config';

// Next.js 16 route protection (proxy.ts replaced middleware.ts).
// Unauthenticated requests to /admin/** are redirected to /login.
export const proxy = NextAuth(authConfig).auth;

export const config = {
  matcher: ['/admin/:path*'],
};
