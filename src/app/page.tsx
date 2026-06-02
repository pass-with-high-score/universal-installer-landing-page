import Image from "next/image";
import Link from "next/link";
import { Github, Heart, Layout, ArrowRight, ShieldCheck, Sparkles, Smartphone, Download, Share2, User } from "lucide-react";

const formats = [
  { name: "APK", desc: "Standard Android packages" },
  { name: "APKS", desc: "Split APK bundles" },
  { name: "XAPK", desc: "Compressed bundles with OBB" },
  { name: "APKM", desc: "APKMirror split bundles" },
];

const features = [
  {
    title: "Expressive UI",
    desc: "Premium, bouncy spring animations and fluid dialogs for a living, responsive feel.",
    icon: <Sparkles className="w-5 h-5" />,
  },
  {
    title: "Installer Profiles",
    desc: "Save and reuse custom configurations (spoofing, flags, user targets) per app.",
    icon: <User className="w-5 h-5" />,
  },
  {
    title: "Split APK Handling",
    desc: "Merge and install bundled packages that the default system installer can't handle.",
    icon: <Layout className="w-5 h-5" />,
  },
  {
    title: "OBB & Data Support",
    desc: "Auto-detects and installs OBB files for games via Shizuku or SAF tree grants.",
    icon: <Download className="w-5 h-5" />,
  },
  {
    title: "VirusTotal Security",
    desc: "Optional malware lookup and full file scanning with your own API key.",
    icon: <ShieldCheck className="w-5 h-5" />,
  },
  {
    title: "Sync & Share (LAN)",
    desc: "Share APKs across Wi-Fi with a built-in HTTP server and beautiful web dashboard.",
    icon: <Share2 className="w-5 h-5" />,
  },
  {
    title: "Targeted User Installs",
    desc: "Install apps to specific profiles (Work, Island) or all users simultaneously.",
    icon: <Smartphone className="w-5 h-5" />,
  },
  {
    title: "Batch Management",
    desc: "Select multiple apps for batch uninstallation or multi-package installations.",
    icon: <Layout className="w-5 h-5" />,
  },
];

const shizuku = [
  "Silent install without user prompts",
  "Installer source spoofing (Play Store, etc.)",
  "Replace existing packages seamlessly",
  "Allow version downgrades",
  "Target specific user profiles",
  "Bypass low target SDK restrictions",
  "Auto-grant all requested permissions",
];

const screenshots = [
  { src: "/images/phoneScreenshots/1.jpg", alt: "Home screen" },
  { src: "/images/phoneScreenshots/2.jpg", alt: "Package preview" },
  { src: "/images/phoneScreenshots/3.jpg", alt: "Installed apps list" },
  { src: "/images/phoneScreenshots/4.jpg", alt: "Install history" },
];

