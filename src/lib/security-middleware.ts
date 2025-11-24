import { NextRequest, NextResponse } from 'next/server';
import SecurityUtils from '@/lib/security';

// Security middleware following OWASP and NIST standards
export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const clientIP = SecurityUtils.getClientIP(request);
  const userAgent = request.headers.get('user-agent') || 'unknown';

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

  // Content Security Policy with nonce
  const cspNonce = SecurityUtils.getCSPNonce();
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https:",
    "font-src 'self'",
    "connect-src 'self' https://api.stripe.com https://js.stripe.com",
    "frame-ancestors 'none'",
    `base-uri 'self'`,
    `form-action 'self'`,
    `frame-src 'none'`,
    `object-src 'none'`,
    `manifest-src 'self'`,
    `media-src 'self'`,
    `worker-src 'self'`,
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
  if (request.nextUrl.pathname.startsWith('/api/')) {
    // Validate API requests
    const origin = request.headers.get('origin');
    const allowedOrigins = [
      process.env.NEXT_PUBLIC_APP_URL,
      'http://localhost:3000',
      'https://localhost:3000',
      'https://creditmend.org',
      'https://www.creditmend.org',
    ].filter(Boolean);

    // Allow requests with no origin (server-to-server or same-origin sometimes)
    // or if the origin is in the allowed list
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

    // Content type validation for API
    const contentType = request.headers.get('content-type');
    if (
      request.method === 'POST' &&
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

    // Size limits for API requests
    const contentLength = request.headers.get('content-length');
    if (contentLength && parseInt(contentLength) > 10 * 1024 * 1024) {
      // 10MB
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

  const url = request.nextUrl.pathname + request.nextUrl.search;
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

  // Add security headers to response
  response.headers.set('X-Request-ID', SecurityUtils.generateSecureToken(16));
  response.headers.set('X-Rate-Limit-Limit', '100');

  // Safely handle the unknown type from checkRateLimit return
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
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
