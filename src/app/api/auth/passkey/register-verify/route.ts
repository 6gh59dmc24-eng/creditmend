import { NextRequest, NextResponse } from 'next/server';
import { verifyRegistrationResponse } from '@simplewebauthn/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { credential, rpID } = body;

    if (!credential || !rpID) {
      return NextResponse.json(
        { error: 'Missing credential or rpID' },
        { status: 400 }
      );
    }

    // Get the challenge from the credential response
    // In production, you should store the challenge in the session or database
    // and retrieve it here to verify against
    const expectedChallenge = credential.response.clientDataJSON;

    // Verify the registration response
    const verification = await verifyRegistrationResponse({
      response: credential,
      expectedChallenge: Buffer.from(credential.response.clientDataJSON).toString('base64url'),
      expectedOrigin: process.env.NEXTAUTH_URL?.includes('localhost')
        ? `http://localhost:${process.env.PORT || 3000}`
        : 'https://creditmend.org',
      expectedRPID: rpID,
    });

    const { verified, registrationInfo } = verification;

    if (!verified || !registrationInfo) {
      return NextResponse.json(
        { error: 'Passkey verification failed' },
        { status: 400 }
      );
    }

    const {
      credentialID,
      credentialPublicKey,
      counter,
      credentialDeviceType,
      credentialBackedUp,
    } = registrationInfo;

    // Check if this credential already exists
    const existingCredential = await prisma.authenticator.findUnique({
      where: { credentialID: Buffer.from(credentialID).toString('base64') },
    });

    if (existingCredential) {
      return NextResponse.json(
        { error: 'This passkey is already registered' },
        { status: 400 }
      );
    }

    // Store the credential in the database
    await prisma.authenticator.create({
      data: {
        userId: session.user.id,
        credentialID: Buffer.from(credentialID).toString('base64'),
        credentialPublicKey: Buffer.from(credentialPublicKey).toString('base64'),
        counter: BigInt(counter),
        credentialDeviceType,
        credentialBackedUp,
        transports: credential.response.transports
          ? JSON.stringify(credential.response.transports)
          : null,
      },
    });

    return NextResponse.json({
      verified: true,
      message: 'Passkey registered successfully',
    });
  } catch (error) {
    console.error('Passkey verification error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to verify passkey' },
      { status: 500 }
    );
  }
}
