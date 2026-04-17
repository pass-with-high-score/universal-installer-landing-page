import Image from "next/image";
import Link from "next/link";
import { Github, Heart, FlaskConical, ArrowRight } from "lucide-react";

const formats = [
  { name: "APK", desc: "Standard Android packages" },
  { name: "APKS", desc: "Split APK bundles" },
  { name: "XAPK", desc: "Compressed split bundles (APKPure)" },
  { name: "APKM", desc: "Split bundles (APKMirror)" },
];

const features = [
  {
    title: "Split APK support",
    desc: "Install bundled packages the default Android installer refuses to open.",
  },
  {
    title: "Preview before install",
    desc: "Inspect app name, version, permissions, architectures, and languages up front.",
  },
  {
    title: "VirusTotal scanning",
    desc: "Optional malware check against VirusTotal with your own API key.",
  },
  {
    title: "Installation history",
    desc: "Every install tracked with status and timestamp — nothing hidden.",
  },
  {
    title: "Batch uninstall",
    desc: "Long-press to select multiple apps and remove them in one go.",
  },
  {
    title: "Search & filter apps",
    desc: "Find any installed app, including system packages, in seconds.",
  },
  {
    title: "Auto-delete sources",
    desc: "Optionally clean up the APK file once it's successfully installed.",
  },
  {
    title: "Material You theming",
    desc: "Light, dark, and system themes — tuned for modern Android.",
  },
];

const shizuku = [
  "Silent install without user prompts",
  "Replace existing packages",
  "Allow version downgrades",
  "Auto-grant permissions",
  "Install for all users",
  "Bypass low target SDK restrictions",
  "Allow test/debug packages",
];

