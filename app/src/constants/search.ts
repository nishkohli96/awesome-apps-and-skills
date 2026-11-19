const PLACEHOLDER_STEP = 50;

/** "Search 150+ tools…", rounded down to the nearest 50 so it rolls over to 200+ by itself. */
export function searchPlaceholder(toolCount: number): string {
  const rounded = Math.floor(toolCount / PLACEHOLDER_STEP) * PLACEHOLDER_STEP;
  return `Search ${rounded}+ tools, skills and apps`;
}
