import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, ArrowRight, Clock, Calendar, Sparkles } from "lucide-react";
import { ARTICLES } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Android Sideloading & Package Guides — Universal Installer Blog",
  description:
    "Expert guides and tutorials on Android package management, installing Split APKs (.apks, .xapk, .apkm), Wear OS sideloading, Android TV installation, and Shizuku silent installs.",
  keywords: [
    "Android sideloading guide",
    "install apk on wear os",
    "android tv apk install",
    "how to install xapk",
    "split apk guide",
    "shizuku silent install",
    "bypass target sdk android 14",
    "virustotal apk scanner",
  ],
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Android Sideloading & Package Guides — Universal Installer Blog",
    description:
      "Expert guides on Android package management, split APK formats, Wear OS, Android TV, and Shizuku.",
    url: "/blog",
    type: "website",
    images: ["/images/featureGraphic.png"],
  },
  robots: { index: true, follow: true },
};

export default function BlogIndexPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-16">
      <div className="flex flex-col items-start">
        <span className="inline-flex items-center gap-2 rounded-full border border-black/5 bg-white/70 px-3 py-1 text-xs font-medium text-zinc-600 dark:border-white/10 dark:bg-white/5 dark:text-zinc-300">
          <BookOpen size={14} aria-hidden />
          Guides &amp; Articles
        </span>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-zinc-900 sm:text-5xl font-display dark:text-white">
          Android Sideloading &amp; Package Guides
        </h1>
        <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-300">
          In-depth tutorials, technical breakdowns, and how-to guides for power users, developers, and anyone managing APKs across Android Phones, Wear OS smartwatches, and Android TV.
        </p>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-1">
        {ARTICLES.map((article) => (
          <article
            key={article.slug}
            className="group relative rounded-3xl border border-black/5 bg-white p-6 sm:p-8 transition-all hover:border-[color:var(--brand)]/40 hover:shadow-md dark:border-white/10 dark:bg-zinc-900/60 dark:hover:border-white/20"
          >
            <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400">
              <span className="rounded-full bg-[color:var(--brand)]/10 px-3 py-1 font-medium text-[color:var(--brand)] dark:bg-[color:var(--brand)]/20">
                {article.category}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={13} aria-hidden />
                {article.readTime}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar size={13} aria-hidden />
                {new Date(article.publishedAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>

            <h2 className="mt-3 text-xl font-bold tracking-tight text-zinc-900 sm:text-2xl font-display dark:text-white group-hover:text-[color:var(--brand)] transition-colors">
              <Link href={`/blog/${article.slug}`} className="focus:outline-none">
                <span className="absolute inset-0" aria-hidden="true" />
                {article.title}
              </Link>
            </h2>

            <p className="mt-2.5 text-sm sm:text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
              {article.description}
            </p>

            <div className="mt-5 flex items-center gap-1.5 text-sm font-semibold text-[color:var(--brand)]">
              Read guide
              <ArrowRight size={16} aria-hidden className="transition-transform group-hover:translate-x-1" />
            </div>
          </article>
        ))}
      </div>

      {/* Cross-linking Banner */}
      <div className="mt-14 rounded-3xl border border-black/5 bg-gradient-to-br from-[color:var(--brand-soft)] to-white p-6 sm:p-8 dark:border-white/10 dark:from-[#2a1407] dark:to-zinc-950">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[color:var(--brand)]">
              <Sparkles size={14} /> Free Web Tool
            </span>
            <h3 className="mt-1 text-xl font-bold text-zinc-900 dark:text-white font-display">
              Inspect APKs online with APK Analyzer
            </h3>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
              Parse permissions, minSdk, split components, and architectures directly in your browser.
            </p>
          </div>
          <Link
            href="/tools/apk-analyzer"
            className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-zinc-900 px-6 text-sm font-semibold text-white hover:bg-black dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
          >
            Open APK Analyzer
          </Link>
        </div>
      </div>
    </div>
  );
}
