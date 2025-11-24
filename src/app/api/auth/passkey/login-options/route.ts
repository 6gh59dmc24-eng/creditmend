import { NextRequest, NextResponse } from 'next/server';
import { generateAuthenticationOptions } from '@simplewebauthn/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        authenticators: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    if (!user.authenticators || user.authenticators.length === 0) {
      return NextResponse.json(
        { error: 'No passkeys registered for this account' },
        { status: 400 }
      );
    }

    const rpID = process.env.NEXTAUTH_URL?.includes('localhost')
      ? 'localhost'
      : 'creditmend.org';

    // Convert stored authenticators to the format expected by generateAuthenticationOptions
    const allowCredentials = user.authenticators.map(auth => ({
      id: auth.credentialID, // Already stored as base64url string
      transports: auth.transports ? JSON.parse(auth.transports) : undefined,
    }));

    const options = await generateAuthenticationOptions({
      rpID,
      allowCredentials,
      userVerification: 'preferred',
    });

    return NextResponse.json({
      options,
      rpID,
      userId: user.id,
    });
  } catch (error) {
    console.error('Error generating passkey login options:', error);
    return NextResponse.json(
      { error: 'Failed to generate login options' },
      { status: 500 }
    );
  }
}
