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

// Sends a 6-digit OTP to the user's email via Resend.
export async function sendEmailOTP(email: string): Promise<string | null> {
  try {
    const res = await fetch("/api/auth/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    return data.error ?? null;
  } catch {
    return "Network error. Please try again.";
  }
}

// Verifies the OTP and sets a Supabase session on the client.
export async function verifyEmailOTP(email: string, token: string): Promise<string | null> {
  try {
    const res = await fetch("/api/auth/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, code: token }),
    });
    const data = await res.json();
    if (data.error) return data.error;

    await getSupabase().auth.setSession({
      access_token: data.session.access_token,
      refresh_token: data.session.refresh_token,
    });
    return null;
  } catch {
    return "Network error. Please try again.";
  }
}
