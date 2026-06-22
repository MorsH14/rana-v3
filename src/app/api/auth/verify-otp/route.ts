import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

// Lazy singletons — env vars are only available at request time, not build time
let _admin: ReturnType<typeof createClient> | null = null;
let _regular: ReturnType<typeof createClient> | null = null;

function getAdmin() {
  if (!_admin) {
    _admin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { autoRefreshToken: false, persistSession: false } }
    );
  }
  return _admin;
}

function getRegular() {
  if (!_regular) {
    _regular = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { auth: { autoRefreshToken: false, persistSession: false } }
    );
  }
  return _regular;
}

function derivePassword(email: string): string {
  return crypto
    .createHmac("sha256", process.env.OTP_SECRET ?? "dev-secret")
    .update(email)
    .digest("hex");
}

function verifyOTPCookie(
  cookieValue: string,
  email: string,
  code: string
): { ok: true } | { ok: false; error: string } {
  try {
    const [payload, sig] = cookieValue.split(".");
    if (!payload || !sig) return { ok: false, error: "Invalid session. Request a new code." };

    const expectedSig = crypto
      .createHmac("sha256", process.env.OTP_SECRET ?? "dev-secret")
      .update(payload)
      .digest();

    const actualSig = Buffer.from(sig, "hex");
    const sigsMatch =
      actualSig.length === expectedSig.length &&
      crypto.timingSafeEqual(actualSig, expectedSig);
    if (!sigsMatch) return { ok: false, error: "Invalid session. Request a new code." };

    const { email: cookieEmail, code: storedCode, exp } = JSON.parse(
      Buffer.from(payload, "base64url").toString()
    );

    if (cookieEmail !== email) return { ok: false, error: "Code not found. Request a new one." };
    if (Date.now() > exp) return { ok: false, error: "Code expired — tap Resend" };
    if (storedCode !== code) return { ok: false, error: "Incorrect code, try again" };

    return { ok: true };
  } catch {
    return { ok: false, error: "Invalid session. Request a new code." };
  }
}

export async function POST(req: NextRequest) {
  try {
    return await handlePost(req);
  } catch (err) {
    console.error("[verify-otp] Unhandled error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}

async function handlePost(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const email: string = body?.email ?? "";
  const code: string = body?.code ?? "";

  if (!email || !code) {
    return NextResponse.json({ error: "Email and code are required" }, { status: 400 });
  }

  // 1. Validate OTP from signed cookie (no Supabase needed for this step)
  const cookieValue = req.cookies.get("otp_session")?.value;
  console.log("[verify-otp] Cookie present:", !!cookieValue, "| Email:", JSON.stringify(email));

  if (!cookieValue) {
    return NextResponse.json({ error: "Code not found. Request a new one." }, { status: 400 });
  }

  const result = verifyOTPCookie(cookieValue, email, code);
  if (!result.ok) {
    console.error("[verify-otp] Cookie check failed:", result.error);
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  // 2. Sign in with derived credentials (returning user) or create account (new user)
  const password = derivePassword(email);

  const { data: signInData, error: signInError } =
    await getRegular().auth.signInWithPassword({ email, password });

  console.log("[verify-otp] signInWithPassword:", signInError?.message ?? "ok");
  let session = signInData?.session;

  if (signInError || !session) {
    const { error: createError } = await getAdmin().auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

    console.log("[verify-otp] createUser:", createError?.message ?? "ok");

    if (createError) {
      if (
        createError.message.includes("already registered") ||
        createError.message.includes("already exists")
      ) {
        // User exists without our derived password — find and update them
        const { data: listData, error: listError } =
          await getAdmin().auth.admin.listUsers({ perPage: 1000 });
        console.log("[verify-otp] listUsers:", listError?.message ?? "ok");

        const existing = listData?.users?.find((u) => u.email === email);
        if (!existing) {
          return NextResponse.json(
            { error: "Account lookup failed. Please try again or contact support." },
            { status: 500 }
          );
        }

        const { error: updateError } = await getAdmin().auth.admin.updateUserById(
          existing.id,
          { password, email_confirm: true }
        );
        console.log("[verify-otp] updateUser:", updateError?.message ?? "ok");

        if (updateError) {
          return NextResponse.json(
            { error: `Failed to update account: ${updateError.message}` },
            { status: 500 }
          );
        }
      } else {
        return NextResponse.json({ error: createError.message }, { status: 500 });
      }
    }

    const { data: retryData, error: retryError } =
      await getRegular().auth.signInWithPassword({ email, password });

    console.log("[verify-otp] retry signIn:", retryError?.message ?? "ok");

    if (retryError || !retryData.session) {
      return NextResponse.json(
        { error: retryError?.message ?? "Authentication failed" },
        { status: 500 }
      );
    }

    session = retryData.session;
  }

  // 3. Clear the one-time-use OTP cookie
  const res = NextResponse.json({
    session: {
      access_token: session.access_token,
      refresh_token: session.refresh_token,
    },
  });
  res.cookies.set("otp_session", "", { maxAge: 0, path: "/" });
  return res;
}
