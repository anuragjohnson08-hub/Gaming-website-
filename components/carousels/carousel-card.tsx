"use client";

import { ContextMenuCard } from "@/components/context-menu-card";
import { ScrollFade } from "@/components/scroll-fade-section";
import { useGameFilter } from "@/hooks/use-game-filter";
import { GameItem } from "@/lib/games-data";
import { motion } from "framer-motion";
import Image from "next/image";

interface CarouselCardProps {
  game: GameItem;
  index?: number;
}

export function CarouselCard({ game, index = 0 }: CarouselCardProps) {
  const { openGameModal } = useGameFilter();

  return (
    <ContextMenuCard>
      <ScrollFade delayMs={(index % 3) * 35}>
        <motion.article
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.995 }}
          transition={{ duration: 0.16, ease: "easeOut" }}
          onClick={() => openGameModal(game.id)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              openGameModal(game.id);
            }
          }}
          className="group relative flex flex-col rounded-lg border border-white/[0.08] hover:border-white/[0.18] bg-[#12151e] text-card-foreground overflow-hidden cursor-pointer transition-colors"
        >
          {/* Cover Art with dark gradient scrim and archival release badge */}
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#090a0f]">
            <Image
              src={game.coverImage}
              alt={game.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              referrerPolicy="no-referrer"
              priority={index < 3}
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-[#12151e] via-transparent to-transparent opacity-85"
            />
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-[10px] font-mono tabular-nums text-zinc-300">
              <span className="px-1.5 py-0.5 rounded-sm border border-white/[0.12] bg-[#090a0f]/85">
                REL-0{game.id}
              </span>
              <span className="px-1.5 py-0.5 rounded-sm border border-white/[0.12] bg-[#090a0f]/85">
                {game.releaseYear}
              </span>
            </div>
          </div>

          {/* Precision 0-100 Score Seam Meter with 80-pt Acclaim Threshold Tick */}
          <div className="relative h-1 w-full bg-white/[0.07] overflow-hidden">
            <div
              className="h-full bg-zinc-200"
              style={{ width: `${game.metaScore}%` }}
            />
            <span
              aria-hidden="true"
              className="absolute top-0 bottom-0 left-[80%] w-px bg-[#090a0f]"
            />
          </div>

          {/* Editorial Footer: Title, Monospace Genre/Studio Metadata, and High-Contrast Typographic MetaScore */}
          <div className="px-4 py-3.5 flex items-baseline justify-between gap-4">
            <div className="min-w-0 space-y-0.5">
              <h2 className="text-sm font-semibold tracking-tight text-white truncate">
                {game.title}
              </h2>
              <div className="text-[11px] font-mono text-zinc-400 truncate tabular-nums">
                {game.genre} · {game.developer}
              </div>
            </div>

            <div className="text-right font-mono tabular-nums shrink-0">
              <span className="text-lg font-bold tracking-tight text-white">
                {game.metaScore}
              </span>
              <span className="text-[10px] text-zinc-500 ml-0.5">/100</span>
            </div>
          </div>
        </motion.article>
      </ScrollFade>
    </ContextMenuCard>
  );
}
