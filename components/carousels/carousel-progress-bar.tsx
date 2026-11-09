"use client";

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
    <section className="relative min-h-[380px] md:min-h-[430px] w-full overflow-hidden border-b border-border/80 bg-background">
      <div className="relative z-10 marge-x py-10 md:py-14 grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-8 items-center">
        {/* Left Column: Editorial Headline & Aggregated Metrics */}
        <div className="space-y-5 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground font-mono tabular-nums">
            <span>Unified Internet Review Index</span>
            <span aria-hidden="true">·</span>
            <span>890+ Critic Reviews Aggregated</span>
            <span aria-hidden="true">·</span>
            <span>60 FPS Locked</span>
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
                  <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-balance leading-[1.12]">
                    Every review across the internet, distilled into one view.
                  </h1>
                  <p className="text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed text-balance">
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
              className="whitespace-nowrap shrink-0"
            >
              Inspect {activeSlide.title} ({activeSlide.metaScore}/100)
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={searchModal.onOpen}
              className="whitespace-nowrap shrink-0"
            >
              Browse All Outlets
            </Button>
          </div>

          {/* Slide Selector Bars */}
          <div className="flex items-center gap-3 pt-2">
            {featuredSlides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                aria-label={`Spotlight ${slide.title}`}
                onClick={() => goToIndex(index)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  current === index
                    ? "w-10 bg-foreground"
                    : "w-4 bg-muted-foreground/30 hover:bg-muted-foreground/60"
                )}
              />
            ))}
            <span className="text-xs text-muted-foreground ml-2 truncate">
              Spotlight: {activeSlide.title} · {activeSlide.developer}
            </span>
          </div>
        </div>

        {/* Right Column: Featured Game Review Spotlight Card */}
        <motion.div
          initial={{ y: 0, scale: 1 }}
          whileHover={{
            y: [-6, -11, -6],
            scale: 1.015,
            transition: {
              y: {
                duration: 2.2,
                repeat: Infinity,
                ease: "easeInOut",
              },
              scale: {
                type: "spring",
                stiffness: 300,
                damping: 20,
              },
            },
          }}
          whileTap={{ scale: 0.99 }}
          onClick={() => openGameModal(activeSlide.id)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              openGameModal(activeSlide.id);
            }
          }}
          className="group relative overflow-hidden rounded-2xl border border-border bg-card/85 cursor-pointer shadow-sm hover:shadow-xl transition-shadow"
        >
          <div className="relative aspect-video w-full overflow-hidden bg-muted">
            <Image
              src={activeSlide.imageUrl}
              alt={activeSlide.title}
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              referrerPolicy="no-referrer"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4 text-white">
              <div>
                <div className="text-xs text-white/75">
                  {activeSlide.genre} · {activeSlide.developer}
                </div>
                <div className="text-xl font-semibold tracking-tight">
                  {activeSlide.title}
                </div>
              </div>
              <div className="text-right font-mono tabular-nums shrink-0">
                <div className="text-2xl font-bold text-emerald-400">
                  {activeSlide.metaScore}
                </div>
                <div className="text-[11px] text-white/75">
                  {activeSlide.reviewCount} Outlets
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
