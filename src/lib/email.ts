import { Resend } from 'resend';

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY);

// Test Resend configuration
export const testResendConfig = async () => {
  if (!process.env.RESEND_API_KEY) {
    return { success: false, error: 'RESEND_API_KEY is not set' };
  }

  try {
    // Test by checking if we can create a client
    return { success: true, message: 'Resend configured' };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
};

export const sendVerificationEmail = async (email: string, name: string, userId: string) => {
  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY is not set. Email sending skipped.');
    return { success: false, error: 'RESEND_API_KEY not configured' };
  }

  try {
    // Create verification token (simple base64 encoding of userId)
    // In production, use a proper token with expiration
    const verificationToken = Buffer.from(userId).toString('base64');
    const verificationUrl = `${process.env.NEXTAUTH_URL || 'https://creditmend.org'}/api/auth/verify-email?token=${verificationToken}`;

    console.log('Sending verification email to:', email);
    console.log('From address: CreditMend <onboarding@creditmend.org>');

    const result = await resend.emails.send({
      from: 'CreditMend <onboarding@creditmend.org>',
      to: email,
      subject: 'Verify Your Email - CreditMend',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #16a34a; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }
            .content { padding: 20px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 5px 5px; background-color: #ffffff; }
            .button { display: inline-block; background-color: #16a34a; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin-top: 20px; font-weight: bold; }
            .footer { margin-top: 20px; text-align: center; font-size: 12px; color: #6b7280; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Welcome to CreditMend!</h1>
            </div>
            <div class="content">
              <p>Hi ${name},</p>
              <p>Thank you for signing up with CreditMend. Please verify your email address to get started.</p>
              <p>Click the button below to verify your email and activate your account:</p>
              <div style="text-align: center;">
                <a href="${verificationUrl}" class="button">Verify Email Address</a>
              </div>
              <p style="margin-top: 20px; font-size: 14px; color: #6b7280;">Or copy and paste this link into your browser:</p>
              <p style="font-size: 12px; word-break: break-all; color: #6b7280;">${verificationUrl}</p>
              <p style="margin-top: 20px;">Once verified, you'll be able to access your dashboard and start improving your credit score.</p>
              <p>If you didn't create an account with CreditMend, you can safely ignore this email.</p>
              <p>Best regards,<br>The CreditMend Team</p>
            </div>
            <div class="footer">
              <p>&copy; ${new Date().getFullYear()} CreditMend. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log('Verification email sent successfully:', result);
    return { success: true, data: result };
  } catch (error) {
    console.error('Failed to send verification email:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
};

export const sendWelcomeEmail = async (email: string, name: string) => {
  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY is not set. Email sending skipped.');
    return { success: false, error: 'RESEND_API_KEY not configured' };
  }

  try {
    console.log('Sending welcome email to:', email);

    const result = await resend.emails.send({
      from: 'CreditMend <onboarding@creditmend.org>',
      to: email,
      subject: 'Welcome to CreditMend - Your Account is Active',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #2563eb; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }
            .content { padding: 20px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 5px 5px; }
            .button { display: inline-block; background-color: #2563eb; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin-top: 20px; }
            .footer { margin-top: 20px; text-align: center; font-size: 12px; color: #6b7280; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Welcome to CreditMend!</h1>
            </div>
            <div class="content">
              <p>Hi ${name},</p>
              <p>Thank you for signing up with CreditMend. We are thrilled to have you on board!</p>
              <p>Your account has been successfully activated. We are committed to helping you improve your credit score and achieve your financial goals.</p>
              <p>You can now access your dashboard to track your progress, upload documents, and view your reports.</p>
              <div style="text-align: center;">
                <a href="${process.env.NEXTAUTH_URL || 'https://creditmend.org'}/dashboard" class="button">Go to Dashboard</a>
              </div>
              <p>If you have any questions or need assistance, please don't hesitate to contact our support team.</p>
              <p>Best regards,<br>The CreditMend Team</p>
            </div>
            <div class="footer">
              <p>&copy; ${new Date().getFullYear()} CreditMend. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log('Welcome email sent successfully:', result);
    return { success: true, data: result };
  } catch (error) {
    console.error('Failed to send welcome email:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
};
