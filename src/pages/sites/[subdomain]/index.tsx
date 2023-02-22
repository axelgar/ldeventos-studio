import { GetServerSidePropsContext } from 'next';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { projectController } from '@/api/project/project.controller';
import { apiCalls } from '@/utils/api-calls';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { useGetProjectBySubdomain } from '@/hooks/useGetProjectBySubdomain';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import invariant from 'tiny-invariant';

export async function getServerSideProps({ query, req, res }: GetServerSidePropsContext) {
  const session = await getServerSession(req, res, authOptions);
  invariant(session);
  const subdomain = query.subdomain as string;
  const queryClient = new QueryClient();
  const { endpoint: getEndpoint, method } = apiCalls.getProjectBySubdomain;
  const endpoint = getEndpoint(subdomain);

  try {
    await queryClient.fetchQuery([endpoint, method], () =>
      projectController.getBySubdomain(subdomain, session.user.email)
    );
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
  const { query } = useRouter<'/sites/[subdomain]'>();
  const { data: project } = useGetProjectBySubdomain(query.subdomain);

  return (
    <main>
      <h2>{project?.name}</h2>
    </main>
  );
}

SiteIndex.auth = {};
