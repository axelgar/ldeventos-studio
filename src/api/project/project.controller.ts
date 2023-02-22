import { UnauthorizedException } from 'next-api-decorators';
import { User } from 'next-auth';
import { Project } from '@prisma/client';
import { userRepository } from '../user/user.repository';
import { projectRepository } from './project.repository';

const isUserInProject = (user: Awaited<ReturnType<typeof userRepository.getOneByEmail>>, projectId: Project['id']) => {
  return user.userOnProjects.find((project) => project.project.id === projectId);
};

class ProjectController {
  async findAll() {
    return projectRepository.findAll();
  }
  async findByUserId(userId: string) {
    return projectRepository.findByUserId(userId);
  }
  async getBySubdomain(subdomain: string, email: User['email']) {
    const user = await userRepository.getOneByEmail(email);
    const project = await projectRepository.getBySubdomain(subdomain);

    if (user.role !== 'EXTERNAL') {
      return project;
    }

    if (!isUserInProject(user, project.id)) {
      throw new UnauthorizedException();
    }

    return project;
  }
}

export const projectController = new ProjectController();
