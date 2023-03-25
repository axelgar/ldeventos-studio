import { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth';
import invariant from 'tiny-invariant';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { promoterController } from '@/api/promoter/promoter.controller';
import MainLayout from '@/components/MainLayout';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { apiCalls } from '@/utils/api-calls';
import { useFindAllPromoters } from '@/hooks/useFindAllPromoters';
import { PromoterOptionsDropdown } from '@/components/PromoterOptionsDropdown';

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
  const { endpoint, method } = apiCalls.findAllPromoters;

  try {
    await queryClient.fetchQuery([endpoint, method], () => promoterController.findAll());
    return { props: { dehydratedState: dehydrate(queryClient) } };
  } catch (error) {
    return { props: {} };
  }
}

export default function Providers() {
  const { data: promoters } = useFindAllPromoters();

  return (
    <MainLayout title="Promoters">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <p className="mt-2 text-sm text-gray-700">
              A list of all the promoters including their name, address, code, phone and website.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <a
              href="/promoters/add"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-orange-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 sm:w-auto"
            >
              Add promoter
            </a>
          </div>
        </div>

        <div className="mt-8 flow-root">
          <div className="-my-2 -mx-6 overflow-x-auto lg:-mx-8">
            <div className="inline-block min-w-full py-2 pb-10 align-middle sm:px-6 lg:px-8">
              <table className="mb-12 min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th scope="col" className="py-3.5 pl-6 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                      Name
                    </th>
                    <th scope="col" className="py-3.5 pl-6 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                      Logo
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Address
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Code
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Phone
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Website
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-6 sm:pr-0">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 bg-white">
                  {promoters?.map((promoter) => (
                    <tr key={promoter.id}>
                      <td className="whitespace-nowrap py-4 text-sm text-gray-500">{promoter.name}</td>
                      <td className="whitespace-nowrap py-4 text-sm text-gray-500">
                        {promoter.logo && <img className="h-auto w-28" src={promoter.logo} alt={promoter.name} />}
                      </td>
                      <td className="whitespace-nowrap py-4 text-sm text-gray-500">{promoter.address}</td>
                      <td className="whitespace-nowrap py-4 text-sm text-gray-500">{promoter.code}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{promoter.phoneNumber}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <a href={promoter?.website || '#'} target={promoter?.website ? '_blank' : '_parent'}>
                          {promoter.website}
                        </a>
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-6 text-right text-sm font-medium sm:pr-0">
                        <PromoterOptionsDropdown promoterId={promoter.id} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
