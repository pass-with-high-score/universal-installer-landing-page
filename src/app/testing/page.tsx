import type { Metadata } from "next";
import Link from "next/link";
import TrackedLink from "@/components/TrackedLink";
import {
  Users,
  FlaskConical,
  Tv,
  ArrowRight,
  ExternalLink,
  Info,
} from "lucide-react";
import { FaGooglePlay } from "react-icons/fa";

const TV_PACKAGE = "app.pwhs.universalinstaller.tv";

export const metadata: Metadata = {
  title: "Join the Android TV beta",
  description:
    "Become a tester for Universal Installer on Android TV. Three steps: join the Google Group, opt in to the closed test, then install on your TV.",
  keywords: [
    "Universal Installer Android TV",
    "Android TV APK installer",
    "Universal Installer beta",
    "Google Play closed test",
    "sideload Android TV",
    "install APK on Android TV",
  ],
  alternates: { canonical: "/testing" },
  openGraph: {
    title: "Join the Universal Installer Android TV beta",
    description:
      "Early access to the Android TV build. Three quick steps to become a tester.",
    url: "/testing",
    type: "website",
    images: ["/images/featureGraphic.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Join the Universal Installer Android TV beta",
    description: "Three steps to become a tester: join group, opt in, install.",
    images: ["/images/featureGraphic.png"],
  },
  robots: { index: true, follow: true },
};

const steps = [
  {
    number: "01",
    icon: Users,
    title: "Join the testers group",
    desc: "Google requires every tester to belong to a group. Join the NQM Innovation Tester group — one click, no approval wait.",
    cta: "Join the Google Group",
    href: "https://groups.google.com/g/nqm-inovation-tester",
    event: "tv_beta_join_group",
    tip: "Any Google account works. You only ever do this once.",
  },
  {
    number: "02",
    icon: FlaskConical,
    title: "Opt in to the closed test",
    desc: "Open the tester opt-in page and press “Become a tester”. Google Play will then show the Android TV build to your account.",
    cta: "Become a tester",
    href: `https://play.google.com/apps/testing/${TV_PACKAGE}`,
    event: "tv_beta_opt_in",
    tip: "Sign in with the same Google account you used in step 1, or the opt-in will not stick.",
  },
  {
    number: "03",
    icon: Tv,
    title: "Install on your TV",
    desc: "On your Android TV, open the Play Store and search for Universal Installer. It appears once the opt-in has gone through.",
    cta: "Open the Play listing",
    href: `https://play.google.com/store/apps/details?id=${TV_PACKAGE}`,
    event: "tv_beta_open_listing",
    tip: "Searching on the TV itself can be slow to update. Opening the listing in a browser and pressing Install sends it to your TV as well.",
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
          <span className="inline-flex items-center gap-2 rounded-full border border-black/5 bg-white/70 px-3 py-1 text-xs font-medium text-zinc-600 dark:border-white/10 dark:bg-white/5 dark:text-zinc-300">
            <Tv size={14} aria-hidden />
            Android TV · closed test
          </span>
          <h1 className="mt-5 text-3xl font-semibold tracking-tight sm:text-5xl font-display">
            Universal Installer on the big screen
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-zinc-600 dark:text-zinc-300">
            A dedicated Android TV build with a D-pad-first interface: send
            packages from your phone over Wi-Fi, browse what is already on the
            box, and install without fighting a touch UI with a remote.
          </p>
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <TrackedLink
              href={`https://play.google.com/apps/testing/${TV_PACKAGE}`}
              eventName="tv_beta_hero_cta"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[color:var(--brand)] px-7 text-base font-semibold text-white transition-all hover:scale-105 hover:bg-[color:var(--brand-dark)] active:scale-95"
            >
              <FaGooglePlay size={18} aria-hidden />
              Become a tester
            </TrackedLink>
            <Link
              href="/"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border-2 border-black/10 bg-white px-7 text-base font-semibold text-zinc-900 hover:border-black/20 dark:border-white/15 dark:bg-white/5 dark:text-white"
            >
              Back to the phone app
              <ArrowRight size={18} aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="mx-auto max-w-3xl px-4 pb-4 sm:px-6">
        <ol className="flex flex-col gap-4">
          {steps.map((step) => (
            <li
              key={step.number}
              className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm sm:p-8 dark:border-white/10 dark:bg-white/5"
            >
              <div className="flex items-start gap-4">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[color:var(--brand)]/10 text-[color:var(--brand)]">
                  <step.icon size={20} aria-hidden />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold tracking-widest text-zinc-400 dark:text-zinc-500">
                    STEP {step.number}
                  </p>
                  <h2 className="mt-1 text-lg font-semibold tracking-tight sm:text-xl font-display">
                    {step.title}
                  </h2>
                  <p className="mt-2 text-zinc-600 dark:text-zinc-300">
                    {step.desc}
                  </p>
                  <TrackedLink
                    href={step.href}
                    eventName={step.event}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex h-10 items-center justify-center gap-2 rounded-full bg-zinc-900 px-5 text-sm font-semibold text-white hover:bg-black dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
                  >
                    {step.cta}
                    <ExternalLink size={15} aria-hidden />
                  </TrackedLink>
                  <p className="mt-3 flex items-start gap-2 text-sm text-zinc-500 dark:text-zinc-400">
                    <Info size={15} aria-hidden className="mt-0.5 shrink-0" />
                    {step.tip}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Notes */}
      <section className="mx-auto max-w-3xl px-4 pb-16 sm:px-6 sm:pb-20">
        <div className="rounded-3xl border border-black/5 bg-white p-6 sm:p-8 dark:border-white/10 dark:bg-white/5">
          <h2 className="text-lg font-semibold tracking-tight font-display">
            Good to know
          </h2>
          <ul className="mt-4 flex flex-col gap-3 text-zinc-600 dark:text-zinc-300">
            <li>
              The TV build is separate from the phone app — it has its own
              package name, so both can be installed at once and neither
              replaces the other.
            </li>
            <li>
              It can take a few minutes after opting in before Google Play shows
              the app. If it has not appeared, clear the Play Store cache on the
              TV and try again.
            </li>
            <li>
              On a rooted box, installs run silently. Without root, Android shows
              its own confirmation for each install — that is the system asking,
              not the app.
            </li>
            <li>
              Found something broken?{" "}
              <a
                href="https://github.com/pass-with-high-score/universal-installer/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[color:var(--brand)] hover:underline"
              >
                Open an issue on GitHub
              </a>
              . Bug reports from testers are the whole point of the closed test.
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
