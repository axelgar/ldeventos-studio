import { userController } from '@/api/user/user.controller';
import { useApiClient } from '@/Store';
import { apiCalls } from '@/utils/api-calls';
import { useMutation, UseMutationOptions, useQueryClient } from '@tanstack/react-query';

type Data = Awaited<ReturnType<typeof userController.deleteOneById>>;

const { endpoint: findAllUsersEndpoint, method: findAllUsersMethod } = apiCalls.findAllUsers;
const { endpoint, method } = apiCalls.deleteUserById;

export const useDeleteUserById = (userId: string, options?: UseMutationOptions) => {
  const queryClient = useQueryClient();
  const apiClient = useApiClient();

  const mutationFn = () => apiClient.request<Data>({ endpoint: endpoint(userId), method });

  return useMutation(mutationFn, {
    ...options,
    onSuccess: (...params) => {
      queryClient.invalidateQueries([findAllUsersEndpoint, findAllUsersMethod]);
      options?.onSuccess && options.onSuccess(...params);
    },
  });
};
