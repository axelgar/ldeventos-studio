import {
  BadRequestException,
  Body,
  createHandler,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  ValidationPipe,
} from 'next-api-decorators';
import { promoterController } from '@/api/promoter/promoter.controller';
import { Auth } from '@/api/utils/auth-middleware';
import { Promoter } from '@prisma/client';
import { CreatePromoterDTO, UpdatePromoterDTO } from '@/api/promoter/promoter.dto';

class PromoterHandler {
  @Get()
  @Auth('ADMIN', 'MEMBER')()
  async findAll(@Query('skip') skip: number, @Query('limit') limit: number) {
    return await promoterController.findAll({ skip, limit });
  }

  @Get('/:promoterId')
  @Auth('ADMIN', 'MEMBER')()
  async getOneById(@Param('promoterId') promoterId: string) {
    return await promoterController.getOneById(promoterId);
  }

  @Post()
  @Auth('ADMIN', 'MEMBER')()
  async createOne(@Body(ValidationPipe) newUser: CreatePromoterDTO) {
    return await promoterController.createOne(newUser);
  }

  @Put()
  @Auth('ADMIN', 'MEMBER')()
  async updateOneById(@Body(ValidationPipe) data: UpdatePromoterDTO) {
    return await promoterController.updateOneById(data);
  }

  @Delete('/:id')
  @Auth('ADMIN')()
  async deleteOneById(@Param('id') id: Promoter['id']) {
    return await promoterController.deleteOneById(id);
  }

  @Get('/logo-upload-url/:promoterId')
  @Auth('ADMIN', 'MEMBER')()
  async getOne(
    @Param('promoterId') promoterId: string,
    @Query('origin') origin: string,
    @Query('filename') filename: string
  ) {
    try {
      return await promoterController.getUploadUrlToCreateLogo({ promoterId, origin: decodeURI(origin), filename });
    } catch (error) {
      throw new BadRequestException();
    }
  }
}

export default createHandler(PromoterHandler);
