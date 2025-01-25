import { NextResponse } from 'next/server';

export function POST() {
  return NextResponse.json({ message: 'Logged out successfully' }, { status: 200 });
}
