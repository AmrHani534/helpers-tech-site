"use client";

import { useEffect } from "react";
import Link from "next/link";
import { RotateCcw } from "lucide-react";

export default function Error({
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
        <span className="eyebrow text-rose-300">Something broke</span>
        <h1 className="mt-3 heading-lg text-white">We&apos;re sorry for the inconvenience.</h1>
        <p className="mt-3 text-slate-400">
          Try refreshing. If this keeps happening, reach us on WhatsApp — we&apos;ll
          fix it immediately.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button onClick={reset} className="btn-primary">
            <RotateCcw className="h-4 w-4" /> Try again
          </button>
          <Link href="/" className="btn-secondary">
            Back home
          </Link>
        </div>
      </div>
    </section>
  );
}
