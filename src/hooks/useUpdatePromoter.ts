import { promoterController } from '@/api/promoter/promoter.controller';
import { UpdatePromoterDTO } from '@/api/promoter/promoter.dto';
import { useApiClient } from '@/Store';
import { apiCalls } from '@/utils/api-calls';
import { useMutation, UseMutationOptions, MutateFunction, useQueryClient } from '@tanstack/react-query';

type Data = Awaited<ReturnType<typeof promoterController.updateOneById>>;
type MutationOptions = UseMutationOptions<Data, unknown, UpdatePromoterDTO>;

const { endpoint, method } = apiCalls.updatePromoterById;
const { endpoint: getEndpoint, method: getPromoterMethod } = apiCalls.getPromoterById;

export const useUpdatePromoter = (promoterId: string, options?: MutationOptions) => {
  const queryClient = useQueryClient();
  const apiClient = useApiClient();

  const getPromoterEndpoint = getEndpoint(promoterId);
  const mutationFn: MutateFunction<Data, unknown, UpdatePromoterDTO> = (data: UpdatePromoterDTO) =>
    apiClient.request<Data>({ endpoint, method, body: JSON.stringify(data) });

  return useMutation(mutationFn, {
    ...options,
    onSuccess: (...params) => {
      queryClient.invalidateQueries([getPromoterEndpoint, getPromoterMethod]);
      options?.onSuccess && options.onSuccess(...params);
    },
  });
};
