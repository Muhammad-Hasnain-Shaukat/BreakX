import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ success: true });
  response.cookies.set('breakx_session', '', {
    httpOnly: true,
    path: '/',
    expires: new Date(0),
  });
  return response;
}
