import { eventController } from '@/api/event/event.controller';
import { Auth } from '@/api/utils/auth-middleware';
import type { NextApiRequest, NextApiResponse } from 'next';
import { createHandler, Get, NotFoundException, Param, Req, Res } from 'next-api-decorators';
import { getServerSession } from 'next-auth';
import invariant from 'tiny-invariant';
import { authOptions } from '../auth/[...nextauth]';

class EventHandler {
  @Get()
  @Auth('ADMIN', 'MEMBER')()
  async findAll() {
    return await eventController.findAll();
  }

  @Get('/:subdomain')
  @Auth()()
  async getBySubdomain(@Param('subdomain') subdomain: string, @Req() req: NextApiRequest, @Res() res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions);
    invariant(session);
    const event = await eventController.getBySubdomain(subdomain, session?.user.email);
    if (!event) {
      return new NotFoundException();
    }
    return event;
  }

  @Get('/user/:userId')
  @Auth()()
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
