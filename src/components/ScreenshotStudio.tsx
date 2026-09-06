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
  LayoutGrid,
  CheckCircle2,
  Check,
  Share2,
  Lock,
  ArrowDownCircle,
  Radio,
  SlidersHorizontal,
  Flame,
  KeyRound,
  Cpu,
  RefreshCw,
  QrCode,
  HardDrive,
  CheckCheck,
} from "lucide-react";

type DeviceType = "mobile" | "tv" | "wearos";
type TemplateStyle = "gradient" | "dark_glow" | "minimal" | "cyber_purple";
type LayoutMode = "classic_top" | "floating_badges" | "dual_multi" | "bottom_cards" | "isometric_tilt";
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
        en: ["Split APK Bundles (.apks)", "Auto OBB Extraction (.xapk)", "Material 3 Spring UI"],
        vi: ["Gói Split APK (.apks)", "Tự trích xuất OBB (.xapk)", "Giao diện Bouncy M3"],
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
        en: ["Shizuku Wireless ADB", "Play Store Source Spoofing", "Auto-Grant Permissions"],
        vi: ["Shizuku Wireless ADB", "Fake nguồn Play Store", "Tự cấp toàn bộ quyền"],
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
        en: ["70+ Antivirus Scanners", "SHA-256 Hash Verification", "Strict Warning Mode"],
        vi: ["70+ Trình diệt virus", "Xác thực mã băm SHA-256", "Cảnh báo nghiêm ngặt"],
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
        en: ["Allow Version Downgrade", "Bypass Low Target SDK", "Custom Profiles"],
        vi: ["Cho phép hạ cấp app", "Bypass chặn SDK cũ", "Hồ sơ tùy biến"],
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
        en: ["High-speed LAN Sync", "QR Code Quick Pairing", "Local Wi-Fi Transfer"],
        vi: ["Truyền LAN tốc độ cao", "Quét mã QR kết nối", "Truyền Wi-Fi nội bộ"],
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
        en: ["Full D-Pad Navigation", "High Contrast Focus", "Fast Sideloading"],
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
        en: ["Local Wi-Fi Transfer", "PIN Code Connect", "Instant Auto-Install"],
        vi: ["Truyền Wi-Fi nội bộ", "Mã PIN kết nối nhanh", "Tự động kích hoạt cài"],
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
        en: ["Google Play Store App", "Rotary Crown Control", "Battery Optimized"],
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
        en: ["Wi-Fi Transfer", "No PC Required", "Standalone Package Staging"],
        vi: ["Chuyển file qua Wi-Fi", "Không cần máy tính", "Xử lý gói độc lập"],
      },
    },
  ],
};

function getFeatureSvgIcon(text: string) {
  const lower = text.toLowerCase();
  if (lower.includes("split") || lower.includes("xapk") || lower.includes("apks") || lower.includes("gói") || lower.includes("obb")) {
    return <Package size={13} className="text-orange-400 shrink-0" />;
  }
  if (lower.includes("shizuku") || lower.includes("root") || lower.includes("adb") || lower.includes("đặc quyền") || lower.includes("silent") || lower.includes("ngầm") || lower.includes("spoof")) {
    return <Zap size={13} className="text-amber-400 shrink-0" />;
  }
  if (lower.includes("virus") || lower.includes("secure") || lower.includes("an toàn") || lower.includes("safe") || lower.includes("mã độc") || lower.includes("sha")) {
    return <ShieldCheck size={13} className="text-emerald-400 shrink-0" />;
  }
  if (lower.includes("lan") || lower.includes("wifi") || lower.includes("wi-fi") || lower.includes("truyền") || lower.includes("qr") || lower.includes("sync") || lower.includes("pin")) {
    return <Wifi size={13} className="text-blue-400 shrink-0" />;
  }
  if (lower.includes("wear") || lower.includes("watch") || lower.includes("đồng hồ") || lower.includes("crown") || lower.includes("play")) {
    return <Watch size={13} className="text-cyan-400 shrink-0" />;
  }
  if (lower.includes("tv") || lower.includes("remote") || lower.includes("d-pad") || lower.includes("10-foot") || lower.includes("điều khiển")) {
    return <Tv size={13} className="text-purple-400 shrink-0" />;
  }
  if (lower.includes("downgrade") || lower.includes("hạ cấp") || lower.includes("sdk") || lower.includes("bypass")) {
    return <RotateCcw size={13} className="text-rose-400 shrink-0" />;
  }
  if (lower.includes("spring") || lower.includes("bouncy") || lower.includes("m3") || lower.includes("ui") || lower.includes("giao diện")) {
    return <Sparkles size={13} className="text-yellow-400 shrink-0" />;
  }
  return <CheckCircle2 size={13} className="text-[color:var(--brand)] shrink-0" />;
}

