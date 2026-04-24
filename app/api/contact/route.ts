import { NextRequest, NextResponse } from "next/server";
import { sendCompanyEmail, sendUserEmail } from "@/lib/mailer";

/* ─────────────────────────────────────────────────────────────
   POST /api/contact

   Production-hardened contact endpoint:
   1. Env validation  — fails fast if SMTP creds missing
   2. Honeypot field  — silently drops bot submissions
   3. Rate limiting   — 5 requests / hour per IP (in-memory)
   4. Input validation + sanitisation
   5. Independent email delivery via Promise.allSettled
      (if one email fails, the other still sends)
───────────────────────────────────────────────────────────── */

export const runtime = "nodejs";

/* ── Required env vars — validated on first request ── */
const REQUIRED_ENV = ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS"] as const;
function validateEnv() {
  const missing = REQUIRED_ENV.filter((k) => !process.env[k]);
  if (missing.length) {
    throw new Error(`Missing required env vars: ${missing.join(", ")}`);
  }
}

/* ── In-memory rate limiter (per-IP) ──
   Good enough for a single-container deployment. If you scale
   horizontally, swap this for Redis / Upstash. */
const RATE_LIMIT_MAX    = 5;               // requests
const RATE_LIMIT_WINDOW = 60 * 60 * 1000;  // 1 hour

const requestLog = new Map<string, number[]>();

function getClientIp(request: NextRequest): string {
  const fwd = request.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  const real = request.headers.get("x-real-ip");
  if (real) return real.trim();
  return "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const hits = (requestLog.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW);
  if (hits.length >= RATE_LIMIT_MAX) {
    requestLog.set(ip, hits);
    return true;
  }
  hits.push(now);
  requestLog.set(ip, hits);

  // Periodic cleanup — keep the map from growing unbounded
  if (requestLog.size > 10_000) {
    for (const [k, v] of requestLog) {
      const pruned = v.filter((t) => now - t < RATE_LIMIT_WINDOW);
      if (pruned.length === 0) requestLog.delete(k);
      else requestLog.set(k, pruned);
    }
  }
  return false;
}

/* ─────────────────────────────────────────────────────────── */

export async function POST(request: NextRequest) {
  try {
    /* ── 0. Env check ── */
    try {
      validateEnv();
    } catch (e) {
      console.error("[Contact API]", (e as Error).message);
      return NextResponse.json(
        { error: "Service temporarily unavailable. Please call +91 98342 20116." },
        { status: 503 }
      );
    }

    /* ── 1. Rate limit ── */
    const ip = getClientIp(request);
    if (isRateLimited(ip)) {
      console.warn(`[Contact API] Rate limited: ${ip}`);
      return NextResponse.json(
        { error: "Too many requests. Please try again in an hour, or call +91 98342 20116." },
        { status: 429 }
      );
    }

    /* ── 2. Parse body ── */
    let body: Record<string, unknown>;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }

    const { name, email, phone, service, message, website } = body as {
      name?: string;
      email?: string;
      phone?: string;
      service?: string;
      message?: string;
      website?: string; // honeypot
    };

    /* ── 3. Honeypot ── bots will fill hidden "website" field.
       Real users never see it. Silently accept to avoid tipping off bots. */
    if (website && website.trim() !== "") {
      console.warn(`[Contact API] Honeypot triggered from ${ip}`);
      return NextResponse.json({
        success: true,
        message: "Your enquiry has been received. We'll get back to you within 24 hours.",
      });
    }

    /* ── 4. Validate ── */
    if (!name?.trim()) {
      return NextResponse.json({ error: "Name is required." }, { status: 400 });
    }
    if (!email?.trim()) {
      return NextResponse.json({ error: "Email address is required." }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }
    if (!message?.trim()) {
      return NextResponse.json({ error: "Message is required." }, { status: 400 });
    }
    if (message.trim().length < 10) {
      return NextResponse.json(
        { error: "Please write a more detailed message (at least 10 characters)." },
        { status: 400 }
      );
    }

    /* ── 5. Sanitise (trim + length caps) ── */
    const clean = {
      name:    name.trim().slice(0, 200),
      email:   email.trim().toLowerCase().slice(0, 254),
      phone:   phone?.trim().slice(0, 20)    || undefined,
      service: service?.trim().slice(0, 200) || undefined,
      message: message.trim().slice(0, 5000),
    };

    /* ── 6. Send both emails independently ── */
    const [companyResult, userResult] = await Promise.allSettled([
      sendCompanyEmail(clean),
      sendUserEmail({ name: clean.name, email: clean.email, service: clean.service }),
    ]);

    const companyOk = companyResult.status === "fulfilled";
    const userOk    = userResult.status    === "fulfilled";

    if (!companyOk) {
      console.error("[Contact API] Company email failed:", companyResult.reason);
    } else {
      console.log(`[Contact API] ✓ Company notification sent to ${process.env.COMPANY_EMAIL ?? process.env.SMTP_USER}`);
    }
    if (!userOk) {
      console.error("[Contact API] User confirmation email failed:", userResult.reason);
    } else {
      console.log(`[Contact API] ✓ User confirmation sent to ${clean.email}`);
    }

    /* ── 7. Respond ── */
    // Only hard-fail if BOTH emails failed (enquiry is lost)
    if (!companyOk && !userOk) {
      return NextResponse.json(
        {
          error:
            "Something went wrong on our end. Please call us at +91 98342 20116 or WhatsApp us.",
        },
        { status: 500 }
      );
    }

    // At least one email went out — enquiry is captured
    return NextResponse.json({
      success: true,
      message: "Your enquiry has been received! We'll get back to you within 24 hours.",
    });
  } catch (err) {
    console.error("[Contact API] Unexpected error:", err);
    return NextResponse.json(
      {
        error:
          "An unexpected error occurred. Please try again or contact us at +91 98342 20116.",
      },
      { status: 500 }
    );
  }
}
