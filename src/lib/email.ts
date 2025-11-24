import { Resend } from 'resend';

// Initialize Resend with API key
// In production, this should be in process.env
const resend = new Resend(process.env.RESEND_API_KEY);

export const sendWelcomeEmail = async (email: string, name: string) => {
  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY is not set. Email sending skipped.');
    return;
  }

  try {
    await resend.emails.send({
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
                <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://onboard.creditmend.org'}/dashboard" class="button">Go to Dashboard</a>
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
    console.log(`Welcome email sent to ${email}`);
  } catch (error) {
    console.error('Failed to send welcome email:', error);
    // Don't throw error to prevent blocking the signup flow
  }
};
