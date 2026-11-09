"use client";

import { useGameFilter } from "@/hooks/use-game-filter";
import { getAllOutletReviews, REVIEW_OUTLETS } from "@/lib/games-data";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function CollectionsPage() {
  const { games, setOutlet } = useGameFilter();
  const outlets = REVIEW_OUTLETS.filter((o) => o !== "All Outlets");

  return (
    <div className="marge-x py-8 space-y-6">
      <h1 className="text-xl md:text-2xl font-semibold tracking-tight">
        Outlets Directory
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {outlets.map((outlet) => {
          const reviews = getAllOutletReviews(games).filter(
            (r) => r.outlet.toLowerCase() === outlet.toLowerCase()
          );
          const avg =
            reviews.length > 0
              ? Math.round(
                  reviews.reduce((s, r) => s + r.score, 0) / reviews.length
                )
              : 0;

          return (
            <Link
              key={outlet}
              href="/browse/ios/apps"
              onClick={() => setOutlet(outlet)}
              className="rounded-2xl border border-border/75 hover:border-border bg-card p-5 flex items-center justify-between gap-4 shadow-sm hover:shadow-md transition-all"
            >
              <div>
                <h2 className="text-base font-semibold text-foreground">
                  {outlet}
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {reviews.length} reviews
                </p>
              </div>
              <span
                className={cn(
                  "font-mono text-sm font-bold tabular-nums px-2.5 py-1 rounded-lg shrink-0",
                  avg >= 90
                    ? "bg-emerald-500/15 text-emerald-800"
                    : "bg-amber-500/15 text-amber-800"
                )}
              >
                {avg}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
