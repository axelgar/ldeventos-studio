import '@/styles/globals.css';
import { useState } from 'react';
import { SessionProvider } from 'next-auth/react';
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppProps } from 'next/app';
import { REACT_QUERY_OPTIONS } from '@/config';
import { Auth } from '@/components/Auth';

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [queryClient] = useState(() => new QueryClient(REACT_QUERY_OPTIONS));

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Auth>
            {/* @ts-ignore */}
            <Component {...pageProps} />
          </Auth>
        </Hydrate>
      </QueryClientProvider>
    </SessionProvider>
  );
}
