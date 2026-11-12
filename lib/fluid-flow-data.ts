export type PlatformTabId =
  | "all"
  | "pc"
  | "ps5"
  | "xbox"
  | "switch"
  | "deck";

export interface PlatformHubView {
  id: PlatformTabId;
  label: string;
  shortLabel: string;
  fluidScore: string;
  fluidScoreBadge: string;
  consensusValue: string;
  consensusDetail: string;
  criticSplinePath: string;
  criticAreaPath: string;
  communitySplinePath: string;
  highlightCallout: {
    label: string;
    criticScore: string;
    communityScore: string;
    x: number;
    y: number;
  };
  miniReleases: {
    gameId: number;
    title: string;
    coverImage: string;
    platforms: string[];
    fluidScore: number;
    steamStatus: string;
    criticVsUser: string;
  }[];
}

export const PLATFORM_HUB_VIEWS: Record<PlatformTabId, PlatformHubView> = {
  all: {
    id: "all",
    label: "All Platforms",
    shortLabel: "All Platforms",
    fluidScore: "89/100",
    fluidScoreBadge: "+6% vs Metascore Average",
    consensusValue: "94% Positive",
    consensusDetail:
      "across 42,000 verified player reviews and 54 critic outlets.",
    criticSplinePath:
      "M 14 128 C 60 116, 102 88, 152 84 C 202 80, 238 64, 288 54 C 334 45, 376 34, 436 24",
    criticAreaPath:
      "M 14 128 C 60 116, 102 88, 152 84 C 202 80, 238 64, 288 54 C 334 45, 376 34, 436 24 L 436 162 L 14 162 Z",
    communitySplinePath:
      "M 14 142 C 62 132, 104 106, 152 94 C 202 82, 240 58, 288 46 C 336 34, 378 28, 436 18",
    highlightCallout: {
      label: "Post-Patch v1.04",
      criticScore: "89 Critic",
      communityScore: "94% Player",
      x: 288,
      y: 46,
    },
    miniReleases: [
      {
        gameId: 1,
        title: "Elden Ring: Shadow of the Erdtree",
        coverImage: "/images/games/elden-shadow.jpg",
        platforms: ["PC", "PS5", "XSX", "Deck"],
        fluidScore: 95,
        steamStatus: "Deck Verified",
        criticVsUser: "95 Critic · 92% Player",
      },
      {
        gameId: 2,
        title: "Hades II",
        coverImage: "/images/games/hades-underworld.jpg",
        platforms: ["PC", "Deck", "Switch"],
        fluidScore: 94,
        steamStatus: "Deck Platinum",
        criticVsUser: "94 Critic · 96% Player",
      },
      {
        gameId: 4,
        title: "Astro Bot",
        coverImage: "/images/games/astro-odyssey.jpg",
        platforms: ["PS5", "PS5 Pro"],
        fluidScore: 94,
        steamStatus: "60fps Locked",
        criticVsUser: "94 Critic · 97% Player",
      },
      {
        gameId: 5,
        title: "Baldur's Gate 3",
        coverImage: "/images/games/cyber-liberty.jpg",
        platforms: ["PC", "PS5", "XSX", "Deck"],
        fluidScore: 96,
        steamStatus: "Deck Verified",
        criticVsUser: "96 Critic · 96% Player",
      },
    ],
  },
  pc: {
    id: "pc",
    label: "PC / Steam",
    shortLabel: "PC / Steam",
    fluidScore: "91/100",
    fluidScoreBadge: "+8% vs Launch Baseline",
    consensusValue: "96% Overwhelmingly Positive",
    consensusDetail:
      "across 28,400 verified Steam reviews & PC Gamer / Rock Paper Shotgun.",
    criticSplinePath:
      "M 14 122 C 62 108, 108 82, 156 76 C 206 70, 244 54, 294 42 C 342 32, 384 26, 436 20",
    criticAreaPath:
      "M 14 122 C 62 108, 108 82, 156 76 C 206 70, 244 54, 294 42 C 342 32, 384 26, 436 20 L 436 162 L 14 162 Z",
    communitySplinePath:
      "M 14 136 C 64 118, 110 92, 156 82 C 208 72, 246 48, 294 36 C 344 26, 386 22, 436 16",
    highlightCallout: {
      label: "Shader Patch v1.2",
      criticScore: "91 Critic",
      communityScore: "96% Steam",
      x: 294,
      y: 36,
    },
    miniReleases: [
      {
        gameId: 5,
        title: "Baldur's Gate 3",
        coverImage: "/images/games/cyber-liberty.jpg",
        platforms: ["PC", "Steam", "GOG"],
        fluidScore: 96,
        steamStatus: "120fps DLSS 3",
        criticVsUser: "96 Critic · 96% Steam",
      },
      {
        gameId: 2,
        title: "Hades II",
        coverImage: "/images/games/hades-underworld.jpg",
        platforms: ["PC", "Steam"],
        fluidScore: 94,
        steamStatus: "144fps Native",
        criticVsUser: "94 Critic · 96% Steam",
      },
      {
        gameId: 1,
        title: "Elden Ring: Shadow of the Erdtree",
        coverImage: "/images/games/elden-shadow.jpg",
        platforms: ["PC", "Steam"],
        fluidScore: 95,
        steamStatus: "Ray Tracing",
        criticVsUser: "95 Critic · 92% Steam",
      },
      {
        gameId: 3,
        title: "Cyberpunk 2077: Phantom Liberty",
        coverImage: "/images/games/alan-spiral.jpg",
        platforms: ["PC", "Steam"],
        fluidScore: 90,
        steamStatus: "Path Tracing",
        criticVsUser: "90 Critic · 93% Steam",
      },
    ],
  },
  ps5: {
    id: "ps5",
    label: "PlayStation 5",
    shortLabel: "PS5",
    fluidScore: "92/100",
    fluidScoreBadge: "+5% vs Metascore Average",
    consensusValue: "95% Verified PSN Rating",
    consensusDetail:
      "across 19,200 PlayStation Store ratings and 46 console critic verdicts.",
    criticSplinePath:
      "M 14 118 C 64 104, 110 86, 160 72 C 210 58, 250 50, 302 40 C 348 32, 390 24, 436 18",
    criticAreaPath:
      "M 14 118 C 64 104, 110 86, 160 72 C 210 58, 250 50, 302 40 C 348 32, 390 24, 436 18 L 436 162 L 14 162 Z",
    communitySplinePath:
      "M 14 128 C 66 112, 112 90, 160 78 C 212 64, 252 46, 302 36 C 350 28, 392 22, 436 16",
    highlightCallout: {
      label: "PS5 Pro Enhanced",
      criticScore: "92 Critic",
      communityScore: "95% PSN",
      x: 302,
      y: 36,
    },
    miniReleases: [
      {
        gameId: 4,
        title: "Astro Bot",
        coverImage: "/images/games/astro-odyssey.jpg",
        platforms: ["PS5", "DualSense"],
        fluidScore: 94,
        steamStatus: "PS5 Pro 4K60",
        criticVsUser: "94 Critic · 97% PSN",
      },
      {
        gameId: 1,
        title: "Elden Ring: Shadow of the Erdtree",
        coverImage: "/images/games/elden-shadow.jpg",
        platforms: ["PS5", "PS5 Pro"],
        fluidScore: 95,
        steamStatus: "VRR Supported",
        criticVsUser: "95 Critic · 93% PSN",
      },
      {
        gameId: 6,
        title: "Final Fantasy VII Rebirth",
        coverImage: "/images/games/ff7-rebirth.jpg",
        platforms: ["PS5", "PS5 Pro"],
        fluidScore: 92,
        steamStatus: "PSSR 60fps",
        criticVsUser: "92 Critic · 91% PSN",
      },
      {
        gameId: 7,
        title: "Alan Wake 2: Night Springs",
        coverImage: "/images/games/helldivers-front.jpg",
        platforms: ["PS5", "PS5 Pro"],
        fluidScore: 89,
        steamStatus: "Quality 4K",
        criticVsUser: "89 Critic · 90% PSN",
      },
    ],
  },
  xbox: {
    id: "xbox",
    label: "Xbox Series X|S",
    shortLabel: "Xbox",
    fluidScore: "88/100",
    fluidScoreBadge: "+4% vs Metascore Average",
    consensusValue: "92% Positive Consensus",
    consensusDetail:
      "across 14,800 Xbox Live verified players and 38 critic publications.",
    criticSplinePath:
      "M 14 132 C 62 120, 108 98, 158 88 C 208 78, 248 66, 296 54 C 344 44, 388 36, 436 28",
    criticAreaPath:
      "M 14 132 C 62 120, 108 98, 158 88 C 208 78, 248 66, 296 54 C 344 44, 388 36, 436 28 L 436 162 L 14 162 Z",
    communitySplinePath:
      "M 14 138 C 64 126, 110 102, 158 92 C 210 82, 250 62, 296 50 C 346 40, 390 32, 436 24",
    highlightCallout: {
      label: "120Hz VRR Mode",
      criticScore: "88 Critic",
      communityScore: "92% Xbox",
      x: 296,
      y: 50,
    },
    miniReleases: [
      {
        gameId: 1,
        title: "Elden Ring: Shadow of the Erdtree",
        coverImage: "/images/games/elden-shadow.jpg",
        platforms: ["Series X", "Series S"],
        fluidScore: 95,
        steamStatus: "Dolby Vision",
        criticVsUser: "95 Critic · 91% Xbox",
      },
      {
        gameId: 5,
        title: "Baldur's Gate 3",
        coverImage: "/images/games/cyber-liberty.jpg",
        platforms: ["Series X", "Series S"],
        fluidScore: 96,
        steamStatus: "Cross-Save",
        criticVsUser: "96 Critic · 95% Xbox",
      },
      {
        gameId: 3,
        title: "Cyberpunk 2077: Phantom Liberty",
        coverImage: "/images/games/alan-spiral.jpg",
        platforms: ["Series X", "Series S"],
        fluidScore: 90,
        steamStatus: "60fps Perf",
        criticVsUser: "90 Critic · 92% Xbox",
      },
      {
        gameId: 8,
        title: "Metaphor: ReFantazio",
        coverImage: "/images/games/black-myth.jpg",
        platforms: ["Series X", "Windows"],
        fluidScore: 93,
        steamStatus: "Play Anywhere",
        criticVsUser: "93 Critic · 94% Xbox",
      },
    ],
  },
  switch: {
    id: "switch",
    label: "Nintendo Switch",
    shortLabel: "Switch",
    fluidScore: "87/100",
    fluidScoreBadge: "+7% Handheld Value Index",
    consensusValue: "93% Community Approval",
    consensusDetail:
      "verified across Nintendo Life, Eurogamer, IGN, and 21,500 handheld players.",
    criticSplinePath:
      "M 14 130 C 60 118, 106 94, 154 86 C 204 78, 244 68, 290 56 C 338 46, 382 38, 436 30",
    criticAreaPath:
      "M 14 130 C 60 118, 106 94, 154 86 C 204 78, 244 68, 290 56 C 338 46, 382 38, 436 30 L 436 162 L 14 162 Z",
    communitySplinePath:
      "M 14 136 C 62 124, 108 98, 154 88 C 206 78, 246 60, 290 48 C 340 38, 384 30, 436 22",
    highlightCallout: {
      label: "OLED Handheld",
      criticScore: "87 Critic",
      communityScore: "93% Player",
      x: 290,
      y: 48,
    },
    miniReleases: [
      {
        gameId: 2,
        title: "Hades II",
        coverImage: "/images/games/hades-underworld.jpg",
        platforms: ["Switch", "OLED"],
        fluidScore: 94,
        steamStatus: "60fps Handheld",
        criticVsUser: "94 Critic · 96% Player",
      },
      {
        gameId: 8,
        title: "Metaphor: ReFantazio",
        coverImage: "/images/games/black-myth.jpg",
        platforms: ["Handheld", "Cloud"],
        fluidScore: 91,
        steamStatus: "30fps Locked",
        criticVsUser: "91 Critic · 93% Player",
      },
      {
        gameId: 4,
        title: "Astro Bot",
        coverImage: "/images/games/astro-odyssey.jpg",
        platforms: ["Platformer", "Index"],
        fluidScore: 94,
        steamStatus: "Genre Benchmark",
        criticVsUser: "94 Critic · 97% Player",
      },
      {
        gameId: 6,
        title: "Final Fantasy VII Rebirth",
        coverImage: "/images/games/ff7-rebirth.jpg",
        platforms: ["JRPG", "Index"],
        fluidScore: 92,
        steamStatus: "Cross-Compare",
        criticVsUser: "92 Critic · 91% Player",
      },
    ],
  },
  deck: {
    id: "deck",
    label: "Steam Deck",
    shortLabel: "Steam Deck",
    fluidScore: "90/100",
    fluidScoreBadge: "+9% ProtonDB Verified",
    consensusValue: "96% Deck Verified Consensus",
    consensusDetail:
      "combining Valve Deck compatibility checks, ProtonDB telemetry, and 31k Steam reviews.",
    criticSplinePath:
      "M 14 124 C 60 112, 106 86, 154 78 C 204 70, 242 56, 292 44 C 340 34, 384 26, 436 18",
    criticAreaPath:
      "M 14 124 C 60 112, 106 86, 154 78 C 204 70, 242 56, 292 44 C 340 34, 384 26, 436 18 L 436 162 L 14 162 Z",
    communitySplinePath:
      "M 14 134 C 62 120, 108 90, 154 80 C 206 70, 244 48, 292 36 C 342 26, 386 20, 436 14",
    highlightCallout: {
      label: "90Hz OLED Verified",
      criticScore: "90 Critic",
      communityScore: "96% Deck",
      x: 292,
      y: 36,
    },
    miniReleases: [
      {
        gameId: 2,
        title: "Hades II",
        coverImage: "/images/games/hades-underworld.jpg",
        platforms: ["Deck OLED", "SteamOS"],
        fluidScore: 94,
        steamStatus: "90fps OLED",
        criticVsUser: "94 Critic · 96% Deck",
      },
      {
        gameId: 1,
        title: "Elden Ring: Shadow of the Erdtree",
        coverImage: "/images/games/elden-shadow.jpg",
        platforms: ["Deck Verified", "Proton"],
        fluidScore: 95,
        steamStatus: "40fps Locked",
        criticVsUser: "95 Critic · 92% Deck",
      },
      {
        gameId: 5,
        title: "Baldur's Gate 3",
        coverImage: "/images/games/cyber-liberty.jpg",
        platforms: ["Deck Verified", "FSR 2.2"],
        fluidScore: 96,
        steamStatus: "Verified Green",
        criticVsUser: "96 Critic · 96% Deck",
      },
      {
        gameId: 3,
        title: "Cyberpunk 2077: Phantom Liberty",
        coverImage: "/images/games/alan-spiral.jpg",
        platforms: ["Steam Deck", "Preset"],
        fluidScore: 90,
        steamStatus: "Deck Preset",
        criticVsUser: "90 Critic · 93% Deck",
      },
    ],
  },
};

