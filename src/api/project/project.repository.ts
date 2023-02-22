import { BadRequestException } from 'next-api-decorators';
import { prisma } from '../../lib/prisma';

class ProjectRepository {
  async findAll() {
    try {
      return await prisma.project.findMany();
    } catch (error) {
      throw new BadRequestException(`There was an error trying to find all projects`);
    }
  }

  async findByUserId(userId: string) {
    try {
      return await prisma.project.findMany({
        where: { userOnProject: { some: { userId } } },
        select: { name: true, type: { select: { name: true } }, subdomain: true, logo: true },
      });
    } catch (error) {
      throw new BadRequestException(`There was an error trying to find all projects for userId: ${userId}`);
    }
  }

  async getBySubdomain(subdomain: string) {
    return await prisma.project.findFirstOrThrow({
      where: { subdomain },
      select: { name: true, logo: true, id: true, type: { select: { name: true } } },
    });
  }
}

export const projectRepository = new ProjectRepository();
