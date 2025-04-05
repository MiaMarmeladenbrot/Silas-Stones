import { useMemo, useState } from "react";
import { Recipes } from "../types";
import { Filter } from "./Filter";
import { IoSearchOutline } from "react-icons/io5";

type SearchProps = {
  originalData: Recipes[];
  setRecipes: React.Dispatch<React.SetStateAction<Recipes[]>>;
  handleReset: () => void;
  isMobile: boolean;
};

export function SearchBar({
  setRecipes,
  handleReset,
  originalData,
  isMobile,
}: SearchProps) {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [selectedAuthor, setSelectedAuthor] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const selected = {
    selectedDate,
    selectedAuthor,
    selectedIngredients,
  };

  const setters = {
    setSelectedDate,
    setSelectedAuthor,
    setSelectedIngredients,
  };

  const { filteredRecipes, activeOptions } = useMemo(() => {
    const baseFiltered = originalData.filter((recipe) => {
      const matchesSearchQuery =
        !searchQuery ||
        `${recipe.authorFirstName} ${recipe.authorLastName}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.manual.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.ingredients.some((ing) =>
          ing.ingredient.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        recipe.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesSearchQuery;
    });

    const filteredRecipes = baseFiltered.filter((recipe) => {
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

      const matchesDate = !selectedDate || recipe.date === selectedDate;

      return matchesIngredient && matchesAuthor && matchesDate;
    });

    const activeIngredientOptions = Array.from(
      new Set(
        filteredRecipes.flatMap((r) =>
          r.ingredients.map((i) => i.ingredient.toLowerCase())
        )
      )
    ).sort();

    const activeAuthorOptions = Array.from(
      new Set(filteredRecipes.map((r) => r.authorLastName.toLowerCase()))
    ).sort();

    const activeDateOptions = Array.from(
      new Set(filteredRecipes.map((r) => r.date))
    ).sort();

    return {
      filteredRecipes,
      activeOptions: {
        activeIngredientOptions,
        activeAuthorOptions,
        activeDateOptions,
      },
    };
  }, [
    originalData,
    selectedIngredients,
    selectedAuthor,
    selectedDate,
    searchQuery,
  ]);

  const handleSearch = () => setRecipes(filteredRecipes);

  return (
    <>
      <div className="flex flex-col gap-2 items-center">
        <div
          className={`${
            isMobile
              ? "flex flex-col gap-2 items-center"
              : "flex gap-4 justify-center"
          } mb-2`}
        >
          <div className="flex gap-3 items-center">
            <div className="flex items-center border rounded-lg px-2 py-3 w-full sm:w-md bg-white">
              <IoSearchOutline className="mr-2 text-2xl stroke-darkSand" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search recipes..."
                className="outline-none w-full text-darkSand"
              />
            </div>

            <Filter
              originalData={originalData}
              filteredRecipes={filteredRecipes}
              handleSearch={handleSearch}
              activeOptions={activeOptions}
              selected={selected}
              setters={setters}
            />
          </div>
        </div>

        <div className="flex gap-2 mb-5">
          <button
            className="rounded-lg px-6 py-3 cursor-pointer bg-darkSand text-white"
            onClick={handleSearch}
          >
            Search
          </button>
          <button
            className="border text-darkSand rounded-lg px-6 py-3 cursor-pointer bg-white"
            onClick={() => {
              handleReset();
              setSelectedIngredients([]);
              setSelectedAuthor("");
              setSelectedDate(null);
              setSearchQuery("");
            }}
          >
            Reset
          </button>
        </div>
        <h2 className="text-center mt-5 mb-10">
          {filteredRecipes.length}{" "}
          {filteredRecipes.length === 1 ? "recipe" : "recipes"} found
        </h2>
      </div>
    </>
  );
}
