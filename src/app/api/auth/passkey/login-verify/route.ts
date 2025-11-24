import { NextRequest, NextResponse } from 'next/server';
import { verifyAuthenticationResponse } from '@simplewebauthn/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { credential, rpID, userId } = body;

    if (!credential || !rpID || !userId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get the user and their authenticator
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        authenticators: true,
        clientProfile: true,
        staffProfile: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Find the authenticator that matches the credential ID
    const credentialIDBase64 = Buffer.from(credential.rawId, 'base64').toString('base64');
    const authenticator = user.authenticators.find(
      auth => auth.credentialID === credentialIDBase64
    );

    if (!authenticator) {
      return NextResponse.json(
        { error: 'Authenticator not found' },
        { status: 404 }
      );
    }

    // Verify the authentication response
    const verification = await verifyAuthenticationResponse({
      response: credential,
      expectedChallenge: Buffer.from(credential.response.clientDataJSON).toString('base64url'),
      expectedOrigin: process.env.NEXTAUTH_URL?.includes('localhost')
        ? `http://localhost:${process.env.PORT || 3000}`
        : 'https://creditmend.org',
      expectedRPID: rpID,
      authenticator: {
        credentialID: Buffer.from(authenticator.credentialID, 'base64'),
        credentialPublicKey: Buffer.from(authenticator.credentialPublicKey, 'base64'),
        counter: Number(authenticator.counter),
      },
    });

    const { verified, authenticationInfo } = verification;

    if (!verified) {
      return NextResponse.json(
        { error: 'Passkey verification failed' },
        { status: 400 }
      );
    }

    // Update the counter
    const { newCounter } = authenticationInfo;
    await prisma.authenticator.update({
      where: { id: authenticator.id },
      data: { counter: BigInt(newCounter) },
    });

    // Update last login time
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    // Return user data for NextAuth session
    return NextResponse.json({
      verified: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        clientProfile: user.clientProfile,
        staffProfile: user.staffProfile,
      },
    });
  } catch (error) {
    console.error('Passkey authentication error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to authenticate with passkey' },
      { status: 500 }
    );
  }
}
