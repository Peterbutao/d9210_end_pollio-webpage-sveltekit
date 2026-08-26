import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";
import { SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY } from "$env/static/private";

function isNewSupabaseApiKey(value: string): boolean {
  return value.startsWith("sb_publishable_") || value.startsWith("sb_secret_");
}

function createSupabaseFetch(supabaseKey: string): typeof fetch {
  return (input, init) => {
    const headers = new Headers(typeof Request !== "undefined" && input instanceof Request ? input.headers : undefined);
    if (init?.headers) {
      new Headers(init.headers).forEach((value, key) => headers.set(key, value));
    }
    if (isNewSupabaseApiKey(supabaseKey) && headers.get("Authorization") === `Bearer ${supabaseKey}`) {
      headers.delete("Authorization");
    }
    headers.set("apikey", supabaseKey);
    return fetch(input, { ...init, headers });
  };
}

export class SupabaseAuthError extends Error {
  constructor(
    message: string,
    public statusCode: number = 401,
  ) {
    super(message);
    this.name = "SupabaseAuthError";
  }
}

export async function authenticatedSupabaseClient(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (!authHeader) throw new SupabaseAuthError("Unauthorized: No authorization header provided");
  if (!authHeader.startsWith("Bearer ")) throw new SupabaseAuthError("Unauthorized: Only Bearer tokens are supported");

  const token = authHeader.replace("Bearer ", "");
  if (!token) throw new SupabaseAuthError("Unauthorized: No token provided");
  if (token.split(".").length !== 3) throw new SupabaseAuthError("Unauthorized: Invalid token");

  const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    global: {
      fetch: createSupabaseFetch(SUPABASE_PUBLISHABLE_KEY),
      headers: { Authorization: `Bearer ${token}` },
    },
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data?.user) throw new SupabaseAuthError("Unauthorized: Invalid token");

  return { supabase, userId: data.user.id, user: data.user };
}
