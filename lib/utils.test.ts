import test from "node:test";
import assert from "node:assert/strict";
import { cn } from "./utils";
import { FPS_CAP, FRAME_INTERVAL_MS, shouldRunFrame } from "./fps-limiter";
import {
  GAMES_CATALOGUE,
  filterAndSortGames,
  getAllOutletReviews,
  getOutletMonogram,
  getScoreTier,
} from "./games-data";
import { useCheckboxSelection } from "../hooks/use-checkbox-selection";
import { useHero } from "../hooks/use-hero-selection";
import { useSearchModal } from "../hooks/use-search-modal";
import { useGameFilter } from "../hooks/use-game-filter";
import { siteConfig } from "../config/site";
import { computeScrollFadeState } from "./scroll-fade";
import {
  DASHBOARD_VIEWS,
  PRICING_TIERS,
  computePlanPrice,
  computeSeoAuditScore,
  validateWaitlistEmail,
} from "./seo-data";
import {
  BENTO_MATRIX_GAMES,
  FLUID_PRICING_TIERS,
  PLATFORM_HUB_VIEWS,
  filterMatrixGames,
  formatFluidPlanPrice,
} from "./fluid-flow-data";

test("cn merges tailwind classes and resolves conflicts", () => {
  assert.equal(cn("px-2 py-1", "px-4"), "py-1 px-4");
  assert.equal(
    cn("text-sm", false && "hidden", "font-medium"),
    "text-sm font-medium"
  );
});

test("60 FPS limiter enforces ~16.67ms frame budget on 120Hz timestamps", () => {
  assert.equal(FPS_CAP, 60);
  assert.ok(Math.abs(FRAME_INTERVAL_MS - 16.6667) < 0.01);

  // First frame always runs
  const f1 = shouldRunFrame(100, 0, 60);
  assert.equal(f1.run, true);
  assert.equal(f1.nextLastFrameMs, 100);

  // 120Hz tick (+8.33ms) should be skipped
  const f2 = shouldRunFrame(108.33, f1.nextLastFrameMs, 60);
  assert.equal(f2.run, false);
  assert.equal(f2.nextLastFrameMs, 100);

  // Second 120Hz tick (+16.67ms) should run
  const f3 = shouldRunFrame(116.67, f2.nextLastFrameMs, 60);
  assert.equal(f3.run, true);
});

test("games-data filtering, sorting, and score tiers work accurately", () => {
  assert.equal(getScoreTier(95).tier, "acclaim");
  assert.equal(getScoreTier(84).tier, "favorable");
  assert.equal(getScoreTier(65).tier, "mixed");

  assert.deepEqual(getOutletMonogram("IGN"), {
    code: "IG",
    scaleLabel: "10-PT SCALE",
  });
  assert.deepEqual(getOutletMonogram("Eurogamer"), {
    code: "EG",
    scaleLabel: "5-STAR SCALE",
  });

  const roguelikes = filterAndSortGames(GAMES_CATALOGUE, {
    genre: "Roguelike",
  });
  assert.equal(roguelikes.length, 1);
  assert.equal(roguelikes[0].title, "Hades II");

  const sortedByUser = filterAndSortGames(GAMES_CATALOGUE, {
    sortBy: "userScore",
  });
  assert.ok(sortedByUser[0].userScore >= sortedByUser[1].userScore);

  const allReviews = getAllOutletReviews(GAMES_CATALOGUE);
  assert.ok(allReviews.length >= 30);
});

test("useGameFilter updates filters and adds player reviews", () => {
  const store = useGameFilter;
  store.getState().resetFilters();
  assert.equal(store.getState().selectedGenre, "All");

  store.getState().setGenre("CRPG");
  assert.equal(store.getState().selectedGenre, "CRPG");

  const initialCount = store.getState().games[0].outletReviews.length;
  store.getState().addPlayerReview(1, {
    reviewer: "Test Critic",
    outlet: "Unit Test Weekly",
    score: 98,
    quote: "Masterpiece expansion with incredible level design.",
  });
  assert.equal(
    store.getState().games[0].outletReviews.length,
    initialCount + 1
  );
  store.getState().resetFilters();
});

