import { NavMenu } from "@/components/nav-menu";
import { SearchButtonNav } from "@/components/search-button-nav";
import { Layers } from "lucide-react";
import Link from "next/link";

export function Navbar() {
  return (
    <header className="z-50 sticky top-0 flex h-16 border-b border-white/[0.08] bg-[#030305]/85 backdrop-blur-md">
      <div className="w-full max-w-[1220px] mx-auto px-4 sm:px-6 flex items-center justify-between gap-4 sm:gap-8">
        {/* Left: Glowing violet geometric logo badge + brand title "Fluid Flow" */}
        <Link
          href="/"
          className="flex items-center gap-2.5 text-sm font-semibold tracking-tight text-white whitespace-nowrap shrink-0 group"
        >
          <span
            aria-hidden="true"
            className="relative flex items-center justify-center size-8 rounded-lg border border-purple-400/40 bg-gradient-to-br from-[#6E2CF4]/45 via-purple-600/30 to-indigo-950/60 shadow-[0_0_20px_rgba(110,44,244,0.5)] group-hover:border-purple-300/70 transition-colors"
          >
            <Layers className="size-4 text-purple-200" />
          </span>
          <span className="text-base font-semibold tracking-tight text-white">
            Fluid Flow
          </span>
        </Link>

        {/* Center: Nav links ("All Games", "Platforms", "Critic Consensus", "Pricing", "About") */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-1 rounded-full border border-white/[0.08] bg-white/[0.02] px-3 py-1"
        >
          <Link
            href="/browse/ios/apps"
            className="px-3.5 py-1.5 rounded-full text-xs font-medium text-zinc-400 hover:text-white hover:bg-white/[0.04] transition-colors whitespace-nowrap shrink-0"
          >
            All Games
          </Link>
          <Link
            href="/#platforms"
            className="px-3.5 py-1.5 rounded-full text-xs font-medium text-zinc-400 hover:text-white hover:bg-white/[0.04] transition-colors whitespace-nowrap shrink-0"
          >
            Platforms
          </Link>
          <Link
            href="/#critic-consensus"
            className="px-3.5 py-1.5 rounded-full text-xs font-medium text-zinc-400 hover:text-white hover:bg-white/[0.04] transition-colors whitespace-nowrap shrink-0"
          >
            Critic Consensus
          </Link>
          <Link
            href="/#pricing"
            className="px-3.5 py-1.5 rounded-full text-xs font-medium text-zinc-400 hover:text-white hover:bg-white/[0.04] transition-colors whitespace-nowrap shrink-0"
          >
            Pricing
          </Link>
          <Link
            href="/#about"
            className="px-3.5 py-1.5 rounded-full text-xs font-medium text-zinc-400 hover:text-white hover:bg-white/[0.04] transition-colors whitespace-nowrap shrink-0"
          >
            About
          </Link>
        </nav>

        {/* Right: "Search Database" quick-trigger (Cmd + K) and solid pill button "Join Fluid Flow" */}
        <div className="flex items-center justify-end gap-2.5 shrink-0">
          <SearchButtonNav />
          <Link
            href="/#join-stream"
            className="inline-flex items-center justify-center h-9 px-4 rounded-full border border-purple-400/40 bg-purple-600/35 hover:bg-purple-600/55 text-xs font-semibold text-white shadow-[0_0_22px_rgba(139,92,246,0.4)] transition-all whitespace-nowrap shrink-0"
          >
            Join Fluid Flow
          </Link>
          <NavMenu />
        </div>
      </div>
    </header>
  );
}
