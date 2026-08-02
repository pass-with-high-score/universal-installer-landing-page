/**
 * One page per Android install failure, because people paste the message straight into a search
 * box. Every entry here comes from a real report — most of them from issues opened against
 * Universal Installer — rather than from a list of error constants.
 */

export type InstallError = {
  slug: string;
  /** What the user sees. Used as the H1, so it should read exactly as it appears on screen. */
  title: string;
  /** The platform constant, when there is one. Shown as a code chip and indexed. */
  code?: string;
  /** Other wordings of the same failure. OEMs reword these constantly. */
  aliases: string[];
  summary: string;
  cause: string;
  fixes: { title: string; body: string }[];
  /** Slugs of related errors. */
  related: string[];
};

export const ERRORS: InstallError[] = [
  {
    slug: "install-failed-update-incompatible",
    title: "Install failed: the existing app is signed with a different certificate",
    code: "INSTALL_FAILED_UPDATE_INCOMPATIBLE",
    aliases: [
      "signatures do not match previously installed version",
      "INSTALL_FAILED_SHARED_USER_INCOMPATIBLE",
      "App not installed as package conflicts with an existing package",
    ],
    summary:
      "The app you are installing was signed with a different key than the copy already on the device. Android will not treat it as an update.",
    cause:
      "Every Android app is signed by its developer. An update is only accepted if it carries the same signing identity as the installed version. A build from a different source — a different mirror, a modded build, your own debug build over a Play Store install — has a different key, so the system refuses it rather than letting one developer overwrite another's app.",
    fixes: [
      {
        title: "Uninstall the existing app first",
        body: "This is the only real fix. The app's data goes with it — there is no way to keep it, because keeping data across a signature change is exactly what the check exists to prevent.",
      },
      {
        title: "Check where the file came from",
        body: "If you expected an update from the same developer and the signature differs, that is worth pausing over. A repackaged APK is signed by whoever repackaged it. Scan it before installing.",
      },
      {
        title: "No installer option can bypass this",
        body: "Replace existing, Allow downgrade and root all leave the check in place. Anything claiming otherwise is uninstalling for you.",
      },
    ],
    related: ["install-failed-version-downgrade", "install-failed-already-exists"],
  },
  {
    slug: "install-failed-version-downgrade",
    title: "Install failed: cannot downgrade to an older version",
    code: "INSTALL_FAILED_VERSION_DOWNGRADE",
    aliases: [
      "Can't install older version of app",
      "downgrade not allowed",
      "INSTALL_FAILED_UPDATE_INCOMPATIBLE downgrade",
    ],
    summary:
      "The version you are installing is older than the one already installed, and Android refuses downgrades unless the installer explicitly asks for one.",
    cause:
      "Android compares versionCode. If the incoming package has a lower number than the installed app, the install is rejected by default. The rule is separate from the one that allows replacing an app — which is why enabling “Replace existing” does not help here, a point that trips up almost everyone who hits this.",
    fixes: [
      {
        title: "Turn on Allow downgrade",
        body: "A privileged installer can pass the downgrade flag. In Universal Installer this is Allow downgrade in the Shizuku or Root options, and it needs one of those modes — the default system installer has no equivalent.",
      },
      {
        title: "Uninstall the newer version first",
        body: "Works in any mode and needs no special setup, but the app's data is lost.",
      },
      {
        title: "Expect data problems either way",
        body: "An app that has already migrated its database to a newer schema may not start on an older build, even when the install itself succeeds.",
      },
    ],
    related: ["install-failed-update-incompatible", "install-failed-already-exists"],
  },
  {
    slug: "install-failed-already-exists",
    title: "Install failed: the package is already installed",
    code: "INSTALL_FAILED_ALREADY_EXISTS",
    aliases: ["A conflicting version is already installed", "package conflict"],
    summary:
      "An app with the same package name is on the device and the install was not told it is allowed to replace it.",
    cause:
      "An ordinary update carries a replace flag. Without it, the system treats the install as an attempt to create a package that already exists and rejects it.",
    fixes: [
      {
        title: "Turn on Replace existing",
        body: "It is on by default in Universal Installer; if you turned it off, this is the error you get back. This is the one case where Replace existing is genuinely the answer.",
      },
      {
        title: "If it still fails, it is not this error",
        body: "A downgrade or a signature mismatch can surface with similar wording. Check the version number and the source of the file — the two pages linked below cover those.",
      },
    ],
    related: ["install-failed-version-downgrade", "install-failed-update-incompatible"],
  },
  {
    slug: "there-was-a-problem-parsing-the-package",
    title: "There was a problem parsing the package",
    aliases: ["Parse error", "problem parsing package Android"],
    summary:
      "Android could not read the file as a valid package. Usually the file is incomplete, or it is not the kind of package the system installer can open on its own.",
    cause:
      "The message covers several unrelated situations: a download that stopped early, a split bundle handed to an installer that only understands single APKs, an app that needs a newer Android version than the device runs, or a genuinely corrupt archive.",
    fixes: [
      {
        title: "Download it again and compare the size",
        body: "A truncated download is the most common cause by far. A file that is a few KB short parses as garbage.",
      },
      {
        title: "Check whether it is a split bundle",
        body: "APKS, XAPK, APKM and some ZIP files contain several APKs. The built-in installer cannot open them. An installer that understands bundles can.",
      },
      {
        title: "Check the minimum Android version",
        body: "An app built for a newer Android than your device will not parse. This is a hard limit, not a setting.",
      },
    ],
    related: ["install-failed-no-matching-abis", "install-failed-invalid-apk"],
  },
  {
    slug: "miui-optimization-blocks-install",
    title: "Installs keep failing on Xiaomi, Redmi or POCO",
    aliases: [
      "MIUI optimization install failed",
      "HyperOS cannot install apps",
      "Xiaomi install blocked",
    ],
    summary:
      "MIUI and HyperOS ship a setting called MIUI optimization that blocks third-party installs, usually without explaining why.",
    cause:
      "MIUI optimization changes how the system handles package installation, among many other things. When it interferes, the failure surfaces as a generic error with no mention of the setting, so there is nothing in the message to search for.",
    fixes: [
      {
        title: "Turn off MIUI optimization, install, turn it back on",
        body: "It lives in Settings → Additional settings → Developer options. You need Developer options unlocked first (tap the MIUI version number several times).",
      },
      {
        title: "Expect the interface to look wrong while it is off",
        body: "With the setting disabled, system theming renders differently and parts of the UI can look broken. Restarting the phone restores it. This is a side effect of the workaround, not damage.",
      },
      {
        title: "Check Install via USB and unknown sources too",
        body: "MIUI has additional per-source install permissions that other Android versions do not, and they are easy to miss.",
      },
    ],
    related: ["there-was-a-problem-parsing-the-package", "app-not-installed"],
  },
  {
    slug: "install-failed-no-matching-abis",
    title: "Install failed: no matching CPU architecture",
    code: "INSTALL_FAILED_NO_MATCHING_ABIS",
    aliases: ["INSTALL_FAILED_NO_MATCHING_ABIS", "app not compatible with your device"],
    summary:
      "The package contains native code, but not for your device's CPU architecture.",
    cause:
      "Apps with native libraries ship separate builds per ABI — arm64-v8a, armeabi-v7a, x86_64 and so on. If you install a split that only carries one of those and it is not the one your device uses, there is nothing to run.",
    fixes: [
      {
        title: "Install the full bundle rather than one split",
        body: "APKS and XAPK bundles include every architecture. Let the installer pick the right one instead of downloading a single-ABI APK by hand.",
      },
      {
        title: "Check what your device uses",
        body: "Almost every phone from the last several years is arm64-v8a. Emulators and a few tablets are x86_64. Downloading the arm64 variant is the right guess on modern hardware.",
      },
    ],
    related: ["there-was-a-problem-parsing-the-package", "install-failed-invalid-apk"],
  },
  {
    slug: "install-failed-insufficient-storage",
    title: "Install failed: not enough storage",
    code: "INSTALL_FAILED_INSUFFICIENT_STORAGE",
    aliases: ["not enough space to install", "insufficient storage available"],
    summary:
      "The device does not have room for the app — often even when the free-space figure looks like it should be enough.",
    cause:
      "An install needs space for the package, for the extracted native libraries, and for the ahead-of-time compiled code the system generates. That can be several times the size of the APK itself. Split bundles also need somewhere to stage every part before merging.",
    fixes: [
      {
        title: "Free noticeably more than the app's size",
        body: "As a rule of thumb, plan for two to three times the download. A 500 MB game can need well over a gigabyte during install.",
      },
      {
        title: "Clear cached data first",
        body: "Cached files across apps are usually the largest recoverable chunk and cost nothing to lose.",
      },
    ],
    related: ["app-not-installed"],
  },
  {
    slug: "install-failed-deprecated-sdk-version",
    title: "Install failed: the app targets an old Android version",
    code: "INSTALL_FAILED_DEPRECATED_SDK_VERSION",
    aliases: [
      "app targets an older version of Android",
      "targetSdkVersion too low",
      "low target SDK block",
    ],
    summary:
      "Android 14 and later refuse to install apps that target very old API levels.",
    cause:
      "Google added the block to keep apps from opting out of modern security behaviour by declaring an ancient targetSdkVersion. It affects genuinely old apps and abandoned software, not just malicious ones.",
    fixes: [
      {
        title: "Use an installer that can bypass the block",
        body: "A privileged install can pass a flag that skips the check. In Universal Installer this is Bypass low target SDK block, and it needs Shizuku or root; the option only exists on Android 14 and later.",
      },
      {
        title: "Understand what you are turning off",
        body: "The app really does miss out on newer platform protections. That may be fine for an offline tool and a bad idea for anything handling your data.",
      },
    ],
    related: ["app-not-installed"],
  },
  {
    slug: "install-failed-invalid-apk",
    title: "Install failed: the package is invalid",
    code: "INSTALL_FAILED_INVALID_APK",
    aliases: ["INSTALL_PARSE_FAILED_NO_CERTIFICATES", "apk not signed", "missing split"],
    summary:
      "The archive is malformed, unsigned, or a split bundle is missing a part it needs.",
    cause:
      "Common causes are an APK that was modified after signing, an unsigned build, or a split set where the base APK is missing or the splits come from different builds of the app.",
    fixes: [
      {
        title: "Get the file from the original source",
        body: "Re-packaged and re-hosted APKs are frequently broken in exactly this way.",
      },
      {
        title: "Keep split sets together",
        body: "Every split must come from the same build as its base. Mixing a config split from one version with a base from another produces this error.",
      },
    ],
    related: ["there-was-a-problem-parsing-the-package", "install-failed-no-matching-abis"],
  },
  {
    slug: "app-not-installed",
    title: "App not installed",
    aliases: ["App not installed.", "Application not installed", "install failed no message"],
    summary:
      "Android's catch-all failure message. It has no single cause — the useful information is in what the app was and what changed.",
    cause:
      "The system shows this when an install fails and the installer has nothing more specific to report. Behind it is usually one of the other errors on this page: a signature mismatch, a downgrade, missing storage, or an OEM restriction.",
    fixes: [
      {
        title: "Was there already a copy installed?",
        body: "If yes, it is most likely a signature mismatch or a downgrade. Those two account for most of these.",
      },
      {
        title: "Is the device a Xiaomi, Redmi or POCO?",
        body: "MIUI optimization blocks installs and produces exactly this message with nothing else to go on.",
      },
      {
        title: "Use an installer that reports the real reason",
        body: "The underlying error code exists; the system dialog just does not show it. An installer that surfaces the actual failure turns this into something you can act on.",
      },
    ],
    related: [
      "install-failed-update-incompatible",
      "miui-optimization-blocks-install",
      "install-failed-insufficient-storage",
    ],
  },
];

export function errorBySlug(slug: string): InstallError | undefined {
  return ERRORS.find((e) => e.slug === slug);
}
