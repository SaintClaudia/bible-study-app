import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { createHmac } from 'crypto'

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

export function generateToken(email: string, secret: string) {
  return createHmac('sha256', secret).update(email.toLowerCase()).digest('base64url')
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
    const secret = process.env.NEWSLETTER_HMAC_SECRET

    if (!apiKey || !secret) {
      console.error('Missing RESEND_API_KEY or NEWSLETTER_HMAC_SECRET')
      return NextResponse.json({ error: 'Service unavailable' }, { status: 503, headers })
    }

    const token = generateToken(email, secret)
    const confirmUrl = `https://app.biblestudylovesyou.com/api/confirm?email=${encodeURIComponent(email)}&token=${token}`

    const resend = new Resend(apiKey)
    await resend.emails.send({
      from: 'Bible Study <hello@biblestudylovesyou.com>',
      to: email,
      subject: 'Confirm your subscription — Bible Study',
      html: confirmationEmail(confirmUrl),
    })

    return NextResponse.json({ ok: true }, { status: 200, headers })
  } catch (err) {
    console.error('Subscribe error:', err)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500, headers })
  }
}

function confirmationEmail(confirmUrl: string) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Confirm your subscription</title>
</head>
<body style="margin:0;padding:0;background:#e8e8e8;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#e8e8e8;">
    <tr>
      <td align="center" style="padding:64px 24px 48px;">

        <!-- Icon -->
        <img src="https://app.biblestudylovesyou.com/apple-touch-icon.png"
             width="80" height="80" alt="Bible Study"
             style="display:block;margin:0 auto 52px;border-radius:20px;"/>

        <!-- Brand -->
        <p style="margin:0 0 36px;font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#1a1a18;">Bible Study</p>

        <!-- Heading -->
        <h1 style="margin:0 0 20px;font-family:Georgia,'Times New Roman',serif;font-size:48px;font-weight:400;line-height:1.15;color:#1a1a18;max-width:560px;">Thank you for signing up.</h1>

        <!-- Subtext -->
        <p style="margin:0 0 52px;font-family:Arial,Helvetica,sans-serif;font-size:17px;line-height:1.6;color:#555;max-width:480px;">Click the button below to confirm your subscription.</p>

        <!-- Button -->
        <table cellpadding="0" cellspacing="0" style="margin:0 auto;">
          <tr>
            <td style="background:#1a1a18;border-radius:12px;">
              <a href="${confirmUrl}"
                style="display:block;padding:20px 80px;font-family:Arial,Helvetica,sans-serif;font-size:17px;color:#ffffff;text-decoration:none;white-space:nowrap;">
                Confirm your subscription
              </a>
            </td>
          </tr>
        </table>

        <!-- Spacer -->
        <div style="height:100px;"></div>

        <!-- Footer -->
        <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:1.8;color:#999;">
          If you didn't sign up for Bible Study, you can safely ignore this email.<br/>
          © 2026 Bible Study &nbsp;·&nbsp;
          <a href="https://biblestudylovesyou.com" style="color:#999;text-decoration:underline;">biblestudylovesyou.com</a>
        </p>

      </td>
    </tr>
  </table>
</body>
</html>`
}
