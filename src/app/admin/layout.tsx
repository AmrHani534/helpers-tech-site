import Link from "next/link";
import { ShieldAlert } from "lucide-react";
import { isSupabaseConfigured } from "@/lib/supabase/config";

/**
 * Outermost /admin layout.
 *
 * Deliberately minimal: the only thing this layout does is gate on Supabase
 * being configured. Authenticated chrome (sidebar, sign-out button) and auth
 * enforcement live in src/app/admin/(protected)/layout.tsx, so that the login
 * page (src/app/admin/login) and the logout route (src/app/admin/logout) are
 * not wrapped in logic that would cause a redirect loop for unauthenticated
 * users.
 */
export default function AdminOuterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!isSupabaseConfigured()) {
    return (
      <div className="container-app pt-40 pb-24">
        <div className="surface mx-auto max-w-xl p-10 text-center">
          <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/15 text-amber-300">
            <ShieldAlert className="h-6 w-6" />
          </div>
          <h1 className="mt-5 heading-md text-white">Admin is not configured</h1>
          <p className="mt-3 text-sm text-slate-400">
            Set <code className="text-amber-300">NEXT_PUBLIC_SUPABASE_URL</code>,{" "}
            <code className="text-amber-300">NEXT_PUBLIC_SUPABASE_ANON_KEY</code>,
            and <code className="text-amber-300">SUPABASE_SERVICE_ROLE_KEY</code> in
            your environment, run the SQL migration, then come back here to log in.
          </p>
          <Link href="/" className="btn-secondary mt-6">
            Back to site
          </Link>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
