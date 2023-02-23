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
  (ReturnType<typeof apiCalls.getUserById.endpoint> | typeof apiCalls.getUserById.method)[]
>;

const { endpoint: getEndpoint, method } = apiCalls.getUserById;

export const useGetUserById = (userId?: string, options?: QueryOptions) => {
  const apiClient = useApiClient();
  invariant(userId);
  const endpoint = getEndpoint(userId);

  const queryFn: QueryFunction = ({ signal }) => apiClient.request<Data>({ endpoint, method, signal });
  return useQuery([endpoint, method], queryFn, { ...options, enabled: !!userId });
};
