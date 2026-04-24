import nodemailer, { type Transporter } from "nodemailer";

/* ─────────────────────────────────────────────────────────────
   Lazy transporter singleton — created once, reused on every
   request. Throws a clear error if SMTP env vars are missing.
───────────────────────────────────────────────────────────── */
let _transport: Transporter | null = null;

function getTransporter(): Transporter {
  if (_transport) return _transport;

  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    throw new Error(
      "SMTP is not configured. Set SMTP_HOST, SMTP_USER, and SMTP_PASS in your .env.local file."
    );
  }

  _transport = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,   // true for SSL, false for TLS (587)
    auth: { user, pass },
    tls: { rejectUnauthorized: false }, // allows self-signed certs on some hosts
  });

  return _transport;
}

/* ─────────────────────────────────────────────────────────────
   Shared helpers
───────────────────────────────────────────────────────────── */
function timestamp(): string {
  return new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "long",
    timeStyle: "short",
  });
}

const SITE_URL  = process.env.SITE_URL ?? "https://www.gocpl.co.in";
const WHATSAPP  = "https://wa.me/919834220116";
const PHONE_RAW = "+919834220116";
const PHONE_DISPLAY = "+91 98342 20116";
const ADDRESS   = "Oxford Avenue, Ground Floor, Pirangut 412115, Pune";
const COMPANY_EMAIL_DISPLAY = "asked@gocpl.co.in";

/* ─────────────────────────────────────────────────────────────
   EMAIL 1 — Notification to Great Ocean Comptech team
   Triggered: every time someone submits the contact form.
───────────────────────────────────────────────────────────── */
export interface EnquiryData {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
}

