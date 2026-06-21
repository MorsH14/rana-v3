import { getSupabase } from "./supabase";

export async function createAnonymousSession() {
  const { data, error } = await getSupabase().auth.signInAnonymously();
  if (error) throw error;
  return data.session;
}

export async function getSession() {
  const { data: { session } } = await getSupabase().auth.getSession();
  return session;
}

export async function saveProfileToSupabase(userId: string, profile: {
  name: string;
  phone: string;
  accountType: "worker" | "client";
  location?: string;
}) {
  const { error } = await getSupabase().from("profiles").upsert({
    id: userId,
    name: profile.name,
    phone: profile.phone,
    account_type: profile.accountType,
    ...(profile.location ? { location: profile.location } : {}),
  });
  return error;
}

export async function signOut() {
  await getSupabase().auth.signOut();
}

export async function savePreferencesToSupabase(userId: string, categories: string[]) {
  const { error } = await getSupabase().from("user_preferences").upsert({
    user_id: userId,
    categories,
  });
  return error;
}

// Sends a 6-digit OTP to the given E.164 phone number via Termii SMS.
export async function sendPhoneOTP(e164Phone: string): Promise<string | null> {
  try {
    const res = await fetch("/api/auth/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone: e164Phone }),
    });
    const data = await res.json();
    return data.error ?? null;
  } catch {
    return "Network error. Please try again.";
  }
}

// Verifies the OTP and establishes a Supabase session for the user.
// On success, the session is set on the Supabase client and null is returned.
export async function verifyPhoneOTP(e164Phone: string, token: string): Promise<string | null> {
  try {
    const res = await fetch("/api/auth/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone: e164Phone, code: token }),
    });
    const data = await res.json();
    if (data.error) return data.error;

    // Restore the verified session on the Supabase client
    await getSupabase().auth.setSession({
      access_token: data.session.access_token,
      refresh_token: data.session.refresh_token,
    });
    return null;
  } catch {
    return "Network error. Please try again.";
  }
}
