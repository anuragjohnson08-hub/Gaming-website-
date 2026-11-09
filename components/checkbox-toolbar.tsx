"use client";

import { Button } from "@/components/ui/button";
import { useCheckboxSelection } from "@/hooks/use-checkbox-selection";
import { useGameFilter } from "@/hooks/use-game-filter";
import { cn } from "@/lib/utils";

export function CheckboxToolbar() {
  const { selectedItems, clearSelection } = useCheckboxSelection();
  const { games, openGameModal } = useGameFilter();
  const countItems = selectedItems.length;

  const selectedGames = games.filter((g) => selectedItems.includes(g.id));
  const avgMeta =
    selectedGames.length > 0
      ? Math.round(
          selectedGames.reduce((sum, g) => sum + g.metaScore, 0) /
            selectedGames.length
        )
      : null;

  return (
    <div className="pointer-events-none fixed bottom-0 left-0 right-0 flex justify-center p-4 z-50">
      <div
        className={cn(
          "flex h-14 flex-row items-center justify-between gap-4 px-5 min-w-[340px] max-w-2xl bg-card border border-border rounded-2xl shadow-lg transition duration-200 ease-out pointer-events-auto select-none",
          countItems > 0
            ? "translate-y-0 opacity-100"
            : "translate-y-16 opacity-0"
        )}
      >
        <div className="flex items-center gap-3 min-w-0">
          <h2 className="whitespace-nowrap text-sm font-semibold text-foreground font-mono tabular-nums">
            {countItems} selected
          </h2>
          {avgMeta !== null && (
            <span className="text-xs text-muted-foreground truncate font-mono tabular-nums">
              · Avg MetaScore: {avgMeta}/100 (
              {selectedGames.map((g) => g.title).join(", ")})
            </span>
          )}
        </div>

        <div className="flex flex-row items-center gap-2 shrink-0">
          {selectedGames.length > 0 && (
            <Button
              size="sm"
              variant="default"
              className="h-8 rounded-lg text-xs whitespace-nowrap"
              onClick={() => openGameModal(selectedGames[0].id)}
            >
              Inspect Top Selected
            </Button>
          )}
          <Button
            size="sm"
            variant="outline"
            className="h-8 rounded-lg text-xs whitespace-nowrap"
            onClick={clearSelection}
          >
            Clear all
          </Button>
        </div>
      </div>
    </div>
  );
}
