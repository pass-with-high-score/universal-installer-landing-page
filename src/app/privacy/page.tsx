import type { Metadata } from "next";
import { Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy — Universal Installer",
  description:
    "How Universal Installer handles your data: no collection, no tracking, no ads.",
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
          Last updated: April 17, 2026
        </p>
      </header>

      <div className="mt-8 space-y-8 text-[15px] leading-7 text-zinc-700 sm:mt-10 dark:text-zinc-300">
        <section>
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
            Summary
          </h2>
          <p className="mt-2">
            Universal Installer (&quot;the app&quot;) is an Android package manager
            that installs APK, APKS, XAPK, and APKM files on your device. The app
            does not collect, sell, or share personal data. It does not include
            advertising or analytics. You can verify these statements by reviewing
            the source code.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
            Data we collect
          </h2>
          <p className="mt-2">
            None. The app does not create an account, does not transmit usage
            statistics, and does not report crashes to a remote server. Everything
            the app needs to operate stays on your device.
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
            installing package files — works entirely offline. Network access is
            used only for the following optional features, and only when you
            explicitly trigger them:
          </p>
          <ul className="mt-3 list-disc space-y-1 pl-6">
            <li>
              <strong>VirusTotal scanning.</strong> If you provide a VirusTotal
              API key and ask the app to scan a file, the file&apos;s hash (and,
              if needed, the file itself) is sent to the VirusTotal API using
              your key. This feature is disabled by default.
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
            query installed packages. No permission is used for tracking or
            advertising.
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
            The app does not knowingly collect any information from anyone,
            including children under 13.
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
