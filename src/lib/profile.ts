import { getSupabase } from "./supabase";

export async function fetchProfile(userId: string) {
  const { data, error } = await getSupabase()
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error || !data) return null;
  return data;
}

export async function updateProfile(userId: string, updates: {
  name?: string;
  role?: string | null;
  location?: string | null;
  profile_image?: string | null;
}) {
  const { error } = await getSupabase()
    .from("profiles")
    .update(updates)
    .eq("id", userId);
  return error;
}

export async function updatePreferences(userId: string, prefs: {
  categories?: string[];
  location_visible?: boolean;
  phone_visible?: boolean;
  notif_job_matches?: boolean;
  notif_application_updates?: boolean;
  notif_profile_tips?: boolean;
  notif_reviews?: boolean;
}) {
  const { error } = await getSupabase()
    .from("user_preferences")
    .upsert({ user_id: userId, ...prefs });
  return error;
}
