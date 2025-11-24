import { NextResponse } from 'next/server';

// Simple health check endpoint for Coolify
// Returns 200 OK if the application is running
export async function GET() {
  return NextResponse.json(
    {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    },
    { status: 200 }
  );
}

export async function HEAD() {
  // Support HEAD requests for health checks
  return new NextResponse(null, { status: 200 });
}
