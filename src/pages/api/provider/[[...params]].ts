import { Body, createHandler, Delete, Get, Param, Post, Put, Query, ValidationPipe } from 'next-api-decorators';
import { providerController } from '@/api/provider/provider.controller';
import { Auth } from '@/api/utils/auth-middleware';
import { Provider } from '@prisma/client';
import { CreateProviderDTO, UpdateProviderDTO } from '@/api/provider/provider.dto';

class ProviderHandler {
  @Get()
  @Auth('ADMIN', 'MEMBER')()
  async findAll(@Query('skip') skip: number, @Query('limit') limit: number) {
    return await providerController.findAll({ skip, limit });
  }

  @Post()
  @Auth('ADMIN', 'MEMBER')()
  async createOne(@Body(ValidationPipe) newUser: CreateProviderDTO) {
    return await providerController.createOne(newUser);
  }

  @Put()
  @Auth('ADMIN', 'MEMBER')()
  async updateOneById(@Body(ValidationPipe) data: UpdateProviderDTO) {
    return await providerController.updateOneById(data);
  }

  @Delete('/:id')
  @Auth('ADMIN')()
  async deleteOneById(@Param('id') id: Provider['id']) {
    return await providerController.deleteOneById(id);
  }
}

export default createHandler(ProviderHandler);
