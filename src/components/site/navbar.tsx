"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { site } from "@/lib/site";
import { Logo } from "./logo";
import { LocaleSwitcher } from "./locale-switcher";
import { cn } from "@/lib/utils";
import { getDict, type Locale } from "@/lib/i18n";

export function Navbar({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const t = getDict(locale).nav;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => void (document.body.style.overflow = "");
  }, [open]);

  const navItems = [
    { href: "/", label: t.home },
    { href: "/about", label: t.about },
    { href: "/services", label: t.services },
    { href: "/projects", label: t.projects },
    { href: "/team", label: t.team },
    { href: "/faq", label: t.faq },
    { href: "/contact", label: t.contact },
  ];

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "backdrop-blur-xl bg-ink-950/80 border-b border-white/5"
          : "bg-transparent",
      )}
    >
      <div className="container-app flex h-16 items-center justify-between gap-4">
        <Logo />

        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                isActive(item.href)
                  ? "text-white"
                  : "text-slate-300 hover:text-white",
              )}
            >
              {isActive(item.href) ? (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-0 rounded-full bg-white/10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                />
              ) : null}
              <span className="relative z-10">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-2">
          <LocaleSwitcher current={locale} />
          <Link href="/contact" className="btn-primary">
            {t.getQuote}
            <ArrowRight className="h-4 w-4 rtl:rotate-180" />
          </Link>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden border-t border-white/5 bg-ink-950/95 backdrop-blur-xl"
          >
            <div className="container-app flex flex-col gap-1 py-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium",
                    isActive(item.href)
                      ? "bg-white/10 text-white"
                      : "text-slate-300 hover:bg-white/5 hover:text-white",
                  )}
                >
                  {item.label}
                  <ArrowRight className="h-4 w-4 opacity-60 rtl:rotate-180" />
                </Link>
              ))}
              <div className="mt-2 flex items-center gap-2">
                <LocaleSwitcher current={locale} />
                <Link href="/contact" className="btn-primary flex-1 justify-center">
                  {t.getQuote}
                </Link>
              </div>
              <div className="mt-3 text-xs text-slate-500">
                <a href={`mailto:${site.email}`} className="hover:text-slate-300">
                  {site.email}
                </a>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