export interface MatrixGameEntry {
  id: number;
  title: string;
  genre: "RPG" | "Action" | "Roguelike" | "Indie";
  platforms: ("PC" | "PS5" | "Xbox" | "Switch" | "Deck")[];
  fluidScore: number;
  steamVerified: boolean;
  fpsNote: string;
}

export const BENTO_MATRIX_GAMES: MatrixGameEntry[] = [
  {
    id: 1,
    title: "Elden Ring: Shadow of the Erdtree",
    genre: "RPG",
    platforms: ["PC", "PS5", "Xbox", "Deck"],
    fluidScore: 95,
    steamVerified: true,
    fpsNote: "60fps PC/PS5 · 40fps Deck",
  },
  {
    id: 2,
    title: "Hades II",
    genre: "Roguelike",
    platforms: ["PC", "Switch", "Deck"],
    fluidScore: 94,
    steamVerified: true,
    fpsNote: "90fps OLED Deck Verified",
  },
  {
    id: 4,
    title: "Astro Bot",
    genre: "Action",
    platforms: ["PS5"],
    fluidScore: 94,
    steamVerified: false,
    fpsNote: "60fps Locked DualSense",
  },
  {
    id: 5,
    title: "Baldur's Gate 3",
    genre: "RPG",
    platforms: ["PC", "PS5", "Xbox", "Deck"],
    fluidScore: 96,
    steamVerified: true,
    fpsNote: "Cross-Save Synced",
  },
  {
    id: 3,
    title: "Animal Well",
    genre: "Indie",
    platforms: ["PC", "PS5", "Switch", "Deck"],
    fluidScore: 91,
    steamVerified: true,
    fpsNote: "60fps All Platforms",
  },
];

