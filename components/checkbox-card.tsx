"use client";

import { useGameFilter } from "@/hooks/use-game-filter";
import { OutletReview } from "@/lib/games-data";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface CheckboxCardProps {
  id: number;
  reviewItem?: OutletReview & {
    gameId: number;
    gameTitle: string;
    gameGenre: string;
    gameCover: string;
    gameMetaScore: number;
  };
}

export function CheckboxCard({ reviewItem }: CheckboxCardProps) {
  const { openGameModal } = useGameFilter();

  if (!reviewItem) {
    return null;
  }

  return (
    <article
      onClick={() => openGameModal(reviewItem.gameId)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openGameModal(reviewItem.gameId);
        }
      }}
      className="flex flex-col justify-between rounded-2xl border border-border/75 hover:border-border bg-card p-5 space-y-3.5 cursor-pointer shadow-sm hover:shadow-md transition-all"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="relative size-10 rounded-lg overflow-hidden shrink-0 border border-border/70 bg-muted">
            <Image
              src={reviewItem.gameCover}
              alt={reviewItem.gameTitle}
              fill
              sizes="40px"
              className="object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="min-w-0">
            <div className="text-sm font-semibold text-foreground truncate">
              {reviewItem.gameTitle}
            </div>
            <div className="text-xs text-muted-foreground truncate">
              {reviewItem.outlet}
            </div>
          </div>
        </div>

        <span
          className={cn(
            "font-mono text-xs font-bold tabular-nums px-2.5 py-1 rounded-lg shrink-0",
            reviewItem.score >= 90
              ? "bg-emerald-500/15 text-emerald-800"
              : reviewItem.score >= 75
              ? "bg-amber-500/15 text-amber-800"
              : "bg-rose-500/15 text-rose-800"
          )}
        >
          {reviewItem.originalScoreDisplay}
        </span>
      </div>

      <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
        &ldquo;{reviewItem.quote}&rdquo;
      </p>
    </article>
  );
}
