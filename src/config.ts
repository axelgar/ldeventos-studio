export const REACT_QUERY_OPTIONS = {
  defaultOptions: {
    queries: {
      staleTime: 1000 * 3,
      cacheTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
      retry: false,
    },
    mutations: {
      cacheTime: 1000 * 60 * 5,
      retry: false,
    },
  },
};

export const INTERNAL_PREFIX = '/home';

const VERCEL_DEPLOYMENT = !!process.env.VERCEL_URL;
export const cookiesOptions = {
  sessionToken: {
    name: `${VERCEL_DEPLOYMENT ? '__Secure-' : ''}next-auth.session-token`,
    options: {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      domain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN,
      secure: VERCEL_DEPLOYMENT,
    },
  },
};
