"use client";

import { useState, useRef, useCallback } from "react";
import { toPng } from "html-to-image";
import {
  Smartphone,
  Tv,
  Watch,
  Sparkles,
  Upload,
  RotateCcw,
  ShieldCheck,
  Zap,
  Layers,
  Wifi,
  Package,
  FolderDown,
  Maximize2,
  Sliders,
  Palette,
  Camera,
  Download,
  Languages,
  CheckCircle2,
  Check,
} from "lucide-react";

type DeviceType = "mobile" | "tv" | "wearos";
type TemplateStyle = "gradient" | "dark_glow" | "minimal" | "cyber_purple";
type Lang = "en" | "vi";

interface PresetScene {
  id: string;
  device: DeviceType;
  title: Record<Lang, string>;
  subtitle: Record<Lang, string>;
  badge: Record<Lang, string>;
  features: Record<Lang, string[]>;
}

const PRESET_SCENES: Record<DeviceType, PresetScene[]> = {
  mobile: [
    {
      id: "m1",
      device: "mobile",
      title: {
        en: "The Ultimate APK & Split Installer",
        vi: "Cài Đặt Mọi Định Dạng APK & Split",
      },
      subtitle: {
        en: "Effortlessly install .apk, .apks, .xapk and .apkm with OBB support.",
        vi: "Hỗ trợ đầy đủ .apk, .apks, .xapk và .apkm — Tự động trích xuất OBB.",
      },
      badge: {
        en: "All Formats",
        vi: "Đa định dạng",
      },
      features: {
        en: ["Split APK Bundles", "Auto OBB Extraction", "Expressive Spring UI"],
        vi: ["Gói Split APK", "Tự trích xuất OBB", "Giao diện Bouncy M3"],
      },
    },
    {
      id: "m2",
      device: "mobile",
      title: {
        en: "Silent Installs with Shizuku & Root",
        vi: "Cài Ngầm Không Cần Root Với Shizuku",
      },
      subtitle: {
        en: "One-tap background updates, source spoofing, and downgrade permissions.",
        vi: "Cập nhật ứng dụng ngầm không cần popup, fake nguồn cài đặt Play Store.",
      },
      badge: {
        en: "Privileged Mode",
        vi: "Đặc quyền hệ thống",
      },
      features: {
        en: ["No Root Required", "Installer Spoofing", "Auto-Grant Permissions"],
        vi: ["Không cần Root", "Fake nguồn cài đặt", "Tự cấp toàn bộ quyền"],
      },
    },
    {
      id: "m3",
      device: "mobile",
      title: {
        en: "Pre-Install VirusTotal Malware Scan",
        vi: "Quét Mã Độc Với VirusTotal Trước Khi Cài",
      },
      subtitle: {
        en: "Scan packages against 70+ antivirus engines before installing.",
        vi: "Kiểm tra độ an toàn với 70+ trình diệt virus hàng đầu thế giới.",
      },
      badge: {
        en: "100% Secure",
        vi: "An toàn tuyệt đối",
      },
      features: {
        en: ["70+ Antivirus Scanners", "SHA-256 Hash Lookup", "Strict Warning Mode"],
        vi: ["70+ Trình diệt virus", "Tra cứu mã băm SHA-256", "Cảnh báo nghiêm ngặt"],
      },
    },
    {
      id: "m4",
      device: "mobile",
      title: {
        en: "Installer Profiles & Downgrades",
        vi: "Hồ Sơ Cài Đặt & Cho Phép Hạ Cấp",
      },
      subtitle: {
        en: "Save custom configurations per app and bypass Android 14/15 SDK blocks.",
        vi: "Lưu cấu hình riêng cho từng app và vượt qua chặn targetSDK Android 14/15.",
      },
      badge: {
        en: "Power Features",
        vi: "Tùy biến chuyên sâu",
      },
      features: {
        en: ["Allow Version Downgrade", "Bypass Low Target SDK", "Multi-User Island"],
        vi: ["Hạ cấp phiên bản", "Bypass chặn SDK cũ", "Hỗ trợ đa người dùng"],
      },
    },
    {
      id: "m5",
      device: "mobile",
      title: {
        en: "Seamless Phone, TV & Wear OS Sync",
        vi: "Đồng Bộ Mượt Mà Phone, TV & Wear OS",
      },
      subtitle: {
        en: "Push packages over local Wi-Fi with high-speed LAN Sync.",
        vi: "Truyền file APK qua Wi-Fi nội bộ tốc độ cao không cần dây cáp.",
      },
      badge: {
        en: "Multi-Device",
        vi: "Đa thiết bị",
      },
      features: {
        en: ["High-speed LAN Sync", "QR Code Quick Pairing", "Zero Internet Needed"],
        vi: ["Truyền Wi-Fi tốc độ cao", "Quét mã QR kết nối", "Không tốn data mạng"],
      },
    },
  ],
  tv: [
    {
      id: "tv1",
      device: "tv",
      title: {
        en: "Optimized for Android TV & Google TV",
        vi: "Tối Ưu Cho Android TV & Google TV",
      },
      subtitle: {
        en: "Effortless D-pad remote navigation with 10-foot widescreen UI.",
        vi: "Giao diện 10-foot điều khiển hoàn hảo bằng remote D-pad, không cần chuột.",
      },
      badge: {
        en: "10-Foot UI",
        vi: "Chuẩn Android TV",
      },
      features: {
        en: ["Full Remote Navigation", "High Contrast Focus", "Fast Sideloading"],
        vi: ["100% Điều khiển Remote", "Viền chọn tương phản cao", "Cài đặt tức thì"],
      },
    },
    {
      id: "tv2",
      device: "tv",
      title: {
        en: "Send APKs from Phone to TV over Wi-Fi",
        vi: "Gửi File APK Từ Điện Thoại Lên TV Qua Wi-Fi",
      },
      subtitle: {
        en: "Instant local LAN transfer without USB sticks or slow TV browsers.",
        vi: "Truyền file trực tiếp trong mạng LAN nội bộ, không cần cắm USB rườm rà.",
      },
      badge: {
        en: "LAN Sync & Share",
        vi: "Truyền file Wi-Fi",
      },
      features: {
        en: ["Wireless Transfer", "Pairing Code Connect", "Instant Auto-Install"],
        vi: ["Truyền không dây", "Mã PIN kết nối nhanh", "Tự động kích hoạt cài"],
      },
    },
  ],
  wearos: [
    {
      id: "w1",
      device: "wearos",
      title: {
        en: "Wear OS Smartwatch Package Manager",
        vi: "Trình Quản Lý App Trên Đồng Hồ Wear OS",
      },
      subtitle: {
        en: "Install directly from Google Play on Galaxy Watch & Pixel Watch.",
        vi: "Cài đặt trực tiếp từ Google Play Store trên Galaxy Watch và Pixel Watch.",
      },
      badge: {
        en: "Wear OS 3 / 4 / 5",
        vi: "Google Play Store",
      },
      features: {
        en: ["Direct Play Store App", "Rotary Bezel Input", "Battery Optimized"],
        vi: ["Tải từ Google Play", "Hỗ trợ viền xoay Crown", "Tiết kiệm pin tối đa"],
      },
    },
    {
      id: "w2",
      device: "wearos",
      title: {
        en: "Wireless Sideloading on your Wrist",
        vi: "Sideload Ứng Dụng Ngay Trên Cổ Tay",
      },
      subtitle: {
        en: "Push standalone APKs wirelessly from your phone to smartwatch.",
        vi: "Truyền và cài đặt file APK độc lập từ điện thoại lên đồng hồ qua Wi-Fi.",
      },
      badge: {
        en: "Wireless ADB",
        vi: "Sideload không dây",
      },
      features: {
        en: ["Wi-Fi Transfer", "No PC Required", "Standalone Staging"],
        vi: ["Chuyển file qua Wi-Fi", "Không cần máy tính", "Xử lý gói độc lập"],
      },
    },
  ],
};

