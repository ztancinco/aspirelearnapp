import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const { cookies, nextUrl } = req;
  const token = cookies.get('authData')?.value;
  const userDataCookie = cookies.get('userData')?.value;
  const url = nextUrl.clone();

  if (!token) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  if (userDataCookie && userDataCookie !== 'undefined') {
    try {
      const userData = JSON.parse(userDataCookie);
      const roles: string[] = userData.roles ?? [];

      if (roles.includes('Admin') && url.pathname === '/auth/login') {
        return NextResponse.redirect(new URL('/admin', req.url));
      }
    } catch (error) {
      console.error('Error parsing userData cookie:', error);
      return NextResponse.redirect(new URL('/auth/login', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/((?!_next/static|_next/image|favicon.ico|auth/login|api/).*)',
};
