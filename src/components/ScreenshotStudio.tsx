"use client";

import { useState, useRef } from "react";
import {
  Smartphone,
  Tv,
  Watch,
  Sparkles,
  Upload,
  RotateCcw,
  Check,
  ShieldCheck,
  Zap,
  Layers,
  Wifi,
  Package,
  FolderDown,
  ChevronRight,
  Maximize2,
  Sliders,
  Palette,
  Camera,
} from "lucide-react";

type DeviceType = "mobile" | "tv" | "wearos";
type TemplateStyle = "gradient" | "dark_glow" | "minimal";

interface PresetScene {
  id: string;
  device: DeviceType;
  title: string;
  subtitle: string;
  badge: string;
  features: string[];
}

const PRESET_SCENES: Record<DeviceType, PresetScene[]> = {
  mobile: [
    {
      id: "m1",
      device: "mobile",
      title: "The Ultimate APK & Split Installer",
      subtitle: "Effortlessly install .apk, .apks, .xapk and .apkm with OBB support.",
      badge: "Expressive UI",
      features: ["Split APK Bundles", "Auto OBB Extraction", "Material 3 Spring UI"],
    },
    {
      id: "m2",
      device: "mobile",
      title: "Silent Installs with Shizuku & Root",
      subtitle: "One-tap background updates, source spoofing, and downgrade permissions.",
      badge: "Privileged Power",
      features: ["No Root Required (Shizuku)", "Bypass SDK Restrictions", "Auto-Grant Permissions"],
    },
    {
      id: "m3",
      device: "mobile",
      title: "Pre-Install VirusTotal Malware Scan",
      subtitle: "Scan packages against 70+ antivirus engines before installing.",
      badge: "Zero Malware Risk",
      features: ["70+ Antivirus Scanners", "SHA-256 Hash Lookup", "Strict Safety Mode"],
    },
  ],
  tv: [
    {
      id: "tv1",
      device: "tv",
      title: "Optimized for Android TV & Google TV",
      subtitle: "Effortless D-pad remote navigation with 10-foot widescreen UI.",
      badge: "D-Pad Ready",
      features: ["Full Remote Navigation", "No Mouse Required", "High Contrast Focus"],
    },
    {
      id: "tv2",
      device: "tv",
      title: "Send APKs from Phone to TV over Wi-Fi",
      subtitle: "Instant local LAN transfer without USB sticks or slow TV browsers.",
      badge: "LAN Sync & Share",
      features: ["High-speed Wi-Fi Transfer", "QR Code Quick Pairing", "Auto Install Trigger"],
    },
  ],
  wearos: [
    {
      id: "w1",
      device: "wearos",
      title: "Wear OS Smartwatch Package Manager",
      subtitle: "Manage and sideload watch apps with circular Wear Compose UI.",
      badge: "Wear OS 3 / 4 / 5",
      features: ["Google Play Direct Install", "Rotary Bezel Input", "Battery Optimized"],
    },
    {
      id: "w2",
      device: "wearos",
      title: "Wireless Sideloading on your Wrist",
      subtitle: "Push APKs from your phone to your Galaxy Watch or Pixel Watch.",
      badge: "Wireless ADB",
      features: ["Wi-Fi Transfer", "Standalone Package Staging", "No PC Needed"],
    },
  ],
};

