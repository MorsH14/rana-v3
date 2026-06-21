import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

const supabaseRegular = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

// Derive a stable password from the email so the same email always maps to
// the same Supabase user across sign-ins and devices.
function derivePassword(email: string): string {
  return crypto
    .createHmac("sha256", process.env.OTP_SECRET!)
    .update(email)
    .digest("hex");
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const email: string = body?.email ?? "";
  const code: string = body?.code ?? "";

  if (!email || !code) {
    return NextResponse.json({ error: "Email and code are required" }, { status: 400 });
  }

  // 1. Validate OTP — stored under the `phone` column (used as a generic key)
  const { data: otpRow } = await supabaseAdmin
    .from("otp_codes")
    .select("code, expires_at")
    .eq("phone", email)
    .single();

  if (!otpRow) {
    return NextResponse.json({ error: "Code not found. Request a new one." }, { status: 400 });
  }
  if (otpRow.code !== code) {
    return NextResponse.json({ error: "Incorrect code, try again" }, { status: 400 });
  }
  if (new Date(otpRow.expires_at) < new Date()) {
    return NextResponse.json({ error: "Code expired — tap Resend" }, { status: 400 });
  }

  // 2. Delete OTP — one-time use
  await supabaseAdmin.from("otp_codes").delete().eq("phone", email);

  // 3. Sign in with derived credentials (returning user) or create account (new user)
  const password = derivePassword(email);

  const { data: signInData, error: signInError } =
    await supabaseRegular.auth.signInWithPassword({ email, password });

  let session = signInData?.session;

  if (signInError || !session) {
    const { error: createError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

    if (createError && !createError.message.includes("already registered")) {
      return NextResponse.json({ error: "Failed to create account" }, { status: 500 });
    }

    const { data: retryData, error: retryError } =
      await supabaseRegular.auth.signInWithPassword({ email, password });

    if (retryError || !retryData.session) {
      return NextResponse.json({ error: "Authentication failed. Please try again." }, { status: 500 });
    }

    session = retryData.session;
  }

  return NextResponse.json({
    session: {
      access_token: session.access_token,
      refresh_token: session.refresh_token,
    },
  });
}
