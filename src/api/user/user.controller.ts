import { User } from '@prisma/client';
import { BadRequestException } from 'next-api-decorators';
import { CreateUserDTO, UpdateUserDTO } from './user.dto';
import { userRepository } from './user.repository';

class UserController {
  async findAll() {
    return await userRepository.findAll();
  }

  async getOneByEmail(email: User['email']) {
    return await userRepository.getOneByEmail(email);
  }

  async createOne(data: CreateUserDTO) {
    return await userRepository.createOne(data);
  }

  async updateOneById(data: UpdateUserDTO) {
    return await userRepository.updateOneById(data);
  }

  async deleteOneById(id: User['id']) {
    try {
      userRepository.deleteOneById(id);
      return { message: 'User successfully deleted' };
    } catch (error) {
      throw new BadRequestException(`There was an error trying to delete this user ${id}`);
    }
  }
}

export const userController = new UserController();
