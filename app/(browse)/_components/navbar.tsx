import { NavLinks } from "@/components/nav-links";
import { NavMenu } from "@/components/nav-menu";
import { SearchButtonNav } from "@/components/search-button-nav";
import Link from "next/link";

export function Navbar() {
  return (
    <header className="z-50 sticky top-0 flex h-[72px] border-b border-border/70 bg-background/95">
      <div className="w-full flex items-center justify-between gap-8 marge-x">
        {/* Zone 1: Single text element wordmark */}
        <Link
          href="/browse/ios/apps"
          className="text-lg font-semibold tracking-tight text-foreground whitespace-nowrap shrink-0"
        >
          MetaPulse
        </Link>

        {/* Zone 2: 4-5 concise single-line text navigation links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-6"
        >
          <NavLinks />
          <Link
            href="/collections"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap shrink-0"
          >
            Outlets Directory
          </Link>
          <Link
            href="/pricing"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap shrink-0"
          >
            Scoring Index
          </Link>
        </nav>

        {/* Zone 3: Expandable Navbar Search Pill + Menu */}
        <div className="flex items-center justify-end gap-3 shrink-0">
          <SearchButtonNav />
          <NavMenu />
        </div>
      </div>
    </header>
  );
}
