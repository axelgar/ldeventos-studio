import { eventController } from '@/api/event/event.controller';
import { Body, createHandler, Get, NotFoundException, Param, Post, ValidationPipe } from 'next-api-decorators';

class EventHandler {
  @Get()
  async findAll() {
    return await eventController.findAll();
  }

  @Get('/user/:userId')
  async findByUserId(@Param('userId') userId: string) {
    const events = await eventController.findByUserId(userId);
    return events;
  }

  // @Post()
  // async createOne(@Body(ValidationPipe) { name, logo, subdomain }: CreateStudioDTO) {
  //   const createdStudio = studioController.createOne({ name, logo, subdomain });
  //   return createdStudio;
  // }
}

export default createHandler(EventHandler);
