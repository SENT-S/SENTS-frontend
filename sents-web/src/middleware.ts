import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Define an interface for the token
interface Token {
  exp: number;
  [key: string]: any;
}

export const config = {
  matcher: [
    '/dashboard',
    '/company/:path*',
    '/edit_company/:path*',
    '/new_company',
    '/create_news',
    '/news',
  ],
};

export async function middleware(req: any) {
  // Use getToken to access the session on the server side
  const token = (await getToken({
    req,
    secret: process.env.NEXT_AUTH_SECRET,
  })) as Token;

  const { pathname } = req.nextUrl;

  // Allow the requests if the following is true:
  // 1. It's a request for next-auth session & provider fetching
  // 2. The token exists and has not expired
  if (pathname.includes('/api/auth') || token) {
    return NextResponse.next();
  }

  // Redirect them to login page if they are not authenticated or the token has expired
  if (!token && pathname !== '/landing') {
    return NextResponse.redirect(new URL('/landing', req.url));
  }
}
