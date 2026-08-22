export const config = { runtime: 'edge' }

interface Payload {
  name?: string
  email?: string
  phone?: string
  details?: string
  botcheck?: boolean
}

const RESEND_ENDPOINT = 'https://api.resend.com/emails'

const SEND_AUTO_REPLY = false

const MAX_BODY_BYTES = 8000

const LIMITS = { name: 100, email: 254, phone: 20, details: 500 } as const

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const RATE_WINDOW_MS = 10 * 60 * 1000
const RATE_MAX = 5

const recentHits = new Map<string, number[]>()

const isRateLimited = (key: string) => {
  const now = Date.now()

  if (recentHits.size > 500) recentHits.clear()

  const hits = (recentHits.get(key) ?? []).filter((time) => now - time < RATE_WINDOW_MS)
  hits.push(now)
  recentHits.set(key, hits)

  return hits.length > RATE_MAX
}

const isAllowedOrigin = (origin: string | null) => {
  if (!origin) return true

  try {
    const { hostname } = new URL(origin)
    return (
      hostname === 'buenosdiaznyc.com' ||
      hostname === 'www.buenosdiaznyc.com' ||
      hostname === 'localhost' ||
      hostname.endsWith('.vercel.app')
    )
  } catch {
    return false
  }
}

const clean = (value: unknown, max: number) => {
  if (typeof value !== 'string') return ''
  return value
    .replace(/[\u0000-\u001f\u007f]/g, ' ')
    .trim()
    .slice(0, max)
}

const CREAM = '#fffdfa'
const INK = '#1e1e1e'
const SAGE = '#8fa9a0'
const BORDER = 'rgba(30,30,30,0.12)'

const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const shell = (inner: string) => `
<!doctype html>
<html>
  <body style="margin:0;padding:0;background-color:${CREAM};">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${CREAM};padding:40px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background-color:${CREAM};">
            <tr>
              <td align="center" style="padding-bottom:32px;">
                <div style="font-family:Inter,Helvetica,Arial,sans-serif;font-size:22px;font-weight:500;letter-spacing:-0.03em;color:${INK};">
                  Buenos Díaz
                </div>
                <div style="font-family:Inter,Helvetica,Arial,sans-serif;font-size:9px;letter-spacing:0.18em;color:${INK};padding-top:6px;text-transform:uppercase;">
                  Espresso Bar
                </div>
              </td>
            </tr>
            <tr>
              <td style="border-top:1px solid ${BORDER};padding-top:32px;">
                ${inner}
              </td>
            </tr>
            <tr>
              <td style="border-top:1px solid ${BORDER};padding-top:20px;margin-top:32px;">
                <div style="font-family:Inter,Helvetica,Arial,sans-serif;font-size:11px;letter-spacing:-0.02em;color:${INK};opacity:0.6;">
                  Mobile Espresso Bar &nbsp;|&nbsp; NYC
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`

const row = (label: string, value: string) => `
  <tr>
    <td style="padding:0 0 18px 0;">
      <div style="font-family:Inter,Helvetica,Arial,sans-serif;font-size:11px;font-weight:300;letter-spacing:0.08em;text-transform:uppercase;color:${INK};opacity:0.55;padding-bottom:4px;">
        ${escapeHtml(label)}
      </div>
      <div style="font-family:Inter,Helvetica,Arial,sans-serif;font-size:15px;letter-spacing:-0.02em;color:${INK};">
        ${escapeHtml(value || '—')}
      </div>
    </td>
  </tr>
`

const notificationEmail = (data: Payload) =>
  shell(
    `
    <div style="font-family:Inter,Helvetica,Arial,sans-serif;font-size:20px;font-weight:500;letter-spacing:-0.03em;color:${INK};padding-bottom:6px;">
      New Event Inquiry
    </div>
    <div style="font-family:Inter,Helvetica,Arial,sans-serif;font-size:13px;letter-spacing:-0.02em;color:${INK};opacity:0.6;padding-bottom:28px;">
      Submitted from buenosdiaznyc.com
    </div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      ${row('Name / Company', data.name ?? '')}
      ${row('Email', data.email ?? '')}
      ${row('Phone Number', data.phone ?? '')}
      ${row('Details', data.details ?? '')}
    </table>
    <div style="padding-top:8px;">
      <a href="mailto:${escapeHtml(data.email ?? '')}" style="display:inline-block;font-family:Inter,Helvetica,Arial,sans-serif;font-size:12px;font-weight:500;letter-spacing:0.04em;text-transform:uppercase;color:#ffffff;background-color:${SAGE};border-radius:3px;padding:10px 22px;text-decoration:none;">
        Reply
      </a>
    </div>
  `,
  )

