import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle, ArrowRight } from "lucide-react";
import { ERRORS } from "@/lib/errors";

export const metadata: Metadata = {
  title: "Android install errors, explained",
  description:
    "What every Android package install failure actually means and how to fix it — signature mismatches, downgrades, parse errors, MIUI optimization, missing ABIs and the rest.",
  keywords: [
    "Android install error",
    "app not installed fix",
    "INSTALL_FAILED",
    "there was a problem parsing the package",
    "apk won't install",
  ],
  alternates: { canonical: "/errors" },
  openGraph: {
    title: "Android install errors, explained",
    description:
      "What each install failure means and how to fix it, in plain language.",
    url: "/errors",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function ErrorsIndexPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <span className="inline-flex items-center gap-2 rounded-full border border-black/5 bg-white/70 px-3 py-1 text-xs font-medium text-zinc-600 dark:border-white/10 dark:bg-white/5 dark:text-zinc-300">
        <AlertTriangle size={14} aria-hidden />
        Reference
      </span>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl font-display dark:text-white">
        Android install errors, explained
      </h1>
      <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-300">
        Android tends to report a failed install as &ldquo;App not
        installed&rdquo; and leave it there. Each page below covers one real
        cause: what it means, why the system does it, and what actually fixes
        it.
      </p>

      <ul className="mt-8 flex flex-col gap-3">
        {ERRORS.map((e) => (
          <li key={e.slug}>
            <Link
              href={`/errors/${e.slug}`}
              className="group block rounded-2xl border border-black/5 bg-white p-5 hover:border-black/15 dark:border-white/10 dark:bg-white/5 dark:hover:border-white/25"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h2 className="font-semibold text-zinc-900 dark:text-white">
                    {e.title}
                  </h2>
                  {e.code && (
                    <code className="mt-1.5 inline-block font-mono text-xs text-zinc-500 dark:text-zinc-400">
                      {e.code}
                    </code>
                  )}
                  <p className="mt-1.5 text-sm text-zinc-600 dark:text-zinc-300">
                    {e.summary}
                  </p>
                </div>
                <ArrowRight
                  size={18}
                  aria-hidden
                  className="mt-1 shrink-0 text-zinc-400 group-hover:text-[color:var(--brand)]"
                />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
