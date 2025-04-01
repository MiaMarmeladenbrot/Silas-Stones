import { Recipes } from "../types";

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
