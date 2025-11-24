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

        try {
          // Import bcrypt and prisma dynamically to avoid issues
          const bcrypt = await import('bcryptjs');
          const { prisma } = await import('@/lib/prisma');

          // Find user by email
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
            include: {
              clientProfile: true,
              staffProfile: true,
            },
          });

          if (!user || !user.password) {
            return null;
          }

          // Verify password
          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isPasswordValid) {
            return null;
          }

          // Update last login
          await prisma.user.update({
            where: { id: user.id },
            data: { lastLoginAt: new Date() },
          });

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            clientProfile: user.clientProfile,
            staffProfile: user.staffProfile,
          };
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
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
