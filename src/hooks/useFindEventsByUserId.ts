import { useApiClient } from '@/Store';
import { apiUrls } from '@/utils/api-urls';
import { useQuery, UseQueryOptions, QueryFunction } from '@tanstack/react-query';
import { eventController } from '../api/event/event.controller';

type Data = Awaited<ReturnType<typeof eventController.findByUserId>>;
type QueryOptions = UseQueryOptions<unknown, unknown, Data, string[]>;

export const useFindEventsByUserId = (userId?: string, options?: QueryOptions) => {
  const apiClient = useApiClient();
  const endpoint = apiUrls.findEventsByUserId(userId);
  const queryFn: QueryFunction = ({ signal }) => apiClient.request<Data>({ endpoint, signal });
  return useQuery([endpoint], queryFn, {
    ...options,
    enabled: !!userId,
  });
};
