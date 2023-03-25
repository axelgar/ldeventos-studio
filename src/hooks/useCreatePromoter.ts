import { promoterController } from '@/api/promoter/promoter.controller';
import { CreatePromoterDTO } from '@/api/promoter/promoter.dto';
import { useApiClient } from '@/Store';
import { apiCalls } from '@/utils/api-calls';
import { useMutation, UseMutationOptions, MutateFunction } from '@tanstack/react-query';

type Data = Awaited<ReturnType<typeof promoterController.createOne>>;
type MutationOptions = UseMutationOptions<Data, unknown, CreatePromoterDTO>;

const { endpoint, method } = apiCalls.createPromoter;

export const useCreatePromoter = (options?: MutationOptions) => {
  const apiClient = useApiClient();

  const mutationFn: MutateFunction<Data, unknown, CreatePromoterDTO> = (body: CreatePromoterDTO) => {
    return apiClient.request<Data>({ endpoint, method, body: JSON.stringify(body) });
  };

  return useMutation(mutationFn, options);
};
