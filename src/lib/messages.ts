import { getSupabase } from "./supabase";

export type UIConversation = {
  id: string;
  name: string;
  initials: string;
  avatarColor: string;
  jobTitle: string;
  lastMessage: string;
  lastTime: string;
  unread: number;
  otherUserId: string;
};

export type UIMessage = {
  id: string;
  senderId: "me" | string;
  text: string;
  time: string;
};

const AVATAR_COLORS = ["#8dd6ecb9", "#92e7acb3", "#ce93d38d", "#e79c469d", "#b597ebb8", "#c4e7469d"];

function getInitials(name: string) {
  return name.split(" ").filter(Boolean).map((w) => w[0]).join("").slice(0, 2).toUpperCase();
}

function formatTime(isoString: string): string {
  const d = new Date(isoString);
  const now = new Date();
  const isToday = d.toDateString() === now.toDateString();
  if (isToday) return d.toLocaleTimeString("en-NG", { hour: "2-digit", minute: "2-digit" });
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  if (d.toDateString() === yesterday.toDateString()) return "Yesterday";
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

export async function fetchConversations(userId: string): Promise<UIConversation[]> {
  const { data: convos, error } = await getSupabase()
    .from("conversations")
    .select("*")
    .or(`client_id.eq.${userId},worker_id.eq.${userId}`)
    .order("last_message_at", { ascending: false });

  if (error || !convos || convos.length === 0) return [];

  const otherIds = convos.map((c) => (c.client_id === userId ? c.worker_id : c.client_id));

  const { data: profiles } = await getSupabase()
    .from("profiles")
    .select("id, name")
    .in("id", otherIds);
  const profileMap = new Map((profiles ?? []).map((p) => [p.id, p.name]));

  const listingIds = convos.filter((c) => c.listing_id).map((c) => c.listing_id as string);
  const { data: listings } = listingIds.length > 0
    ? await getSupabase().from("listings").select("id, title").in("id", listingIds)
    : { data: [] };
  const listingMap = new Map((listings ?? []).map((l) => [l.id, l.title]));

  const unreadResults = await Promise.all(
    convos.map((c) =>
      getSupabase()
        .from("messages")
        .select("id", { count: "exact", head: true })
        .eq("conversation_id", c.id)
        .eq("read", false)
        .neq("sender_id", userId)
        .then(({ count }) => ({ id: c.id, count: count ?? 0 }))
    )
  );
  const unreadMap = new Map(unreadResults.map((u) => [u.id, u.count]));

  return convos.map((c, i) => {
    const otherId = c.client_id === userId ? c.worker_id : c.client_id;
    const name = profileMap.get(otherId) ?? "Unknown";
    return {
      id: c.id,
      name,
      initials: getInitials(name),
      avatarColor: AVATAR_COLORS[i % AVATAR_COLORS.length],
      jobTitle: c.listing_id ? (listingMap.get(c.listing_id) ?? "") : "",
      lastMessage: c.last_message ?? "",
      lastTime: c.last_message_at ? formatTime(c.last_message_at) : "",
      unread: unreadMap.get(c.id) ?? 0,
      otherUserId: otherId,
    };
  });
}

export async function fetchMessages(conversationId: string, userId: string): Promise<UIMessage[]> {
  const { data, error } = await getSupabase()
    .from("messages")
    .select("*")
    .eq("conversation_id", conversationId)
    .order("created_at", { ascending: true });

  if (error || !data) return [];

  return data.map((msg) => ({
    id: msg.id,
    senderId: msg.sender_id === userId ? "me" : msg.sender_id,
    text: msg.text,
    time: formatTime(msg.created_at),
  }));
}

export async function sendMessage(conversationId: string, senderId: string, text: string) {
  const { data, error } = await getSupabase()
    .from("messages")
    .insert({ conversation_id: conversationId, sender_id: senderId, text })
    .select("id")
    .single();

  if (error || !data) return null;

  await getSupabase()
    .from("conversations")
    .update({ last_message: text, last_message_at: new Date().toISOString() })
    .eq("id", conversationId);

  return data.id;
}

export async function markMessagesRead(conversationId: string, userId: string) {
  await getSupabase()
    .from("messages")
    .update({ read: true })
    .eq("conversation_id", conversationId)
    .neq("sender_id", userId)
    .eq("read", false);
}

export function subscribeToMessages(
  conversationId: string,
  onNew: (msg: UIMessage) => void,
  userId: string
) {
  const channel = getSupabase()
    .channel(`messages:${conversationId}`)
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "messages",
        filter: `conversation_id=eq.${conversationId}`,
      },
      (payload) => {
        const row = payload.new as { id: string; sender_id: string; text: string; created_at: string };
        onNew({
          id: row.id,
          senderId: row.sender_id === userId ? "me" : row.sender_id,
          text: row.text,
          time: formatTime(row.created_at),
        });
      }
    )
    .subscribe();

  return () => { getSupabase().removeChannel(channel); };
}
