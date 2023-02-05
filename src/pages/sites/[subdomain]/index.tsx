import { GetServerSidePropsContext } from 'next';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { eventController } from '@/api/event/event.controller';
import { apiUrls } from '@/utils/api-urls';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { useGetEventBySubdomain } from '@/hooks/useGetEventBySubdomain';

export async function getServerSideProps({ query }: GetServerSidePropsContext) {
  const subdomain = query.subdomain as string;
  const queryClient = new QueryClient();
  const endpoint = apiUrls.getEventBySubdomain(subdomain);

  try {
    await queryClient.fetchQuery([endpoint], () => eventController.getBySubdomain(subdomain));
    return { props: { dehydratedState: dehydrate(queryClient) } };
  } catch (error) {
    return {
      redirect: {
        destination: process.env.NEXT_PUBLIC_APP_DOMAIN,
      },
    };
  }
}

export default function SiteIndex(props: any) {
  const { data: session } = useSession();
  const { query } = useRouter<'/sites/[subdomain]'>();
  const { data: event } = useGetEventBySubdomain(query.subdomain);

  return (
    <main>
      <h2>{event?.name}</h2>
    </main>
  );
}

SiteIndex.auth = {};
