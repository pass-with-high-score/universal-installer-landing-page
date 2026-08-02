"use client";

import { useCallback, useRef, useState } from "react";
import {
  Upload,
  FileArchive,
  AlertTriangle,
  ShieldAlert,
  Info,
  Loader2,
  X,
} from "lucide-react";
import { describePermission, shortName, type Risk } from "@/lib/permissions";

type Result = {
  appName: string;
  packageName: string;
  versionName: string;
  versionCode: string;
  minSdk: string;
  targetSdk: string;
  permissions: string[];
  abis: string[];
  splits: string[];
  fileName: string;
  fileSize: number;
  icon?: string;
};

const RISK_ORDER: Record<Risk, number> = { high: 0, medium: 1, low: 2 };

function formatBytes(n: number): string {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  if (n < 1024 * 1024 * 1024) return `${(n / 1024 / 1024).toFixed(1)} MB`;
  return `${(n / 1024 / 1024 / 1024).toFixed(2)} GB`;
}

/**
 * Reads an APK entirely in the browser — nothing is uploaded. app-info-parser does the zip and
 * binary-manifest work; everything below is presentation plus the bits it does not surface
 * (ABIs and split names, which we read off the entry list ourselves).
 */
export default function ApkAnalyzer() {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const analyze = useCallback(async (file: File) => {
    setBusy(true);
    setError(null);
    setResult(null);
    try {
      // Imported lazily so the parser is not in the initial bundle for people who only read.
      // The APK entry point specifically — the package root also loads the IPA parser, which
      // needs Node's `fs` and will not build for the browser.
      const [{ default: ApkParser }, { unzipSync }] = await Promise.all([
        import("app-info-parser/src/apk"),
        import("fflate"),
      ]);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const info: any = await new ApkParser(file).parse();

      const perms: string[] = Array.isArray(info.usesPermissions)
        ? info.usesPermissions
            .map((p: unknown) =>
              typeof p === "string" ? p : (p as { name?: string })?.name ?? "",
            )
            .filter(Boolean)
        : [];

      // Entry names only. fflate's filter runs for every entry and skipping decompression
      // (returning false) means we read the archive index without inflating hundreds of MB.
      const entries: string[] = [];
      unzipSync(new Uint8Array(await file.arrayBuffer()), {
        filter: (f) => {
          entries.push(f.name);
          return false;
        },
      });

      const abis = Array.from(
        new Set(
          entries
            .map((e) => /^lib\/([^/]+)\//.exec(e)?.[1])
            .filter((v): v is string => Boolean(v)),
        ),
      ).sort();
      const splits = entries
        .filter((e) => /^[^/]+\.apk$/i.test(e))
        .sort();

      setResult({
        appName: info.application?.label?.[0] ?? info.label ?? file.name,
        packageName: info.package ?? "unknown",
        versionName: info.versionName ?? "—",
        versionCode: String(info.versionCode ?? "—"),
        minSdk: String(info.usesSdk?.minSdkVersion ?? "—"),
        targetSdk: String(info.usesSdk?.targetSdkVersion ?? "—"),
        permissions: perms,
        abis,
        splits,
        fileName: file.name,
        fileSize: file.size,
        icon: typeof info.icon === "string" ? info.icon : undefined,
      });
    } catch (e) {
      setError(
        e instanceof Error && e.message
          ? `Could not read that file: ${e.message}`
          : "Could not read that file. Is it a valid APK?",
      );
    } finally {
      setBusy(false);
    }
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      const file = e.dataTransfer.files?.[0];
      if (file) analyze(file);
    },
    [analyze],
  );

  const sortedPerms = result
    ? [...result.permissions].sort((a, b) => {
        const ra = describePermission(a)?.risk ?? "low";
        const rb = describePermission(b)?.risk ?? "low";
        return RISK_ORDER[ra] - RISK_ORDER[rb] || a.localeCompare(b);
      })
    : [];

  return (
    <div>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
        }}
        className={`flex cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed px-6 py-12 text-center transition-colors ${
          dragging
            ? "border-[color:var(--brand)] bg-[color:var(--brand)]/5"
            : "border-black/15 hover:border-black/30 dark:border-white/20 dark:hover:border-white/35"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".apk,.apks,.xapk,.apkm,application/vnd.android.package-archive"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) analyze(f);
          }}
        />
        {busy ? (
          <>
            <Loader2 size={28} aria-hidden className="animate-spin text-[color:var(--brand)]" />
            <p className="mt-3 font-medium text-zinc-700 dark:text-zinc-200">Reading…</p>
          </>
        ) : (
          <>
            <Upload size={28} aria-hidden className="text-[color:var(--brand)]" />
            <p className="mt-3 font-semibold text-zinc-900 dark:text-white">
              Drop an APK here, or tap to choose one
            </p>
            <p className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400">
              APK, APKS, XAPK and APKM. The file never leaves your device.
            </p>
          </>
        )}
      </div>

      {error && (
        <div className="mt-4 flex items-start gap-2.5 rounded-2xl border border-red-500/20 bg-red-50 p-4 text-sm text-red-800 dark:border-red-400/20 dark:bg-red-500/10 dark:text-red-200">
          <AlertTriangle size={16} aria-hidden className="mt-0.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {result && (
        <div className="mt-6">
          <div className="flex items-start justify-between gap-4 rounded-3xl border border-black/5 bg-white p-5 sm:p-6 dark:border-white/10 dark:bg-white/5">
            <div className="flex min-w-0 items-start gap-4">
              {result.icon ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={result.icon}
                  alt=""
                  className="h-14 w-14 shrink-0 rounded-2xl"
                />
              ) : (
                <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-black/5 dark:bg-white/10">
                  <FileArchive size={22} aria-hidden />
                </span>
              )}
              <div className="min-w-0">
                <h2 className="truncate text-lg font-semibold text-zinc-900 dark:text-white">
                  {result.appName}
                </h2>
                <p className="truncate font-mono text-xs text-zinc-500 dark:text-zinc-400">
                  {result.packageName}
                </p>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
                  {result.versionName} ({result.versionCode}) ·{" "}
                  {formatBytes(result.fileSize)}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setResult(null)}
              aria-label="Clear"
              className="shrink-0 rounded-full p-1.5 text-zinc-400 hover:bg-black/5 dark:hover:bg-white/10"
            >
              <X size={18} aria-hidden />
            </button>
          </div>

          <dl className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Fact label="Min Android" value={sdkLabel(result.minSdk)} />
            <Fact label="Targets" value={sdkLabel(result.targetSdk)} />
            <Fact
              label="Architectures"
              value={result.abis.length ? result.abis.join(", ") : "None (no native code)"}
            />
            <Fact
              label="Splits"
              value={result.splits.length ? String(result.splits.length) : "Single APK"}
            />
          </dl>

          <section className="mt-6">
            <h3 className="text-lg font-semibold tracking-tight text-zinc-900 font-display dark:text-white">
              Permissions ({sortedPerms.length})
            </h3>
            {sortedPerms.length === 0 ? (
              <p className="mt-2 text-zinc-600 dark:text-zinc-300">
                This package declares no permissions.
              </p>
            ) : (
              <ul className="mt-3 flex flex-col gap-2">
                {sortedPerms.map((p) => {
                  const known = describePermission(p);
                  return (
                    <li
                      key={p}
                      className="rounded-2xl border border-black/5 bg-white p-3.5 dark:border-white/10 dark:bg-white/5"
                    >
                      <div className="flex items-start gap-2.5">
                        {known?.risk === "high" ? (
                          <ShieldAlert
                            size={16}
                            aria-hidden
                            className="mt-0.5 shrink-0 text-red-500"
                          />
                        ) : (
                          <Info
                            size={16}
                            aria-hidden
                            className="mt-0.5 shrink-0 text-zinc-400"
                          />
                        )}
                        <div className="min-w-0">
                          <p className="font-medium break-words text-zinc-900 dark:text-white">
                            {shortName(p)}
                          </p>
                          {known ? (
                            <p className="text-sm text-zinc-600 dark:text-zinc-300">
                              {known.desc}
                            </p>
                          ) : (
                            <p className="font-mono text-xs break-all text-zinc-500 dark:text-zinc-400">
                              {p}
                            </p>
                          )}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>

          {result.splits.length > 0 && (
            <section className="mt-6">
              <h3 className="text-lg font-semibold tracking-tight text-zinc-900 font-display dark:text-white">
                Bundle contents
              </h3>
              <ul className="mt-2 flex flex-wrap gap-2">
                {result.splits.map((s) => (
                  <li
                    key={s}
                    className="rounded-full border border-black/5 bg-white px-3 py-1 font-mono text-xs text-zinc-600 dark:border-white/10 dark:bg-white/5 dark:text-zinc-300"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      )}
    </div>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-black/5 bg-white p-3.5 dark:border-white/10 dark:bg-white/5">
      <dt className="text-xs font-medium tracking-wide text-zinc-500 dark:text-zinc-400">
        {label}
      </dt>
      <dd className="mt-1 text-sm font-semibold break-words text-zinc-900 dark:text-white">
        {value}
      </dd>
    </div>
  );
}

/** API level alone means nothing to most people; pair it with the Android version. */
const ANDROID_VERSIONS: Record<string, string> = {
  "21": "5.0", "22": "5.1", "23": "6.0", "24": "7.0", "25": "7.1", "26": "8.0",
  "27": "8.1", "28": "9", "29": "10", "30": "11", "31": "12", "32": "12L",
  "33": "13", "34": "14", "35": "15", "36": "16",
};

function sdkLabel(sdk: string): string {
  const v = ANDROID_VERSIONS[sdk];
  return v ? `Android ${v} (API ${sdk})` : sdk === "—" ? "—" : `API ${sdk}`;
}
