import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';

// Test endpoint to manually verify login works
export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    console.log('=== TEST LOGIN START ===');
    console.log('Email:', email);
    console.log('Password provided:', password ? 'Yes' : 'No');
    console.log('Password length:', password?.length);

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        clientProfile: true,
        staffProfile: true,
      },
    });

    console.log('User found:', user ? 'Yes' : 'No');
    if (user) {
      console.log('User ID:', user.id);
      console.log('User name:', user.name);
      console.log('User role:', user.role);
      console.log('Has password:', user.password ? 'Yes' : 'No');
      console.log('Password hash length:', user.password?.length);
      console.log('Password hash preview:', user.password?.substring(0, 20) + '...');
    }

    if (!user || !user.password) {
      return NextResponse.json({
        success: false,
        message: 'User not found or no password set',
        details: {
          userExists: !!user,
          hasPassword: !!user?.password,
        },
      });
    }

    // Test password
    console.log('Testing password with bcrypt.compare...');
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log('Password valid:', isPasswordValid);

    console.log('=== TEST LOGIN END ===');

    return NextResponse.json({
      success: isPasswordValid,
      message: isPasswordValid ? 'Login would succeed' : 'Password incorrect',
      details: {
        userId: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        hasClientProfile: !!user.clientProfile,
        hasStaffProfile: !!user.staffProfile,
        passwordMatch: isPasswordValid,
      },
    });
  } catch (error) {
    console.error('Test login error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
