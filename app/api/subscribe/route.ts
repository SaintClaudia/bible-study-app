import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const ALLOWED_ORIGINS = [
  'https://biblestudylovesyou.com',
  'https://www.biblestudylovesyou.com',
  'https://app.biblestudylovesyou.com',
]

function corsHeaders(origin: string | null) {
  const allowed = origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0]
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }
}

export async function OPTIONS(req: NextRequest) {
  const origin = req.headers.get('origin')
  return new NextResponse(null, { status: 204, headers: corsHeaders(origin) })
}

export async function POST(req: NextRequest) {
  const origin = req.headers.get('origin')
  const headers = corsHeaders(origin)

  try {
    const { email } = await req.json()

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400, headers })
    }

    const apiKey = process.env.RESEND_API_KEY
    const audienceId = process.env.RESEND_AUDIENCE_ID

    if (!apiKey || !audienceId) {
      console.error('Missing RESEND_API_KEY or RESEND_AUDIENCE_ID')
      return NextResponse.json({ error: 'Service unavailable' }, { status: 503, headers })
    }

    const resend = new Resend(apiKey)
    await resend.contacts.create({ audienceId, email, unsubscribed: false })

    return NextResponse.json({ ok: true }, { status: 200, headers })
  } catch (err) {
    console.error('Subscribe error:', err)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500, headers })
  }
}
