import { NextRequest, NextResponse } from 'next/server';

// Sample login credentials for testing
const SAMPLE_USERS = {
  'admin@creditrepair.com': {
    email: 'admin@creditrepair.com',
    password: 'Admin123!@#',
    name: 'Admin User',
    role: 'ADMIN',
  },
  'agent@creditrepair.com': {
    email: 'agent@creditrepair.com',
    password: 'Agent123!@#',
    name: 'Agent User',
    role: 'AGENT',
  },
  'client@creditrepair.com': {
    email: 'client@creditrepair.com',
    password: 'Client123!@#',
    name: 'Client User',
    role: 'CLIENT',
  },
};

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Check against sample users
    const user = SAMPLE_USERS[email as keyof typeof SAMPLE_USERS];

    if (!user || user.password !== password) {
      return NextResponse.json(
        { success: false, error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Login failed' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Sample Login API',
    users: Object.keys(SAMPLE_USERS),
    instructions: {
      admin: 'admin@creditrepair.com / Admin123!@#',
      agent: 'agent@creditrepair.com / Agent123!@#',
      client: 'client@creditrepair.com / Client123!@#',
    },
  });
}
