import { NextResponse, type NextRequest } from "next/server";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { getSupabaseEnv, isSupabaseConfigured } from "@/lib/supabase/config";

type CookieToSet = { name: string; value: string; options?: CookieOptions };

/**
 * GET /auth/callback
 *
 * Handles the auth code exchange after a user clicks a Supabase email link
 * (signup confirmation, magic-link, password-reset, etc.).
 *
 * Supabase redirects here with `?code=<pkce_code>&next=<redirect_path>`.
 * We exchange the code for a session then redirect to the desired page.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/admin";

  // Use the host header or NEXT_PUBLIC_SITE_URL to get the public origin
  const host = request.headers.get("host");
  const protocol = request.headers.get("x-forwarded-proto") || "http";
  const origin = host ? `${protocol}://${host}` : request.nextUrl.origin;

  if (!code || !isSupabaseConfigured()) {
    return NextResponse.redirect(`${origin}/`);
  }

  const { url, anonKey } = getSupabaseEnv();
  const response = NextResponse.redirect(`${origin}${next}`);

  const supabase = createServerClient(url!, anonKey!, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet: CookieToSet[]) {
        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    console.error("[auth/callback] Code exchange failed:", error.message);
    // Redirect to login with an error hint
    return NextResponse.redirect(`${origin}/admin/login?error=auth_callback_failed`);
  }

  return response;
}
