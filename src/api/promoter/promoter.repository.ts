import { Promoter } from '@prisma/client';
import { prisma } from '../../lib/prisma';
import { CreatePromoterDTO, FindAllPromotersDTO, UpdatePromoterDTO } from './promoter.dto';

class PromoterRepository {
  async findAll({ skip, limit }: FindAllPromotersDTO) {
    return await prisma.promoter.findMany({ skip, take: limit, orderBy: { name: 'asc' } });
  }

  async getOneById(id: Promoter['id']) {
    return await prisma.promoter.findFirstOrThrow({ where: { id } });
  }

  async createOne({ name, address, code, phoneNumber, website }: CreatePromoterDTO) {
    return await prisma.promoter.create({ data: { name, address, code, phoneNumber, website } });
  }

  async updateOneById({ id, name, logo, address, code, phoneNumber, website }: UpdatePromoterDTO) {
    return await prisma.promoter.update({
      where: { id },
      data: { name, logo, address, code, phoneNumber, website },
    });
  }

  async deleteOneById(id: Promoter['id']) {
    return await prisma.promoter.delete({ where: { id } });
  }
}

export const promoterRepository = new PromoterRepository();
