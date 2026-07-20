import { useMemo, useState } from "react";
import { Recipes } from "../types";
import { IoMdClose } from "react-icons/io";
import { getUniqueSortedValues, normalizeIngredient } from "../utils/utils";
import { FilterOptions } from "./FilterOptions";
import { LuSlidersHorizontal } from "react-icons/lu";

export type SelectedFilters = {
  selectedAuthor: string;
  selectedId: string;
  dateFrom: number | null;
  dateTo: number | null;
  selectedIngredients: string[];
};

export type Setters = {
  setSelectedAuthor: React.Dispatch<React.SetStateAction<string>>;
  setSelectedId: React.Dispatch<React.SetStateAction<string>>;
  setDateFrom: React.Dispatch<React.SetStateAction<number | null>>;
  setDateTo: React.Dispatch<React.SetStateAction<number | null>>;
  setSelectedIngredients: React.Dispatch<React.SetStateAction<string[]>>;
};

type FilterProps = {
  originalData: Recipes[];
  filteredRecipes: Recipes[];
  selected: SelectedFilters;
  setters: Setters;
};

export function Filter({
  originalData,
  filteredRecipes,
  selected,
  setters,
}: FilterProps) {
  const [openFilter, setOpenFilter] = useState(false);

  const sortedDates = getUniqueSortedValues(
    originalData,
    (recipe) => recipe.date,
  ) as number[];
  const sortedAuthors = getUniqueSortedValues(originalData, (recipe) =>
    recipe.authorLastName.toLowerCase(),
  );

  // normalized ingredient -> how many recipes use it (drives the "most common"
  // picks and the ingredient filter). Variants like "brickdust", "handful brick
  // dust" and "brick dust (tile)" all fold into one "brick dust" key here.
  const ingredientCounts = useMemo(() => {
    const counts = new Map<string, number>();
    originalData.forEach((recipe) =>
      recipe.ingredients.forEach((ing) => {
        const key = normalizeIngredient(ing.ingredient);
        if (key) counts.set(key, (counts.get(key) ?? 0) + 1);
      }),
    );
    return counts;
  }, [originalData]);

  const allIngredients = useMemo(
    () => [...ingredientCounts.keys()].sort(),
    [ingredientCounts],
  );
  const commonIngredients = useMemo(
    () =>
      [...ingredientCounts.entries()]
        .sort((a, b) => b[1] - a[1])
        .slice(0, 15)
        .map(([name]) => name),
    [ingredientCounts],
  );

  // every source id paired with its title, for the id lookup field
  const sourceIds = useMemo(
    () => originalData.map((recipe) => ({ id: recipe.id, name: recipe.name })),
    [originalData],
  );

  const activeFiltersCount = [
    selected.selectedAuthor !== "",
    selected.selectedId !== "",
    selected.dateFrom !== null || selected.dateTo !== null,
    selected.selectedIngredients.length > 0,
  ].filter(Boolean).length;

  const clearFilters = () => {
    setters.setSelectedAuthor("");
    setters.setSelectedId("");
    setters.setDateFrom(null);
    setters.setDateTo(null);
    setters.setSelectedIngredients([]);
  };

  return (
    <>
      <button
        onClick={() => setOpenFilter(true)}
        aria-label="Open filters"
        className="relative shrink-0 p-1.5 rounded-full cursor-pointer text-inkSoft hover:text-ink transition-colors"
      >
        <LuSlidersHorizontal className="text-xl" />
        {activeFiltersCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-sandDeep text-paper text-xs rounded-full w-4 h-4 flex items-center justify-center">
            {activeFiltersCount}
          </span>
        )}
      </button>

      {openFilter && (
        <>
          <div className="fixed inset-0 bg-ink/40 backdrop-blur-sm z-40"></div>

          <div
            className="fixed inset-0 z-50 flex items-center justify-center px-5"
            onClick={() => setOpenFilter(false)}
          >
            <div
              className="bg-paperRaised text-ink p-8 rounded-2xl shadow-xl relative max-w-2xl w-full overflow-y-auto border border-line"
              style={{ maxHeight: "90vh" }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setOpenFilter(false)}
                aria-label="Close filters"
                className="absolute top-5 right-5 cursor-pointer text-inkSoft hover:text-ink transition-colors"
              >
                <IoMdClose className="text-2xl" />
              </button>

              <h2 className="mb-6">Filters</h2>

              <FilterOptions
                sortedDates={sortedDates}
                sortedAuthors={sortedAuthors}
                allIngredients={allIngredients}
                commonIngredients={commonIngredients}
                ingredientCounts={ingredientCounts}
                sourceIds={sourceIds}
                setters={setters}
                selected={selected}
              />

              <div className="flex items-center justify-between gap-4 mt-2 pt-5 border-t border-line">
                <button
                  className="text-sm text-inkSoft hover:text-ink transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-default"
                  onClick={clearFilters}
                  disabled={activeFiltersCount === 0}
                >
                  Clear all
                </button>
                <button
                  className="rounded-full px-8 py-3 cursor-pointer bg-ink text-paper text-sm transition-opacity hover:opacity-85"
                  onClick={() => setOpenFilter(false)}
                >
                  Show {filteredRecipes.length}{" "}
                  {filteredRecipes.length === 1 ? "source" : "sources"}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
