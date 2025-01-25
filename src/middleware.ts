import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
    const token = req.cookies.get('authToken');
    const url = req.nextUrl.clone();

    // List of protected routes
    const protectedRoutes = ['/courses', '/profile', '/users'];

    console.log(url.pathname);

    if (!token && protectedRoutes.includes(url.pathname)) {
        // url.pathname = 'auth/login';
        // return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard', '/profile'], // Specify protected pages
};
