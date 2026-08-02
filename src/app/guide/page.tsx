import type { Metadata } from "next";
import Link from "next/link";
import {
  Smartphone,
  Zap,
  Terminal,
  Package,
  User,
  ShieldCheck,
  Tv,
  LifeBuoy,
  Rocket,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Guide",
  description:
    "How to use Universal Installer: install modes, supported formats, installer profiles, install options, VirusTotal scanning, Android TV, and fixes for the errors people hit most.",
  keywords: [
    "Universal Installer guide",
    "how to use Universal Installer",
    "Shizuku install APK",
    "install split APK Android",
    "APKS XAPK APKM installer",
    "allow downgrade Android",
    "Android TV APK installer",
  ],
  alternates: { canonical: "/guide" },
  openGraph: {
    title: "Universal Installer guide",
    description:
      "Install modes, formats, profiles, install options and troubleshooting.",
    url: "/guide",
    type: "article",
    images: ["/images/featureGraphic.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Universal Installer guide",
    description:
      "Install modes, formats, profiles, install options and troubleshooting.",
    images: ["/images/featureGraphic.png"],
  },
  robots: { index: true, follow: true },
};

const sections = [
  { id: "what", label: "What it is", icon: Package },
  { id: "start", label: "Quick start", icon: Rocket },
  { id: "modes", label: "Install modes", icon: Smartphone },
  { id: "formats", label: "Supported formats", icon: Package },
  { id: "options", label: "Install options", icon: Terminal },
  { id: "profiles", label: "Installer profiles", icon: User },
  { id: "virustotal", label: "VirusTotal", icon: ShieldCheck },
  { id: "tv", label: "Android TV", icon: Tv },
  { id: "troubleshooting", label: "Troubleshooting", icon: LifeBuoy },
];

const options = [
  {
    name: "Replace existing",
    on: "On by default",
    desc: "Lets an install overwrite an app that is already there — a normal update. With it off, updating fails with a package-conflict error.",
  },
  {
    name: "Allow downgrade",
    on: "Off by default",
    desc: "Required to install an older version over a newer one. Replace existing does not cover this; they are separate rules in Android.",
  },
  {
    name: "Grant all permissions",
    on: "Off by default",
    desc: "Grants every runtime permission the app declares, at install time, so it never prompts you.",
  },
  {
    name: "Allow test packages",
    on: "Off by default",
    desc: "Accepts APKs built as debug/test packages, which Android otherwise refuses.",
  },
  {
    name: "Bypass low target SDK block",
    on: "Off by default",
    desc: "Android 14 and later refuse apps that target very old SDK versions. This skips that check. Only available on Android 14+.",
  },
  {
    name: "Install for all users",
    on: "Off by default",
    desc: "Installs into every user profile on the device rather than only the current one.",
  },
  {
    name: "Change installation source",
    on: "Off by default",
    desc: "Records a different app as the installer — useful when an app checks where it came from. See the troubleshooting note on its limits.",
  },
];

const faqs = [
  {
    q: "“A conflicting version is already installed” — but Replace existing is on",
    a: "Three different problems produce a similar error. If you are installing an older version, you need Allow downgrade, not Replace existing. If the installed app was signed with a different key, no option helps at all: Android will not accept the file as an update, so the old app has to be uninstalled first and its data is lost. Universal Installer detects the signature case before you commit and offers to uninstall the old copy for you.",
  },
  {
    q: "Installs keep failing on my Xiaomi / Redmi / POCO device",
    a: "MIUI and HyperOS have a setting called MIUI optimization that blocks third-party installs without explaining why. Turn it off in Developer options, install, then turn it back on. While it is off the system theme may look wrong — restarting the phone fixes that. The app now points this out in the error itself on Xiaomi hardware.",
  },
  {
    q: "“Delete APK after installation” did not delete anything",
    a: "It works for files you pick from inside the app. When you open an APK from a file manager, that app usually shares it in a way that grants no permission to delete it, and there is no supported way around that. You will get a message saying so rather than silence. Deleting it from the file manager is the way to clean up.",
  },
  {
    q: "I changed the installation source but the app still shows Universal Installer",
    a: "That setting needs Shizuku or Root. On the default Package Installer it is ignored, and Universal Installer genuinely is the installer at that point. Also note there are two separate fields: the installer an app is recorded under can be changed, but the app that started the install cannot. And it will not make the Play Store treat an app as installed from Play — Play verifies that on its own servers.",
  },
  {
    q: "Do I need root?",
    a: "No. The default mode works on any device with no setup. Shizuku and Root only add silent installs and the extra options above.",
  },
];

export default function GuidePage() {
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
        <div className="mx-auto max-w-3xl px-4 pt-12 pb-8 text-center sm:px-6 sm:pt-20 sm:pb-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-black/5 bg-white/70 px-3 py-1 text-xs font-medium text-zinc-600 dark:border-white/10 dark:bg-white/5 dark:text-zinc-300">
            <LifeBuoy size={14} aria-hidden />
            User guide
          </span>
          <h1 className="mt-5 text-3xl font-semibold tracking-tight sm:text-5xl font-display">
            How to use Universal Installer
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-zinc-600 dark:text-zinc-300">
            Everything from your first install to the options most people never
            need — plus straight answers for the errors that come up most.
          </p>
        </div>
      </section>

      {/* Section jumps for phones, where the sidebar is hidden. Scrolls sideways rather than
          wrapping to three rows and eating the screen. */}
      <nav className="sticky top-14 z-20 border-y border-black/5 bg-white/85 backdrop-blur lg:hidden dark:border-white/10 dark:bg-black/70">
        <ul className="mx-auto flex max-w-6xl gap-1.5 overflow-x-auto px-4 py-2.5 [scrollbar-width:none] sm:px-6 [&::-webkit-scrollbar]:hidden">
          {sections.map((s) => (
            <li key={s.id} className="shrink-0">
              <a
                href={`#${s.id}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-black/5 bg-white px-3 py-1.5 text-xs font-medium whitespace-nowrap text-zinc-600 dark:border-white/10 dark:bg-white/5 dark:text-zinc-300"
              >
                <s.icon size={13} aria-hidden />
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mx-auto flex max-w-6xl gap-10 px-4 pt-8 pb-16 sm:px-6 sm:pb-20 lg:pt-0">
        {/* Sidebar — desktop */}
        <aside className="hidden w-56 shrink-0 lg:block">
          <nav className="sticky top-24">
            <p className="px-3 pb-2 text-xs font-semibold tracking-widest text-zinc-400 dark:text-zinc-500">
              ON THIS PAGE
            </p>
            <ul className="flex flex-col gap-0.5">
              {sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-zinc-600 hover:bg-black/5 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-white/5 dark:hover:text-white"
                  >
                    <s.icon size={15} aria-hidden />
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Content */}
        <div className="min-w-0 flex-1 text-zinc-600 dark:text-zinc-300">
          <Section id="what" title="What is Universal Installer?">
            <p>
              A package installer for Android. It handles the formats the
              built-in installer cannot — split APK bundles, XAPK archives with
              OBB data — and gives you control over how each install happens,
              rather than a single confirm button.
            </p>
            <p className="mt-3">
              It works with no setup at all. Shizuku or root are optional, and
              only unlock silent installs and the advanced options.
            </p>
          </Section>

          <Section id="start" title="Quick start">
            <ol className="flex list-decimal flex-col gap-2 pl-5">
              <li>
                Install Universal Installer and open it. On first run it asks
                for permission to install apps — Android requires this of any
                installer.
              </li>
              <li>
                Tap the pick button and choose an APK, or open an APK from any
                file manager and pick Universal Installer.
              </li>
              <li>
                The details sheet shows the app name, version, size and what is
                inside the package. Tap <strong>Details</strong> to see
                permissions and splits, or just tap <strong>Install</strong>.
              </li>
              <li>
                If anything about the package is risky — a downgrade, a
                signature mismatch, a VirusTotal detection — you get a warning
                first, with the fix offered right there.
              </li>
            </ol>
          </Section>

          <Section id="modes" title="Install modes">
            <p>
              The mode decides how the install is performed. You pick it in
              Settings → Installation.
            </p>
            <div className="mt-4 flex flex-col gap-3">
              <Card
                icon={Smartphone}
                title="Package Installer (default)"
                body="No setup. Android shows its own confirmation for every install. All the advanced options below are ignored in this mode, because the system does not let a normal app use them."
              />
              <Card
                icon={Zap}
                title="Shizuku"
                body="Installs silently and unlocks every option below. Needs the Shizuku app installed and running — started over wireless debugging or root. Shizuku has to be restarted after each reboot unless your device is rooted."
              />
              <Card
                icon={Terminal}
                title="Root"
                body="Installs silently with no extra app to keep running. Needs a rooted device (Magisk, KernelSU and similar)."
              />
            </div>
          </Section>

          <Section id="formats" title="Supported formats">
            <p>
              APK, APKS, XAPK, APKM, APK+ and ZIP archives that contain a
              package. Split bundles are unpacked and installed as one app, and
              OBB data inside an XAPK is copied to the right folder afterwards.
            </p>
            <p className="mt-3">
              For split bundles you can choose which splits to include —
              languages, screen densities and CPU architectures you do not need
              can be left out to save space.
            </p>
          </Section>

          <Section id="options" title="Install options">
            <p>
              These need Shizuku or root. On the default mode they have no
              effect.
            </p>
            {/* Phones: one card per option — a 3-column table never fits. */}
            <div className="mt-4 flex flex-col gap-3 md:hidden">
              {options.map((o) => (
                <div
                  key={o.name}
                  className="rounded-2xl border border-black/5 bg-white p-4 dark:border-white/10 dark:bg-white/5"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                    <h3 className="font-semibold text-zinc-900 dark:text-white">
                      {o.name}
                    </h3>
                    <span className="text-xs whitespace-nowrap text-zinc-500 dark:text-zinc-400">
                      {o.on}
                    </span>
                  </div>
                  <p className="mt-2 text-sm">{o.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 hidden overflow-x-auto md:block">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-black/10 dark:border-white/10">
                    <th className="py-2 pr-4 font-semibold text-zinc-900 dark:text-white">
                      Option
                    </th>
                    <th className="py-2 pr-4 font-semibold text-zinc-900 dark:text-white">
                      Default
                    </th>
                    <th className="py-2 font-semibold text-zinc-900 dark:text-white">
                      What it does
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {options.map((o) => (
                    <tr
                      key={o.name}
                      className="border-b border-black/5 align-top dark:border-white/5"
                    >
                      <td className="py-3 pr-4 font-medium text-zinc-900 dark:text-white">
                        {o.name}
                      </td>
                      <td className="py-3 pr-4 whitespace-nowrap text-zinc-500 dark:text-zinc-400">
                        {o.on}
                      </td>
                      <td className="py-3">{o.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          <Section id="profiles" title="Installer profiles">
            <p>
              A profile is a saved set of the options above that you attach to
              specific apps. Instead of flipping switches before each install,
              you set a profile once and it applies whenever you install that
              app. Without a profile, the global settings apply.
            </p>
          </Section>

          <Section id="virustotal" title="VirusTotal scanning">
            <p>
              Any package can be checked against VirusTotal before you install
              it. It needs a free API key: get one at{" "}
              <a
                href="https://www.virustotal.com/gui/my-apikey"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[color:var(--brand)] hover:underline"
              >
                virustotal.com
              </a>{" "}
              and paste it into Settings → Advanced.
            </p>
            <p className="mt-3">
              Scanning is manual — tap <strong>Check with VirusTotal</strong> on
              the install screen. Turn on strict mode to be warned whenever you
              are about to install something that has never been scanned.
            </p>
          </Section>

          <Section id="tv" title="Android TV">
            <p>
              There is a separate Android TV build with a D-pad-first interface.
              Send packages from your phone over Wi-Fi, browse what is already
              on the box, and install without fighting a touch UI with a remote.
            </p>
            <p className="mt-3">
              It is in closed testing —{" "}
              <Link
                href="/testing"
                className="font-medium text-[color:var(--brand)] hover:underline"
              >
                join the TV beta
              </Link>
              . It has its own package name, so it installs alongside the phone
              app rather than replacing it.
            </p>
          </Section>

          <Section id="troubleshooting" title="Troubleshooting">
            <div className="flex flex-col gap-5">
              {faqs.map((f) => (
                <div key={f.q}>
                  <h3 className="font-semibold text-balance text-zinc-900 dark:text-white">
                    {f.q}
                  </h3>
                  <p className="mt-1.5">{f.a}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 rounded-2xl border border-black/5 bg-white p-4 text-sm dark:border-white/10 dark:bg-white/5">
              Still stuck? Settings → Diagnostics collects a report you can
              attach to a{" "}
              <a
                href="https://github.com/pass-with-high-score/universal-installer/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[color:var(--brand)] hover:underline"
              >
                GitHub issue
              </a>
              . Include your Android version and which install mode you were
              using — those two answer most questions on their own.
            </p>
          </Section>
        </div>
      </div>
    </>
  );
}

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    // Clears whatever is stuck to the top when jumping to a section: header + the mobile
    // chip nav on small screens, header alone from lg up where that nav is hidden.
    <section id={id} className="scroll-mt-28 pb-10 lg:scroll-mt-24">
      <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 font-display dark:text-white">
        {title}
      </h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function Card({
  icon: Icon,
  title,
  body,
}: {
  icon: React.ComponentType<{ size?: number; "aria-hidden"?: boolean }>;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-2xl border border-black/5 bg-white p-5 dark:border-white/10 dark:bg-white/5">
      <div className="flex items-center gap-2.5">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[color:var(--brand)]/10 text-[color:var(--brand)]">
          <Icon size={18} aria-hidden />
        </span>
        <h3 className="font-semibold text-zinc-900 dark:text-white">{title}</h3>
      </div>
      <p className="mt-2.5 text-sm">{body}</p>
    </div>
  );
}
