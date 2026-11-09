"use client";

import { useGameFilter } from "@/hooks/use-game-filter";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";

export interface NavbarSearchPillProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
  className?: string;
  enableGlobalShortcut?: boolean;
}

const SLIDE_SPRING = {
  type: "spring" as const,
  stiffness: 340,
  damping: 30,
  mass: 0.9,
};

export const NavbarSearchPill: React.FC<NavbarSearchPillProps> = ({
  onSearch,
  placeholder = "Search games, outlets, genres...",
  className,
  enableGlobalShortcut = false,
}) => {
  const { searchQuery, setSearchQuery } = useGameFilter();
  const [isExpanded, setIsExpanded] = useState(false);
  const [localQuery, setLocalQuery] = useState(searchQuery || "");
  const [slideOffset, setSlideOffset] = useState<{
    x: number;
    y: number;
    width: number;
  }>({
    x: -240,
    y: 62,
    width: 380,
  });

  const anchorRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sync local input state with external store changes
  useEffect(() => {
    setLocalQuery(searchQuery);
  }, [searchQuery]);

  // Measure the exact translation delta from the navbar slot to the top-center below the navbar
  const updateTargetTrajectory = useCallback(() => {
    if (!anchorRef.current || typeof window === "undefined") return;
    const rect = anchorRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const targetWidth = Math.min(420, Math.max(280, viewportWidth - 32));
    const targetLeft = (viewportWidth - targetWidth) / 2;
    // Target Y sits centered just below the 72px navbar (around 80px from top of viewport)
    const targetTop = 80;

    setSlideOffset({
      x: Math.round(targetLeft - rect.left),
      y: Math.round(targetTop - rect.top),
      width: Math.round(targetWidth),
    });
  }, []);

  useEffect(() => {
    updateTargetTrajectory();
    window.addEventListener("resize", updateTargetTrajectory);
    return () => window.removeEventListener("resize", updateTargetTrajectory);
  }, [updateTargetTrajectory]);

  const handleExpand = useCallback(() => {
    updateTargetTrajectory();
    setIsExpanded(true);
  }, [updateTargetTrajectory]);

  const handleCollapse = useCallback(() => {
    inputRef.current?.blur();
    setIsExpanded(false);
  }, []);

  // Auto-focus input as it slides into position
  useEffect(() => {
    if (isExpanded) {
      const timer = window.setTimeout(() => {
        inputRef.current?.focus();
      }, 60);
      return () => window.clearTimeout(timer);
    }
  }, [isExpanded]);

  const handleQueryChange = useCallback(
    (value: string) => {
      setLocalQuery(value);
      setSearchQuery(value);
      onSearch?.(value);
    },
    [onSearch, setSearchQuery]
  );

  const handleClear = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      handleQueryChange("");
      inputRef.current?.focus();
    },
    [handleQueryChange]
  );

  // Global Cmd+K / Ctrl+K listener to slide open and focus
  useEffect(() => {
    if (!enableGlobalShortcut) return;

    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isExpanded) {
          handleCollapse();
        } else {
          handleExpand();
        }
      }
    };

    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, [enableGlobalShortcut, isExpanded, handleExpand, handleCollapse]);

  // Collapse back to navbar position when clicking outside
  useEffect(() => {
    if (!isExpanded) return;

    const handlePointerDownOutside = (e: PointerEvent) => {
      const target = e.target as Node;
      if (
        pillRef.current &&
        !pillRef.current.contains(target) &&
        anchorRef.current &&
        !anchorRef.current.contains(target)
      ) {
        handleCollapse();
      }
    };

    document.addEventListener("pointerdown", handlePointerDownOutside);
    return () =>
      document.removeEventListener("pointerdown", handlePointerDownOutside);
  }, [isExpanded, handleCollapse]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      e.preventDefault();
      e.stopPropagation();
      handleCollapse();
    } else if (e.key === "Enter") {
      e.preventDefault();
      inputRef.current?.blur();
    }
  };

  return (
    <div
      ref={anchorRef}
      className={cn("relative h-9 w-9 shrink-0", className)}
    >
      {/* Subtle ghost ring in navbar slot while the pill is slid down */}
      <button
        type="button"
        tabIndex={isExpanded ? 0 : -1}
        aria-hidden={!isExpanded}
        aria-label="Close search bar and return to navbar"
        onClick={() => {
          if (isExpanded) handleCollapse();
        }}
        className={cn(
          "absolute inset-0 rounded-full border border-dashed border-foreground/20 transition-opacity duration-200",
          isExpanded
            ? "opacity-100 cursor-pointer hover:border-foreground/40"
            : "opacity-0 pointer-events-none"
        )}
      />

      <motion.div
        ref={pillRef}
        initial={false}
        animate={{
          x: isExpanded ? slideOffset.x : 0,
          y: isExpanded ? slideOffset.y : 0,
          width: isExpanded ? slideOffset.width : 36,
          height: isExpanded ? 42 : 36,
        }}
        transition={SLIDE_SPRING}
        onClick={() => {
          if (!isExpanded) {
            handleExpand();
          } else {
            inputRef.current?.focus();
          }
        }}
        role="search"
        data-expanded={isExpanded}
        aria-label="Expandable catalog search"
        style={{ borderRadius: 9999 }}
        className={cn(
          "absolute top-0 left-0 z-50 flex items-center overflow-hidden rounded-full border border-white/15 bg-neutral-900/95 backdrop-blur-md text-white transition-shadow",
          isExpanded
            ? "px-3.5 shadow-xl ring-1 ring-white/10"
            : "justify-center cursor-pointer shadow-sm hover:border-white/30"
        )}
      >
        <motion.div
          layout="position"
          transition={SLIDE_SPRING}
          className="flex items-center justify-center shrink-0 text-white/80"
        >
          <Search className="size-4" aria-hidden="true" />
        </motion.div>

        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              key="search-input-container"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.16, ease: "easeOut" }}
              className="flex flex-1 items-center gap-2 pl-2.5 min-w-0"
            >
              <input
                ref={inputRef}
                type="text"
                value={localQuery}
                onChange={(e) => handleQueryChange(e.target.value)}
                onKeyDown={handleKeyDown}
                onClick={(e) => e.stopPropagation()}
                placeholder={placeholder}
                aria-label={placeholder}
                className="w-full flex-1 bg-transparent text-xs sm:text-sm text-white placeholder:text-white/45 focus:outline-none min-w-0"
              />

              <AnimatePresence initial={false}>
                {localQuery.length > 0 && (
                  <motion.button
                    key="clear-button"
                    type="button"
                    initial={{ opacity: 0, scale: 0.75 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.75 }}
                    transition={{ duration: 0.12 }}
                    onClick={handleClear}
                    aria-label="Clear search query"
                    className="flex size-4 shrink-0 items-center justify-center rounded-full bg-white/15 text-white/80 hover:bg-white/25 hover:text-white transition-colors"
                  >
                    <X className="size-2.5" />
                  </motion.button>
                )}
              </AnimatePresence>

              <motion.kbd
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleCollapse();
                }}
                title="Close search and slide back"
                className="shrink-0 cursor-pointer select-none rounded border border-white/15 bg-white/10 px-1.5 py-0.5 font-mono text-[10px] leading-none text-white/70 hover:bg-white/20 hover:text-white transition-colors"
              >
                ESC
              </motion.kbd>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export const Skiper3 = NavbarSearchPill;

/**
 * Skiper 3 Micro-Interaction — Refactored as Sliding Expandable Navbar Search Pill
 * Inspired by and adapted from https://skiper-ui.com
 * Author: @gurvinder-singh02
 * License: Attribution required — retain this comment block in source.
 */
