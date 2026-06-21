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

async function sendTermiiSMS(phone: string, code: string): Promise<string | null> {
  const termiiPhone = phone.replace(/^\+/, "");
  const res = await fetch("https://api.ng.termii.com/api/sms/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      api_key: process.env.TERMII_API_KEY,
      to: termiiPhone,
      from: process.env.TERMII_SENDER_ID ?? "RanaJob",
      sms: `Your Ranajob verification code is ${code}. Valid for 5 minutes. Do not share this code.`,
      type: "plain",
      channel: "generic",
    }),
  });
  const data = await res.json();
  if (!res.ok || (data.code && data.code !== "ok")) {
    return data.message || "Failed to send SMS";
  }
  return null;
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const phone: string = body?.phone ?? "";

  if (!phone || !/^\+\d{10,15}$/.test(phone)) {
    return NextResponse.json({ error: "Invalid phone number" }, { status: 400 });
  }

  // Basic rate-limit: reject if an OTP was sent less than 60 s ago
  const { data: existing } = await supabaseAdmin
    .from("otp_codes")
    .select("created_at")
    .eq("phone", phone)
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
    .upsert({ phone, code, expires_at: expiresAt, created_at: new Date().toISOString() });

  if (dbError) {
    console.error("[send-otp] DB error:", dbError);
    return NextResponse.json({ error: `DB: ${dbError.message}` }, { status: 500 });
  }

  // ── DEV MODE ──────────────────────────────────────────────────────────────
  // When no Termii sender ID is approved yet, print the code to the terminal
  // instead of sending an SMS. Remove this block (or set NODE_ENV=production)
  // before going live.
  if (process.env.NODE_ENV !== "production") {
    console.log(`\n📱 OTP for ${phone}: ${code}\n`);
    return NextResponse.json({ success: true });
  }
  // ─────────────────────────────────────────────────────────────────────────

  const smsError = await sendTermiiSMS(phone, code);
  if (smsError) {
    return NextResponse.json({ error: smsError }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
