import { userAvatarController } from '@/api/user-avatar/user-avatar.controller';
import { useApiClient } from '@/Store';
import { apiCalls } from '@/utils/api-calls';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';

type Data = Awaited<ReturnType<typeof userAvatarController.getUploadUrlToCreateAvatar>>;
type Options = UseMutationOptions<Data, unknown, string>;

const { endpoint: getEndpoint, method } = apiCalls.getAvatarUploadUrl;

export const useGetAvatarUploadUrl = (userId: string, options?: Options) => {
  const apiClient = useApiClient();
  const mutationFn = (filename: string) =>
    apiClient.request<Data>({ endpoint: getEndpoint(userId, globalThis.location?.origin, filename), method });
  return useMutation(mutationFn, options);
};
