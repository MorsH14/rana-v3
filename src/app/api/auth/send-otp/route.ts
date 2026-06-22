import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import nodemailer from "nodemailer";

function generateOTP(): string {
  return crypto.randomInt(100_000, 1_000_000).toString();
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

const OTP_HTML = (code: string) => `
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
`;

async function sendGmailOTP(email: string, code: string): Promise<string | null> {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `Ranajob <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "Your Ranajob verification code",
      html: OTP_HTML(code),
    });

    return null;
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to send email";
    console.error("[send-otp] Gmail error:", message);
    return message;
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const email: string = body?.email ?? "";

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
  }

  // Rate-limit: reject if a code was sent less than 60s ago
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
      // Malformed cookie — allow through
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

  // No Gmail credentials → print to terminal for local dev
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    console.log(`\n📧 OTP for ${email}: ${code}\n`);
    const res = NextResponse.json({ success: true });
    res.cookies.set("otp_session", cookieValue, cookieOptions);
    return res;
  }

  const emailError = await sendGmailOTP(email, code);
  if (emailError) {
    return NextResponse.json({ error: "Failed to send email. Please try again." }, { status: 500 });
  }

  const res = NextResponse.json({ success: true });
  res.cookies.set("otp_session", cookieValue, cookieOptions);
  return res;
}
