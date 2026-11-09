"use client";

import { ContextMenuCard } from "@/components/context-menu-card";
import { useGameFilter } from "@/hooks/use-game-filter";
import { GameItem } from "@/lib/games-data";
import { cn } from "@/lib/utils";
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
      <motion.article
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 320,
          damping: 28,
          delay: Math.min(index * 0.03, 0.2),
        }}
        whileHover={{
          y: [-4, -8, -4],
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
              damping: 22,
            },
          },
        }}
        whileTap={{ scale: 0.99 }}
        onClick={() => openGameModal(game.id)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openGameModal(game.id);
          }
        }}
        className="group relative flex flex-col rounded-2xl border border-border/75 hover:border-border bg-card text-card-foreground overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-shadow"
      >
        {/* Cover Art */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
          <Image
            src={game.coverImage}
            alt={game.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            referrerPolicy="no-referrer"
            priority={index < 8}
          />
        </div>

        {/* Minimal Footer: Title, Genre Tag, and MetaScore Badge Only */}
        <div className="px-5 py-4 flex items-center justify-between gap-4">
          <div className="min-w-0 space-y-1">
            <h2 className="text-base font-semibold tracking-tight text-foreground truncate">
              {game.title}
            </h2>
            <span className="inline-block text-xs text-muted-foreground">
              {game.genre}
            </span>
          </div>

          <span
            className={cn(
              "font-mono text-sm font-bold tabular-nums px-2.5 py-1 rounded-lg shrink-0",
              game.metaScore >= 90
                ? "bg-emerald-500/15 text-emerald-800"
                : game.metaScore >= 75
                ? "bg-amber-500/15 text-amber-800"
                : "bg-rose-500/15 text-rose-800"
            )}
          >
            {game.metaScore}
          </span>
        </div>
      </motion.article>
    </ContextMenuCard>
  );
}
