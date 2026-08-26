import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import {
  getBaseUrl,
  getGoogleAuthUrl,
  getGitHubAuthUrl,
  getLinkedInAuthUrl,
} from '@/lib/oauth';

export async function GET(
  req: Request,
  { params }: { params: { provider: string } }
) {
  try {
    const provider = params.provider.toLowerCase();
    const url = new URL(req.url);
    const role = url.searchParams.get('role') || 'client';
    const redirect = url.searchParams.get('redirect') || (role === 'seeker' ? '/join-breakx' : '/project-request');
    const baseUrl = getBaseUrl(req);

    // State payload with CSRF protection and role context
    const statePayload = {
      role,
      redirect,
      nonce: Math.random().toString(36).substring(7),
      timestamp: Date.now(),
    };
    const state = Buffer.from(JSON.stringify(statePayload)).toString('base64url');

    // Save state to HTTP-only cookie for verification in callback
    const cookieStore = cookies();
    cookieStore.set('oauth_state', state, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 10, // 10 minutes
      path: '/',
    });

    // 1. Google OAuth Check
    if (provider === 'google') {
      if (!process.env.GOOGLE_CLIENT_ID) {
        return NextResponse.redirect(
          `${baseUrl}/?auth_error=${encodeURIComponent(
            'Google OAuth requires GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET. Please add them to your environment variables to enable real Google Account sign-in.'
          )}`
        );
      }
      return NextResponse.redirect(getGoogleAuthUrl(state, baseUrl));
    }

    // 2. GitHub OAuth Check
    if (provider === 'github') {
      if (!process.env.GITHUB_CLIENT_ID) {
        return NextResponse.redirect(
          `${baseUrl}/?auth_error=${encodeURIComponent(
            'GitHub OAuth requires GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET in your environment variables to enable real GitHub account sign-in.'
          )}`
        );
      }
      return NextResponse.redirect(getGitHubAuthUrl(state, baseUrl));
    }

    // 3. LinkedIn OAuth Check
    if (provider === 'linkedin') {
      if (!process.env.LINKEDIN_CLIENT_ID) {
        return NextResponse.redirect(
          `${baseUrl}/?auth_error=${encodeURIComponent(
            'LinkedIn OAuth requires LINKEDIN_CLIENT_ID and LINKEDIN_CLIENT_SECRET in your environment variables to enable real LinkedIn account sign-in.'
          )}`
        );
      }
      return NextResponse.redirect(getLinkedInAuthUrl(state, baseUrl));
    }

    return NextResponse.json({ error: `Unsupported provider: ${provider}` }, { status: 400 });
  } catch (error: any) {
    console.error('OAuth Initiation Error:', error);
    return NextResponse.json({ error: error.message || 'Failed to initiate OAuth' }, { status: 500 });
  }
}
