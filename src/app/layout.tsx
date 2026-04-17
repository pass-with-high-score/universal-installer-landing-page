import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Github, Heart } from "lucide-react";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://universal-installer.pwhs.app";
const SITE_NAME = "Universal Installer";
const SITE_DESCRIPTION =
  "Install APK, APKS, XAPK, and APKM files on Android with split APK support, silent install via Shizuku, VirusTotal scanning, and batch uninstall — open source, no ads, no tracking.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Universal Installer — Install APK, APKS, XAPK & APKM on Android",
    template: "%s · Universal Installer",
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "Universal Installer",
    "APK installer",
    "APKS installer",
    "XAPK installer",
    "APKM installer",
    "split APK",
    "split APK installer",
    "install split APK",
    "Android package installer",
    "silent install Android",
    "Shizuku installer",
    "install APK without prompt",
    "APKPure installer",
    "APKMirror installer",
    "VirusTotal APK scan",
    "batch uninstall Android",
    "open source APK installer",
    "Material You installer",
    "install bundled APK",
    "app.pwhs.universalinstaller",
  ],
  authors: [{ name: "pass-with-high-score", url: "https://github.com/pass-with-high-score" }],
  creator: "pass-with-high-score",
  publisher: "pass-with-high-score",
  category: "technology",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Universal Installer — Install APK, APKS, XAPK & APKM on Android",
    description: SITE_DESCRIPTION,
    locale: "en_US",
    images: [
      {
        url: "/images/featureGraphic.png",
        width: 1024,
        height: 500,
        alt: "Universal Installer — modern Android package manager",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Universal Installer — Install APK, APKS, XAPK & APKM",
    description: SITE_DESCRIPTION,
    images: ["/images/featureGraphic.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
  other: {
    "google-play-app": "app-id=app.pwhs.universalinstaller",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[--background] text-[--foreground]">
        <header className="sticky top-0 z-30 border-b border-black/5 bg-white/80 backdrop-blur dark:border-white/10 dark:bg-black/60">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
            <Link href="/" className="flex min-w-0 items-center gap-2.5">
              <Image
                src="/images/icon.png"
                alt="Universal Installer icon"
                width={32}
                height={32}
                className="h-8 w-8 flex-none rounded-lg"
              />
              <span className="truncate text-sm font-semibold tracking-tight sm:text-base">
                Universal Installer
              </span>
            </Link>
            <nav className="flex items-center gap-1 text-sm font-medium sm:gap-2">
              <Link
                href="/#features"
                className="hidden rounded-full px-3 py-1.5 text-zinc-600 hover:text-zinc-900 md:inline dark:text-zinc-300 dark:hover:text-white"
              >
                Features
              </Link>
              <Link
                href="/testing"
                className="hidden rounded-full px-3 py-1.5 text-zinc-600 hover:text-zinc-900 sm:inline dark:text-zinc-300 dark:hover:text-white"
              >
                Beta
              </Link>
              <Link
                href="/privacy"
                className="hidden rounded-full px-3 py-1.5 text-zinc-600 hover:text-zinc-900 md:inline dark:text-zinc-300 dark:hover:text-white"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="hidden rounded-full px-3 py-1.5 text-zinc-600 hover:text-zinc-900 md:inline dark:text-zinc-300 dark:hover:text-white"
              >
                Terms
              </Link>
              <a
                href="https://github.com/sponsors/pass-with-high-score"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Sponsor on GitHub"
                className="inline-flex h-9 items-center justify-center gap-1.5 rounded-full border border-pink-500/30 bg-pink-50 px-2.5 text-pink-700 hover:border-pink-500/50 hover:bg-pink-100 sm:px-3 dark:border-pink-400/30 dark:bg-pink-500/10 dark:text-pink-300 dark:hover:bg-pink-500/15"
              >
                <Heart size={16} aria-hidden className="fill-current" />
                <span className="hidden sm:inline">Sponsor</span>
              </a>
              <a
                href="https://github.com/pass-with-high-score/universal-installer"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View on GitHub"
                className="inline-flex h-9 items-center justify-center gap-1.5 rounded-full bg-[color:var(--brand)] px-2.5 text-white hover:bg-[color:var(--brand-dark)] sm:ml-1 sm:px-4"
              >
                <Github size={16} aria-hidden />
                <span className="hidden sm:inline">GitHub</span>
              </a>
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-black/5 dark:border-white/10">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-zinc-600 sm:flex-row sm:items-center sm:justify-between sm:px-6 dark:text-zinc-400">
            <div className="flex items-center gap-2.5">
              <Image
                src="/images/icon.png"
                alt=""
                width={24}
                height={24}
                className="rounded-md"
              />
              <span>© {new Date().getFullYear()} Universal Installer</span>
            </div>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <Link href="/testing" className="hover:text-zinc-900 dark:hover:text-white">
                Join Beta
              </Link>
              <Link href="/privacy" className="hover:text-zinc-900 dark:hover:text-white">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-zinc-900 dark:hover:text-white">
                Terms of Service
              </Link>
              <a
                href="https://github.com/pass-with-high-score/universal-installer"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-zinc-900 dark:hover:text-white"
              >
                <Github size={14} aria-hidden />
                Source
              </a>
              <a
                href="https://github.com/sponsors/pass-with-high-score"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-pink-600 hover:text-pink-700 dark:text-pink-400 dark:hover:text-pink-300"
              >
                <Heart size={14} aria-hidden className="fill-current" />
                Sponsor
              </a>
            </div>
          </div>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
