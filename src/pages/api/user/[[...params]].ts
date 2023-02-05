import { userController } from '@/api/user/user.controller';
import { CreateUserDTO } from '@/api/user/user.dto';
import { Auth } from '@/api/utils/auth-middleware';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Body, createHandler, Get, Post, Req, Res, ValidationPipe } from 'next-api-decorators';

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
