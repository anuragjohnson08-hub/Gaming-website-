export interface OutletReview {
  id: string;
  outlet: string;
  reviewer: string;
  score: number; // Normalized 0-100
  originalScoreDisplay: string;
  date: string;
  quote: string;
  url: string;
  sentiment: "acclaim" | "positive" | "mixed";
}

export interface GameItem {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  developer: string;
  publisher: string;
  releaseDate: string;
  releaseYear: number;
  genre: string;
  platforms: string[];
  platformLabels: string[];
  coverImage: string;
  galleryImages: string[];
  metaScore: number;
  userScore: number;
  totalCriticReviews: number;
  totalUserRatings: number;
  consensusSummary: string;
  pros: string[];
  cons: string[];
  outletReviews: OutletReview[];
}

export const GENRE_CATEGORIES: string[] = [
  "All",
  "Action RPG",
  "Sci-Fi RPG",
  "Roguelike",
  "Platformer",
  "CRPG",
  "Survival Horror",
  "Co-op Shooter",
  "JRPG",
];

export const REVIEW_OUTLETS: string[] = [
  "All Outlets",
  "IGN",
  "GameSpot",
  "PC Gamer",
  "Eurogamer",
  "Steam",
  "OpenCritic",
];

export const GAMES_CATALOGUE: GameItem[] = [
  {
    id: 1,
    slug: "elden-ring-shadow-of-the-erdtree",
    title: "Elden Ring: Shadow of the Erdtree",
    subtitle: "An expansive dark fantasy odyssey across the Land of Shadow",
    developer: "FromSoftware",
    publisher: "Bandai Namco",
    releaseDate: "Jun 21, 2024",
    releaseYear: 2024,
    genre: "Action RPG",
    platforms: ["ios", "android", "web", "pc", "ps5", "xbox"],
    platformLabels: ["PC", "PS5", "Xbox Series X/S"],
    coverImage: "/images/games/elden-shadow.jpg",
    galleryImages: [
      "/images/games/elden-shadow.jpg",
      "/images/games/hades-underworld.jpg",
      "/images/games/cyber-liberty.jpg",
    ],
    metaScore: 95,
    userScore: 92,
    totalCriticReviews: 118,
    totalUserRatings: 14820,
    consensusSummary:
      "Critics across the internet hail Shadow of the Erdtree as a monumental expansion that rivals full-scale sequels in vertical world design, boss craftsmanship, and build variety.",
    pros: [
      "Intricately layered vertical map design with seamless secret zones",
      "Over 100 new weapons, weapon arts, and eight distinct weapon archetypes",
      "Unforgettable boss encounters and orchestral score",
    ],
    cons: [
      "Steep Scadutree Blessing difficulty curve in early hours",
      "Occasional frame pacing dips during heavy particle boss phases",
    ],
    outletReviews: [
      {
        id: "er-ign",
        outlet: "IGN",
        reviewer: "Mitchell Saltzman",
        score: 100,
        originalScoreDisplay: "10 / 10",
        date: "Jun 2024",
        quote:
          "Like the base game did before it, Elden Ring: Shadow of the Erdtree raises the bar for what a single-player expansion can accomplish.",
        url: "https://www.ign.com",
        sentiment: "acclaim",
      },
      {
        id: "er-gamespot",
        outlet: "GameSpot",
        reviewer: "Tamoor Hussain",
        score: 100,
        originalScoreDisplay: "10 / 10",
        date: "Jun 2024",
        quote:
          "FromSoftware distills everything that made the Lands Between unforgettable into a denser, more vertically daring masterwork.",
        url: "https://www.gamespot.com",
        sentiment: "acclaim",
      },
      {
        id: "er-pcgamer",
        outlet: "PC Gamer",
        reviewer: "Tyler Colp",
        score: 95,
        originalScoreDisplay: "95 / 100",
        date: "Jun 2024",
        quote:
          "A staggering achievement in environmental storytelling and ruthless, rewarding combat encounters.",
        url: "https://www.pcgamer.com",
        sentiment: "acclaim",
      },
      {
        id: "er-eurogamer",
        outlet: "Eurogamer",
        reviewer: "Ed Nightingale",
        score: 80,
        originalScoreDisplay: "4 / 5",
        date: "Jun 2024",
        quote:
          "Magnificent exploration and haunting art direction, though its relentless aggression demands total patience.",
        url: "https://www.eurogamer.net",
        sentiment: "positive",
      },
      {
        id: "er-steam",
        outlet: "Steam",
        reviewer: "Verified Player Consensus",
        score: 92,
        originalScoreDisplay: "92% Positive",
        date: "Nov 2024",
        quote:
          "40+ hours of pure discovery. Following the Scadutree progression transforms brutal fights into some of FromSoftware's finest duels.",
        url: "https://store.steampowered.com",
        sentiment: "acclaim",
      },
      {
        id: "er-opencritic",
        outlet: "OpenCritic",
        reviewer: "Mighty Critic Average",
        score: 95,
        originalScoreDisplay: "95 Top Critic",
        date: "Jul 2024",
        quote:
          "99% of critics recommend Shadow of the Erdtree, making it the highest-rated expansion in modern gaming history.",
        url: "https://opencritic.com",
        sentiment: "acclaim",
      },
    ],
  },
  {
    id: 2,
    slug: "hades-ii-olympus-underworld",
    title: "Hades II",
    subtitle: "Battle beyond the Underworld using dark sorcery against the Titan of Time",
    developer: "Supergiant Games",
    publisher: "Supergiant Games",
    releaseDate: "May 6, 2024",
    releaseYear: 2024,
    genre: "Roguelike",
    platforms: ["ios", "android", "web", "pc", "ps5"],
    platformLabels: ["PC", "Steam Deck", "Mac"],
    coverImage: "/images/games/hades-underworld.jpg",
    galleryImages: [
      "/images/games/hades-underworld.jpg",
      "/images/games/elden-shadow.jpg",
      "/images/games/astro-odyssey.jpg",
    ],
    metaScore: 94,
    userScore: 95,
    totalCriticReviews: 86,
    totalUserRatings: 42900,
    consensusSummary:
      "Universal praise across PC and roguelike outlets highlights Melinoë's tactical Omega cast combat, dual surface/underworld routes, and Supergiant's peerless voice acting and art.",
    pros: [
      "Two distinct full-length campaign routes (Underworld and Surface)",
      "Deeply tactical Omega spell-channeling and Arcana card customization",
      "Phenomenal hand-painted character portraits and Darren Korb soundtrack",
    ],
    cons: [
      "Resource gathering tools require several early runs to unlock",
    ],
    outletReviews: [
      {
        id: "h2-ign",
        outlet: "IGN",
        reviewer: "Daemon Hatfield",
        score: 90,
        originalScoreDisplay: "9 / 10",
        date: "May 2024",
        quote:
          "Hades II already feels larger, richer, and mechanically more varied than its award-winning predecessor.",
        url: "https://www.ign.com",
        sentiment: "acclaim",
      },
      {
        id: "h2-pcgamer",
        outlet: "PC Gamer",
        reviewer: "Robin Valentine",
        score: 94,
        originalScoreDisplay: "94 / 100",
        date: "May 2024",
        quote:
          "Melinoë's witchy toolkit completely reinvents the combat rhythm while keeping every run electric.",
        url: "https://www.pcgamer.com",
        sentiment: "acclaim",
      },
      {
        id: "h2-eurogamer",
        outlet: "Eurogamer",
        reviewer: "Christian Donlan",
        score: 100,
        originalScoreDisplay: "5 / 5",
        date: "May 2024",
        quote:
          "Supergiant's mythic sequel is a masterclass in reactive storytelling and razor-sharp isometric action.",
        url: "https://www.eurogamer.net",
        sentiment: "acclaim",
      },
      {
        id: "h2-gamespot",
        outlet: "GameSpot",
        reviewer: "Alessandro Barbosa",
        score: 90,
        originalScoreDisplay: "9 / 10",
        date: "May 2024",
        quote:
          "Every weapon aspect and Olympian boon synergy feels purposefully crafted to reward experimentation.",
        url: "https://www.gamespot.com",
        sentiment: "acclaim",
      },
      {
        id: "h2-steam",
        outlet: "Steam",
        reviewer: "Overwhelmingly Positive",
        score: 96,
        originalScoreDisplay: "96% Positive",
        date: "Oct 2024",
        quote:
          "Doubles the content of the original Hades with twice the bosses, unforgettable music, and buttery 60 FPS responsiveness.",
        url: "https://store.steampowered.com",
        sentiment: "acclaim",
      },
      {
        id: "h2-opencritic",
        outlet: "OpenCritic",
        reviewer: "Mighty Critic Average",
        score: 94,
        originalScoreDisplay: "94 Top Critic",
        date: "Jun 2024",
        quote:
          "An essential action roguelike benchmark praised across every major gaming publication.",
        url: "https://opencritic.com",
        sentiment: "acclaim",
      },
    ],
  },
  {
    id: 3,
    slug: "cyberpunk-2077-phantom-liberty",
    title: "Cyberpunk 2077: Phantom Liberty",
    subtitle: "High-stakes cyber-espionage thriller set in the walled district of Dogtown",
    developer: "CD Projekt Red",
    publisher: "CD Projekt",
    releaseDate: "Sep 26, 2023",
    releaseYear: 2023,
    genre: "Sci-Fi RPG",
    platforms: ["ios", "android", "web", "pc", "ps5", "xbox"],
    platformLabels: ["PC", "PS5", "Xbox Series X/S"],
    coverImage: "/images/games/cyber-liberty.jpg",
    galleryImages: [
      "/images/games/cyber-liberty.jpg",
      "/images/games/elden-shadow.jpg",
      "/images/games/astro-odyssey.jpg",
    ],
    metaScore: 91,
    userScore: 90,
    totalCriticReviews: 104,
    totalUserRatings: 29450,
    consensusSummary:
      "Combined with Update 2.0, Phantom Liberty completes Cyberpunk 2077's redemption arc with morally complex spy-thriller writing, overhauled cyberware trees, and benchmark visual fidelity.",
    pros: [
      "Gripping espionage narrative with branching endings that test player morality",
      "Complete overhaul of perks, cyberware capacity, and Relic combat abilities",
      "Dense, hand-crafted Dogtown district packed with high-tier gigs",
    ],
    cons: [
      "High GPU hardware requirements with path tracing enabled",
    ],
    outletReviews: [
      {
        id: "cp-ign",
        outlet: "IGN",
        reviewer: "Ryan McCaffrey",
        score: 90,
        originalScoreDisplay: "9 / 10",
        date: "Sep 2023",
        quote:
          "Phantom Liberty marks the culmination of Cyberpunk 2077's anime-worthy redemption arc.",
        url: "https://www.ign.com",
        sentiment: "acclaim",
      },
      {
        id: "cp-gamespot",
        outlet: "GameSpot",
        reviewer: "Michael Higham",
        score: 100,
        originalScoreDisplay: "10 / 10",
        date: "Sep 2023",
        quote:
          "CD Projekt Red delivers some of the most nuanced character writing and tense set-pieces in the genre.",
        url: "https://www.gamespot.com",
        sentiment: "acclaim",
      },
      {
        id: "cp-pcgamer",
        outlet: "PC Gamer",
        reviewer: "Ted Litchfield",
        score: 87,
        originalScoreDisplay: "87 / 100",
        date: "Sep 2023",
        quote:
          "Dogtown is a claustrophobic, neon-lit triumph full of moral grey zones and unforgettable gigs.",
        url: "https://www.pcgamer.com",
        sentiment: "positive",
      },
      {
        id: "cp-eurogamer",
        outlet: "Eurogamer",
        reviewer: "Chris Tapsell",
        score: 80,
        originalScoreDisplay: "4 / 5",
        date: "Sep 2023",
        quote:
          "A taut political thriller that brings out the very best of Night City's worldbuilding.",
        url: "https://www.eurogamer.net",
        sentiment: "positive",
      },
      {
        id: "cp-steam",
        outlet: "Steam",
        reviewer: "Very Positive",
        score: 90,
        originalScoreDisplay: "90% Positive",
        date: "Sep 2024",
        quote:
          "Idris Elba as Solomon Reed and Songbird's storyline gave me chills. Both ending paths are unforgettable.",
        url: "https://store.steampowered.com",
        sentiment: "acclaim",
      },
      {
        id: "cp-opencritic",
        outlet: "OpenCritic",
        reviewer: "Mighty Critic Average",
        score: 91,
        originalScoreDisplay: "91 Top Critic",
        date: "Oct 2023",
        quote:
          "96% of critics recommend Phantom Liberty as an essential sci-fi RPG showcase.",
        url: "https://opencritic.com",
        sentiment: "acclaim",
      },
    ],
  },
  {
    id: 4,
    slug: "astro-bot-cosmic-odyssey",
    title: "Astro Bot",
    subtitle: "A joyful galaxy-spanning 3D platformer celebrating inventive tactile mechanics",
    developer: "Team Asobi",
    publisher: "Sony Interactive Entertainment",
    releaseDate: "Sep 6, 2024",
    releaseYear: 2024,
    genre: "Platformer",
    platforms: ["ios", "android", "web", "ps5"],
    platformLabels: ["PS5"],
    coverImage: "/images/games/astro-odyssey.jpg",
    galleryImages: [
      "/images/games/astro-odyssey.jpg",
      "/images/games/hades-underworld.jpg",
      "/images/games/elden-shadow.jpg",
    ],
    metaScore: 94,
    userScore: 96,
    totalCriticReviews: 128,
    totalUserRatings: 19300,
    consensusSummary:
      "Reviewers across every major outlet celebrate Astro Bot as a generational 3D platformer bursting with physical physics toys, inventive power-ups, and pure creative joy.",
    pros: [
      "Every single planet introduces a fresh mechanical gadget or physics twist",
      "Best-in-class tactile feedback and micro-material physics",
      "Zero filler across 80+ tightly paced stages and challenge gauntlets",
    ],
    cons: [
      "Main story bosses lean forgiving outside of the optional Void challenge stages",
    ],
    outletReviews: [
      {
        id: "ab-eurogamer",
        outlet: "Eurogamer",
        reviewer: "Christian Donlan",
        score: 100,
        originalScoreDisplay: "5 / 5",
        date: "Sep 2024",
        quote:
          "Pure, concentrated delight. Team Asobi turns every square inch of level geometry into a tactile playground.",
        url: "https://www.eurogamer.net",
        sentiment: "acclaim",
      },
      {
        id: "ab-ign",
        outlet: "IGN",
        reviewer: "Simon Cardy",
        score: 90,
        originalScoreDisplay: "9 / 10",
        date: "Sep 2024",
        quote:
          "An endlessly inventive platformer that kept a smile plastered across my face from start to finish.",
        url: "https://www.ign.com",
        sentiment: "acclaim",
      },
      {
        id: "ab-gamespot",
        outlet: "GameSpot",
        reviewer: "Mark Delaney",
        score: 90,
        originalScoreDisplay: "9 / 10",
        date: "Sep 2024",
        quote:
          "Stands shoulder to shoulder with the greatest 3D platformers ever made.",
        url: "https://www.gamespot.com",
        sentiment: "acclaim",
      },
      {
        id: "ab-opencritic",
        outlet: "OpenCritic",
        reviewer: "Mighty Critic Average",
        score: 95,
        originalScoreDisplay: "95 Top Critic",
        date: "Sep 2024",
        quote:
          "99% Critic Recommendation across 120+ international publications.",
        url: "https://opencritic.com",
        sentiment: "acclaim",
      },
    ],
  },
  {
    id: 5,
    slug: "baldurs-gate-3",
    title: "Baldur's Gate 3",
    subtitle: "Party-based Dungeons & Dragons CRPG with unprecedented narrative reactivity",
    developer: "Larian Studios",
    publisher: "Larian Studios",
    releaseDate: "Aug 3, 2023",
    releaseYear: 2023,
    genre: "CRPG",
    platforms: ["ios", "android", "web", "pc", "ps5", "xbox"],
    platformLabels: ["PC", "PS5", "Xbox Series X/S", "Mac"],
    coverImage: "/images/games/cyber-liberty.jpg",
    galleryImages: [
      "/images/games/cyber-liberty.jpg",
      "/images/games/hades-underworld.jpg",
    ],
    metaScore: 93,
    userScore: 94,
    totalCriticReviews: 145,
    totalUserRatings: 98400,
    consensusSummary:
      "One of the highest-rated RPGs of the decade across all internet aggregators, praised for giving players total tabletop freedom, unforgettable companions, and tactical turn-based combat.",
    pros: [
      "Unmatched quest reactivity where every spell, dice roll, and wild idea is accounted for",
      "Deeply written companions with full motion-captured performances",
      "Seamless solo and 4-player drop-in cooperative campaign support",
    ],
    cons: [
      "Inventory management across four party members can get busy in Act 3",
    ],
    outletReviews: [
      {
        id: "bg3-pcgamer",
        outlet: "PC Gamer",
        reviewer: "Fraser Brown",
        score: 97,
        originalScoreDisplay: "97 / 100",
        date: "Aug 2023",
        quote:
          "Baldur's Gate 3 is the new pinnacle of western RPGs and an instant all-time classic.",
        url: "https://www.pcgamer.com",
        sentiment: "acclaim",
      },
      {
        id: "bg3-ign",
        outlet: "IGN",
        reviewer: "Leana Hafer",
        score: 100,
        originalScoreDisplay: "10 / 10",
        date: "Aug 2023",
        quote:
          "Crunchy tactical RPG combat, a memorable story with complex characters, and a world that always rewards exploration.",
        url: "https://www.ign.com",
        sentiment: "acclaim",
      },
      {
        id: "bg3-gamespot",
        outlet: "GameSpot",
        reviewer: "interactive desk",
        score: 100,
        originalScoreDisplay: "10 / 10",
        date: "Aug 2023",
        quote:
          "Every choice ripples outward in ways that make each campaign feel genuinely personal.",
        url: "https://www.gamespot.com",
        sentiment: "acclaim",
      },
      {
        id: "bg3-steam",
        outlet: "Steam",
        reviewer: "Overwhelmingly Positive",
        score: 96,
        originalScoreDisplay: "96% Positive",
        date: "Nov 2024",
        quote:
          "Over 500,000 player reviews agree: Larian set a standard that will be talked about for twenty years.",
        url: "https://store.steampowered.com",
        sentiment: "acclaim",
      },
    ],
  },
  {
    id: 6,
    slug: "alan-wake-2-night-springs",
    title: "Alan Wake 2",
    subtitle: "Dual-reality psychological survival horror blending live-action and noir detective craft",
    developer: "Remedy Entertainment",
    publisher: "Epic Games",
    releaseDate: "Oct 27, 2023",
    releaseYear: 2023,
    genre: "Survival Horror",
    platforms: ["ios", "android", "web", "pc", "ps5", "xbox"],
    platformLabels: ["PC", "PS5", "Xbox Series X/S"],
    coverImage: "/images/games/cyber-liberty.jpg",
    galleryImages: [
      "/images/games/cyber-liberty.jpg",
      "/images/games/elden-shadow.jpg",
    ],
    metaScore: 89,
    userScore: 88,
    totalCriticReviews: 112,
    totalUserRatings: 16200,
    consensusSummary:
      "Internet critics praise Remedy's fearless multimedia direction, Mind Place detective board mechanics, and oppressive Pacific Northwest/Dark Place atmosphere.",
    pros: [
      "Audacious blend of survival horror, live-action cinematography, and musical set-pieces",
      "Saga Anderson's Mind Place case board makes investigation tactile and rewarding",
      "Reference-grade lighting, shadows, and binaural sound design",
    ],
    cons: [
      "Occasional backtracking when hunting optional nursery rhyme puzzles",
    ],
    outletReviews: [
      {
        id: "aw2-gamespot",
        outlet: "GameSpot",
        reviewer: "Mark Delaney",
        score: 100,
        originalScoreDisplay: "10 / 10",
        date: "Oct 2023",
        quote:
          "Amultimedia triumph that pushes interactive storytelling into uncharted territory.",
        url: "https://www.gamespot.com",
        sentiment: "acclaim",
      },
      {
        id: "aw2-ign",
        outlet: "IGN",
        reviewer: "Tristan Ogilvie",
        score: 90,
        originalScoreDisplay: "9 / 10",
        date: "Oct 2023",
        quote:
          "Alan Wake 2 delivers one of the boldest and most cohesive survival horror sequels ever made.",
        url: "https://www.ign.com",
        sentiment: "acclaim",
      },
      {
        id: "aw2-pcgamer",
        outlet: "PC Gamer",
        reviewer: "Robin Valentine",
        score: 88,
        originalScoreDisplay: "88 / 100",
        date: "Oct 2023",
        quote:
          "Weird, terrifying, and wickedly funny in ways no other studio would dare attempt.",
        url: "https://www.pcgamer.com",
        sentiment: "positive",
      },
      {
        id: "aw2-eurogamer",
        outlet: "Eurogamer",
        reviewer: "Vikki Blake",
        score: 80,
        originalScoreDisplay: "4 / 5",
        date: "Oct 2023",
        quote:
          "Sensational atmosphere and dual-protagonist pacing make every chapter gripping.",
        url: "https://www.eurogamer.net",
        sentiment: "positive",
      },
    ],
  },
  {
    id: 7,
    slug: "metaphor-refantazio",
    title: "Metaphor: ReFantazio",
    subtitle: "High-stakes royal tournament fantasy RPG from the creators of Persona 3, 4, and 5",
    developer: "Studio Zero / Atlus",
    publisher: "Sega",
    releaseDate: "Oct 11, 2024",
    releaseYear: 2024,
    genre: "JRPG",
    platforms: ["ios", "android", "web", "pc", "ps5", "xbox"],
    platformLabels: ["PC", "PS5", "Xbox Series X/S"],
    coverImage: "/images/games/hades-underworld.jpg",
    galleryImages: [
      "/images/games/hades-underworld.jpg",
      "/images/games/elden-shadow.jpg",
    ],
    metaScore: 93,
    userScore: 91,
    totalCriticReviews: 98,
    totalUserRatings: 21500,
    consensusSummary:
      "Critics across RPG and mainstream outlets celebrate Metaphor: ReFantazio's hybrid real-time/turn-based Archetype system, road-trip political drama, and striking UI craft.",
    pros: [
      "Seamless hybrid overworld action and Press Turn tactical squad combat",
      "40+ customizable Archetype job classes encouraging deep party synergies",
      "Forgiving calendar pacing aboard the Gauntlet Runner mobile headquarters",
    ],
    cons: [
      "Some optional side-dungeon layouts reuse corridor templates",
    ],
    outletReviews: [
      {
        id: "mr-gamespot",
        outlet: "GameSpot",
        reviewer: "Jess Howard",
        score: 100,
        originalScoreDisplay: "10 / 10",
        date: "Oct 2024",
        quote:
          "Atlus refines decades of RPG mastery into a sweeping, politically resonant fantasy epic.",
        url: "https://www.gamespot.com",
        sentiment: "acclaim",
      },
      {
        id: "mr-ign",
        outlet: "IGN",
        reviewer: "Michael Higham",
        score: 90,
        originalScoreDisplay: "9 / 10",
        date: "Oct 2024",
        quote:
          "Metaphor: ReFantazio captures lightning in a bottle with its Archetype job system and poignant storytelling.",
        url: "https://www.ign.com",
        sentiment: "acclaim",
      },
      {
        id: "mr-pcgamer",
        outlet: "PC Gamer",
        reviewer: "Mollie Taylor",
        score: 95,
        originalScoreDisplay: "95 / 100",
        date: "Oct 2024",
        quote:
          "Every menu transition, battle callout, and political debate feels electric.",
        url: "https://www.pcgamer.com",
        sentiment: "acclaim",
      },
      {
        id: "mr-steam",
        outlet: "Steam",
        reviewer: "Very Positive",
        score: 92,
        originalScoreDisplay: "92% Positive",
        date: "Nov 2024",
        quote:
          "Easily the best turn-based combat flow Atlus has ever designed.",
        url: "https://store.steampowered.com",
        sentiment: "acclaim",
      },
    ],
  },
  {
    id: 8,
    slug: "helldivers-2-galactic-war",
    title: "Helldivers 2",
    subtitle: "Squad-based third-person galactic war shooter with emergent physics chaos",
    developer: "Arrowhead Game Studios",
    publisher: "Sony Interactive Entertainment",
    releaseDate: "Feb 8, 2024",
    releaseYear: 2024,
    genre: "Co-op Shooter",
    platforms: ["ios", "android", "web", "pc", "ps5"],
    platformLabels: ["PC", "PS5"],
    coverImage: "/images/games/astro-odyssey.jpg",
    galleryImages: [
      "/images/games/astro-odyssey.jpg",
      "/images/games/cyber-liberty.jpg",
    ],
    metaScore: 84,
    userScore: 87,
    totalCriticReviews: 94,
    totalUserRatings: 185000,
    consensusSummary:
      "Praised across the internet for its cinematic co-op firefights, satirical Starship Troopers tone, and live Game Master galactic campaign.",
    pros: [
      "Unscripted cinematic moments in every 4-player extraction mission",
      "Orbital stratagem call-ins feel impactful and tactically decisive",
      "Non-expiring Warbond progression passes",
    ],
    cons: [
      "Solo play on higher difficulties is punishing without a coordinated squad",
    ],
    outletReviews: [
      {
        id: "hd2-ign",
        outlet: "IGN",
        reviewer: "Stella Chung",
        score: 90,
        originalScoreDisplay: "9 / 10",
        date: "Feb 2024",
        quote:
          "Helldivers 2 combat feels incredible, delivering some of the most chaotic co-op moments in years.",
        url: "https://www.ign.com",
        sentiment: "acclaim",
      },
      {
        id: "hd2-pcgamer",
        outlet: "PC Gamer",
        reviewer: "Morgan Park",
        score: 86,
        originalScoreDisplay: "86 / 100",
        date: "Feb 2024",
        quote:
          "A triumph of physical comedy and white-knuckle extraction firefights.",
        url: "https://www.pcgamer.com",
        sentiment: "positive",
      },
      {
        id: "hd2-gamespot",
        outlet: "GameSpot",
        reviewer: "Jordan Ramée",
        score: 90,
        originalScoreDisplay: "9 / 10",
        date: "Feb 2024",
        quote:
          "Every mission plays out like an unscripted sci-fi war movie.",
        url: "https://www.gamespot.com",
        sentiment: "acclaim",
      },
      {
        id: "hd2-eurogamer",
        outlet: "Eurogamer",
        reviewer: "Rick Lane",
        score: 80,
        originalScoreDisplay: "4 / 5",
        date: "Feb 2024",
        quote:
          "Loud, satirical, and endlessly replayable with three friends.",
        url: "https://www.eurogamer.net",
        sentiment: "positive",
      },
    ],
  },
];

