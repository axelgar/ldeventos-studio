import { userAvatarController } from '@/api/user-avatar/user-avatar.controller';
import { Auth } from '@/api/utils/auth-middleware';
import { BadRequestException, createHandler, Get, Param, Query } from 'next-api-decorators';

class UserAvatarHandler {
  @Get('/upload-url/:userId')
  @Auth('ADMIN')()
  async getOne(@Param('userId') userId: string, @Query('origin') origin: string, @Query('filename') filename: string) {
    try {
      return await userAvatarController.getUploadUrlToCreateAvatar({ userId, origin: decodeURI(origin), filename });
    } catch (error) {
      throw new BadRequestException();
    }
  }
}

export default createHandler(UserAvatarHandler);
