"use client";

import { useGameFilter } from "@/hooks/use-game-filter";
import { SortOption } from "@/lib/games-data";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

interface LinksProps {
  name: string;
  path: string;
}

const links: LinksProps[] = [
  { name: "Games", path: "/apps" },
  { name: "Reviews", path: "/screens" },
  { name: "Scores", path: "/ui-elements" },
  { name: "Outlets", path: "/flows" },
];

export function CategoriesList() {
  const pathname = usePathname();
  const params = useParams<{ platform?: string }>();
  const platform = params?.platform || "ios";
  const { sortBy, setSortBy, selectedOutlet, setOutlet } = useGameFilter();

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-2">
      <div className="flex items-center gap-x-6 scrollbar-none overflow-x-auto">
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
                "flex items-center whitespace-nowrap shrink-0 py-2 text-sm font-medium border-b-2 -mb-[9px] transition-colors ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                isActive
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              <span>{link.name}</span>
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
          className="h-8 px-2.5 rounded-lg border border-border/80 bg-card/90 text-xs font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
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
          className="h-8 px-2.5 rounded-lg border border-border/80 bg-card/90 text-xs font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="metaScore">Top Rated</option>
          <option value="userScore">Player Score</option>
          <option value="reviews">Most Reviewed</option>
          <option value="recent">Release Year</option>
        </select>
      </div>
    </div>
  );
}
