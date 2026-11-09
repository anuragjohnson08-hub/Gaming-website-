"use client";

import { CarouselCard } from "@/components/carousels/carousel-card";
import { CheckboxCard } from "@/components/checkbox-card";
import { Button } from "@/components/ui/button";
import { useGameFilter } from "@/hooks/use-game-filter";
import {
  filterAndSortGames,
  getAllOutletReviews,
  REVIEW_OUTLETS,
} from "@/lib/games-data";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface CardsListProps {
  platform: string;
  feature: string;
}

export function CardsList({ platform, feature }: CardsListProps) {
  const {
    games,
    selectedGenre,
    selectedOutlet,
    searchQuery,
    sortBy,
    resetFilters,
    openGameModal,
    setOutlet,
  } = useGameFilter();

  const filteredGames = filterAndSortGames(games, {
    genre: selectedGenre,
    outlet: selectedOutlet,
    search: searchQuery,
    platform,
    sortBy,
  });

  if (filteredGames.length === 0) {
    return (
      <div className="rounded-2xl border border-border/75 bg-card p-10 text-center space-y-3">
        <h2 className="text-base font-semibold">No matching games</h2>
        <Button variant="outline" size="sm" onClick={resetFilters}>
          Reset Filters
        </Button>
      </div>
    );
  }

  // Tab 1: Games Catalogue (/apps)
  if (feature === "apps") {
    return (
      <div className="pt-2 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 md:gap-8 xl:gap-10">
          {filteredGames.map((game, index) => (
            <CarouselCard key={game.id} game={game} index={index} />
          ))}
        </div>
      </div>
    );
  }

  // Tab 2: Reviews (/screens)
  if (feature === "screens") {
    const reviewsList = getAllOutletReviews(filteredGames).filter(
      (r) =>
        selectedOutlet === "All Outlets" ||
        r.outlet.toLowerCase() === selectedOutlet.toLowerCase()
    );

    return (
      <div className="pt-2 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 md:gap-8">
          {reviewsList.map((reviewItem, idx) => (
            <CheckboxCard
              key={reviewItem.id}
              id={reviewItem.gameId * 100 + idx}
              reviewItem={reviewItem}
            />
          ))}
        </div>
      </div>
    );
  }

  // Tab 3: Scores (/ui-elements)
  if (feature === "ui-elements") {
    return (
      <div className="pb-16">
        <div className="rounded-2xl border border-border/75 bg-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-border/70 bg-muted/40 text-xs text-muted-foreground">
                <tr>
                  <th className="py-3.5 px-5 font-medium">Game</th>
                  <th className="py-3.5 px-5 font-medium">Genre</th>
                  <th className="py-3.5 px-5 font-medium text-right">
                    Critic Score
                  </th>
                  <th className="py-3.5 px-5 font-medium text-right">
                    Player Score
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {filteredGames.map((game) => (
                  <tr
                    key={game.id}
                    onClick={() => openGameModal(game.id)}
                    className="hover:bg-accent/40 transition-colors cursor-pointer"
                  >
                    <td className="py-3.5 px-5 font-medium">
                      <div className="flex items-center gap-3">
                        <div className="relative size-9 rounded-md overflow-hidden shrink-0 border border-border/60 bg-muted">
                          <Image
                            src={game.coverImage}
                            alt={game.title}
                            fill
                            sizes="36px"
                            className="object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <span>{game.title}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-5 text-xs text-muted-foreground">
                      {game.genre}
                    </td>
                    <td className="py-3.5 px-5 text-right font-mono font-bold tabular-nums text-emerald-800">
                      {game.metaScore}
                    </td>
                    <td className="py-3.5 px-5 text-right font-mono font-semibold tabular-nums text-muted-foreground">
                      {game.userScore}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  // Tab 4: Outlets (/flows)
  const outlets = REVIEW_OUTLETS.filter((o) => o !== "All Outlets");

  return (
    <div className="pb-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {outlets.map((outletName) => {
          const allReviewsForOutlet = getAllOutletReviews(games).filter(
            (r) => r.outlet.toLowerCase() === outletName.toLowerCase()
          );
          const avgScore =
            allReviewsForOutlet.length > 0
              ? Math.round(
                  allReviewsForOutlet.reduce((acc, r) => acc + r.score, 0) /
                    allReviewsForOutlet.length
                )
              : 0;

          return (
            <div
              key={outletName}
              onClick={() => setOutlet(outletName)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setOutlet(outletName);
                }
              }}
              className="rounded-2xl border border-border/75 hover:border-border bg-card p-5 flex items-center justify-between gap-4 cursor-pointer shadow-sm hover:shadow-md transition-all"
            >
              <div>
                <h3 className="text-base font-semibold text-foreground">
                  {outletName}
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {allReviewsForOutlet.length} reviews
                </p>
              </div>
              <span
                className={cn(
                  "font-mono text-sm font-bold tabular-nums px-2.5 py-1 rounded-lg shrink-0",
                  avgScore >= 90
                    ? "bg-emerald-500/15 text-emerald-800"
                    : "bg-amber-500/15 text-amber-800"
                )}
              >
                {avgScore}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