export function filterMatrixGames(
  entries: MatrixGameEntry[],
  query: string,
  platform: string,
  genre: string
): MatrixGameEntry[] {
  const q = query.trim().toLowerCase();
  return entries.filter((item) => {
    const matchesQuery =
      !q ||
      item.title.toLowerCase().includes(q) ||
      item.genre.toLowerCase().includes(q) ||
      item.fpsNote.toLowerCase().includes(q);
    const matchesPlatform =
      platform === "All" ||
      item.platforms.includes(platform as MatrixGameEntry["platforms"][number]);
    const matchesGenre = genre === "All" || item.genre === genre;
    return matchesQuery && matchesPlatform && matchesGenre;
  });
}

export interface FluidPricingTier {
  id: "free" | "pro" | "curator";
  name: string;
  monthlyPrice: number;
  annualPrice: number;
  popular?: boolean;
  subtitle: string;
  features: string[];
  ctaLabel: string;
}

export const FLUID_PRICING_TIERS: FluidPricingTier[] = [
  {
    id: "free",
    name: "Free / Casual Player",
    monthlyPrice: 0,
    annualPrice: 0,
    subtitle: "Essential cross-platform review lookup for everyday players.",
    features: [
      "Unlimited multi-platform game lookup",
      "Standard critic and Steam scores",
      "Basic platform filtering (PC, PS5, Xbox, Switch)",
      "Community discussion read access",
    ],
    ctaLabel: "Start Free",
  },
  {
    id: "pro",
    name: "Fluid Flow Pro",
    monthlyPrice: 4.99,
    annualPrice: 3.99,
    popular: true,
    subtitle:
      "Personalized score weighting, patch tracking, and cross-store alerts.",
    features: [
      "Custom outlet score weighting",
      "Real-time platform price drop & patch alerts",
      "Cross-platform library sync (Steam, PSN, Xbox Live)",
      "Spoiler-free AI verdict digests",
      "Steam Deck & handheld frame-rate telemetry",
      "Review-bomb & anomaly filter controls",
    ],
    ctaLabel: "Join Fluid Flow Pro",
  },
  {
    id: "curator",
    name: "Curator & Developer",
    monthlyPrice: 19,
    annualPrice: 15,
    subtitle:
      "Full sentiment telemetry and press analytics for studios and creators.",
    features: [
      "Full multi-platform sentiment API access",
      "Daily critic drift & regional score alerts",
      "Competitor review tracking for indie developers",
      "Exportable press sentiment kits (CSV / PDF)",
      "Launch-week vs post-patch stability benchmarks",
      "Multi-seat team workspace & webhook feeds",
    ],
    ctaLabel: "Get Curator Access",
  },
];

export function formatFluidPlanPrice(
  tier: FluidPricingTier,
  isAnnual: boolean
): string {
  const raw = isAnnual ? tier.annualPrice : tier.monthlyPrice;
  if (raw === 0) return "$0";
  return Number.isInteger(raw) ? `$${raw}` : `$${raw.toFixed(2)}`;
}
