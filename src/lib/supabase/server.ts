import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { getSupabaseEnv, isSupabaseConfigured } from "./config";

type CookieToSet = { name: string; value: string; options?: CookieOptions };

/**
 * Server-side Supabase client that reads/writes the auth cookie.
 * Returns null if Supabase env vars are not configured so that the
 * app can degrade gracefully to the static seed data.
 */
export async function getSupabaseServer() {
  if (!isSupabaseConfigured()) return null;
  const { url, anonKey } = getSupabaseEnv();
  const cookieStore = await cookies();

  return createServerClient(url!, anonKey!, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet: CookieToSet[]) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Can be called from a server component where cookies are immutable.
        }
      },
    },
  });
}

/** Admin client using the service role key. Server-only. */
export async function getSupabaseAdmin() {
  if (!isSupabaseConfigured()) return null;
  const { url, serviceRoleKey } = getSupabaseEnv();
  if (!serviceRoleKey) return null;
  const { createClient } = await import("@supabase/supabase-js");
  return createClient(url!, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
