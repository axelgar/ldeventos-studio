import { providerController } from '@/api/provider/provider.controller';
import { useApiClient } from '@/Store';
import { apiCalls } from '@/utils/api-calls';
import { useQuery, UseQueryOptions, QueryFunction } from '@tanstack/react-query';

type Data = Awaited<ReturnType<typeof providerController.findAll>>;
type QueryOptions = UseQueryOptions<
  unknown,
  unknown,
  Data,
  (typeof apiCalls.findAllProviders.endpoint | typeof apiCalls.findAllProviders.method)[]
>;

const { endpoint, method } = apiCalls.findAllProviders;

export const useFindAllProviders = (options?: QueryOptions) => {
  const apiClient = useApiClient();
  const queryFn: QueryFunction = ({ signal }) => apiClient.request<Data>({ endpoint, method, signal });
  return useQuery([endpoint, method], queryFn, options);
};
