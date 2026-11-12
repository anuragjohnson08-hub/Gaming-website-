"use client";

import { CarouselCard } from "@/components/carousels/carousel-card";
import { CheckboxCard } from "@/components/checkbox-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useGameFilter } from "@/hooks/use-game-filter";
import {
  filterAndSortGames,
  getAllOutletReviews,
  getOutletMonogram,
  getScoreTier,
  REVIEW_OUTLETS,
} from "@/lib/games-data";
import Image from "next/image";
import { useEffect } from "react";

interface CardsListProps {
  platform: string;
  feature: string;
  isLoading?: boolean;
}

export function GameCardSkeleton() {
  return (
    <div
      data-testid="game-card-skeleton"
      aria-hidden="true"
      className="flex flex-col rounded-lg border border-white/[0.08] bg-[#12151e] overflow-hidden"
    >
      <Skeleton className="aspect-[16/10] w-full rounded-none bg-[#181c28]" />
      <div className="px-4 py-3.5 flex items-center justify-between gap-4">
        <div className="min-w-0 flex-1 space-y-2">
          <Skeleton className="h-4 w-3/4 rounded-sm bg-[#181c28]" />
          <Skeleton className="h-3 w-1/3 rounded-sm bg-[#181c28]" />
        </div>
        <Skeleton className="h-6 w-10 rounded-sm shrink-0 bg-[#181c28]" />
      </div>
    </div>
  );
}

export function CardsGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div
      role="status"
      aria-busy="true"
      aria-label="Loading games catalogue"
      className="pt-2 pb-20"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: count }).map((_, idx) => (
          <GameCardSkeleton key={idx} />
        ))}
      </div>
    </div>
  );
}

export function CardsList({
  platform,
  feature,
  isLoading: isLoadingProp,
}: CardsListProps) {
  const {
    games,
    isLoading: storeLoading,
    hasFetched,
    fetchGames,
    selectedGenre,
    selectedOutlet,
    searchQuery,
    sortBy,
    resetFilters,
    openGameModal,
    setOutlet,
  } = useGameFilter();

  useEffect(() => {
    if (!hasFetched) {
      void fetchGames();
    }
  }, [hasFetched, fetchGames]);

  const isLoading = isLoadingProp ?? storeLoading;

  if (isLoading) {
    return <CardsGridSkeleton count={6} />;
  }

  const filteredGames = filterAndSortGames(games, {
    genre: selectedGenre,
    outlet: selectedOutlet,
    search: searchQuery,
    platform,
    sortBy,
  });

  if (filteredGames.length === 0) {
    return (
      <div className="rounded-lg border border-white/[0.08] bg-[#12151e] p-10 text-center space-y-3">
        <h2 className="text-base font-semibold text-white">
          No matching games
        </h2>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

  // Tab 3: Scores (/ui-elements) -> Flush Hairline Ledger Table with Precision Threshold Meters
  if (feature === "ui-elements") {
    return (
      <div className="pb-16">
        <div className="rounded-lg border border-white/[0.08] bg-[#12151e] overflow-hidden">
          <div className="px-5 py-3 border-b border-white/[0.08] bg-[#181c28] flex items-center justify-between text-[11px] font-mono text-zinc-400 tabular-nums">
            <span>03 / NORMALIZED SCORE BREAKDOWN LEDGER</span>
            <span>80-PT ACCLAIM THRESHOLD MARKED</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-white/[0.08] bg-[#090a0f] text-[11px] font-mono uppercase text-zinc-400">
                <tr>
                  <th className="py-3 px-5 font-medium">Release</th>
                  <th className="py-3 px-5 font-medium">Genre / Studio</th>
                  <th className="py-3 px-5 font-medium w-52">
                    0–100 Distribution Meter
                  </th>
                  <th className="py-3 px-5 font-medium text-right">
                    Critic Score
                  </th>
                  <th className="py-3 px-5 font-medium text-right">
                    Player Score
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.07]">
                {filteredGames.map((game) => {
                  const tier = getScoreTier(game.metaScore);
                  return (
                    <tr
                      key={game.id}
                      onClick={() => openGameModal(game.id)}
                      className="hover:bg-[#181c28] transition-colors cursor-pointer"
                    >
                      <td className="py-3.5 px-5 font-medium text-white">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-[11px] text-zinc-500 tabular-nums">
                            0{game.id}
                          </span>
                          <div className="relative size-9 rounded-md overflow-hidden shrink-0 border border-white/[0.1] bg-[#090a0f]">
                            <Image
                              src={game.coverImage}
                              alt={game.title}
                              fill
                              sizes="36px"
                              className="object-cover"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-white">
                              {game.title}
                            </div>
                            <div className="text-[11px] font-mono text-zinc-400">
                              {tier.label}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-5 text-xs font-mono text-zinc-400">
                        {game.genre} · {game.developer}
                      </td>
                      <td className="py-3.5 px-5">
                        <div className="relative h-1.5 w-full rounded-sm bg-white/[0.08] overflow-hidden">
                          <div
                            className="h-full bg-zinc-200"
                            style={{ width: `${game.metaScore}%` }}
                          />
                          <span
                            aria-hidden="true"
                            className="absolute top-0 bottom-0 left-[80%] w-px bg-[#090a0f]"
                          />
                        </div>
                      </td>
                      <td className="py-3.5 px-5 text-right font-mono font-bold text-base tabular-nums text-white">
                        {game.metaScore}
                        <span className="text-[10px] font-normal text-zinc-500 ml-0.5">
                          /100
                        </span>
                      </td>
                      <td className="py-3.5 px-5 text-right font-mono font-semibold tabular-nums text-zinc-300">
                        {game.userScore}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  // Tab 4: Outlets (/flows) -> Exposed 1px Architectural Seam Grid
  const outlets = REVIEW_OUTLETS.filter((o) => o !== "All Outlets");

  return (
    <div className="pb-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.08] border border-white/[0.08] rounded-lg overflow-hidden">
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
          const monogram = getOutletMonogram(outletName);

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
              className="bg-[#12151e] hover:bg-[#181c28] p-5 flex flex-col justify-between gap-4 cursor-pointer transition-colors"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="inline-flex items-center justify-center size-8 rounded-md border border-white/[0.1] bg-[#090a0f] font-mono text-xs font-bold text-zinc-200 shrink-0">
                    {monogram.code}
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-white">
                      {outletName}
                    </h3>
                    <p className="text-xs font-mono text-zinc-400 mt-0.5 tabular-nums">
                      {allReviewsForOutlet.length} reviews ·{" "}
                      {monogram.scaleLabel}
                    </p>
                  </div>
                </div>
                <div className="text-right font-mono tabular-nums shrink-0">
                  <span className="text-xl font-bold text-white">
                    {avgScore}
                  </span>
                  <span className="text-[10px] text-zinc-500 ml-0.5">/100</span>
                </div>
              </div>

              <div className="relative h-1 w-full rounded-sm bg-white/[0.08] overflow-hidden">
                <div
                  className="h-full bg-zinc-200"
                  style={{ width: `${avgScore}%` }}
                />
                <span
                  aria-hidden="true"
                  className="absolute top-0 bottom-0 left-[80%] w-px bg-[#090a0f]"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
