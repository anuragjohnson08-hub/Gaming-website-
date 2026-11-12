"use client";

import { ScrollFade } from "@/components/scroll-fade-section";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useGameFilter } from "@/hooks/use-game-filter";
import { useSearchModal } from "@/hooks/use-search-modal";
import { GAMES_CATALOGUE } from "@/lib/games-data";
import { cn } from "@/lib/utils";
import Autoplay from "embla-carousel-autoplay";
import ClassNames from "embla-carousel-class-names";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const featuredSlides = GAMES_CATALOGUE.slice(0, 4).map((game) => ({
  id: game.id,
  title: game.title,
  headline: `Every internet review for ${game.title}, unified in one index.`,
  metaScore: game.metaScore,
  userScore: game.userScore,
  reviewCount: game.totalCriticReviews,
  genre: game.genre,
  developer: game.developer,
  releaseYear: game.releaseYear,
  imageUrl: game.coverImage,
}));

const intervalAutoplay = 5000;

export function CarouselProgressBar() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState<number>(0);
  const { openGameModal } = useGameFilter();
  const searchModal = useSearchModal();

  const goToIndex = (index: number) => {
    if (!api) return;
    setCurrent(index);
    api.scrollTo(index, true);
  };

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const activeSlide = featuredSlides[current] || featuredSlides[0];

  return (
    <ScrollFade
      as="section"
      className="relative w-full overflow-hidden border-b border-white/[0.08] bg-[#090a0f]"
    >
      <div className="relative z-10 marge-x py-10 md:py-12 grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-8 items-center">
        {/* Left Column: Editorial Headline & Segmented Spotlight Switcher */}
        <div className="space-y-5 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-400 font-mono tabular-nums">
            <span className="text-white font-semibold">00 /</span>
            <span>FEATURED ARCHIVE SPOTLIGHT</span>
            <span aria-hidden="true" className="text-zinc-600">
              ·
            </span>
            <Link
              href="/"
              className="underline underline-offset-4 hover:text-white transition-colors"
            >
              Overview Workspace
            </Link>
          </div>

          <Carousel
            className="w-full"
            opts={{ loop: true }}
            plugins={[
              Autoplay({
                delay: intervalAutoplay,
                stopOnInteraction: true,
              }),
              ClassNames(),
            ]}
            setApi={setApi}
          >
            <CarouselContent>
              {featuredSlides.map((slide) => (
                <CarouselItem key={slide.id} className="space-y-3">
                  <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-balance leading-[1.1] text-white">
                    Every review across the internet, distilled into one view.
                  </h2>
                  <p className="text-sm md:text-base text-zinc-400 max-w-xl leading-relaxed text-balance">
                    Compare critic verdicts from IGN, GameSpot, PC Gamer,
                    Eurogamer, OpenCritic, and verified Steam player ratings
                    side by side.
                  </p>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Button
              variant="default"
              size="lg"
              onClick={() => openGameModal(activeSlide.id)}
              className="whitespace-nowrap shrink-0 font-mono tabular-nums"
            >
              Inspect {activeSlide.title.split(":")[0]} ({activeSlide.metaScore}
              /100)
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={searchModal.onOpen}
              className="whitespace-nowrap shrink-0"
            >
              Filter Catalogue
            </Button>
          </div>

          {/* Segmented Spotlight Switcher */}
          <div
            role="tablist"
            aria-label="Select featured release spotlight"
            className="inline-flex flex-wrap items-center p-1 rounded-md border border-white/[0.08] bg-[#12151e]"
          >
            {featuredSlides.map((slide, index) => {
              const isActive = current === index;
              return (
                <button
                  key={slide.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`Spotlight ${slide.title}`}
                  onClick={() => goToIndex(index)}
                  className={cn(
                    "relative px-2.5 py-1 rounded-[5px] text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0",
                    isActive
                      ? "text-white"
                      : "text-zinc-400 hover:text-zinc-200"
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="browse-spotlight-active-slide"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 32,
                      }}
                      className="absolute inset-0 rounded-[5px] bg-[#181c28] border border-white/[0.12]"
                    />
                  )}
                  <span className="relative z-10">
                    {slide.title.split(":")[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Full-Bleed Spotlight Card with Dark Gradient Scrim & Threshold Meter */}
        <div
          onClick={() => openGameModal(activeSlide.id)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              openGameModal(activeSlide.id);
            }
          }}
          className="group relative overflow-hidden rounded-lg border border-white/[0.08] hover:border-white/[0.18] bg-[#12151e] cursor-pointer transition-colors"
        >
          <div className="relative aspect-video w-full overflow-hidden bg-[#090a0f]">
            <Image
              src={activeSlide.imageUrl}
              alt={activeSlide.title}
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              referrerPolicy="no-referrer"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#090a0f] via-[#090a0f]/55 to-transparent" />
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-zinc-300 tabular-nums">
              <span className="px-1.5 py-0.5 rounded-sm border border-white/[0.12] bg-[#090a0f]/85">
                REL-0{activeSlide.id}
              </span>
              <span className="px-1.5 py-0.5 rounded-sm border border-white/[0.12] bg-[#090a0f]/85">
                {activeSlide.releaseYear}
              </span>
            </div>
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4 text-white">
              <div>
                <div className="text-xs font-mono text-zinc-300">
                  {activeSlide.genre} · {activeSlide.developer}
                </div>
                <div className="text-xl font-semibold tracking-tight text-white">
                  {activeSlide.title}
                </div>
              </div>
              <div className="text-right font-mono tabular-nums shrink-0">
                <div className="text-2xl font-bold text-white">
                  {activeSlide.metaScore}
                  <span className="text-xs font-normal text-zinc-400">
                    /100
                  </span>
                </div>
                <div className="text-[11px] text-zinc-300">
                  {activeSlide.reviewCount} Outlets
                </div>
              </div>
            </div>
          </div>

          <div className="relative h-1 w-full bg-white/[0.08] overflow-hidden">
            <div
              className="h-full bg-zinc-200"
              style={{ width: `${activeSlide.metaScore}%` }}
            />
            <span
              aria-hidden="true"
              className="absolute top-0 bottom-0 left-[80%] w-px bg-[#090a0f]"
            />
          </div>
        </div>
      </div>
    </ScrollFade>
  );
}
