import { userController } from '@/api/user/user.controller';
import { UpdateUserDTO } from '@/api/user/user.dto';
import { useApiClient } from '@/Store';
import { apiCalls } from '@/utils/api-calls';
import { useMutation, UseMutationOptions, MutateFunction, useQueryClient } from '@tanstack/react-query';

type Data = Awaited<ReturnType<typeof userController.updateOneById>>;
type MutationOptions = UseMutationOptions<Data, unknown, UpdateUserDTO>;

const { endpoint, method } = apiCalls.updateUserById;
const { endpoint: getEndpoint, method: getUserMethod } = apiCalls.getUserById;

export const useUpdateUser = (userId: string, options?: MutationOptions) => {
  const queryClient = useQueryClient();
  const apiClient = useApiClient();

  const getUserEndpoint = getEndpoint(userId);
  const mutationFn: MutateFunction<Data, unknown, UpdateUserDTO> = (data: UpdateUserDTO) =>
    apiClient.request<Data>({ endpoint, method, body: JSON.stringify(data) });

  return useMutation(mutationFn, {
    ...options,
    onSuccess: (...params) => {
      queryClient.invalidateQueries([getUserEndpoint, getUserMethod]);
      options?.onSuccess && options.onSuccess(...params);
    },
  });
};
