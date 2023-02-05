import { UnauthorizedException } from 'next-api-decorators';
import { User } from 'next-auth';
import { Event } from '@prisma/client';
import { userRepository } from '../user/user.repository';
import { eventRepository } from './event.repository';

const isUserInEvent = (user: Awaited<ReturnType<typeof userRepository.getOneByEmail>>, eventId: Event['id']) => {
  return user.userOnEvents.find((event) => event.event.id === eventId);
};

class EventController {
  async findAll() {
    return eventRepository.findAll();
  }
  async findByUserId(userId: string) {
    return eventRepository.findByUserId(userId);
  }
  async getBySubdomain(subdomain: string, email: User['email']) {
    const user = await userRepository.getOneByEmail(email);
    const event = await eventRepository.getBySubdomain(subdomain);

    if (user.role !== 'EXTERNAL') {
      return event;
    }

    if (!isUserInEvent(user, event.id)) {
      throw new UnauthorizedException();
    }

    return event;
  }
}

export const eventController = new EventController();
