import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Users, FlaskConical, Download, ExternalLink, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Join the beta on Google Play",
  description:
    "Become a Universal Installer tester on Google Play. Three steps: join the Google Group, opt in to the closed test, then install from the Play Store.",
  keywords: [
    "Universal Installer beta",
    "Universal Installer tester",
    "Google Play closed test",
    "APK installer beta",
    "join Android app beta",
    "Google Play testing Universal Installer",
  ],
  alternates: { canonical: "/testing" },
  openGraph: {
    title: "Join the Universal Installer beta",
    description:
      "Get early access on Google Play. Three quick steps to become a tester.",
    url: "/testing",
    type: "website",
    images: ["/images/featureGraphic.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Join the Universal Installer beta on Google Play",
    description:
      "Three steps to become a tester: join group, opt in, install.",
    images: ["/images/featureGraphic.png"],
  },
  robots: { index: true, follow: true },
};

const steps = [
  {
    number: "01",
    icon: Users,
    title: "Join the testers group",
    desc: "Google requires every tester to be part of a group. Join the NQM Innovation Tester group — one click, no approval wait.",
    cta: "Join the Google Group",
    href: "https://groups.google.com/g/nqm-inovation-tester",
    tip: "You can use any Google account. You only need to do this once.",
  },
  {
    number: "02",
    icon: FlaskConical,
    title: "Opt in to the closed test",
    desc: "Open the tester opt-in page and press “Become a tester”. After that, the Play Store will show Universal Installer to your account.",
    cta: "Become a tester",
    href: "https://play.google.com/apps/testing/app.pwhs.universalinstaller",
    tip: "Make sure you sign in with the same Google account you used in step 1.",
  },
  {
    number: "03",
    icon: Download,
    title: "Install from Google Play",
    desc: "Open the Play Store listing on your Android device and tap Install. You'll receive updates automatically, just like a normal app.",
    cta: "Open on Google Play",
    href: "https://play.google.com/store/apps/details?id=app.pwhs.universalinstaller&hl=en-US&ah=kqg8zlrafJhmk9p_AqPMxpi5-u0",
    tip: "If you don't see the app right away, wait a few minutes then refresh the Play Store.",
  },
];

export default function TestingPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-70"
          style={{
            background:
              "radial-gradient(50% 40% at 50% 0%, rgba(234,88,12,0.18), transparent 70%), radial-gradient(40% 40% at 80% 20%, rgba(59,130,246,0.12), transparent 70%)",
          }}
        />
        <div className="mx-auto max-w-3xl px-4 pt-12 pb-10 text-center sm:px-6 sm:pt-20 sm:pb-14">
          <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--brand)]/30 bg-[color:var(--brand-soft)] px-3 py-1 text-xs font-medium text-[color:var(--brand-dark)] dark:text-orange-300">
            <FlaskConical size={14} aria-hidden />
            Closed beta · Google Play
          </span>
          <h1 className="mt-5 text-3xl font-semibold tracking-tight text-zinc-900 sm:text-5xl dark:text-white">
            Become a{" "}
            <span className="text-[color:var(--brand)]">tester</span>
          </h1>
          <p className="mt-4 text-base leading-7 text-zinc-600 sm:text-lg sm:leading-8 dark:text-zinc-300">
            Universal Installer is in closed testing on Google Play. Follow
            three short steps to get early access and help find issues before
            the public release.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="mx-auto max-w-3xl px-4 pb-8 sm:px-6">
        <ol className="relative space-y-5 sm:space-y-6">
          <span
            aria-hidden
            className="pointer-events-none absolute left-5 top-6 bottom-6 hidden w-px bg-gradient-to-b from-[color:var(--brand)]/40 via-black/10 to-transparent sm:block dark:via-white/10"
          />
          {steps.map((s) => {
            const Icon = s.icon;
            return (
              <li
                key={s.number}
                className="relative rounded-2xl border border-black/5 bg-white p-5 shadow-sm sm:p-6 dark:border-white/10 dark:bg-white/5"
              >
                <div className="flex items-start gap-4 sm:gap-5">
                  <div className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-[color:var(--brand)] text-sm font-semibold text-white sm:h-11 sm:w-11">
                    {s.number}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-[color:var(--brand-dark)] dark:text-orange-300">
                      <Icon size={14} aria-hidden />
                      Step {s.number}
                    </div>
                    <h2 className="mt-1 text-lg font-semibold tracking-tight text-zinc-900 sm:text-xl dark:text-white">
                      {s.title}
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-zinc-600 sm:text-[15px] sm:leading-7 dark:text-zinc-300">
                      {s.desc}
                    </p>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[color:var(--brand)] px-5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[color:var(--brand-dark)] sm:w-auto"
                    >
                      {s.cta}
                      <ExternalLink size={15} aria-hidden />
                    </a>
                    <p className="mt-3 flex items-start gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                      <CheckCircle2
                        size={14}
                        aria-hidden
                        className="mt-0.5 flex-none text-[color:var(--brand)]"
                      />
                      {s.tip}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      {/* Direct links fallback */}
      <section className="mx-auto max-w-3xl px-4 pb-12 sm:px-6 sm:pb-16">
        <div className="rounded-2xl border border-black/5 bg-white p-5 sm:p-6 dark:border-white/10 dark:bg-white/5">
          <h3 className="text-base font-semibold text-zinc-900 dark:text-white">
            Direct links
          </h3>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
            Copy and paste these into a browser on the device where you want to
            test.
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            {steps.map((s) => (
              <li
                key={s.href}
                className="flex min-w-0 items-start gap-2 text-zinc-700 dark:text-zinc-200"
              >
                <span className="mt-0.5 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-[color:var(--brand-soft)] text-[11px] font-semibold text-[color:var(--brand-dark)] dark:bg-[color:var(--brand)]/15 dark:text-orange-300">
                  {s.number.replace(/^0/, "")}
                </span>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="break-all text-[color:var(--brand-dark)] underline underline-offset-2 hover:text-[color:var(--brand)] dark:text-orange-300"
                >
                  {s.href}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Help */}
      <section className="mx-auto max-w-3xl px-4 pb-16 sm:px-6 sm:pb-20">
        <div className="flex flex-col items-start gap-4 rounded-2xl border border-black/5 bg-gradient-to-br from-[color:var(--brand-soft)] to-white p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8 dark:border-white/10 dark:from-[#2a1407] dark:to-zinc-950">
          <div className="flex items-center gap-3">
            <Image
              src="/images/icon.png"
              alt=""
              width={44}
              height={44}
              className="rounded-xl"
            />
            <div>
              <h3 className="text-base font-semibold text-zinc-900 sm:text-lg dark:text-white">
                Something not working?
              </h3>
              <p className="text-sm text-zinc-700 dark:text-zinc-300">
                Report issues so we can fix them before the public release.
              </p>
            </div>
          </div>
          <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
            <a
              href="mailto:nguyenquangminh570@gmail.com"
              className="inline-flex h-11 items-center justify-center rounded-full border border-black/10 bg-white px-5 text-sm font-medium text-zinc-900 hover:border-black/20 dark:border-white/15 dark:bg-white/5 dark:text-white"
            >
              Email the developer
            </a>
            <Link
              href="/"
              className="inline-flex h-11 items-center justify-center rounded-full bg-zinc-900 px-5 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              Back to home
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
