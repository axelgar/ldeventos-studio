import { Provider } from '@prisma/client';
import { prisma } from '../../lib/prisma';
import { CreateProviderDTO, FindAllProvidersDTO, UpdateProviderDTO } from './provider.dto';

class ProviderRepository {
  async findAll({ skip, limit }: FindAllProvidersDTO) {
    return await prisma.provider.findMany({ skip, take: limit });
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
}

export const providerRepository = new ProviderRepository();
