import { Recipes } from "../types";

// Measure and preparation words that can still cling to an ingredient name after
// the data pipeline has parsed leading/trailing quantities (e.g. "handful brick
// dust" has no number, so "handful" is never split off there).
const MEASURE =
  /\b(?:parts?|handfuls?|handfull|pieces?|pcs|measures?|pounds?|pound|loth|lot|quentchen|quintlein|quentl|bushels?|maass|maas|mass|oz|lbs?|spoonfuls?|drops?|pinch(?:es)?|quart|pint|gallons?|ounces?|bits?|jugs?)\b/g;
const PREP =
  /\b(?:fine|finely|ground|grounded|powdered|pounded|crushed|sifted|grated|melted)\b/g;

/**
 * Collapse spelling / wording variants of an ingredient name to a canonical key.
 * Used ONLY for the filter's "most common" counts, the ingredient filter match,
 * and ingredient search — never for the verbatim text shown in a recipe's detail.
 *
 * Mechanical only (no semantic synonyms — "resin" and "rosin" stay separate):
 * lowercase, drop parenthetical/bracket glosses and stray numbers, strip leftover
 * measure/preparation words, unify the glued spellings ("brickdust" -> "brick
 * dust"). It deliberately does NOT guess which half of a multi-material line
 * ("brick dust or gypsum", "tallow/tar") is the "real" ingredient, so those stay
 * as their own entries rather than being mis-merged.
 */
export const normalizeIngredient = (raw: string): string => {
  let s = raw.toLowerCase().trim();
  s = s.replace(/\([^)]*\)/g, " ").replace(/\[[^\]]*\]/g, " ");
  s = s.replace(/\d+(?:[.,]\d+)?/g, " ");
  s = s.replace(MEASURE, " ").replace(PREP, " ");
  s = s
    .replace(/brickdust/g, "brick dust")
    .replace(/stonedust/g, "stone dust")
    .replace(/chalkdust/g, "chalk dust");
  s = s.replace(/\bof\b/g, " ").replace(/\s+/g, " ").trim();
  return s.replace(/^[\s\-<>?.,/;:•*]+|[\s\-<>?.,/;:•*]+$/g, "").trim();
};

export const getUniqueSortedValues = <T>(
  data: Recipes[],
  extractor: (recipe: Recipes) => T | T[]
): T[] => {
  return Array.from(
    new Set(
      data
        .flatMap((r) => {
          const value = extractor(r);
          return Array.isArray(value) ? value : [value];
        })
        .filter(Boolean)
    )
  ).sort();
};
