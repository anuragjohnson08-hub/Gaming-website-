"use client";

import { useEffect } from "react";
import { FPS_CAP, installGlobalFpsCap } from "@/lib/fps-limiter";

export function FpsCapProvider() {
  useEffect(() => {
    const cleanup = installGlobalFpsCap(FPS_CAP);
    return cleanup;
  }, []);

  return null;
}
