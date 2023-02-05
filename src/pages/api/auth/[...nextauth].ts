import NextAuth, { NextAuthOptions } from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '../../../lib/prisma';
import { userController } from '@/api/user/user.controller';
import { cookiesOptions } from '@/config';

// TODO: review issue found on prisma-adapter => https://github.com/nextauthjs/next-auth/issues/4495

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  cookies: cookiesOptions,
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
    async session({ session, token }) {
      session.user.id = token.user.id;
      session.user.role = token.user.role;
      session.user.eventId = token.user.eventId;
      return session;
    },
    async jwt({ token, user }) {
      if (!token.user?.id && user) {
        token.user.id = user.id;
        token.user.eventId = user.eventId;
        token.user.role = user.role;
      }
      return token;
    },
  },
  theme: {
    colorScheme: 'light',
    brandColor: 'FA4D62',
    logo: 'https://www.ldeventos.com/wp-content/uploads/2014/07/logo-LD_3.png',
    buttonText: '',
  },
};

export default NextAuth(authOptions);
