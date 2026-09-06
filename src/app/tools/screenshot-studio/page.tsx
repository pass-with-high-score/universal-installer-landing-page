import type { Metadata } from "next";
import Link from "next/link";
import { Camera, Sparkles, Layers, ArrowLeft } from "lucide-react";
import ScreenshotStudio from "@/components/ScreenshotStudio";

export const metadata: Metadata = {
  title: "App Screenshot Mockup Studio — Universal Installer",
  description:
    "Interactive mockup generator and screenshot design studio for Android Phone (9:16), Android TV (16:9), and Wear OS (1:1) app store listings.",
  keywords: [
    "app screenshot generator",
    "android tv mockup generator",
    "wear os screenshot mockup",
    "google play store screenshot template",
    "app store mockup studio",
  ],
  alternates: { canonical: "/tools/screenshot-studio" },
  openGraph: {
    title: "App Screenshot Mockup Studio — Universal Installer",
    description:
      "Interactive screenshot templates for Mobile, Android TV, and Wear OS smartwatches.",
    url: "/tools/screenshot-studio",
    type: "website",
    images: ["/images/featureGraphic.png"],
  },
  robots: { index: true, follow: true },
};

export default function ScreenshotStudioPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Screenshot Mockup Studio",
    applicationCategory: "DesignApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "Interactive screenshot studio to design Google Play Store screenshots for Android Phone, Android TV, and Wear OS.",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
          >
            <ArrowLeft size={14} />
            Back to Universal Installer
          </Link>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-black/5 bg-white px-3 py-1 text-xs font-medium text-zinc-600 dark:border-white/10 dark:bg-zinc-800 dark:text-zinc-300">
            <Sparkles size={13} className="text-[color:var(--brand)]" />
            Interactive Mockup Studio
          </span>
        </div>

        <div className="mt-4 max-w-2xl">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl font-display dark:text-white">
            App Screenshot Mockup Studio
          </h1>
          <p className="mt-2 text-sm sm:text-base text-zinc-600 dark:text-zinc-300">
            Preview and customize screenshot templates across 3 device formats (Mobile 9:16, Android TV 16:9, Wear OS 1:1) and 3 visual themes. Upload your own screenshots or use the built-in mock UIs.
          </p>
        </div>

        <div className="mt-8">
          <ScreenshotStudio />
        </div>
      </div>
    </>
  );
}
