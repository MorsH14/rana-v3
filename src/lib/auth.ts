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

// Sends a real SMS OTP via Supabase Phone Auth.
// Requires a phone provider (e.g. Twilio / Termii) to be configured in the
// Supabase dashboard under Authentication → Providers → Phone.
export async function sendPhoneOTP(e164Phone: string): Promise<string | null> {
  const { error } = await getSupabase().auth.signInWithOtp({ phone: e164Phone });
  return error?.message ?? null;
}

// Verifies the OTP sent by sendPhoneOTP. On success Supabase creates (or
// restores) a full authenticated session — getSession() will return it.
export async function verifyPhoneOTP(e164Phone: string, token: string): Promise<string | null> {
  const { error } = await getSupabase().auth.verifyOtp({
    phone: e164Phone,
    token,
    type: "sms",
  });
  return error?.message ?? null;
}
