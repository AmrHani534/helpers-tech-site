import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center py-24">
      <div className="container-app max-w-xl text-center">
        <span className="eyebrow">404</span>
        <h1 className="mt-3 heading-lg text-white">This page took a different path.</h1>
        <p className="mt-3 text-slate-400">
          The link might be outdated, or the project was unpublished. Let&apos;s
          get you back to something real.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn-primary">
            <ArrowLeft className="h-4 w-4 rtl:rotate-180" /> Back home
          </Link>
          <Link href="/projects" className="btn-secondary">
            See our projects
          </Link>
        </div>
      </div>
    </section>
  );
}
