import { Button } from "@/components/ui/button";
import Link from "next/link";

const CONVERSION_ROWS = [
  {
    outlet: "IGN / GameSpot",
    scale: "10-Point Decimal Scale",
    sampleRaw: "9.5 / 10",
    normalized: 95,
  },
  {
    outlet: "Eurogamer",
    scale: "5-Star Editorial Scale",
    sampleRaw: "5 / 5 ★",
    normalized: 100,
  },
  {
    outlet: "PC Gamer",
    scale: "100-Point Native Scale",
    sampleRaw: "94 / 100",
    normalized: 94,
  },
  {
    outlet: "OpenCritic",
    scale: "Top Critic Mighty Average",
    sampleRaw: "95 Mighty",
    normalized: 95,
  },
  {
    outlet: "Steam Verified",
    scale: "Positive Player Ratio (%)",
    sampleRaw: "92% Positive",
    normalized: 92,
  },
];

export default function PricingPage() {
  return (
    <div className="marge-x py-8 space-y-10 max-w-5xl">
      {/* 01 / Asymmetric Editorial Masthead */}
      <div className="flex flex-wrap items-end justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400">
            <span className="text-white font-semibold">01 /</span>
            <span>NORMALIZATION METHODOLOGY &amp; TIER THRESHOLDS</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-white">
            Scoring Index
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-xl">
            How MetaPulse converts 5-star, 10-point, and percentage ratings onto
            a single 0–100 critical consensus archive.
          </p>
        </div>
        <Button variant="outline" size="sm" asChild>
          <Link href="/browse/ios/apps">Back to Games</Link>
        </Button>
      </div>

      {/* Exposed 1px Seam 3-Column Tier Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.08] border border-white/[0.08] rounded-lg overflow-hidden">
        <div className="bg-[#181c28] p-6 space-y-3">
          <div className="flex items-baseline justify-between">
            <span className="text-[11px] font-mono text-zinc-300">
              TIER I BENCHMARK
            </span>
            <span className="font-mono text-2xl font-bold tabular-nums text-white">
              90 – 100
            </span>
          </div>
          <h2 className="text-base font-semibold text-white">
            Universal Acclaim
          </h2>
          <p className="text-xs text-zinc-300 leading-relaxed">
            Essential benchmark releases with near-unanimous critical consensus
            across all indexed publications.
          </p>
        </div>

        <div className="bg-[#12151e] p-6 space-y-3">
          <div className="flex items-baseline justify-between">
            <span className="text-[11px] font-mono text-zinc-400">
              TIER II CLASSIFICATION
            </span>
            <span className="font-mono text-2xl font-bold tabular-nums text-white">
              75 – 89
            </span>
          </div>
          <h2 className="text-base font-semibold text-zinc-100">
            Generally Favorable
          </h2>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Strong craft and mechanical execution recommended across major
            outlets with minor noted caveats.
          </p>
        </div>

        <div className="bg-[#12151e] p-6 space-y-3">
          <div className="flex items-baseline justify-between">
            <span className="text-[11px] font-mono text-zinc-400">
              TIER III CLASSIFICATION
            </span>
            <span className="font-mono text-2xl font-bold tabular-nums text-white">
              0 – 74
            </span>
          </div>
          <h2 className="text-base font-semibold text-zinc-100">
            Mixed or Average
          </h2>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Polarizing reception, uneven pacing, or technical caveats noted by
            multiple publications.
          </p>
        </div>
      </div>

      {/* 02 / Flush Hairline Scale Conversion Specification Ledger */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400">
          <span className="text-white font-semibold">02 /</span>
          <span>STANDARDIZED 0–100 CONVERSION LEDGER</span>
        </div>

        <div className="rounded-lg border border-white/[0.08] bg-[#12151e] divide-y divide-white/[0.08] overflow-hidden">
          {CONVERSION_ROWS.map((row) => (
            <div
              key={row.outlet}
              className="p-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-0.5 min-w-[200px]">
                <div className="text-sm font-semibold text-white">
                  {row.outlet}
                </div>
                <div className="text-xs font-mono text-zinc-400">
                  {row.scale}
                </div>
              </div>

              <div className="flex-1 max-w-xs">
                <div className="relative h-1.5 w-full rounded-sm bg-white/[0.08] overflow-hidden">
                  <div
                    className="h-full bg-zinc-200"
                    style={{ width: `${row.normalized}%` }}
                  />
                  <span
                    aria-hidden="true"
                    className="absolute top-0 bottom-0 left-[80%] w-px bg-[#090a0f]"
                  />
                </div>
              </div>

              <div className="font-mono text-xs tabular-nums text-right shrink-0">
                <span className="text-zinc-400">{row.sampleRaw}</span>
                <span className="mx-2 text-zinc-600">→</span>
                <strong className="text-base text-white">
                  {row.normalized}
                </strong>
                <span className="text-[10px] text-zinc-500">/100</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
