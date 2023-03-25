import { fileStorageService } from '@/lib/file-storage-service';
import { Promoter } from '@prisma/client';
import { BadRequestException } from 'next-api-decorators';
import { CreatePromoterDTO, FindAllPromotersDTO, UpdatePromoterDTO, GetUploadUrlForLogoDTO } from './promoter.dto';
import { promoterRepository } from './promoter.repository';

class PromoterController {
  private readonly promoterRepository = promoterRepository;

  async findAll({ skip = 0, limit = 100 }: FindAllPromotersDTO = { skip: 0, limit: 100 }) {
    return await this.promoterRepository.findAll({ skip, limit });
  }

  async getOneById(id: Promoter['id']) {
    return await this.promoterRepository.getOneById(id);
  }

  async createOne(promoter: CreatePromoterDTO) {
    try {
      return await this.promoterRepository.createOne(promoter);
    } catch (error) {
      throw new BadRequestException('There was an error trying to create the promoter');
    }
  }

  async updateOneById(data: UpdatePromoterDTO) {
    try {
      return await this.promoterRepository.updateOneById(data);
    } catch (error) {
      throw new BadRequestException(`There was an error trying to update the p with id: ${data.id}`);
    }
  }

  async deleteOneById(id: Promoter['id']) {
    try {
      await this.promoterRepository.deleteOneById(id);
      return { message: 'Promoter successfully deleted' };
    } catch (error) {
      throw new BadRequestException(`There was an error trying to delete promoter with id: ${id}`);
    }
  }

  async getUploadUrlToCreateLogo({ promoterId, origin, filename }: GetUploadUrlForLogoDTO) {
    await fileStorageService.deleteFilesFromFolder(promoterId);

    const uploadUrl = await fileStorageService.getUploadUrlToCreateFile({
      filename: `promoter-logos/${promoterId}/${filename}`,
      origin,
    });
    return { uploadUrl };
  }
}

export const promoterController = new PromoterController();