export default function ScreenshotStudio() {
  const [device, setDevice] = useState<DeviceType>("mobile");
  const [style, setStyle] = useState<TemplateStyle>("gradient");
  const [activeSceneIdx, setActiveSceneIdx] = useState(0);

  // Custom text states
  const currentPresets = PRESET_SCENES[device];
  const activeScene = currentPresets[activeSceneIdx] || currentPresets[0];

  const [customTitle, setCustomTitle] = useState(activeScene.title);
  const [customSubtitle, setCustomSubtitle] = useState(activeScene.subtitle);
  const [customBadge, setCustomBadge] = useState(activeScene.badge);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [fullscreenMode, setFullscreenMode] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDeviceChange = (newDevice: DeviceType) => {
    setDevice(newDevice);
    setActiveSceneIdx(0);
    const firstScene = PRESET_SCENES[newDevice][0];
    setCustomTitle(firstScene.title);
    setCustomSubtitle(firstScene.subtitle);
    setCustomBadge(firstScene.badge);
  };

  const handleSceneSelect = (idx: number) => {
    setActiveSceneIdx(idx);
    const scene = currentPresets[idx];
    if (scene) {
      setCustomTitle(scene.title);
      setCustomSubtitle(scene.subtitle);
      setCustomBadge(scene.badge);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setUploadedImage(url);
    }
  };

  const handleResetImage = () => {
    setUploadedImage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="space-y-8">
      {/* Control Panel */}
      {!fullscreenMode && (
        <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-900">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-black/5 pb-5 dark:border-white/10">
            <div className="flex items-center gap-2">
              <Sliders size={18} className="text-[color:var(--brand)]" />
              <h2 className="text-base font-bold text-zinc-900 dark:text-white">
                Screenshot Studio Settings
              </h2>
            </div>

            <button
              onClick={() => setFullscreenMode(true)}
              className="inline-flex items-center gap-1.5 rounded-full bg-zinc-900 px-4 py-2 text-xs font-semibold text-white transition-all hover:bg-black dark:bg-white dark:text-zinc-900"
            >
              <Maximize2 size={13} />
              Presentation / Capture View
            </button>
          </div>

          <div className="mt-5 grid gap-6 md:grid-cols-3">
            {/* 1. Device Picker */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                1. Target Device
              </label>
              <div className="mt-2.5 flex gap-2">
                <button
                  onClick={() => handleDeviceChange("mobile")}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 px-3 text-xs font-semibold transition-all ${
                    device === "mobile"
                      ? "bg-[color:var(--brand)] text-white shadow-sm"
                      : "border border-black/10 bg-zinc-50 text-zinc-700 hover:bg-zinc-100 dark:border-white/10 dark:bg-zinc-800 dark:text-zinc-300"
                  }`}
                >
                  <Smartphone size={15} />
                  Phone (9:16)
                </button>
                <button
                  onClick={() => handleDeviceChange("tv")}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 px-3 text-xs font-semibold transition-all ${
                    device === "tv"
                      ? "bg-[color:var(--brand)] text-white shadow-sm"
                      : "border border-black/10 bg-zinc-50 text-zinc-700 hover:bg-zinc-100 dark:border-white/10 dark:bg-zinc-800 dark:text-zinc-300"
                  }`}
                >
                  <Tv size={15} />
                  Android TV (16:9)
                </button>
                <button
                  onClick={() => handleDeviceChange("wearos")}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 px-3 text-xs font-semibold transition-all ${
                    device === "wearos"
                      ? "bg-[color:var(--brand)] text-white shadow-sm"
                      : "border border-black/10 bg-zinc-50 text-zinc-700 hover:bg-zinc-100 dark:border-white/10 dark:bg-zinc-800 dark:text-zinc-300"
                  }`}
                >
                  <Watch size={15} />
                  Wear OS (1:1)
                </button>
              </div>
            </div>

            {/* 2. Style Preset */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                2. Visual Style
              </label>
              <div className="mt-2.5 flex gap-2">
                <button
                  onClick={() => setStyle("gradient")}
                  className={`flex flex-1 items-center justify-center gap-1.5 rounded-xl py-2.5 px-2 text-xs font-semibold transition-all ${
                    style === "gradient"
                      ? "border-2 border-[color:var(--brand)] bg-orange-50 text-orange-950 font-bold dark:bg-orange-950/40 dark:text-orange-200"
                      : "border border-black/10 bg-zinc-50 text-zinc-700 hover:bg-zinc-100 dark:border-white/10 dark:bg-zinc-800 dark:text-zinc-300"
                  }`}
                >
                  <Palette size={14} className="text-orange-600" />
                  Brand Gradient
                </button>
                <button
                  onClick={() => setStyle("dark_glow")}
                  className={`flex flex-1 items-center justify-center gap-1.5 rounded-xl py-2.5 px-2 text-xs font-semibold transition-all ${
                    style === "dark_glow"
                      ? "border-2 border-cyan-500 bg-zinc-950 text-cyan-400 font-bold shadow-sm"
                      : "border border-black/10 bg-zinc-50 text-zinc-700 hover:bg-zinc-100 dark:border-white/10 dark:bg-zinc-800 dark:text-zinc-300"
                  }`}
                >
                  <Sparkles size={14} className="text-cyan-400" />
                  Dark AMOLED
                </button>
                <button
                  onClick={() => setStyle("minimal")}
                  className={`flex flex-1 items-center justify-center gap-1.5 rounded-xl py-2.5 px-2 text-xs font-semibold transition-all ${
                    style === "minimal"
                      ? "border-2 border-zinc-900 bg-zinc-100 text-zinc-900 font-bold dark:border-white dark:bg-zinc-800 dark:text-white"
                      : "border border-black/10 bg-zinc-50 text-zinc-700 hover:bg-zinc-100 dark:border-white/10 dark:bg-zinc-800 dark:text-zinc-300"
                  }`}
                >
                  <Layers size={14} />
                  Minimal Studio
                </button>
              </div>
            </div>

            {/* 3. Screen Mockup / Upload */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                3. App Screen Image
              </label>
              <div className="mt-2.5 flex items-center gap-2">
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-dashed border-zinc-300 bg-zinc-50 py-2 px-3 text-xs font-medium text-zinc-700 hover:border-zinc-400 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                >
                  <Upload size={14} />
                  {uploadedImage ? "Replace Screenshot" : "Upload Custom Screenshot"}
                </button>
                {uploadedImage && (
                  <button
                    onClick={handleResetImage}
                    title="Reset to default mock UI"
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-black/10 bg-white text-zinc-500 hover:bg-red-50 hover:text-red-600 dark:border-white/10 dark:bg-zinc-800"
                  >
                    <RotateCcw size={14} />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Quick Scene Presets */}
          <div className="mt-6 border-t border-black/5 pt-4 dark:border-white/10">
            <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
              Quick Concept Presets:
            </span>
            <div className="mt-2 flex flex-wrap gap-2">
              {currentPresets.map((scene, idx) => (
                <button
                  key={scene.id}
                  onClick={() => handleSceneSelect(idx)}
                  className={`rounded-full px-3.5 py-1 text-xs font-medium transition-all ${
                    activeSceneIdx === idx
                      ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                      : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300"
                  }`}
                >
                  Slide {idx + 1}: {scene.badge}
                </button>
              ))}
            </div>
          </div>

          {/* Inline Text Editors */}
          <div className="mt-5 grid gap-4 sm:grid-cols-3 border-t border-black/5 pt-4 dark:border-white/10">
            <div>
              <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                Badge / Tagline
              </label>
              <input
                type="text"
                value={customBadge}
                onChange={(e) => setCustomBadge(e.target.value)}
                className="mt-1 w-full rounded-xl border border-black/10 bg-zinc-50 px-3 py-1.5 text-xs text-zinc-900 dark:border-white/10 dark:bg-zinc-800 dark:text-white"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                Headline Title
              </label>
              <input
                type="text"
                value={customTitle}
                onChange={(e) => setCustomTitle(e.target.value)}
                className="mt-1 w-full rounded-xl border border-black/10 bg-zinc-50 px-3 py-1.5 text-xs text-zinc-900 dark:border-white/10 dark:bg-zinc-800 dark:text-white"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                Subtitle Description
              </label>
              <input
                type="text"
                value={customSubtitle}
                onChange={(e) => setCustomSubtitle(e.target.value)}
                className="mt-1 w-full rounded-xl border border-black/10 bg-zinc-50 px-3 py-1.5 text-xs text-zinc-900 dark:border-white/10 dark:bg-zinc-800 dark:text-white"
              />
            </div>
          </div>
        </div>
      )}

      {/* Floating Exit Button in Fullscreen/Capture mode */}
      {fullscreenMode && (
        <div className="fixed top-4 right-4 z-50">
          <button
            onClick={() => setFullscreenMode(false)}
            className="inline-flex items-center gap-2 rounded-full bg-zinc-900/90 px-5 py-2.5 text-xs font-semibold text-white shadow-2xl backdrop-blur hover:bg-black"
          >
            <Camera size={14} />
            Exit Capture Mode (Edit Settings)
          </button>
        </div>
      )}

      {/* RENDER CANVAS / TEMPLATE VIEWPORT */}
      <div className="flex justify-center overflow-x-auto py-4">
        {device === "mobile" && (
          <MobileTemplate
            style={style}
            title={customTitle}
            subtitle={customSubtitle}
            badge={customBadge}
            uploadedImage={uploadedImage}
            scene={activeScene}
          />
        )}

        {device === "tv" && (
          <TvTemplate
            style={style}
            title={customTitle}
            subtitle={customSubtitle}
            badge={customBadge}
            uploadedImage={uploadedImage}
            scene={activeScene}
          />
        )}

        {device === "wearos" && (
          <WearOsTemplate
            style={style}
            title={customTitle}
            subtitle={customSubtitle}
            badge={customBadge}
            uploadedImage={uploadedImage}
            scene={activeScene}
          />
        )}
      </div>

      <div className="text-center text-xs text-zinc-400">
        💡 Tip: You can switch styles, edit the text directly, or upload real screenshots from the app to test different layouts.
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 1. MOBILE PHONE TEMPLATE (Portrait 9:16 Style)
// ---------------------------------------------------------------------------
function MobileTemplate({
  style,
  title,
  subtitle,
  badge,
  uploadedImage,
  scene,
}: {
  style: TemplateStyle;
  title: string;
  subtitle: string;
  badge: string;
  uploadedImage: string | null;
  scene: PresetScene;
}) {
  const getContainerStyle = () => {
    switch (style) {
      case "gradient":
        return "bg-gradient-to-b from-[#ffede1] via-[#fff5ed] to-[#f8e7da] text-zinc-900 border-[#f0cbb5]";
      case "dark_glow":
        return "bg-zinc-950 text-white border-zinc-800 shadow-[0_0_80px_-20px_rgba(234,88,12,0.3)]";
      case "minimal":
        return "bg-gradient-to-b from-zinc-100 to-zinc-200 text-zinc-900 border-zinc-300";
    }
  };

  return (
    <div
      id="capture-target"
      className={`relative w-[380px] sm:w-[440px] h-[780px] rounded-[2.5rem] border-4 p-7 flex flex-col justify-between overflow-hidden shadow-2xl select-none transition-all ${getContainerStyle()}`}
    >
      {/* Background Decorative Glow */}
      {style === "dark_glow" && (
        <>
          <div className="pointer-events-none absolute -top-20 -left-20 h-64 w-64 rounded-full bg-[color:var(--brand)]/20 blur-3xl" />
          <div className="pointer-events-none absolute bottom-10 right-0 h-64 w-64 rounded-full bg-cyan-500/15 blur-3xl" />
        </>
      )}
      {style === "gradient" && (
        <div className="pointer-events-none absolute -top-10 right-0 h-64 w-64 rounded-full bg-orange-300/30 blur-3xl" />
      )}

      {/* Header Info */}
      <div className="relative z-10 text-center pt-2">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${
            style === "dark_glow"
              ? "bg-zinc-800/80 text-orange-400 border border-orange-500/30 shadow-sm"
              : style === "gradient"
              ? "bg-[color:var(--brand)] text-white shadow-sm"
              : "bg-zinc-900 text-white"
          }`}
        >
          <Sparkles size={12} />
          {badge}
        </span>

        <h3 className="mt-3 text-2xl sm:text-3xl font-bold font-display tracking-tight leading-tight">
          {title}
        </h3>

        <p
          className={`mt-2 text-xs sm:text-sm font-medium px-2 leading-relaxed ${
            style === "dark_glow" ? "text-zinc-300" : "text-zinc-600"
          }`}
        >
          {subtitle}
        </p>
      </div>

      {/* Realistic Mobile Device Frame */}
      <div className="relative z-10 mx-auto w-[260px] sm:w-[290px] mt-4 flex-1 flex flex-col justify-end">
        <div className="relative rounded-t-[2.5rem] border-[6px] border-b-0 border-zinc-800 bg-zinc-900 shadow-2xl overflow-hidden aspect-[9/16]">
          {/* Camera Notch / Island */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 z-30 h-4 w-20 rounded-full bg-zinc-950 flex items-center justify-center">
            <div className="h-2 w-2 rounded-full bg-zinc-800 mr-2" />
            <div className="h-1.5 w-1.5 rounded-full bg-blue-900/60" />
          </div>

          {/* Screen Content */}
          {uploadedImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={uploadedImage}
              alt="App Screen"
              className="h-full w-full object-cover object-top"
            />
          ) : (
            <MockPhoneUi scene={scene} />
          )}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 2. ANDROID TV TEMPLATE (Widescreen 16:9 Style)
// ---------------------------------------------------------------------------
function TvTemplate({
  style,
  title,
  subtitle,
  badge,
  uploadedImage,
  scene,
}: {
  style: TemplateStyle;
  title: string;
  subtitle: string;
  badge: string;
  uploadedImage: string | null;
  scene: PresetScene;
}) {
  const getContainerStyle = () => {
    switch (style) {
      case "gradient":
        return "bg-gradient-to-br from-[#1a0f08] via-[#24130a] to-[#0f0905] text-white border-orange-900/30";
      case "dark_glow":
        return "bg-zinc-950 text-white border-zinc-800 shadow-[0_0_100px_-20px_rgba(234,88,12,0.25)]";
      case "minimal":
        return "bg-zinc-900 text-white border-zinc-700";
    }
  };

  return (
    <div
      id="capture-target"
      className={`relative w-[680px] sm:w-[760px] h-[520px] rounded-[2.5rem] border-4 p-8 flex flex-col justify-between overflow-hidden shadow-2xl select-none transition-all ${getContainerStyle()}`}
    >
      {/* Glow Effects */}
      <div className="pointer-events-none absolute -top-20 left-1/3 h-72 w-72 rounded-full bg-[color:var(--brand)]/20 blur-3xl" />

      {/* Top Marketing Banner */}
      <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[color:var(--brand)] px-3 py-0.5 text-[11px] font-bold uppercase tracking-wider text-white shadow-sm">
            <Tv size={12} />
            {badge}
          </span>
          <h3 className="mt-2 text-2xl font-bold font-display tracking-tight text-white">
            {title}
          </h3>
          <p className="mt-1 text-xs text-zinc-300">{subtitle}</p>
        </div>

        <div className="flex gap-2">
          {scene.features.map((feat, idx) => (
            <span
              key={idx}
              className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-medium text-zinc-300"
            >
              ✓ {feat}
            </span>
          ))}
        </div>
      </div>

      {/* Realistic Smart TV Display Frame */}
      <div className="relative z-10 mx-auto w-full max-w-[560px] flex-1 mt-4 flex flex-col items-center justify-end">
        {/* TV Screen */}
        <div className="w-full aspect-[16/9] rounded-xl border-[5px] border-zinc-700 bg-zinc-950 shadow-2xl overflow-hidden relative">
          {uploadedImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={uploadedImage}
              alt="TV Screen"
              className="h-full w-full object-cover"
            />
          ) : (
            <MockTvUi />
          )}
        </div>

        {/* TV Base / Stand */}
        <div className="h-3 w-28 bg-zinc-600 rounded-b-md shadow-lg" />
        <div className="h-1.5 w-44 bg-zinc-700 rounded-full shadow" />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 3. WEAR OS SMARTWATCH TEMPLATE (Square / Circular Watch Style)
// ---------------------------------------------------------------------------
function WearOsTemplate({
  style,
  title,
  subtitle,
  badge,
  uploadedImage,
  scene,
}: {
  style: TemplateStyle;
  title: string;
  subtitle: string;
  badge: string;
  uploadedImage: string | null;
  scene: PresetScene;
}) {
  const getContainerStyle = () => {
    switch (style) {
      case "gradient":
        return "bg-gradient-to-b from-[#1b1411] via-[#241a15] to-[#120c09] text-white border-orange-950";
      case "dark_glow":
        return "bg-zinc-950 text-white border-zinc-800 shadow-[0_0_80px_-20px_rgba(234,88,12,0.3)]";
      case "minimal":
        return "bg-zinc-900 text-white border-zinc-800";
    }
  };

  return (
    <div
      id="capture-target"
      className={`relative w-[420px] sm:w-[480px] h-[640px] rounded-[2.5rem] border-4 p-6 flex flex-col justify-between overflow-hidden shadow-2xl select-none transition-all ${getContainerStyle()}`}
    >
      {/* Glow Effects */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-[color:var(--brand)]/20 blur-3xl" />

      {/* Header */}
      <div className="relative z-10 text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[color:var(--brand)] px-3 py-0.5 text-[11px] font-bold uppercase tracking-wider text-white shadow-sm">
          <Watch size={12} />
          {badge}
        </span>
        <h3 className="mt-2 text-2xl font-bold font-display tracking-tight text-white">
          {title}
        </h3>
        <p className="mt-1 text-xs text-zinc-300 px-4">{subtitle}</p>
      </div>

      {/* Realistic Smartwatch Case & Bezel */}
      <div className="relative z-10 mx-auto my-auto flex items-center justify-center">
        {/* Watch Straps (Top & Bottom subtle extension) */}
        <div className="absolute -top-6 h-8 w-28 bg-zinc-800 rounded-t-xl" />
        <div className="absolute -bottom-6 h-8 w-28 bg-zinc-800 rounded-b-xl" />

        {/* Watch Crown (Side Button) */}
        <div className="absolute -right-3 h-10 w-3 rounded-r-md bg-zinc-600 border border-zinc-500 shadow" />

        {/* Watch Metallic Case */}
        <div className="relative h-64 w-64 rounded-full border-[10px] border-zinc-700 bg-zinc-950 p-1.5 shadow-2xl flex items-center justify-center overflow-hidden">
          {/* Inner Display Ring */}
          <div className="relative h-full w-full rounded-full bg-black flex items-center justify-center overflow-hidden">
            {uploadedImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={uploadedImage}
                alt="Watch Screen"
                className="h-full w-full object-cover"
              />
            ) : (
              <MockWatchUi />
            )}
          </div>
        </div>
      </div>

      {/* Bottom Feature Badges */}
      <div className="relative z-10 flex justify-center gap-2">
        {scene.features.map((f, i) => (
          <span
            key={i}
            className="rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] font-medium text-zinc-300"
          >
            ✓ {f}
          </span>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// MOCK UI PREVIEWS (Rendered when no screenshot is uploaded)
// ---------------------------------------------------------------------------

function MockPhoneUi({ scene }: { scene: PresetScene }) {
  return (
    <div className="h-full w-full bg-[#1c1917] p-4 text-white font-sans flex flex-col justify-between pt-8 text-xs">
      {/* App Bar */}
      <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-lg bg-[color:var(--brand)] flex items-center justify-center font-bold text-[10px]">
            UI
          </div>
          <div>
            <div className="font-bold text-xs leading-none">Universal Installer</div>
            <div className="text-[9px] text-zinc-400">v1.8.0 · Shizuku Active</div>
          </div>
        </div>
        <span className="rounded-full bg-green-500/20 px-2 py-0.5 text-[9px] font-semibold text-green-400">
          Ready
        </span>
      </div>

      {/* Main Mock Card */}
      <div className="my-auto space-y-3">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-3.5 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold text-orange-400">
              Package Staged
            </span>
            <span className="text-[10px] text-zinc-400">64.8 MB</span>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center">
              <Package size={20} className="text-white" />
            </div>
            <div>
              <div className="font-bold text-xs">Spotify_v8.9.xapk</div>
              <div className="text-[10px] text-zinc-400">Split APK (4 splits + OBB)</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-1.5 pt-1 text-[9px]">
            <div className="rounded-lg bg-black/40 p-1.5 text-zinc-300">
              <span className="text-zinc-500">Target:</span> Android 15
            </div>
            <div className="rounded-lg bg-black/40 p-1.5 text-zinc-300">
              <span className="text-zinc-500">Arch:</span> arm64-v8a
            </div>
          </div>
        </div>

        {/* Security & Verification Chip */}
        <div className="flex items-center justify-between rounded-xl bg-green-950/40 border border-green-500/30 px-3 py-2 text-[10px] text-green-300">
          <div className="flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-green-400" />
            <span>VirusTotal: 0/72 Clean</span>
          </div>
          <span className="font-bold">Verified</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-1.5 pt-2">
        <button className="w-full h-9 rounded-xl bg-[color:var(--brand)] font-bold text-white flex items-center justify-center gap-1.5 shadow-lg">
          <FolderDown size={14} />
          Install Package
        </button>
        <div className="text-center text-[9px] text-zinc-500">
          Silent Install Profile: Default
        </div>
      </div>
    </div>
  );
}

function MockTvUi() {
  return (
    <div className="h-full w-full bg-[#120f0d] p-4 text-white font-sans flex flex-col justify-between text-xs">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 rounded bg-[color:var(--brand)] flex items-center justify-center font-bold text-[9px]">
            UI
          </div>
          <span className="font-bold text-xs">Universal Installer TV</span>
        </div>
        <div className="flex items-center gap-3 text-[10px] text-zinc-400">
          <span>Wi-Fi: 192.168.1.145</span>
          <span className="h-2 w-2 rounded-full bg-green-500" />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 my-auto">
        <div className="rounded-xl border-2 border-[color:var(--brand)] bg-[color:var(--brand)]/15 p-3 flex flex-col justify-between h-24 shadow-lg scale-105">
          <Wifi size={18} className="text-[color:var(--brand)]" />
          <div>
            <div className="font-bold text-xs">Receive from Phone</div>
            <div className="text-[9px] text-zinc-400">Pair Code: 8492</div>
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-3 flex flex-col justify-between h-24">
          <Package size={18} className="text-zinc-400" />
          <div>
            <div className="font-bold text-xs">Local APKs</div>
            <div className="text-[9px] text-zinc-400">4 packages found</div>
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-3 flex flex-col justify-between h-24">
          <ShieldCheck size={18} className="text-zinc-400" />
          <div>
            <div className="font-bold text-xs">Diagnostics</div>
            <div className="text-[9px] text-zinc-400">Shizuku Active</div>
          </div>
        </div>
      </div>

      <div className="text-[9px] text-zinc-500 flex justify-between">
        <span>Use Remote D-Pad to Select</span>
        <span>Press [OK] to Confirm</span>
      </div>
    </div>
  );
}

function MockWatchUi() {
  return (
    <div className="h-full w-full bg-black p-4 text-white font-sans flex flex-col items-center justify-between text-center text-[10px] pt-3 pb-3">
      <div className="text-[9px] text-orange-400 font-bold uppercase tracking-wider">
        Universal Installer
      </div>

      <div className="space-y-1">
        <div className="h-8 w-8 mx-auto rounded-full bg-[color:var(--brand)]/20 border border-[color:var(--brand)] flex items-center justify-center">
          <Package size={16} className="text-[color:var(--brand)]" />
        </div>
        <div className="font-bold text-[11px]">Spotify Wear</div>
        <div className="text-[8px] text-zinc-400">12.4 MB · Ready to Install</div>
      </div>

      <button className="w-24 h-6 rounded-full bg-[color:var(--brand)] font-bold text-[9px] text-white flex items-center justify-center shadow">
        Install Now
      </button>
    </div>
  );
}
