# MetaPulse Clean Gallery UI Redesign

Transform MetaPulse from a text-heavy review dashboard into a breathable, visual-first gaming catalogue on the `#dcfbf5` mint canvas, keeping cards focused strictly on cover artwork, title, genre tag, and MetaScore while moving detailed critic quotes into the on-demand review modal.

## User Review & Critical Decisions

> [!IMPORTANT]
> The following design decisions were confirmed during our interactive planning review and govern the scope of this redesign:

- **Confirmed Decision 1 — Ultra-Clean Game Cards**: Strip multi-paragraph summaries, inline critic quote lists, and footer counters from the main grid cards. Each card will display only **Cover Art**, **Game Title**, **Genre Tag**, and the **MetaScore Badge**. Clicking anywhere on a card opens the full multi-outlet review modal.
- **Confirmed Decision 2 — Minimal Single-Line Header**: Replace the large multi-column hero banner and descriptive paragraphs with a compact, single-line editorial header featuring a concise title, quick search trigger, and horizontal genre pills.
- **Confirmed Decision 3 — Retained 4 View Tabs with Streamlined Filter Bar**: Preserve the 4 view tabs (*Games Catalogue*, *Internet Reviews Feed*, *Score Breakdowns*, *Outlet Consensus*) while consolidating the filter controls into a clean, single-row bar without redundant status banners or stacked toolbars.

---

## 1. Overview & Core Concept

- **What It Does**: Presents aggregated internet gaming scores in a calm, image-led gallery where visual cover art and color-coded MetaScores take center stage, and dense multi-outlet quotes are revealed on click.
- **Target Audience / Persona**: Gamers and design-conscious visitors who want to scan top-rated releases at a glance without reading walls of text on the main browse page.
- **Key Value**: Eliminates visual clutter and text fatigue by reducing per-card data points to 4 essential signals (Artwork, Title, Genre, MetaScore) and increasing open whitespace across the `#dcfbf5` background.

---

## 2. User Experience & Visual Design

- **Key User Flows**:
  1. **Instant Scan on Arrival**: Visitors land on a compact header with a clean headline, inline genre pills, and an immediate view of the 4-column visual game grid.
  2. **One-Click Filtering & View Switching**: Visitors switch between the 4 view tabs (*Games*, *Reviews*, *Scores*, *Outlets*) or click a genre pill / sort control in a single streamlined row.
  3. **On-Demand Deep Dive**: Clicking any game card opens the detailed review modal containing individual IGN, GameSpot, PC Gamer, Eurogamer, Steam, and OpenCritic quotes plus the player review form.
- **Visual Identity & Theme**:
  - *Aesthetic Direction*: Minimalist editorial gallery with generous breathing room, crisp borders, and image-first cards inspired by Mobbin's visual restraint.
  - *Color Palette & Mood*: Mint canvas (`#dcfbf5` / `--background`), soft off-white card surfaces (`--card: 168 60% 97%`), deep slate-teal ink (`--foreground: 172 45% 8%`), subtle mint-slate borders (`--border: 168 38% 78%`), and semantic score badges (Emerald for `90+`, Amber for `75–89`).
  - *Typography & Hierarchy*: Clean sans-serif (`Basier Square`) for titles and navigation paired with tabular monospace (`font-mono tabular-nums`) strictly for numeric MetaScores.
  - *Component Styling & Layout*:
    - **Minimal Header**: Single compact block (`py-6`) with a concise heading on the left and quick search / Static-vs-Spotlight toggle support, replacing the tall hero section.
    - **Streamlined Control Bar**: The 4 view tabs sit cleanly alongside a compact genre pill strip and a single sort/outlet selector, removing the secondary "Showing X of Y curated releases..." metadata row.
    - **Clean Game Cards**: `16:10` or `16:9` cover artwork with a subtle floating hover lift, followed by a compact 2-line footer containing only the **Game Title**, **Genre Tag**, and **MetaScore Badge**.
    - **Decluttered Secondary Views**: Simplify the *Internet Reviews Feed*, *Score Breakdowns*, and *Outlet Consensus* views to match the same low-text, high-whitespace standard (concise 1-sentence quotes and clean score badges).
