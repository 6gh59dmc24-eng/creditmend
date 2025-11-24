import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json(
        { error: 'Verification token is required' },
        { status: 400 }
      );
    }

    console.log('Verifying email with token:', token.substring(0, 10) + '...');

    // Find user with this token
    // Note: In production, you'd want to add a verificationToken field to the User model
    // For now, we'll use a simple approach with the token in the URL
    const userId = Buffer.from(token, 'base64').toString('utf-8');

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid verification token' },
        { status: 400 }
      );
    }

    // Update user as verified
    await prisma.user.update({
      where: { id: user.id },
      data: { emailVerified: new Date() },
    });

    console.log('Email verified for user:', user.email);

    // Redirect to success page or dashboard
    return NextResponse.redirect(new URL('/auth/signin?verified=true', request.url));
  } catch (error) {
    console.error('Email verification error:', error);
    return NextResponse.json(
      { error: 'Failed to verify email' },
      { status: 500 }
    );
  }
}
