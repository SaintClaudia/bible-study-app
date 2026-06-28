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
<body style="margin:0;padding:0;background:#f9f8f5;font-family:Georgia,'Times New Roman',serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9f8f5;">
    <tr>
      <td align="center" style="padding:48px 20px;">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.06);">

          <!-- Header -->
          <tr>
            <td style="background:#1a1a18;padding:40px;text-align:center;">
              <p style="margin:0;font-family:Georgia,serif;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#a0997a;">Bible Study</p>
              <p style="margin:12px 0 0;font-family:Georgia,serif;font-size:26px;font-weight:400;color:#ffffff;letter-spacing:-0.01em;">One step left.</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:48px 48px 40px;text-align:center;">
              <p style="margin:0 0 24px;font-size:16px;line-height:1.8;color:#444;font-family:Georgia,serif;">
                Thank you for signing up. Click the button below to confirm your subscription — we'll reach out for the moments that matter.
              </p>
              <a href="${confirmUrl}"
                style="display:inline-block;background:#1a1a18;color:#ffffff;text-decoration:none;padding:15px 36px;border-radius:8px;font-family:Georgia,serif;font-size:15px;letter-spacing:0.01em;">
                Confirm your subscription
              </a>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding:0 48px;">
              <hr style="border:none;border-top:1px solid #eeece8;margin:0;"/>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:28px 48px;text-align:center;">
              <p style="margin:0;font-size:12px;line-height:1.7;color:#aaa;font-family:Georgia,serif;">
                If you didn't sign up for Bible Study, you can safely ignore this email.
              </p>
              <p style="margin:8px 0 0;font-size:12px;color:#aaa;font-family:Georgia,serif;">
                © 2026 Bible Study &nbsp;·&nbsp;
                <a href="https://biblestudylovesyou.com" style="color:#aaa;text-decoration:underline;">biblestudylovesyou.com</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}
