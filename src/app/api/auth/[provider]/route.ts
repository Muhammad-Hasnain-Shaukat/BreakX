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

    // Check if OAuth provider credentials exist in environment
    if (provider === 'google') {
      if (process.env.GOOGLE_CLIENT_ID) {
        return NextResponse.redirect(getGoogleAuthUrl(state, baseUrl));
      }
    } else if (provider === 'github') {
      if (process.env.GITHUB_CLIENT_ID) {
        return NextResponse.redirect(getGitHubAuthUrl(state, baseUrl));
      }
    } else if (provider === 'linkedin') {
      if (process.env.LINKEDIN_CLIENT_ID) {
        return NextResponse.redirect(getLinkedInAuthUrl(state, baseUrl));
      }
    } else {
      return NextResponse.json({ error: `Unsupported provider: ${provider}` }, { status: 400 });
    }

    // Fallback: If credentials are not yet entered in environment, provide instant developer demo callback
    const fallbackUrl = new URL(`${baseUrl}/api/auth/callback/${provider}`);
    fallbackUrl.searchParams.set('code', 'demo_code');
    fallbackUrl.searchParams.set('state', state);
    return NextResponse.redirect(fallbackUrl.toString());
  } catch (error: any) {
    console.error('OAuth Initiation Error:', error);
    return NextResponse.json({ error: error.message || 'Failed to initiate OAuth' }, { status: 500 });
  }
}
