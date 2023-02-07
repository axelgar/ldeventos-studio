import { Body, createHandler, Delete, Get, Param, Post, Put, ValidationPipe } from 'next-api-decorators';
import { userController } from '@/api/user/user.controller';
import { CreateUserDTO, UpdateUserDTO } from '@/api/user/user.dto';
import { Auth } from '@/api/utils/auth-middleware';
import { User } from '@prisma/client';

class UserHandler {
  @Get()
  @Auth('ADMIN', 'MEMBER')()
  async findAll() {
    return await userController.findAll();
  }

  @Post()
  @Auth('ADMIN')()
  async createOne(@Body(ValidationPipe) newUser: CreateUserDTO) {
    return await userController.createOne(newUser);
  }

  @Put()
  @Auth('ADMIN')()
  async updateOneById(@Body(ValidationPipe) data: UpdateUserDTO) {
    return await userController.updateOneById(data);
  }

  @Delete('/:id')
  @Auth('ADMIN')()
  async deleteOneById(@Param('id') id: User['id']) {
    return await userController.deleteOneById(id);
  }
}

export default createHandler(UserHandler);
