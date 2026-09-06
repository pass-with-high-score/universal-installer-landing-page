export type ArticleCategory =
  | "Wear OS"
  | "Android TV"
  | "Formats & Guides"
  | "Shizuku & Root"
  | "Security"
  | "Comparisons";

export type Article = {
  slug: string;
  title: string;
  description: string;
  category: ArticleCategory;
  readTime: string;
  publishedAt: string;
  updatedAt: string;
  keywords: string[];
  summary: string;
  sections: {
    id: string;
    title: string;
    paragraphs: string[];
    tips?: string[];
  }[];
  faqs: {
    q: string;
    a: string;
  }[];
  related: string[];
};

export const ARTICLES: Article[] = [
  {
    slug: "how-to-install-apk-on-wear-os",
    title: "How to Sideload & Install APKs on Wear OS Smartwatches (Galaxy Watch, Pixel Watch)",
    description:
      "A complete guide on sideloading APKs and managing packages on Wear OS smartwatches like Samsung Galaxy Watch and Google Pixel Watch using Universal Installer.",
    category: "Wear OS",
    readTime: "6 min read",
    publishedAt: "2026-03-01",
    updatedAt: "2026-09-06",
    keywords: [
      "install apk on wear os",
      "sideload wear os apps",
      "galaxy watch apk installer",
      "pixel watch sideload apk",
      "wear os package manager",
      "install apks on samsung galaxy watch",
      "wear os wireless adb install",
    ],
    summary:
      "Wear OS smartwatches (running Wear OS 3, 4, or 5) run standard Android under the hood, but installing third-party APKs without a computer used to be tedious. Here is how you can install apps directly on your smartwatch or via Google Play.",
    sections: [
      {
        id: "understanding-wear-os-apps",
        title: "How Wear OS Application Installation Works",
        paragraphs: [
          "Wear OS is based on the Android operating system, meaning smartwatches like the Samsung Galaxy Watch 4/5/6/7, Google Pixel Watch 1/2/3, and OnePlus Watch 2 can run standard Android application packages (.apk).",
          "However, standard Android phone apps often feature user interfaces designed for rectangular touchscreens, while Wear OS utilizes circular or compact square displays with rotary input (crown/bezel) and strict power-budget constraints.",
          "Universal Installer now features an official dedicated Wear OS module available directly on Google Play Store, making smartwatch package management effortless.",
        ],
      },
      {
        id: "method-1-google-play",
        title: "Method 1: Direct Install via Google Play Store (Recommended)",
        paragraphs: [
          "The easiest and cleanest method is installing Universal Installer directly from the Google Play Store on your watch.",
          "1. Open the Google Play Store app directly on your Wear OS smartwatch.",
          "2. Search for 'Universal Installer' or open the listing from your paired phone.",
          "3. Tap 'Install on watch'. Google Play will deliver the optimized Wear Compose build directly to your smartwatch.",
        ],
        tips: [
          "You can also visit the Google Play Store in a web browser on your phone or PC, select your smartwatch under 'Install on more devices', and send the app automatically.",
        ],
      },
      {
        id: "method-2-wireless-sideloading",
        title: "Method 2: Sideloading Standalone APKs via Wi-Fi & Wireless ADB",
        paragraphs: [
          "If you have custom APKs or sideloaded watch faces and companion utilities that aren't on Google Play, you can push them wirelessly over your local Wi-Fi network:",
          "1. On your watch, navigate to Settings → System → About → Versions and tap 'Build number' 7 times to enable Developer Options.",
          "2. Go back to Settings → Developer Options, and enable both 'ADB debugging' and 'Wireless debugging'.",
          "3. Connect your watch and phone to the same Wi-Fi network. Open Universal Installer on your phone and use the LAN Sync & Share tool to broadcast and transfer the APK file to the watch.",
          "4. Once received on the watch, Universal Installer handles the package staging and silent installation seamlessly.",
        ],
        tips: [
          "Make sure both the watch and phone are connected to the same 2.4GHz or 5GHz Wi-Fi network for reliable pairing.",
        ],
      },
      {
        id: "tips-for-smartwatch-apps",
        title: "Best Practices for Wear OS Sideloading",
        paragraphs: [
          "Not all phone apps work well on a 1.4-inch round screen. Look for apps specifically tagged as Wear OS compatible, or lightweight utilities with simple button layouts.",
          "Always verify app permissions before installing. Smartwatches have smaller batteries, so apps with heavy background services will drain your battery faster.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do I need to root my Galaxy Watch or Pixel Watch to install APKs?",
        a: "No, rooting is not required. Universal Installer on Wear OS works with standard user permissions, and standalone package staging works via standard Android APIs and Wireless Debugging.",
      },
      {
        q: "Can I install Split APKs (.apks / .xapk) on Wear OS?",
        a: "Yes. Universal Installer automatically unpacks and parses split bundles, extracting the watch-compatible architecture (armeabi-v7a or arm64-v8a) and base resources before installing.",
      },
    ],
    related: ["how-to-sideload-apk-on-android-tv", "how-to-install-xapk-apks-apkm"],
  },
  {
    slug: "how-to-sideload-apk-on-android-tv",
    title: "How to Sideload APKs on Android TV & Google TV Wirelessly (No USB Needed)",
    description:
      "Learn how to easily send and install APKs, APKS, and XAPK packages to your Android TV or Google TV using Universal Installer's LAN Sync and D-Pad interface.",
    category: "Android TV",
    readTime: "5 min read",
    publishedAt: "2026-03-02",
    updatedAt: "2026-09-06",
    keywords: [
      "sideload apk on android tv",
      "send apk from phone to tv",
      "install apk google tv",
      "android tv split apk installer",
      "sideload xapk android tv",
      "install apk without usb android tv",
    ],
    summary:
      "Installing third-party APKs on Android TV traditionally required USB flash drives or fighting clumsy browser downloaders with a TV remote. Here is how to sideload any package wirelessly in seconds.",
    sections: [
      {
        id: "why-tv-installers-struggle",
        title: "Why Standard Android Installers Fail on TVs",
        paragraphs: [
          "Most Android installers are designed for vertical touchscreens. When opened on an Android TV or Google TV (like Chromecast with Google TV, Sony Bravia, Xiaomi Mi Box, or Nvidia Shield), the interface fails to support remote D-pad focus, and buttons often fall off the screen.",
          "Universal Installer provides a dedicated 10-foot TV UI designed specifically for directional remote control with high-contrast selection borders and smooth D-pad scrolling.",
        ],
      },
      {
        id: "step-by-step-wireless-transfer",
        title: "Step-by-Step: Sending APKs from Phone to TV over Wi-Fi",
        paragraphs: [
          "Universal Installer includes a built-in LAN Sync & Share server that lets you push APKs directly from your phone to your TV over your local network:",
          "1. Install the Universal Installer Android TV APK on your TV (available from GitHub Releases).",
          "2. Open Universal Installer on your TV and select 'Receive via LAN'. A 4-digit pairing code and local IP will appear on your TV screen.",
          "3. Open Universal Installer on your phone, pick any .apk, .apks, or .xapk file, and tap 'Send to TV'.",
          "4. Select your TV from the detected device list or type the pairing code. The file will transfer over high-speed local Wi-Fi and the TV will immediately prompt for one-tap installation.",
        ],
        tips: [
          "LAN transfer uses your local router bandwidth, so multi-gigabyte games with OBB data transfer in seconds without consuming internet data.",
        ],
      },
      {
        id: "managing-tv-permissions",
        title: "Enabling Unknown Sources on Android TV & Google TV",
        paragraphs: [
          "On first install, Android TV requires you to grant permission to install unknown apps:",
          "1. Open TV Settings → Apps → Security & Restrictions (or Special app access).",
          "2. Select 'Install unknown apps'.",
          "3. Toggle Universal Installer to 'Allowed'.",
        ],
      },
    ],
    faqs: [
      {
        q: "Does Universal Installer support split APKs on Android TV?",
        a: "Yes! Bundled split APKs (.apks, .xapk, and .apkm) are fully supported on Android TV. Universal Installer detects your TV's display density and CPU architecture (such as arm64 or armeabi-v7a) to install the correct split configuration.",
      },
      {
        q: "Can I install apps silently on Android TV with root or Shizuku?",
        a: "Yes. If your TV box has root privileges or Shizuku running via wireless ADB, Universal Installer installs packages in the background without interrupting your viewing.",
      },
    ],
    related: ["how-to-install-xapk-apks-apkm", "silent-install-android-shizuku-guide"],
  },
  {
    slug: "how-to-install-xapk-apks-apkm",
    title: "The Complete Guide to Split APKs: How to Install .APKS, .XAPK, and .APKM on Android",
    description:
      "Understand Android split APK formats (.apks, .xapk, .apkm) and learn how to install them smoothly with OBB data extraction on any Android device.",
    category: "Formats & Guides",
    readTime: "7 min read",
    publishedAt: "2026-03-03",
    updatedAt: "2026-09-06",
    keywords: [
      "how to install xapk",
      "install apks android",
      "open apkm file",
      "split apk installer guide",
      "xapk with obb installer",
      "what is split apk",
      "android app bundle installer",
    ],
    summary:
      "Modern Android apps downloaded from third-party repositories come in split formats like .apks, .xapk, and .apkm. Here is why Android's default package manager rejects them and how Universal Installer installs them effortlessly.",
    sections: [
      {
        id: "what-are-split-apks",
        title: "Why Did Android Move to Split APKs & App Bundles?",
        paragraphs: [
          "In the past, every Android app was packaged into a single monolithic `.apk` file containing all screen densities, language packs, and CPU architectures (ARMv7, ARM64, x86). This caused app sizes to balloon unnecessarily.",
          "Google introduced Android App Bundles (AAB), which slice an application into smaller modular splits: a base APK containing the main code, and configuration splits for specific architectures, languages, and DPIs.",
          "When you export these splits outside the Google Play Store, third-party stores package them into container archives: `.apks` (standard ZIP of splits), `.xapk` (APKPure format with OBB files), and `.apkm` (APKMirror format).",
        ],
      },
      {
        id: "why-system-fails",
        title: "Why Android's Built-in Installer Shows 'App Not Installed'",
        paragraphs: [
          "The default Android package installer (`com.google.android.packageinstaller`) only accepts a single standard `.apk` file at a time. When you tap an `.apks` or `.xapk` file in a file manager, the system treats it as an invalid file or zip archive.",
          "To install split packages, an installer must create an active `PackageInstaller.Session`, stream all selected split APKs into the session simultaneously, and commit the transaction atomically.",
        ],
      },
      {
        id: "how-to-install-with-universal-installer",
        title: "How to Install Any Split Format with Universal Installer",
        paragraphs: [
          "Universal Installer natively understands all container formats without requiring extra converter tools:",
          "1. Download your `.apk`, `.apks`, `.xapk`, or `.apkm` file.",
          "2. Tap the file in your favorite file manager or open Universal Installer and browse for the file.",
          "3. Universal Installer inspects the archive in real-time, displays package metadata, auto-selects the optimal splits for your device, and automatically extracts game OBB files into `/Android/obb/<package_name>/`.",
          "4. Tap 'Install'. The package is verified and installed cleanly in one step.",
        ],
        tips: [
          "You can also select multiple individual `.apk` files at once using Universal Installer's manual split merge feature.",
        ],
      },
    ],
    faqs: [
      {
        q: "What happens to the OBB data inside .xapk files?",
        a: "Universal Installer automatically extracts `.obb` files directly into your device's Android/obb directory using Storage Access Framework (SAF) or Shizuku/Root privileges, meaning you don't have to manually unzip or move folders around.",
      },
      {
        q: "Can I inspect what splits are inside before installing?",
        a: "Yes! On the Universal Installer confirmation sheet, tap 'Details' to view the breakdown of every split (base, architecture, config, language). You can also test your files beforehand using our free online APK Analyzer tool.",
      },
    ],
    related: ["how-to-scan-apk-virustotal-guide", "universal-installer-vs-sai"],
  },
  {
    slug: "silent-install-android-shizuku-guide",
    title: "How to Enable Silent Installs on Android without Root (Using Shizuku & Dhizuku)",
    description:
      "Step-by-step tutorial on configuring Shizuku or Dhizuku to unlock silent, one-tap app installations, source spoofing, and downgrade permissions on Android.",
    category: "Shizuku & Root",
    readTime: "8 min read",
    publishedAt: "2026-03-04",
    updatedAt: "2026-09-06",
    keywords: [
      "silent install android no root",
      "shizuku apk installer",
      "shizuku wireless debugging tutorial",
      "dhizuku device owner install",
      "bypass install prompt android",
      "installer source spoofing shizuku",
    ],
    summary:
      "Tired of clicking confirmation prompts every time you install or update an application? Here is how to configure Shizuku with Wireless Debugging to unlock seamless background installations without rooting your phone.",
    sections: [
      {
        id: "what-is-shizuku",
        title: "What is Shizuku and How Does It Work?",
        paragraphs: [
          "On Android, system-level package installation APIs (`android.permission.INSTALL_PACKAGES`) are restricted to system apps, device owners, or the ADB shell.",
          "Shizuku is an open-source bridge that starts a background process running under the ADB shell identity. Apps granted Shizuku access can invoke privileged system APIs directly without needing root access or a tethered computer connection.",
        ],
      },
      {
        id: "setting-up-shizuku",
        title: "How to Set Up Shizuku via Wireless Debugging (Android 11+)",
        paragraphs: [
          "1. Install the Shizuku app from Google Play or GitHub.",
          "2. Ensure your phone is connected to Wi-Fi. Go to Settings → Developer Options and enable 'Wireless debugging'.",
          "3. Tap 'Wireless debugging' → 'Pair device with pairing code'.",
          "4. Open Shizuku, tap 'Pairing', enter the 6-digit code from the notification panel.",
          "5. Return to Shizuku and tap 'Start'. Shizuku will start its service running under ADB privileges.",
        ],
        tips: [
          "On Android 11 and above, Shizuku can be started completely on-device without needing a PC or USB cable.",
        ],
      },
      {
        id: "connecting-to-universal-installer",
        title: "Enabling Privileged Mode in Universal Installer",
        paragraphs: [
          "1. Open Universal Installer and open Settings.",
          "2. Under 'Install Mode', select 'Shizuku'.",
          "3. Grant Universal Installer permission when the Shizuku authorization dialog appears.",
          "4. You can now enable advanced features like 'Silent Install', 'Allow Downgrade', and 'Installer Source Spoofing' (e.g. spoofing Google Play Store as the installer source).",
        ],
      },
    ],
    faqs: [
      {
        q: "Does Shizuku survive phone reboots?",
        a: "On non-rooted devices, Android stops ADB processes on reboot. You will need to tap 'Start' in Shizuku again once reconnected to Wi-Fi. If your device is rooted, Shizuku can start automatically at boot.",
      },
      {
        q: "Is Dhizuku supported as an alternative?",
        a: "Yes! Universal Installer fully supports Dhizuku. Dhizuku uses Device Owner privileges, allowing permanent silent installs even without Wireless Debugging or root.",
      },
    ],
    related: ["how-to-bypass-android-target-sdk-block", "how-to-install-xapk-apks-apkm"],
  },
  {
    slug: "how-to-bypass-android-target-sdk-block",
    title: "How to Bypass Android 14 & 15 Low Target SDK Installation Block (INSTALL_FAILED_OLDER_SDK)",
    description:
      "Fix the 'INSTALL_FAILED_OLDER_SDK' error on Android 14 and Android 15. Learn how Universal Installer bypasses minimum target SDK restrictions safely.",
    category: "Formats & Guides",
    readTime: "5 min read",
    publishedAt: "2026-03-05",
    updatedAt: "2026-09-06",
    keywords: [
      "install old app android 14",
      "bypass target sdk block android 15",
      "install_failed_older_sdk fix",
      "app not compatible with your device android 14",
      "install old 32-bit apps android",
    ],
    summary:
      "Android 14 and 15 strictly block apps built for older Android versions (targetSdk < 23 / 24). Here is why this restriction exists and how Universal Installer bypasses it so you can keep using your favorite legacy games and tools.",
    sections: [
      {
        id: "why-google-blocks-older-sdks",
        title: "Why Android 14 and 15 Block Legacy Apps",
        paragraphs: [
          "Starting in Android 14, Google introduced a hard platform check: applications targeting Android versions older than Android 6.0 Marshmallow (targetSdkVersion < 23) cannot be installed by standard package managers.",
          "In Android 15, this minimum threshold was raised to targetSdkVersion 24 (Android 7.0 Nougat). When attempting to install older APKs via the stock installer, you receive the error `INSTALL_FAILED_OLDER_SDK` or 'App not installed as app isn't compatible with your phone'.",
          "Google implemented this restriction to prevent malware from targeting old SDKs to evade runtime permission prompts and modern security sandboxes.",
        ],
      },
      {
        id: "how-to-bypass-safely",
        title: "How to Bypass the Check Using Universal Installer",
        paragraphs: [
          "If you have legitimate legacy apps or retro games that you trust, Universal Installer provides a dedicated bypass flag:",
          "1. Configure Universal Installer with Shizuku or Root mode.",
          "2. Open Settings or the Install Details sheet for the legacy APK.",
          "3. Enable the 'Bypass low target SDK block' toggle (`--bypass-low-target-sdk-block`).",
          "4. Tap 'Install'. Universal Installer instructs the Android package manager session to waive the minimum SDK check and complete the installation successfully.",
        ],
        tips: [
          "Before installing very old APKs, consider scanning them with Universal Installer's VirusTotal integration to verify their integrity.",
        ],
      },
    ],
    faqs: [
      {
        q: "Will bypassing the target SDK check damage my phone?",
        a: "No. The app will simply run under Android's legacy compatibility layer. However, very old apps that require removed system libraries (like obsolete Apache HTTP clients or 32-bit only binaries on 64-bit-only CPUs like Tensor G3/G4) may crash upon launch.",
      },
      {
        q: "Can I do this without root?",
        a: "Yes! With Shizuku active via Wireless Debugging, Universal Installer passes the privileged bypass flag directly through ADB session parameters without root access.",
      },
    ],
    related: ["silent-install-android-shizuku-guide", "how-to-scan-apk-virustotal-guide"],
  },
  {
    slug: "how-to-scan-apk-virustotal-guide",
    title: "How to Scan Android APKs for Malware with VirusTotal Before Installing",
    description:
      "Protect your device from malicious APKs. Learn how to connect your free VirusTotal API key to Universal Installer for instant multi-engine malware scans.",
    category: "Security",
    readTime: "4 min read",
    publishedAt: "2026-03-06",
    updatedAt: "2026-09-06",
    keywords: [
      "scan apk for malware online",
      "check apk virus before install",
      "virustotal apk scanner android",
      "safe apk installer",
      "detect trojan in apk",
    ],
    summary:
      "Sideloading APKs from third-party websites comes with security risks. Here is how to use Universal Installer's built-in VirusTotal integration to inspect hashes and scan packages against 70+ antivirus engines before hitting install.",
    sections: [
      {
        id: "why-pre-install-scanning-matters",
        title: "The Importance of Pre-Install Verification",
        paragraphs: [
          "When you install an APK from outside the Google Play Store, Google Play Protect may only perform basic checks after the package is already staged.",
          "Repackaged or modded APKs can contain trojans, adware, or spyware hidden alongside legitimate application code.",
          "Universal Installer integrates directly with VirusTotal — the world's leading threat intelligence service analyzing files against 70+ top antivirus scanners including Kaspersky, Bitdefender, Microsoft Defender, and Symantec.",
        ],
      },
      {
        id: "setting-up-virustotal-api",
        title: "How to Set Up VirusTotal API Key in Universal Installer",
        paragraphs: [
          "1. Visit VirusTotal.com and create a free account.",
          "2. Open your VirusTotal user profile and copy your personal API key (free tier includes 500 lookups per day).",
          "3. Open Universal Installer → Settings → Security & VirusTotal.",
          "4. Paste your API key and enable 'Check with VirusTotal'.",
        ],
        tips: [
          "Universal Installer calculates the SHA-256 hash of the APK locally and queries VirusTotal's database first, ensuring fast lookups without wasting mobile data.",
        ],
      },
      {
        id: "understanding-scan-results",
        title: "Interpreting Scan Results and Strict Mode",
        paragraphs: [
          "When inspecting an APK, tap 'Check VirusTotal'. Universal Installer displays the detection ratio (e.g. 0/72 clean, or 4/72 flagged).",
          "You can enable 'Strict Mode' in Settings: if an APK is flagged by known engines or has never been analyzed before, Universal Installer will prompt you with a safety warning before proceeding.",
        ],
      },
    ],
    faqs: [
      {
        q: "Does Universal Installer upload my personal files to VirusTotal?",
        a: "By default, Universal Installer only sends the SHA-256 checksum hash to look up existing scan records. If a file has never been seen before, it will ask for your explicit confirmation before uploading the APK for analysis.",
      },
      {
        q: "Is the VirusTotal integration free to use?",
        a: "Yes! VirusTotal provides free public API keys for personal use with generous daily quotas that easily cover normal app installs.",
      },
    ],
    related: ["how-to-install-xapk-apks-apkm", "how-to-bypass-android-target-sdk-block"],
  },
  {
    slug: "universal-installer-vs-sai",
    title: "Universal Installer vs SAI (Split APKs Installer): The Best Modern Alternative in 2026",
    description:
      "A feature-by-feature comparison between Universal Installer and Split APKs Installer (SAI). Discover why power users are switching to Universal Installer.",
    category: "Comparisons",
    readTime: "6 min read",
    publishedAt: "2026-03-07",
    updatedAt: "2026-09-06",
    keywords: [
      "best split apk installer",
      "SAI alternative android",
      "split apks installer alternative",
      "modern android package manager",
      "universal installer vs split apks installer",
    ],
    summary:
      "Split APKs Installer (SAI) pioneered split APK installation on Android, but has seen little active modernization in recent years. Here is how Universal Installer builds upon the foundation with Material 3 Expressive UI, Wear OS, Android TV, and installer profiles.",
    sections: [
      {
        id: "evolution-of-sideloading",
        title: "The Evolution of Android Package Managers",
        paragraphs: [
          "For years, SAI was the go-to utility for installing `.apks` split archives. However, modern Android versions (Android 14, 15, and 16) introduced new platform constraints, 64-bit-only CPUs, new container formats like `.xapk` and `.apkm`, and expanded ecosystems across smartwatches and TV sets.",
          "Universal Installer was built from the ground up using Kotlin Multiplatform and modern Jetpack Compose, delivering fluid spring physics, full multi-device support, and advanced installer profiles.",
        ],
      },
      {
        id: "head-to-head-comparison",
        title: "Feature Comparison: Universal Installer vs SAI",
        paragraphs: [
          "• **User Interface**: Universal Installer features a bouncy, fluid Material 3 Expressive UI with full dark mode and dynamic colors, compared to SAI's legacy Material 2 design.",
          "• **Multi-Device Support**: Universal Installer runs natively on Android Phones, Wear OS Smartwatches (Google Play), and Android TV / Google TV with full D-Pad navigation. SAI is phone-only.",
          "• **Wireless LAN Sharing**: Universal Installer allows direct Wi-Fi APK transfer between devices with built-in pairing. SAI requires manual file transfers.",
          "• **Installer Profiles**: Universal Installer lets you save custom installer presets per app (e.g. auto-spoofing, allow downgrade, target user profile).",
          "• **Security**: Universal Installer integrates directly with VirusTotal for pre-install malware scanning.",
        ],
      },
      {
        id: "verdict",
        title: "Conclusion: Why Universal Installer is the Future",
        paragraphs: [
          "Universal Installer is 100% free and open-source under GPL-3.0. Whether you are installing split APKs on your phone, sideloading games to your Android TV, or managing apps on your Wear OS smartwatch, Universal Installer is the modern standard for Android package management.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is Universal Installer completely open-source like SAI?",
        a: "Yes! Universal Installer is fully open-source on GitHub under the GPL-3.0 license with no ads, no trackers, and verifiable source code.",
      },
      {
        q: "Can Universal Installer replace SAI completely?",
        a: "Yes, Universal Installer handles every file format SAI does (.apk, .apks, split files) plus .xapk (with auto OBB extraction) and .apkm, while offering better Android 14/15/16 compatibility.",
      },
    ],
    related: ["how-to-install-xapk-apks-apkm", "silent-install-android-shizuku-guide"],
  },
];

export function articleBySlug(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}