export type SortOption = "metaScore" | "userScore" | "reviews" | "recent";

export function getScoreTier(score: number): {
  label: string;
  tier: "acclaim" | "favorable" | "mixed";
} {
  if (score >= 90) {
    return { label: "Universal Acclaim", tier: "acclaim" };
  }
  if (score >= 75) {
    return { label: "Generally Favorable", tier: "favorable" };
  }
  return { label: "Mixed or Average", tier: "mixed" };
}

export function filterAndSortGames(
  games: GameItem[],
  options: {
    genre?: string;
    outlet?: string;
    search?: string;
    platform?: string;
    sortBy?: SortOption;
  }
): GameItem[] {
  const {
    genre = "All",
    outlet = "All Outlets",
    search = "",
    platform,
    sortBy = "metaScore",
  } = options;

  const normalizedQuery = search.trim().toLowerCase();

  const filtered = games.filter((game) => {
    if (genre && genre !== "All" && game.genre.toLowerCase() !== genre.toLowerCase()) {
      return false;
    }

    if (
      outlet &&
      outlet !== "All Outlets" &&
      !game.outletReviews.some(
        (r) => r.outlet.toLowerCase() === outlet.toLowerCase()
      )
    ) {
      return false;
    }

    if (
      platform &&
      platform !== "all" &&
      !game.platforms.includes(platform.toLowerCase())
    ) {
      return false;
    }

    if (normalizedQuery) {
      const matchesTitle = game.title.toLowerCase().includes(normalizedQuery);
      const matchesDev = game.developer.toLowerCase().includes(normalizedQuery);
      const matchesGenre = game.genre.toLowerCase().includes(normalizedQuery);
      const matchesOutlet = game.outletReviews.some(
        (r) =>
          r.outlet.toLowerCase().includes(normalizedQuery) ||
          r.quote.toLowerCase().includes(normalizedQuery)
      );
      if (!matchesTitle && !matchesDev && !matchesGenre && !matchesOutlet) {
        return false;
      }
    }

    return true;
  });

  return [...filtered].sort((a, b) => {
    if (sortBy === "userScore") {
      return b.userScore - a.userScore;
    }
    if (sortBy === "reviews") {
      return b.totalCriticReviews - a.totalCriticReviews;
    }
    if (sortBy === "recent") {
      return b.releaseYear - a.releaseYear || b.metaScore - a.metaScore;
    }
    return b.metaScore - a.metaScore;
  });
}

export function getAllOutletReviews(games: GameItem[] = GAMES_CATALOGUE): Array<
  OutletReview & {
    gameId: number;
    gameTitle: string;
    gameGenre: string;
    gameCover: string;
    gameMetaScore: number;
  }
> {
  const list: Array<
    OutletReview & {
      gameId: number;
      gameTitle: string;
      gameGenre: string;
      gameCover: string;
      gameMetaScore: number;
    }
  > = [];

  for (const game of games) {
    for (const review of game.outletReviews) {
      list.push({
        ...review,
        gameId: game.id,
        gameTitle: game.title,
        gameGenre: game.genre,
        gameCover: game.coverImage,
        gameMetaScore: game.metaScore,
      });
    }
  }

  return list;
}
