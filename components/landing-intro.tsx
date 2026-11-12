"use client";

import { ScrollFade } from "@/components/scroll-fade-section";
import { useGameFilter } from "@/hooks/use-game-filter";
import { useSearchModal } from "@/hooks/use-search-modal";
import {
  BENTO_MATRIX_GAMES,
  FLUID_PRICING_TIERS,
  PLATFORM_HUB_VIEWS,
  type PlatformTabId,
  filterMatrixGames,
  formatFluidPlanPrice,
} from "@/lib/fluid-flow-data";
import { validateWaitlistEmail } from "@/lib/seo-data";
import { cn } from "@/lib/utils";
import {
  Check,
  Cpu,
  Gamepad2,
  Layers,
  Laptop,
  Monitor,
  Search,
  ShieldAlert,
  SlidersHorizontal,
  Sparkles,
  Smartphone,
  Tag,
  Tv,
  Wrench,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const PLATFORM_TABS: {
  id: PlatformTabId;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  { id: "all", label: "All Platforms", icon: Layers },
  { id: "pc", label: "PC / Steam", icon: Monitor },
  { id: "ps5", label: "PlayStation 5", icon: Tv },
  { id: "xbox", label: "Xbox Series X|S", icon: Gamepad2 },
  { id: "switch", label: "Nintendo Switch", icon: Smartphone },
  { id: "deck", label: "Steam Deck", icon: Laptop },
];

const TRUSTED_OUTLETS = [
  { name: "IGN", code: "IG", outletFilter: "IGN" },
  { name: "GameSpot", code: "GS", outletFilter: "GameSpot" },
  { name: "Eurogamer", code: "EG", outletFilter: "Eurogamer" },
  { name: "PC Gamer", code: "PC", outletFilter: "PC Gamer" },
  { name: "Polygon", code: "PG", outletFilter: "All" },
  { name: "Metacritic", code: "MC", outletFilter: "OpenCritic" },
  { name: "Steam", code: "ST", outletFilter: "Steam" },
  { name: "RAWG", code: "RW", outletFilter: "All" },
  { name: "Digital Foundry", code: "DF", outletFilter: "All" },
];

const FEATURE_MATRIX_CARDS = [
  {
    title: "Universal Outlet Consensus",
    description:
      "Compare quotes and ratings from major journalists across every ecosystem side-by-side.",
    icon: Layers,
  },
  {
    title: "Handheld & Console Compatibility",
    description:
      "Track performance flags for Steam Deck verified status, Switch 30fps caps, and PS5 Pro performance modes.",
    icon: Cpu,
  },
  {
    title: "Spoiler-Free Verdict Summaries",
    description:
      "AI-distilled review rundowns covering gameplay loop, technical stability, and microtransactions.",
    icon: Sparkles,
  },
  {
    title: "Performance & Day-One Patch Tracker",
    description:
      "Real-time alerts for shader stutter fixes, console stability updates, and driver optimizations.",
    icon: Wrench,
  },
  {
    title: "Cross-Store Price & Deal Sync",
    description:
      "Tracks score-to-price value with live discount feeds from Steam, PlayStation Store, Xbox Marketplace, and Nintendo eShop.",
    icon: Tag,
  },
  {
    title: "Custom Platform Bias Controls",
    description:
      "Filter out reviews from outlets or user bases that show clear platform favoritism.",
    icon: SlidersHorizontal,
  },
];

const CURATOR_TESTIMONIALS = [
  {
    id: "guild",
    quote:
      "Finding out how a game runs on Switch versus PC used to take 20 browser tabs. Fluid Flow aggregates cross-platform performance and reviews in seconds.",
    author: "Marcus Vance",
    role: "Senior Reviewer, Cross-Platform Gaming Guild",
    badge: "Cross-Platform Guild",
  },
  {
    id: "deck",
    quote:
      "The launch-week vs post-patch sentiment spline immediately reveals when a broken PC port has actually been fixed for Steam Deck.",
    author: "Elena Rostova",
    role: "Lead Hardware Analyst, Handheld Foundry",
    badge: "Handheld Foundry",
  },
  {
    id: "indie",
    quote:
      "Normalizing 5-star Eurogamer verdicts, 10-point IGN scores, and verified Steam reviews into one FluidScore saved our studio's launch tracking.",
    author: "Devon K.",
    role: "Publishing Director, Nebula Interactive",
    badge: "Nebula Interactive",
  },
];

const MATRIX_PLATFORMS = ["All", "PC", "PS5", "Xbox", "Switch", "Deck"];
const MATRIX_GENRES = ["All", "RPG", "Action", "Roguelike", "Indie"];

export function LandingIntro() {
  const router = useRouter();
  const { openGameModal, setOutlet } = useGameFilter();
  const { onOpen: openSearchModal } = useSearchModal();

  // Section C: Floating Multi-Platform Hub Preview state
  const [activePlatformTab, setActivePlatformTab] =
    useState<PlatformTabId>("all");

  // Section E (Card 2): Console & Genre Matrix state
  const [matrixSearchQuery, setMatrixSearchQuery] = useState("");
  const [matrixPlatform, setMatrixPlatform] = useState("All");
  const [matrixGenre, setMatrixGenre] = useState("All");

  // Section G: Player & Critic Testimonial Spotlight state
  const [activeCuratorIdx, setActiveCuratorIdx] = useState(0);

  // Section H: Tiered Pricing Plans state
  const [isAnnualPass, setIsAnnualPass] = useState(false);
  const [selectedTierBanner, setSelectedTierBanner] = useState<string | null>(
    null
  );

  // Section I: Waitlist / Stream quick-join state
  const [streamEmail, setStreamEmail] = useState("");
  const [streamEmailError, setStreamEmailError] = useState<string | null>(null);
  const [streamEmailSuccess, setStreamEmailSuccess] = useState(false);

  const activeHubView = PLATFORM_HUB_VIEWS[activePlatformTab];
  const filteredMatrixResults = filterMatrixGames(
    BENTO_MATRIX_GAMES,
    matrixSearchQuery,
    matrixPlatform,
    matrixGenre
  );
  const activeCurator =
    CURATOR_TESTIMONIALS[activeCuratorIdx] || CURATOR_TESTIMONIALS[0];

  const handleOutletClick = (outletFilter: string) => {
    setOutlet(outletFilter);
    router.push("/browse/ios/apps");
  };

  const handleSelectTier = (tierName: string, isFree: boolean) => {
    if (isFree) {
      router.push("/browse/ios/apps");
      return;
    }
    setSelectedTierBanner(tierName);
    const ctaEl = document.getElementById("join-stream");
    if (ctaEl) {
      ctaEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleStreamSignup = (e: React.FormEvent) => {
    e.preventDefault();
    const res = validateWaitlistEmail(streamEmail);
    if (!res.valid) {
      setStreamEmailError(res.error || "Please enter a valid email address.");
      setStreamEmailSuccess(false);
      return;
    }
    setStreamEmailError(null);
    setStreamEmailSuccess(true);
  };

  return (
    <div className="min-h-screen bg-[#030305] text-zinc-100 overflow-x-hidden selection:bg-purple-500/30 selection:text-white">
      {/* =====================================================================
          SECTION B & C: HERO SECTION + FLOATING MULTI-PLATFORM HUB PREVIEW
      ===================================================================== */}
      <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden">
        {/* Hardware-accelerated Pure CSS Radial Ambient Glows (#6E2CF4 & #8B5CF6) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[880px]"
          style={{
            background:
              "radial-gradient(58% 50% at 50% 32%, rgba(110, 44, 244, 0.44) 0%, rgba(139, 92, 246, 0.24) 44%, rgba(3, 3, 5, 0) 78%)",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-[280px] h-[720px]"
          style={{
            background:
              "radial-gradient(65% 54% at 50% 48%, rgba(139, 92, 246, 0.3) 0%, rgba(110, 44, 244, 0.12) 54%, rgba(3, 3, 5, 0) 84%)",
          }}
        />

        <div className="relative max-w-[1180px] mx-auto px-4 sm:px-6">
          {/* Hero Content Stack */}
          <ScrollFade className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-6 pb-10 md:pb-14">
            {/* Top Glass Pill Badge */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-purple-400/30 bg-white/[0.03] backdrop-blur-md px-4 py-1.5 text-xs text-purple-200 shadow-[0_0_24px_rgba(110,44,244,0.28)]">
              <span className="font-medium tracking-tight">
                ✨ Tracking 150+ Outlets &amp; Multi-Platform Communities
              </span>
            </div>

            {/* Display Heading */}
            <h1 className="text-4xl sm:text-6xl md:text-[66px] font-semibold tracking-tight leading-[1.05] text-balance bg-gradient-to-b from-white via-white to-purple-200/85 bg-clip-text text-transparent drop-shadow-[0_4px_30px_rgba(110,44,244,0.38)]">
              Every game review. Every platform. One fluid stream.
            </h1>

            {/* Sub-headline */}
            <p className="text-sm sm:text-base md:text-lg text-zinc-400 max-w-2xl leading-relaxed">
              Stop juggling Metacritic tabs, Steam reviews, and Reddit threads.
              Fluid Flow aggregates, normalizes, and verifies critic and
              community scores across PC, PlayStation, Xbox, and Nintendo into
              one definitive index.
            </p>

            {/* Primary Action */}
            <div className="pt-1 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/browse/ios/apps"
                className="inline-flex items-center justify-center h-11 px-7 rounded-full bg-white text-black font-semibold text-sm hover:bg-zinc-200 shadow-[0_0_30px_rgba(110,44,244,0.4)] transition-all whitespace-nowrap shrink-0"
              >
                Explore Aggregated Games
              </Link>
              <button
                type="button"
                onClick={openSearchModal}
                className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-full border border-white/[0.12] bg-white/[0.03] hover:bg-white/[0.07] text-xs sm:text-sm font-medium text-zinc-200 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Search className="size-3.5 text-purple-300" />
                <span>Quick Lookup (⌘K)</span>
              </button>
            </div>
          </ScrollFade>

          {/* Section C: Floating Multi-Platform Hub Preview (Hero Card) */}
          <ScrollFade delayMs={40} className="relative">
            <div className="rounded-2xl border border-white/[0.12] bg-[#080612]/95 p-1.5 sm:p-2.5 shadow-[0_25px_90px_rgba(110,44,244,0.34)]">
              <div className="rounded-xl border border-white/[0.08] bg-[#06050c] overflow-hidden">
                {/* Top Platform Filter Bar (Segmented Control Pill Tabs with Icons) */}
                <div className="flex flex-wrap items-center justify-between gap-3 px-3.5 sm:px-5 py-3 border-b border-white/[0.08] bg-white/[0.02]">
                  <div
                    role="tablist"
                    aria-label="Multi-Platform Review Filter"
                    className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-0.5"
                  >
                    {PLATFORM_TABS.map((tab) => {
                      const Icon = tab.icon;
                      const isActive = activePlatformTab === tab.id;
                      return (
                        <button
                          key={tab.id}
                          type="button"
                          role="tab"
                          aria-selected={isActive}
                          onClick={() => setActivePlatformTab(tab.id)}
                          className={cn(
                            "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap shrink-0 transition-all cursor-pointer",
                            isActive
                              ? "bg-gradient-to-r from-[#6E2CF4] to-[#8B5CF6] text-white shadow-[0_0_20px_rgba(139,92,246,0.45)] border border-purple-300/40"
                              : "bg-white/[0.03] text-zinc-400 hover:text-white hover:bg-white/[0.06] border border-white/[0.07]"
                          )}
                        >
                          <Icon className="size-3.5 shrink-0" />
                          <span>{tab.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="hidden xl:flex items-center gap-2 font-mono text-[11px] text-zinc-400 tabular-nums shrink-0">
                    <span className="inline-flex items-center rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-0.5 text-emerald-400">
                      LIVE STREAM SYNCED
                    </span>
                  </div>
                </div>

                {/* Hub Body */}
                <div className="p-4 sm:p-6 space-y-5 bg-[#06050c]">
                  {/* Key Metrics Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Metric 1: Aggregated FluidScore */}
                    <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 sm:p-5 flex items-center justify-between gap-4">
                      <div className="space-y-1.5">
                        <div className="text-xs font-medium text-zinc-400">
                          Aggregated FluidScore ({activeHubView.shortLabel})
                        </div>
                        <div className="flex flex-wrap items-baseline gap-2.5">
                          <span className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-mono tabular-nums">
                            {activeHubView.fluidScore}
                          </span>
                          <span className="inline-flex items-center rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-0.5 text-[11px] font-mono font-semibold tabular-nums">
                            {activeHubView.fluidScoreBadge}
                          </span>
                        </div>
                      </div>

                      <div className="hidden sm:flex flex-col items-end font-mono text-xs text-zinc-400 border-l border-white/[0.08] pl-4 shrink-0 tabular-nums">
                        <span>NORMALIZED</span>
                        <span className="text-white font-semibold mt-0.5">
                          0–100 SCALE
                        </span>
                      </div>
                    </div>

                    {/* Metric 2: Cross-Platform Consensus */}
                    <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 sm:p-5 flex flex-col justify-center space-y-1.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-medium text-zinc-400">
                          Cross-Platform Consensus
                        </span>
                        <span className="inline-flex items-center rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 text-[10px] font-mono font-semibold">
                          VERIFIED
                        </span>
                      </div>
                      <div className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-mono tabular-nums">
                        {activeHubView.consensusValue}
                      </div>
                      <p className="text-xs text-zinc-400 leading-relaxed">
                        {activeHubView.consensusDetail}
                      </p>
                    </div>
                  </div>

                  {/* Main Area: Cross-Platform Sentiment Trend Spline Chart */}
                  <div className="rounded-xl border border-white/[0.08] bg-gradient-to-b from-white/[0.025] to-purple-950/[0.18] p-4 sm:p-5 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <div className="text-xs sm:text-sm font-semibold text-white">
                          Cross-Platform Sentiment Trend ({activeHubView.label})
                        </div>
                        <div className="text-xs text-zinc-400">
                          Launch-week critic scores vs. post-patch community
                          sentiment stability across PC and console releases
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-xs font-mono text-zinc-300">
                        <span className="inline-flex items-center gap-1.5">
                          <span className="h-0.5 w-3 bg-[#A855F7] inline-block" />
                          <span>Critic Consensus</span>
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <span className="h-0.5 w-3 bg-emerald-400 inline-block" />
                          <span>Post-Patch Player Stability</span>
                        </span>
                      </div>
                    </div>

                    <div className="relative pt-2">
                      <svg
                        viewBox="0 0 450 170"
                        className="w-full h-40 sm:h-48 overflow-visible"
                        role="img"
                        aria-label={`Cross-Platform Sentiment Trend chart for ${activeHubView.label}`}
                      >
                        <defs>
                          <linearGradient
                            id="fluidSplineFill"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="0%"
                              stopColor="#8B5CF6"
                              stopOpacity="0.46"
                            />
                            <stop
                              offset="65%"
                              stopColor="#6E2CF4"
                              stopOpacity="0.16"
                            />
                            <stop
                              offset="100%"
                              stopColor="#6E2CF4"
                              stopOpacity="0.0"
                            />
                          </linearGradient>
                        </defs>

                        {[32, 74, 116, 158].map((yPos) => (
                          <line
                            key={yPos}
                            x1="14"
                            y1={yPos}
                            x2="436"
                            y2={yPos}
                            stroke="rgba(255,255,255,0.07)"
                            strokeDasharray="3 4"
                          />
                        ))}

                        {/* Glowing Purple Area Fill */}
                        <path
                          d={activeHubView.criticAreaPath}
                          fill="url(#fluidSplineFill)"
                        />

                        {/* Launch-Week Critic Spline */}
                        <path
                          d={activeHubView.criticSplinePath}
                          fill="none"
                          stroke="#A855F7"
                          strokeWidth="2.5"
                        />

                        {/* Post-Patch Community Sentiment Spline */}
                        <path
                          d={activeHubView.communitySplinePath}
                          fill="none"
                          stroke="#34D399"
                          strokeWidth="2"
                          strokeDasharray="5 3"
                        />

                        {/* Highlight Marker & Callout Box */}
                        <line
                          x1={activeHubView.highlightCallout.x}
                          y1={activeHubView.highlightCallout.y}
                          x2={activeHubView.highlightCallout.x}
                          y2="162"
                          stroke="rgba(168,85,247,0.45)"
                          strokeDasharray="3 3"
                        />
                        <circle
                          cx={activeHubView.highlightCallout.x}
                          cy={activeHubView.highlightCallout.y}
                          r="5"
                          fill="#06050c"
                          stroke="#ffffff"
                          strokeWidth="2.5"
                        />

                        <g
                          transform={`translate(${Math.min(
                            270,
                            activeHubView.highlightCallout.x - 16
                          )}, ${Math.max(
                            8,
                            activeHubView.highlightCallout.y - 42
                          )})`}
                        >
                          <rect
                            x="0"
                            y="0"
                            width="162"
                            height="36"
                            rx="8"
                            fill="#100b20"
                            stroke="rgba(168,85,247,0.45)"
                          />
                          <text
                            x="10"
                            y="14"
                            fill="#c4b5fd"
                            fontSize="9.5"
                            fontFamily="monospace"
                          >
                            {activeHubView.highlightCallout.label}
                          </text>
                          <text
                            x="10"
                            y="27"
                            fill="#ffffff"
                            fontSize="10"
                            fontWeight="600"
                            fontFamily="monospace"
                          >
                            {activeHubView.highlightCallout.criticScore} ·{" "}
                            {activeHubView.highlightCallout.communityScore}
                          </text>
                        </g>
                      </svg>
                    </div>
                  </div>

                  {/* Mini Cards Preview: Thumbnail Strip of Recent Cross-Platform Releases */}
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-zinc-400">
                        Recent Cross-Platform Releases (Synced Side-by-Side
                        Scores)
                      </span>
                      <Link
                        href="/browse/ios/apps"
                        className="font-mono text-purple-300 hover:text-purple-200 transition-colors"
                      >
                        View all releases →
                      </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      {activeHubView.miniReleases.map((release) => (
                        <button
                          key={`${activeHubView.id}-${release.gameId}`}
                          type="button"
                          onClick={() => openGameModal(release.gameId)}
                          className="group rounded-xl border border-white/[0.08] bg-white/[0.025] hover:bg-white/[0.05] hover:border-purple-400/35 p-2.5 flex items-center gap-3 text-left transition-all cursor-pointer"
                        >
                          <div className="relative size-14 rounded-lg overflow-hidden border border-white/[0.1] shrink-0 bg-zinc-900">
                            <Image
                              src={release.coverImage}
                              alt={release.title}
                              fill
                              sizes="56px"
                              className="object-cover group-hover:scale-105 transition-transform"
                              referrerPolicy="no-referrer"
                            />
                          </div>

                          <div className="min-w-0 flex-1 space-y-1">
                            <div className="text-xs font-semibold text-white truncate">
                              {release.title}
                            </div>
                            <div className="flex items-center gap-1 flex-wrap">
                              {release.platforms.slice(0, 3).map((plat) => (
                                <span
                                  key={plat}
                                  className="font-mono text-[10px] text-zinc-400 bg-white/[0.04] px-1.5 py-0.2 rounded"
                                >
                                  {plat}
                                </span>
                              ))}
                            </div>
                            <div className="flex items-center justify-between font-mono text-[10px] tabular-nums pt-0.5">
                              <span className="text-emerald-400 font-semibold">
                                {release.fluidScore}/100
                              </span>
                              <span className="text-zinc-400 truncate ml-1">
                                {release.steamStatus}
                              </span>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollFade>
        </div>
      </section>

      {/* =====================================================================
          SECTION D: TRUSTED GAMING OUTLETS STRIP (TICKER / LOGO BAR)
      ===================================================================== */}
      <ScrollFade
        as="section"
        className="py-12 md:py-16 border-b border-white/[0.07]"
      >
        <div className="max-w-[1180px] mx-auto px-4 sm:px-6 space-y-6">
          <p className="text-center text-xs sm:text-sm text-zinc-400 font-medium">
            Consolidating verified scores and publications worldwide
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-2.5">
            {TRUSTED_OUTLETS.map((outlet) => (
              <button
                key={outlet.name}
                type="button"
                onClick={() => handleOutletClick(outlet.outletFilter)}
                className="h-14 rounded-xl border border-white/[0.08] bg-white/[0.02] hover:bg-purple-950/25 hover:border-purple-400/35 px-3 flex items-center justify-center gap-2 opacity-70 hover:opacity-100 hover:shadow-[0_0_20px_rgba(139,92,246,0.2)] transition-all cursor-pointer"
              >
                <span className="inline-flex items-center justify-center size-5 rounded border border-white/[0.14] bg-white/[0.04] font-mono text-[10px] font-bold text-purple-200 shrink-0">
                  {outlet.code}
                </span>
                <span className="text-xs font-semibold tracking-tight text-zinc-200 truncate">
                  {outlet.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </ScrollFade>

      {/* =====================================================================
          SECTION E: BENTO GRID: CROSS-PLATFORM POWER FEATURES (#platforms)
      ===================================================================== */}
      <section id="platforms" className="py-16 md:py-24 relative">
        <div className="max-w-[1160px] mx-auto px-4 sm:px-6 space-y-12">
          <ScrollFade className="max-w-2xl mx-auto text-center space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-purple-300 uppercase tracking-wider">
              <span>Cross-Platform Power Features</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-semibold tracking-tight leading-tight text-balance text-white">
              Engineered to eliminate review bias and platform fragmentation.
            </h2>
          </ScrollFade>

          {/* 4-Card Bento Grid Layout */}
          <div className="space-y-5">
            {/* Row 1: Top-Left (3D Glass Ring / Engine) + Top-Right (Console & Genre Matrix) */}
            <ScrollFade className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
              {/* Card 1: Top-Left (3D Glass Ring / Engine) */}
              <div className="lg:col-span-4 rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-md p-6 flex flex-col justify-between min-h-[370px] hover:border-purple-400/30 transition-colors">
                <div className="flex items-center justify-center py-5">
                  <svg
                    viewBox="0 0 220 180"
                    className="w-48 h-40 overflow-visible drop-shadow-[0_16px_34px_rgba(110,44,244,0.36)]"
                    aria-hidden="true"
                  >
                    <defs>
                      <linearGradient
                        id="fluidTorusOuter"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop
                          offset="0%"
                          stopColor="#ffffff"
                          stopOpacity="0.96"
                        />
                        <stop
                          offset="28%"
                          stopColor="#c084fc"
                          stopOpacity="0.9"
                        />
                        <stop
                          offset="55%"
                          stopColor="#6E2CF4"
                          stopOpacity="0.88"
                        />
                        <stop
                          offset="80%"
                          stopColor="#38bdf8"
                          stopOpacity="0.82"
                        />
                        <stop
                          offset="100%"
                          stopColor="#1e1b4b"
                          stopOpacity="0.94"
                        />
                      </linearGradient>
                      <linearGradient
                        id="fluidTorusInner"
                        x1="100%"
                        y1="0%"
                        x2="0%"
                        y2="100%"
                      >
                        <stop
                          offset="0%"
                          stopColor="#34d399"
                          stopOpacity="0.82"
                        />
                        <stop
                          offset="45%"
                          stopColor="#e879f9"
                          stopOpacity="0.88"
                        />
                        <stop
                          offset="100%"
                          stopColor="#090714"
                          stopOpacity="0.95"
                        />
                      </linearGradient>
                      <linearGradient
                        id="fluidGlassReflection"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop
                          offset="0%"
                          stopColor="#ffffff"
                          stopOpacity="0"
                        />
                        <stop
                          offset="50%"
                          stopColor="#ffffff"
                          stopOpacity="0.95"
                        />
                        <stop
                          offset="100%"
                          stopColor="#38bdf8"
                          stopOpacity="0"
                        />
                      </linearGradient>
                      <radialGradient
                        id="fluidFloorReflection"
                        cx="50%"
                        cy="50%"
                        r="50%"
                      >
                        <stop
                          offset="0%"
                          stopColor="#a855f7"
                          stopOpacity="0.38"
                        />
                        <stop
                          offset="55%"
                          stopColor="#38bdf8"
                          stopOpacity="0.14"
                        />
                        <stop
                          offset="100%"
                          stopColor="#090714"
                          stopOpacity="0"
                        />
                      </radialGradient>
                    </defs>

                    {/* Soft Mirrored Surface Reflection Beneath the Floating Ring */}
                    <g transform="translate(110 152) rotate(-10)">
                      <ellipse
                        cx="0"
                        cy="0"
                        rx="68"
                        ry="13"
                        fill="url(#fluidFloorReflection)"
                      >
                        <animate
                          attributeName="opacity"
                          values="0.55;0.95;0.55"
                          dur="5s"
                          repeatCount="indefinite"
                        />
                      </ellipse>
                      <ellipse
                        cx="0"
                        cy="0"
                        rx="44"
                        ry="5.5"
                        fill="none"
                        stroke="url(#fluidGlassReflection)"
                        strokeWidth="1.5"
                        strokeOpacity="0.55"
                      >
                        <animate
                          attributeName="stroke-opacity"
                          values="0.25;0.7;0.25"
                          dur="4s"
                          repeatCount="indefinite"
                        />
                      </ellipse>
                    </g>

                    {/* 3D Tilted Torus Plane with Slow Continuous Spin & Reflections */}
                    <g transform="translate(110 86) rotate(-18) scale(1 0.605)">
                      {/* Primary Slowly Spinning 3D Chromatic Ring Body */}
                      <g>
                        <animateTransform
                          attributeName="transform"
                          type="rotate"
                          from="0 0 0"
                          to="360 0 0"
                          dur="14s"
                          repeatCount="indefinite"
                        />
                        <circle
                          cx="0"
                          cy="0"
                          r="76"
                          fill="none"
                          stroke="url(#fluidTorusOuter)"
                          strokeWidth="28"
                        />
                        <circle
                          cx="0"
                          cy="0"
                          r="76"
                          fill="none"
                          stroke="url(#fluidTorusInner)"
                          strokeWidth="11"
                          strokeDasharray="195 125"
                          strokeLinecap="round"
                        />
                        {/* Outer Rim Bevel Glass Reflection */}
                        <circle
                          cx="0"
                          cy="0"
                          r="89"
                          fill="none"
                          stroke="url(#fluidGlassReflection)"
                          strokeWidth="2"
                          strokeDasharray="140 220"
                          strokeLinecap="round"
                        />
                      </g>

                      {/* Counter-Gliding Specular Glass Highlights & Caustic Reflections */}
                      <g>
                        <animateTransform
                          attributeName="transform"
                          type="rotate"
                          from="360 0 0"
                          to="0 0 0"
                          dur="9s"
                          repeatCount="indefinite"
                        />
                        {/* Main High-Gloss Top Specular Arc */}
                        <circle
                          cx="0"
                          cy="0"
                          r="72"
                          fill="none"
                          stroke="#ffffff"
                          strokeOpacity="0.9"
                          strokeWidth="3"
                          strokeDasharray="95 260"
                          strokeLinecap="round"
                        />
                        {/* Secondary Inner Bevel Glass Glint */}
                        <circle
                          cx="0"
                          cy="0"
                          r="63"
                          fill="none"
                          stroke="#e0f2fe"
                          strokeOpacity="0.7"
                          strokeWidth="1.75"
                          strokeDasharray="65 240"
                          strokeDashoffset="140"
                          strokeLinecap="round"
                        />
                      </g>
                    </g>

                    <text
                      x="110"
                      y="91"
                      textAnchor="middle"
                      fill="#ffffff"
                      fontSize="16"
                      fontWeight="700"
                      fontFamily="monospace"
                    >
                      0–100
                    </text>
                  </svg>
                </div>

                <div className="space-y-2 pt-2">
                  <div className="text-[11px] font-mono text-purple-300 uppercase tracking-wider">
                    Normalization Engine
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight text-white">
                    Dynamic Multi-Platform Normalization
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    Normalizes 5-star ratings, 10-point scales, and letter
                    grades across all platforms into an objective 100-point
                    standard index.
                  </p>
                </div>
              </div>

              {/* Card 2: Top-Right (Console & Genre Matrix Interactive Mockup) */}
              <div className="lg:col-span-8 rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.03] via-[#120926]/80 to-purple-900/35 backdrop-blur-md p-6 flex flex-col justify-between min-h-[370px]">
                <div className="rounded-xl border border-white/[0.1] bg-[#07060f]/95 p-4 space-y-3.5 shadow-xl">
                  {/* Search Input + Steam Verified Count */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.07] pb-3">
                    <div className="relative flex-1 min-w-[200px]">
                      <label htmlFor="bento-matrix-search" className="sr-only">
                        Universal game and platform search
                      </label>
                      <Search className="size-3.5 text-purple-300 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        id="bento-matrix-search"
                        type="text"
                        value={matrixSearchQuery}
                        onChange={(e) => setMatrixSearchQuery(e.target.value)}
                        placeholder="Search games across PC, PS5, Xbox, Switch, Deck..."
                        className="h-9 w-full rounded-lg border border-white/[0.1] bg-white/[0.03] pl-8 pr-3 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-purple-400/50"
                      />
                    </div>

                    <span className="inline-flex items-center rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 text-[11px] font-mono font-semibold tabular-nums">
                      Steam Deck Verified Ready
                    </span>
                  </div>

                  {/* Platform Selector Toggles & Genre Filters */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-1">
                      {MATRIX_PLATFORMS.map((plat) => {
                        const active = matrixPlatform === plat;
                        return (
                          <button
                            key={plat}
                            type="button"
                            onClick={() => setMatrixPlatform(plat)}
                            className={cn(
                              "px-2.5 py-1 rounded-md text-[11px] font-mono transition-colors cursor-pointer",
                              active
                                ? "bg-purple-600/45 text-white border border-purple-400/40"
                                : "bg-white/[0.03] text-zinc-400 border border-white/[0.07] hover:text-white"
                            )}
                          >
                            {plat}
                          </button>
                        );
                      })}
                    </div>

                    <div className="flex flex-wrap items-center gap-1">
                      {MATRIX_GENRES.map((genre) => {
                        const active = matrixGenre === genre;
                        return (
                          <button
                            key={genre}
                            type="button"
                            onClick={() => setMatrixGenre(genre)}
                            className={cn(
                              "px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors cursor-pointer",
                              active
                                ? "bg-white text-black font-semibold"
                                : "bg-white/[0.03] text-zinc-400 border border-white/[0.07] hover:text-white"
                            )}
                          >
                            {genre}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Live Matching Cross-Platform Rows */}
                  <div className="divide-y divide-white/[0.06] max-h-[140px] overflow-y-auto pr-1">
                    {filteredMatrixResults.length === 0 ? (
                      <div className="py-4 text-center text-xs text-zinc-400">
                        No games match the current platform + genre filter.
                      </div>
                    ) : (
                      filteredMatrixResults.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => openGameModal(item.id)}
                          className="w-full py-2 px-2 flex items-center justify-between gap-2 hover:bg-white/[0.04] rounded-lg text-left transition-colors cursor-pointer"
                        >
                          <div className="min-w-0 flex items-center gap-2">
                            <span className="text-xs font-semibold text-white truncate">
                              {item.title}
                            </span>
                            <span className="text-[10px] font-mono text-purple-300 bg-purple-500/15 border border-purple-400/25 px-1.5 py-0.2 rounded shrink-0">
                              {item.genre}
                            </span>
                          </div>

                          <div className="flex items-center gap-2.5 shrink-0 font-mono text-[11px] tabular-nums">
                            <span className="hidden sm:inline text-zinc-400">
                              {item.fpsNote}
                            </span>
                            {item.steamVerified && (
                              <span className="rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.2 text-[10px]">
                                Steam Verified
                              </span>
                            )}
                            <span className="font-bold text-white">
                              {item.fluidScore}/100
                            </span>
                          </div>
                        </button>
                      ))
                    )}
                  </div>
                </div>

                <div className="pt-5 space-y-1.5">
                  <h3 className="text-lg font-semibold tracking-tight text-white">
                    Console &amp; Genre Matrix
                  </h3>
                  <p className="text-sm text-zinc-300 max-w-xl leading-relaxed">
                    Live universal search bar with platform selector toggles,
                    genre filters (RPG, Action, Roguelike, Indie), and Steam
                    verified tags.
                  </p>
                </div>
              </div>
            </ScrollFade>

            {/* Row 2: Bottom-Left (99.2% Platform Parity Index Sparkline) + Bottom-Right (3D Prismatic Prism) */}
            <ScrollFade className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
              {/* Card 3: Bottom-Left (Deep Purple Sparkline Card) */}
              <div className="lg:col-span-8 rounded-2xl border border-purple-400/25 bg-gradient-to-br from-purple-900/60 via-purple-950/45 to-[#090514] backdrop-blur-md p-6 flex flex-col justify-between min-h-[340px] overflow-hidden">
                <div className="rounded-xl border border-white/[0.08] bg-[#080512]/85 p-4 space-y-3">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <div className="text-xs text-zinc-400">
                        Cross-Build Frame &amp; Visual Parity Telemetry
                      </div>
                      <div className="mt-1 flex flex-wrap items-baseline gap-2.5 font-mono tabular-nums">
                        <span className="text-2xl sm:text-3xl font-bold text-white">
                          99.2% Platform Parity Index
                        </span>
                        <span className="inline-flex items-center rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 text-xs font-semibold">
                          Verified Sync
                        </span>
                      </div>
                    </div>
                    <span className="font-mono text-[11px] text-purple-200 bg-purple-500/15 border border-purple-400/30 px-2.5 py-1 rounded-md">
                      PC vs PS5 / XSX / Deck
                    </span>
                  </div>

                  {/* Sparkline Graph */}
                  <svg
                    viewBox="0 0 520 120"
                    className="w-full h-28 overflow-visible"
                    role="img"
                    aria-label="99.2% Platform Parity Index sparkline graph"
                  >
                    <defs>
                      <linearGradient
                        id="paritySparkGrad"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor="#8B5CF6"
                          stopOpacity="0.55"
                        />
                        <stop
                          offset="100%"
                          stopColor="#6E2CF4"
                          stopOpacity="0.0"
                        />
                      </linearGradient>
                    </defs>
                    <line
                      x1="0"
                      y1="30"
                      x2="520"
                      y2="30"
                      stroke="rgba(255,255,255,0.06)"
                    />
                    <line
                      x1="0"
                      y1="75"
                      x2="520"
                      y2="75"
                      stroke="rgba(255,255,255,0.06)"
                    />
                    <path
                      d="M 0 96 L 65 78 L 130 84 L 195 50 L 260 60 L 325 34 L 390 44 L 455 24 L 520 14 L 520 116 L 0 116 Z"
                      fill="url(#paritySparkGrad)"
                    />
                    <path
                      d="M 0 96 L 65 78 L 130 84 L 195 50 L 260 60 L 325 34 L 390 44 L 455 24 L 520 14"
                      fill="none"
                      stroke="#C084FC"
                      strokeWidth="2.5"
                    />
                  </svg>
                </div>

                <div className="pt-5 space-y-1.5">
                  <h3 className="text-lg font-semibold tracking-tight text-white">
                    Cross-Platform Performance &amp; Port Parity
                  </h3>
                  <p className="text-sm text-zinc-300 max-w-xl leading-relaxed">
                    Tracks visual, frame-pacing, and shader compilation
                    discrepancies between PC, console, and handheld ports in
                    real time.
                  </p>
                </div>
              </div>

              {/* Card 4: Bottom-Right (3D Prismatic Prism — Review Bombing & Anomaly Detection) */}
              <div className="lg:col-span-4 rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-md p-6 flex flex-col justify-between min-h-[340px] hover:border-purple-400/30 transition-colors">
                <div className="flex items-center justify-center py-5">
                  <svg
                    viewBox="0 0 200 175"
                    className="w-44 h-36 overflow-visible drop-shadow-[0_16px_32px_rgba(139,92,246,0.32)]"
                    aria-hidden="true"
                  >
                    <defs>
                      <linearGradient
                        id="anomalyPrismLeft"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop
                          offset="0%"
                          stopColor="#ffffff"
                          stopOpacity="0.88"
                        />
                        <stop
                          offset="45%"
                          stopColor="#8B5CF6"
                          stopOpacity="0.5"
                        />
                        <stop
                          offset="100%"
                          stopColor="#090612"
                          stopOpacity="0.92"
                        />
                      </linearGradient>
                      <linearGradient
                        id="anomalyPrismRight"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop
                          offset="0%"
                          stopColor="#6E2CF4"
                          stopOpacity="0.9"
                        />
                        <stop
                          offset="65%"
                          stopColor="#34D399"
                          stopOpacity="0.6"
                        />
                        <stop
                          offset="100%"
                          stopColor="#A855F7"
                          stopOpacity="0.75"
                        />
                      </linearGradient>
                    </defs>
                    <polygon
                      points="56,22 68,148 158,96"
                      fill="url(#anomalyPrismLeft)"
                      stroke="rgba(255,255,255,0.6)"
                      strokeWidth="1.5"
                    />
                    <polygon
                      points="56,22 158,96 170,82"
                      fill="url(#anomalyPrismRight)"
                      stroke="rgba(255,255,255,0.85)"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M 68 148 Q 124 134 170 82"
                      fill="none"
                      stroke="#ffffff"
                      strokeWidth="2.5"
                      strokeOpacity="0.85"
                    />
                  </svg>
                </div>

                <div className="space-y-2 pt-2">
                  <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-purple-300 uppercase tracking-wider">
                    <ShieldAlert className="size-3.5" />
                    <span>Integrity Shield</span>
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight text-white">
                    Review Bombing &amp; Anomaly Detection
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    Algorithmic filters isolate coordinated review spikes and
                    platform-specific review bombs to preserve honest community
                    consensus.
                  </p>
                </div>
              </div>
            </ScrollFade>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION F: FEATURE MATRIX ("Elevate your game discovery." - #critic-consensus)
      ===================================================================== */}
      <ScrollFade
        as="section"
        id="critic-consensus"
        className="py-16 md:py-24 border-y border-white/[0.08] bg-gradient-to-b from-[#0b0518] via-[#070410] to-[#030305]"
      >
        <div className="max-w-[1160px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left Column: Large Bold Section Title */}
            <div className="lg:col-span-4 space-y-4">
              <div className="text-xs font-mono text-purple-300 uppercase tracking-wider">
                Discovery Engine
              </div>
              <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight leading-[1.08] text-white">
                Elevate your game discovery.
              </h2>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Every review stream is cross-checked against hardware telemetry,
                verified playtimes, and live storefront pricing.
              </p>
            </div>

            {/* Right Column: 2 Columns x 3 Rows of Clean Typographic Cards */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {FEATURE_MATRIX_CARDS.map((card) => {
                const Icon = card.icon;
                return (
                  <div
                    key={card.title}
                    className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 space-y-2.5 hover:border-purple-400/30 transition-colors"
                  >
                    <div className="flex items-center gap-2.5 text-sm font-semibold text-white">
                      <span className="flex items-center justify-center size-7 rounded-lg border border-purple-400/30 bg-purple-500/15 text-purple-300 shrink-0">
                        <Icon className="size-4" />
                      </span>
                      <h3>{card.title}</h3>
                    </div>
                    <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </ScrollFade>

      {/* =====================================================================
          SECTION G: PLAYER & CRITIC TESTIMONIAL SPOTLIGHT
      ===================================================================== */}
      <ScrollFade
        as="section"
        className="py-16 md:py-24 relative overflow-hidden"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(40% 44% at 45% 55%, rgba(139, 92, 246, 0.28) 0%, rgba(110, 44, 244, 0.08) 55%, transparent 80%)",
          }}
        />

        <div className="relative max-w-[1080px] mx-auto px-4 sm:px-6 space-y-12">
          {/* Section Header */}
          <div className="max-w-lg mx-auto text-center space-y-2.5">
            <div className="text-xs font-mono text-purple-300 uppercase tracking-wider">
              Community Consensus
            </div>
            <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-white">
              What players and curators say.
            </h2>
          </div>

          {/* Horizontal Wide Glass Card with Faint Purple Gradient Edges */}
          <div className="rounded-2xl border border-purple-400/25 bg-white/[0.03] backdrop-blur-md p-6 sm:p-10 shadow-[0_0_60px_rgba(110,44,244,0.2)]">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              {/* Left: Rounded Portrait Avatar with Monochrome Violet Wash */}
              <div className="md:col-span-4 flex justify-center">
                <div className="relative size-44 sm:size-52 rounded-2xl overflow-hidden border border-purple-300/35 shadow-[0_0_45px_rgba(139,92,246,0.35)] bg-gradient-to-br from-purple-500 via-purple-800 to-indigo-950">
                  <svg
                    viewBox="0 0 240 240"
                    className="w-full h-full object-cover"
                    role="img"
                    aria-label={`Portrait of ${activeCurator.author}`}
                  >
                    <defs>
                      <linearGradient
                        id="curatorVioletWash"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor="#c084fc" />
                        <stop offset="52%" stopColor="#6E2CF4" />
                        <stop offset="100%" stopColor="#120924" />
                      </linearGradient>
                    </defs>
                    <rect
                      width="240"
                      height="240"
                      fill="url(#curatorVioletWash)"
                    />
                    <circle
                      cx="120"
                      cy="108"
                      r="84"
                      fill="rgba(255,255,255,0.12)"
                    />
                    <path
                      d="M 46 240 C 52 178, 86 160, 120 160 C 154 160, 188 178, 194 240 Z"
                      fill="#160a2c"
                    />
                    <ellipse
                      cx="120"
                      cy="102"
                      rx="34"
                      ry="42"
                      fill="#e9d5ff"
                    />
                    <path
                      d="M 84 94 C 88 58, 152 58, 156 94 C 144 78, 96 78, 84 94 Z"
                      fill="#1e1035"
                    />
                    <rect
                      width="240"
                      height="240"
                      fill="rgba(110,44,244,0.22)"
                    />
                  </svg>
                </div>
              </div>

              {/* Right: Large Quote & Attribution */}
              <div className="md:col-span-8 text-center md:text-left space-y-5">
                <blockquote className="text-lg sm:text-2xl font-medium leading-snug text-white tracking-tight">
                  &ldquo;{activeCurator.quote}&rdquo;
                </blockquote>

                <div className="space-y-0.5">
                  <div className="text-sm font-semibold text-white">
                    {activeCurator.author}
                  </div>
                  <div className="text-xs text-zinc-400">
                    {activeCurator.role}
                  </div>
                </div>

                {/* Curator Switcher Pills */}
                <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-2">
                  {CURATOR_TESTIMONIALS.map((item, idx) => {
                    const active = idx === activeCuratorIdx;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setActiveCuratorIdx(idx)}
                        className={cn(
                          "px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer",
                          active
                            ? "bg-purple-500/30 text-white border border-purple-400/40"
                            : "bg-white/[0.03] text-zinc-400 border border-white/[0.08] hover:text-white"
                        )}
                      >
                        {item.badge}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollFade>

      {/* =====================================================================
          SECTION H: TIERED PRICING PLANS (#pricing)
      ===================================================================== */}
      <ScrollFade as="section" id="pricing" className="py-16 md:py-24 relative">
        <div className="max-w-[1140px] mx-auto px-4 sm:px-6 space-y-10">
          {/* Centered Header + Monthly / Annual Pill Toggle */}
          <div className="max-w-lg mx-auto text-center space-y-4">
            <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-white">
              Pricing
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
              Choose your tracker &amp; discovery tier.
            </p>

            {/* Monthly / Annual Pill Toggle */}
            <div className="pt-2 inline-flex flex-wrap items-center justify-center gap-3">
              <span
                className={cn(
                  "text-xs font-medium transition-colors",
                  !isAnnualPass ? "text-white" : "text-zinc-400"
                )}
              >
                Monthly
              </span>
              <button
                type="button"
                role="switch"
                aria-checked={isAnnualPass}
                aria-label="Toggle Annual Pass to save 20%"
                onClick={() => setIsAnnualPass((prev) => !prev)}
                className={cn(
                  "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border border-purple-400/35 transition-colors p-0.5",
                  isAnnualPass ? "bg-purple-600" : "bg-zinc-800"
                )}
              >
                <span
                  className={cn(
                    "pointer-events-none inline-block size-4.5 rounded-full bg-white shadow transition-transform",
                    isAnnualPass ? "translate-x-5" : "translate-x-0"
                  )}
                />
              </button>
              <span
                className={cn(
                  "text-xs font-medium transition-colors",
                  isAnnualPass ? "text-white" : "text-zinc-400"
                )}
              >
                Annual Pass
              </span>
              <span className="inline-flex items-center rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-0.5 text-[11px] font-mono font-semibold">
                Save 20% on Annual Pass
              </span>
            </div>
          </div>

          {/* 3-Card Pricing Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            {FLUID_PRICING_TIERS.map((tier) => {
              const priceDisplay = formatFluidPlanPrice(tier, isAnnualPass);
              const isHighlighted = Boolean(tier.popular);

              return (
                <div
                  key={tier.id}
                  className={cn(
                    "relative rounded-2xl p-6 sm:p-7 flex flex-col justify-between min-h-[460px] transition-all",
                    isHighlighted
                      ? "border border-purple-400/45 bg-gradient-to-b from-[#170b2c]/95 via-purple-950/65 to-[#2b125a]/85 shadow-[0_0_75px_rgba(110,44,244,0.35)]"
                      : "border border-white/[0.08] bg-white/[0.03] hover:border-white/[0.16]"
                  )}
                >
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="text-xl font-semibold text-white">
                          {tier.name}
                        </h3>
                        {isHighlighted && (
                          <span className="inline-flex items-center rounded-full border border-purple-300/40 bg-purple-500/30 px-2.5 py-0.5 text-[11px] font-semibold text-purple-100">
                            Most Popular
                          </span>
                        )}
                      </div>

                      <div className="flex items-baseline gap-1 font-mono tabular-nums">
                        <span className="text-3xl font-bold text-white">
                          {priceDisplay}
                        </span>
                        <span className="text-xs text-zinc-400">/mo</span>
                      </div>

                      <p className="text-xs text-zinc-400 leading-relaxed">
                        {tier.subtitle}
                      </p>
                    </div>

                    <div className="border-t border-white/[0.08] pt-5">
                      <ul className="space-y-3">
                        {tier.features.map((feat) => (
                          <li
                            key={feat}
                            className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-200"
                          >
                            <Check
                              className={cn(
                                "size-4 shrink-0 mt-0.5",
                                isHighlighted
                                  ? "text-purple-300"
                                  : "text-emerald-400"
                              )}
                            />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-8">
                    <button
                      type="button"
                      onClick={() =>
                        handleSelectTier(tier.name, tier.monthlyPrice === 0)
                      }
                      className={cn(
                        "w-full h-10 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer",
                        isHighlighted
                          ? "bg-purple-600 hover:bg-purple-500 text-white shadow-[0_0_25px_rgba(139,92,246,0.5)] border border-purple-400/40"
                          : "bg-white/[0.05] hover:bg-white/[0.1] text-zinc-200 border border-white/[0.1]"
                      )}
                    >
                      {tier.ctaLabel}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </ScrollFade>

      {/* =====================================================================
          SECTION I: FULL-WIDTH BOTTOM CTA BANNER (#join-stream)
      ===================================================================== */}
      <ScrollFade as="section" id="join-stream" className="py-12 md:py-20">
        <div className="max-w-[1140px] mx-auto px-4 sm:px-6">
          <div className="relative rounded-2xl border border-white/[0.12] bg-gradient-to-r from-purple-900/80 via-purple-700/60 to-black px-5 py-14 sm:px-12 sm:py-20 text-center overflow-hidden shadow-[0_20px_70px_rgba(110,44,244,0.28)]">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)",
                backgroundSize: "56px 56px",
              }}
            />

            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              {selectedTierBanner && (
                <div className="inline-flex items-center gap-2 rounded-full border border-purple-300/35 bg-purple-500/25 px-3.5 py-1 text-xs font-medium text-purple-100">
                  <span>Selected Tier: {selectedTierBanner}</span>
                </div>
              )}

              <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight leading-[1.08] text-balance text-white">
                Stop switching between tabs. Find your next game now.
              </h2>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
                <Link
                  href="/browse/ios/apps"
                  className="inline-flex items-center justify-center h-11 px-7 rounded-full bg-white text-black font-semibold text-sm hover:bg-zinc-200 shadow-[0_0_25px_rgba(255,255,255,0.3)] transition-all whitespace-nowrap shrink-0"
                >
                  Browse the Review Stream
                </Link>
              </div>

              {/* Optional Sync Account / Alert Signup */}
              <form
                onSubmit={handleStreamSignup}
                noValidate
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 max-w-md mx-auto pt-2"
              >
                <label htmlFor="fluid-stream-email" className="sr-only">
                  Email for cross-platform patch &amp; price alerts
                </label>
                <input
                  id="fluid-stream-email"
                  type="email"
                  value={streamEmail}
                  onChange={(e) => {
                    setStreamEmail(e.target.value);
                    if (streamEmailError) setStreamEmailError(null);
                  }}
                  placeholder="Enter email for patch & price alerts..."
                  className="h-10 flex-1 rounded-full border border-white/[0.16] bg-black/50 px-4 text-xs text-white placeholder:text-zinc-400 focus:outline-none focus:border-purple-300"
                />
                <button
                  type="submit"
                  className="h-10 px-4 rounded-full border border-purple-300/40 bg-purple-600/60 hover:bg-purple-600 text-xs font-semibold text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Sync Alerts
                </button>
              </form>

              {streamEmailError && (
                <p
                  role="alert"
                  className="text-xs font-medium text-rose-200 bg-rose-950/60 border border-rose-500/30 rounded-lg py-2 px-3 max-w-md mx-auto"
                >
                  {streamEmailError}
                </p>
              )}

              {streamEmailSuccess && (
                <p
                  role="status"
                  className="text-xs font-medium text-emerald-300 bg-emerald-950/60 border border-emerald-500/30 rounded-lg py-2 px-3 max-w-md mx-auto"
                >
                  Fluid Flow alerts activated for {streamEmail}!
                </p>
              )}
            </div>
          </div>
        </div>
      </ScrollFade>

      {/* =====================================================================
          SECTION J: FOOTER (#about)
      ===================================================================== */}
      <footer id="about" className="border-t border-zinc-900 bg-[#030305]">
        <div className="max-w-[1160px] mx-auto px-4 sm:px-6 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            {/* Left: Fluid Flow Brand Mark, Tagline, and Community Links */}
            <div className="md:col-span-4 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2.5 text-base font-semibold text-white"
                >
                  <span className="flex items-center justify-center size-7 rounded-lg border border-purple-400/40 bg-purple-600/30">
                    <Layers className="size-3.5 text-purple-200" />
                  </span>
                  <span>Fluid Flow</span>
                </Link>

                <p className="text-xs text-zinc-400 max-w-xs leading-relaxed">
                  The unified video game review aggregator normalizing critic
                  and community consensus across PC, PlayStation 5, Xbox Series
                  X|S, Nintendo Switch, and Steam Deck.
                </p>
              </div>

              <div className="flex items-center gap-5 text-xs font-medium text-zinc-400">
                <a
                  href="#about"
                  aria-label="Fluid Flow Discord Community"
                  className="hover:text-white transition-colors"
                >
                  Discord
                </a>
                <a
                  href="#about"
                  aria-label="Fluid Flow on X (Twitter)"
                  className="hover:text-white transition-colors"
                >
                  X/Twitter
                </a>
                <a
                  href="#about"
                  aria-label="Fluid Flow on GitHub"
                  className="hover:text-white transition-colors"
                >
                  GitHub
                </a>
              </div>
            </div>

            {/* Right: 4 Sitemap Columns (Platforms, Outlets, Features, Company) */}
            <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8 text-xs">
              <div className="space-y-3">
                <div className="font-semibold text-white">Platforms</div>
                <ul className="space-y-2.5 text-zinc-400">
                  <li>
                    <Link
                      href="/browse/ios/apps"
                      className="hover:text-white transition-colors"
                    >
                      PC &amp; Steam Deck
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/browse/android/apps"
                      className="hover:text-white transition-colors"
                    >
                      PlayStation 5
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/browse/android/apps"
                      className="hover:text-white transition-colors"
                    >
                      Xbox Series X|S
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/browse/web/apps"
                      className="hover:text-white transition-colors"
                    >
                      Nintendo Switch
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/browse/ios/apps"
                      className="hover:text-white transition-colors"
                    >
                      Retro &amp; VR
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <div className="font-semibold text-white">Outlets</div>
                <ul className="space-y-2.5 text-zinc-400">
                  <li>
                    <Link
                      href="/collections"
                      className="hover:text-white transition-colors"
                    >
                      IGN
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/collections"
                      className="hover:text-white transition-colors"
                    >
                      GameSpot
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/collections"
                      className="hover:text-white transition-colors"
                    >
                      Eurogamer
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/collections"
                      className="hover:text-white transition-colors"
                    >
                      PC Gamer
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/collections"
                      className="hover:text-white transition-colors"
                    >
                      Polygon
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/collections"
                      className="hover:text-white transition-colors"
                    >
                      Metacritic &amp; OpenCritic
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <div className="font-semibold text-white">Features</div>
                <ul className="space-y-2.5 text-zinc-400">
                  <li>
                    <a
                      href="#platforms"
                      className="hover:text-white transition-colors"
                    >
                      Score Normalizer
                    </a>
                  </li>
                  <li>
                    <a
                      href="#critic-consensus"
                      className="hover:text-white transition-colors"
                    >
                      Sentiment Analysis
                    </a>
                  </li>
                  <li>
                    <a
                      href="#critic-consensus"
                      className="hover:text-white transition-colors"
                    >
                      Deal Tracker
                    </a>
                  </li>
                  <li>
                    <a
                      href="#critic-consensus"
                      className="hover:text-white transition-colors"
                    >
                      Patch Tracker
                    </a>
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <div className="font-semibold text-white">Company</div>
                <ul className="space-y-2.5 text-zinc-400">
                  <li>
                    <a
                      href="#about"
                      className="hover:text-white transition-colors"
                    >
                      About Us
                    </a>
                  </li>
                  <li>
                    <a
                      href="#about"
                      className="hover:text-white transition-colors"
                    >
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a
                      href="#about"
                      className="hover:text-white transition-colors"
                    >
                      Terms of Service
                    </a>
                  </li>
                  <li>
                    <Link
                      href="/pricing"
                      className="hover:text-white transition-colors"
                    >
                      API Documentation
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
            <div>
              © 2026 Fluid Flow Index. All platform trademarks belong to their
              respective owners.
            </div>
            <div className="flex items-center gap-6">
              <a
                href="#about"
                className="hover:text-zinc-300 transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#about"
                className="hover:text-zinc-300 transition-colors"
              >
                Terms of Service
              </a>
              <Link
                href="/pricing"
                className="hover:text-zinc-300 transition-colors"
              >
                Scoring Methodology
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
