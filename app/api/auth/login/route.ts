import { NextResponse } from 'next/server'
import crypto from 'crypto'

export async function GET(request: Request) {
  const state = crypto.randomBytes(16).toString('hex')
  const origin = new URL(request.url).origin

  const params = new URLSearchParams({
    response_type: 'code',
    client_id: process.env.SPOTIFY_CLIENT_ID!,
    scope: [
      'streaming',
      'user-read-email',
      'user-read-private',
      'user-modify-playback-state',
      'user-read-playback-state',
    ].join(' '),
    redirect_uri: `${origin}/api/auth/callback`,
    state,
  })

  const response = NextResponse.redirect(
    `https://accounts.spotify.com/authorize?${params}`
  )

  response.cookies.set('spotify_auth_state', state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 600,
    path: '/',
  })

  return response
}
