import type { NextAuthConfig } from 'next-auth';

// Edge-safe config shared by proxy.ts (route protection) and lib/auth.ts.
// No Node-only imports here.
export const authConfig = {
  pages: {
    signIn: '/login',
    error: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  providers: [],
  callbacks: {
    authorized({ auth, request }) {
      const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');
      if (!isAdminRoute) return true;
      return !!auth?.user;
    },
  },
} satisfies NextAuthConfig;
