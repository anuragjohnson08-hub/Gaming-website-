"use client";

import { ScrollFade } from "@/components/scroll-fade-section";
import { useGameFilter } from "@/hooks/use-game-filter";
import { getOutletMonogram, OutletReview } from "@/lib/games-data";
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

export function CheckboxCard({ id, reviewItem }: CheckboxCardProps) {
  const { openGameModal } = useGameFilter();

  if (!reviewItem) {
    return null;
  }

  const monogram = getOutletMonogram(reviewItem.outlet);

  return (
    <ScrollFade
      as="article"
      delayMs={(id % 3) * 35}
      onClick={() => openGameModal(reviewItem.gameId)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openGameModal(reviewItem.gameId);
        }
      }}
      className="flex flex-col justify-between rounded-lg border border-white/[0.08] hover:border-white/[0.18] bg-[#12151e] p-4 space-y-3 cursor-pointer transition-colors"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="relative size-9 rounded-md overflow-hidden shrink-0 border border-white/[0.1] bg-[#090a0f]">
            <Image
              src={reviewItem.gameCover}
              alt={reviewItem.gameTitle}
              fill
              sizes="36px"
              className="object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="min-w-0">
            <div className="text-xs font-semibold text-white truncate">
              {reviewItem.gameTitle}
            </div>
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-zinc-400 truncate">
              <span className="text-zinc-200 font-semibold">
                {monogram.code}
              </span>
              <span aria-hidden="true">·</span>
              <span className="truncate">{reviewItem.outlet}</span>
            </div>
          </div>
        </div>

        <div className="text-right font-mono tabular-nums shrink-0">
          <div className="text-base font-bold text-white leading-none">
            {reviewItem.score}
            <span className="text-[10px] font-normal text-zinc-500">/100</span>
          </div>
          <div className="text-[10px] text-zinc-400 mt-0.5">
            {reviewItem.originalScoreDisplay}
          </div>
        </div>
      </div>

      <div className="relative h-1 w-full rounded-sm bg-white/[0.08] overflow-hidden">
        <div
          className="h-full bg-zinc-200"
          style={{ width: `${reviewItem.score}%` }}
        />
        <span
          aria-hidden="true"
          className="absolute top-0 bottom-0 left-[80%] w-px bg-[#090a0f]/80"
        />
      </div>

      <p className="font-serif italic text-xs text-zinc-200 line-clamp-2 leading-relaxed">
        &ldquo;{reviewItem.quote}&rdquo;
      </p>

      <div className="text-[11px] font-mono text-zinc-400 truncate">
        — {reviewItem.reviewer}
      </div>
    </ScrollFade>
  );
}
