"use client";

import { computeScrollFadeState } from "@/lib/scroll-fade";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef } from "react";

const observedElements = new Set<HTMLElement>();
let sharedObserver: IntersectionObserver | null = null;

function getSharedObserver(): IntersectionObserver | null {
  if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
    return null;
  }
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        const vh = window.innerHeight || 900;
        for (const entry of entries) {
          const target = entry.target as HTMLElement;
          const nextState = computeScrollFadeState(
            entry.boundingClientRect,
            vh,
            0.06
          );
          if (target.dataset.scrollState !== nextState) {
            target.dataset.scrollState = nextState;
          }
        }
      },
      {
        root: null,
        rootMargin: "-4% 0px -4% 0px",
        threshold: [0, 0.06, 0.15, 0.85, 0.94, 1],
      }
    );
  }
  return sharedObserver;
}

interface ScrollFadeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  delayMs?: number;
  as?: "div" | "section" | "article";
}

/**
 * Lightweight scroll fade wrapper that fades content in as it enters
 * the viewport and fades it out as it scrolls past the top or bottom edge,
 * driven by IntersectionObserver without per-frame layout reads.
 */
export function ScrollFade({
  children,
  className,
  delayMs = 0,
  as: Component = "div",
  style,
  ...rest
}: ScrollFadeProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    observedElements.add(node);
    const observer = getSharedObserver();
    observer?.observe(node);

    return () => {
      observedElements.delete(node);
      observer?.unobserve(node);
    };
  }, []);

  return (
    <Component
      ref={ref as React.RefObject<HTMLDivElement>}
      data-scroll-state="visible"
      style={
        delayMs > 0
          ? { transitionDelay: `${Math.min(delayMs, 180)}ms`, ...style }
          : style
      }
      className={cn("scroll-fade-block", className)}
      {...rest}
    >
      {children}
    </Component>
  );
}
