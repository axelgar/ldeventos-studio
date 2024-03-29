import invariant from 'tiny-invariant';
import { useQuery, UseQueryOptions, QueryFunction } from '@tanstack/react-query';
import { promoterController } from '@/api/promoter/promoter.controller';
import { useApiClient } from '@/Store';
import { apiCalls } from '@/utils/api-calls';

type Data = Awaited<ReturnType<typeof promoterController.getOneById>>;
type QueryOptions = UseQueryOptions<
  unknown,
  unknown,
  Data,
  (ReturnType<typeof apiCalls.getPromoterById.endpoint> | typeof apiCalls.getPromoterById.method)[]
>;

const { endpoint: getEndpoint, method } = apiCalls.getPromoterById;

export const useGetPromoterById = (promoterId?: string, options?: QueryOptions) => {
  const apiClient = useApiClient();
  invariant(promoterId);
  const endpoint = getEndpoint(promoterId);

  const queryFn: QueryFunction = ({ signal }) => apiClient.request<Data>({ endpoint, method, signal });
  return useQuery([endpoint, method], queryFn, { ...options, enabled: !!promoterId });
};
