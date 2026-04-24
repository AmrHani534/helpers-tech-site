"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RotateCcw } from "lucide-react";

function getAdminErrorMessage(error: Error): string {
  if (error.message === "Not authorized") {
    return "Your admin session is not authorized. Sign in with an allowed admin email, then try again.";
  }

  if (error.message === "Forbidden" || error.message.includes("permission denied")) {
    return "Access forbidden. This usually means the SUPABASE_SERVICE_ROLE_KEY is incorrect or missing. Please check your environment variables.";
  }

  if (error.message) return error.message;

  return "The admin action failed. Check the server logs for details.";
}

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="flex min-h-[70vh] items-center justify-center py-24">
      <div className="container-app max-w-xl text-center">
        <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-rose-500/15 text-rose-300">
          <AlertCircle className="h-6 w-6" />
        </div>
        <span className="mt-5 block text-xs font-semibold uppercase tracking-wider text-rose-300">
          Admin action failed
        </span>
        <h1 className="mt-3 heading-md text-white">Could not save changes</h1>
        <p className="mt-3 text-sm leading-6 text-slate-400">
          {getAdminErrorMessage(error)}
        </p>
        {error.digest ? (
          <p className="mt-2 font-mono text-xs text-slate-600">
            Digest: {error.digest}
          </p>
        ) : null}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button onClick={reset} className="btn-primary">
            <RotateCcw className="h-4 w-4" /> Try again
          </button>
          <Link href="/admin" className="btn-secondary">
            Back to admin
          </Link>
        </div>
      </div>
    </section>
  );
}
