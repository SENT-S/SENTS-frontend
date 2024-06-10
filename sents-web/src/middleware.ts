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
    '/company',
    '/company/:path*',
    '/new_company',
    '/news',
    '/overview',
    '/financials',
  ],
};

export async function middleware(req: any) {
  // Use getToken to access the session on the server side
  const token = (await getToken({
    req,
    secret: process.env.NEXT_AUTH_SECRET,
  })) as Token;

  const { pathname } = req.nextUrl;

  // Get the current time in seconds
  const currentTime = Math.floor(Date.now() / 1000);

  // Check if the token has expired
  const isTokenExpired = token && token.exp < currentTime;

  // Allow the requests if the following is true:
  // 1. It's a request for next-auth session & provider fetching
  // 2. The token exists and has not expired
  if (pathname.includes('/api/auth') || (token && !isTokenExpired)) {
    return NextResponse.next();
  }

  // Redirect them to login page if they are not authenticated or the token has expired
  if ((!token || isTokenExpired) && pathname !== '/login_register') {
    return NextResponse.redirect(new URL('/login_register', req.url));
  }
}
