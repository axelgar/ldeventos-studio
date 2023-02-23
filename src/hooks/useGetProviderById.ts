import invariant from 'tiny-invariant';
import { useQuery, UseQueryOptions, QueryFunction } from '@tanstack/react-query';
import { providerController } from '@/api/provider/provider.controller';
import { useApiClient } from '@/Store';
import { apiCalls } from '@/utils/api-calls';

type Data = Awaited<ReturnType<typeof providerController.getOneById>>;
type QueryOptions = UseQueryOptions<
  unknown,
  unknown,
  Data,
  (ReturnType<typeof apiCalls.getProviderById.endpoint> | typeof apiCalls.getProviderById.method)[]
>;

const { endpoint: getEndpoint, method } = apiCalls.getProviderById;

export const useGetProviderById = (providerId?: string, options?: QueryOptions) => {
  const apiClient = useApiClient();
  invariant(providerId);
  const endpoint = getEndpoint(providerId);

  const queryFn: QueryFunction = ({ signal }) => apiClient.request<Data>({ endpoint, method, signal });
  return useQuery([endpoint, method], queryFn, { ...options, enabled: !!providerId });
};
