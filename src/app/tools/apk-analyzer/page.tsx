import type { Metadata } from "next";
import Link from "next/link";
import { Lock, ScanSearch } from "lucide-react";
import ApkAnalyzer from "@/components/ApkAnalyzer";

export const metadata: Metadata = {
  title: "APK Analyzer — inspect an APK in your browser",
  description:
    "See what is inside an APK before you install it: package name, version, permissions in plain language, CPU architectures and split contents. Nothing is uploaded — the file is read in your browser.",
  keywords: [
    "APK analyzer online",
    "check apk permissions",
    "what permissions does this apk have",
    "apk info viewer",
    "read apk manifest online",
    "apk minSdk targetSdk checker",
    "inspect apk without installing",
  ],
  alternates: { canonical: "/tools/apk-analyzer" },
  openGraph: {
    title: "APK Analyzer — inspect an APK in your browser",
    description:
      "Package name, version, permissions, architectures and splits. Nothing leaves your device.",
    url: "/tools/apk-analyzer",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function ApkAnalyzerPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "APK Analyzer",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "Inspect an Android APK in the browser: package name, version, permissions, CPU architectures and split contents. The file is parsed locally and never uploaded.",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
        <span className="inline-flex items-center gap-2 rounded-full border border-black/5 bg-white/70 px-3 py-1 text-xs font-medium text-zinc-600 dark:border-white/10 dark:bg-white/5 dark:text-zinc-300">
          <ScanSearch size={14} aria-hidden />
          Free tool
        </span>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl font-display dark:text-white">
          APK Analyzer
        </h1>
        <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-300">
          See what is inside an Android package before you install it — the
          permissions it asks for, which Android versions it runs on, which CPU
          architectures it ships, and what a split bundle actually contains.
        </p>

        <p className="mt-4 flex items-start gap-2 rounded-2xl border border-black/5 bg-white p-4 text-sm text-zinc-600 sm:p-5 dark:border-white/10 dark:bg-white/5 dark:text-zinc-300">
          <Lock size={16} aria-hidden className="mt-0.5 shrink-0 text-[color:var(--brand)]" />
          <span>
            <strong className="text-zinc-900 dark:text-white">
              Nothing is uploaded.
            </strong>{" "}
            The file is opened and parsed by JavaScript running in this tab. It
            is never sent anywhere, so it works offline and on packages you would
            not want to hand to a stranger&apos;s server.
          </span>
        </p>

        <div className="mt-8">
          <ApkAnalyzer />
        </div>

        {/* Server-rendered explanation. A tool page whose only content is a JS widget has
            nothing for a crawler to read. */}
        <section className="mt-14">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 font-display dark:text-white">
            What the numbers mean
          </h2>
          <div className="mt-4 flex flex-col gap-5 text-zinc-600 dark:text-zinc-300">
            <div>
              <h3 className="font-semibold text-zinc-900 dark:text-white">
                Min Android and Targets
              </h3>
              <p className="mt-1.5">
                Minimum is the oldest Android version the app will install on —
                below it, the install fails outright. Target is the version the
                app was built against. A low target on a modern device means the
                app opts out of newer platform behaviour, and from Android 14
                the system refuses very old targets altogether.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-zinc-900 dark:text-white">
                Architectures
              </h3>
              <p className="mt-1.5">
                If the app ships native code, it does so per CPU architecture.
                Almost every phone made in the last several years is{" "}
                <code className="rounded bg-black/5 px-1.5 py-0.5 font-mono text-xs dark:bg-white/10">
                  arm64-v8a
                </code>
                . An APK that only carries a different one will not run on your
                device, which is the cause of &ldquo;no matching ABIs&rdquo;
                errors.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-zinc-900 dark:text-white">
                Splits
              </h3>
              <p className="mt-1.5">
                Modern apps are often shipped as several APKs — a base plus
                configuration splits for languages, screen densities and
                architectures. All of them have to be installed together, which
                is why the built-in Android installer cannot open a bundle on its
                own.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-zinc-900 dark:text-white">
                Permissions
              </h3>
              <p className="mt-1.5">
                A declared permission is what the app <em>can</em> ask for, not
                what it has been granted. Most are requested at runtime and you
                can refuse them. The ones worth a second look are the ones that
                do not fit the app: an offline game asking to read SMS, a
                wallpaper app wanting accessibility access, anything requesting
                permission to draw over other apps.
              </p>
            </div>
          </div>
        </section>

        <aside className="mt-12 rounded-3xl border border-black/5 bg-white p-5 sm:p-6 dark:border-white/10 dark:bg-white/5">
          <h2 className="font-semibold text-zinc-900 dark:text-white">
            Happy with what you see?
          </h2>
          <p className="mt-2 text-zinc-600 dark:text-zinc-300">
            Universal Installer installs split bundles and XAPK archives that
            the built-in installer refuses, can scan a package against
            VirusTotal first, and tells you the real reason when an install
            fails.
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
              href="/errors"
              className="inline-flex h-11 items-center justify-center rounded-full border-2 border-black/10 px-6 text-sm font-semibold text-zinc-900 dark:border-white/15 dark:text-white"
            >
              Install errors, explained
            </Link>
          </div>
        </aside>
      </div>
    </>
  );
}
