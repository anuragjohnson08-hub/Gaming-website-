export type ScrollFadeState = "visible" | "above" | "below";

export interface RectBounds {
  top: number;
  bottom: number;
  height?: number;
}

/**
 * Pure calculation for whether an element should be faded in ("visible"),
 * faded out after scrolling past the top edge ("above"), or faded out
 * below the bottom edge ("below").
 */
export function computeScrollFadeState(
  rect: RectBounds,
  viewportHeight: number,
  marginRatio = 0.07
): ScrollFadeState {
  if (viewportHeight <= 0) {
    return "visible";
  }

  const topCutoff = viewportHeight * marginRatio;
  const bottomCutoff = viewportHeight * (1 - marginRatio);

  if (rect.bottom <= topCutoff) {
    return "above";
  }

  if (rect.top >= bottomCutoff) {
    return "below";
  }

  return "visible";
}
