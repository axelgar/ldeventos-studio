import { BadRequestException } from 'next-api-decorators';
import { User } from '@prisma/client';
import { prisma } from '../../lib/prisma';
import { CreateUserDTO, UpdateUserDTO } from './user.dto';

class UserRepository {
  async findAll() {
    try {
      return prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
          role: true,
          mobileNumber: true,
          userOnEvents: { select: { event: { select: { name: true, logo: true } } } },
        },
      });
    } catch (error) {
      throw new BadRequestException(`There was an error trying to find all users`);
    }
  }

  async getOneById(id: string) {
    return prisma.user.findFirstOrThrow({
      where: { id },
      select: {
        email: true,
        name: true,
        role: true,
        image: true,
        mobileNumber: true,
        userOnEvents: { select: { event: { select: { id: true } } } },
      },
    });
  }

  async getOneByEmail(email: string) {
    return prisma.user.findFirstOrThrow({
      where: { email },
      select: { name: true, role: true, userOnEvents: { select: { event: { select: { id: true } } } } },
    });
  }

  async createOne({ email, name, mobileNumber, role }: CreateUserDTO) {
    return prisma.user.create({ data: { email, name, mobileNumber, role } });
  }

  async updateOneById({ id, name, email, image, role, mobileNumber }: UpdateUserDTO) {
    return prisma.user.update({ where: { id }, data: { name, email, image, role, mobileNumber } });
  }

  async deleteOneById(id: User['id']) {
    'Repository delete';
    return prisma.user.delete({ where: { id } });
  }
}

export const userRepository = new UserRepository();
