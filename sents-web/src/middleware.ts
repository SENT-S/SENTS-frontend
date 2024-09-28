import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

import type { NextRequest } from 'next/server';

interface Token {
  exp: number;
  [key: string]: any;
}

export const config = {
  matcher: [
    '/',
    '/dashboard',
    '/company/:path*',
    '/edit_company/:path*',
    '/new_company',
    '/create_news',
    '/news',
  ],
};

export async function middleware(req: NextRequest) {
  const token = (await getToken({
    req,
    secret: process.env.NEXT_AUTH_SECRET,
  })) as Token | null;

  const { pathname } = req.nextUrl;

  // Allow requests to authentication paths or if the token exists
  const isAuthPath = pathname.includes('/api/auth');
  if (isAuthPath || token) {
    return NextResponse.next();
  }

  // Redirect to landing if no token is found
  return NextResponse.redirect(new URL('/landing', req.url));
}
