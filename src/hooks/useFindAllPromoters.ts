import { promoterController } from '@/api/promoter/promoter.controller';
import { useApiClient } from '@/Store';
import { apiCalls } from '@/utils/api-calls';
import { useQuery, UseQueryOptions, QueryFunction } from '@tanstack/react-query';

type Data = Awaited<ReturnType<typeof promoterController.findAll>>;
type QueryOptions = UseQueryOptions<
  unknown,
  unknown,
  Data,
  (typeof apiCalls.findAllPromoters.endpoint | typeof apiCalls.findAllPromoters.method)[]
>;

const { endpoint, method } = apiCalls.findAllPromoters;

export const useFindAllPromoters = (options?: QueryOptions) => {
  const apiClient = useApiClient();
  const queryFn: QueryFunction = ({ signal }) => apiClient.request<Data>({ endpoint, method, signal });
  return useQuery([endpoint, method], queryFn, options);
};
