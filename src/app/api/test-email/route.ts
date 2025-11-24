import { NextRequest, NextResponse } from 'next/server';
import { testResendConfig, sendVerificationEmail } from '@/lib/email';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email') || 'test@example.com';

    console.log('=== EMAIL TEST START ===');
    console.log('Testing email:', email);
    console.log('RESEND_API_KEY set:', !!process.env.RESEND_API_KEY);
    console.log('RESEND_API_KEY length:', process.env.RESEND_API_KEY?.length);
    console.log('NEXTAUTH_URL:', process.env.NEXTAUTH_URL);

    // Test Resend configuration
    const configTest = await testResendConfig();
    console.log('Config test:', configTest);

    // Try to send a test verification email
    const result = await sendVerificationEmail(
      email,
      'Test User',
      'test-user-id-12345'
    );

    console.log('Email send result:', result);
    console.log('=== EMAIL TEST END ===');

    return NextResponse.json({
      resendConfigured: !!process.env.RESEND_API_KEY,
      apiKeyLength: process.env.RESEND_API_KEY?.length,
      configTest,
      sendResult: result,
      testEmail: email,
    });
  } catch (error) {
    console.error('Email test error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}
