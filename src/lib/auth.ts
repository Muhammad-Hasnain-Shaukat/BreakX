import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'breakx-secret-jwt-key-production-ready-2026'
);

export interface UserSession {
  id: string;
  email: string;
  fullName: string;
  role: 'client' | 'seeker' | 'admin';
  profilePicture?: string;
}

export async function signToken(payload: UserSession): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(JWT_SECRET);
}

export async function verifyToken(token: string): Promise<UserSession | null> {
  try {
    const verified = await jwtVerify(token, JWT_SECRET);
    return verified.payload as unknown as UserSession;
  } catch (err) {
    return null;
  }
}

export async function getSession(): Promise<UserSession | null> {
  const cookieStore = cookies();
  const token = cookieStore.get('breakx_session')?.value;
  if (!token) return null;
  return await verifyToken(token);
}

export async function requireAuth(allowedRoles?: ('client' | 'seeker' | 'admin')[]) {
  const session = await getSession();
  if (!session) {
    throw new Error('UNAUTHORIZED');
  }
  if (allowedRoles && !allowedRoles.includes(session.role)) {
    throw new Error('FORBIDDEN');
  }
  return session;
}
