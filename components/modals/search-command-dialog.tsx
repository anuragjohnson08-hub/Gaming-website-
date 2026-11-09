"use client";

import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGameFilter } from "@/hooks/use-game-filter";
import { useSearchModal } from "@/hooks/use-search-modal";
import { GENRE_CATEGORIES, REVIEW_OUTLETS } from "@/lib/games-data";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

export function SearchCommandDialog() {
  const searchModal = useSearchModal();
  const { games, openGameModal, setGenre, setOutlet } = useGameFilter();
  const [search, setSearch] = React.useState("");

  const handleSelectGame = (gameId: number) => {
    searchModal.onClose();
    openGameModal(gameId);
  };

  const handleSelectGenre = (genre: string) => {
    setGenre(genre);
    searchModal.onClose();
  };

  const handleSelectOutlet = (outlet: string) => {
    setOutlet(outlet);
    searchModal.onClose();
  };

  return (
    <CommandDialog
      open={searchModal.isOpen}
      onOpenChange={searchModal.onClose}
      className={cn(
        "max-w-full h-full md:max-h-[calc(100vh-32px)] md:h-[620px] sm:max-w-[760px] !rounded-none md:!rounded-2xl md:top-8 md:!translate-y-0",
        "search-command pt-1.5 md:pt-3"
      )}
    >
      <div className="flex items-center gap-x-0 w-full [&_[cmdk-input-wrapper]]:flex [&_[cmdk-input-wrapper]]:grow">
        <CommandInput
          placeholder="Search games, studios, genres, or review publications..."
          autoFocus
          value={search}
          onValueChange={setSearch}
          className="!h-10 md:!h-12"
        />
        <Button
          variant="ghost"
          className="block md:hidden hover:!bg-transparent pl-0"
          onClick={searchModal.onClose}
        >
          Cancel
        </Button>
      </div>

      <ScrollArea className="h-[520px] w-full px-2 pb-6">
        <CommandList className="!max-h-none">
          <CommandEmpty>No matching games or outlets found.</CommandEmpty>

          <CommandGroup heading="Games & Aggregated Scores">
            {games.map((game) => (
              <CommandItem
                key={game.id}
                value={`${game.title} ${game.developer} ${game.genre}`}
                onSelect={() => handleSelectGame(game.id)}
                className="flex items-center justify-between gap-3 py-2.5 px-3 rounded-xl cursor-pointer"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative size-10 rounded-lg overflow-hidden shrink-0 border border-border bg-muted">
                    <Image
                      src={game.coverImage}
                      alt={game.title}
                      fill
                      sizes="40px"
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-medium truncate">
                      {game.title}
                    </div>
                    <div className="text-xs text-muted-foreground truncate">
                      {game.genre} · {game.developer} ·{" "}
                      {game.totalCriticReviews} Critic Reviews
                    </div>
                  </div>
                </div>
                <div className="text-right font-mono tabular-nums shrink-0">
                  <span className="text-sm font-bold text-emerald-500">
                    {game.metaScore}
                  </span>
                  <span className="text-xs text-muted-foreground"> / 100</span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandGroup heading="Filter by Review Publication">
            <div className="flex flex-wrap gap-2 p-2">
              {REVIEW_OUTLETS.map((outlet) => (
                <CommandItem
                  key={outlet}
                  value={`Outlet ${outlet}`}
                  onSelect={() => handleSelectOutlet(outlet)}
                  className="inline-flex w-auto px-3 py-1.5 rounded-lg border border-border text-xs cursor-pointer"
                >
                  {outlet}
                </CommandItem>
              ))}
            </div>
          </CommandGroup>

          <CommandGroup heading="Filter by Genre">
            <div className="flex flex-wrap gap-2 p-2">
              {GENRE_CATEGORIES.map((genre) => (
                <CommandItem
                  key={genre}
                  value={`Genre ${genre}`}
                  onSelect={() => handleSelectGenre(genre)}
                  className="inline-flex w-auto px-3 py-1.5 rounded-lg border border-border text-xs cursor-pointer"
                >
                  {genre}
                </CommandItem>
              ))}
            </div>
          </CommandGroup>
        </CommandList>
      </ScrollArea>
    </CommandDialog>
  );
}
