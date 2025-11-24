import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../lib/auth';
import { prisma } from '../../../../lib/prisma';

interface TestUser {
  id: string;
  email: string;
  name: string | null;
  role: string;
  isActive: boolean;
  hasPassword: boolean;
  passwordLength: number;
  createdAt: Date;
  lastLoginAt: Date | null;
}

interface UserNotFound {
  error: string;
}

interface DebugInfo {
  timestamp: string;
  environment: string;
  nextAuthUrl: string | undefined;
  hasNextAuthSecret: boolean;
  databaseConnected: boolean;
  sessionExists: boolean;
  sessionUserId: string | null;
  sessionEmail: string | null;
  sessionRole: string | null;
  testEmail: string | null;
  userAgent: string | null;
  origin: string | null;
  referer: string | null;
  testUser?: TestUser | UserNotFound;
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const url = new URL(request.url);
    
    // Check if email parameter is provided for testing specific user
    const testEmail = url.searchParams.get('email');
    
    const debugInfo: DebugInfo = {
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      nextAuthUrl: process.env.NEXTAUTH_URL,
      hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET,
      databaseConnected: true, // We assume if we can respond, DB is working
      sessionExists: !!session,
      sessionUserId: (session as any)?.user?.id || null,
      sessionEmail: session?.user?.email || null,
      sessionRole: (session as any)?.user?.role || null,
      testEmail: testEmail,
      userAgent: request.headers.get('user-agent'),
      origin: request.headers.get('origin'),
      referer: request.headers.get('referer'),
    };

    // If test email is provided, also fetch user info
    if (testEmail) {
      const user = await prisma.user.findUnique({
        where: { email: testEmail },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          isActive: true,
          password: true,
          createdAt: true,
          lastLoginAt: true,
        },
      });

      if (user) {
        const testUser: TestUser = {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          isActive: user.isActive,
          hasPassword: !!user.password,
          passwordLength: user.password ? user.password.length : 0,
          createdAt: user.createdAt,
          lastLoginAt: user.lastLoginAt,
        };
        debugInfo.testUser = testUser;
      } else {
        const notFound: UserNotFound = { error: 'User not found' };
        debugInfo.testUser = notFound;
      }
    }

    return NextResponse.json(debugInfo);
  } catch (error) {
    console.error('Debug endpoint error:', error);
    return NextResponse.json({
      error: 'Debug endpoint failed',
      message: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}