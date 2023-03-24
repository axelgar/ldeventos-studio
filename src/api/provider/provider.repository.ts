import { Provider } from '@prisma/client';
import { prisma } from '../../lib/prisma';
import { CreateProviderDTO, FindAllProvidersDTO, SearchByNameDTO, UpdateProviderDTO } from './provider.dto';

class ProviderRepository {
  async findAll({ skip, limit }: FindAllProvidersDTO) {
    return await prisma.provider.findMany({ skip, take: limit, orderBy: { name: 'asc' } });
  }

  async getOneById(id: Provider['id']) {
    return await prisma.provider.findFirstOrThrow({ where: { id } });
  }

  async createOne({ name, contactName, email, mobileNumber, fax, phoneNumber }: CreateProviderDTO) {
    return await prisma.provider.create({ data: { contactName, name, email, mobileNumber, fax, phoneNumber } });
  }

  async updateOneById({ id, name, contactName, email, mobileNumber, fax, phoneNumber }: UpdateProviderDTO) {
    return await prisma.provider.update({
      where: { id },
      data: { name, email, mobileNumber, contactName, fax, phoneNumber },
    });
  }

  async deleteOneById(id: Provider['id']) {
    return await prisma.provider.delete({ where: { id } });
  }

  async searchByName({ searchTerm }: SearchByNameDTO) {
    return await prisma.provider.findMany({ where: { name: { contains: searchTerm } } });
  }
}

export const providerRepository = new ProviderRepository();
