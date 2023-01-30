import NextAuth from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '../../../lib/prisma';
import { userController } from '@/api/user/user.controller';

const VERCEL_DEPLOYMENT = !!process.env.VERCEL_URL;

// TODO: review issue found on prisma-adapter => https://github.com/nextauthjs/next-auth/issues/4495

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
  ],
  cookies: {
    sessionToken: {
      name: `${VERCEL_DEPLOYMENT ? '__Secure-' : ''}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        domain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN,
        secure: VERCEL_DEPLOYMENT,
      },
    },
  },
  callbacks: {
    signIn: async ({ user }) => {
      if (!user.email) {
        return false;
      }

      try {
        await userController.findOneByEmail(user.email);
        return Boolean(user);
      } catch (error) {
        return false;
      }
    },
    session: ({ session, user }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
          studioId: user.eventId,
          role: user.role,
        },
      };
    },
  },
  theme: {
    colorScheme: 'auto',
    brandColor: '',
    logo: 'https://logos-world.net/wp-content/uploads/2021/10/Sonic-Logo.png',
    buttonText: '',
  },
});
