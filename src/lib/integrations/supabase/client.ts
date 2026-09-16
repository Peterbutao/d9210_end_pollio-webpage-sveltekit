import { createClient } from "@supabase/supabase-js";
import * as envPublic from "$env/static/public";
import type { Database } from "./types";

// Support both naming schemes: new `PUBLISHABLE_KEY` (sb_publishable_...) and legacy `ANON_KEY`
const PUBLIC_SUPABASE_URL = (envPublic as Record<string, string | undefined>).PUBLIC_SUPABASE_URL;
const PUBLIC_SUPABASE_PUBLISHABLE_KEY =
  (envPublic as Record<string, string | undefined>).PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
  (envPublic as Record<string, string | undefined>).PUBLIC_SUPABASE_ANON_KEY;

function createSupabaseClient() {
  if (!PUBLIC_SUPABASE_URL || !PUBLIC_SUPABASE_PUBLISHABLE_KEY) {
    const missing = [
      ...(!PUBLIC_SUPABASE_URL ? ["PUBLIC_SUPABASE_URL"] : []),
      ...(!PUBLIC_SUPABASE_PUBLISHABLE_KEY ? ["PUBLIC_SUPABASE_PUBLISHABLE_KEY (or PUBLIC_SUPABASE_ANON_KEY)"] : []),
    ];
    throw new Error(`Missing Supabase public env variable(s): ${missing.join(", ")}. Set them in your .env file.`);
  }

  return createClient<Database>(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_PUBLISHABLE_KEY, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  });
}

let _supabase: ReturnType<typeof createSupabaseClient> | undefined;

export const supabase = new Proxy({} as ReturnType<typeof createSupabaseClient>, {
  get(_, prop, receiver) {
    if (!_supabase) _supabase = createSupabaseClient();
    return Reflect.get(_supabase, prop, receiver);
  },
});
