import { BadRequestException } from 'next-api-decorators';
import { prisma } from '../../lib/prisma';

class EventRepository {
  async findAll() {
    try {
      return await prisma.event.findMany();
    } catch (error) {
      throw new BadRequestException(`There was an error trying to get all events`);
    }
  }

  async findByUserId(userId: string) {
    try {
      return await prisma.event.findMany({
        where: { userOnEvents: { some: { userId } } },
        select: { name: true, type: { select: { name: true } }, subdomain: true, logo: true },
      });
    } catch (error) {
      throw new BadRequestException(`There was an error trying to get all events for userId: ${userId}`);
    }
  }

  async getBySubdomain(subdomain: string) {
    try {
      return await prisma.event.findFirst({
        where: { subdomain },
        select: { name: true, logo: true, id: true, type: { select: { name: true } } },
      });
    } catch (error) {
      throw new BadRequestException(`There was an error trying to get an event with subdomain: ${subdomain}`);
    }
  }
}

export const eventRepository = new EventRepository();
