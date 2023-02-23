import { providerController } from '@/api/provider/provider.controller';
import { useApiClient } from '@/Store';
import { apiCalls } from '@/utils/api-calls';
import { useMutation, UseMutationOptions, useQueryClient } from '@tanstack/react-query';

type Data = Awaited<ReturnType<typeof providerController.deleteOneById>>;

const { endpoint: findAllProvidersEndpoint, method: findAllProvidersMethod } = apiCalls.findAllProviders;
const { endpoint, method } = apiCalls.deleteProviderById;

export const useDeleteProviderById = (providerId: string, options?: UseMutationOptions) => {
  const queryClient = useQueryClient();
  const apiClient = useApiClient();

  const mutationFn = () => apiClient.request<Data>({ endpoint: endpoint(providerId), method });

  return useMutation(mutationFn, {
    ...options,
    onSuccess: (...params) => {
      queryClient.invalidateQueries([findAllProvidersEndpoint, findAllProvidersMethod]);
      options?.onSuccess && options.onSuccess(...params);
    },
  });
};
