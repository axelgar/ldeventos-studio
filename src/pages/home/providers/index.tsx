import { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth';
import invariant from 'tiny-invariant';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { providerController } from '@/api/provider/provider.controller';
import MainLayout from '@/components/MainLayout';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { apiCalls } from '@/utils/api-calls';
import { useFindAllProviders } from '@/hooks/useFindAllProviders';
import { ProviderOptionsDropdown } from '@/components/ProviderOptionsDropdown';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { FormEvent, useEffect, useState } from 'react';
import { useSearchProviderByName } from '@/hooks/useSearchProviderByName';
import { PageSpinner } from '@/components/PageSpinner';
import { useIsMounted } from '@/hooks/useIsMounted';
import { useRouter } from 'next/router';

const SEARCH_KEY = 'search';

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
  const { endpoint, method } = apiCalls.findAllProviders;

  try {
    await queryClient.fetchQuery([endpoint, method], () => providerController.findAll());
    return { props: { dehydratedState: dehydrate(queryClient) } };
  } catch (error) {
    return { props: {} };
  }
}

export default function Providers() {
  const isMounted = useIsMounted();
  const router = useRouter();
  const { data: allProviders, isLoading: isAllLoading } = useFindAllProviders();
  const [defaultSearchValue, setDefaultSearchValue] = useState('');
  const [searchInputValue, setSearchInputValue] = useState('');
  const { mutate: searchProvider, data: foundProviders, isLoading: isSearchLoading } = useSearchProviderByName();

  useEffect(() => {
    const url = new URL(window.location.toString());
    const searchTerm = url.searchParams.get(SEARCH_KEY);
    if (searchTerm) {
      setDefaultSearchValue(searchTerm);
      return;
    }
    console.log('No search term');
    if (!searchTerm) {
      setDefaultSearchValue('');
    }
  }, [router]);

  useEffect(() => {
    if (defaultSearchValue) {
      searchProvider(defaultSearchValue);
    }
  }, [defaultSearchValue, searchProvider]);

  const handleOnSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const url = new URL(window.location.toString());
    url.searchParams.set(SEARCH_KEY, searchInputValue);
    // @ts-ignore
    router.push(url.toString());
  };

  const providers = defaultSearchValue ? foundProviders : allProviders;
  const isLoading = isAllLoading || isSearchLoading || !isMounted;

  return (
    <MainLayout title="Providers">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <p className="mt-2 text-sm text-gray-700">
              A list of all the providers including their name, contact, phone, fax, mobile phone and email.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <a
              href="/providers/add"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-orange-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 sm:w-auto"
            >
              Add provider
            </a>
          </div>
        </div>

        <div className="mt-10 w-full">
          <form onSubmit={handleOnSearch}>
            <label htmlFor="search" className="sr-only">
              Search
            </label>
            <div className="relative text-gray-400">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <MagnifyingGlassIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
              </div>
              <input
                defaultValue={defaultSearchValue}
                onChange={(event) => setSearchInputValue(event.target.value)}
                id="search"
                name="search"
                className="border-1 block w-full rounded-md border-gray-400 bg-white py-1.5 pl-10 pr-3 text-gray-900 placeholder:text-gray-500 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="Search"
                type="search"
              />
            </div>
          </form>
        </div>

        {isLoading ? (
          <PageSpinner />
        ) : (
          <div className="mt-8 flow-root">
            <div className="-my-2 -mx-6 overflow-x-auto lg:-mx-8">
              <div className="inline-block min-w-full py-2 pb-10 align-middle sm:px-6 lg:px-8">
                <table className="mb-12 min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-6 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                      >
                        Name
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Contact
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Phone
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Fax
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Mobile
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Email
                      </th>
                      <th scope="col" className="relative py-3.5 pl-3 pr-6 sm:pr-0">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200 bg-white">
                    {providers?.map((provider) => (
                      <tr key={provider.id}>
                        <td className="whitespace-nowrap py-4 text-sm text-gray-500">{provider.name}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {provider.contactName?.split(',').map((name, index) => (
                            <span key={name + index}>
                              {name}
                              <br />
                            </span>
                          ))}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{provider.phoneNumber}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{provider.fax}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {provider.mobileNumber?.split(',').map((mobileNumber, index) => (
                            <span key={mobileNumber + index}>
                              {mobileNumber}
                              <br />
                            </span>
                          ))}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {provider.email?.split(',').map((email, index) => (
                            <span key={email + index}>
                              {email}
                              <br />
                            </span>
                          ))}
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-6 text-right text-sm font-medium sm:pr-0">
                          <ProviderOptionsDropdown providerId={provider.id} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {providers?.length === 0 && (
                  <p className="text-center">No providers found with search &quot;{defaultSearchValue}&quot;</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
