import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const ALLOWED_ORIGINS = new Set([
  'https://energy.kimidev.net',
  'https://solar-energy-thego.vercel.app',
  'https://thego.starwar.vn',
  'http://localhost:3000',
  'http://localhost:3001',
]);

const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval' https://unpkg.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  img-src 'self' blob: data: https://images.unsplash.com https://thego.starwar.vn https://*.kimidev.net https://*.vercel.app;
  font-src 'self' data: https://fonts.gstatic.com;
  connect-src 'self' https://*.kimidev.net https://thego.starwar.vn https://*.vercel.app;
  frame-src 'self' https://www.google.com https://maps.google.com;
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  upgrade-insecure-requests;
`.replace(/\s{2,}/g, ' ').trim();

export function middleware(request: NextRequest) {
  const origin = request.headers.get('origin');

  // Handle preflight OPTIONS requests
  if (request.method === 'OPTIONS') {
    if (origin && ALLOWED_ORIGINS.has(origin)) {
      return new NextResponse(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': origin,
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
          'Access-Control-Max-Age': '86400',
          'Vary': 'Origin',
          'X-Frame-Options': 'DENY',
          'Content-Security-Policy': cspHeader,
          'X-Content-Type-Options': 'nosniff',
        },
      });
    }
    return new NextResponse('Cross-Origin Request Blocked', { status: 403 });
  }

  const response = NextResponse.next();

  // 1. Anti-Clickjacking & Security Headers
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('Content-Security-Policy', cspHeader);
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), browsing-topics=()');
  response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  response.headers.set('Cross-Origin-Resource-Policy', 'same-origin');
  response.headers.set('Cross-Origin-Opener-Policy', 'same-origin');
  response.headers.set('Cross-Origin-Embedder-Policy', 'credentialless');

  // 2. Strict CORS policy
  if (origin) {
    if (ALLOWED_ORIGINS.has(origin)) {
      response.headers.set('Access-Control-Allow-Origin', origin);
      response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
      response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
      response.headers.set('Vary', 'Origin');
    } else {
      response.headers.delete('Access-Control-Allow-Origin');
      response.headers.delete('Access-Control-Allow-Credentials');
    }
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
