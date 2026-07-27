import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const RECIPIENT = 'hello@biblestudylovesyou.com'

export async function POST(req: NextRequest) {
  try {
    const { name, request } = await req.json()

    if (!request || typeof request !== 'string' || !request.trim()) {
      return NextResponse.json({ error: 'A prayer request is required' }, { status: 400 })
    }

    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      console.error('Missing RESEND_API_KEY')
      return NextResponse.json({ error: 'Service unavailable' }, { status: 503 })
    }

    const trimmedName = typeof name === 'string' && name.trim() ? name.trim() : 'Anonymous'

    const resend = new Resend(apiKey)
    await resend.emails.send({
      from: 'Bible Study <hello@biblestudylovesyou.com>',
      to: RECIPIENT,
      replyTo: 'hello@biblestudylovesyou.com',
      subject: `Prayer request from ${trimmedName}`,
      text: `From: ${trimmedName}\n\n${request.trim()}`,
    })

    return NextResponse.json({ ok: true }, { status: 200 })
  } catch (err) {
    console.error('Prayer request error:', err)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
