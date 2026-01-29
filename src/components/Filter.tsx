import { useState } from "react";
import { Recipes } from "../types";
import { IoMdClose } from "react-icons/io";
import { getUniqueSortedValues } from "../utils/utils";
import { FilterOptions } from "./FilterOptions";
import { LuSlidersHorizontal } from "react-icons/lu";

export type SelectedFilters = {
  selectedDate: number | null;
  selectedAuthor: string;
  selectedIngredients: string[];
};

export type Setters = {
  setSelectedDate: React.Dispatch<React.SetStateAction<number | null>>;
  setSelectedAuthor: React.Dispatch<React.SetStateAction<string>>;
  setSelectedIngredients: React.Dispatch<React.SetStateAction<string[]>>;
};

export type ActiveOptions = {
  activeDateOptions: (number | null)[];
  activeAuthorOptions: string[];
  activeIngredientOptions: string[];
};

type FilterProps = {
  handleSearch: () => void;
  originalData: Recipes[];
  filteredRecipes: Recipes[];
  selected: SelectedFilters;
  setters: Setters;
  activeOptions: ActiveOptions;
};

export function Filter({
  handleSearch,
  originalData,
  filteredRecipes,
  selected,
  setters,
  activeOptions,
}: FilterProps) {
  const [openFilter, setOpenFilter] = useState(false);

  const sortedDates = getUniqueSortedValues(
    originalData,
    (recipe) => recipe.date
  );
  const sortedAuthors = getUniqueSortedValues(originalData, (recipe) =>
    recipe.authorLastName.toLowerCase()
  );
  const sortedIngredients = getUniqueSortedValues(originalData, (recipe) =>
    recipe.ingredients.map((ing) => ing.ingredient.toLowerCase())
  );

  const activeFiltersCount = [
    selected.selectedDate !== null,
    selected.selectedAuthor !== "",
    selected.selectedIngredients.length > 0,
  ].filter(Boolean).length;

  return (
    <>
      <button
        onClick={() => setOpenFilter(true)}
        aria-label="Open filters"
        className="relative border border-darkSand p-3 rounded-lg cursor-pointer"
      >
        <LuSlidersHorizontal className="text-2xl stroke-darkSand" />
        {activeFiltersCount > 0 && (
          <p className="absolute -top-2 -right-2 bg-darkSand text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            {activeFiltersCount}
          </p>
        )}
      </button>

      {openFilter && (
        <>
          <div className="fixed inset-0 bg-slate-300 opacity-20 z-10 h-full"></div>

          <div
            className="fixed inset-0 z-20 flex items-center justify-center px-5 "
            onClick={() => setOpenFilter(false)}
          >
            <div
              className="bg-white p-6 rounded-lg shadow-lg relative max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setOpenFilter(false)}
                aria-label="Close filters"
                className="absolute top-4 right-4 cursor-pointer"
              >
                <IoMdClose className="text-2xl" />
              </button>

              <FilterOptions
                sortedDates={sortedDates}
                setters={setters}
                selected={selected}
                activeOptions={activeOptions}
                sortedAuthors={sortedAuthors}
                sortedIngredients={sortedIngredients}
              />

              <div className="flex flex-col items-center">
                <p className="mb-2">
                  {filteredRecipes.length}{" "}
                  {filteredRecipes.length === 1 ? "recipe" : "recipes"} found
                </p>
                <button
                  className="border rounded-lg px-6 py-3 cursor-pointer bg-darkSand text-white"
                  onClick={() => {
                    setOpenFilter(false);
                    handleSearch();
                  }}
                >
                  Apply filter
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
