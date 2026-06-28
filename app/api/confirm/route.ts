import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { generateToken } from '../subscribe/route'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const email = searchParams.get('email')
  const token = searchParams.get('token')

  const redirect = (status: 'success' | 'invalid' | 'error') =>
    NextResponse.redirect(`https://app.biblestudylovesyou.com/confirm?status=${status}`)

  if (!email || !token) return redirect('invalid')

  const secret = process.env.NEWSLETTER_HMAC_SECRET
  const apiKey = process.env.RESEND_API_KEY
  const audienceId = process.env.RESEND_AUDIENCE_ID

  if (!secret || !apiKey || !audienceId) return redirect('error')

  const expected = generateToken(email, secret)
  if (token !== expected) return redirect('invalid')

  try {
    const resend = new Resend(apiKey)
    await resend.contacts.create({ audienceId, email, unsubscribed: false })
    return redirect('success')
  } catch (err) {
    console.error('Confirm error:', err)
    return redirect('error')
  }
}
