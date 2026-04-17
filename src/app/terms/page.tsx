import type { Metadata } from "next";
import { Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service — Universal Installer",
  description:
    "The terms under which you may use Universal Installer, an open-source Android package manager.",
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
          Last updated: April 17, 2026
        </p>
      </header>

      <div className="mt-8 space-y-8 text-[15px] leading-7 text-zinc-700 sm:mt-10 dark:text-zinc-300">
        <section>
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
            1. Acceptance
          </h2>
          <p className="mt-2">
            By downloading, installing, or using Universal Installer (&quot;the
            app&quot;), you agree to these Terms of Service. If you do not agree,
            do not install or use the app.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
            2. What the app does
          </h2>
          <p className="mt-2">
            The app is an Android package manager that helps you install and
            manage APK, APKS, XAPK, and APKM files on your own device. It is
            provided free of charge and is released as open-source software.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
            3. License
          </h2>
          <p className="mt-2">
            The source code is published in the project repository and is
            licensed under the license stated there. These Terms govern your use
            of the distributed app; the license governs your rights to the
            source code.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
            4. Your responsibilities
          </h2>
          <p className="mt-2">
            You are responsible for the packages you install with the app. In
            particular:
          </p>
          <ul className="mt-3 list-disc space-y-1 pl-6">
            <li>
              Only install packages that you have the legal right to install.
            </li>
            <li>
              Understand that installing software — especially from unknown
              sources — can compromise your device and data.
            </li>
            <li>
              Keep your own backups. The app does not back up your device or the
              apps it installs.
            </li>
            <li>
              Comply with all applicable laws, including laws about software
              distribution, intellectual property, and device modification in
              your jurisdiction.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
            5. Shizuku and silent install
          </h2>
          <p className="mt-2">
            Shizuku mode is optional and requires you to configure Shizuku
            yourself. Silent install, permission granting, downgrades, and other
            advanced operations are powerful features that can leave your device
            in an unsupported state. You use them at your own risk.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
            6. VirusTotal integration
          </h2>
          <p className="mt-2">
            VirusTotal scanning is optional and requires you to provide your own
            API key. When enabled, file hashes — and, where necessary, files
            themselves — are sent to VirusTotal using your key. Your use of
            VirusTotal is subject to VirusTotal&apos;s own terms. A VirusTotal
            scan result is informational and does not guarantee that a file is
            safe.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
            7. Third-party software
          </h2>
          <p className="mt-2">
            Any app you install using Universal Installer is governed by that
            app&apos;s own terms and is provided by a third party. Universal
            Installer is not responsible for the behavior, content, or safety of
            packages you choose to install.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
            8. No warranty
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
            9. Limitation of liability
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
            10. Changes
          </h2>
          <p className="mt-2">
            These Terms may be updated over time. Continued use of the app after
            an update means you accept the revised Terms. The &quot;Last
            updated&quot; date above reflects the most recent change.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
            11. Contact
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
