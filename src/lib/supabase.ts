import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

// Lazy singleton — avoids crashing during Next.js static prerendering
// when env vars aren't yet available in the build environment.
let _client: ReturnType<typeof createClient<Database>> | null = null;

export function getSupabase() {
  if (!_client) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) throw new Error("NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY must be set");
    _client = createClient<Database>(url, key);
  }
  return _client;
}

// Convenience export for direct use — throws if env vars missing
export const supabase = new Proxy({} as ReturnType<typeof createClient<Database>>, {
  get(_target, prop) {
    return (getSupabase() as unknown as Record<string | symbol, unknown>)[prop];
  },
});
