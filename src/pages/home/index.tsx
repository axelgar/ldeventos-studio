import { eventController } from '@/api/event/event.controller';
import MainLayout from '@/components/MainLayout';
import { useFindEventsByUserId } from '@/hooks/useFindEventsByUserId';
import { apiCalls } from '@/utils/api-calls';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import invariant from 'tiny-invariant';
import { authOptions } from '../api/auth/[...nextauth]';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);
  invariant(session);
  const userId = session.user.id;
  const queryClient = new QueryClient();
  const { endpoint: getEndpoint, method } = apiCalls.findEventsByUserId;
  const endpoint = getEndpoint(userId);
  await queryClient.fetchQuery([endpoint, method], () => eventController.findByUserId(userId));
  return { props: { dehydratedState: dehydrate(queryClient) } };
}

export default function Home() {
  const { data: session } = useSession();
  const { data: events } = useFindEventsByUserId(session?.user.id);

  return (
    <MainLayout>
      <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <div className="text-end">
          <a className="rounded-md bg-orange-500 py-2 px-4 text-white" href="/add-event">
            Add new event
          </a>
        </div>
        <ul className="divide-y divide-gray-200">
          {events &&
            events.map((event) => (
              <li key={event.subdomain} className="flex py-4">
                <img className="h-10 w-10 rounded-full" src={event.logo || ''} alt="" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{event.name}</p>
                  <p className="text-sm text-gray-500">{event.subdomain}</p>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </MainLayout>
  );
}
