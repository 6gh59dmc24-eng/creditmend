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
        passkeyVerified: { label: 'Passkey Verified', type: 'text' },
        userId: { label: 'User ID', type: 'text' },
      },
      async authorize(credentials) {
        try {
          const { prisma } = await import('@/lib/prisma');

          // Passkey authentication flow
          if (credentials?.passkeyVerified === 'true' && credentials?.userId) {
            console.log('Passkey authentication for user:', credentials.userId);

            const user = await prisma.user.findUnique({
              where: { id: credentials.userId },
              include: {
                clientProfile: true,
                staffProfile: true,
              },
            });

            if (!user) {
              console.log('User not found for passkey auth:', credentials.userId);
              return null;
            }

            console.log('Passkey login successful for:', user.email);

            return {
              id: user.id,
              email: user.email,
              name: user.name,
              role: user.role,
              clientProfile: user.clientProfile,
              staffProfile: user.staffProfile,
            };
          }

          // Password authentication flow
          if (!credentials?.email || !credentials?.password) {
            console.log('Missing credentials');
            return null;
          }

          const bcrypt = await import('bcryptjs');

          console.log('Attempting login for:', credentials.email);

          // Find user by email
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
            include: {
              clientProfile: true,
              staffProfile: true,
            },
          });

          if (!user) {
            console.log('User not found:', credentials.email);
            return null;
          }

          if (!user.password) {
            console.log('User has no password:', credentials.email);
            return null;
          }

          // Verify password
          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isPasswordValid) {
            console.log('Invalid password for:', credentials.email);
            return null;
          }

          console.log('Login successful for:', credentials.email);

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
