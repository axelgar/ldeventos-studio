import { userController } from '@/api/user/user.controller';
import { useApiClient } from '@/Store';
import { apiUrls } from '@/utils/api-urls';
import { useQuery, UseQueryOptions, QueryFunction } from '@tanstack/react-query';

type Data = Awaited<ReturnType<typeof userController.findAll>>;
type QueryOptions = UseQueryOptions<unknown, unknown, Data, string[]>;

export const useFindAllUsers = (options?: QueryOptions) => {
  const apiClient = useApiClient();
  const endpoint = apiUrls.findAllUsers;
  const queryFn: QueryFunction = ({ signal }) => apiClient.request<Data>({ endpoint, signal });
  return useQuery([endpoint], queryFn, {
    ...options,
  });
};
