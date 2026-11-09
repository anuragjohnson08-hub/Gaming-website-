"use client";

import { CarouselButtonsTags } from "@/components/carousels/carousel-buttons-tags";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useGameFilter } from "@/hooks/use-game-filter";
import { useSearchModal } from "@/hooks/use-search-modal";
import { SortOption } from "@/lib/games-data";

export function TagsList() {
  const searchModal = useSearchModal();
  const { sortBy, setSortBy, selectedOutlet, setOutlet } = useGameFilter();

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <Button
          size="sm"
          variant="secondary"
          onClick={searchModal.onOpen}
          className="max-md:hidden rounded-lg whitespace-nowrap shrink-0 h-9 px-3.5"
        >
          <Icons.settings2 className="size-4 mr-2" />
          <span>Search &amp; Filter</span>
        </Button>

        <Separator orientation="vertical" className="max-md:hidden h-6" />

        <div className="flex-grow overflow-hidden">
          <CarouselButtonsTags />
        </div>

        {/* Sort & Outlet Selectors */}
        <div className="hidden lg:flex items-center gap-2 shrink-0">
          <label htmlFor="outlet-filter-select" className="sr-only">
            Filter by Outlet
          </label>
          <select
            id="outlet-filter-select"
            aria-label="Filter by Outlet"
            value={selectedOutlet}
            onChange={(e) => setOutlet(e.target.value)}
            className="h-9 px-3 rounded-lg border border-border bg-card text-xs font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="All Outlets">All Outlets</option>
            <option value="IGN">IGN Reviewed</option>
            <option value="GameSpot">GameSpot Reviewed</option>
            <option value="PC Gamer">PC Gamer Reviewed</option>
            <option value="Eurogamer">Eurogamer Reviewed</option>
            <option value="Steam">Steam Consensus</option>
            <option value="OpenCritic">OpenCritic Indexed</option>
          </select>

          <label htmlFor="sort-games-select" className="sr-only">
            Sort Games
          </label>
          <select
            id="sort-games-select"
            aria-label="Sort Games"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="h-9 px-3 rounded-lg border border-border bg-card text-xs font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="metaScore">Sort: Critic MetaScore</option>
            <option value="userScore">Sort: Player Consensus</option>
            <option value="reviews">Sort: Most Reviewed</option>
            <option value="recent">Sort: Release Year</option>
          </select>
        </div>
      </div>
    </div>
  );
}
