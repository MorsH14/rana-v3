import { getSupabase } from "./supabase";

export async function fetchSavedIds(userId: string): Promise<string[]> {
  const { data, error } = await getSupabase()
    .from("saved_jobs")
    .select("listing_id")
    .eq("user_id", userId);

  if (error || !data) return [];
  return data.map((row) => row.listing_id);
}

export async function saveJob(userId: string, listingId: string): Promise<void> {
  await getSupabase()
    .from("saved_jobs")
    .upsert({ user_id: userId, listing_id: listingId });
}

export async function unsaveJob(userId: string, listingId: string): Promise<void> {
  await getSupabase()
    .from("saved_jobs")
    .delete()
    .eq("user_id", userId)
    .eq("listing_id", listingId);
}
