import NextAuth, { DefaultSession, DefaultUser } from 'next-auth';
import { DefaultJWT, JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: User & DefaultSession['user'];
  }

  interface User extends DefaultUser {
    role: string;
    eventId: string;
    id: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user: {
      role: string;
      eventId: string;
      id: string;
    };
  }
}
