"use client";

import { useEffect } from "react";
import { getAnalytics, isSupported } from "firebase/analytics";
import { app } from "@/lib/firebase";

export default function FirebaseAnalytics() {
  useEffect(() => {
    // Only initialize analytics on the client and if supported
    if (process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
      isSupported().then((supported) => {
        if (supported) {
          getAnalytics(app);
        }
      });
    }
  }, []);

  return null;
}
