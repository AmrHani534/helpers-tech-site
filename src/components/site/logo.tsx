import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-2.5 ${className}`}
      aria-label={site.name}
    >
      <Image
        src="/images/logo.png"
        alt={site.name}
        width={40}
        height={42}
        className="h-10 w-auto object-contain transition-transform group-hover:scale-[1.04]"
        priority
      />
      <span className="font-display text-lg font-semibold tracking-tight text-white transition-opacity group-hover:opacity-90">
        Helpers<span className="text-brand-300">Tech</span>
      </span>
    </Link>
  );
}
