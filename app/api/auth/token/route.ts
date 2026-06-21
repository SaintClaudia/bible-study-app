import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

const isProd = process.env.NODE_ENV === 'production'

export async function GET() {
  const jar = await cookies()
  const accessToken = jar.get('spotify_access_token')?.value
  const refreshToken = jar.get('spotify_refresh_token')?.value
  const expiresAt = jar.get('spotify_expires_at')?.value

  if (!refreshToken) {
    return NextResponse.json({ authenticated: false })
  }

  // Token still valid (5-minute buffer before expiry)
  if (accessToken && expiresAt && Date.now() < Number(expiresAt) - 300_000) {
    return NextResponse.json({ authenticated: true, accessToken })
  }

  // Auto-refresh the access token
  const refreshRes = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${Buffer.from(
        `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
      ).toString('base64')}`,
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }),
  })

  if (!refreshRes.ok) {
    return NextResponse.json({ authenticated: false })
  }

  const newTokens = await refreshRes.json()
  const newExpiresAt = Date.now() + newTokens.expires_in * 1000
  const base = { httpOnly: true, secure: isProd, path: '/' }

  const response = NextResponse.json({ authenticated: true, accessToken: newTokens.access_token })
  response.cookies.set('spotify_access_token', newTokens.access_token, { ...base, maxAge: newTokens.expires_in })
  response.cookies.set('spotify_expires_at', String(newExpiresAt), { ...base, maxAge: 60 * 60 * 24 * 30 })

  return response
}