test("useCheckboxSelection toggles and clears items accurately", () => {
  const store = useCheckboxSelection;
  store.getState().clearSelection();
  assert.deepEqual(store.getState().selectedItems, []);

  store.getState().toggleItem(1);
  store.getState().toggleItem(3);
  assert.deepEqual(store.getState().selectedItems, [1, 3]);

  store.getState().toggleItem(1);
  assert.deepEqual(store.getState().selectedItems, [3]);

  store.getState().clearSelection();
  assert.deepEqual(store.getState().selectedItems, []);
});

test("useHero and useSearchModal toggle states cleanly", () => {
  const initial = useHero.getState().isChecked;
  useHero.getState().toggleCheckbox();
  assert.equal(useHero.getState().isChecked, !initial);
  useHero.getState().toggleCheckbox();

  useSearchModal.getState().onOpen();
  assert.equal(useSearchModal.getState().isOpen, true);
  useSearchModal.getState().onClose();
  assert.equal(useSearchModal.getState().isOpen, false);
  assert.equal(siteConfig.name, "Next Mobbin Clone");
});

test("computeScrollFadeState classifies visible, above, and below viewport bounds", () => {
  assert.equal(
    computeScrollFadeState({ top: 150, bottom: 520 }, 900, 0.07),
    "visible"
  );
  assert.equal(
    computeScrollFadeState({ top: -320, bottom: 40 }, 900, 0.07),
    "above"
  );
  assert.equal(
    computeScrollFadeState({ top: 860, bottom: 1200 }, 900, 0.07),
    "below"
  );
});

test("RankPulse seo-data calculates pricing, audit scores, and validates waitlist emails", () => {
  assert.equal(DASHBOARD_VIEWS.overview.organicKeywords.value, "10.15k");
  assert.equal(DASHBOARD_VIEWS.overview.totalImpressions.value, "25.8k");
  assert.equal(PRICING_TIERS.length, 3);
  assert.equal(computePlanPrice(29, false), 29);
  assert.equal(computePlanPrice(29, true), 23);
  assert.equal(computePlanPrice(79, true), 63);
  assert.equal(computePlanPrice(199, true), 159);

  const defaultAudit = computeSeoAuditScore("www.website.com", [
    "Technical",
    "Keywords",
    "SERP Intent",
    "Backlinks",
  ]);
  assert.equal(defaultAudit.score, 98);

  assert.equal(validateWaitlistEmail("").valid, false);
  assert.equal(validateWaitlistEmail("invalid-email").valid, false);
  assert.equal(validateWaitlistEmail("founder@rankpulse.ai").valid, true);
});

test("Fluid Flow multi-platform hub views, matrix filter, and pricing formatter work accurately", () => {
  assert.equal(PLATFORM_HUB_VIEWS.all.fluidScore, "89/100");
  assert.equal(PLATFORM_HUB_VIEWS.all.consensusValue, "94% Positive");

  const deckRpgs = filterMatrixGames(BENTO_MATRIX_GAMES, "", "Deck", "RPG");
  assert.equal(deckRpgs.length, 2);

  assert.equal(formatFluidPlanPrice(FLUID_PRICING_TIERS[0], false), "$0");
  assert.equal(formatFluidPlanPrice(FLUID_PRICING_TIERS[1], false), "$4.99");
  assert.equal(formatFluidPlanPrice(FLUID_PRICING_TIERS[1], true), "$3.99");
  assert.equal(formatFluidPlanPrice(FLUID_PRICING_TIERS[2], false), "$19");
  assert.equal(formatFluidPlanPrice(FLUID_PRICING_TIERS[2], true), "$15");
});


