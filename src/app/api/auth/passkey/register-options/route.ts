import { NextRequest, NextResponse } from 'next/server';
import { generateRegistrationOptions } from '@simplewebauthn/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const rpName = 'CreditMend';
    const rpID = process.env.NEXTAUTH_URL?.includes('localhost')
      ? 'localhost'
      : 'creditmend.org';
    const userID = session.user.id;
    const userName = session.user.email || 'user@creditmend.org';
    const userDisplayName = session.user.name || 'User';

    const options = await generateRegistrationOptions({
      rpName,
      rpID,
      userID,
      userName,
      userDisplayName,
      attestationType: 'none',
      authenticatorSelection: {
        residentKey: 'preferred',
        userVerification: 'preferred',
        authenticatorAttachment: 'platform',
      },
    });

    // Store challenge in session or database
    // For now, we'll return it and let the client handle it
    return NextResponse.json({
      options,
      rpID,
    });
  } catch (error) {
    console.error('Error generating passkey registration options:', error);
    return NextResponse.json(
      { error: 'Failed to generate registration options' },
      { status: 500 }
    );
  }
}
