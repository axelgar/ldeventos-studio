import { CreateUserDTO } from './user.dto';
import { userRepository } from './user.repository';

class UserController {
  async findAll() {
    return await userRepository.findAll();
  }

  async getOneByEmail(email: string) {
    return await userRepository.getOneByEmail(email);
  }

  async createOne({ email, name, image, mobileNumber, role }: CreateUserDTO) {
    return await userRepository.createOne({ email, name, image, mobileNumber, role });
  }
}

export const userController = new UserController();
