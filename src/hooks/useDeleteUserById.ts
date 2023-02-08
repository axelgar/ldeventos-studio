import { userController } from '@/api/user/user.controller';
import { useApiClient } from '@/Store';
import { apiCalls } from '@/utils/api-calls';
import { useMutation, UseMutationOptions, useQueryClient } from '@tanstack/react-query';

type Data = Awaited<ReturnType<typeof userController.deleteOneById>>;

export const useDeleteUserById = (userId: string, options?: UseMutationOptions) => {
  const queryClient = useQueryClient();
  const apiClient = useApiClient();
  const { endpoint, method } = apiCalls.deleteUserById;
  const { endpoint: findAllUsersEndpoint, method: findAllUsersMethod } = apiCalls.findAllUsers;
  const mutationFn = () => apiClient.request<Data>({ endpoint: endpoint(userId), method });
  return useMutation(mutationFn, {
    ...options,
    onSuccess: (...params) => {
      queryClient.invalidateQueries([findAllUsersEndpoint, findAllUsersMethod]);
      options?.onSuccess && options.onSuccess(...params);
    },
  });
};
