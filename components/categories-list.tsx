"use client";

import { useGameFilter } from "@/hooks/use-game-filter";
import { SortOption } from "@/lib/games-data";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

interface LinksProps {
  name: string;
  path: string;
  code: string;
}

const links: LinksProps[] = [
  { name: "Games", path: "/apps", code: "01" },
  { name: "Reviews", path: "/screens", code: "02" },
  { name: "Scores", path: "/ui-elements", code: "03" },
  { name: "Outlets", path: "/flows", code: "04" },
];

const PLATFORM_LABELS: Record<string, string> = {
  ios: "ALL PLATFORMS ARCHIVE",
  android: "PC & CONSOLE RELEASES",
  web: "HANDHELD & STEAM DECK VERIFIED",
};

export function CategoriesList() {
  const pathname = usePathname();
  const params = useParams<{ platform?: string }>();
  const platform = params?.platform || "ios";
  const { games, sortBy, setSortBy, selectedOutlet, setOutlet } =
    useGameFilter();

  const totalCriticReviews = games.reduce(
    (sum, g) => sum + g.totalCriticReviews,
    0
  );

  return (
    <div className="space-y-5 pb-4 border-b border-white/[0.08]">
      {/* Asymmetric Editorial Masthead for Browse Catalogue */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 tabular-nums">
            <span className="text-white font-semibold">01 /</span>
            <span>{PLATFORM_LABELS[platform] || "REVIEW CATALOGUE"}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
            Indexed Releases &amp; Critic Consensus
          </h1>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono text-zinc-400 tabular-nums">
          <span>
            <strong className="text-white">{games.length}</strong> RELEASES
          </span>
          <span aria-hidden="true" className="text-zinc-600">
            /
          </span>
          <span>
            <strong className="text-white">{totalCriticReviews}</strong>{" "}
            VERDICTS
          </span>
          <span aria-hidden="true" className="text-zinc-600">
            /
          </span>
          <span>0–100 SCALE</span>
        </div>
      </div>

      {/* Segmented Control Tab Bar + Monospace Filter & Sort Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div
          role="navigation"
          aria-label="Catalogue view switcher"
          className="inline-flex items-center p-1 rounded-md border border-white/[0.08] bg-[#12151e] overflow-x-auto scrollbar-none"
        >
          {links.map((link) => {
            const targetHref = `/browse/${platform}${link.path}`;
            const isActive =
              pathname === targetHref ||
              (pathname === "/" && link.path === "/apps");
            return (
              <Link
                key={link.path}
                href={targetHref}
                className={cn(
                  "relative flex items-center gap-1.5 whitespace-nowrap shrink-0 px-3 py-1.5 rounded-[5px] text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  isActive
                    ? "text-white"
                    : "text-zinc-400 hover:text-zinc-200"
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="browse-categories-active-tab"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 32,
                    }}
                    className="absolute inset-0 rounded-[5px] bg-[#181c28] border border-white/[0.12]"
                  />
                )}
                <span className="relative z-10 font-mono text-[10px] text-zinc-500 tabular-nums">
                  {link.code}
                </span>
                <span className="relative z-10">{link.name}</span>
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <label htmlFor="outlet-filter-select" className="sr-only">
            Filter by Outlet
          </label>
          <select
            id="outlet-filter-select"
            aria-label="Filter by Outlet"
            value={selectedOutlet}
            onChange={(e) => setOutlet(e.target.value)}
            className="h-8 px-2.5 rounded-md border border-white/[0.08] bg-[#12151e] font-mono text-xs text-zinc-200 focus:outline-none focus:border-white/25"
          >
            <option value="All Outlets">All Outlets</option>
            <option value="IGN">IGN</option>
            <option value="GameSpot">GameSpot</option>
            <option value="PC Gamer">PC Gamer</option>
            <option value="Eurogamer">Eurogamer</option>
            <option value="Steam">Steam</option>
            <option value="OpenCritic">OpenCritic</option>
          </select>

          <label htmlFor="sort-games-select" className="sr-only">
            Sort Games
          </label>
          <select
            id="sort-games-select"
            aria-label="Sort Games"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="h-8 px-2.5 rounded-md border border-white/[0.08] bg-[#12151e] font-mono text-xs text-zinc-200 focus:outline-none focus:border-white/25"
          >
            <option value="metaScore">Top Rated</option>
            <option value="userScore">Player Score</option>
            <option value="reviews">Most Reviewed</option>
            <option value="recent">Release Year</option>
          </select>
        </div>
      </div>
    </div>
  );
}
