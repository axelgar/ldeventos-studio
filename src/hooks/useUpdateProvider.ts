import { providerController } from '@/api/provider/provider.controller';
import { UpdateProviderDTO } from '@/api/provider/provider.dto';
import { useApiClient } from '@/Store';
import { apiCalls } from '@/utils/api-calls';
import { useMutation, UseMutationOptions, MutateFunction, useQueryClient } from '@tanstack/react-query';

type Data = Awaited<ReturnType<typeof providerController.updateOneById>>;
type MutationOptions = UseMutationOptions<Data, unknown, UpdateProviderDTO>;

const { endpoint, method } = apiCalls.updateProviderById;
const { endpoint: getEndpoint, method: getProviderMethod } = apiCalls.getProviderById;

export const useUpdateProvider = (providerId: string, options?: MutationOptions) => {
  const queryClient = useQueryClient();
  const apiClient = useApiClient();

  const getProviderEndpoint = getEndpoint(providerId);
  const mutationFn: MutateFunction<Data, unknown, UpdateProviderDTO> = (data: UpdateProviderDTO) =>
    apiClient.request<Data>({ endpoint, method, body: JSON.stringify(data) });

  return useMutation(mutationFn, {
    ...options,
    onSuccess: (...params) => {
      queryClient.invalidateQueries([getProviderEndpoint, getProviderMethod]);
      options?.onSuccess && options.onSuccess(...params);
    },
  });
};
