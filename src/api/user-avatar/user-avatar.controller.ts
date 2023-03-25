import { fileStorageService } from '../../lib/file-storage-service';

type GetUploadUrlForAvatarDTO = {
  userId: string;
  origin: string;
  filename: string;
};

class UserAvatarController {
  constructor() {}

  async getUploadUrlToCreateAvatar({ userId, origin, filename }: GetUploadUrlForAvatarDTO) {
    await fileStorageService.deleteFilesFromFolder(userId);

    const uploadUrl = await fileStorageService.getUploadUrlToCreateFile({
      filename: `user-avatars/${userId}/${filename}`,
      origin,
    });
    return { uploadUrl };
  }
}

export const userAvatarController = new UserAvatarController();
