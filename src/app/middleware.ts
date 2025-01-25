import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET_KEY || 'your-secret-key';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value;

  console.log('token', token);

  if (!token) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  try {
    // Verify the JWT token
    jwt.verify(token, secretKey);
    return NextResponse.next(); 
  } catch {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }
}

// Define which routes are protected by this middleware
export const config = {
  matcher: ['/courses', '/courses/*'], // Protected routes (including /courses itself)
};