const autoReplyEmail = (data: Payload) =>
  shell(
    `
    <div style="font-family:Inter,Helvetica,Arial,sans-serif;font-size:20px;font-weight:500;letter-spacing:-0.03em;color:${INK};padding-bottom:14px;">
      Thank you${data.name ? `, ${escapeHtml(data.name)}` : ''}
    </div>
    <div style="font-family:Inter,Helvetica,Arial,sans-serif;font-size:14px;line-height:1.6;letter-spacing:-0.02em;color:${INK};padding-bottom:28px;">
      We received your inquiry and will be in touch soon. We would love to learn more
      about your event and create something special together.
    </div>
    <div style="font-family:Inter,Helvetica,Arial,sans-serif;font-size:11px;font-weight:300;letter-spacing:0.08em;text-transform:uppercase;color:${INK};opacity:0.55;padding-bottom:14px;">
      What you sent us
    </div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      ${row('Phone Number', data.phone ?? '')}
      ${row('Details', data.details ?? '')}
    </table>
    <div style="font-family:Inter,Helvetica,Arial,sans-serif;font-size:13px;line-height:1.6;letter-spacing:-0.02em;color:${INK};padding-top:8px;">
      Questions in the meantime? Reply to this email or reach us at
      <a href="mailto:hello@buenosdiaznyc.com" style="color:${INK};">hello@buenosdiaznyc.com</a>.
    </div>
  `,
  )

const send = (apiKey: string, body: Record<string, unknown>) =>
  fetch(RESEND_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405, headers: { Allow: 'POST' } })
  }

  if (!isAllowedOrigin(request.headers.get('origin'))) {
    return Response.json({ error: 'Forbidden' }, { status: 403 })
  }

  const declaredLength = Number(request.headers.get('content-length') ?? 0)
  if (declaredLength > MAX_BODY_BYTES) {
    return Response.json({ error: 'Request too large' }, { status: 413 })
  }

  const clientKey =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'

  if (isRateLimited(clientKey)) {
    return Response.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429, headers: { 'Retry-After': '600' } },
    )
  }

  const apiKey = process.env.RESEND_API_KEY
  const fromAddress = process.env.CONTACT_FROM ?? 'Buenos Díaz <hello@buenosdiaznyc.com>'
  const toAddress = process.env.CONTACT_TO ?? 'hello@buenosdiaznyc.com'

  if (!apiKey) {
    return Response.json({ error: 'Email service not configured' }, { status: 500 })
  }

  let raw: Payload

  try {
    raw = (await request.json()) as Payload
  } catch {
    return Response.json({ error: 'Invalid request' }, { status: 400 })
  }

  if (raw.botcheck) {
    return Response.json({ ok: true })
  }

  const data: Payload = {
    name: clean(raw.name, LIMITS.name),
    email: clean(raw.email, LIMITS.email),
    phone: clean(raw.phone, LIMITS.phone),
    details: clean(raw.details, LIMITS.details),
  }

  if (!data.name || !data.email) {
    return Response.json({ error: 'Name and email are required' }, { status: 400 })
  }

  if (!EMAIL_PATTERN.test(data.email)) {
    return Response.json({ error: 'Enter a valid email address' }, { status: 400 })
  }

  try {
    const notification = await send(apiKey, {
      from: fromAddress,
      to: [toAddress],
      reply_to: data.email,
      subject: `New event inquiry — ${data.name}`,
      html: notificationEmail(data),
    })

    if (!notification.ok) {
      const detail = await notification.text()
      console.error('[contact] resend rejected:', notification.status, detail)
      return Response.json({ error: 'Could not send', detail }, { status: 502 })
    }

    if (SEND_AUTO_REPLY) {
      await send(apiKey, {
        from: fromAddress,
        to: [data.email],
        reply_to: toAddress,
        subject: 'We received your inquiry — Buenos Díaz',
        html: autoReplyEmail(data),
      })
    }

    return Response.json({ ok: true })
  } catch (thrown) {
    console.error('[contact] send threw:', thrown)
    return Response.json({ error: 'Could not send' }, { status: 502 })
  }
}
