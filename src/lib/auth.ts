import NextAuth, {
  type NextAuthOptions,
  type Session,
  type User,
} from 'next-auth';
import type { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  // Temporarily disabled adapter: PrismaAdapter(prisma) as any,
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Sample users for testing
        const SAMPLE_USERS = {
          'admin@creditrepair.com': {
            password: 'Admin123!@#',
            name: 'Admin User',
            role: 'ADMIN',
          },
          'agent@creditrepair.com': {
            password: 'Agent123!@#',
            name: 'Agent User',
            role: 'AGENT',
          },
          'client@creditrepair.com': {
            password: 'Client123!@#',
            name: 'Client User',
            role: 'CLIENT',
          },
        };

        const user =
          SAMPLE_USERS[credentials.email as keyof typeof SAMPLE_USERS];

        if (!user || user.password !== credentials.password) {
          return null;
        }

        return {
          id: credentials.email,
          email: credentials.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt' as const,
  },
  callbacks: {
    async jwt({
      token,
      user,
    }: {
      token: JWT;
      user?: User | null;
    }): Promise<JWT> {
      if (user) {
        token.role = user.role;
        token.clientProfile = user.clientProfile;
        token.staffProfile = user.staffProfile;
      }

      if (!token.role) {
        token.role = 'CLIENT';
      }

      return token;
    },
    async session({
      session,
      token,
    }: {
      session: Session;
      token: JWT;
    }): Promise<Session> {
      if (session.user) {
        if (token.sub) {
          session.user.id = token.sub;
        }
        session.user.role = token.role;
        if (token.clientProfile !== undefined) {
          session.user.clientProfile = token.clientProfile;
        }
        if (token.staffProfile !== undefined) {
          session.user.staffProfile = token.staffProfile;
        }
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
};

const nextAuthInstance = NextAuth(authOptions);

export const handlers = nextAuthInstance.handlers;
export const auth = nextAuthInstance.auth;
export const signIn = nextAuthInstance.signIn;
export const signOut = nextAuthInstance.signOut;
