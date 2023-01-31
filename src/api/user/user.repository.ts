import { prisma } from '../../lib/prisma';

class UserRepository {
  async findAll() {
    return prisma.user.findMany({
      select: {
        name: true,
        image: true,
        role: true,
        _count: true,
        userOnEvents: { select: { event: { select: { name: true, logo: true } } } },
      },
    });
  }

  async findOneByEmail(email: string) {
    return prisma.user.findFirst({ where: { email }, select: { name: true } });
  }
}

export const userRepository = new UserRepository();
