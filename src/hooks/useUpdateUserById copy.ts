import { userController } from '@/api/user/user.controller';
import { UpdateUserDTO } from '@/api/user/user.dto';
import { useApiClient } from '@/Store';
import { apiCalls } from '@/utils/api-calls';
import { useMutation, UseMutationOptions, MutateFunction } from '@tanstack/react-query';

type Data = Awaited<ReturnType<typeof userController.createOne>>;
type MutationOptions = UseMutationOptions<Data, unknown, UpdateUserDTO>;

export const useUpdateUserById = (options?: MutationOptions) => {
  const apiClient = useApiClient();
  const { endpoint, method } = apiCalls.updateUserById;
  const mutationFn: MutateFunction<Data, unknown, UpdateUserDTO> = (data: UpdateUserDTO) =>
    apiClient.request<Data>({ endpoint, method, body: JSON.stringify(data) });
  return useMutation(mutationFn, options);
};
