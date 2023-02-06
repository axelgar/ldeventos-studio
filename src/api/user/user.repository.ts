import { BadRequestException } from 'next-api-decorators';
import { prisma } from '../../lib/prisma';
import { CreateUserDTO } from './user.dto';

class UserRepository {
  async findAll() {
    try {
      return prisma.user.findMany({
        select: {
          name: true,
          email: true,
          image: true,
          role: true,
          mobileNumber: true,
          _count: true,
          userOnEvents: { select: { event: { select: { name: true, logo: true } } } },
        },
      });
    } catch (error) {
      throw new BadRequestException(`There was an error trying to find all users`);
    }
  }

  async getOneByEmail(email: string) {
    return prisma.user.findFirstOrThrow({
      where: { email },
      select: { name: true, role: true, userOnEvents: { select: { event: { select: { id: true } } } } },
    });
  }

  async createOne(data: CreateUserDTO) {
    return prisma.user.create({ data });
  }
}

export const userRepository = new UserRepository();