export default function ScreenshotStudio() {
  const [device, setDevice] = useState<DeviceType>("mobile");
  const [style, setStyle] = useState<TemplateStyle>("gradient");
  const [layout, setLayout] = useState<LayoutMode>("floating_badges");
  const [lang, setLang] = useState<Lang>("vi");
  const [activeSceneIdx, setActiveSceneIdx] = useState(0);
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
        pixelRatio: 2.5,
        cacheBust: true,
      });
      const link = document.createElement("a");
      link.download = `universal-installer-${device}-${layout}-${style}-slide${activeSceneIdx + 1}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Export error:", err);
      alert("Xuất ảnh thất bại. Bạn có thể bật Chế độ chụp nét và dùng phím chụp màn hình.");
    } finally {
      setIsExporting(false);
    }
  }, [device, layout, style, activeSceneIdx]);

  return (
    <div className="space-y-8">
      {/* Control Panel */}
      {!fullscreenMode && (
        <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-900">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-black/5 pb-5 dark:border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-xl bg-[color:var(--brand)]/10 text-[color:var(--brand)] flex items-center justify-center font-bold">
                <SlidersHorizontal size={18} />
              </div>
              <div>
                <h2 className="text-base font-bold text-zinc-900 dark:text-white">
                  Screenshot Studio Control Center
                </h2>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Tùy chỉnh bố cục (Layouts), biểu tượng SVG và phong cách hiển thị
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

          {/* Row 1: Layout Selection */}
          <div className="mt-5 border-b border-black/5 pb-5 dark:border-white/10">
            <div className="flex items-center justify-between mb-2.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[color:var(--brand)] flex items-center gap-1.5">
                <LayoutGrid size={14} />
                Chọn Kiểu Bố Trí Bố Cục (Layout Arrangement):
              </label>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              <button
                onClick={() => setLayout("floating_badges")}
                className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center transition-all ${
                  layout === "floating_badges"
                    ? "border-2 border-[color:var(--brand)] bg-orange-50/70 text-[color:var(--brand-dark)] font-bold shadow-sm dark:bg-orange-950/40 dark:text-orange-200"
                    : "border-black/10 bg-zinc-50 text-zinc-700 hover:bg-zinc-100 dark:border-white/10 dark:bg-zinc-800 dark:text-zinc-300"
                }`}
              >
                <Sparkles size={18} className="mb-1 text-[color:var(--brand)]" />
                <span className="text-xs font-bold">Thẻ Nổi SVG</span>
                <span className="text-[10px] text-zinc-500 dark:text-zinc-400">Floating Cards</span>
              </button>

              <button
                onClick={() => setLayout("dual_multi")}
                className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center transition-all ${
                  layout === "dual_multi"
                    ? "border-2 border-[color:var(--brand)] bg-orange-50/70 text-[color:var(--brand-dark)] font-bold shadow-sm dark:bg-orange-950/40 dark:text-orange-200"
                    : "border-black/10 bg-zinc-50 text-zinc-700 hover:bg-zinc-100 dark:border-white/10 dark:bg-zinc-800 dark:text-zinc-300"
                }`}
              >
                <Layers size={18} className="mb-1 text-[color:var(--brand)]" />
                <span className="text-xs font-bold">Đa Thiết Bị</span>
                <span className="text-[10px] text-zinc-500 dark:text-zinc-400">Dual Devices</span>
              </button>

              <button
                onClick={() => setLayout("classic_top")}
                className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center transition-all ${
                  layout === "classic_top"
                    ? "border-2 border-[color:var(--brand)] bg-orange-50/70 text-[color:var(--brand-dark)] font-bold shadow-sm dark:bg-orange-950/40 dark:text-orange-200"
                    : "border-black/10 bg-zinc-50 text-zinc-700 hover:bg-zinc-100 dark:border-white/10 dark:bg-zinc-800 dark:text-zinc-300"
                }`}
              >
                <Smartphone size={18} className="mb-1 text-[color:var(--brand)]" />
                <span className="text-xs font-bold">Tiêu Đề Trên</span>
                <span className="text-[10px] text-zinc-500 dark:text-zinc-400">Classic Top</span>
              </button>

              <button
                onClick={() => setLayout("bottom_cards")}
                className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center transition-all ${
                  layout === "bottom_cards"
                    ? "border-2 border-[color:var(--brand)] bg-orange-50/70 text-[color:var(--brand-dark)] font-bold shadow-sm dark:bg-orange-950/40 dark:text-orange-200"
                    : "border-black/10 bg-zinc-50 text-zinc-700 hover:bg-zinc-100 dark:border-white/10 dark:bg-zinc-800 dark:text-zinc-300"
                }`}
              >
                <FolderDown size={18} className="mb-1 text-[color:var(--brand)]" />
                <span className="text-xs font-bold">Tiêu Đề Dưới</span>
                <span className="text-[10px] text-zinc-500 dark:text-zinc-400">Bottom Focus</span>
              </button>

              <button
                onClick={() => setLayout("isometric_tilt")}
                className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center transition-all ${
                  layout === "isometric_tilt"
                    ? "border-2 border-[color:var(--brand)] bg-orange-50/70 text-[color:var(--brand-dark)] font-bold shadow-sm dark:bg-orange-950/40 dark:text-orange-200"
                    : "border-black/10 bg-zinc-50 text-zinc-700 hover:bg-zinc-100 dark:border-white/10 dark:bg-zinc-800 dark:text-zinc-300"
                }`}
              >
                <Zap size={18} className="mb-1 text-[color:var(--brand)]" />
                <span className="text-xs font-bold">Góc Nghiêng 3D</span>
                <span className="text-[10px] text-zinc-500 dark:text-zinc-400">Isometric Tilt</span>
              </button>
            </div>
          </div>

          {/* Row 2: Target Device & Color Theme & Custom Upload */}
          <div className="mt-5 grid gap-6 md:grid-cols-3">
            {/* 1. Target Device */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Thiết bị
              </label>
              <div className="mt-2 flex gap-1.5">
                <button
                  onClick={() => handleDeviceChange("mobile")}
                  className={`flex flex-1 items-center justify-center gap-1.5 rounded-xl py-2 px-2 text-xs font-semibold transition-all ${
                    device === "mobile"
                      ? "bg-[color:var(--brand)] text-white shadow-sm"
                      : "border border-black/10 bg-zinc-50 text-zinc-700 hover:bg-zinc-100 dark:border-white/10 dark:bg-zinc-800 dark:text-zinc-300"
                  }`}
                >
                  <Smartphone size={14} />
                  Phone
                </button>
                <button
                  onClick={() => handleDeviceChange("tv")}
                  className={`flex flex-1 items-center justify-center gap-1.5 rounded-xl py-2 px-2 text-xs font-semibold transition-all ${
                    device === "tv"
                      ? "bg-[color:var(--brand)] text-white shadow-sm"
                      : "border border-black/10 bg-zinc-50 text-zinc-700 hover:bg-zinc-100 dark:border-white/10 dark:bg-zinc-800 dark:text-zinc-300"
                  }`}
                >
                  <Tv size={14} />
                  TV
                </button>
                <button
                  onClick={() => handleDeviceChange("wearos")}
                  className={`flex flex-1 items-center justify-center gap-1.5 rounded-xl py-2 px-2 text-xs font-semibold transition-all ${
                    device === "wearos"
                      ? "bg-[color:var(--brand)] text-white shadow-sm"
                      : "border border-black/10 bg-zinc-50 text-zinc-700 hover:bg-zinc-100 dark:border-white/10 dark:bg-zinc-800 dark:text-zinc-300"
                  }`}
                >
                  <Watch size={14} />
                  Wear OS
                </button>
              </div>
            </div>

            {/* 2. Color Theme */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Phong cách màu
              </label>
              <div className="mt-2 grid grid-cols-2 gap-1.5">
                <button
                  onClick={() => setStyle("gradient")}
                  className={`flex items-center justify-center gap-1.5 rounded-xl py-1.5 px-2 text-xs font-semibold transition-all ${
                    style === "gradient"
                      ? "border-2 border-[color:var(--brand)] bg-orange-50 text-orange-950 font-bold dark:bg-orange-950/40 dark:text-orange-200"
                      : "border border-black/10 bg-zinc-50 text-zinc-700 hover:bg-zinc-100 dark:border-white/10 dark:bg-zinc-800 dark:text-zinc-300"
                  }`}
                >
                  <Palette size={12} className="text-orange-600" />
                  Gradient Cam
                </button>
                <button
                  onClick={() => setStyle("dark_glow")}
                  className={`flex items-center justify-center gap-1.5 rounded-xl py-1.5 px-2 text-xs font-semibold transition-all ${
                    style === "dark_glow"
                      ? "border-2 border-cyan-500 bg-zinc-950 text-cyan-400 font-bold shadow-sm"
                      : "border border-black/10 bg-zinc-50 text-zinc-700 hover:bg-zinc-100 dark:border-white/10 dark:bg-zinc-800 dark:text-zinc-300"
                  }`}
                >
                  <Sparkles size={12} className="text-cyan-400" />
                  Dark AMOLED
                </button>
                <button
                  onClick={() => setStyle("cyber_purple")}
                  className={`flex items-center justify-center gap-1.5 rounded-xl py-1.5 px-2 text-xs font-semibold transition-all ${
                    style === "cyber_purple"
                      ? "border-2 border-purple-500 bg-purple-950 text-purple-200 font-bold shadow-sm"
                      : "border border-black/10 bg-zinc-50 text-zinc-700 hover:bg-zinc-100 dark:border-white/10 dark:bg-zinc-800 dark:text-zinc-300"
                  }`}
                >
                  <Zap size={12} className="text-purple-400" />
                  Deep Space
                </button>
                <button
                  onClick={() => setStyle("minimal")}
                  className={`flex items-center justify-center gap-1.5 rounded-xl py-1.5 px-2 text-xs font-semibold transition-all ${
                    style === "minimal"
                      ? "border-2 border-zinc-900 bg-zinc-100 text-zinc-900 font-bold dark:border-white dark:bg-zinc-800 dark:text-white"
                      : "border border-black/10 bg-zinc-50 text-zinc-700 hover:bg-zinc-100 dark:border-white/10 dark:bg-zinc-800 dark:text-zinc-300"
                  }`}
                >
                  <Layers size={12} />
                  Clean Studio
                </button>
              </div>
            </div>

            {/* 3. Custom Upload */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Ảnh chụp app thật
              </label>
              <div className="mt-2 flex items-center gap-2">
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
                  {uploadedImage ? "Thay ảnh khác" : "Tải ảnh thật lên"}
                </button>
                {uploadedImage && (
                  <button
                    onClick={handleResetImage}
                    title="Khôi phục giao diện mẫu"
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-black/10 bg-white text-zinc-500 hover:bg-red-50 hover:text-red-600 dark:border-white/10 dark:bg-zinc-800"
                  >
                    <RotateCcw size={14} />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Preset Slide Selector */}
          <div className="mt-5 border-t border-black/5 pt-4 dark:border-white/10">
            <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
              Chọn nhanh Kịch bản Slide ({currentPresets.length} kịch bản):
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
                Nhãn nổi bật (Badge)
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
            <MobileLayoutRenderer
              layout={layout}
              style={style}
              title={customTitle}
              subtitle={customSubtitle}
              badge={customBadge}
              uploadedImage={uploadedImage}
              scene={activeScene}
              lang={lang}
            />
          )}

          {device === "tv" && (
            <TvLayoutRenderer
              layout={layout}
              style={style}
              title={customTitle}
              subtitle={customSubtitle}
              badge={customBadge}
              uploadedImage={uploadedImage}
              scene={activeScene}
              lang={lang}
            />
          )}

          {device === "wearos" && (
            <WearOsLayoutRenderer
              layout={layout}
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
        <p>Hỗ trợ đầy đủ SVG Icons và 5 kiểu bố trí: Thẻ Nổi SVG, Đa Thiết Bị, Tiêu Đề Trên, Tiêu Đề Dưới, Góc Nghiêng 3D.</p>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 1. MOBILE LAYOUT RENDERER
// ---------------------------------------------------------------------------
function MobileLayoutRenderer({
  layout,
  style,
  title,
  subtitle,
  badge,
  uploadedImage,
  scene,
  lang,
}: {
  layout: LayoutMode;
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
        return "bg-gradient-to-b from-[#ffefe4] via-[#fff7f0] to-[#fceee2] text-zinc-900 border-[#f0cbb5]";
      case "dark_glow":
        return "bg-zinc-950 text-white border-zinc-800 shadow-[0_0_90px_-20px_rgba(234,88,12,0.35)]";
      case "cyber_purple":
        return "bg-gradient-to-b from-[#160b24] via-[#0d0617] to-[#08030e] text-white border-purple-900/40 shadow-[0_0_80px_-20px_rgba(168,85,247,0.3)]";
      case "minimal":
        return "bg-gradient-to-b from-zinc-100 to-zinc-200 text-zinc-900 border-zinc-300";
    }
  };

  const isDark = style === "dark_glow" || style === "cyber_purple";

  // LAYOUT 1: FLOATING FEATURE CARDS (WITH RICH SVG ICONS)
  if (layout === "floating_badges") {
    return (
      <div
        className={`relative w-[420px] sm:w-[470px] h-[820px] rounded-[3rem] border-4 p-6 flex flex-col justify-between overflow-hidden shadow-2xl select-none transition-all ${getContainerStyle()}`}
      >
        {style === "dark_glow" && (
          <div className="pointer-events-none absolute -top-10 left-1/4 h-72 w-72 rounded-full bg-[color:var(--brand)]/20 blur-3xl" />
        )}

        {/* Top Header */}
        <div className="relative z-10 text-center pt-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[color:var(--brand)] px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-sm">
            <Flame size={13} className="text-amber-300" />
            {badge}
          </span>
          <h3 className="mt-3 text-2xl sm:text-3xl font-bold font-display tracking-tight leading-tight">
            {title}
          </h3>
          <p className={`mt-2 text-xs sm:text-sm font-medium px-4 leading-relaxed ${isDark ? "text-zinc-300" : "text-zinc-600"}`}>
            {subtitle}
          </p>
        </div>

        {/* Center Phone + Floating SVG Feature Cards */}
        <div className="relative z-10 mx-auto w-[270px] sm:w-[295px] flex-1 flex flex-col justify-end mt-4">
          {/* Floating Card Left: VirusTotal Safe */}
          <div className="absolute top-12 -left-14 z-30 flex items-center gap-2.5 rounded-2xl bg-zinc-900/95 border border-emerald-500/30 p-2.5 shadow-2xl backdrop-blur text-white ring-1 ring-emerald-500/20">
            <div className="h-8 w-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold shadow-inner">
              <ShieldCheck size={18} />
            </div>
            <div className="text-left">
              <div className="text-[11px] font-bold text-emerald-300 flex items-center gap-1">
                VirusTotal Safe <CheckCheck size={12} />
              </div>
              <div className="text-[8px] text-zinc-400">0/72 Clean Scanned</div>
            </div>
          </div>

          {/* Floating Card Right: Shizuku Silent */}
          <div className="absolute top-36 -right-14 z-30 flex items-center gap-2.5 rounded-2xl bg-zinc-900/95 border border-amber-500/30 p-2.5 shadow-2xl backdrop-blur text-white ring-1 ring-amber-500/20">
            <div className="h-8 w-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold shadow-inner">
              <Zap size={18} />
            </div>
            <div className="text-left">
              <div className="text-[11px] font-bold text-amber-300 flex items-center gap-1">
                Shizuku Active <Zap size={10} className="fill-current" />
              </div>
              <div className="text-[8px] text-zinc-400">Silent Auto-Install</div>
            </div>
          </div>

          {/* Floating Card Bottom: Split APKs */}
          <div className="absolute bottom-16 -left-10 z-30 flex items-center gap-2.5 rounded-2xl bg-zinc-900/95 border border-blue-500/30 p-2.5 shadow-2xl backdrop-blur text-white ring-1 ring-blue-500/20">
            <div className="h-8 w-8 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold shadow-inner">
              <Package size={18} />
            </div>
            <div className="text-left">
              <div className="text-[11px] font-bold text-blue-300">.APKS & .XAPK + OBB</div>
              <div className="text-[8px] text-zinc-400">Auto Split Extraction</div>
            </div>
          </div>

          {/* Phone Bezel */}
          <div className="relative rounded-t-[2.8rem] border-[7px] border-b-0 border-zinc-800 bg-zinc-900 shadow-2xl overflow-hidden aspect-[9/16]">
            <div className="absolute top-2 left-1/2 -translate-x-1/2 z-30 h-4 w-20 rounded-full bg-zinc-950 flex items-center justify-center shadow-inner">
              <div className="h-2 w-2 rounded-full bg-zinc-800 mr-2" />
              <div className="h-1.5 w-1.5 rounded-full bg-blue-900/70" />
            </div>
            {uploadedImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={uploadedImage} alt="Screen" className="h-full w-full object-cover object-top" />
            ) : (
              <MockPhoneUi scene={scene} lang={lang} />
            )}
          </div>
        </div>
      </div>
    );
  }

  // LAYOUT 2: DUAL DEVICES
  if (layout === "dual_multi") {
    return (
      <div
        className={`relative w-[420px] sm:w-[470px] h-[820px] rounded-[3rem] border-4 p-6 flex flex-col justify-between overflow-hidden shadow-2xl select-none transition-all ${getContainerStyle()}`}
      >
        <div className="relative z-10 text-center pt-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[color:var(--brand)] px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-sm">
            <Layers size={13} />
            Phone + Watch Ecosystem
          </span>
          <h3 className="mt-3 text-2xl sm:text-3xl font-bold font-display tracking-tight leading-tight">
            {title}
          </h3>
          <p className={`mt-2 text-xs sm:text-sm font-medium px-4 leading-relaxed ${isDark ? "text-zinc-300" : "text-zinc-600"}`}>
            {subtitle}
          </p>
        </div>

        <div className="relative z-10 mx-auto w-full flex-1 flex items-end justify-center mt-4">
          <div className="relative z-20 w-[240px] sm:w-[260px] translate-x-4 rounded-t-[2.8rem] border-[6px] border-b-0 border-zinc-800 bg-zinc-900 shadow-2xl overflow-hidden aspect-[9/16]">
            {uploadedImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={uploadedImage} alt="Screen" className="h-full w-full object-cover object-top" />
            ) : (
              <MockPhoneUi scene={scene} lang={lang} />
            )}
          </div>

          <div className="absolute -left-2 bottom-12 z-30 flex flex-col items-center">
            <div className="h-44 w-44 rounded-full border-[8px] border-zinc-700 bg-zinc-950 p-1 shadow-[0_20px_40px_rgba(0,0,0,0.8)] overflow-hidden">
              <MockWatchUi lang={lang} />
            </div>
            <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-zinc-900/90 border border-white/20 px-2.5 py-0.5 text-[9px] font-bold text-white shadow">
              <Watch size={10} className="text-cyan-400" /> Wear OS 5 Ready
            </span>
          </div>
        </div>
      </div>
    );
  }

  // LAYOUT 3: BOTTOM CARDS
  if (layout === "bottom_cards") {
    return (
      <div
        className={`relative w-[400px] sm:w-[450px] h-[800px] rounded-[3rem] border-4 p-6 flex flex-col justify-between overflow-hidden shadow-2xl select-none transition-all ${getContainerStyle()}`}
      >
        <div className="relative z-10 mx-auto w-[280px] sm:w-[310px] -mt-4">
          <div className="relative rounded-b-[2.8rem] border-[7px] border-t-0 border-zinc-800 bg-zinc-900 shadow-2xl overflow-hidden h-[450px]">
            {uploadedImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={uploadedImage} alt="Screen" className="h-full w-full object-cover object-top" />
            ) : (
              <MockPhoneUi scene={scene} lang={lang} />
            )}
          </div>
        </div>

        <div className="relative z-20 rounded-3xl border border-black/10 bg-white/85 dark:bg-zinc-900/90 p-5 shadow-2xl backdrop-blur mt-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[color:var(--brand)] px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
            <Sparkles size={11} />
            {badge}
          </span>
          <h3 className="mt-2 text-xl sm:text-2xl font-bold font-display tracking-tight leading-tight text-zinc-900 dark:text-white">
            {title}
          </h3>
          <p className="mt-1.5 text-xs text-zinc-600 dark:text-zinc-300">
            {subtitle}
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {scene.features[lang].map((f, i) => (
              <span key={i} className="inline-flex items-center gap-1.5 rounded-full bg-black/5 dark:bg-white/10 px-2.5 py-1 text-[10px] font-semibold text-zinc-800 dark:text-zinc-200">
                {getFeatureSvgIcon(f)}
                {f}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // LAYOUT 4: ISOMETRIC 3D TILT
  if (layout === "isometric_tilt") {
    return (
      <div
        className={`relative w-[420px] sm:w-[470px] h-[820px] rounded-[3rem] border-4 p-7 flex flex-col justify-between overflow-hidden shadow-2xl select-none transition-all ${getContainerStyle()}`}
      >
        <div className="relative z-10 text-center pt-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[color:var(--brand)] px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-sm">
            <Zap size={12} />
            {badge}
          </span>
          <h3 className="mt-3 text-2xl sm:text-3xl font-bold font-display tracking-tight leading-tight">
            {title}
          </h3>
          <p className={`mt-2 text-xs sm:text-sm font-medium px-4 leading-relaxed ${isDark ? "text-zinc-300" : "text-zinc-600"}`}>
            {subtitle}
          </p>
          <div className="mt-3 flex flex-wrap justify-center gap-1.5">
            {scene.features[lang].map((f, i) => (
              <span key={i} className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-semibold ${isDark ? "bg-white/10 text-zinc-200" : "bg-black/5 text-zinc-700"}`}>
                {getFeatureSvgIcon(f)}
                {f}
              </span>
            ))}
          </div>
        </div>

        <div className="relative z-10 mx-auto w-[270px] sm:w-[295px] flex-1 flex flex-col justify-end mt-4">
          <div className="relative rounded-t-[2.8rem] border-[7px] border-b-0 border-zinc-800 bg-zinc-900 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden aspect-[9/16] rotate-[-5deg] scale-[1.05] translate-x-2">
            {uploadedImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={uploadedImage} alt="Screen" className="h-full w-full object-cover object-top" />
            ) : (
              <MockPhoneUi scene={scene} lang={lang} />
            )}
          </div>
        </div>
      </div>
    );
  }

  // DEFAULT LAYOUT: CLASSIC TOP (WITH RICH SVG ICONS)
  return (
    <div
      className={`relative w-[400px] sm:w-[450px] h-[800px] rounded-[3rem] border-4 p-7 flex flex-col justify-between overflow-hidden shadow-2xl select-none transition-all ${getContainerStyle()}`}
    >
      <div className="relative z-10 text-center pt-2">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[color:var(--brand)] px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-sm">
          <Sparkles size={12} />
          {badge}
        </span>
        <h3 className="mt-3.5 text-2xl sm:text-3xl font-bold font-display tracking-tight leading-tight">
          {title}
        </h3>
        <p className={`mt-2 text-xs sm:text-sm font-medium px-2 leading-relaxed ${isDark ? "text-zinc-300" : "text-zinc-600"}`}>
          {subtitle}
        </p>
        <div className="mt-3 flex flex-wrap justify-center gap-1.5">
          {scene.features[lang].map((f, i) => (
            <span key={i} className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-semibold border ${isDark ? "bg-white/10 text-zinc-200 border-white/10" : "bg-black/5 text-zinc-700 border-black/5"}`}>
              {getFeatureSvgIcon(f)}
              {f}
            </span>
          ))}
        </div>
      </div>

      <div className="relative z-10 mx-auto w-[270px] sm:w-[300px] mt-2 flex-1 flex flex-col justify-end">
        <div className="relative rounded-t-[2.8rem] border-[7px] border-b-0 border-zinc-800 bg-zinc-900 shadow-2xl overflow-hidden aspect-[9/16]">
          {uploadedImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={uploadedImage} alt="Screen" className="h-full w-full object-cover object-top" />
          ) : (
            <MockPhoneUi scene={scene} lang={lang} />
          )}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 2. ANDROID TV LAYOUT RENDERER
// ---------------------------------------------------------------------------
function TvLayoutRenderer({
  layout,
  style,
  title,
  subtitle,
  badge,
  uploadedImage,
  scene,
  lang,
}: {
  layout: LayoutMode;
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
        return "bg-gradient-to-br from-[#1c1008] via-[#26150b] to-[#100905] text-white border-orange-900/40";
      case "dark_glow":
        return "bg-zinc-950 text-white border-zinc-800 shadow-[0_0_100px_-20px_rgba(234,88,12,0.3)]";
      case "cyber_purple":
        return "bg-gradient-to-br from-[#170c28] via-[#0f071c] to-[#080310] text-white border-purple-900/40";
      case "minimal":
        return "bg-zinc-900 text-white border-zinc-700";
    }
  };

  if (layout === "dual_multi" || layout === "floating_badges") {
    return (
      <div
        className={`relative w-[740px] sm:w-[820px] h-[560px] rounded-[3rem] border-4 p-8 flex flex-col justify-between overflow-hidden shadow-2xl select-none transition-all ${getContainerStyle()}`}
      >
        <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[color:var(--brand)] px-3 py-0.5 text-[11px] font-bold uppercase tracking-wider text-white shadow-sm">
              <Share2 size={12} />
              Wireless LAN Sync & Share
            </span>
            <h3 className="mt-2 text-2xl font-bold font-display tracking-tight text-white">
              {title}
            </h3>
            <p className="mt-1 text-xs text-zinc-300">{subtitle}</p>
          </div>

          <div className="flex flex-col gap-1.5 items-end">
            {scene.features[lang].map((feat, idx) => (
              <span key={idx} className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-medium text-zinc-300">
                {getFeatureSvgIcon(feat)}
                {feat}
              </span>
            ))}
          </div>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[620px] flex-1 mt-4 flex items-end justify-center">
          <div className="w-[520px] aspect-[16/9] rounded-xl border-[6px] border-zinc-700 bg-zinc-950 shadow-2xl overflow-hidden relative">
            {uploadedImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={uploadedImage} alt="TV Screen" className="h-full w-full object-cover" />
            ) : (
              <MockTvUi lang={lang} />
            )}
          </div>

          <div className="absolute -right-4 bottom-2 z-30 w-36 rounded-t-2xl border-4 border-b-0 border-zinc-800 bg-zinc-900 shadow-2xl overflow-hidden aspect-[9/16]">
            <MockPhoneUi scene={PRESET_SCENES.mobile[4]} lang={lang} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative w-[720px] sm:w-[800px] h-[540px] rounded-[3rem] border-4 p-8 flex flex-col justify-between overflow-hidden shadow-2xl select-none transition-all ${getContainerStyle()}`}
    >
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
            <span key={idx} className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-medium text-zinc-300">
              {getFeatureSvgIcon(feat)}
              {feat}
            </span>
          ))}
        </div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[590px] flex-1 mt-4 flex flex-col items-center justify-end">
        <div className="w-full aspect-[16/9] rounded-xl border-[6px] border-zinc-700 bg-zinc-950 shadow-2xl overflow-hidden relative">
          {uploadedImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={uploadedImage} alt="TV Screen" className="h-full w-full object-cover" />
          ) : (
            <MockTvUi lang={lang} />
          )}
        </div>
        <div className="h-3 w-32 bg-zinc-600 rounded-b-md shadow-lg" />
        <div className="h-1.5 w-48 bg-zinc-700 rounded-full shadow" />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 3. WEAR OS SMARTWATCH LAYOUT RENDERER
// ---------------------------------------------------------------------------
function WearOsLayoutRenderer({
  layout,
  style,
  title,
  subtitle,
  badge,
  uploadedImage,
  scene,
  lang,
}: {
  layout: LayoutMode;
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
      className={`relative w-[440px] sm:w-[500px] h-[680px] rounded-[3rem] border-4 p-6 flex flex-col justify-between overflow-hidden shadow-2xl select-none transition-all ${getContainerStyle()}`}
    >
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

      <div className="relative z-10 mx-auto my-auto flex items-center justify-center">
        <div className="absolute -top-7 h-9 w-32 bg-zinc-800 rounded-t-2xl shadow-inner border border-zinc-700/50" />
        <div className="absolute -bottom-7 h-9 w-32 bg-zinc-800 rounded-b-2xl shadow-inner border border-zinc-700/50" />
        <div className="absolute -right-3.5 h-11 w-3.5 rounded-r-md bg-zinc-600 border border-zinc-500 shadow-lg" />

        <div className="relative h-68 w-68 rounded-full border-[12px] border-zinc-700 bg-zinc-950 p-2 shadow-2xl flex items-center justify-center overflow-hidden ring-2 ring-zinc-800">
          <div className="relative h-full w-full rounded-full bg-black flex items-center justify-center overflow-hidden">
            {uploadedImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={uploadedImage} alt="Watch Screen" className="h-full w-full object-cover" />
            ) : (
              <MockWatchUi lang={lang} />
            )}
          </div>
        </div>
      </div>

      <div className="relative z-10 flex flex-wrap justify-center gap-2">
        {scene.features[lang].map((f, i) => (
          <span key={i} className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[10px] font-medium text-zinc-300">
            {getFeatureSvgIcon(f)}
            {f}
          </span>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// MOCK UI PREVIEWS
// ---------------------------------------------------------------------------

function MockPhoneUi({ scene, lang }: { scene: PresetScene; lang: Lang }) {
  const isEn = lang === "en";
  return (
    <div className="h-full w-full bg-[#1c1917] p-4 text-white font-sans flex flex-col justify-between pt-8 text-xs">
      <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-lg bg-[color:var(--brand)] flex items-center justify-center font-bold text-[10px] text-white shadow-sm">
            UI
          </div>
          <div>
            <div className="font-bold text-xs leading-none">Universal Installer</div>
            <div className="text-[9px] text-zinc-400 flex items-center gap-1 mt-0.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              v1.8.0 · Shizuku Active
            </div>
          </div>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 px-2 py-0.5 text-[9px] font-bold text-emerald-400">
          <CheckCircle2 size={10} />
          {isEn ? "Ready" : "Sẵn sàng"}
        </span>
      </div>

      <div className="my-auto space-y-3">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-3.5 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold text-orange-400 flex items-center gap-1">
              <Package size={12} />
              {isEn ? "Package Staged" : "Gói đã nạp"}
            </span>
            <span className="text-[10px] text-zinc-400 font-mono">64.8 MB</span>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center shadow-md">
              <Package size={20} className="text-white" />
            </div>
            <div>
              <div className="font-bold text-xs">Spotify_v8.9.xapk</div>
              <div className="text-[10px] text-zinc-400 flex items-center gap-1">
                <HardDrive size={10} />
                {isEn ? "Split APK (4 splits + OBB)" : "Split APK (4 splits + OBB)"}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-1.5 pt-1 text-[9px]">
            <div className="rounded-lg bg-black/40 p-1.5 text-zinc-300 flex items-center gap-1">
              <Cpu size={11} className="text-zinc-500" />
              <span>Android 15 (SDK 35)</span>
            </div>
            <div className="rounded-lg bg-black/40 p-1.5 text-zinc-300 flex items-center gap-1">
              <Layers size={11} className="text-zinc-500" />
              <span>arm64-v8a</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between rounded-xl bg-emerald-950/40 border border-emerald-500/30 px-3 py-2 text-[10px] text-emerald-300">
          <div className="flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-emerald-400" />
            <span>VirusTotal: 0/72 Clean</span>
          </div>
          <span className="font-bold text-emerald-400">{isEn ? "Verified" : "Đã xác minh"}</span>
        </div>
      </div>

      <div className="space-y-1.5 pt-2">
        <button className="w-full h-9 rounded-xl bg-[color:var(--brand)] font-bold text-white flex items-center justify-center gap-1.5 shadow-lg hover:brightness-110 active:scale-[0.99] transition-all">
          <FolderDown size={14} />
          {isEn ? "Install Package" : "Cài đặt gói"}
        </button>
        <div className="text-center text-[9px] text-zinc-500 flex items-center justify-center gap-1">
          <Zap size={10} className="text-amber-400" />
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
          <span className="font-bold text-xs flex items-center gap-1">
            <Tv size={12} /> Universal Installer TV
          </span>
        </div>
        <div className="flex items-center gap-3 text-[10px] text-zinc-400">
          <span className="flex items-center gap-1 font-mono">
            <Wifi size={11} className="text-blue-400" /> 192.168.1.145
          </span>
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 my-auto">
        <div className="rounded-xl border-2 border-[color:var(--brand)] bg-[color:var(--brand)]/15 p-3 flex flex-col justify-between h-24 shadow-lg scale-105">
          <Wifi size={18} className="text-[color:var(--brand)]" />
          <div>
            <div className="font-bold text-xs">{isEn ? "Receive from Phone" : "Nhận từ Điện thoại"}</div>
            <div className="text-[9px] text-zinc-400 font-mono">{isEn ? "PIN: 8492" : "Mã PIN: 8492"}</div>
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-3 flex flex-col justify-between h-24">
          <Package size={18} className="text-zinc-400" />
          <div>
            <div className="font-bold text-xs">{isEn ? "Local APKs" : "APK Đã lưu"}</div>
            <div className="text-[9px] text-zinc-400">{isEn ? "4 packages ready" : "4 file sẵn sàng"}</div>
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-3 flex flex-col justify-between h-24">
          <ShieldCheck size={18} className="text-zinc-400" />
          <div>
            <div className="font-bold text-xs">{isEn ? "Diagnostics" : "Chẩn đoán"}</div>
            <div className="text-[9px] text-emerald-400 flex items-center gap-1">
              <CheckCircle2 size={10} /> Shizuku Active
            </div>
          </div>
        </div>
      </div>

      <div className="text-[9px] text-zinc-500 flex justify-between">
        <span className="flex items-center gap-1">
          <Radio size={10} /> {isEn ? "Remote D-Pad Navigation" : "Điều khiển bằng Remote"}
        </span>
        <span className="font-mono">{isEn ? "Press [OK] to Confirm" : "Bấm [OK] để xác nhận"}</span>
      </div>
    </div>
  );
}

function MockWatchUi({ lang }: { lang: Lang }) {
  const isEn = lang === "en";
  return (
    <div className="h-full w-full bg-black p-4 text-white font-sans flex flex-col items-center justify-between text-center text-[10px] pt-3 pb-3">
      <div className="text-[9px] text-orange-400 font-bold uppercase tracking-wider flex items-center gap-1">
        <Watch size={10} /> Universal Installer
      </div>

      <div className="space-y-1">
        <div className="h-9 w-9 mx-auto rounded-full bg-[color:var(--brand)]/20 border border-[color:var(--brand)] flex items-center justify-center shadow-md">
          <Package size={16} className="text-[color:var(--brand)]" />
        </div>
        <div className="font-bold text-[11px]">Spotify Wear</div>
        <div className="text-[8px] text-zinc-400 font-mono">{isEn ? "12.4 MB · Ready" : "12.4 MB · Sẵn sàng"}</div>
      </div>

      <button className="w-24 h-6 rounded-full bg-[color:var(--brand)] font-bold text-[9px] text-white flex items-center justify-center gap-1 shadow hover:brightness-110">
        <FolderDown size={10} />
        {isEn ? "Install" : "Cài đặt"}
      </button>
    </div>
  );
}
