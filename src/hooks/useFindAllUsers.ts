import { userController } from '@/api/user/user.controller';
import { useApiClient } from '@/Store';
import { apiCalls } from '@/utils/api-calls';
import { useQuery, UseQueryOptions, QueryFunction } from '@tanstack/react-query';

type Data = Awaited<ReturnType<typeof userController.findAll>>;
type QueryOptions = UseQueryOptions<
  unknown,
  unknown,
  Data,
  (typeof apiCalls.findAllUsers.endpoint | typeof apiCalls.findAllUsers.method)[]
>;

const { endpoint, method } = apiCalls.findAllUsers;

export const useFindAllUsers = (options?: QueryOptions) => {
  const apiClient = useApiClient();
  const queryFn: QueryFunction = ({ signal }) => apiClient.request<Data>({ endpoint, method, signal });
  return useQuery([endpoint, method], queryFn, options);
};
