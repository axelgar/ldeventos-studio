import '@/styles/globals.css';
import { useState } from 'react';
import { SessionProvider } from 'next-auth/react';
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppProps } from 'next/app';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { REACT_QUERY_OPTIONS } from '@/config';
import { ToastProvider } from '@/components/ToastProvider';

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [queryClient] = useState(() => new QueryClient(REACT_QUERY_OPTIONS));
  return (
    <SessionProvider session={session} refetchOnWindowFocus={false} refetchInterval={30}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ToastProvider>
            <Component {...pageProps} />
          </ToastProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </Hydrate>
      </QueryClientProvider>
    </SessionProvider>
  );
}
