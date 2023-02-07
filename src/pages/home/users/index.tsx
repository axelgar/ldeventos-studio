import { useState } from 'react';
import { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth';
import invariant from 'tiny-invariant';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { userController } from '@/api/user/user.controller';
import { AvatarPlaceholder } from '@/components/AvatarPlaceholder';
import { DeleteUserModal } from '@/components/DeleteUserModal';
import MainLayout from '@/components/MainLayout';
import { RolesBudge } from '@/components/RoleBudge';
import { UserOptionsDropdown } from '@/components/UserOptionsDropdown';
import { useFindAllUsers } from '@/hooks/useFindAllUsers';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { apiUrls } from '@/utils/api-urls';

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

export default function Users() {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const { data: users } = useFindAllUsers();

  return (
    <MainLayout title="Users">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <p className="mt-2 text-sm text-gray-700">
              A list of all the users including their name, title, email and role.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <a
              href="/users/add-user"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-orange-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 sm:w-auto"
            >
              Add user
            </a>
          </div>
        </div>
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Name
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Mobile
                      </th>
                      <th
                        scope="col"
                        className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell md:hidden lg:table-cell"
                      >
                        Nº Projects
                      </th>
                      <th
                        scope="col"
                        className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell md:hidden lg:table-cell"
                      >
                        Role
                      </th>
                      <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {users?.map((user) => (
                      <tr key={user.email}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0">
                              {user.image ? (
                                <img className="h-10 w-10 rounded-full" src={user.image} alt="" />
                              ) : (
                                <AvatarPlaceholder />
                              )}
                            </div>
                            <div className="ml-4">
                              <div className="font-medium text-gray-900">{user.name}</div>
                              <div className="text-gray-500">{user.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <div className="text-gray-500">{user.mobileNumber}</div>
                        </td>
                        <td className="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 sm:table-cell md:hidden lg:table-cell">
                          {user.userOnEvents.length}
                        </td>
                        <td className="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 sm:table-cell md:hidden lg:table-cell">
                          <RolesBudge>{user.role}</RolesBudge>
                        </td>
                        <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <UserOptionsDropdown setOpenDeleteModal={setOpenDeleteModal} />
                          <DeleteUserModal id={user.id} open={openDeleteModal} setOpen={setOpenDeleteModal} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
