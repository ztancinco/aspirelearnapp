import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const authViewPage: string[] = ['/auth/login'];
const protectedRoutes: string[] = ['/admin', '/'];

export function middleware(req: NextRequest) {
  const { cookies, nextUrl } = req;
  const token: RequestCookie | undefined = cookies.get('authData');
  const userData: RequestCookie | undefined = cookies.get('userData');
  const url = nextUrl.clone();

  if (authViewPage.includes(url.pathname) && (!token && !userData)) {
    return NextResponse.next();
  }

  if (protectedRoutes.includes(url.pathname) && (!token || !userData)) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  if (authViewPage.includes(url.pathname) && token && userData) {
    try {
      const parsedUserData = JSON.parse(userData.value || '{}');
      const roles: string[] = parsedUserData.roles ?? [];
      return NextResponse.redirect(new URL(roles.includes('Admin') ? '/admin' : '/', req.url));
    } catch (error) {
      console.error('Error parsing userData cookie:', error);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    ...authViewPage,
    '/((?!_next/static|_next/image|favicon.ico|api/).*)'],
};
