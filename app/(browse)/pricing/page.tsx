import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PricingPage() {
  return (
    <div className="marge-x py-8 space-y-6 max-w-4xl">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-xl md:text-2xl font-semibold tracking-tight">
          Scoring Index
        </h1>
        <Button variant="outline" size="sm" asChild>
          <Link href="/browse/ios/apps">Back to Games</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="rounded-2xl border border-border/75 bg-card p-5 space-y-2">
          <span className="inline-block font-mono text-sm font-bold tabular-nums px-2.5 py-1 rounded-lg bg-emerald-500/15 text-emerald-800">
            90 – 100
          </span>
          <h2 className="text-base font-semibold">Universal Acclaim</h2>
        </div>

        <div className="rounded-2xl border border-border/75 bg-card p-5 space-y-2">
          <span className="inline-block font-mono text-sm font-bold tabular-nums px-2.5 py-1 rounded-lg bg-amber-500/15 text-amber-800">
            75 – 89
          </span>
          <h2 className="text-base font-semibold">Generally Favorable</h2>
        </div>

        <div className="rounded-2xl border border-border/75 bg-card p-5 space-y-2">
          <span className="inline-block font-mono text-sm font-bold tabular-nums px-2.5 py-1 rounded-lg bg-rose-500/15 text-rose-800">
            0 – 74
          </span>
          <h2 className="text-base font-semibold">Mixed or Average</h2>
        </div>
      </div>
    </div>
  );
}
