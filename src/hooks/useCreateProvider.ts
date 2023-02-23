import { providerController } from '@/api/provider/provider.controller';
import { CreateProviderDTO } from '@/api/provider/provider.dto';
import { useApiClient } from '@/Store';
import { apiCalls } from '@/utils/api-calls';
import { useMutation, UseMutationOptions, MutateFunction } from '@tanstack/react-query';

type Data = Awaited<ReturnType<typeof providerController.createOne>>;
type MutationOptions = UseMutationOptions<Data, unknown, CreateProviderDTO>;

const { endpoint, method } = apiCalls.createProvider;

export const useCreateProvider = (options?: MutationOptions) => {
  const apiClient = useApiClient();

  const mutationFn: MutateFunction<Data, unknown, CreateProviderDTO> = (body: CreateProviderDTO) => {
    return apiClient.request<Data>({ endpoint, method, body: JSON.stringify(body) });
  };

  return useMutation(mutationFn, options);
};