const screenshots = [
  { src: "/images/phoneScreenshots/1.jpg", alt: "Home screen" },
  { src: "/images/phoneScreenshots/2.jpg", alt: "Package preview" },
  { src: "/images/phoneScreenshots/3.jpg", alt: "Installed apps list" },
  { src: "/images/phoneScreenshots/4.jpg", alt: "Install history" },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 -z-10 opacity-70"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 0%, rgba(234,88,12,0.18), transparent 70%), radial-gradient(40% 40% at 80% 20%, rgba(59,130,246,0.12), transparent 70%)",
          }}
        />
        <div className="mx-auto grid max-w-6xl gap-10 px-4 pt-12 pb-16 sm:px-6 sm:pt-24 sm:pb-28 md:grid-cols-2 md:items-center">
          <div className="flex flex-col items-start">
            <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--brand)]/30 bg-[color:var(--brand-soft)] px-3 py-1 text-xs font-medium text-[color:var(--brand-dark)] dark:text-orange-300">
              <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--brand)]" />
              Open source · No ads · No tracking
            </span>
            <h1 className="mt-5 text-[2.5rem] font-semibold leading-[1.1] tracking-tight text-zinc-900 sm:text-5xl md:text-6xl dark:text-white">
              Install <span className="text-[color:var(--brand)]">any</span>
              <br className="hidden sm:inline" /> Android package.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-zinc-600 sm:text-lg sm:leading-8 dark:text-zinc-300">
              Universal Installer is a modern Android package manager that handles
              what the default installer can&apos;t — split APKs, bundled packages,
              and silent installations.
            </p>
            <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
              <a
                href="https://github.com/pass-with-high-score/universal-installer"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[color:var(--brand)] px-6 text-base font-medium text-white shadow-sm transition-colors hover:bg-[color:var(--brand-dark)] sm:w-auto"
              >
                <Github size={18} aria-hidden />
                Get it on GitHub
              </a>
              <Link
                href="/testing"
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-black/10 bg-white px-6 text-base font-medium text-zinc-900 hover:border-black/20 sm:w-auto dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:border-white/25"
              >
                <FlaskConical size={18} aria-hidden />
                Join the beta
              </Link>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {formats.map((f) => (
                <span
                  key={f.name}
                  className="rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-medium text-zinc-700 dark:border-white/10 dark:bg-white/5 dark:text-zinc-200"
                >
                  {f.name}
                </span>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-br from-[color:var(--brand)]/20 via-transparent to-[color:var(--accent)]/20 blur-2xl" />
            <div className="overflow-hidden rounded-3xl border border-black/5 bg-white shadow-xl dark:border-white/10 dark:bg-zinc-900">
              <Image
                src="/images/featureGraphic.png"
                alt="Universal Installer feature graphic"
                width={1024}
                height={500}
                className="h-auto w-full"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Supported formats */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Supported formats
        </h2>
        <p className="mt-2 max-w-2xl text-zinc-600 dark:text-zinc-400">
          One installer for everything Android throws at you.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {formats.map((f) => (
            <div
              key={f.name}
              className="rounded-2xl border border-black/5 bg-white p-5 dark:border-white/10 dark:bg-white/5"
            >
              <div className="inline-flex items-center rounded-md bg-[color:var(--brand-soft)] px-2 py-1 text-xs font-semibold text-[color:var(--brand-dark)] dark:text-orange-300">
                {f.name}
              </div>
              <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-300">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-12 sm:px-6 sm:py-16">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Built for what Android actually ships
        </h2>
        <p className="mt-2 max-w-2xl text-zinc-600 dark:text-zinc-400">
          Every feature is designed around the way real APKs are distributed today.
        </p>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-black/5 bg-white p-6 transition-colors hover:border-[color:var(--brand)]/40 dark:border-white/10 dark:bg-white/5"
            >
              <h3 className="text-base font-semibold text-zinc-900 dark:text-white">
                {f.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Screenshots */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          A clean, modern interface
        </h2>
        <p className="mt-2 max-w-2xl text-zinc-600 dark:text-zinc-400">
          Material You design, fast navigation, no noise.
        </p>
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {screenshots.map((s) => (
            <div
              key={s.src}
              className="overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm dark:border-white/10 dark:bg-zinc-900"
            >
              <Image
                src={s.src}
                alt={s.alt}
                width={720}
                height={1520}
                className="h-auto w-full"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Shizuku */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="overflow-hidden rounded-3xl border border-black/5 bg-gradient-to-br from-[color:var(--brand-soft)] to-white p-6 sm:p-10 dark:border-white/10 dark:from-[#2a1407] dark:to-zinc-950">
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
            <div className="max-w-xl">
              <span className="inline-flex rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-[color:var(--brand-dark)] dark:bg-black/30 dark:text-orange-300">
                Optional · Advanced
              </span>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
                Shizuku mode
              </h2>
              <p className="mt-3 text-zinc-700 dark:text-zinc-300">
                If you have Shizuku installed, Universal Installer unlocks a full
                set of power-user install options — no root required.
              </p>
            </div>
            <ul className="grid flex-1 gap-2 sm:grid-cols-2">
              {shizuku.map((s) => (
                <li
                  key={s}
                  className="flex items-start gap-2 text-sm text-zinc-800 dark:text-zinc-200"
                >
                  <span
                    aria-hidden
                    className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-[color:var(--brand)]"
                  />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Privacy */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Privacy you can actually verify
            </h2>
            <p className="mt-3 text-zinc-600 dark:text-zinc-300">
              No accounts, no ads, no analytics. Universal Installer is fully open
              source, so nothing about the app&apos;s behavior has to be taken on
              trust.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/privacy"
                className="inline-flex h-11 items-center rounded-full bg-zinc-900 px-5 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
              >
                Read the Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="inline-flex h-11 items-center rounded-full border border-black/10 bg-white px-5 text-sm font-medium text-zinc-900 hover:border-black/20 dark:border-white/15 dark:bg-white/5 dark:text-white"
              >
                Terms of Service
              </Link>
            </div>
          </div>
          <ul className="grid gap-3">
            {[
              "No internet required for core functionality",
              "VirusTotal scanning is optional and uses your own API key",
              "No ads, no tracking, no data collection",
              "Fully open source — inspect the code yourself",
            ].map((p) => (
              <li
                key={p}
                className="flex items-start gap-3 rounded-2xl border border-black/5 bg-white p-4 text-sm text-zinc-700 dark:border-white/10 dark:bg-white/5 dark:text-zinc-200"
              >
                <span
                  aria-hidden
                  className="mt-1 inline-block h-2 w-2 flex-none rounded-full bg-[color:var(--brand)]"
                />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Sponsor */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="relative overflow-hidden rounded-3xl border border-pink-500/20 bg-gradient-to-br from-pink-50 via-white to-orange-50 p-6 sm:p-10 dark:border-pink-400/20 dark:from-pink-500/10 dark:via-zinc-950 dark:to-orange-500/10">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-pink-400/20 blur-3xl"
          />
          <div className="relative flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-pink-500/30 bg-white/70 px-3 py-1 text-xs font-medium text-pink-700 dark:bg-black/30 dark:text-pink-300">
                <Heart size={12} aria-hidden className="fill-current" />
                Support development
              </span>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
                Sponsor Universal Installer
              </h2>
              <p className="mt-3 text-zinc-700 dark:text-zinc-300">
                Universal Installer is free and open source. If it saves you time
                or you just want to see it keep improving, consider sponsoring
                the project on GitHub — every contribution helps.
              </p>
            </div>
            <a
              href="https://github.com/sponsors/pass-with-high-score"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 w-full flex-none items-center justify-center gap-2 rounded-full bg-pink-600 px-6 text-base font-medium text-white shadow-sm transition-colors hover:bg-pink-700 sm:w-auto"
            >
              <Heart size={18} aria-hidden className="fill-current" />
              Become a sponsor
            </a>
          </div>
        </div>
      </section>

      {/* Beta */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="relative overflow-hidden rounded-3xl border border-[color:var(--accent)]/20 bg-gradient-to-br from-blue-50 via-white to-[color:var(--brand-soft)] p-6 sm:p-10 dark:border-[color:var(--accent)]/20 dark:from-blue-500/10 dark:via-zinc-950 dark:to-[color:var(--brand)]/10">
          <div className="relative flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--accent)]/30 bg-white/70 px-3 py-1 text-xs font-medium text-[color:var(--accent)] dark:bg-black/30 dark:text-blue-300">
                <FlaskConical size={12} aria-hidden />
                Closed beta on Google Play
              </span>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
                Try the beta before everyone else
              </h2>
              <p className="mt-3 text-zinc-700 dark:text-zinc-300">
                Three quick steps: join the testers group, opt in on Google
                Play, then install straight from the Play Store. Updates roll
                out to testers first.
              </p>
            </div>
            <Link
              href="/testing"
              className="inline-flex h-12 w-full flex-none items-center justify-center gap-2 rounded-full bg-[color:var(--accent)] px-6 text-base font-medium text-white shadow-sm transition-colors hover:bg-blue-600 sm:w-auto"
            >
              Join the beta
              <ArrowRight size={18} aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 sm:pb-20">
        <div className="flex flex-col items-center gap-5 rounded-3xl border border-black/5 bg-white p-6 text-center shadow-sm sm:p-10 dark:border-white/10 dark:bg-white/5">
          <Image
            src="/images/icon.png"
            alt=""
            width={56}
            height={56}
            className="rounded-2xl"
          />
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Ready to install anything?
          </h2>
          <p className="max-w-xl text-zinc-600 dark:text-zinc-300">
            Grab the latest build and source from GitHub. Contributions, issues,
            and stars are all welcome.
          </p>
          <a
            href="https://github.com/pass-with-high-score/universal-installer"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[color:var(--brand)] px-6 text-base font-medium text-white hover:bg-[color:var(--brand-dark)] sm:w-auto"
          >
            <Github size={18} aria-hidden />
            View on GitHub
          </a>
        </div>
      </section>
    </>
  );
}
