import type { Metadata } from "next";
import { Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service for Universal Installer, an Android package installer and manager supporting APK, APKS, XAPK, APKM, and ZIP files, optional security scanning, and Pro plans.",
  alternates: { canonical: "/terms" },
  openGraph: {
    title: "Terms of Service — Universal Installer",
    description:
      "The terms under which you may use Universal Installer, its security scanning features, elevated modes, and Pro subscriptions.",
    url: "/terms",
    type: "article",
  },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <header className="border-b border-black/5 pb-8 dark:border-white/10">
        <p className="text-sm font-medium text-[color:var(--brand)]">Legal</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
          Terms of Service
        </h1>
        <p className="mt-3 text-zinc-600 dark:text-zinc-400">
          Last updated: November 22, 2026
        </p>
      </header>

      <div className="mt-8 space-y-8 text-[15px] leading-7 text-zinc-700 sm:mt-10 dark:text-zinc-300">
        <section>
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
            1. Acceptance
          </h2>
          <p className="mt-2">
            By downloading, installing, or using Universal Installer (
            <code className="rounded bg-black/5 px-1.5 py-0.5 text-[13px] dark:bg-white/10">
              app.pwhs.universalinstaller
            </code>
            , &quot;the app&quot;) on Phone, Tablet, Foldable, Android TV, or
            Wear OS, you agree to these Terms of Service. If you do not agree,
            do not install or use the app.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
            2. Nature of the App &amp; Third-Party APK Disclaimer
          </h2>
          <p className="mt-2">
            Universal Installer is a utility tool designed to help you install
            and manage package files (APK, APKS, XAPK, APKM, and ZIP) on your
            own devices. Universal Installer does not host, store, distribute,
            or endorse any third-party APK files, and we are not responsible for
            the content, safety, copyright, licensing, or legality of any
            package you choose to obtain or install.
          </p>
          <p className="mt-3">
            Any third-party app you install using Universal Installer is
            governed solely by that app&apos;s own terms and privacy policy.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
            3. Open-Source License &amp; Builds
          </h2>
          <p className="mt-2">
            The app&apos;s source code is published in the project repository
            and is licensed under the license stated there. These Terms govern
            your use of the distributed app (both the Google Play build and the
            Open-Source build), while the repository license governs your rights
            to the source code.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
            4. Your Responsibilities
          </h2>
          <p className="mt-2">
            You are solely responsible for the packages you install and the
            actions you perform with the app. In particular:
          </p>
          <ul className="mt-3 list-disc space-y-1.5 pl-6">
            <li>
              Only install packages that you have the legal right to install.
            </li>
            <li>
              Understand that installing software — especially from unverified
              or unknown sources — can compromise your device and personal data.
            </li>
            <li>
              Maintain your own backups of important data and apps before
              installing, downgrading, or removing software.
            </li>
            <li>
              Comply with all applicable laws in your jurisdiction, including
              laws governing software distribution, intellectual property, and
              device modification.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
            5. Advanced &amp; Elevated Modes (Root, Shizuku, Shevery, Dhizuku)
          </h2>
          <p className="mt-2">
            Elevated modes — including Root, Shizuku, Shevery, and Dhizuku — are
            optional and require your explicit authorization. Performing
            advanced operations such as silent install/uninstall, setting a
            default installer or uninstaller, removing or freezing system apps,
            downgrading packages, or disabling the built-in system
            installer/uninstaller carries significant risk and can cause
            instability, data loss, or leave your device in an unsupported state.
            You assume full responsibility when enabling or using these
            features.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
            6. Security Scanning Disclaimer (AppShield / VirusDetec / VirusTotal)
          </h2>
          <p className="mt-2">
            Universal Installer offers optional security scanning via AppShield
            / VirusDetec and VirusTotal. By using these features, you
            acknowledge and agree that:
          </p>
          <ul className="mt-3 list-disc space-y-1.5 pl-6">
            <li>
              <strong>Informational only:</strong> Scan results are provided for
              reference only and{" "}
              <strong>do not guarantee 100% malware detection</strong>. A clean
              or &quot;safe&quot; verdict does not guarantee that a file is free
              from malware or unwanted behavior.
            </li>
            <li>
              <strong>Quick Check (Precheck) limitations:</strong> Automatic
              Precheck inspects only package metadata, signing certificates, and
              declared permissions/components — it does not analyze DEX bytecode
              or binary code, and is not a substitute for a deep code scan.
            </li>
            <li>
              <strong>File size limits:</strong> Files exceeding the upload size
              limits (<strong>&gt; 300 MB</strong> for VirusDetec,{" "}
              <strong>&gt; 650 MB</strong> for VirusTotal) are never uploaded
              for deep code scanning. You should only install large files from
              trusted sources.
            </li>
            <li>
              <strong>VirusTotal terms:</strong> Optional VirusTotal scanning
              requires your own API key (or fallback opt-in) and is subject to{" "}
              <a
                href="https://docs.virustotal.com/docs/terms-of-service"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[color:var(--brand)] underline underline-offset-2 hover:text-[color:var(--brand-dark)]"
              >
                VirusTotal&apos;s Terms of Service
              </a>
              .
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
            7. Reporting Inaccurate Scan Results
          </h2>
          <p className="mt-2">
            When submitting a false-positive or false-negative scan report, you
            agree not to spam, abuse the reporting system, or intentionally
            submit false, misleading, or malicious information.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
            8. Pro Plans, Pro Trial &amp; Billing (Google Play Build)
          </h2>
          <p className="mt-2">
            The Google Play build offers optional paid upgrades (&quot;Pro&quot;)
            with benefits that currently include unlimited daily automatic
            AppShield security scans, 1-tap quick install for{" "}
            <em>Recent APKs</em>, and priority support. Available Pro features
            may evolve over time.
          </p>
          <ul className="mt-3 list-disc space-y-1.5 pl-6">
            <li>
              <strong>Pro Yearly:</strong> An auto-renewing annual subscription
              billed through Google Play. You can manage or cancel your
              subscription at any time in your Google Play Subscriptions
              settings.
            </li>
            <li>
              <strong>Pro Lifetime:</strong> A one-time purchase granting
              lifetime access to Pro features for the supported lifespan of the
              product.
            </li>
            <li>
              <strong>Pro Trial (New-User Trial &amp; Milestone Trial):</strong>{" "}
              A time-limited free trial whose exact duration (in days or hours)
              is clearly displayed inside the app.{" "}
              <strong>
                No payment card is required, and trials never auto-renew or
                charge you
              </strong>{" "}
              when they end; once expired, the app automatically returns to the
              free tier.
            </li>
            <li>
              <strong>Refunds:</strong> All billing and refund requests are
              processed by Google Play and are subject to Google Play&apos;s
              refund policies.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
            9. No Warranty
          </h2>
          <p className="mt-2">
            The app is provided on an &quot;as is&quot; and &quot;as
            available&quot; basis, without warranties of any kind, whether
            express or implied, including warranties of merchantability, fitness
            for a particular purpose, and non-infringement. The app may contain
            bugs, may be unavailable, and may produce unexpected results.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
            10. Limitation of Liability
          </h2>
          <p className="mt-2">
            To the maximum extent permitted by law, the developers and
            contributors of Universal Installer will not be liable for any
            indirect, incidental, special, consequential, or punitive damages,
            or any loss of data, device functionality, or profits, arising out
            of or in connection with your use of the app, even if advised of the
            possibility of such damages.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
            11. Changes to These Terms
          </h2>
          <p className="mt-2">
            These Terms may be updated over time. Continued use of the app after
            an update means you accept the revised Terms. The &quot;Last
            updated&quot; date above reflects the most recent change.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
            12. Contact
          </h2>
          <p className="mt-2">
            Questions and feedback can be sent by email:
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
