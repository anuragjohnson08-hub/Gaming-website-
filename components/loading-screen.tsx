"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface LoadingScreenProps {
  label?: string;
  className?: string;
  fullScreen?: boolean;
}

export function LoadingScreen({
  label = "Loading",
  className,
  fullScreen = true,
}: LoadingScreenProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading MetaPulse"
      className={cn(
        "flex flex-col items-center justify-center bg-[#090a0f] text-white",
        fullScreen ? "fixed inset-0 z-[100]" : "min-h-[60vh] w-full rounded-lg",
        className
      )}
    >
      <div className="loader" aria-hidden="true">
        {Array.from({ length: 9 }).map((_, idx) => (
          <div key={idx} className="text">
            <span>{label}</span>
          </div>
        ))}
        <div className="line" />
      </div>
      <span className="sr-only">Loading MetaPulse Review Catalogue...</span>
    </div>
  );
}
