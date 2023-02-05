import { Role } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { createMiddlewareDecorator, NextFunction, UnauthorizedException } from 'next-api-decorators';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../pages/api/auth/[...nextauth]';

export const Auth = (...roles: Role[]) =>
  createMiddlewareDecorator(async (req: NextApiRequest, res: NextApiResponse, next: NextFunction) => {
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      throw new UnauthorizedException();
    }

    // If no roles specified allow for ALL
    if (!roles.length) {
      next();
    }

    if (!roles.includes(session.user.role)) {
      throw new UnauthorizedException();
    }

    next();
  });
