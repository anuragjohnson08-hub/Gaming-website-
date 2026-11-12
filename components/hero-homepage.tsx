"use client";

import { ScrollFade } from "@/components/scroll-fade-section";
import { Button } from "@/components/ui/button";
import { useGameFilter } from "@/hooks/use-game-filter";
import { useSearchModal } from "@/hooks/use-search-modal";
import Image from "next/image";

export function HeroHomepage() {
  const { openGameModal } = useGameFilter();
  const searchModal = useSearchModal();

  return (
    <ScrollFade
      as="section"
      className="relative overflow-hidden border-b border-white/[0.08] bg-[#090a0f] py-10 md:py-12"
    >
      <div className="relative z-10 marge-x grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 items-center">
        <div className="space-y-5 max-w-2xl">
          <div className="inline-flex items-center gap-2 text-xs text-zinc-400 font-mono tabular-nums">
            <span className="text-white font-semibold">00 /</span>
            <span>STATIC ARCHIVE VIEW · 8 RELEASES · 48 OUTLET VERDICTS</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-balance leading-[1.1] text-white">
            All game reviews from across the internet in one catalogue.
          </h2>
          <p className="text-sm md:text-base text-zinc-400 leading-relaxed">
            Instantly browse aggregated critic scores, verified Steam sentiment,
            and side-by-side publication quotes without opening twenty tabs.
          </p>
          <div className="flex flex-wrap gap-3 pt-1">
            <Button
              variant="default"
              size="lg"
              onClick={() => openGameModal(1)}
              className="font-mono tabular-nums"
            >
              Inspect #1 Rated Game (95/100)
            </Button>
            <Button variant="outline" size="lg" onClick={searchModal.onOpen}>
              Filter by Publication
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-px bg-white/[0.08] border border-white/[0.08] rounded-lg overflow-hidden">
          <div
            onClick={() => openGameModal(1)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter") openGameModal(1);
            }}
            className="group relative aspect-[4/3] overflow-hidden bg-[#12151e] cursor-pointer"
          >
            <Image
              src="/images/games/elden-shadow.jpg"
              alt="Elden Ring: Shadow of the Erdtree"
              fill
              sizes="(max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#090a0f] via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 flex items-baseline justify-between font-mono text-xs text-white tabular-nums">
              <span className="font-sans font-semibold truncate pr-2">
                Elden Ring
              </span>
              <span className="font-bold">95</span>
            </div>
          </div>
          <div
            onClick={() => openGameModal(2)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter") openGameModal(2);
            }}
            className="group relative aspect-[4/3] overflow-hidden bg-[#12151e] cursor-pointer"
          >
            <Image
              src="/images/games/hades-underworld.jpg"
              alt="Hades II"
              fill
              sizes="(max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#090a0f] via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 flex items-baseline justify-between font-mono text-xs text-white tabular-nums">
              <span className="font-sans font-semibold truncate pr-2">
                Hades II
              </span>
              <span className="font-bold">94</span>
            </div>
          </div>
        </div>
      </div>
    </ScrollFade>
  );
}
