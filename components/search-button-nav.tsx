"use client";

import { useSearchModal } from "@/hooks/use-search-modal";
import { Search } from "lucide-react";

export function SearchButtonNav() {
  const { onOpen } = useSearchModal();

  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label="Search Database (Cmd + K)"
      className="inline-flex items-center gap-2 h-9 px-3 rounded-full border border-white/[0.1] bg-white/[0.03] hover:bg-white/[0.07] hover:border-purple-400/35 text-xs font-medium text-zinc-300 hover:text-white transition-all whitespace-nowrap shrink-0 cursor-pointer"
    >
      <Search className="size-3.5 text-purple-300 shrink-0" />
      <span className="hidden sm:inline">Search Database</span>
      <kbd className="hidden lg:inline-flex items-center rounded border border-white/[0.12] bg-black/50 px-1.5 py-0.5 font-mono text-[10px] text-zinc-400">
        ⌘K
      </kbd>
    </button>
  );
}
