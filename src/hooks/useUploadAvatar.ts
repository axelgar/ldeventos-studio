import { GCP_STORAGE_RESUMABLE_RESPONSE } from '@/@types/gcp-sotrage-resumable-response';
import { useApiClient } from '@/Store';
import { API_METHODS } from '@/utils/api-methods';
import { useMutation, UseMutationOptions, MutateFunction } from '@tanstack/react-query';

type MutationOptions = UseMutationOptions<string, unknown, Params>;
type Params = { uploadUrl: string; avatarFile: File };

export const useUploadAvatar = (options?: MutationOptions) => {
  const apiClient = useApiClient();

  const mutationFn: MutateFunction<string, unknown, Params> = async ({ uploadUrl, avatarFile }) => {
    const response = await apiClient.request<GCP_STORAGE_RESUMABLE_RESPONSE>({
      endpoint: uploadUrl,
      method: API_METHODS.POST,
      body: avatarFile,
      headers: {
        'content-length': '0',
        'content-type': 'image/jpeg',
        'X-Goog-Upload-Command': 'start',
        'X-Goog-Upload-Content-Type': 'image/jpeg',
      },
    });
    return `https://storage.googleapis.com/${response.bucket}/${response.name}`;
  };

  return useMutation(mutationFn, options);
};
