import { useApiClient } from '@/Store';
import { apiCalls } from '@/utils/api-calls';
import { useQuery, UseQueryOptions, QueryFunction } from '@tanstack/react-query';
import { projectController } from '../api/project/project.controller';

type Data = Awaited<ReturnType<typeof projectController.getBySubdomain>>;
type QueryOptions = UseQueryOptions<unknown, unknown, Data, string[]>;

const { endpoint: getEndpoint, method } = apiCalls.getProjectBySubdomain;

export const useGetProjectBySubdomain = (subdomain: string, options?: QueryOptions) => {
  const apiClient = useApiClient();
  const endpoint = getEndpoint(subdomain);
  const queryFn: QueryFunction = ({ signal }) => apiClient.request<Data>({ endpoint, method, signal });
  return useQuery([endpoint, method], queryFn, {
    ...options,
    enabled: !!subdomain,
  });
};
