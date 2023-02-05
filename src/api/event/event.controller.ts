import { NotFoundException } from 'next-api-decorators';
import { eventRepository } from './event.repository';

class EventController {
  async findAll() {
    return eventRepository.findAll();
  }
  async findByUserId(userId: string) {
    return eventRepository.findByUserId(userId);
  }
  async getBySubdomain(subdomain: string) {
    return eventRepository.getBySubdomain(subdomain);
  }
}

export const eventController = new EventController();
