import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { Webhook } from 'svix';
import { WebhookEvent } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';

/**
 * Clerk Webhook Handler
 *
 * This endpoint handles Clerk webhook events for user lifecycle management.
 * Critical for syncing Clerk users to the local database.
 *
 * SECURITY:
 * - Uses Svix to verify webhook signatures
 * - Requires CLERK_WEBHOOK_SECRET environment variable
 * - All requests must be signed by Clerk
 *
 * Setup Instructions:
 * 1. Go to Clerk Dashboard > Webhooks
 * 2. Add endpoint: https://your-domain.com/api/webhooks/clerk
 * 3. Subscribe to events: user.created, user.updated, user.deleted
 * 4. Copy webhook secret to .env.local as CLERK_WEBHOOK_SECRET
 */

export async function POST(req: NextRequest) {
  // Get the webhook secret from environment
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    console.error('CLERK_WEBHOOK_SECRET not configured');
    return new NextResponse('Webhook secret not configured', { status: 500 });
  }

  // Get the headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new NextResponse('Missing svix headers', { status: 400 });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your webhook secret
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the webhook signature
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return new NextResponse('Invalid signature', { status: 400 });
  }

  // Handle the webhook event
  const eventType = evt.type;

  try {
    switch (eventType) {
      case 'user.created': {
        const { id, email_addresses, first_name, last_name, username } = evt.data;
        const email = email_addresses[0]?.email_address;

        if (!email) {
          console.error('No email found in user.created event');
          return new NextResponse('No email provided', { status: 400 });
        }

        // Create user in database
        const user = await prisma.user.create({
          data: {
            id: id, // Use Clerk user ID as the primary key
            email: email,
            name: first_name ? `${first_name} ${last_name || ''}`.trim() : username || email,
            role: 'CLIENT', // Default role
            emailVerified: new Date(), // Clerk handles email verification
          },
        });

        // Create client profile
        await prisma.clientProfile.create({
          data: {
            userId: user.id,
            clientNumber: `CR${Date.now().toString().slice(-6)}`,
            onboardingStatus: 'PENDING',
          },
        });

        console.log('✅ User synced to database:', user.id);
        break;
      }

      case 'user.updated': {
        const { id, email_addresses, first_name, last_name, username } = evt.data;
        const email = email_addresses[0]?.email_address;

        if (!email) {
          console.error('No email found in user.updated event');
          return new NextResponse('No email provided', { status: 400 });
        }

        // Update user in database
        await prisma.user.update({
          where: { id: id },
          data: {
            email: email,
            name: first_name ? `${first_name} ${last_name || ''}`.trim() : username || email,
          },
        });

        console.log('✅ User updated in database:', id);
        break;
      }

      case 'user.deleted': {
        const { id } = evt.data;

        if (!id) {
          console.error('No user ID found in user.deleted event');
          return new NextResponse('No user ID provided', { status: 400 });
        }

        // Soft delete or hard delete based on your requirements
        // For PII compliance, you might want to anonymize instead of delete
        await prisma.user.update({
          where: { id: id },
          data: {
            email: `deleted_${id}@deleted.local`,
            name: 'Deleted User',
            // Add any other anonymization logic here
          },
        });

        console.log('✅ User anonymized in database:', id);
        break;
      }

      default:
        console.log(`Unhandled webhook event type: ${eventType}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Webhook handler error:', error);
    return new NextResponse('Internal server error', { status: 500 });
  }
}
