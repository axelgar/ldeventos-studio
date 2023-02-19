import { useApiClient } from '@/Store';
import { apiCalls } from '@/utils/api-calls';
import { useQuery, UseQueryOptions, QueryFunction } from '@tanstack/react-query';
import { eventController } from '../api/event/event.controller';

type Data = Awaited<ReturnType<typeof eventController.getBySubdomain>>;
type QueryOptions = UseQueryOptions<unknown, unknown, Data, string[]>;

const { endpoint: getEndpoint, method } = apiCalls.getEventBySubdomain;

export const useGetEventBySubdomain = (subdomain: string, options?: QueryOptions) => {
  const apiClient = useApiClient();
  const endpoint = getEndpoint(subdomain);
  const queryFn: QueryFunction = ({ signal }) => apiClient.request<Data>({ endpoint, method, signal });
  return useQuery([endpoint, method], queryFn, {
    ...options,
    enabled: !!subdomain,
  });
};
