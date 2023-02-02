import { NextResponse } from 'next/server';
import { withAuth, NextRequestWithAuth } from 'next-auth/middleware';
import { authOptions } from './pages/api/auth/[...nextauth]';

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /fonts (inside /public)
     * 4. /examples (inside /public)
     * 5. all root files inside /public (e.g. /favicon.ico)
     */
    '/((?!api|_next|examples|[\\w-]+\\.\\w+).*)',
  ],
};

const PROD_DOMAIN = process.env.NEXT_PUBLIC_COOKIE_DOMAIN;
const LOCAL_DOMAIN = `${process.env.NEXT_PUBLIC_COOKIE_DOMAIN}:3000`;

export default withAuth(
  (req: NextRequestWithAuth) => {
    const url = req.nextUrl;
    const hostname = req.headers.get('host') || 'demo.vercel.pub';
    const path = url.pathname;

    const studioSubdomain =
      process.env.NODE_ENV === 'production' && process.env.VERCEL === '1'
        ? hostname.replace(`.${PROD_DOMAIN}`, '')
        : hostname.replace(`.${LOCAL_DOMAIN}`, '');

    // rewrite root application to `/home` folder
    if (hostname === LOCAL_DOMAIN || hostname === PROD_DOMAIN) {
      return NextResponse.rewrite(new URL(`/home${path}`, req.url));
    }

    // rewrite everything else to `/sites/[site] dynamic route
    return NextResponse.rewrite(new URL(`/sites/${studioSubdomain}${path}`, req.url));
  },
  {
    cookies: {
      sessionToken: {
        name: `${!!process.env.VERCEL_URL ? '__Secure-' : ''}next-auth.session-token`,
      },
    },
    callbacks: {
      authorized: async ({ token }) => {
        console.log('authorized: ', token);
        return !!token;
      },
    },
  }
);
