/**
 * Global 60 FPS animation frame limiter for all devices (including 120Hz/144Hz/240Hz displays).
 */

export const FPS_CAP = 60;
export const FRAME_INTERVAL_MS = 1000 / FPS_CAP; // ~16.6667ms

declare global {
  interface Window {
    __METAPULSE_FPS_CAP__?: number;
  }
}

/**
 * Pure frame-pacing check for deterministic unit testing and rAF scheduling.
 * Uses drift-compensated intervals so 120Hz/240Hz displays fire at most 60 times/sec.
 */
export function shouldRunFrame(
  nowMs: number,
  lastFrameMs: number,
  targetFps: number = FPS_CAP
): { run: boolean; nextLastFrameMs: number } {
  const interval = 1000 / Math.max(1, targetFps);
  if (lastFrameMs <= 0) {
    return { run: true, nextLastFrameMs: nowMs };
  }
  const elapsed = nowMs - lastFrameMs;
  if (elapsed >= interval - 0.5) {
    const drift = elapsed % interval;
    return { run: true, nextLastFrameMs: nowMs - drift };
  }
  return { run: false, nextLastFrameMs: lastFrameMs };
}

/**
 * Wraps window.requestAnimationFrame and window.cancelAnimationFrame on the client
 * so all JS animations, Embla carousels, Framer Motion springs, and canvas loops
 * are capped at 60 FPS across all devices.
 */
export function installGlobalFpsCap(targetFps: number = FPS_CAP): () => void {
  if (typeof window === "undefined") {
    return () => {};
  }

  const nativeRaf = window.requestAnimationFrame.bind(window);
  const nativeCaf = window.cancelAnimationFrame.bind(window);

  window.__METAPULSE_FPS_CAP__ = targetFps;

  let nextHandleId = 1;
  const pendingCallbacks = new Map<number, FrameRequestCallback>();
  let nativeLoopId: number | null = null;
  let lastFrameTime = 0;

  const pump = (timestamp: number) => {
    nativeLoopId = null;

    if (typeof document !== "undefined" && document.visibilityState === "hidden") {
      if (pendingCallbacks.size > 0) {
        nativeLoopId = nativeRaf(pump);
      }
      return;
    }

    const { run, nextLastFrameMs } = shouldRunFrame(
      timestamp,
      lastFrameTime,
      targetFps
    );

    if (run) {
      lastFrameTime = nextLastFrameMs;
      const snapshot = Array.from(pendingCallbacks.entries());
      pendingCallbacks.clear();
      for (const [, cb] of snapshot) {
        try {
          cb(timestamp);
        } catch (err) {
          console.error(err);
        }
      }
    }

    if (pendingCallbacks.size > 0 && nativeLoopId === null) {
      nativeLoopId = nativeRaf(pump);
    }
  };

  window.requestAnimationFrame = (callback: FrameRequestCallback): number => {
    const id = nextHandleId++;
    pendingCallbacks.set(id, callback);
    if (nativeLoopId === null) {
      nativeLoopId = nativeRaf(pump);
    }
    return id;
  };

  window.cancelAnimationFrame = (handle: number): void => {
    pendingCallbacks.delete(handle);
    if (pendingCallbacks.size === 0 && nativeLoopId !== null) {
      nativeCaf(nativeLoopId);
      nativeLoopId = null;
    }
  };

  return () => {
    if (nativeLoopId !== null) {
      nativeCaf(nativeLoopId);
      nativeLoopId = null;
    }
    pendingCallbacks.clear();
    window.requestAnimationFrame = nativeRaf;
    window.cancelAnimationFrame = nativeCaf;
    delete window.__METAPULSE_FPS_CAP__;
  };
}
