import { NextResponse, type NextRequest } from "next/server";
import { createServerClient, type CookieOptions } from "@supabase/ssr";

type CookieToSet = { name: string; value: string; options?: CookieOptions };

/**
 * Refreshes the Supabase auth session on every request. When Supabase isn't
 * configured (no env vars) we pass through so the marketing site still works.
 *
 * Also propagates the pathname as an `x-pathname` request header so the root
 * layout can read it via `headers()` and swap between the public site chrome
 * and the bare admin layout.
 */
export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Propagate the pathname so server components can branch on it.
  const forwardedHeaders = new Headers(request.headers);
  forwardedHeaders.set("x-pathname", pathname);

  // If a Supabase auth code arrives on any page (e.g. /admin after email
  // confirmation), redirect it to /auth/callback for proper PKCE exchange.
  const code = request.nextUrl.searchParams.get("code");
  if (code && pathname !== "/auth/callback") {
    const callbackUrl = request.nextUrl.clone();
    callbackUrl.pathname = "/auth/callback";
    // Preserve the original destination so the callback can redirect back.
    callbackUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(callbackUrl);
  }

  if (!url || !anonKey) {
    return NextResponse.next({ request: { headers: forwardedHeaders } });
  }

  let response = NextResponse.next({ request: { headers: forwardedHeaders } });

  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet: CookieToSet[]) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request: { headers: forwardedHeaders } });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options),
        );
      },
    },
  });

  await supabase.auth.getUser();
  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|images|api/chat|.*\\..*).*)",
  ],
};
