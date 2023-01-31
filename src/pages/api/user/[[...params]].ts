import { userController } from '@/api/user/user.controller';
import { createHandler, Get } from 'next-api-decorators';

class UserHandler {
  @Get()
  async findAll() {
    return await userController.findAll();
  }
}

export default createHandler(UserHandler);
