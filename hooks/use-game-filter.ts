import { create } from "zustand";
import {
  GAMES_CATALOGUE,
  GameItem,
  OutletReview,
  SortOption,
} from "@/lib/games-data";

interface GameFilterStore {
  games: GameItem[];
  isLoading: boolean;
  hasFetched: boolean;
  selectedGenre: string;
  selectedOutlet: string;
  searchQuery: string;
  sortBy: SortOption;
  activeGameId: number | null;
  setIsLoading: (isLoading: boolean) => void;
  fetchGames: () => Promise<void>;
  setGenre: (genre: string) => void;
  setOutlet: (outlet: string) => void;
  setSearchQuery: (query: string) => void;
  setSortBy: (sort: SortOption) => void;
  resetFilters: () => void;
  openGameModal: (gameId: number) => void;
  closeGameModal: () => void;
  addPlayerReview: (
    gameId: number,
    review: { reviewer: string; score: number; quote: string; outlet?: string }
  ) => void;
}

export const useGameFilter = create<GameFilterStore>((set, get) => ({
  games: GAMES_CATALOGUE,
  isLoading: false,
  hasFetched: false,
  selectedGenre: "All",
  selectedOutlet: "All Outlets",
  searchQuery: "",
  sortBy: "metaScore",
  activeGameId: null,
  setIsLoading: (isLoading) => set({ isLoading }),
  fetchGames: async () => {
    if (get().hasFetched) return;
    set({ isLoading: true });
    try {
      const res = await fetch("/api/games");
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.games) && data.games.length > 0) {
          set({ games: data.games, isLoading: false, hasFetched: true });
          return;
        }
      }
      set({ isLoading: false, hasFetched: true });
    } catch {
      set({ isLoading: false, hasFetched: true });
    }
  },
  setGenre: (selectedGenre) => set({ selectedGenre }),
  setOutlet: (selectedOutlet) => set({ selectedOutlet }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setSortBy: (sortBy) => set({ sortBy }),
  resetFilters: () =>
    set({
      selectedGenre: "All",
      selectedOutlet: "All Outlets",
      searchQuery: "",
      sortBy: "metaScore",
    }),
  openGameModal: (activeGameId) => set({ activeGameId }),
  closeGameModal: () => set({ activeGameId: null }),
  addPlayerReview: (gameId, review) =>
    set((state) => {
      const clampedScore = Math.max(0, Math.min(100, Math.round(review.score)));
      const newReview: OutletReview = {
        id: `user-${Date.now()}`,
        outlet: review.outlet?.trim() || "Community Review",
        reviewer: review.reviewer.trim(),
        score: clampedScore,
        originalScoreDisplay: `${clampedScore} / 100`,
        date: "Just now",
        quote: review.quote.trim(),
        url: "#community-review",
        sentiment:
          clampedScore >= 90
            ? "acclaim"
            : clampedScore >= 75
            ? "positive"
            : "mixed",
      };

      const updatedGames = state.games.map((game) => {
        if (game.id !== gameId) return game;
        const updatedReviews = [newReview, ...game.outletReviews];
        const newTotalCritic = game.totalCriticReviews + 1;
        const avgUserScore = Math.round(
          (game.userScore * 10 + clampedScore) / 11
        );
        return {
          ...game,
          userScore: avgUserScore,
          totalCriticReviews: newTotalCritic,
          totalUserRatings: game.totalUserRatings + 1,
          outletReviews: updatedReviews,
        };
      });

      return { games: updatedGames };
    }),
}));
