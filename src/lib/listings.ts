import { getSupabase } from "./supabase";
import type { PostedJob } from "@/types";

function formatDate(isoString: string): string {
  const d = new Date(isoString);
  const day = d.getDate();
  const suffix =
    day % 10 === 1 && day !== 11 ? "st" :
    day % 10 === 2 && day !== 12 ? "nd" :
    day % 10 === 3 && day !== 13 ? "rd" : "th";
  const month = d.toLocaleString("en-GB", { month: "long" });
  return `${day}${suffix} ${month} ${d.getFullYear()}`;
}

function mapRow(row: Record<string, unknown>): PostedJob {
  return {
    id: row.id as string,
    company: row.company as string,
    role: row.title as string,
    date: formatDate(row.created_at as string),
    salary: row.salary as string,
    salaryValue: row.salary_value as number,
    location: row.location as string,
    logo: (row.logo as string | null) ?? "",
    category: row.category as string,
    description: row.description as string,
    chips: row.chips as string[],
    rating: row.rating != null ? Number(row.rating) : undefined,
    reviewCount: row.review_count as number,
  };
}

export async function fetchListings(): Promise<PostedJob[]> {
  const { data, error } = await getSupabase()
    .from("listings")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (error || !data) return [];
  return data.map(mapRow);
}

export async function fetchListingById(id: string): Promise<PostedJob | null> {
  const { data, error } = await getSupabase()
    .from("listings")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) return null;
  return mapRow(data);
}

export async function fetchWorkerListings(workerId: string): Promise<PostedJob[]> {
  const { data, error } = await getSupabase()
    .from("listings")
    .select("*")
    .eq("worker_id", workerId)
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (error || !data) return [];
  return data.map(mapRow);
}

export async function postListing(workerId: string, listing: {
  title: string;
  company: string;
  category: string;
  description: string;
  salary: string;
  salary_value: number;
  location: string;
  logo?: string | null;
  chips: string[];
}): Promise<string | null> {
  const { data, error } = await getSupabase()
    .from("listings")
    .insert({
      worker_id: workerId,
      title: listing.title,
      company: listing.company,
      category: listing.category,
      description: listing.description,
      salary: listing.salary,
      salary_value: listing.salary_value,
      location: listing.location,
      logo: listing.logo ?? null,
      chips: listing.chips,
    })
    .select("id")
    .single();

  if (error || !data) return null;
  return data.id;
}
