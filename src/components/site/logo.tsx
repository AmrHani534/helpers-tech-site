import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`group flex items-center gap-2.5 ${className}`}
      aria-label={site.name}
    >
      <span className="relative inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-brand-500 to-accent-600 shadow-lg shadow-brand-500/30 transition-transform group-hover:scale-[1.04]">
        <Image
          src="/images/logo.png"
          alt={site.name}
          width={36}
          height={36}
          className="h-8 w-8 object-contain"
          priority
        />
      </span>
      <span className="font-display text-lg font-semibold tracking-tight text-white">
        Helpers<span className="text-brand-300">Tech</span>
      </span>
    </Link>
  );
}
