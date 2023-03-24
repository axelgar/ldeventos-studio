import { providerController } from '@/api/provider/provider.controller';
import { useApiClient } from '@/Store';
import { apiCalls } from '@/utils/api-calls';
import { useMutation, UseMutationOptions, MutateFunction } from '@tanstack/react-query';

type Data = Awaited<ReturnType<typeof providerController.searchByName>>;
type MutationOptions = UseMutationOptions<Data, unknown, string>;

const { endpoint: getEndpoint, method } = apiCalls.searchProviderByName;

export const useSearchProviderByName = (options?: MutationOptions) => {
  const apiClient = useApiClient();

  const mutationFn: MutateFunction<Data, unknown, string> = (searchTerm: string) =>
    apiClient.request<Data>({ endpoint: getEndpoint(searchTerm), method });

  return useMutation(mutationFn, {
    ...options,
    onSuccess: (...params) => {
      options?.onSuccess && options.onSuccess(...params);
    },
  });
};
