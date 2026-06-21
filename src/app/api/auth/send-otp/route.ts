import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
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
  if (!res.ok) return data.message || data.name || "Failed to send email";
  return null;
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const email: string = body?.email ?? "";

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
  }

  // Rate-limit: reject if a code was sent less than 60s ago
  const { data: existing } = await supabaseAdmin
    .from("otp_codes")
    .select("created_at")
    .eq("phone", email)
    .single();

  if (existing) {
    const ageMs = Date.now() - new Date(existing.created_at).getTime();
    if (ageMs < 60_000) {
      return NextResponse.json(
        { error: "Please wait a moment before requesting a new code" },
        { status: 429 }
      );
    }
  }

  const code = generateOTP();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString();

  const { error: dbError } = await supabaseAdmin
    .from("otp_codes")
    .upsert({ phone: email, code, expires_at: expiresAt, created_at: new Date().toISOString() });

  if (dbError) {
    console.error("[send-otp] DB error:", dbError);
    return NextResponse.json({ error: `DB: ${dbError.message}` }, { status: 500 });
  }

  // DEV MODE: print code to terminal instead of sending email
  if (process.env.NODE_ENV !== "production") {
    console.log(`\n📧 OTP for ${email}: ${code}\n`);
    return NextResponse.json({ success: true });
  }

  const emailError = await sendResendEmail(email, code);
  if (emailError) {
    return NextResponse.json({ error: emailError }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
