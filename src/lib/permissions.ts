/**
 * Plain-language descriptions for the Android permissions people actually worry about when they
 * look inside an APK, plus a risk grade so the analyzer can sort the alarming ones to the top.
 *
 * Not exhaustive by design — anything unlisted is shown with its raw name and no claim attached,
 * which is better than inventing a description for a permission we have not checked.
 */

export type Risk = "high" | "medium" | "low";

export const PERMISSIONS: Record<string, { risk: Risk; desc: string }> = {
  "android.permission.INTERNET": { risk: "low", desc: "Access the internet." },
  "android.permission.ACCESS_NETWORK_STATE": {
    risk: "low",
    desc: "See whether the device is online and on what kind of connection.",
  },
  "android.permission.ACCESS_WIFI_STATE": {
    risk: "low",
    desc: "See Wi-Fi status and the network it is connected to.",
  },
  "android.permission.WAKE_LOCK": { risk: "low", desc: "Keep the device awake." },
  "android.permission.VIBRATE": { risk: "low", desc: "Use the vibration motor." },
  "android.permission.FOREGROUND_SERVICE": {
    risk: "low",
    desc: "Run a visible ongoing task, such as playback or a download.",
  },
  "android.permission.POST_NOTIFICATIONS": { risk: "low", desc: "Show notifications." },
  "android.permission.RECEIVE_BOOT_COMPLETED": {
    risk: "medium",
    desc: "Start automatically when the device boots.",
  },
  "android.permission.CAMERA": { risk: "high", desc: "Take pictures and record video." },
  "android.permission.RECORD_AUDIO": { risk: "high", desc: "Record audio from the microphone." },
  "android.permission.ACCESS_FINE_LOCATION": {
    risk: "high",
    desc: "Read your precise location.",
  },
  "android.permission.ACCESS_COARSE_LOCATION": {
    risk: "medium",
    desc: "Read your approximate location.",
  },
  "android.permission.ACCESS_BACKGROUND_LOCATION": {
    risk: "high",
    desc: "Read your location even when the app is not open.",
  },
  "android.permission.READ_CONTACTS": { risk: "high", desc: "Read your contacts." },
  "android.permission.WRITE_CONTACTS": { risk: "high", desc: "Modify your contacts." },
  "android.permission.READ_SMS": { risk: "high", desc: "Read your text messages." },
  "android.permission.SEND_SMS": {
    risk: "high",
    desc: "Send text messages, which can cost money.",
  },
  "android.permission.RECEIVE_SMS": { risk: "high", desc: "Receive and read incoming texts." },
  "android.permission.READ_CALL_LOG": { risk: "high", desc: "Read who you have called." },
  "android.permission.CALL_PHONE": { risk: "high", desc: "Place calls without asking you." },
  "android.permission.READ_PHONE_STATE": {
    risk: "medium",
    desc: "Read phone status and identifiers such as the network operator.",
  },
  "android.permission.READ_EXTERNAL_STORAGE": {
    risk: "medium",
    desc: "Read files in shared storage.",
  },
  "android.permission.WRITE_EXTERNAL_STORAGE": {
    risk: "medium",
    desc: "Write files to shared storage.",
  },
  "android.permission.MANAGE_EXTERNAL_STORAGE": {
    risk: "high",
    desc: "Read and write every file in shared storage, not just its own.",
  },
  "android.permission.READ_MEDIA_IMAGES": { risk: "medium", desc: "Read your photos." },
  "android.permission.READ_MEDIA_VIDEO": { risk: "medium", desc: "Read your videos." },
  "android.permission.READ_MEDIA_AUDIO": { risk: "medium", desc: "Read your audio files." },
  "android.permission.QUERY_ALL_PACKAGES": {
    risk: "medium",
    desc: "See every app installed on the device.",
  },
  "android.permission.REQUEST_INSTALL_PACKAGES": {
    risk: "high",
    desc: "Install other apps. Expected in an installer or a store; unusual anywhere else.",
  },
  "android.permission.REQUEST_DELETE_PACKAGES": { risk: "medium", desc: "Uninstall other apps." },
  "android.permission.SYSTEM_ALERT_WINDOW": {
    risk: "high",
    desc: "Draw over other apps — the mechanism behind overlay-based scams.",
  },
  "android.permission.BIND_ACCESSIBILITY_SERVICE": {
    risk: "high",
    desc: "Use the accessibility service, which can read and act on anything on screen.",
  },
  "android.permission.PACKAGE_USAGE_STATS": {
    risk: "high",
    desc: "See which apps you use and for how long.",
  },
  "android.permission.BLUETOOTH_CONNECT": { risk: "medium", desc: "Connect to Bluetooth devices." },
  "android.permission.BODY_SENSORS": { risk: "high", desc: "Read body sensors such as heart rate." },
  "android.permission.GET_ACCOUNTS": { risk: "medium", desc: "See the accounts on the device." },
  "android.permission.SCHEDULE_EXACT_ALARM": {
    risk: "low",
    desc: "Schedule alarms that fire at an exact time.",
  },
  "android.permission.USE_EXACT_ALARM": {
    risk: "low",
    desc: "Schedule alarms that fire at an exact time.",
  },
  "android.permission.FOREGROUND_SERVICE_DATA_SYNC": {
    risk: "low",
    desc: "Run a visible background sync.",
  },
};

export function describePermission(name: string): { risk: Risk; desc: string } | null {
  return PERMISSIONS[name] ?? null;
}

/** Short label for a permission we have no description for. */
export function shortName(name: string): string {
  return name.replace(/^android\.permission\./, "").replace(/^com\.android\./, "");
}
