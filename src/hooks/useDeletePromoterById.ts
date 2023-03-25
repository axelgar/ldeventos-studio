import { promoterController } from '@/api/promoter/promoter.controller';
import { useApiClient } from '@/Store';
import { apiCalls } from '@/utils/api-calls';
import { useMutation, UseMutationOptions, useQueryClient } from '@tanstack/react-query';

type Data = Awaited<ReturnType<typeof promoterController.deleteOneById>>;

const { endpoint: findAllPromotersEndpoint, method: findAllPromotersMethod } = apiCalls.findAllPromoters;
const { endpoint, method } = apiCalls.deletePromoterById;

export const useDeletePromoterById = (promoterId: string, options?: UseMutationOptions) => {
  const queryClient = useQueryClient();
  const apiClient = useApiClient();

  const mutationFn = () => apiClient.request<Data>({ endpoint: endpoint(promoterId), method });

  return useMutation(mutationFn, {
    ...options,
    onSuccess: (...params) => {
      queryClient.invalidateQueries([findAllPromotersEndpoint, findAllPromotersMethod]);
      options?.onSuccess && options.onSuccess(...params);
    },
  });
};
