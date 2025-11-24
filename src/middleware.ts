import { NextRequest } from 'next/server';
import { middleware as securityMiddleware } from '@/lib/security-middleware';

export function middleware(request: NextRequest) {
  return securityMiddleware(request);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
