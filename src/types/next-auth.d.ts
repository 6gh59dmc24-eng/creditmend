import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role: string;
      clientProfile?: unknown;
      staffProfile?: unknown;
    } & DefaultSession['user'];
  }

  interface User {
    role: string;
    clientProfile?: unknown;
    staffProfile?: unknown;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role: string;
    clientProfile?: unknown;
    staffProfile?: unknown;
  }
}
