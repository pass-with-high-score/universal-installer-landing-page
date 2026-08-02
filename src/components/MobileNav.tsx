"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Github, Heart } from "lucide-react";

const links = [
  { href: "/#features", label: "Features" },
  { href: "/guide", label: "Guide" },
  { href: "/testing", label: "Android TV beta" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
];

/**
 * Header navigation for small screens.
 *
 * The header used to hide links per-breakpoint, which meant that on a phone Features, TV beta,
 * Privacy and Terms simply had no entry point — the footer was the only way to reach them. This
 * puts every destination behind one button instead of dropping them.
 */
export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);

  // A same-page anchor like /#features does not change the pathname, so closing is driven from
  // the link's own onClick as well as this.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    // Keep the page behind the sheet from scrolling under it.
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-label={open ? "Close menu" : "Open menu"}
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/10 text-zinc-700 hover:bg-black/5 dark:border-white/15 dark:text-zinc-200 dark:hover:bg-white/10"
      >
        {open ? <X size={18} aria-hidden /> : <Menu size={18} aria-hidden />}
      </button>

      {open && (
        <>
          <div
            aria-hidden
            onClick={() => setOpen(false)}
            className="fixed inset-x-0 top-14 bottom-0 z-40 bg-black/40 backdrop-blur-[2px]"
          />
          <div
            id="mobile-nav-panel"
            ref={panelRef}
            className="fixed inset-x-0 top-14 z-50 border-b border-black/5 bg-white shadow-xl dark:border-white/10 dark:bg-zinc-950"
          >
            <nav className="mx-auto max-w-6xl px-4 py-3 sm:px-6">
              <ul className="flex flex-col">
                {links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-xl px-3 py-3 text-base font-medium text-zinc-700 hover:bg-black/5 dark:text-zinc-200 dark:hover:bg-white/5"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-2 flex gap-2 border-t border-black/5 pt-3 dark:border-white/10">
                <a
                  href="https://github.com/pass-with-high-score/universal-installer"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-[color:var(--brand)] text-sm font-semibold text-white"
                >
                  <Github size={16} aria-hidden />
                  GitHub
                </a>
                <a
                  href="https://github.com/sponsors/pass-with-high-score"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-full border border-pink-500/30 bg-pink-50 text-sm font-semibold text-pink-700 dark:border-pink-400/30 dark:bg-pink-500/10 dark:text-pink-300"
                >
                  <Heart size={16} aria-hidden className="fill-current" />
                  Sponsor
                </a>
              </div>
            </nav>
          </div>
        </>
      )}
    </div>
  );
}
