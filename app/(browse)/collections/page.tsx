"use client";

import { useGameFilter } from "@/hooks/use-game-filter";
import {
  getAllOutletReviews,
  getOutletMonogram,
  REVIEW_OUTLETS,
} from "@/lib/games-data";
import Link from "next/link";

export default function CollectionsPage() {
  const { games, setOutlet } = useGameFilter();
  const outlets = REVIEW_OUTLETS.filter((o) => o !== "All Outlets");
  const allReviews = getAllOutletReviews(games);

  return (
    <div className="marge-x py-8 space-y-8">
      {/* Asymmetric Editorial Masthead */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400">
            <span className="text-white font-semibold">01 /</span>
            <span>PUBLICATION ARCHIVE &amp; SCALE DIRECTORY</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-white">
            Outlets Directory
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-xl">
            Inspect scoring tendencies, native rating scales, and recent release
            verdicts across all {outlets.length} indexed publications.
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono text-zinc-400 tabular-nums">
          <span>
            <strong className="text-white">{outlets.length}</strong>{" "}
            PUBLICATIONS
          </span>
          <span aria-hidden="true" className="text-zinc-600">
            /
          </span>
          <span>
            <strong className="text-white">{allReviews.length}</strong> PRIMARY
            QUOTES
          </span>
        </div>
      </div>

      {/* Exposed 1px Seam Publication Matrix with Flush Hairline Verdict Rows */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.08] border border-white/[0.08] rounded-lg overflow-hidden">
        {outlets.map((outlet) => {
          const reviews = allReviews.filter(
            (r) => r.outlet.toLowerCase() === outlet.toLowerCase()
          );
          const avg =
            reviews.length > 0
              ? Math.round(
                  reviews.reduce((s, r) => s + r.score, 0) / reviews.length
                )
              : 0;
          const monogram = getOutletMonogram(outlet);

          return (
            <Link
              key={outlet}
              href="/browse/ios/apps"
              onClick={() => setOutlet(outlet)}
              className="bg-[#12151e] hover:bg-[#181c28] p-6 flex flex-col justify-between space-y-5 transition-colors"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="inline-flex items-center justify-center size-8 rounded-md border border-white/[0.1] bg-[#090a0f] font-mono text-xs font-bold text-zinc-200 shrink-0">
                      {monogram.code}
                    </span>
                    <div>
                      <h2 className="text-sm font-semibold text-white">
                        {outlet}
                      </h2>
                      <p className="text-xs font-mono text-zinc-400 mt-0.5 tabular-nums">
                        {reviews.length} reviews · {monogram.scaleLabel}
                      </p>
                    </div>
                  </div>
                  <div className="text-right font-mono tabular-nums shrink-0">
                    <span className="text-2xl font-bold text-white">{avg}</span>
                    <span className="text-[10px] text-zinc-500 ml-0.5">
                      /100
                    </span>
                  </div>
                </div>

                {/* Precision 0-100 Meter with 80-pt Acclaim Tick */}
                <div className="relative h-1 w-full rounded-sm bg-white/[0.08] overflow-hidden">
                  <div
                    className="h-full bg-zinc-200"
                    style={{ width: `${avg}%` }}
                  />
                  <span
                    aria-hidden="true"
                    className="absolute top-0 bottom-0 left-[80%] w-px bg-[#090a0f]"
                  />
                </div>

                {/* Flush Hairline Sample Verdicts for this Outlet */}
                <div className="divide-y divide-white/[0.07] pt-1 text-xs">
                  {reviews.slice(0, 3).map((r) => (
                    <div
                      key={r.id}
                      className="py-2 flex items-center justify-between gap-2"
                    >
                      <span className="text-zinc-300 truncate">
                        {r.gameTitle}
                      </span>
                      <span className="font-mono text-zinc-400 tabular-nums shrink-0">
                        {r.originalScoreDisplay} →{" "}
                        <strong className="text-white">{r.score}</strong>
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between text-[11px] font-mono text-zinc-400">
                <span>FILTER ARCHIVE BY {outlet.toUpperCase()}</span>
                <span className="text-white">→</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
