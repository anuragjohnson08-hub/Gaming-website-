"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { useGameFilter } from "@/hooks/use-game-filter";
import { GENRE_CATEGORIES } from "@/lib/games-data";
import { cn } from "@/lib/utils";
import React from "react";

export function CarouselButtonsTags() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [scrollPrev, setScrollPrev] = React.useState<boolean>(false);
  const [scrollNext, setScrollNext] = React.useState<boolean>(true);
  const { selectedGenre, setGenre } = useGameFilter();

  React.useEffect(() => {
    if (!api) return;

    const updateArrows = () => {
      setScrollPrev(api.canScrollPrev());
      setScrollNext(api.canScrollNext());
    };

    updateArrows();
    api.on("select", updateArrows);
  }, [api]);

  return (
    <Carousel
      opts={{
        duration: 20,
        dragFree: true,
      }}
      setApi={setApi}
      className="w-full"
    >
      <CarouselContent className="-ml-2">
        {GENRE_CATEGORIES.map((genre) => {
          const isSelected = selectedGenre === genre;
          return (
            <CarouselItem key={genre} className="pl-2 basis-auto">
              <Button
                type="button"
                variant={isSelected ? "default" : "outline"}
                size="sm"
                onClick={() => setGenre(genre)}
                className={cn(
                  "h-8 rounded-full px-3.5 text-xs font-medium whitespace-nowrap shrink-0 transition-colors",
                  isSelected
                    ? "bg-primary text-primary-foreground"
                    : "bg-card/85 border-border/75 hover:bg-accent text-muted-foreground hover:text-foreground"
                )}
              >
                {genre}
              </Button>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious
        variant="secondary"
        className={cn(
          "size-8 rounded-lg left-0 disabled:hidden",
          scrollPrev ? "flex" : "hidden"
        )}
      />
      <CarouselNext
        variant="secondary"
        className={cn(
          "size-8 rounded-lg right-0 disabled:hidden",
          scrollNext ? "flex" : "hidden"
        )}
      />
    </Carousel>
  );
}
