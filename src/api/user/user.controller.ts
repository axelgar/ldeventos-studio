import { User } from '@prisma/client';
import { BadRequestException } from 'next-api-decorators';
import { fileStorageService } from '@/lib/file-storage-service';
import { CreateUserDTO, UpdateUserDTO } from './user.dto';
import { userRepository } from './user.repository';

class UserController {
  private readonly userRepository = userRepository;

  async findAll() {
    return await this.userRepository.findAll();
  }

  async getOneById(id: User['id']) {
    return await this.userRepository.getOneById(id);
  }

  async getOneByEmail(email: User['email']) {
    return await this.userRepository.getOneByEmail(email);
  }

  async createOne(data: CreateUserDTO) {
    return await this.userRepository.createOne(data);
  }

  async updateOneById(data: UpdateUserDTO) {
    return await this.userRepository.updateOneById(data);
  }

  async deleteOneById(id: User['id']) {
    try {
      fileStorageService.deleteFilesFromFolder(id);
      await this.userRepository.deleteOneById(id);
      return { message: 'User successfully deleted' };
    } catch (error) {
      throw new BadRequestException(`There was an error trying to delete this user ${id}`);
    }
  }
}

export const userController = new UserController();