export async function sendCompanyEmail(data: EnquiryData): Promise<void> {
  const subject = `🔔 New Enquiry — ${data.name}${data.service ? ` (${data.service})` : ""}`;

  const fieldRow = (label: string, value: string, isLink?: string) => `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;vertical-align:top;width:130px;">
        <span style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#6b7280;">${label}</span>
      </td>
      <td style="padding:10px 0 10px 16px;border-bottom:1px solid #f0f0f0;vertical-align:top;">
        ${
          isLink
            ? `<a href="${isLink}" style="color:#1e40af;font-size:14px;font-weight:600;text-decoration:none;">${value}</a>`
            : `<span style="color:#111827;font-size:14px;">${value}</span>`
        }
      </td>
    </tr>`;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>New Enquiry — Great Ocean Comptech Pvt Ltd</title>
</head>
<body style="margin:0;padding:0;background:#eef2f7;font-family:Arial,Helvetica,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" border="0">
  <tr><td align="center" style="padding:32px 16px;">

    <table width="600" cellpadding="0" cellspacing="0" border="0"
           style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 32px rgba(0,0,0,0.10);max-width:600px;">

      <!-- ░░ HEADER ░░ -->
      <tr>
        <td style="background:linear-gradient(135deg,#1e40af 0%,#0e7490 100%);padding:36px 40px;text-align:center;">
          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr><td align="center">
              <div style="display:inline-block;width:54px;height:54px;background:rgba(255,255,255,0.2);border-radius:14px;line-height:54px;font-size:26px;font-weight:900;color:#ffffff;margin-bottom:14px;">G</div>
            </td></tr>
            <tr><td align="center">
              <h1 style="color:#ffffff;font-size:21px;font-weight:700;margin:0 0 6px 0;">🔔 New Enquiry Received</h1>
              <p style="color:rgba(255,255,255,0.8);font-size:13px;margin:0;">${timestamp()}</p>
            </td></tr>
          </table>
        </td>
      </tr>

      <!-- ░░ ALERT BANNER ░░ -->
      <tr>
        <td style="background:#eff6ff;padding:14px 40px;border-bottom:1px solid #bfdbfe;">
          <p style="margin:0;font-size:13px;color:#1e40af;font-weight:600;">
            ✅ A new contact form submission has been received on the Great Ocean Comptech website. Please respond within 24 hours.
          </p>
        </td>
      </tr>

      <!-- ░░ BODY — FIELDS ░░ -->
      <tr>
        <td style="padding:36px 40px;">
          <h2 style="margin:0 0 20px 0;font-size:16px;color:#374151;font-weight:700;">
            Contact Details
          </h2>

          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            ${fieldRow("Name", data.name)}
            ${fieldRow("Email", data.email, `mailto:${data.email}`)}
            ${data.phone ? fieldRow("Phone", data.phone, `tel:${data.phone}`) : ""}
            ${data.service ? fieldRow("Service", data.service) : ""}
          </table>

          <!-- Message -->
          <div style="margin-top:24px;">
            <p style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#6b7280;margin:0 0 8px 0;">
              Message
            </p>
            <div style="background:#f0f7ff;border-left:4px solid #3b82f6;border-radius:0 10px 10px 0;padding:18px 20px;font-size:14px;color:#1e3a5f;line-height:1.75;white-space:pre-wrap;">
${data.message}
            </div>
          </div>

          <!-- CTA -->
          <div style="margin-top:32px;text-align:center;">
            <a href="mailto:${data.email}?subject=Re%3A%20Your%20Enquiry%20—%20Great%20Ocean%20Comptech"
               style="display:inline-block;background:#1e40af;color:#ffffff;padding:14px 32px;border-radius:10px;text-decoration:none;font-weight:700;font-size:14px;">
              Reply to ${data.name} →
            </a>
            &nbsp;&nbsp;
            ${data.phone ? `<a href="https://wa.me/91${data.phone.replace(/\D/g, "")}"
               style="display:inline-block;background:#25d366;color:#ffffff;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:700;font-size:14px;">
              WhatsApp →
            </a>` : ""}
          </div>
        </td>
      </tr>

      <!-- ░░ FOOTER ░░ -->
      <tr>
        <td style="background:#f9fafb;padding:20px 40px;text-align:center;border-top:1px solid #e5e7eb;">
          <p style="margin:0 0 4px 0;font-size:12px;color:#9ca3af;">
            <strong style="color:#6b7280;">Great Ocean Comptech Pvt Ltd</strong> · ${ADDRESS}
          </p>
          <p style="margin:0;font-size:12px;color:#9ca3af;">
            📞 ${PHONE_DISPLAY} · ✉️ ${COMPANY_EMAIL_DISPLAY}
          </p>
        </td>
      </tr>

    </table>
  </td></tr>
</table>
</body>
</html>`;

  await getTransporter().sendMail({
    from: `"Great Ocean Comptech Website" <${process.env.SMTP_USER}>`,
    to:   process.env.COMPANY_EMAIL ?? process.env.SMTP_USER,
    replyTo: data.email,
    subject,
    html,
  });
}

/* ─────────────────────────────────────────────────────────────
   EMAIL 2 — Thank-you confirmation to the enquirer
   Triggered: same time as EMAIL 1.
───────────────────────────────────────────────────────────── */
export interface ConfirmationData {
  name: string;
  email: string;
  service?: string;
}

export async function sendUserEmail(data: ConfirmationData): Promise<void> {
  const subject = `✅ We've received your message — Great Ocean Comptech Pvt Ltd`;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>Thank You — Great Ocean Comptech Pvt Ltd</title>
</head>
<body style="margin:0;padding:0;background:#eef2f7;font-family:Arial,Helvetica,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" border="0">
  <tr><td align="center" style="padding:32px 16px;">

    <table width="600" cellpadding="0" cellspacing="0" border="0"
           style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 32px rgba(0,0,0,0.10);max-width:600px;">

      <!-- ░░ HEADER ░░ -->
      <tr>
        <td style="background:linear-gradient(135deg,#1e40af 0%,#0e7490 100%);padding:40px 40px 36px;text-align:center;">
          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr><td align="center">
              <div style="display:inline-block;width:60px;height:60px;background:rgba(255,255,255,0.2);border-radius:16px;line-height:60px;font-size:30px;font-weight:900;color:#ffffff;margin-bottom:16px;">G</div>
            </td></tr>
            <tr><td align="center">
              <h1 style="color:#ffffff;font-size:24px;font-weight:700;margin:0 0 8px 0;">Thank You for Reaching Out!</h1>
              <p style="color:rgba(255,255,255,0.85);font-size:14px;margin:0;">
                Great Ocean Comptech Pvt Ltd — India&apos;s Trusted IT Hardware Partner
              </p>
            </td></tr>
          </table>
        </td>
      </tr>

      <!-- ░░ BODY ░░ -->
      <tr>
        <td style="padding:40px 40px 32px;">

          <!-- Greeting -->
          <p style="font-size:18px;font-weight:700;color:#111827;margin:0 0 12px 0;">
            Hi ${data.name}, 👋
          </p>
          <p style="font-size:15px;color:#4b5563;line-height:1.75;margin:0 0 24px 0;">
            Thank you for contacting <strong>Great Ocean Comptech Pvt Ltd</strong>. We have received your
            enquiry and our team will get back to you within <strong>24 hours</strong>
            — usually much sooner!
          </p>

          <!-- Service requested highlight -->
          ${
            data.service
              ? `<table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:24px;">
              <tr>
                <td style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:12px;padding:16px 20px;">
                  <p style="margin:0;font-size:14px;color:#1e40af;font-weight:700;">
                    📦 Service Requested: ${data.service}
                  </p>
                </td>
              </tr>
            </table>`
              : ""
          }

          <!-- What happens next -->
          <h2 style="font-size:15px;font-weight:700;color:#374151;margin:0 0 16px 0;border-bottom:2px solid #e5e7eb;padding-bottom:10px;">
            What Happens Next?
          </h2>

          <!-- Step 1 -->
          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:12px;">
            <tr>
              <td style="width:36px;vertical-align:top;">
                <div style="width:28px;height:28px;background:#1e40af;border-radius:50%;color:#fff;font-size:12px;font-weight:700;line-height:28px;text-align:center;">1</div>
              </td>
              <td style="padding-left:12px;vertical-align:top;">
                <p style="margin:0;font-size:14px;color:#374151;line-height:1.6;">
                  <strong>Review</strong> — Our team reviews your enquiry and identifies the best solution.
                </p>
              </td>
            </tr>
          </table>

          <!-- Step 2 -->
          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:12px;">
            <tr>
              <td style="width:36px;vertical-align:top;">
                <div style="width:28px;height:28px;background:#1e40af;border-radius:50%;color:#fff;font-size:12px;font-weight:700;line-height:28px;text-align:center;">2</div>
              </td>
              <td style="padding-left:12px;vertical-align:top;">
                <p style="margin:0;font-size:14px;color:#374151;line-height:1.6;">
                  <strong>Proposal</strong> — We send you a tailored quote or solution brief within 2 business hours.
                </p>
              </td>
            </tr>
          </table>

          <!-- Step 3 -->
          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:28px;">
            <tr>
              <td style="width:36px;vertical-align:top;">
                <div style="width:28px;height:28px;background:#1e40af;border-radius:50%;color:#fff;font-size:12px;font-weight:700;line-height:28px;text-align:center;">3</div>
              </td>
              <td style="padding-left:12px;vertical-align:top;">
                <p style="margin:0;font-size:14px;color:#374151;line-height:1.6;">
                  <strong>Delivery</strong> — On approval, we deploy or deliver — same-day across India.
                </p>
              </td>
            </tr>
          </table>

          <!-- Divider -->
          <div style="height:1px;background:#e5e7eb;margin:0 0 28px 0;"></div>

          <!-- Direct contact -->
          <h2 style="font-size:15px;font-weight:700;color:#374151;margin:0 0 14px 0;">
            Need an Immediate Response?
          </h2>
          <p style="font-size:14px;color:#4b5563;line-height:1.75;margin:0 0 14px 0;">
            Feel free to reach us directly — we're available Mon–Sat, 9 AM – 7 PM
            (emergency support 24/7):
          </p>

          <!-- Phone -->
          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:8px;">
            <tr>
              <td style="padding:12px 16px;background:#f9fafb;border-radius:10px;border:1px solid #e5e7eb;">
                <a href="tel:${PHONE_RAW}"
                   style="color:#1e40af;font-size:15px;font-weight:700;text-decoration:none;">
                  📞 ${PHONE_DISPLAY}
                </a>
              </td>
            </tr>
          </table>

          <!-- WhatsApp CTA -->
          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:8px;margin-bottom:4px;">
            <tr>
              <td align="center">
                <a href="${WHATSAPP}?text=Hi%20Great%20Ocean%20Comptech%2C%20I%20just%20submitted%20a%20form%20and%20need%20immediate%20assistance."
                   style="display:inline-block;background:#25d366;color:#ffffff;padding:14px 36px;border-radius:12px;text-decoration:none;font-weight:700;font-size:15px;margin-top:8px;">
                  💬 Chat on WhatsApp →
                </a>
              </td>
            </tr>
          </table>
          <p style="text-align:center;font-size:12px;color:#9ca3af;margin:8px 0 0 0;">
            Fastest response — usually replied within minutes
          </p>

        </td>
      </tr>

      <!-- ░░ FOOTER ░░ -->
      <tr>
        <td style="background:#f9fafb;padding:24px 40px;text-align:center;border-top:1px solid #e5e7eb;">
          <p style="margin:0 0 6px 0;font-size:13px;color:#6b7280;font-weight:700;">
            Great Ocean Comptech Pvt Ltd
          </p>
          <p style="margin:0 0 4px 0;font-size:12px;color:#9ca3af;">
            📍 ${ADDRESS}
          </p>
          <p style="margin:0 0 10px 0;font-size:12px;color:#9ca3af;">
            📞 ${PHONE_DISPLAY} &nbsp;·&nbsp; ✉️ ${COMPANY_EMAIL_DISPLAY}
          </p>
          <a href="${SITE_URL}"
             style="font-size:12px;color:#1e40af;text-decoration:none;">
            www.gocpl.co.in
          </a>
          <p style="margin:12px 0 0 0;font-size:11px;color:#d1d5db;">
            You received this email because you submitted the contact form on our website.
            We do not share your data with third parties.
          </p>
        </td>
      </tr>

    </table>
  </td></tr>
</table>
</body>
</html>`;

  await getTransporter().sendMail({
    from:    `"Great Ocean Comptech" <${process.env.SMTP_USER}>`,
    to:      data.email,
    subject,
    html,
  });
}
