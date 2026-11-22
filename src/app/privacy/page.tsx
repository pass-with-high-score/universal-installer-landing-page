import type { Metadata } from "next";
import { Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Universal Installer handles your data across its Google Play and Open-Source builds, AppShield/VirusDetec security scanning, optional VirusTotal integration, and Android permissions.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "Privacy Policy — Universal Installer",
    description:
      "No accounts, no ads. Exactly what the Google Play and Open-Source builds send, how AppShield & VirusTotal scanning work, and what stays on your device.",
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
          Last updated: November 22, 2026
        </p>
      </header>

      <div className="mt-8 space-y-8 text-[15px] leading-7 text-zinc-700 sm:mt-10 dark:text-zinc-300">
        <section>
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
            1. Overview &amp; Two App Builds
          </h2>
          <p className="mt-2">
            Universal Installer (
            <code className="rounded bg-black/5 px-1.5 py-0.5 text-[13px] dark:bg-white/10">
              app.pwhs.universalinstaller
            </code>
            , &quot;the app&quot;) is an Android package installer and manager
            for Phones, Tablets, Foldables, Android TV, and Wear OS. It supports
            APK, APKS, XAPK, APKM, and ZIP package files. There are no user
            accounts and no advertising, and we never sell or share your
            personal data.
          </p>
          <p className="mt-3">
            Universal Installer is distributed in two distinct builds:
          </p>
          <ul className="mt-3 list-disc space-y-1.5 pl-6">
            <li>
              <strong>Google Play build (play flavor):</strong> Includes Google
              Play Billing (for Pro purchases), Firebase Analytics, Firebase
              Crashlytics, and Firebase Remote Config. You can turn off Firebase
              Analytics at any time in{" "}
              <strong>Settings &rarr; About &rarr; Analytics</strong>.
            </li>
            <li>
              <strong>Open-Source build (opensource flavor):</strong> Published
              on{" "}
              <a
                href="https://github.com/pass-with-high-score/universal-installer/releases"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[color:var(--brand)] underline underline-offset-2 hover:text-[color:var(--brand-dark)]"
              >
                GitHub Releases
              </a>
              . It does not include Firebase Analytics, Firebase Crashlytics,
              Firebase Remote Config, or Google Play Billing, and collects no
              telemetry.
            </li>
          </ul>
          <p className="mt-3">
            Both builds are built from our open-source codebase so you can
            independently verify every statement on this page.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
            2. Data Sent Externally &amp; Third-Party Services
          </h2>

          <h3 className="mt-4 text-base font-semibold text-zinc-900 dark:text-white">
            A. AppShield / VirusDetec Security Scanning (Developer Server)
          </h3>
          <ul className="mt-2 list-disc space-y-1.5 pl-6">
            <li>
              <strong>
                Automatic Quick Check (Precheck — does NOT upload APK files):
              </strong>{" "}
              When you open an installer file with security scanning enabled,
              the app computes the file&apos;s <strong>SHA-256</strong> hash
              locally on your device and sends only package metadata to our
              server:{" "}
              <code className="rounded bg-black/5 px-1.5 py-0.5 text-[13px] dark:bg-white/10">
                sha256
              </code>
              ,{" "}
              <code className="rounded bg-black/5 px-1.5 py-0.5 text-[13px] dark:bg-white/10">
                packageName
              </code>
              ,{" "}
              <code className="rounded bg-black/5 px-1.5 py-0.5 text-[13px] dark:bg-white/10">
                appName
              </code>
              ,{" "}
              <code className="rounded bg-black/5 px-1.5 py-0.5 text-[13px] dark:bg-white/10">
                versionName
              </code>
              ,{" "}
              <code className="rounded bg-black/5 px-1.5 py-0.5 text-[13px] dark:bg-white/10">
                versionCode
              </code>
              ,{" "}
              <code className="rounded bg-black/5 px-1.5 py-0.5 text-[13px] dark:bg-white/10">
                minSdk
              </code>
              ,{" "}
              <code className="rounded bg-black/5 px-1.5 py-0.5 text-[13px] dark:bg-white/10">
                targetSdk
              </code>
              ,{" "}
              <code className="rounded bg-black/5 px-1.5 py-0.5 text-[13px] dark:bg-white/10">
                certSha256
              </code>
              , and the declared lists of{" "}
              <code className="rounded bg-black/5 px-1.5 py-0.5 text-[13px] dark:bg-white/10">
                permissions
              </code>
              ,{" "}
              <code className="rounded bg-black/5 px-1.5 py-0.5 text-[13px] dark:bg-white/10">
                services
              </code>
              , and{" "}
              <code className="rounded bg-black/5 px-1.5 py-0.5 text-[13px] dark:bg-white/10">
                receivers
              </code>
              . An <strong>anonymous Device ID</strong> (randomly generated
              locally by{" "}
              <code className="rounded bg-black/5 px-1.5 py-0.5 text-[13px] dark:bg-white/10">
                DeviceIdProvider
              </code>
              , never using hardware identifiers like IMEI or serial numbers) is
              sent solely to manage daily free scan quotas.
            </li>
            <li>
              <strong>
                Deep Code Scan (Binary Upload — ONLY when you tap &quot;Deep
                Scan / Upload &amp; Scan&quot;):
              </strong>{" "}
              The APK binary is uploaded only when you explicitly initiate a
              deep scan and no cached report already exists on our server. Only
              files <strong>&le; 300 MB</strong> can be uploaded; files larger
              than 300 MB are <strong>never</strong> uploaded.
            </li>
            <li>
              <strong>
                Scan Accuracy Reports (False Positive / False Negative):
              </strong>{" "}
              Sent only when you explicitly submit the report form:{" "}
              <code className="rounded bg-black/5 px-1.5 py-0.5 text-[13px] dark:bg-white/10">
                sha256
              </code>
              ,{" "}
              <code className="rounded bg-black/5 px-1.5 py-0.5 text-[13px] dark:bg-white/10">
                packageName
              </code>
              ,{" "}
              <code className="rounded bg-black/5 px-1.5 py-0.5 text-[13px] dark:bg-white/10">
                appName
              </code>
              , the reason you enter, and an{" "}
              <strong>optional email address</strong> if you choose to provide
              one to receive a follow-up.
            </li>
          </ul>

          <h3 className="mt-5 text-base font-semibold text-zinc-900 dark:text-white">
            B. VirusTotal (Optional / Fallback)
          </h3>
          <p className="mt-2">
            Data is sent to <strong>VirusTotal (Chronicle / Google)</strong>{" "}
            only if you enter your own personal VirusTotal API key or enable
            VirusTotal fallback mode. Lookups are performed using the
            file&apos;s{" "}
            <code className="rounded bg-black/5 px-1.5 py-0.5 text-[13px] dark:bg-white/10">
              sha256
            </code>{" "}
            hash; binary files (up to <strong>650 MB</strong>) are uploaded only
            when you explicitly tap to run a deep scan.
          </p>
          <p className="mt-2">
            Files uploaded to VirusTotal are governed by{" "}
            <a
              href="https://docs.virustotal.com/docs/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[color:var(--brand)] underline underline-offset-2 hover:text-[color:var(--brand-dark)]"
            >
              VirusTotal&apos;s privacy policy
            </a>{" "}
            and may be shared with the broader security community. We have no
            control over or access to data received by VirusTotal.
          </p>

          <h3 className="mt-5 text-base font-semibold text-zinc-900 dark:text-white">
            C. Firebase &amp; Google Play (Google Play Build Only)
          </h3>
          <p className="mt-2">
            The Google Play build integrates the following Google services,
            which are completely absent from the Open-Source build:
          </p>
          <ul className="mt-2 list-disc space-y-1.5 pl-6">
            <li>
              <strong>Firebase Analytics:</strong> Collects anonymous usage
              events (such as install mode, file format, Pro status, and install
              error categories) — never personal file contents. You can disable
              Analytics completely in{" "}
              <strong>Settings &rarr; About &rarr; Analytics</strong>.
            </li>
            <li>
              <strong>Firebase Crashlytics:</strong> Collects crash stack traces
              and basic device information (device model, Android version, app
              version) to diagnose and fix crashes.
            </li>
            <li>
              <strong>Firebase Remote Config:</strong> Downloads remote
              configuration parameters such as scan quotas and Pro Trial
              settings.
            </li>
            <li>
              <strong>Google Play Billing:</strong> Processes purchases for{" "}
              <strong>Pro Yearly</strong> (auto-renewing subscription) and{" "}
              <strong>Pro Lifetime</strong> (one-time purchase). The app never
              collects, processes, or stores your payment card or billing
              details.
            </li>
          </ul>
          <p className="mt-3">
            Data handled by Firebase is governed by{" "}
            <a
              href="https://firebase.google.com/support/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[color:var(--brand)] underline underline-offset-2 hover:text-[color:var(--brand-dark)]"
            >
              Google&apos;s Firebase privacy and security policy
            </a>
            . Because Firebase Analytics is bundled in the Google Play build,
            that build declares Android&apos;s advertising ID permission; the
            app displays no ads and runs no ad campaigns. The Open-Source build
            does not include Firebase or declare this permission.
          </p>

          <h3 className="mt-5 text-base font-semibold text-zinc-900 dark:text-white">
            D. Local Network &amp; Direct URL Features
          </h3>
          <ul className="mt-2 list-disc space-y-1.5 pl-6">
            <li>
              <strong>Wi-Fi Sync / Send to TV / Wear OS Transfer:</strong>{" "}
              Transfers files directly over your local LAN via an on-device HTTP
              server (with optional PIN protection). Files never pass through
              any external or relay server.
            </li>
            <li>
              <strong>Download from URL / Check Updates:</strong> Connects
              directly to the URL or update source you choose.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
            3. Sensitive Android Permissions &amp; Purposes
          </h2>
          <p className="mt-2">
            Universal Installer requests only the permissions required to
            deliver its package installation and management features. None of
            these permissions is used for advertising or user tracking:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>
              <code className="rounded bg-black/5 px-1.5 py-0.5 text-[13px] dark:bg-white/10">
                REQUEST_INSTALL_PACKAGES
              </code>
              : Required to install APK, APKS, XAPK, APKM, and ZIP package
              files.
            </li>
            <li>
              <code className="rounded bg-black/5 px-1.5 py-0.5 text-[13px] dark:bg-white/10">
                QUERY_ALL_PACKAGES
              </code>
              : Required to list installed apps for app management, detect
              duplicate versions or downgrades, compare signing certificates,
              uninstall apps, and back up APKs.
            </li>
            <li>
              <code className="rounded bg-black/5 px-1.5 py-0.5 text-[13px] dark:bg-white/10">
                MANAGE_EXTERNAL_STORAGE
              </code>{" "}
              (Android 11+) /{" "}
              <code className="rounded bg-black/5 px-1.5 py-0.5 text-[13px] dark:bg-white/10">
                READ_EXTERNAL_STORAGE
              </code>{" "}
              &amp;{" "}
              <code className="rounded bg-black/5 px-1.5 py-0.5 text-[13px] dark:bg-white/10">
                WRITE_EXTERNAL_STORAGE
              </code>{" "}
              (Android 10 and below): Used to automatically scan device storage
              for installer files (<em>Find Automatic</em>), show recently added
              installers (<em>Recent APKs</em>), automatically delete APK files
              after installation, and copy OBB expansion files.
            </li>
            <li>
              <code className="rounded bg-black/5 px-1.5 py-0.5 text-[13px] dark:bg-white/10">
                PACKAGE_USAGE_STATS
              </code>{" "}
              (optional): Used to sort installed apps by most recently used in
              the App Manager.
            </li>
            <li>
              <code className="rounded bg-black/5 px-1.5 py-0.5 text-[13px] dark:bg-white/10">
                POST_NOTIFICATIONS
              </code>
              : Displays background installation progress, install confirmation
              prompts, and status notifications for security scans, downloads,
              and OBB copying.
            </li>
            <li>
              <code className="rounded bg-black/5 px-1.5 py-0.5 text-[13px] dark:bg-white/10">
                FOREGROUND_SERVICE
              </code>{" "}
              /{" "}
              <code className="rounded bg-black/5 px-1.5 py-0.5 text-[13px] dark:bg-white/10">
                FOREGROUND_SERVICE_DATA_SYNC
              </code>
              : Keeps background operations running reliably during
              installations, Wi-Fi Sync transfers, Wear OS transfers, and OBB
              file copying.
            </li>
            <li>
              <strong>
                Optional Elevated Modes (Shizuku / Shevery / Dhizuku / Root):
              </strong>{" "}
              Active only when you explicitly grant access. Used entirely
              on-device for silent install/uninstall, setting the default
              installer or uninstaller, and freezing or managing app
              permissions. No data leaves your device through these
              integrations.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
            4. Data Stored Only on Your Device
          </h2>
          <p className="mt-2">
            The following data is stored exclusively in private local storage on
            your device and is never synced to our servers:
          </p>
          <ul className="mt-3 list-disc space-y-1.5 pl-6">
            <li>Personal app settings and installer preferences.</li>
            <li>Installation Profiles and package Blacklist.</li>
            <li>App Lock configuration (PIN / Biometric).</li>
            <li>Installation history, usage statistics, and Milestones.</li>
            <li>Local configuration backups (Backup / Restore files).</li>
            <li>
              Your personal VirusTotal API key (if you choose to configure one).
            </li>
          </ul>
          <p className="mt-3">
            Clearing the app&apos;s storage in Android system settings or
            uninstalling the app deletes this local data.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
            5. Children&apos;s Privacy
          </h2>
          <p className="mt-2">
            Universal Installer is not directed at children and does not
            knowingly collect personal information from anyone, including
            children under 13.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
            6. Changes to This Policy
          </h2>
          <p className="mt-2">
            If the app&apos;s privacy practices change, we will update this page
            and revise the &quot;Last updated&quot; date above. Material changes
            will also be noted in release notes on GitHub.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
            7. Contact
          </h2>
          <p className="mt-2">
            Questions or requests regarding this Privacy Policy can be sent by
            email:
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
