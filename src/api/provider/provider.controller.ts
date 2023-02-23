import { Provider } from '@prisma/client';
import { BadRequestException, NotFoundException } from 'next-api-decorators';
import { CreateProviderDTO, FindAllProvidersDTO, UpdateProviderDTO } from './provider.dto';
import { providerRepository } from './provider.repository';

class ProviderController {
  private readonly providerRepository = providerRepository;

  async findAll({ skip = 0, limit = 100 }: FindAllProvidersDTO = { skip: 0, limit: 100 }) {
    return await this.providerRepository.findAll({ skip, limit });
  }

  async getOneById(id: Provider['id']) {
    return await this.providerRepository.getOneById(id);
  }

  async createOne(provider: CreateProviderDTO) {
    try {
      return await this.providerRepository.createOne(provider);
    } catch (error) {
      throw new BadRequestException('There was an error trying to create the provider');
    }
  }

  async updateOneById(data: UpdateProviderDTO) {
    try {
      return await this.providerRepository.updateOneById(data);
    } catch (error) {
      throw new BadRequestException(`There was an error trying to update the provider with id: ${data.id}`);
    }
  }

  async deleteOneById(id: Provider['id']) {
    try {
      await this.providerRepository.deleteOneById(id);
      return { message: 'Provider successfully deleted' };
    } catch (error) {
      throw new BadRequestException(`There was an error trying to delete provider with id: ${id}`);
    }
  }
}

export const providerController = new ProviderController();
