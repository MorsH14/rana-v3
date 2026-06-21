import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function buildCookieValue(email: string, code: string): string {
  const exp = Date.now() + 5 * 60 * 1000;
  const payload = Buffer.from(JSON.stringify({ email, code, exp })).toString("base64url");
  const sig = crypto
    .createHmac("sha256", process.env.OTP_SECRET ?? "dev-secret")
    .update(payload)
    .digest("hex");
  return `${payload}.${sig}`;
}

async function sendResendEmail(email: string, code: string): Promise<string | null> {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Ranajob <onboarding@resend.dev>",
      to: email,
      subject: "Your Ranajob verification code",
      html: `
        <div style="font-family:sans-serif;max-width:420px;margin:0 auto;padding:32px 24px;">
          <h2 style="margin:0 0 8px;color:#0D0D12;">Your verification code</h2>
          <p style="margin:0 0 24px;color:#808897;">Enter this code in the Ranajob app to continue:</p>
          <div style="font-size:40px;font-weight:700;letter-spacing:10px;color:#476EFB;margin-bottom:24px;">
            ${code}
          </div>
          <p style="margin:0;color:#A4ABB8;font-size:13px;">
            This code expires in 5 minutes. Do not share it with anyone.
          </p>
        </div>
      `,
    }),
  });
  const data = await res.json();
  if (!res.ok) {
    console.error("[send-otp] Resend error:", JSON.stringify(data));
    return data.message || data.name || "Failed to send email";
  }
  return null;
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const email: string = body?.email ?? "";

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
  }

  // Rate-limit: reject if a code was sent less than 60s ago (check existing cookie)
  const existingCookie = req.cookies.get("otp_session")?.value;
  if (existingCookie) {
    try {
      const [payload] = existingCookie.split(".");
      const { exp } = JSON.parse(Buffer.from(payload, "base64url").toString());
      const sentAt = exp - 5 * 60 * 1000;
      if (Date.now() - sentAt < 60_000) {
        return NextResponse.json(
          { error: "Please wait a moment before requesting a new code" },
          { status: 429 }
        );
      }
    } catch {
      // Malformed cookie — allow the request through
    }
  }

  const code = generateOTP();
  const cookieValue = buildCookieValue(email, code);

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    maxAge: 5 * 60,
    path: "/",
  };

  // No Resend key → print code to terminal for local dev
  if (!process.env.RESEND_API_KEY) {
    console.log(`\n📧 OTP for ${email}: ${code}\n`);
    const res = NextResponse.json({ success: true });
    res.cookies.set("otp_session", cookieValue, cookieOptions);
    return res;
  }

  const emailError = await sendResendEmail(email, code);
  if (emailError) {
    return NextResponse.json({ error: emailError }, { status: 500 });
  }

  const res = NextResponse.json({ success: true });
  res.cookies.set("otp_session", cookieValue, cookieOptions);
  return res;
}
