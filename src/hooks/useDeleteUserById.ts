import { userController } from '@/api/user/user.controller';
import { useApiClient } from '@/Store';
import { apiUrls } from '@/utils/api-urls';
import { useMutation, UseMutationOptions, useQueryClient } from '@tanstack/react-query';

type Data = Awaited<ReturnType<typeof userController.deleteOneById>>;

export const useDeleteUserById = (userId: string, options?: UseMutationOptions) => {
  const queryClient = useQueryClient();
  const apiClient = useApiClient();
  const endpoint = apiUrls.deleteUserById(userId);
  const mutationFn = () => apiClient.request<Data>({ endpoint, method: 'DELETE' });
  return useMutation(mutationFn, {
    ...options,
    onSuccess: (...params) => {
      queryClient.invalidateQueries([apiUrls.findAllUsers]);
      options?.onSuccess && options.onSuccess(...params);
    },
  });
};
