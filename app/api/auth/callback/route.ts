import { NextResponse } from 'next/server'

const isProd = process.env.NODE_ENV === 'production'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const state = searchParams.get('state')
  const error = searchParams.get('error')

  // User denied access or Spotify returned an error
  if (error || !code) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // Verify CSRF state
  const storedState = (request as any).cookies?.get?.('spotify_auth_state')?.value
  if (storedState && storedState !== state) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // Exchange authorization code for tokens
  const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${Buffer.from(
        `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
      ).toString('base64')}`,
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: `${origin}/api/auth/callback`,
    }),
  })

  if (!tokenRes.ok) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  const tokens = await tokenRes.json()
  const expiresAt = Date.now() + tokens.expires_in * 1000

  const response = NextResponse.redirect(new URL('/', request.url))
  const base = { httpOnly: true, secure: isProd, path: '/' }

  response.cookies.set('spotify_access_token', tokens.access_token, { ...base, maxAge: tokens.expires_in })
  response.cookies.set('spotify_refresh_token', tokens.refresh_token, { ...base, maxAge: 60 * 60 * 24 * 30 })
  response.cookies.set('spotify_expires_at', String(expiresAt), { ...base, maxAge: 60 * 60 * 24 * 30 })
  response.cookies.delete('spotify_auth_state')

  return response
}