export default function ScreenshotStudio() {
  const [device, setDevice] = useState<DeviceType>("mobile");
  const [style, setStyle] = useState<TemplateStyle>("gradient");
  const [lang, setLang] = useState<Lang>("vi");
  const [activeSceneIdx, setActiveSceneIdx] = useState(0);
  const [is3DMode, setIs3DMode] = useState(true);
  const [isExporting, setIsExporting] = useState(false);

  const currentPresets = PRESET_SCENES[device];
  const activeScene = currentPresets[activeSceneIdx] || currentPresets[0];

  const [customTitle, setCustomTitle] = useState(activeScene.title[lang]);
  const [customSubtitle, setCustomSubtitle] = useState(activeScene.subtitle[lang]);
  const [customBadge, setCustomBadge] = useState(activeScene.badge[lang]);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [fullscreenMode, setFullscreenMode] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const captureRef = useRef<HTMLDivElement>(null);

  const handleDeviceChange = (newDevice: DeviceType) => {
    setDevice(newDevice);
    setActiveSceneIdx(0);
    const firstScene = PRESET_SCENES[newDevice][0];
    setCustomTitle(firstScene.title[lang]);
    setCustomSubtitle(firstScene.subtitle[lang]);
    setCustomBadge(firstScene.badge[lang]);
  };

  const handleLangChange = (newLang: Lang) => {
    setLang(newLang);
    setCustomTitle(activeScene.title[newLang]);
    setCustomSubtitle(activeScene.subtitle[newLang]);
    setCustomBadge(activeScene.badge[newLang]);
  };

  const handleSceneSelect = (idx: number) => {
    setActiveSceneIdx(idx);
    const scene = currentPresets[idx];
    if (scene) {
      setCustomTitle(scene.title[lang]);
      setCustomSubtitle(scene.subtitle[lang]);
      setCustomBadge(scene.badge[lang]);
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

  const handleExportPng = useCallback(async () => {
    if (!captureRef.current) return;
    setIsExporting(true);
    try {
      const dataUrl = await toPng(captureRef.current, {
        pixelRatio: 2.5, // High resolution output
        cacheBust: true,
      });
      const link = document.createElement("a");
      link.download = `universal-installer-${device}-${style}-slide${activeSceneIdx + 1}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Export error:", err);
      alert("Không thể xuất ảnh tự động. Bạn có thể chuyển sang chế độ 'Presentation View' và dùng phím chụp màn hình để lưu ảnh nét nhất.");
    } finally {
      setIsExporting(false);
    }
  }, [device, style, activeSceneIdx]);

  return (
    <div className="space-y-8">
      {/* Control Panel */}
      {!fullscreenMode && (
        <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-900">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-black/5 pb-5 dark:border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-xl bg-[color:var(--brand)]/10 text-[color:var(--brand)] flex items-center justify-center font-bold">
                <Sliders size={18} />
              </div>
              <div>
                <h2 className="text-base font-bold text-zinc-900 dark:text-white">
                  Screenshot Studio Control Center
                </h2>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Tùy chỉnh mockup Google Play Store chuẩn xuất bản
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              {/* Language Switcher */}
              <div className="inline-flex rounded-full border border-black/10 bg-zinc-50 p-0.5 dark:border-white/10 dark:bg-zinc-800">
                <button
                  onClick={() => handleLangChange("vi")}
                  className={`rounded-full px-3 py-1 text-xs font-bold transition-all ${
                    lang === "vi"
                      ? "bg-[color:var(--brand)] text-white shadow"
                      : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400"
                  }`}
                >
                  🇻🇳 Tiếng Việt
                </button>
                <button
                  onClick={() => handleLangChange("en")}
                  className={`rounded-full px-3 py-1 text-xs font-bold transition-all ${
                    lang === "en"
                      ? "bg-[color:var(--brand)] text-white shadow"
                      : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400"
                  }`}
                >
                  🇺🇸 English
                </button>
              </div>

              {/* 3D Tilt Toggle */}
              <button
                onClick={() => setIs3DMode(!is3DMode)}
                className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold border transition-all ${
                  is3DMode
                    ? "border-purple-500/30 bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300"
                    : "border-black/10 bg-zinc-100 text-zinc-600 dark:border-white/10 dark:bg-zinc-800 dark:text-zinc-400"
                }`}
              >
                <Layers size={13} />
                {is3DMode ? "3D Tilt: Bật" : "3D Tilt: Tắt (Phẳng)"}
              </button>

              {/* Download PNG Button */}
              <button
                onClick={handleExportPng}
                disabled={isExporting}
                className="inline-flex items-center gap-1.5 rounded-full bg-[color:var(--brand)] px-4 py-1.5 text-xs font-bold text-white shadow-sm transition-all hover:bg-[color:var(--brand-dark)] hover:scale-105 active:scale-95 disabled:opacity-50"
              >
                <Download size={13} />
                {isExporting ? "Đang xuất..." : "Xuất ảnh PNG 2K"}
              </button>

              <button
                onClick={() => setFullscreenMode(true)}
                className="inline-flex items-center gap-1.5 rounded-full bg-zinc-900 px-3.5 py-1.5 text-xs font-semibold text-white transition-all hover:bg-black dark:bg-white dark:text-zinc-900"
              >
                <Maximize2 size={13} />
                Chế độ chụp nét
              </button>
            </div>
          </div>

          <div className="mt-5 grid gap-6 md:grid-cols-3">
            {/* 1. Device Picker */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                1. Thiết bị mục tiêu
              </label>
              <div className="mt-2.5 flex gap-2">
                <button
                  onClick={() => handleDeviceChange("mobile")}
                  className={`flex flex-1 items-center justify-center gap-1.5 rounded-xl py-2.5 px-2 text-xs font-semibold transition-all ${
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
                  className={`flex flex-1 items-center justify-center gap-1.5 rounded-xl py-2.5 px-2 text-xs font-semibold transition-all ${
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
                  className={`flex flex-1 items-center justify-center gap-1.5 rounded-xl py-2.5 px-2 text-xs font-semibold transition-all ${
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

            {/* 2. Visual Style Presets */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                2. Phong cách màu sắc
              </label>
              <div className="mt-2.5 grid grid-cols-2 gap-2">
                <button
                  onClick={() => setStyle("gradient")}
                  className={`flex items-center justify-center gap-1.5 rounded-xl py-2 px-2 text-xs font-semibold transition-all ${
                    style === "gradient"
                      ? "border-2 border-[color:var(--brand)] bg-orange-50 text-orange-950 font-bold dark:bg-orange-950/40 dark:text-orange-200"
                      : "border border-black/10 bg-zinc-50 text-zinc-700 hover:bg-zinc-100 dark:border-white/10 dark:bg-zinc-800 dark:text-zinc-300"
                  }`}
                >
                  <Palette size={13} className="text-orange-600" />
                  Brand Gradient
                </button>
                <button
                  onClick={() => setStyle("dark_glow")}
                  className={`flex items-center justify-center gap-1.5 rounded-xl py-2 px-2 text-xs font-semibold transition-all ${
                    style === "dark_glow"
                      ? "border-2 border-cyan-500 bg-zinc-950 text-cyan-400 font-bold shadow-sm"
                      : "border border-black/10 bg-zinc-50 text-zinc-700 hover:bg-zinc-100 dark:border-white/10 dark:bg-zinc-800 dark:text-zinc-300"
                  }`}
                >
                  <Sparkles size={13} className="text-cyan-400" />
                  Dark AMOLED
                </button>
                <button
                  onClick={() => setStyle("cyber_purple")}
                  className={`flex items-center justify-center gap-1.5 rounded-xl py-2 px-2 text-xs font-semibold transition-all ${
                    style === "cyber_purple"
                      ? "border-2 border-purple-500 bg-purple-950 text-purple-200 font-bold shadow-sm"
                      : "border border-black/10 bg-zinc-50 text-zinc-700 hover:bg-zinc-100 dark:border-white/10 dark:bg-zinc-800 dark:text-zinc-300"
                  }`}
                >
                  <Zap size={13} className="text-purple-400" />
                  Deep Space
                </button>
                <button
                  onClick={() => setStyle("minimal")}
                  className={`flex items-center justify-center gap-1.5 rounded-xl py-2 px-2 text-xs font-semibold transition-all ${
                    style === "minimal"
                      ? "border-2 border-zinc-900 bg-zinc-100 text-zinc-900 font-bold dark:border-white dark:bg-zinc-800 dark:text-white"
                      : "border border-black/10 bg-zinc-50 text-zinc-700 hover:bg-zinc-100 dark:border-white/10 dark:bg-zinc-800 dark:text-zinc-300"
                  }`}
                >
                  <Layers size={13} />
                  Clean Studio
                </button>
              </div>
            </div>

            {/* 3. Screen Mockup / Custom Upload */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                3. Ảnh chụp màn hình thật
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
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-dashed border-zinc-300 bg-zinc-50 py-2.5 px-3 text-xs font-medium text-zinc-700 hover:border-zinc-400 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                >
                  <Upload size={14} />
                  {uploadedImage ? "Thay ảnh khác" : "Tải ảnh chụp của bạn lên"}
                </button>
                {uploadedImage && (
                  <button
                    onClick={handleResetImage}
                    title="Khôi phục giao diện mẫu"
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-black/10 bg-white text-zinc-500 hover:bg-red-50 hover:text-red-600 dark:border-white/10 dark:bg-zinc-800"
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
              Chọn Slide mẫu ({currentPresets.length} kịch bản chuẩn Play Store):
            </span>
            <div className="mt-2 flex flex-wrap gap-2">
              {currentPresets.map((scene, idx) => (
                <button
                  key={scene.id}
                  onClick={() => handleSceneSelect(idx)}
                  className={`rounded-full px-3.5 py-1 text-xs font-medium transition-all ${
                    activeSceneIdx === idx
                      ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-sm font-bold"
                      : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300"
                  }`}
                >
                  Slide {idx + 1}: {scene.badge[lang]}
                </button>
              ))}
            </div>
          </div>

          {/* Inline Text Editors */}
          <div className="mt-5 grid gap-4 sm:grid-cols-3 border-t border-black/5 pt-4 dark:border-white/10">
            <div>
              <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                Badge / Nhãn nổi bật
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
                Tiêu đề chính (Headline)
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
                Mô tả phụ (Subtitle)
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
        <div className="fixed top-4 right-4 z-50 flex gap-2">
          <button
            onClick={handleExportPng}
            className="inline-flex items-center gap-1.5 rounded-full bg-[color:var(--brand)] px-4 py-2.5 text-xs font-bold text-white shadow-2xl backdrop-blur hover:bg-[color:var(--brand-dark)]"
          >
            <Download size={14} />
            Tải ảnh PNG
          </button>
          <button
            onClick={() => setFullscreenMode(false)}
            className="inline-flex items-center gap-2 rounded-full bg-zinc-900/90 px-4 py-2.5 text-xs font-semibold text-white shadow-2xl backdrop-blur hover:bg-black"
          >
            <Camera size={14} />
            Thoát chế độ chụp
          </button>
        </div>
      )}

      {/* RENDER CANVAS / TEMPLATE VIEWPORT */}
      <div className="flex justify-center overflow-x-auto py-4">
        <div ref={captureRef} className="inline-block">
          {device === "mobile" && (
            <MobileTemplate
              style={style}
              title={customTitle}
              subtitle={customSubtitle}
              badge={customBadge}
              uploadedImage={uploadedImage}
              scene={activeScene}
              lang={lang}
              is3DMode={is3DMode}
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
              lang={lang}
              is3DMode={is3DMode}
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
              lang={lang}
            />
          )}
        </div>
      </div>

      <div className="text-center text-xs text-zinc-400 space-y-1">
        <p>💡 Tip: Bấm <strong>&ldquo;Xuất ảnh PNG 2K&rdquo;</strong> để lưu trực tiếp file ảnh độ phân giải cao dùng cho Google Play Store Console.</p>
        <p>Tỉ lệ: Mobile (9:16 - 1080x1920), Android TV (16:9 - 1920x1080), Wear OS (1:1 - 1080x1080).</p>
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
  lang,
  is3DMode,
}: {
  style: TemplateStyle;
  title: string;
  subtitle: string;
  badge: string;
  uploadedImage: string | null;
  scene: PresetScene;
  lang: Lang;
  is3DMode: boolean;
}) {
  const getContainerStyle = () => {
    switch (style) {
      case "gradient":
        return "bg-gradient-to-b from-[#ffefe4] via-[#fff7f0] to-[#fceee2] text-zinc-900 border-[#f0cbb5]";
      case "dark_glow":
        return "bg-zinc-950 text-white border-zinc-800 shadow-[0_0_90px_-20px_rgba(234,88,12,0.35)]";
      case "cyber_purple":
        return "bg-gradient-to-b from-[#160b24] via-[#0d0617] to-[#08030e] text-white border-purple-900/40 shadow-[0_0_80px_-20px_rgba(168,85,247,0.3)]";
      case "minimal":
        return "bg-gradient-to-b from-zinc-100 to-zinc-200 text-zinc-900 border-zinc-300";
    }
  };

  return (
    <div
      className={`relative w-[400px] sm:w-[450px] h-[800px] rounded-[3rem] border-4 p-7 flex flex-col justify-between overflow-hidden shadow-2xl select-none transition-all ${getContainerStyle()}`}
    >
      {/* Background Decorative Glow */}
      {style === "dark_glow" && (
        <>
          <div className="pointer-events-none absolute -top-20 -left-20 h-72 w-72 rounded-full bg-[color:var(--brand)]/25 blur-3xl" />
          <div className="pointer-events-none absolute bottom-10 right-0 h-64 w-64 rounded-full bg-cyan-500/15 blur-3xl" />
        </>
      )}
      {style === "cyber_purple" && (
        <>
          <div className="pointer-events-none absolute -top-10 -right-10 h-72 w-72 rounded-full bg-purple-600/25 blur-3xl" />
          <div className="pointer-events-none absolute bottom-10 -left-10 h-64 w-64 rounded-full bg-pink-500/20 blur-3xl" />
        </>
      )}
      {style === "gradient" && (
        <div className="pointer-events-none absolute -top-10 right-0 h-72 w-72 rounded-full bg-orange-300/35 blur-3xl" />
      )}

      {/* Header Info */}
      <div className="relative z-10 text-center pt-2">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider ${
            style === "dark_glow"
              ? "bg-zinc-800/90 text-orange-400 border border-orange-500/30 shadow-sm"
              : style === "cyber_purple"
              ? "bg-purple-900/60 text-purple-300 border border-purple-500/40 shadow-sm"
              : style === "gradient"
              ? "bg-[color:var(--brand)] text-white shadow-sm"
              : "bg-zinc-900 text-white"
          }`}
        >
          <Sparkles size={12} />
          {badge}
        </span>

        <h3 className="mt-3.5 text-2xl sm:text-3xl font-bold font-display tracking-tight leading-tight">
          {title}
        </h3>

        <p
          className={`mt-2 text-xs sm:text-sm font-medium px-2 leading-relaxed ${
            style === "dark_glow" || style === "cyber_purple" ? "text-zinc-300" : "text-zinc-600"
          }`}
        >
          {subtitle}
        </p>

        {/* Highlight Feature Pills */}
        <div className="mt-3 flex flex-wrap justify-center gap-1.5">
          {scene.features[lang].map((f, i) => (
            <span
              key={i}
              className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
                style === "dark_glow" || style === "cyber_purple"
                  ? "bg-white/10 text-zinc-200 border border-white/10"
                  : "bg-black/5 text-zinc-700 border border-black/5"
              }`}
            >
              ✓ {f}
            </span>
          ))}
        </div>
      </div>

      {/* Realistic Mobile Device Frame */}
      <div className="relative z-10 mx-auto w-[270px] sm:w-[300px] mt-2 flex-1 flex flex-col justify-end">
        <div
          className={`relative rounded-t-[2.8rem] border-[7px] border-b-0 border-zinc-800 bg-zinc-900 shadow-2xl overflow-hidden aspect-[9/16] transition-transform duration-300 ${
            is3DMode ? "rotate-[-1.5deg] scale-[1.02] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7)]" : ""
          }`}
        >
          {/* Camera Notch / Dynamic Island */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 z-30 h-4 w-20 rounded-full bg-zinc-950 flex items-center justify-center shadow-inner">
            <div className="h-2 w-2 rounded-full bg-zinc-800 mr-2" />
            <div className="h-1.5 w-1.5 rounded-full bg-blue-900/70" />
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
            <MockPhoneUi scene={scene} lang={lang} />
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
  lang,
  is3DMode,
}: {
  style: TemplateStyle;
  title: string;
  subtitle: string;
  badge: string;
  uploadedImage: string | null;
  scene: PresetScene;
  lang: Lang;
  is3DMode: boolean;
}) {
  const getContainerStyle = () => {
    switch (style) {
      case "gradient":
        return "bg-gradient-to-br from-[#1c1008] via-[#26150b] to-[#100905] text-white border-orange-900/40";
      case "dark_glow":
        return "bg-zinc-950 text-white border-zinc-800 shadow-[0_0_100px_-20px_rgba(234,88,12,0.3)]";
      case "cyber_purple":
        return "bg-gradient-to-br from-[#170c28] via-[#0f071c] to-[#080310] text-white border-purple-900/40";
      case "minimal":
        return "bg-zinc-900 text-white border-zinc-700";
    }
  };

  return (
    <div
      className={`relative w-[720px] sm:w-[800px] h-[540px] rounded-[3rem] border-4 p-8 flex flex-col justify-between overflow-hidden shadow-2xl select-none transition-all ${getContainerStyle()}`}
    >
      {/* Glow Effects */}
      <div className="pointer-events-none absolute -top-20 left-1/3 h-80 w-80 rounded-full bg-[color:var(--brand)]/20 blur-3xl" />

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

        <div className="flex flex-col gap-1.5 items-end">
          {scene.features[lang].map((feat, idx) => (
            <span
              key={idx}
              className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-0.5 text-[10px] font-medium text-zinc-300"
            >
              ✓ {feat}
            </span>
          ))}
        </div>
      </div>

      {/* Realistic Smart TV Display Frame */}
      <div className="relative z-10 mx-auto w-full max-w-[590px] flex-1 mt-4 flex flex-col items-center justify-end">
        {/* TV Screen */}
        <div
          className={`w-full aspect-[16/9] rounded-xl border-[6px] border-zinc-700 bg-zinc-950 shadow-2xl overflow-hidden relative transition-transform ${
            is3DMode ? "scale-[1.01] shadow-[0_20px_40px_rgba(0,0,0,0.8)]" : ""
          }`}
        >
          {uploadedImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={uploadedImage}
              alt="TV Screen"
              className="h-full w-full object-cover"
            />
          ) : (
            <MockTvUi lang={lang} />
          )}
        </div>

        {/* TV Base / Stand */}
        <div className="h-3 w-32 bg-zinc-600 rounded-b-md shadow-lg" />
        <div className="h-1.5 w-48 bg-zinc-700 rounded-full shadow" />
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
  lang,
}: {
  style: TemplateStyle;
  title: string;
  subtitle: string;
  badge: string;
  uploadedImage: string | null;
  scene: PresetScene;
  lang: Lang;
}) {
  const getContainerStyle = () => {
    switch (style) {
      case "gradient":
        return "bg-gradient-to-b from-[#1f1612] via-[#281d17] to-[#140e0b] text-white border-orange-950";
      case "dark_glow":
        return "bg-zinc-950 text-white border-zinc-800 shadow-[0_0_90px_-20px_rgba(234,88,12,0.35)]";
      case "cyber_purple":
        return "bg-gradient-to-b from-[#170c28] via-[#10071c] to-[#080310] text-white border-purple-900/40";
      case "minimal":
        return "bg-zinc-900 text-white border-zinc-800";
    }
  };

  return (
    <div
      className={`relative w-[440px] sm:w-[500px] h-[660px] rounded-[3rem] border-4 p-6 flex flex-col justify-between overflow-hidden shadow-2xl select-none transition-all ${getContainerStyle()}`}
    >
      {/* Glow Effects */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-72 w-72 rounded-full bg-[color:var(--brand)]/25 blur-3xl" />

      {/* Header */}
      <div className="relative z-10 text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[color:var(--brand)] px-3.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-white shadow-sm">
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
        {/* Watch Straps */}
        <div className="absolute -top-7 h-9 w-32 bg-zinc-800 rounded-t-2xl shadow-inner border border-zinc-700/50" />
        <div className="absolute -bottom-7 h-9 w-32 bg-zinc-800 rounded-b-2xl shadow-inner border border-zinc-700/50" />

        {/* Watch Crown (Side Button) */}
        <div className="absolute -right-3.5 h-11 w-3.5 rounded-r-md bg-zinc-600 border border-zinc-500 shadow-lg" />

        {/* Watch Metallic Case */}
        <div className="relative h-68 w-68 rounded-full border-[12px] border-zinc-700 bg-zinc-950 p-2 shadow-2xl flex items-center justify-center overflow-hidden ring-2 ring-zinc-800">
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
              <MockWatchUi lang={lang} />
            )}
          </div>
        </div>
      </div>

      {/* Bottom Feature Badges */}
      <div className="relative z-10 flex justify-center gap-2">
        {scene.features[lang].map((f, i) => (
          <span
            key={i}
            className="rounded-full bg-white/10 px-3 py-0.5 text-[10px] font-medium text-zinc-300"
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

function MockPhoneUi({ scene, lang }: { scene: PresetScene; lang: Lang }) {
  const isEn = lang === "en";
  return (
    <div className="h-full w-full bg-[#1c1917] p-4 text-white font-sans flex flex-col justify-between pt-8 text-xs">
      {/* App Bar */}
      <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-lg bg-[color:var(--brand)] flex items-center justify-center font-bold text-[10px] text-white">
            UI
          </div>
          <div>
            <div className="font-bold text-xs leading-none">Universal Installer</div>
            <div className="text-[9px] text-zinc-400">v1.8.0 · Shizuku Active</div>
          </div>
        </div>
        <span className="rounded-full bg-green-500/20 px-2 py-0.5 text-[9px] font-semibold text-green-400">
          {isEn ? "Ready" : "Sẵn sàng"}
        </span>
      </div>

      {/* Main Mock Card */}
      <div className="my-auto space-y-3">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-3.5 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold text-orange-400">
              {isEn ? "Package Staged" : "Gói đã nạp"}
            </span>
            <span className="text-[10px] text-zinc-400">64.8 MB</span>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center">
              <Package size={20} className="text-white" />
            </div>
            <div>
              <div className="font-bold text-xs">Spotify_v8.9.xapk</div>
              <div className="text-[10px] text-zinc-400">
                {isEn ? "Split APK (4 splits + OBB)" : "Split APK (4 splits + OBB)"}
              </div>
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
          <span className="font-bold">{isEn ? "Verified" : "Đã xác minh"}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-1.5 pt-2">
        <button className="w-full h-9 rounded-xl bg-[color:var(--brand)] font-bold text-white flex items-center justify-center gap-1.5 shadow-lg">
          <FolderDown size={14} />
          {isEn ? "Install Package" : "Cài đặt gói"}
        </button>
        <div className="text-center text-[9px] text-zinc-500">
          {isEn ? "Silent Install Profile: Default" : "Hồ sơ cài ngầm: Mặc định"}
        </div>
      </div>
    </div>
  );
}

function MockTvUi({ lang }: { lang: Lang }) {
  const isEn = lang === "en";
  return (
    <div className="h-full w-full bg-[#120f0d] p-4 text-white font-sans flex flex-col justify-between text-xs">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 rounded bg-[color:var(--brand)] flex items-center justify-center font-bold text-[9px] text-white">
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
            <div className="font-bold text-xs">{isEn ? "Receive from Phone" : "Nhận từ Điện thoại"}</div>
            <div className="text-[9px] text-zinc-400">{isEn ? "Pair Code: 8492" : "Mã PIN: 8492"}</div>
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-3 flex flex-col justify-between h-24">
          <Package size={18} className="text-zinc-400" />
          <div>
            <div className="font-bold text-xs">{isEn ? "Local APKs" : "APK Đã lưu"}</div>
            <div className="text-[9px] text-zinc-400">{isEn ? "4 packages found" : "4 file sẵn sàng"}</div>
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-3 flex flex-col justify-between h-24">
          <ShieldCheck size={18} className="text-zinc-400" />
          <div>
            <div className="font-bold text-xs">{isEn ? "Diagnostics" : "Chẩn đoán"}</div>
            <div className="text-[9px] text-zinc-400">Shizuku Active</div>
          </div>
        </div>
      </div>

      <div className="text-[9px] text-zinc-500 flex justify-between">
        <span>{isEn ? "Use Remote D-Pad to Select" : "Dùng D-Pad trên Remote để chọn"}</span>
        <span>{isEn ? "Press [OK] to Confirm" : "Bấm [OK] để xác nhận"}</span>
      </div>
    </div>
  );
}

function MockWatchUi({ lang }: { lang: Lang }) {
  const isEn = lang === "en";
  return (
    <div className="h-full w-full bg-black p-4 text-white font-sans flex flex-col items-center justify-between text-center text-[10px] pt-3 pb-3">
      <div className="text-[9px] text-orange-400 font-bold uppercase tracking-wider">
        Universal Installer
      </div>

      <div className="space-y-1">
        <div className="h-9 w-9 mx-auto rounded-full bg-[color:var(--brand)]/20 border border-[color:var(--brand)] flex items-center justify-center">
          <Package size={16} className="text-[color:var(--brand)]" />
        </div>
        <div className="font-bold text-[11px]">Spotify Wear</div>
        <div className="text-[8px] text-zinc-400">{isEn ? "12.4 MB · Ready to Install" : "12.4 MB · Sẵn sàng cài"}</div>
      </div>

      <button className="w-24 h-6 rounded-full bg-[color:var(--brand)] font-bold text-[9px] text-white flex items-center justify-center shadow">
        {isEn ? "Install Now" : "Cài đặt ngay"}
      </button>
    </div>
  );
}
