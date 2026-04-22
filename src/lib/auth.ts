import { getSupabaseServer } from "./supabase/server";

export function getAdminEmails(): string[] {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
}

export async function getCurrentUser() {
  const supabase = await getSupabaseServer();
  if (!supabase) return null;
  const { data } = await supabase.auth.getUser();
  return data.user ?? null;
}

export async function isAdmin(): Promise<boolean> {
  const user = await getCurrentUser();
  if (!user?.email) return false;
  const allowed = getAdminEmails();
  if (allowed.length === 0) return true; // no allowlist = any authed user is admin
  return allowed.includes(user.email.toLowerCase());
}
