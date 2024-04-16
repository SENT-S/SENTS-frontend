import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export const config = {
  matcher: [
    // '/((?!api|_next/static|_next/image|images|favicon.ico|landing).*)',
    '/dashboard',
    '/company',
    '/company/:path*',
  ],
};

export async function middleware(req: any) {
  // Use getToken to access the session on the server side
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const { pathname } = req.nextUrl;

  // Allow the requests if the following is true:
  // 1. It's a request for next-auth session & provider fetching
  // 2. The token exists
  if (pathname.includes('/api/auth') || token) {
    return NextResponse.next();
  }

  // Redirect them to login page if they are not authenticated
  if (!token && pathname !== '/login_register') {
    return NextResponse.redirect(new URL('/login_register', req.url));
  }
}
