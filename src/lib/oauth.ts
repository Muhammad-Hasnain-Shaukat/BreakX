export interface OAuthProfile {
  provider: 'google' | 'github' | 'linkedin';
  providerId: string;
  email: string;
  fullName: string;
  profilePicture?: string;
}

export function getBaseUrl(req?: Request): string {
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL.replace(/\/$/, '');
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  if (req) {
    const host = req.headers.get('host');
    const proto = req.headers.get('x-forwarded-proto') || 'http';
    if (host) return `${proto}://${host}`;
  }
  return 'http://localhost:3000';
}

// 1. Google OAuth 2.0
export function getGoogleAuthUrl(state: string, baseUrl: string): string {
  const clientId = process.env.GOOGLE_CLIENT_ID || '';
  const redirectUri = `${baseUrl}/api/auth/callback/google`;
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: 'openid email profile',
    state,
    access_type: 'offline',
    prompt: 'select_account',
  });
  return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
}

export async function exchangeGoogleCode(code: string, baseUrl: string): Promise<OAuthProfile> {
  const clientId = process.env.GOOGLE_CLIENT_ID || '';
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET || '';
  const redirectUri = `${baseUrl}/api/auth/callback/google`;

  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code',
    }),
  });

  const tokenData = await tokenRes.json();
  if (!tokenRes.ok || !tokenData.access_type && !tokenData.access_token) {
    throw new Error(tokenData.error_description || 'Failed to exchange Google authorization code');
  }

  const userRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
    headers: { Authorization: `Bearer ${tokenData.access_token}` },
  });

  const userData = await userRes.json();
  if (!userRes.ok || !userData.email) {
    throw new Error('Failed to fetch Google profile information');
  }

  return {
    provider: 'google',
    providerId: userData.sub,
    email: userData.email.toLowerCase(),
    fullName: userData.name || userData.email.split('@')[0],
    profilePicture: userData.picture,
  };
}

// 2. GitHub OAuth 2.0
export function getGitHubAuthUrl(state: string, baseUrl: string): string {
  const clientId = process.env.GITHUB_CLIENT_ID || '';
  const redirectUri = `${baseUrl}/api/auth/callback/github`;
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: 'read:user user:email',
    state,
  });
  return `https://github.com/login/oauth/authorize?${params.toString()}`;
}

export async function exchangeGitHubCode(code: string, baseUrl: string): Promise<OAuthProfile> {
  const clientId = process.env.GITHUB_CLIENT_ID || '';
  const clientSecret = process.env.GITHUB_CLIENT_SECRET || '';
  const redirectUri = `${baseUrl}/api/auth/callback/github`;

  const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code,
      redirect_uri: redirectUri,
    }),
  });

  const tokenData = await tokenRes.json();
  if (!tokenRes.ok || !tokenData.access_token) {
    throw new Error(tokenData.error_description || 'Failed to exchange GitHub authorization code');
  }

  // Fetch GitHub User Info
  const userRes = await fetch('https://api.github.com/user', {
    headers: {
      Authorization: `Bearer ${tokenData.access_token}`,
      'User-Agent': 'BreakX-App',
    },
  });
  const userData = await userRes.json();

  // If email is private on GitHub, fetch from /user/emails
  let primaryEmail = userData.email;
  if (!primaryEmail) {
    const emailsRes = await fetch('https://api.github.com/user/emails', {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
        'User-Agent': 'BreakX-App',
      },
    });
    if (emailsRes.ok) {
      const emails = await emailsRes.json();
      const primary = emails.find((e: any) => e.primary && e.verified) || emails[0];
      if (primary) primaryEmail = primary.email;
    }
  }

  if (!primaryEmail) {
    primaryEmail = `${userData.login}@users.noreply.github.com`;
  }

  return {
    provider: 'github',
    providerId: String(userData.id),
    email: primaryEmail.toLowerCase(),
    fullName: userData.name || userData.login,
    profilePicture: userData.avatar_url,
  };
}

// 3. LinkedIn OAuth 2.0 (OpenID Connect)
export function getLinkedInAuthUrl(state: string, baseUrl: string): string {
  const clientId = process.env.LINKEDIN_CLIENT_ID || '';
  const redirectUri = `${baseUrl}/api/auth/callback/linkedin`;
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: clientId,
    redirect_uri: redirectUri,
    state,
    scope: 'openid profile email',
  });
  return `https://www.linkedin.com/oauth/v2/authorization?${params.toString()}`;
}

export async function exchangeLinkedInCode(code: string, baseUrl: string): Promise<OAuthProfile> {
  const clientId = process.env.LINKEDIN_CLIENT_ID || '';
  const clientSecret = process.env.LINKEDIN_CLIENT_SECRET || '';
  const redirectUri = `${baseUrl}/api/auth/callback/linkedin`;

  const tokenRes = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
    }),
  });

  const tokenData = await tokenRes.json();
  if (!tokenRes.ok || !tokenData.access_token) {
    throw new Error(tokenData.error_description || 'Failed to exchange LinkedIn authorization code');
  }

  // Fetch OpenID userinfo
  const userRes = await fetch('https://api.linkedin.com/v2/userinfo', {
    headers: { Authorization: `Bearer ${tokenData.access_token}` },
  });
  const userData = await userRes.json();

  if (!userRes.ok || !userData.email) {
    throw new Error('Failed to fetch LinkedIn profile information');
  }

  return {
    provider: 'linkedin',
    providerId: userData.sub,
    email: userData.email.toLowerCase(),
    fullName: userData.name || `${userData.given_name || ''} ${userData.family_name || ''}`.trim() || 'LinkedIn User',
    profilePicture: userData.picture,
  };
}
