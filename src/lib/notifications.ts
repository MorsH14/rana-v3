import { getSupabase } from "./supabase";

export type UINotification = {
  id: string;
  type: string;
  title: string;
  message: string;
  read: boolean;
  action_href: string | null;
  time: string;
};

function timeAgo(isoString: string): string {
  const diff = Date.now() - new Date(isoString).getTime();
  const mins = Math.floor(diff / 60_000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins} minute${mins === 1 ? "" : "s"} ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hour${hrs === 1 ? "" : "s"} ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days} day${days === 1 ? "" : "s"} ago`;
  return new Date(isoString).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

export async function fetchNotifications(userId: string): Promise<UINotification[]> {
  const { data, error } = await getSupabase()
    .from("notifications")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error || !data) return [];

  return data.map((n) => ({
    id: n.id,
    type: n.type,
    title: n.title,
    message: n.message,
    read: n.read,
    action_href: n.action_href,
    time: timeAgo(n.created_at),
  }));
}

export async function markNotificationRead(id: string) {
  await getSupabase().from("notifications").update({ read: true }).eq("id", id);
}

export async function markAllNotificationsRead(userId: string) {
  await getSupabase()
    .from("notifications")
    .update({ read: true })
    .eq("user_id", userId)
    .eq("read", false);
}

export async function dismissNotification(id: string) {
  await getSupabase().from("notifications").delete().eq("id", id);
}

export async function fetchConversationCount(userId: string): Promise<number> {
  const { count } = await getSupabase()
    .from("conversations")
    .select("id", { count: "exact", head: true })
    .or(`client_id.eq.${userId},worker_id.eq.${userId}`);
  return count ?? 0;
}
