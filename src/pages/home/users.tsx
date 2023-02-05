import { userController } from '@/api/user/user.controller';
import { StudioNavbar } from '@/components/StudioNavbar';
import { useFindAllUsers } from '@/hooks/useFindAllUsers';
import { apiUrls } from '@/utils/api-urls';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth';
import invariant from 'tiny-invariant';
import { authOptions } from '../api/auth/[...nextauth]';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);
  invariant(session);

  if (session.user.role === 'EXTERNAL') {
    return {
      redirect: {
        permanent: false,
        destination: process.env.NEXT_PUBLIC_APP_DOMAIN,
      },
    };
  }

  const queryClient = new QueryClient();
  const endpoint = apiUrls.findAllUsers;

  await queryClient.fetchQuery([endpoint], () => userController.findAll());
  return { props: { dehydratedState: dehydrate(queryClient) } };
}

export default function Team() {
  const { data: users } = useFindAllUsers();

  return (
    <div className="min-h-full">
      <StudioNavbar />
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Team</h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            <ul className="divide-y divide-gray-200">
              {users &&
                users.map((user, index) => (
                  <li key={`${user.name} ${index}`} className="flex py-4">
                    <img
                      className={'h-14 w-14 rounded-full border-4 border-orange-400'}
                      src={user.image || ''}
                      alt=""
                    />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.role}</p>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
