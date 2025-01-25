import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

const users = [
  { id: '1', username: 'admin', password: '$2a$10$z0P.fbpwFiIMwU3Ujx9S9.MWZhlTTqg0TOqExzyct4Iu9p3Vftu6C' }, // password is 'password123'
];

export async function POST(request: Request) {
  const { username, password } = await request.json();

  // Find the user by username
  const user = users.find((user) => user.username === username);
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  // Check password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  }

  // Create JWT token
  const token = jwt.sign({ userId: user.id, username: user.username }, 'your-secret-key', { expiresIn: '1h' });

  return NextResponse.json({ token }, { status: 200 });
}
