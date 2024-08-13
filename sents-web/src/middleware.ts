import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

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

export async function middleware(req: any) {
  const token = (await getToken({
    req,
    secret: process.env.NEXT_AUTH_SECRET,
  })) as Token | null;

  const { pathname } = req.nextUrl;

  if (pathname.includes('/api/auth') || token) {
    return NextResponse.next();
  }

  if (!token && pathname !== '/landing') {
    return NextResponse.redirect(new URL('/landing', req.url));
  }

  return NextResponse.next();
}
