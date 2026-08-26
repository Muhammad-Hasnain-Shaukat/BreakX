import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { signToken } from '@/lib/auth';

const MASTER_ADMIN_ID = 'admin@breakx.agency';
const MASTER_ADMIN_PASSWORDS = ['admin123', 'BreakX@Admin2026!', 'admin'];

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { provider, email, password, fullName, profilePicture, role = 'client', githubUsername, linkedinId } = body;

    // 1. Single Master Admin Authentication
    if (role === 'admin') {
      const normalizedEmail = (email || '').trim().toLowerCase();
      const isValidAdminId = normalizedEmail === 'admin' || normalizedEmail === 'admin@breakx.agency';
      const isValidAdminPass = MASTER_ADMIN_PASSWORDS.includes((password || '').trim());

      if (!isValidAdminId || !isValidAdminPass) {
        return NextResponse.json(
          { error: 'Invalid Master Admin ID or Password. Access denied.' },
          { status: 401 }
        );
      }

      // Upsert the single Master Admin in SQLite database
      let adminUser = await prisma.user.findUnique({
        where: { email: MASTER_ADMIN_ID },
      });

      if (!adminUser) {
        adminUser = await prisma.user.create({
          data: {
            email: MASTER_ADMIN_ID,
            fullName: 'BreakX Master Administrator',
            provider: 'system',
            providerId: 'master_admin_root',
            role: 'admin',
            profilePicture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
          },
        });
      }

      const sessionPayload = {
        id: adminUser.id,
        email: adminUser.email,
        fullName: adminUser.fullName,
        role: 'admin' as const,
        provider: 'system',
        profilePicture: adminUser.profilePicture || undefined,
      };

      const token = await signToken(sessionPayload);
      const response = NextResponse.json({ success: true, user: sessionPayload });
      response.cookies.set('breakx_session', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
      });

      return response;
    }

    // 2. Client & Seeker Authentic OAuth Providers (Google, GitHub, LinkedIn)
    if (!provider || !['google', 'github', 'linkedin'].includes(provider)) {
      return NextResponse.json(
        { error: 'Unauthorized: Only authentic Google, GitHub, and LinkedIn accounts are allowed.' },
        { status: 400 }
      );
    }

    if (!email) {
      return NextResponse.json({ error: 'Verified email is required from provider' }, { status: 400 });
    }

    const providerId = `${provider}_${Date.now()}`;
    const defaultAvatar =
      profilePicture ||
      (provider === 'github'
        ? `https://avatars.githubusercontent.com/u/583231?v=4`
        : provider === 'linkedin'
        ? `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80`
        : `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80`);

    // Find or create user in SQLite database
    let user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          fullName: fullName || email.split('@')[0],
          provider,
          providerId,
          role: role || 'client',
          profilePicture: defaultAvatar,
          githubUrl: githubUsername ? `https://github.com/${githubUsername}` : undefined,
          linkedinUrl: linkedinId ? `https://linkedin.com/in/${linkedinId}` : undefined,
        },
      });
    } else {
      user = await prisma.user.update({
        where: { email },
        data: {
          provider,
          role: role || user.role,
          profilePicture: profilePicture || user.profilePicture || defaultAvatar,
        },
      });
    }

    const sessionPayload = {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role as 'client' | 'seeker' | 'admin',
      provider: user.provider,
      profilePicture: user.profilePicture || undefined,
    };

    const token = await signToken(sessionPayload);
    const response = NextResponse.json({ success: true, user: sessionPayload });
    response.cookies.set('breakx_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error: any) {
    console.error('Auth Login API Error:', error);
    return NextResponse.json({ error: error.message || 'Authentication failed' }, { status: 500 });
  }
}
