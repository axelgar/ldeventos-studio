import { BadRequestException } from 'next-api-decorators';
import { prisma } from '../../lib/prisma';

class EventRepository {
  async findAll() {
    try {
      return await prisma.event.findMany();
    } catch (error) {
      throw new BadRequestException(`There was an error trying to find all events`);
    }
  }

  async findByUserId(userId: string) {
    try {
      return await prisma.event.findMany({
        where: { userOnEvents: { some: { userId } } },
        select: { name: true, type: { select: { name: true } }, subdomain: true, logo: true },
      });
    } catch (error) {
      throw new BadRequestException(`There was an error trying to find all events for userId: ${userId}`);
    }
  }

  async getBySubdomain(subdomain: string) {
    return await prisma.event.findFirstOrThrow({
      where: { subdomain },
      select: { name: true, logo: true, id: true, type: { select: { name: true } } },
    });
  }
}

export const eventRepository = new EventRepository();
