import { useEffect, useMemo, useState } from "react";
import { Recipes } from "../types";
import { Filter } from "./Filter";
import { IoSearchOutline } from "react-icons/io5";

type SearchProps = {
  originalData: Recipes[];
  setRecipes: React.Dispatch<React.SetStateAction<Recipes[]>>;
  handleReset: () => void;
};

export function SearchBar({
  setRecipes,
  handleReset,
  originalData,
}: SearchProps) {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [selectedAuthor, setSelectedAuthor] = useState<string>("");
  const [dateFrom, setDateFrom] = useState<number | null>(null);
  const [dateTo, setDateTo] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const selected = {
    selectedAuthor,
    dateFrom,
    dateTo,
    selectedIngredients,
  };

  const setters = {
    setSelectedAuthor,
    setDateFrom,
    setDateTo,
    setSelectedIngredients,
  };

  const filteredRecipes = useMemo(() => {
    const baseFiltered = originalData.filter((recipe) => {
      const matchesSearchQuery =
        !searchQuery ||
        `${recipe.authorFirstName} ${recipe.authorLastName}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.manual.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (recipe.site?.toLowerCase().includes(searchQuery.toLowerCase()) ??
          false) ||
        (recipe.country?.toLowerCase().includes(searchQuery.toLowerCase()) ??
          false) ||
        recipe.ingredients.some((ing) =>
          ing.ingredient.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        recipe.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesSearchQuery;
    });

    return baseFiltered.filter((recipe) => {
      const matchesIngredient =
        selectedIngredients.length === 0 ||
        selectedIngredients.every((selectedIng) =>
          recipe.ingredients.some(
            (ing) => ing.ingredient.toLowerCase() === selectedIng
          )
        );

      const matchesAuthor =
        !selectedAuthor ||
        recipe.authorLastName.toLowerCase() === selectedAuthor;

      const matchesDate =
        (dateFrom === null ||
          (recipe.date !== null && recipe.date >= dateFrom)) &&
        (dateTo === null || (recipe.date !== null && recipe.date <= dateTo));

      return matchesIngredient && matchesAuthor && matchesDate;
    });
  }, [
    originalData,
    selectedIngredients,
    selectedAuthor,
    dateFrom,
    dateTo,
    searchQuery,
  ]);

  // live search — results update on every keystroke / filter change, no submit
  useEffect(() => {
    setRecipes(filteredRecipes);
  }, [filteredRecipes, setRecipes]);

  return (
    <div className="sticky top-16 z-30 bg-paper flex items-center md:h-40">
      <div className="mx-auto w-full max-w-8xl px-5 py-6 md:py-0">
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <div className="flex items-center gap-2 flex-1 rounded-full border border-line bg-paperRaised px-4 py-3 shadow-sm focus-within:border-sandDeep transition-colors">
          <IoSearchOutline className="text-xl text-inkSoft shrink-0" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search recipes, authors, ingredients…"
            className="outline-none w-full bg-transparent text-ink placeholder:text-inkSoft/60"
          />

          <Filter
            originalData={originalData}
            filteredRecipes={filteredRecipes}
            selected={selected}
            setters={setters}
          />
        </div>

        <button
          className="rounded-full border border-ink/25 px-6 py-3 cursor-pointer text-ink text-sm transition-colors hover:bg-ink/5"
          onClick={() => {
            handleReset();
            setSelectedIngredients([]);
            setSelectedAuthor("");
            setDateFrom(null);
            setDateTo(null);
            setSearchQuery("");
          }}
        >
          Reset
        </button>
      </div>

        <p className="mt-6 text-sm uppercase tracking-widest text-inkSoft">
          {filteredRecipes.length}{" "}
          {filteredRecipes.length === 1 ? "recipe" : "recipes"}
        </p>
      </div>
    </div>
  );
}
