import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Wrench, HelpCircle } from "lucide-react";
import { ERRORS, errorBySlug } from "@/lib/errors";

export function generateStaticParams() {
  return ERRORS.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const error = errorBySlug(slug);
  if (!error) return {};
  const title = error.code ? `${error.code} — how to fix it` : error.title;
  return {
    title,
    description: error.summary,
    // The aliases are the wordings people actually paste into a search box.
    keywords: [error.title, ...(error.code ? [error.code] : []), ...error.aliases],
    alternates: { canonical: `/errors/${error.slug}` },
    openGraph: {
      title,
      description: error.summary,
      url: `/errors/${error.slug}`,
      type: "article",
    },
    robots: { index: true, follow: true },
  };
}

export default async function ErrorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const error = errorBySlug(slug);
  if (!error) notFound();

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: error.title,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${error.summary} ${error.cause}`,
        },
      },
      ...error.fixes.map((f) => ({
        "@type": "Question",
        name: `${error.title} — ${f.title}`,
        acceptedAnswer: { "@type": "Answer", text: f.body },
      })),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
        <Link
          href="/errors"
          className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
        >
          <ArrowLeft size={15} aria-hidden />
          All install errors
        </Link>

        <h1 className="mt-4 text-2xl font-semibold tracking-tight text-zinc-900 sm:text-4xl font-display dark:text-white">
          {error.title}
        </h1>

        {error.code && (
          <p className="mt-3">
            <code className="rounded-lg bg-black/5 px-2 py-1 font-mono text-xs text-zinc-700 sm:text-sm dark:bg-white/10 dark:text-zinc-200">
              {error.code}
            </code>
          </p>
        )}

        <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-300">
          {error.summary}
        </p>

        <section className="mt-8">
          <h2 className="flex items-center gap-2 text-xl font-semibold tracking-tight text-zinc-900 font-display dark:text-white">
            <HelpCircle size={18} aria-hidden className="text-[color:var(--brand)]" />
            Why it happens
          </h2>
          <p className="mt-2 text-zinc-600 dark:text-zinc-300">{error.cause}</p>
        </section>

        <section className="mt-8">
          <h2 className="flex items-center gap-2 text-xl font-semibold tracking-tight text-zinc-900 font-display dark:text-white">
            <Wrench size={18} aria-hidden className="text-[color:var(--brand)]" />
            How to fix it
          </h2>
          <ol className="mt-3 flex flex-col gap-3">
            {error.fixes.map((f, i) => (
              <li
                key={f.title}
                className="rounded-2xl border border-black/5 bg-white p-4 sm:p-5 dark:border-white/10 dark:bg-white/5"
              >
                <h3 className="font-semibold text-zinc-900 dark:text-white">
                  {i + 1}. {f.title}
                </h3>
                <p className="mt-1.5 text-zinc-600 dark:text-zinc-300">{f.body}</p>
              </li>
            ))}
          </ol>
        </section>

        {error.aliases.length > 0 && (
          <section className="mt-8">
            <h2 className="text-xl font-semibold tracking-tight text-zinc-900 font-display dark:text-white">
              Also shown as
            </h2>
            <ul className="mt-2 flex flex-wrap gap-2">
              {error.aliases.map((a) => (
                <li
                  key={a}
                  className="rounded-full border border-black/5 bg-white px-3 py-1 text-sm text-zinc-600 dark:border-white/10 dark:bg-white/5 dark:text-zinc-300"
                >
                  {a}
                </li>
              ))}
            </ul>
          </section>
        )}

        {error.related.length > 0 && (
          <section className="mt-8">
            <h2 className="text-xl font-semibold tracking-tight text-zinc-900 font-display dark:text-white">
              Related errors
            </h2>
            <ul className="mt-2 flex flex-col gap-1.5">
              {error.related.map((r) => {
                const rel = errorBySlug(r);
                if (!rel) return null;
                return (
                  <li key={r}>
                    <Link
                      href={`/errors/${rel.slug}`}
                      className="inline-flex items-center gap-1.5 text-[color:var(--brand)] hover:underline"
                    >
                      {rel.title}
                      <ArrowRight size={14} aria-hidden />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        )}

        <aside className="mt-10 rounded-3xl border border-black/5 bg-white p-5 sm:p-6 dark:border-white/10 dark:bg-white/5">
          <h2 className="font-semibold text-zinc-900 dark:text-white">
            An installer that tells you which one it is
          </h2>
          <p className="mt-2 text-zinc-600 dark:text-zinc-300">
            Android usually collapses all of these into &ldquo;App not
            installed&rdquo;. Universal Installer reports the real failure, warns
            about a signature mismatch or a downgrade before you commit, and
            offers the fix in the dialog.
          </p>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <a
              href="https://play.google.com/store/apps/details?id=app.pwhs.universalinstaller"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center justify-center rounded-full bg-[color:var(--brand)] px-6 text-sm font-semibold text-white hover:bg-[color:var(--brand-dark)]"
            >
              Get it on Google Play
            </a>
            <Link
              href="/guide"
              className="inline-flex h-11 items-center justify-center rounded-full border-2 border-black/10 px-6 text-sm font-semibold text-zinc-900 dark:border-white/15 dark:text-white"
            >
              Read the guide
            </Link>
          </div>
        </aside>
      </article>
    </>
  );
}
