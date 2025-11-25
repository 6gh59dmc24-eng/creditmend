import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import SecurityUtils from '@/lib/security';

// Define protected routes that require authentication
const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/business/dashboard(.*)',
  '/wealth/dashboard(.*)',
]);

export default clerkMiddleware(async (auth, req: NextRequest) => {
  // Apply Clerk authentication
  if (isProtectedRoute(req)) {
    const { userId } = await auth();
    if (!userId) {
      const signInUrl = new URL('/auth/signin', req.url);
      signInUrl.searchParams.set('redirect_url', req.url);
      return NextResponse.redirect(signInUrl);
    }
  }

  // Apply security middleware
  const response = NextResponse.next();
  const clientIP = SecurityUtils.getClientIP(req);
  const userAgent = req.headers.get('user-agent') || 'unknown';

  // Rate limiting
  const rateLimit = SecurityUtils.checkRateLimit(clientIP, 100, 15 * 60 * 1000);
  if (!rateLimit.allowed) {
    SecurityUtils.logSecurityEvent(
      'RATE_LIMIT_EXCEEDED',
      undefined,
      clientIP,
      userAgent
    );
    return NextResponse.json(
      { error: 'Too many requests' },
      {
        status: 429,
        headers: {
          'Retry-After': Math.ceil(
            (rateLimit.resetTime - Date.now()) / 1000
          ).toString(),
        },
      }
    );
  }

  // Security headers
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  // Content Security Policy - Updated for Clerk
  const cspNonce = SecurityUtils.getCSPNonce();
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://*.clerk.accounts.dev",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https: https://img.clerk.com",
    "font-src 'self'",
    "connect-src 'self' https://api.stripe.com https://js.stripe.com https://*.clerk.accounts.dev https://clerk.creditmend.org",
    "frame-src https://*.clerk.accounts.dev https://challenges.cloudflare.com",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'",
    "manifest-src 'self'",
    "media-src 'self'",
    "worker-src 'self'",
  ].join('; ');

  response.headers.set('Content-Security-Policy', csp);
  response.headers.set('X-Content-Security-Policy-Nonce', cspNonce);

  // HSTS for HTTPS
  if (process.env.NODE_ENV === 'production') {
    response.headers.set(
      'Strict-Transport-Security',
      'max-age=31536000; includeSubDomains; preload'
    );
  }

  // Permissions Policy
  response.headers.set(
    'Permissions-Policy',
    'geolocation=(), microphone=(), camera=(), payment=(), usb=(), magnetometer=(), gyroscope=()'
  );

  // API specific security
  if (req.nextUrl.pathname.startsWith('/api/')) {
    const origin = req.headers.get('origin');
    const allowedOrigins = [
      process.env.NEXT_PUBLIC_APP_URL,
      'http://localhost:3000',
      'https://localhost:3000',
      'https://creditmend.org',
      'https://www.creditmend.org',
    ].filter(Boolean);

    if (
      origin &&
      !allowedOrigins.some(
        allowed => origin === allowed || origin.startsWith(allowed!)
      )
    ) {
      SecurityUtils.logSecurityEvent(
        'CORS_VIOLATION',
        undefined,
        clientIP,
        userAgent,
        { origin }
      );
      return NextResponse.json(
        { error: 'CORS policy violation' },
        { status: 403 }
      );
    }

    const contentType = req.headers.get('content-type');
    if (
      req.method === 'POST' &&
      !contentType?.includes('application/json')
    ) {
      SecurityUtils.logSecurityEvent(
        'INVALID_CONTENT_TYPE',
        undefined,
        clientIP,
        userAgent,
        { contentType }
      );
      return NextResponse.json(
        { error: 'Invalid content type' },
        { status: 400 }
      );
    }

    const contentLength = req.headers.get('content-length');
    if (contentLength && parseInt(contentLength) > 10 * 1024 * 1024) {
      SecurityUtils.logSecurityEvent(
        'REQUEST_TOO_LARGE',
        undefined,
        clientIP,
        userAgent,
        { size: contentLength }
      );
      return NextResponse.json({ error: 'Request too large' }, { status: 413 });
    }
  }

  // Log suspicious activity
  const suspiciousPatterns = [
    /\.\./, // Path traversal
    /<script/i, // XSS attempt
    /union.*select/i, // SQL injection
    /javascript:/i, // JavaScript protocol
  ];

  const url = req.nextUrl.pathname + req.nextUrl.search;
  if (suspiciousPatterns.some(pattern => pattern.test(url))) {
    SecurityUtils.logSecurityEvent(
      'SUSPICIOUS_REQUEST',
      undefined,
      clientIP,
      userAgent,
      { url }
    );
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  response.headers.set('X-Request-ID', SecurityUtils.generateSecureToken(16));
  response.headers.set('X-Rate-Limit-Limit', '100');

  const currentCount = (rateLimit as unknown as { count: number }).count || 0;
  response.headers.set(
    'X-Rate-Limit-Remaining',
    Math.max(0, 100 - currentCount).toString()
  );

  response.headers.set(
    'X-Rate-Limit-Reset',
    new Date(rateLimit.resetTime).toISOString()
  );

  return response;
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
