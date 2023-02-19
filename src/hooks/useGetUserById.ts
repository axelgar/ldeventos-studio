import invariant from 'tiny-invariant';
import { useQuery, UseQueryOptions, QueryFunction } from '@tanstack/react-query';
import { userController } from '@/api/user/user.controller';
import { useApiClient } from '@/Store';
import { apiCalls } from '@/utils/api-calls';

type Data = Awaited<ReturnType<typeof userController.getOneById>>;
type QueryOptions = UseQueryOptions<
  unknown,
  unknown,
  Data,
  (ReturnType<typeof apiCalls.getOneUserById.endpoint> | typeof apiCalls.getOneUserById.method)[]
>;

const { endpoint: getEndpoint, method } = apiCalls.getOneUserById;

export const useGetUserById = (id?: string, options?: QueryOptions) => {
  const apiClient = useApiClient();
  invariant(id);
  const endpoint = getEndpoint(id);

  const queryFn: QueryFunction = ({ signal }) => apiClient.request<Data>({ endpoint, method, signal });
  return useQuery([endpoint, method], queryFn, { ...options, enabled: !!id });
};
