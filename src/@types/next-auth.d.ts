import NextAuth, { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      role: string;
      eventId: string;
      id: string;
    } & DefaultSession['user'];
  }

  interface User extends DefaultUser {
    role: string;
    eventId: string;
    id: string;
  }
}
