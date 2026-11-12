# Project Memory & LLM Handoff Context (`MEMORY.md`)

> **Purpose of this file:** Provide complete architectural, historical, and design context for any LLM or developer continuing work on this exported Next.js project.

---

## 1. Project Origin & Evolution

- **Original Repository:** Cloned from [`https://github.com/mickasmt/next-mobbin-clone.git`](https://github.com/mickasmt/next-mobbin-clone.git) (Next.js 14.1 App Router, TypeScript, Tailwind CSS v3, Radix UI / shadcn-ui primitives, Embla Carousel, Framer Motion, and Zustand).
- **Current Product Identity (`MetaPulse`):** Evolved from the Mobbin UI showcase template into **MetaPulse**, a **Unified Internet Gaming Review Aggregator & Catalogue** that normalizes critic verdicts from `IGN`, `GameSpot`, `PC Gamer`, `Eurogamer`, and `OpenCritic` alongside verified `Steam` player ratings on a single `0–100` scale.
- **Runtime & Performance Constraints:**
  - Runs on port `3000` (`0.0.0.0`) with `output: 'standalone'` in `next.config.js`.
  - Enforces a **global 60 FPS frame-pacing cap** (`lib/fps-limiter.ts` + `components/fps-cap-provider.tsx`) across all `requestAnimationFrame` loops and high-refresh-rate (`120Hz`/`144Hz`) displays.
  - Features a **3-second Uiverse 9-slice magnifying text loading screen** (`components/initial-loader.tsx` + `components/loading-screen.tsx`).

---

## 2. Directory Structure Summary

| Directory / File | Purpose |
| :--- | :--- |
| **`/app`** | **Next.js App Router pages, layouts, and global styles.** Divided into route groups `(browse)` for main catalogue/editorial views and `(auth)` for authentication pages. |
| **`/app/globals.css`** | Global stylesheet containing `@tailwind` directives, `Basier Square` `@font-face` declarations, light-mint theme CSS variables (`#dcfbf5`), Embla fade utilities, and the Uiverse `.loader` 9-slice animation keyframes. |
| **`/components`** | **Core UI, feature, and layout components.** Houses the landing page (`landing-intro.tsx`), hero sections, sliding navbar search pill (`skiper3.tsx`), cards, modals, and category/filter bars. |
| **`/components/carousels`** | Embla & Framer Motion carousel components (`carousel-progress-bar.tsx`, `carousel-card.tsx`, `carousel-buttons-tags.tsx`). |
| **`/components/modals`** | Global dialog modals mounted via `modal-provider.tsx` (`game-review-modal.tsx` for full multi-outlet review breakdowns + player review submission, and `search-command-dialog.tsx`). |
| **`/components/ui`** | Reusable Radix UI + Tailwind (shadcn/ui) primitives (`button`, `dialog`, `command`, `dropdown-menu`, `hover-card`, `popover`, `scroll-area`, `carousel`, `checkbox`, `tooltip`). |
| **`/hooks`** | **Zustand global state stores** (`use-game-filter.ts`, `use-search-modal.ts`, `use-hero.ts`, `use-checkbox-selection.ts`). |
| **`/lib`** | **Pure business logic, datasets, and utilities.** Includes `games-data.ts` (curated games + multi-outlet reviews dataset and filtering/sorting functions), `fps-limiter.ts` (60 FPS frame-pacing cap), `utils.ts` (`cn` helper), and `utils.test.ts` (Node test suite). |
| **`/config`** | Navigation and category route definitions (`categories.ts`). |
| **`/public`** | Static assets including custom fonts (`/public/fonts`) and game cover artwork (`/public/images/games/`). |

---

## 3. Main Pages & Routes (`/app`)

1. **`/` (`app/(browse)/page.tsx` → `components/landing-intro.tsx`) — Introductory Landing Page ("Overview")**
   - Short editorial introduction to **MetaPulse**.
   - Features an asymmetric 2-column hero with live dataset counters (`885` Critic Verdicts Indexed, `6` Major Publications, `0–100` Scoring Scale), an interactive sample verdict switcher (`Elden Ring`, `Hades II`, `Cyberpunk 2077`) with floating hover physics, and a 4-step editorial guide (`01`–`04`) with direct links into the catalogue.
2. **`/browse/[platform]/[feature]` (`app/(browse)/browse/[platform]/[feature]/page.tsx`) — Main Review Catalogue & Gallery**
   - Dynamic route supporting platform filters (`ios` = All Platforms, `android` = PC & Console, `web` = Handheld & Deck) and 4 view tabs (`feature`):
     - `apps` (**Games**): Grid of minimal game cards (`CarouselCard`) showing cover art, title, genre, and normalized `0–100` MetaScore badge.
     - `screens` (**Reviews**): Feed of individual internet review cards (`CheckboxCard`) with outlet quotes and source links.
     - `ui-elements` (**Scores**): Side-by-side Critic vs. Player Consensus Breakdown table with score delta calculation.
     - `flows` (**Outlets**): Publication consensus cards (`IGN`, `GameSpot`, `PC Gamer`, `Eurogamer`, `Steam`, `OpenCritic`) with average scores and per-outlet filtering.
3. **`/collections` (`app/(browse)/collections/page.tsx`) — Indexed Publications & Outlets Directory**
   - Directory of all 6 review sources explaining how each publication's native scale (`/10`, `/100`, `/5 stars`, `% Positive`) is normalized and weighted.
4. **`/pricing` (`app/(browse)/pricing/page.tsx`) — Scoring Index & Methodology**
   - Explains the `0–100` score tiers (`90–100` Universal Acclaim, `75–89` Generally Favorable, `<75` Mixed or Average) and conversion formulas.
5. **`/changelog` & `/search` (`app/(browse)/changelog/page.tsx`, `app/(browse)/search/[... Categories]/page.tsx`)**
   - Auxiliary routes inherited from the original Mobbin clone structure.
6. **`/login` (`app/(auth)/login/page.tsx`) — Authentication Page**
   - Standalone login screen from the original template under the `(auth)` layout group.

---

## 4. Key UI Components (`/components`)

- **`Navbar` (`app/(browse)/_components/navbar.tsx`) & `NavLinks` (`components/nav-links.tsx`)**
  - Sticky top navigation bar with 3 zones: `MetaPulse` wordmark (`/`), primary platform/directory links (`Overview`, `All Platforms`, `PC & Console`, `Handheld & Deck`, `Outlets Directory`, `Scoring Index`), and the right-hand search/menu cluster.
- **`NavbarSearchPill` / `Skiper3` (`components/skiper3.tsx`) & `SearchButtonNav` (`components/search-button-nav.tsx`)**
  - Compact `36px × 36px` circular search icon pill in the top-right navbar that **slides diagonally down to the top-center just below the navbar** (`top: 80px`, `width: up to 420px`) using Framer Motion spring physics (`stiffness: 340, damping: 30`) when clicked or triggered via `Cmd+K` / `Ctrl+K`.
  - Live-filters the game catalogue via `useGameFilter`, reveals a clear (`X`) button and `ESC` badge, and slides smoothly back into its `36×36` navbar slot on `Escape`, outside click, or clicking the origin ghost ring.
- **`HerosComponent` (`components/hero-switcher.tsx`), `CarouselProgressBar` (`components/carousels/carousel-progress-bar.tsx`), & `HeroHomepage` (`components/hero-homepage.tsx`)**
  - Switchable hero section at the top of `/browse/[platform]/[feature]`.
  - `CarouselProgressBar` is the default autoplay Embla carousel with a floating spotlight preview card; `HeroHomepage` is the static editorial view (toggled via `"Static Hero"` in `NavMenu`).
  - Both feature `framer-motion` floating hover animations (`y: [-6, -11, -6]`, `scale: 1.015–1.02`) on their hero image containers and have had the 3D background removed per user preference.
- **`CategoriesList` (`components/categories-list.tsx`) & `CardsList` (`components/cards-list.tsx`)**
  - `CategoriesList` renders the view tabs (`Games`, `Reviews`, `Scores`, `Outlets`) and native `<select>` dropdowns for Outlet and Sort order.
  - `CardsList` renders the active tab view filtered by `filterAndSortGames()`.
- **`CarouselCard` (`components/carousels/carousel-card.tsx`) & `CheckboxCard` (`components/checkbox-card.tsx`)**
  - `CarouselCard`: Clean game card displaying cover art, title, genre, and color-coded MetaScore badge (Compare checkboxes were intentionally removed per user request). Clicking any card opens `GameReviewModal`.
  - `CheckboxCard`: Individual outlet review card in the `Reviews` tab.
- **`GameReviewModal` (`components/modals/game-review-modal.tsx`)**
  - Full-detail dialog displaying aggregated Critic MetaScore, Verified Player Score, all publication quotes and original scores, and an interactive form allowing users to submit their own player review and rating into the Zustand store.
- **`InitialLoader` (`components/initial-loader.tsx`) & `LoadingScreen` (`components/loading-screen.tsx`)**
  - Full-screen dark (`bg-neutral-950`) loading screen using the Uiverse.io 9-slice magnifying text and wobbling line CSS loader (`.loader`), configured to display for **3 seconds (`3000ms`)** on initial load before fading out.

---

## 5. Key Commands for Verification

```bash
# Start development server on port 3000
npm run dev

# Run unit tests (6 tests covering cn, 60 FPS limiter, game filtering/sorting, and Zustand stores)
npx --yes tsx --test lib/utils.test.ts

# Run ESLint and Production Build
npm run lint
npm run build
```
