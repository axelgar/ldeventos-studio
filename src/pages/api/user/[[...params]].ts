import { userController } from '@/api/user/user.controller';
import { CreateUserDTO } from '@/api/user/user.dto';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Body, createHandler, Get, Post, Req, Res, ValidationPipe } from 'next-api-decorators';
import { Auth } from '../../../api/utils/auth-middleware';

class UserHandler {
  @Get()
  @Auth('ADMIN', 'MEMBER')()
  async findAll(@Req() req: NextApiRequest, @Res() res: NextApiResponse) {
    return await userController.findAll();
  }

  @Post()
  @Auth('ADMIN')()
  async createOne(@Body(ValidationPipe) newUser: CreateUserDTO) {
    return await userController.createOne(newUser);
  }
}

export default createHandler(UserHandler);
