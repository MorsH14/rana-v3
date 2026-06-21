import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

// Admin client — service role key, server-only, never exposed to browser
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

// Regular client — used for signInWithPassword to get a real user session
const supabaseRegular = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

// Derive stable email + password from a phone number.
// Same phone → same credentials → same Supabase user (across sign-ins/devices).
function deriveCredentials(e164Phone: string) {
  const secret = process.env.OTP_SECRET!;
  const stripped = e164Phone.replace("+", "");
  const email = `${stripped}@ph.ranajob.ng`;
  const password = crypto.createHmac("sha256", secret).update(e164Phone).digest("hex");
  return { email, password };
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const phone: string = body?.phone ?? "";
  const code: string = body?.code ?? "";

  if (!phone || !code) {
    return NextResponse.json({ error: "Phone and code are required" }, { status: 400 });
  }

  // 1. Fetch and validate OTP
  const { data: otpRow } = await supabaseAdmin
    .from("otp_codes")
    .select("code, expires_at")
    .eq("phone", phone)
    .single();

  if (!otpRow) {
    return NextResponse.json({ error: "Code not found. Request a new one." }, { status: 400 });
  }

  if (otpRow.code !== code) {
    return NextResponse.json({ error: "Incorrect code, try again" }, { status: 400 });
  }

  if (new Date(otpRow.expires_at) < new Date()) {
    return NextResponse.json({ error: "Code expired — tap Resend OTP" }, { status: 400 });
  }

  // 2. Delete OTP — one-time use
  await supabaseAdmin.from("otp_codes").delete().eq("phone", phone);

  // 3. Derive stable credentials and attempt sign-in (returning user)
  const { email, password } = deriveCredentials(phone);

  const { data: signInData, error: signInError } = await supabaseRegular.auth.signInWithPassword({
    email,
    password,
  });

  let session = signInData?.session;
  let isNewUser = false;

  // 4. If no user exists yet, create one and sign in
  if (signInError || !session) {
    const { error: createError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // skip email confirmation — phone was already verified
    });

    if (createError && !createError.message.includes("already registered")) {
      return NextResponse.json({ error: "Failed to create account" }, { status: 500 });
    }

    const { data: retryData, error: retryError } = await supabaseRegular.auth.signInWithPassword({
      email,
      password,
    });

    if (retryError || !retryData.session) {
      return NextResponse.json({ error: "Authentication failed. Please try again." }, { status: 500 });
    }

    session = retryData.session;
    isNewUser = true;
  }

  return NextResponse.json({
    session: {
      access_token: session.access_token,
      refresh_token: session.refresh_token,
    },
    isNewUser,
  });
}
