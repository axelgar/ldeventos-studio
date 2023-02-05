import NextAuth, { DefaultSession, DefaultUser } from 'next-auth';
import { DefaultJWT, JWT } from 'next-auth/jwt';
import { Role } from '@prisma/client';

declare module 'next-auth' {
  interface Session {
    user: User & DefaultSession['user'];
  }

  interface User extends DefaultUser {
    role: Role;
    id: string;
    email: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user: {
      role: Role;
      id: string;
      email: string;
    };
  }
}
