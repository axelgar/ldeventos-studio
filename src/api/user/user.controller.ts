import { NotFoundException } from 'next-api-decorators/dist/exceptions';
import { userRepository } from './user.repository';

class UserController {
  async findAll() {
    return await userRepository.findAll();
  }

  async findOneByEmail(email: string) {
    const user = await userRepository.findOneByEmail(email);
    if (!user) {
      throw new NotFoundException(`User not found with email ${email}`);
    }
    return user;
  }
}

export const userController = new UserController();
