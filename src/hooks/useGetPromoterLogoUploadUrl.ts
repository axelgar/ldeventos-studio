import { promoterController } from '@/api/promoter/promoter.controller';
import { useApiClient } from '@/Store';
import { apiCalls } from '@/utils/api-calls';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';

type Data = Awaited<ReturnType<typeof promoterController.getUploadUrlToCreateLogo>>;
type Options = UseMutationOptions<Data, unknown, string>;

const { endpoint: getEndpoint, method } = apiCalls.getPromoterLogoUploadUrl;

export const useGetPromoterLogoUploadUrl = (promoterId: string, options?: Options) => {
  const apiClient = useApiClient();
  const mutationFn = (filename: string) =>
    apiClient.request<Data>({ endpoint: getEndpoint(promoterId, globalThis.location?.origin, filename), method });
  return useMutation(mutationFn, options);
};
