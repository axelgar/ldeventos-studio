import { userController } from '@/api/user/user.controller';
import { CreateUserDTO } from '@/api/user/user.dto';
import { useApiClient } from '@/Store';
import { apiCalls } from '@/utils/api-calls';
import { useMutation, UseMutationOptions, MutateFunction } from '@tanstack/react-query';

type Data = Awaited<ReturnType<typeof userController.createOne>>;
type MutationOptions = UseMutationOptions<Data, unknown, CreateUserDTO>;

const { endpoint, method } = apiCalls.createUser;

export const useCreateOne = (options?: MutationOptions) => {
  const apiClient = useApiClient();

  const mutationFn: MutateFunction<Data, unknown, CreateUserDTO> = (body: CreateUserDTO) => {
    return apiClient.request<Data>({ endpoint, method, body: JSON.stringify(body) });
  };

  return useMutation(mutationFn, options);
};
