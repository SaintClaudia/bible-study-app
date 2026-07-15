import { Resend } from 'resend'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

// ─── Add recipient emails here ───────────────────────────────────────────────
const RECIPIENTS = [
  'claudia.ochoa.product@gmail.com',
  'claudiajochoa@icloud.com',
]
// ─────────────────────────────────────────────────────────────────────────────

const apiKey = process.env.RESEND_API_KEY
if (!apiKey) {
  console.error('Missing RESEND_API_KEY — run with: node --env-file=.env.local emails/send-outreach.mjs')
  process.exit(1)
}

if (RECIPIENTS.length === 0) {
  console.error('No recipients — add email addresses to the RECIPIENTS array in emails/send-outreach.mjs')
  process.exit(1)
}

const html = readFileSync(join(__dirname, 'ocia-outreach.html'), 'utf8')
const resend = new Resend(apiKey)

console.log(`Sending to ${RECIPIENTS.length} recipient(s)...\n`)

for (const email of RECIPIENTS) {
  const { data, error } = await resend.emails.send({
    from: 'Bible Study <hello@biblestudylovesyou.com>',
    to: email,
    subject: 'Supporting the journey of initiation',
    html,
  })

  if (error) {
    console.error(`✗ ${email} — ${error.message}`)
  } else {
    console.log(`✓ ${email} — ID: ${data.id}`)
  }

  await new Promise(resolve => setTimeout(resolve, 500))
}

console.log('\nDone.')
