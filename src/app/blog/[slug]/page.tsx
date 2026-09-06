import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Clock,
  Calendar,
  Info,
  HelpCircle,
} from "lucide-react";
import { ARTICLES, articleBySlug } from "@/lib/articles";
import TrackedLink from "@/components/TrackedLink";
import { FaGooglePlay } from "react-icons/fa";

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = articleBySlug(slug);
  if (!article) return {};

  return {
    title: `${article.title} — Universal Installer Guide`,
    description: article.description,
    keywords: article.keywords,
    alternates: { canonical: `/blog/${article.slug}` },
    openGraph: {
      title: `${article.title} — Universal Installer Guide`,
      description: article.description,
      url: `/blog/${article.slug}`,
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      images: ["/images/featureGraphic.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
      images: ["/images/featureGraphic.png"],
    },
    robots: { index: true, follow: true },
  };
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articleBySlug(slug);
  if (!article) notFound();

  const BASE_URL = "https://universal-installer.pwhs.app";

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: article.title,
    description: article.description,
    inLanguage: "en",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/blog/${article.slug}`,
    },
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: {
      "@type": "Organization",
      name: "pass-with-high-score",
      url: "https://github.com/pass-with-high-score",
    },
    publisher: {
      "@type": "Organization",
      name: "Universal Installer",
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/icon.png`,
      },
    },
    image: `${BASE_URL}/images/featureGraphic.png`,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: BASE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${BASE_URL}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: `${BASE_URL}/blog/${article.slug}`,
      },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: article.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };

  const relatedArticles = article.related
    .map((rSlug) => articleBySlug(rSlug))
    .filter((a): a is NonNullable<typeof a> => !!a);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-14">
        {/* Breadcrumb Navigation */}
        <nav className="mb-6 flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
          <Link href="/" className="hover:text-zinc-900 dark:hover:text-white">
            Home
          </Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-zinc-900 dark:hover:text-white">
            Blog
          </Link>
          <span>/</span>
          <span className="truncate max-w-[200px] text-zinc-800 dark:text-zinc-200">
            {article.category}
          </span>
        </nav>

        {/* Header */}
        <header className="border-b border-black/5 pb-8 dark:border-white/10">
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
              Updated {new Date(article.updatedAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>

          <h1 className="mt-4 text-2xl font-bold tracking-tight text-zinc-900 sm:text-4xl lg:text-5xl font-display dark:text-white">
            {article.title}
          </h1>

          <p className="mt-4 text-base sm:text-lg leading-relaxed text-zinc-600 dark:text-zinc-300">
            {article.summary}
          </p>
        </header>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_240px]">
          {/* Main Content */}
          <article className="min-w-0 flex-1 text-zinc-700 dark:text-zinc-300 leading-relaxed space-y-8">
            {article.sections.map((sec) => (
              <section key={sec.id} id={sec.id} className="scroll-mt-20">
                <h2 className="text-xl font-bold tracking-tight text-zinc-900 sm:text-2xl font-display dark:text-white mb-3">
                  {sec.title}
                </h2>
                <div className="space-y-3">
                  {sec.paragraphs.map((p, idx) => (
                    <p key={idx} className="text-base leading-7">
                      {p}
                    </p>
                  ))}
                </div>

                {sec.tips && sec.tips.length > 0 && (
                  <div className="mt-4 rounded-2xl border border-[color:var(--brand)]/20 bg-[color:var(--brand-soft)] p-4 text-sm text-[color:var(--brand-dark)] dark:bg-[color:var(--brand)]/10 dark:text-orange-200">
                    <div className="flex items-start gap-2.5">
                      <Info size={18} aria-hidden className="mt-0.5 shrink-0" />
                      <div className="space-y-1">
                        {sec.tips.map((t, tidx) => (
                          <p key={tidx}>{t}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </section>
            ))}

            {/* FAQs */}
            {article.faqs.length > 0 && (
              <section id="faqs" className="mt-12 scroll-mt-20 border-t border-black/5 pt-8 dark:border-white/10">
                <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-zinc-900 font-display dark:text-white mb-6">
                  <HelpCircle size={22} className="text-[color:var(--brand)]" />
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  {article.faqs.map((faq, idx) => (
                    <div
                      key={idx}
                      className="rounded-2xl border border-black/5 bg-white p-5 dark:border-white/10 dark:bg-zinc-900/60"
                    >
                      <h3 className="font-semibold text-zinc-900 dark:text-white">
                        {faq.q}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                        {faq.a}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* App CTA Box */}
            <div className="mt-12 rounded-3xl border-2 border-[color:var(--brand)] bg-gradient-to-br from-white via-[color:var(--brand-soft)] to-white p-6 sm:p-8 dark:from-zinc-900 dark:via-[#2a1407] dark:to-zinc-900">
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white font-display">
                Try Universal Installer for free
              </h3>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                Install any APK, APKS, or XAPK format across your Phone, Wear OS smartwatch, and Android TV. Open source, zero ads, no accounts.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <TrackedLink
                  href="https://play.google.com/store/apps/details?id=app.pwhs.universalinstaller"
                  eventName="click_download"
                  eventParams={{ platform: "play_store", source: "article_cta" }}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-zinc-900 px-5 text-sm font-semibold text-white hover:bg-black dark:bg-white dark:text-zinc-900"
                >
                  <FaGooglePlay size={16} />
                  Get on Google Play
                </TrackedLink>
                <Link
                  href="/tools/apk-analyzer"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-black/10 bg-white px-5 text-sm font-semibold text-zinc-900 hover:bg-black/5 dark:border-white/15 dark:bg-white/5 dark:text-white"
                >
                  Test with APK Analyzer
                </Link>
              </div>
            </div>
          </article>

          {/* Sticky Sidebar on Desktop */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              <div className="rounded-2xl border border-black/5 bg-white p-5 dark:border-white/10 dark:bg-zinc-900/60">
                <p className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                  Table of Contents
                </p>
                <nav className="mt-3">
                  <ul className="space-y-2 text-xs">
                    {article.sections.map((s) => (
                      <li key={s.id}>
                        <a
                          href={`#${s.id}`}
                          className="text-zinc-600 hover:text-[color:var(--brand)] dark:text-zinc-400 dark:hover:text-white transition-colors block py-0.5"
                        >
                          {s.title}
                        </a>
                      </li>
                    ))}
                    {article.faqs.length > 0 && (
                      <li>
                        <a
                          href="#faqs"
                          className="text-zinc-600 hover:text-[color:var(--brand)] dark:text-zinc-400 dark:hover:text-white transition-colors block py-0.5"
                        >
                          Frequently Asked Questions
                        </a>
                      </li>
                    )}
                  </ul>
                </nav>
              </div>

              {/* Related articles */}
              {relatedArticles.length > 0 && (
                <div className="rounded-2xl border border-black/5 bg-white p-5 dark:border-white/10 dark:bg-zinc-900/60">
                  <p className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                    Related Guides
                  </p>
                  <ul className="mt-3 space-y-3">
                    {relatedArticles.map((rel) => (
                      <li key={rel.slug}>
                        <Link
                          href={`/blog/${rel.slug}`}
                          className="group block text-xs font-medium text-zinc-700 hover:text-[color:var(--brand)] dark:text-zinc-300 dark:hover:text-white"
                        >
                          {rel.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
