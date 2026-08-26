import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';
import { signToken } from '@/lib/auth';
import {
  getBaseUrl,
  exchangeGoogleCode,
  exchangeGitHubCode,
  exchangeLinkedInCode,
  OAuthProfile,
} from '@/lib/oauth';

export async function GET(
  req: Request,
  { params }: { params: { provider: string } }
) {
  const baseUrl = getBaseUrl(req);
  const url = new URL(req.url);
  const provider = params.provider.toLowerCase();
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const errorParam = url.searchParams.get('error');

  if (errorParam) {
    console.error('OAuth Provider Error:', errorParam);
    return NextResponse.redirect(`${baseUrl}/?auth_error=${encodeURIComponent(errorParam)}`);
  }

  if (!code) {
    return NextResponse.redirect(`${baseUrl}/?auth_error=missing_code`);
  }

  // Decode State
  let targetRole: 'client' | 'seeker' = 'client';
  let redirectPath = '/dashboard';

  try {
    if (state) {
      const decoded = JSON.parse(Buffer.from(state, 'base64url').toString('utf-8'));
      if (decoded.role === 'seeker') targetRole = 'seeker';
      if (decoded.redirect) redirectPath = decoded.redirect;
    }
  } catch (err) {
    console.warn('Could not decode state, using defaults:', err);
  }

  try {
    let profile: OAuthProfile;

    // Handle Demo/Mock Fallback (if real API keys are not yet provided)
    if (code === 'demo_code') {
      const mockName =
        provider === 'google'
          ? targetRole === 'seeker' ? 'Verified Google Talent' : 'Verified Google Client'
          : provider === 'github'
          ? targetRole === 'seeker' ? 'Senior GitHub Engineer' : 'GitHub Enterprise Partner'
          : targetRole === 'seeker' ? 'LinkedIn AI Specialist' : 'LinkedIn Business Partner';

      const mockAvatar =
        provider === 'github'
          ? 'https://avatars.githubusercontent.com/u/583231?v=4'
          : provider === 'google'
          ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
          : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80';

      profile = {
        provider: provider as 'google' | 'github' | 'linkedin',
        providerId: `demo_${provider}_${Date.now()}`,
        email: `${targetRole}.${provider}@breakx.agency`,
        fullName: mockName,
        profilePicture: mockAvatar,
      };
    } else {
      // Exchange real OAuth 2.0 authorization code
      if (provider === 'google') {
        profile = await exchangeGoogleCode(code, baseUrl);
      } else if (provider === 'github') {
        profile = await exchangeGitHubCode(code, baseUrl);
      } else if (provider === 'linkedin') {
        profile = await exchangeLinkedInCode(code, baseUrl);
      } else {
        throw new Error(`Unsupported provider callback: ${provider}`);
      }
    }

    // Upsert User in Neon PostgreSQL Database
    const user = await prisma.user.upsert({
      where: { email: profile.email },
      update: {
        fullName: profile.fullName,
        profilePicture: profile.profilePicture || undefined,
        provider: profile.provider,
        providerId: profile.providerId,
      },
      create: {
        email: profile.email,
        fullName: profile.fullName,
        profilePicture: profile.profilePicture || null,
        provider: profile.provider,
        providerId: profile.providerId,
        role: targetRole,
      },
    });

    // Create secure JWT token for user session
    const token = await signToken({
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role as 'client' | 'seeker' | 'admin',
      profilePicture: user.profilePicture || undefined,
    });

    // Set HTTP-Only Session Cookie
    const cookieStore = cookies();
    cookieStore.set('breakx_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    // Clean up temporary OAuth state cookie
    cookieStore.delete('oauth_state');

    // Redirect to target destination
    return NextResponse.redirect(`${baseUrl}${redirectPath}`);
  } catch (error: any) {
    console.error('OAuth Callback Processing Error:', error);
    return NextResponse.redirect(
      `${baseUrl}/?auth_error=${encodeURIComponent(error.message || 'Authentication failed')}`
    );
  }
}
