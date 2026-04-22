import { NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const supabase = await getSupabaseServer();
  if (supabase) {
    await supabase.auth.signOut();
  }
  const url = new URL("/admin/login", request.url);
  return NextResponse.redirect(url, { status: 303 });
}
