"use client";

import { NavbarSearchPill } from "@/components/skiper3";

export function SearchButtonNav() {
  return (
    <NavbarSearchPill
      enableGlobalShortcut
      placeholder="Search games, outlets, genres..."
    />
  );
}
