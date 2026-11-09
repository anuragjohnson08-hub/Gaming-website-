# MetaPulse (Next Mobbin Clone) — Gaming Review Aggregator

MetaPulse is a responsive **Gaming Review Aggregator & Catalogue** built on **Next.js 14 (App Router)**, **Radix UI / shadcn-ui**, **Tailwind CSS**, **Embla Carousel**, **Framer Motion**, and **Zustand** (originally cloned and adapted from [`mickasmt/next-mobbin-clone`](https://github.com/mickasmt/next-mobbin-clone)).

It unifies critic verdicts and scores from across the internet (**IGN**, **GameSpot**, **PC Gamer**, **Eurogamer**, **Steam**, and **OpenCritic**) into a single searchable gallery with a global **60 FPS animation frame-rate cap** across all devices.

---

## Project Architecture & Key Directories

```text
├── app/                                  # Next.js 14 App Router entry points & routes
│   ├── layout.tsx                        # Root HTML layout, ThemeProvider, ModalProvider, FpsCapProvider
│   ├── globals.css                       # Global Tailwind CSS styles, custom scrollbars, and CSS variables
│   ├── (auth)/login/page.tsx             # Authentication route
│   └── (browse)/                         # Main application layout & routes
│       ├── layout.tsx                    # Browse shell wrapping Navbar and main content
│       ├── page.tsx                      # Root homepage entry point (/)
│       ├── _components/navbar.tsx        # Sticky top navigation bar
│       ├── browse/                       # Multi-tab catalogue routes
│       │   ├── layout.tsx                # Hero switcher wrapper (Carousel vs. Static Hero)
│       │   └── [platform]/               # Platform filter scope (ios / android / web)
│       │       ├── layout.tsx            # Section header & CategoriesList tab bar
│       │       └── [feature]/page.tsx    # Feature views (apps, screens, ui-elements, flows)
│       ├── collections/page.tsx          # Outlets Directory page
│       ├── pricing/page.tsx              # Scoring Index & Normalization Methodology page
│       └── changelog/page.tsx            # Release notes & changelog page
├── components/                           # Reusable UI & domain components
│   ├── carousels/                        # Embla Carousel & card components
│   │   ├── carousel-progress-bar.tsx     # Auto-advancing Hero Spotlight with Framer Motion float hover
│   │   ├── carousel-buttons-tags.tsx     # Horizontal genre filter strip + outlet & sort controls
│   │   └── carousel-card.tsx             # Catalogue game card with multi-outlet score verdicts
│   ├── modals/                           # Global dialog modals
│   │   ├── search-command-dialog.tsx     # ⌘K Command palette for searching games, outlets, and genres
│   │   └── game-review-modal.tsx         # Deep-dive modal showing all internet reviews + player submission form
│   ├── ui/                               # Radix UI / shadcn-ui primitives (Button, Dialog, Command, Carousel, etc.)
│   ├── cards-list.tsx                    # Multi-view renderer (Games Catalogue, Reviews Feed, Delta Table, Outlet Index)
│   ├── categories-list.tsx               # View switcher tabs
│   ├── checkbox-card.tsx                 # Individual publication review card
│   ├── fps-cap-provider.tsx              # Client provider installing the global 60 FPS cap
│   ├── hero-homepage.tsx                 # Static editorial hero with Framer Motion floating hover cards
│   ├── hero-switcher.tsx                 # Toggles between Carousel Hero and Static Hero
│   ├── nav-links.tsx                     # Primary platform & directory navigation links
│   ├── nav-menu.tsx                      # Dropdown menu (Hero mode toggle, theme toggle, external links)
│   └── theme-toggle.tsx                  # Light / Dark / System theme selector
├── config/                               # Static navigation & category configuration
│   └── categories.ts                     # Route definitions for platform/feature tabs
├── hooks/                                # Zustand state stores
│   ├── use-game-filter.ts                # Store for genre/outlet filters, sorting, active modal, and player reviews
│   ├── use-search-modal.ts               # Store controlling the ⌘K search command dialog
│   ├── use-hero.ts                       # Store toggling Carousel vs. Static hero layout
│   └── use-checkbox-selection.ts         # Store for item selection state
├── lib/                                  # Pure business logic, dataset, and utilities
│   ├── games-data.ts                     # Aggregated game dataset, outlet reviews, filtering, and score-tier logic
│   ├── fps-limiter.ts                    # Global 60 FPS requestAnimationFrame & Three.js render-loop limiter
│   ├── utils.ts                          # Tailwind class merging utility (cn)
│   └── utils.test.ts                     # Node test runner unit tests for pure logic & stores
└── public/                               # Static assets & game cover artwork
```

---

## Key Configuration Files

| File | Purpose |
| :--- | :--- |
| `package.json` | Defines project dependencies (`next`, `react`, `framer-motion`, `embla-carousel-react`, `zustand`, `@radix-ui/*`) and scripts (`dev`, `build`, `start`, `lint`). |
| `next.config.js` | Configures Next.js standalone build output (`output: 'standalone'`). |
| `tailwind.config.ts` | Configures Tailwind CSS theme tokens, custom color variables, border radii, and keyframe animations. |
| `tsconfig.json` | TypeScript compiler configuration and `@/*` path aliases. |
| `components.json` | `shadcn-ui` configuration specifying component aliases and Tailwind CSS setup. |

---

## Installation & Local Setup

### Prerequisites
- **Node.js** `>= 18.17` (Node.js 20 or 22 recommended)
- **npm**

### Steps

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server (runs on `http://0.0.0.0:3000`):**
   ```bash
   npm run dev
   ```

3. **Open the application in your browser:**
   Navigate to [`http://localhost:3000`](http://localhost:3000) (or [`http://localhost:3000/browse/ios/apps`](http://localhost:3000/browse/ios/apps)).

---

## Basic Usage Guidelines

- **Browse the Games Catalogue:** Explore curated releases with normalized **Critic MetaScores** (`0–100`), **Player Consensus Scores**, and top quotes from **IGN**, **GameSpot**, **PC Gamer**, **Eurogamer**, **Steam**, and **OpenCritic**.
- **Switch Views:** Use the section tabs to switch between:
  1. **Games Catalogue (`/apps`):** Visual cards with multi-outlet score summaries.
  2. **Internet Reviews Feed (`/screens`):** Individual critic verdict cards with direct source links.
  3. **Score Breakdowns (`/ui-elements`):** Critic vs. Player Delta comparison table.
  4. **Outlet Consensus Index (`/flows`):** Per-publication scoring averages and indexed game lists.
- **Filter & Sort:** Filter by **Genre** (`Action RPG`, `Roguelike`, `Platformer`, `CRPG`, `Sci-Fi RPG`, etc.), filter by **Publication Outlet**, or sort by **Critic MetaScore**, **Player Consensus**, **Most Reviewed**, or **Release Year**.
- **Global Search (`⌘K` / `Ctrl+K`):** Press `⌘K` (or click the navbar search button) to open the command palette and jump straight to any game's review breakdown or filter by publication.
- **Inspect & Submit Reviews:** Click any game card or **Read All Reviews** button to open the full multi-outlet review modal and submit a verified player review that dynamically updates the player consensus score.
- **Toggle Hero Layout & Theme:** Open the top-right menu button to toggle between the **Carousel Spotlight Hero** and the **Static Editorial Hero** (both featuring `framer-motion` floating hover animations), or switch between **Dark**, **Light**, and **System** themes.

---

## Scripts & Verification

```bash
# Start development server on port 3000
npm run dev

# Run production build
npm run build

# Run ESLint validation
npm run lint

# Run unit tests
npx tsx --test lib/utils.test.ts
```

---

## License

Released under the [MIT License](LICENCE.md). Originally created by [@miickasmt](https://github.com/mickasmt/next-mobbin-clone).