- **Interactive Feedback & Motion**:
  - Preserve the global **60 FPS frame-rate cap** across all animations.
  - Subtle `framer-motion` floating lift on card hover (`y: -4` to `-8`, `scale: 1.015`) with smooth spring physics when un-hovered.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1 — Progressive Disclosure (Card Summary vs. Modal Detail)**
  - *Chosen Approach*: Move critic quotes, review counts, developer credits, and consensus paragraphs out of the grid cards and into the click-through modal.
  - *Why*: Eliminates the "wall of text" feeling on the main gallery and lets the cover art and MetaScore communicate quality immediately.
  - *Alternatives Considered*: Truncating quotes to 1 line on the card was rejected because even 3 truncated quotes per card creates 24 lines of repetitive text across 8 cards.
- **Decision 2 — Single-Tier Filter & Tab Rhythm**
  - *Chosen Approach*: Remove the redundant section sub-headers, outlet ticker text, and filter count banners between the header and the card grid.
  - *Why*: Brings the game cards above the fold and removes 3 horizontal bands of explanatory copy.

---

## 4. Technical Architecture & Data Strategy *(Technical Reference)*

- **Architecture & Component Diagram**:

```text
┌──────────────────────────────────────────────────────────────────────────┐
│                         Zustand State Layer                              │
│  ┌─────────────────────────┐  ┌──────────────────┐  ┌─────────────────┐  │
│  │     useGameFilter       │  │  useSearchModal  │  │     useHero     │  │
│  │ (genre, outlet, sortBy, │  │  (isOpen, open,  │  │ (compact header │  │
│  │  search, activeGameId)  │  │   close)         │  │  mode toggle)   │  │
│  └────────────┬────────────┘  └────────┬─────────┘  └────────┬────────┘  │
└───────────────┼────────────────────────┼─────────────────────┼───────────┘
                │                        │                     │
                ▼                        ▼                     ▼
┌──────────────────────────────────────────────────────────────────────────┐
│                     Clean Gallery View Hierarchy                         │
│                                                                          │
│  ┌────────────────────────────────────────────────────────────────────┐  │
│  │ Minimal Top Navbar (Brand Wordmark · Platform Links · ⌘K Search)   │  │
│  └────────────────────────────────────────────────────────────────────┘  │
│                                    │                                     │
│                                    ▼                                     │
│  ┌────────────────────────────────────────────────────────────────────┐  │
│  │ Minimal Single-Line Header (Concise Title · Genre Pills · Search)  │  │
│  └────────────────────────────────────────────────────────────────────┘  │
│                                    │                                     │
│                                    ▼                                     │
│  ┌────────────────────────────────────────────────────────────────────┐  │
│  │ 4 View Tabs (Games · Reviews · Scores · Outlets) + Compact Sort    │  │
│  └─────────────────┬───────────────┬───────────────┬──────────────────┘  │
│                    │               │               │                     │
│        ┌───────────┘               │               └───────────┐         │
│        ▼                           ▼                           ▼         │
│  ┌───────────────┐       ┌───────────────────┐       ┌────────────────┐  │
│  │ Clean Game    │       │ Concise Reviews   │       │ Minimal Score  │  │
│  │ Card Grid     │       │ & Outlet Cards    │       │ Table          │  │
│  │ (Art + Title  │       │ (Outlet + Score   │       │ (Title, Critic │  │
│  │  + Genre +    │       │  + Short Quote)   │       │  Player, Open) │  │
│  │  MetaScore)   │       └─────────┬─────────┘       └────────┬───────┘  │
│  └───────┬───────┘                 │                          │          │
│          └─────────────────────────┼──────────────────────────┘          │
│                                    ▼                                     │
│  ┌────────────────────────────────────────────────────────────────────┐  │
│  │ On-Demand Game Review Modal (Full Verdicts + Player Review Form)   │  │
│  └────────────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────────────┘
```

- **Data Model & State**:
  - Retains the existing `GAMES_CATALOGUE` dataset and `useGameFilter` Zustand store so no data or functionality is lost; detailed fields (`consensusSummary`, `outletReviews`, `totalCriticReviews`, `userScore`) remain accessible inside the `GameReviewModal` and secondary tabs.
- **Interactive Component & State Mapping**:
  - **Minimal Header & Genre Pills**: Clicking any genre pill updates `selectedGenre` in `useGameFilter`, immediately filtering the visible grid; clicking the search pill opens `SearchCommandDialog`.
  - **Streamlined 4 View Tabs & Sort Control**: Navigating across the 4 tabs switches the active view (`apps`, `screens`, `ui-elements`, `flows`), while the compact outlet and sort selectors update `selectedOutlet` and `sortBy`.
  - **Minimal Game Card**: Hovering triggers the 60 FPS `framer-motion` floating lift animation; clicking anywhere on the card invokes `openGameModal(game.id)` to display full critic reviews and player score submission.
