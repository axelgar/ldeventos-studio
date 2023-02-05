import { userController } from '@/api/user/user.controller';
import { CreateUserDTO } from '@/api/user/user.dto';
import { useApiClient } from '@/Store';
import { apiUrls } from '@/utils/api-urls';
import { useMutation, UseMutationOptions, MutateFunction } from '@tanstack/react-query';

type Data = Awaited<ReturnType<typeof userController.createOne>>;
type MutationOptions = UseMutationOptions<Data, unknown, CreateUserDTO>;

export const useCreateOne = (options?: MutationOptions) => {
  const apiClient = useApiClient();
  const endpoint = apiUrls.createUser;
  const mutationFn: MutateFunction<Data, unknown, CreateUserDTO> = (body: CreateUserDTO) =>
    apiClient.request<Data>({ endpoint, method: 'POST', body: JSON.stringify(body) });
  return useMutation(mutationFn, options);
};
