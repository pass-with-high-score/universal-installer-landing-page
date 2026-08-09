import type { Metadata } from "next";
import { Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Universal Installer handles your data. No accounts, no ads. The Google Play build reports anonymous install statistics and crashes; the GitHub build reports nothing at all.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "Privacy Policy — Universal Installer",
    description:
      "No accounts, no ads. Exactly what the Play build reports, what the GitHub build doesn't, and what stays on your device.",
    url: "/privacy",
    type: "article",
  },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <header className="border-b border-black/5 pb-8 dark:border-white/10">
        <p className="text-sm font-medium text-[color:var(--brand)]">Legal</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-3 text-zinc-600 dark:text-zinc-400">
          Last updated: August 9, 2026
        </p>
      </header>

      <div className="mt-8 space-y-8 text-[15px] leading-7 text-zinc-700 sm:mt-10 dark:text-zinc-300">
        <section>
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
            Summary
          </h2>
          <p className="mt-2">
            Universal Installer (&quot;the app&quot;) is an Android package manager
            that installs APK, APKS, XAPK, and APKM files on your device. There are
            no accounts and no advertising, and we never sell or share your personal
            data.
          </p>
          <p className="mt-3">
            There are two builds of the app, and they differ in exactly one respect:
          </p>
          <ul className="mt-3 list-disc space-y-1 pl-6">
            <li>
              The <strong>Google Play</strong> build reports anonymous statistics
              about how installs go, and crash reports, through Google Firebase.
            </li>
            <li>
              The <strong>GitHub</strong> build reports nothing. It contains no
              analytics or crash-reporting code at all.
            </li>
          </ul>
          <p className="mt-3">
            Both builds are open source, so you can verify every statement on this
            page by reading the code.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
            Data we collect
          </h2>
          <p className="mt-2">
            From the GitHub build: nothing. It creates no account, transmits no
            usage statistics, and reports no crashes. Everything it needs to operate
            stays on your device.
          </p>
          <p className="mt-3">
            From the Google Play build, two things are sent to Google Firebase:
          </p>
          <ul className="mt-3 list-disc space-y-1 pl-6">
            <li>
              <strong>Install statistics.</strong> When an install starts and when
              it finishes, we record which install method was used (the standard
              Android installer, Shizuku, root, or Dhizuku), whether it succeeded,
              failed, or was cancelled, the category of error if it failed, and how
              many package files were involved.
            </li>
            <li>
              <strong>Crash reports.</strong> When the app crashes or recovers from
              an error, we receive the stack trace, your device model and Android
              version, the app version, and the app&apos;s own warning and error log
              lines leading up to it.
            </li>
          </ul>
          <p className="mt-3">
            <strong>
              We never record what you install.
            </strong>{" "}
            No package names, app names, file names, or file paths are sent — not in
            statistics, not in crash reports. What we are trying to learn is which
            install methods work and where they fail, and that requires none of it.
          </p>
          <p className="mt-3">
            Firebase additionally assigns a random per-installation identifier and
            collects standard technical information such as device model, operating
            system version, app version, coarse country, and language. It is not
            linked to a name, email, or account, because the app has none. Deleting
            and reinstalling the app resets the identifier.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
            Firebase, and how to avoid it
          </h2>
          <p className="mt-2">
            The Google Play build uses Firebase Analytics and Firebase Crashlytics,
            which are operated by Google. Data sent to them is handled under{" "}
            <a
              href="https://firebase.google.com/support/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[color:var(--brand)] underline underline-offset-2 hover:text-[color:var(--brand-dark)]"
            >
              Google&apos;s Firebase privacy and security policy
            </a>
            . Because Firebase Analytics is included, the Play build also declares
            Android&apos;s advertising ID permission. The app shows no ads and runs
            no ad campaigns.
          </p>
          <p className="mt-3">
            If you would rather send nothing at all, install the build published on{" "}
            <a
              href="https://github.com/pass-with-high-score/universal-installer/releases"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[color:var(--brand)] underline underline-offset-2 hover:text-[color:var(--brand-dark)]"
            >
              GitHub Releases
            </a>
            . It is the same app, built from the same source, with the Firebase
            libraries left out entirely rather than merely switched off.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
            Data stored on your device
          </h2>
          <p className="mt-2">
            The app stores the following information locally, in Android&apos;s
            private app storage, and never uploads it:
          </p>
          <ul className="mt-3 list-disc space-y-1 pl-6">
            <li>Installation history (package names, status, timestamps).</li>
            <li>Your app preferences, including theme and installer options.</li>
            <li>
              Your VirusTotal API key, if you choose to enable VirusTotal
              scanning.
            </li>
          </ul>
          <p className="mt-3">
            Clearing the app&apos;s storage from Android system settings removes
            this data.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
            Network access
          </h2>
          <p className="mt-2">
            The app&apos;s core functionality — reading, inspecting, and
            installing package files — works entirely offline. Beyond the Firebase
            reporting described above, which applies to the Google Play build only,
            network access is used for the following optional features, and only
            when you explicitly trigger them:
          </p>
          <ul className="mt-3 list-disc space-y-1 pl-6">
            <li>
              <strong>VirusTotal scanning.</strong> If you provide a VirusTotal
              API key and ask the app to scan a file, the file&apos;s hash (and,
              if needed, the file itself) is sent to the VirusTotal API using
              your key. This feature is disabled by default.
            </li>
            <li>
              <strong>LAN file sharing.</strong> The built-in file server runs on
              your local network only, and only while you have it switched on.
            </li>
          </ul>
          <p className="mt-3">
            When you use VirusTotal, your request is subject to{" "}
            <a
              href="https://docs.virustotal.com/docs/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[color:var(--brand)] underline underline-offset-2 hover:text-[color:var(--brand-dark)]"
            >
              VirusTotal&apos;s own privacy policy
            </a>
            . We have no control over or access to the data VirusTotal receives.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
            Android permissions
          </h2>
          <p className="mt-2">
            The app requests only the permissions it needs to install and manage
            packages, including permission to read storage (to access APK files
            you select), permission to install other apps, and permission to
            query installed packages. None of them is used for advertising.
          </p>
          <p className="mt-3">
            The Google Play build additionally declares the advertising ID
            permission, which the Firebase Analytics library brings with it. The
            GitHub build does not declare it.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
            Shizuku
          </h2>
          <p className="mt-2">
            If you opt in to Shizuku mode, the app communicates with the Shizuku
            service on your device to perform silent installs and related
            operations. This happens entirely on-device; no data leaves your
            phone as part of Shizuku integration.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
            Children&apos;s privacy
          </h2>
          <p className="mt-2">
            The app is not directed at children and does not knowingly collect
            personal information from anyone, including children under 13. Nothing
            it reports identifies a person.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
            Changes to this policy
          </h2>
          <p className="mt-2">
            If the privacy practices of the app change, this page will be
            updated and the &quot;Last updated&quot; date above revised. Material
            changes will also be noted in release notes on GitHub.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
            Contact
          </h2>
          <p className="mt-2">
            Questions about this policy can be sent by email:
          </p>
          <p className="mt-3">
            <a
              href="mailto:nguyenquangminh570@gmail.com"
              className="inline-flex max-w-full items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-medium break-all text-[color:var(--brand-dark)] hover:border-[color:var(--brand)]/40 dark:border-white/10 dark:bg-white/5 dark:text-orange-300"
            >
              <Mail size={16} aria-hidden className="flex-none" />
              <span className="break-all">nguyenquangminh570@gmail.com</span>
            </a>
          </p>
        </section>
      </div>
    </article>
  );
}
