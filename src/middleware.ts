import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const ALLOWED_ORIGINS = new Set([
  'https://energy.kimidev.net',
  'https://solar-energy-thego.vercel.app',
  'https://thego.starwar.vn',
  'http://localhost:3000',
  'http://localhost:3001',
]);

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
        },
      });
    }
    // Reject unknown / untrusted origins attempting preflight
    return new NextResponse('Cross-Origin Request Blocked', { status: 403 });
  }

  const response = NextResponse.next();

  // If request contains an Origin header
  if (origin) {
    if (ALLOWED_ORIGINS.has(origin)) {
      response.headers.set('Access-Control-Allow-Origin', origin);
      response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
      response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
      response.headers.set('Vary', 'Origin');
    } else {
      // Untrusted origins (e.g. probes, malicious sites):
      // Explicitly delete any wildcard or inherited CORS headers
      response.headers.delete('Access-Control-Allow-Origin');
      response.headers.delete('Access-Control-Allow-Credentials');
    }
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
