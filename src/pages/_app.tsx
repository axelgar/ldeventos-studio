import '@/styles/globals.css';
import { useState } from 'react';
import { SessionProvider } from 'next-auth/react';
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppProps } from 'next/app';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { REACT_QUERY_OPTIONS } from '@/config';

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [queryClient] = useState(() => new QueryClient(REACT_QUERY_OPTIONS));
  return (
    <SessionProvider session={session} refetchOnWindowFocus={false}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Component {...pageProps} />
          <ReactQueryDevtools initialIsOpen={false} />
        </Hydrate>
      </QueryClientProvider>
    </SessionProvider>
  );
}