const SITE_URL = "https://universal-installer.pwhs.app";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Universal Installer",
      description:
        "Modern Android package manager with expressive UI, profiles, and silent install.",
      inLanguage: "en",
      publisher: { "@id": `${SITE_URL}/#org` },
    },
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#org`,
      name: "pass-with-high-score",
      url: "https://github.com/pass-with-high-score",
      logo: `${SITE_URL}/icon.png`,
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${SITE_URL}/#app`,
      name: "Universal Installer",
      operatingSystem: "Android 7.0+",
      applicationCategory: "UtilitiesApplication",
      applicationSubCategory: "Package Manager",
      description:
        "Professional APK/XAPK installer with expressive animations, installer profiles, and LAN sharing. Supports split APKs, VirusTotal, and Shizuku.",
      url: SITE_URL,
      image: `${SITE_URL}/images/featureGraphic.png`,
      downloadUrl:
        "https://play.google.com/store/apps/details?id=app.pwhs.universalinstaller",
      installUrl:
        "https://play.google.com/store/apps/details?id=app.pwhs.universalinstaller",
      softwareVersion: "1.8.0",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      author: { "@id": `${SITE_URL}/#org` },
      publisher: { "@id": `${SITE_URL}/#org` },
      featureList: [
        "Expressive Bouncy UI",
        "Installer Profiles",
        "Install APK, APKS, XAPK, APKM",
        "Split APK & OBB support",
        "Silent install via Shizuku/Root",
        "LAN Sync & Share",
        "VirusTotal scanning",
      ],
      keywords:
        "APK installer, XAPK installer, split APK, Shizuku, Android package manager, installer profiles",
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
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
              Expressive · Open source · No ads
            </span>
            <h1 className="mt-5 text-[2.5rem] font-semibold leading-[1.1] tracking-tight text-zinc-900 sm:text-5xl md:text-6xl dark:text-white">
              The <span className="text-[color:var(--brand)]">premium</span>
              <br className="hidden sm:inline" /> Android installer.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-zinc-600 sm:text-lg sm:leading-8 dark:text-zinc-300">
              Universal Installer is a professional package manager with fluid animations,
              custom installer profiles, and powerful privileged features.
            </p>
            <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
              <a
                href="https://github.com/pass-with-high-score/universal-installer/releases/latest"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[color:var(--brand)] px-6 text-base font-medium text-white shadow-sm transition-all hover:bg-[color:var(--brand-dark)] hover:scale-105 active:scale-95 sm:w-auto"
              >
                <Download size={18} aria-hidden />
                Download APK
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=app.pwhs.universalinstaller"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-black/10 bg-white px-6 text-base font-medium text-zinc-900 hover:border-black/20 sm:w-auto dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:border-white/25"
              >
                Google Play
                <ArrowRight size={18} aria-hidden />
              </a>
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
          A new standard for package management
        </h2>
        <p className="mt-2 max-w-2xl text-zinc-600 dark:text-zinc-400">
          Every feature is refined for a fast, secure, and beautiful installation experience.
        </p>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-black/5 bg-white p-6 transition-all hover:border-[color:var(--brand)]/40 hover:shadow-md dark:border-white/10 dark:bg-white/5"
            >
              <div className="mb-4 text-[color:var(--brand)]">
                {f.icon}
              </div>
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
          The Living UI
        </h2>
        <p className="mt-2 max-w-2xl text-zinc-600 dark:text-zinc-400">
          Fluid transitions, bouncy springs, and a professional Orange identity.
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
                className="h-auto w-full transition-transform hover:scale-105"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Privileged mode */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="overflow-hidden rounded-3xl border border-black/5 bg-gradient-to-br from-[color:var(--brand-soft)] to-white p-6 sm:p-10 dark:border-white/10 dark:from-[#2a1407] dark:to-zinc-950">
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
            <div className="max-w-xl">
              <span className="inline-flex rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-[color:var(--brand-dark)] dark:bg-black/30 dark:text-orange-300">
                Shizuku · Root
              </span>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
                Privileged power
              </h2>
              <p className="mt-3 text-zinc-700 dark:text-zinc-300">
                Enable Shizuku or Root to unlock silent installs, installer spoofing,
                and advanced flags. Save your favorites into **Installer Profiles**
                for one-tap specialized installs.
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
              Privacy you can verify
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
                Read Privacy Policy
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
                Sponsor development
              </h2>
              <p className="mt-3 text-zinc-700 dark:text-zinc-300">
                Universal Installer is free and open source. If it saves you time,
                consider sponsoring the project on GitHub — every contribution helps.
              </p>
            </div>
            <a
              href="https://github.com/sponsors/pass-with-high-score"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 w-full flex-none items-center justify-center gap-2 rounded-full bg-pink-600 px-6 text-base font-medium text-white shadow-sm transition-all hover:bg-pink-700 hover:scale-105 active:scale-95 sm:w-auto"
            >
              <Heart size={18} aria-hidden className="fill-current" />
              Become a sponsor
            </a>
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
            Get Universal Installer
          </h2>
          <p className="max-w-xl text-zinc-600 dark:text-zinc-300">
            Available on Google Play and GitHub.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
             <a
              href="https://play.google.com/store/apps/details?id=app.pwhs.universalinstaller"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-zinc-900 px-8 text-base font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100 transition-all hover:scale-105 active:scale-95"
            >
              Google Play
            </a>
            <a
              href="https://github.com/pass-with-high-score/universal-installer"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-black/10 bg-white px-8 text-base font-medium text-zinc-900 hover:border-black/20 dark:border-white/15 dark:bg-white/5 dark:text-white transition-all hover:scale-105 active:scale-95"
            >
              <Github size={18} aria-hidden />
              GitHub
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
