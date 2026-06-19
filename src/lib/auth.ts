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

export async function savePreferencesToSupabase(userId: string, categories: string[]) {
  const { error } = await getSupabase().from("user_preferences").upsert({
    user_id: userId,
    categories,
  });
  return error;
}
