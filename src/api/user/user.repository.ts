import { prisma } from '../../lib/prisma';

class UserRepository {
  async findOneByEmail(email: string) {
    return prisma.user.findFirst({ where: { email }, select: { name: true } });
  }
}

export const userRepository = new UserRepository();
