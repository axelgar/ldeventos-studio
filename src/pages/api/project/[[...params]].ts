import { projectController } from '@/api/project/project.controller';
import { Auth } from '@/api/utils/auth-middleware';
import type { NextApiRequest, NextApiResponse } from 'next';
import { createHandler, Get, NotFoundException, Param, Req, Res } from 'next-api-decorators';
import { getServerSession } from 'next-auth';
import invariant from 'tiny-invariant';
import { authOptions } from '../auth/[...nextauth]';

class ProjectHandler {
  @Get()
  @Auth('ADMIN', 'MEMBER')()
  async findAll() {
    return await projectController.findAll();
  }

  @Get('/:subdomain')
  @Auth()()
  async getBySubdomain(@Param('subdomain') subdomain: string, @Req() req: NextApiRequest, @Res() res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions);
    invariant(session);
    const project = await projectController.getBySubdomain(subdomain, session?.user.email);
    if (!project) {
      return new NotFoundException();
    }
    return project;
  }

  @Get('/user/:userId')
  @Auth()()
  async findByUserId(@Param('userId') userId: string) {
    const project = await projectController.findByUserId(userId);
    return project;
  }

  // @Post()
  // async createOne(@Body(ValidationPipe) { name, logo, subdomain }: CreateStudioDTO) {
  //   const createdStudio = studioController.createOne({ name, logo, subdomain });
  //   return createdStudio;
  // }
}

export default createHandler(ProjectHandler);
