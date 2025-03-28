import { useState } from "react";
import { Recipes } from "../types";
import CustomDropdown from "./CustomDropDown";

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
  const [selectedIngredient, setSelectedIngredient] = useState<string>("");
  const [selectedAuthor, setSelectedAuthor] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const getUniqueSortedValues = <T,>(
    extractor: (recipe: Recipes) => T | T[]
  ): T[] => {
    return Array.from(
      new Set(
        originalData.flatMap((recipe) => {
          const extracted = extractor(recipe);
          return Array.isArray(extracted) ? extracted : [extracted];
        })
      )
    ).sort();
  };

  const handleSearch = () => {
    const filtered = originalData.filter((recipe) => {
      const matchesIngredient =
        !selectedIngredient ||
        recipe.ingredients.some(
          (ing) => ing.ingredient.toLowerCase() === selectedIngredient
        );

      const matchesAuthor =
        !selectedAuthor ||
        recipe.authorLastName.toLowerCase() === selectedAuthor;

      const matchesDate = !selectedDate || recipe.date === selectedDate;

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

      return (
        matchesIngredient && matchesAuthor && matchesDate && matchesSearchQuery
      );
    });

    setRecipes(filtered);
  };

  return (
    <div className="flex flex-col gap-2 items-center mb-5">
      <div
        className={`${
          isMobile
            ? "flex flex-col gap-2 items-center"
            : "flex gap-4 justify-center"
        } mb-2`}
      >
        <div className="flex gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search recipes..."
            className="border rounded-lg px-2 py-1"
          />
        </div>
        <CustomDropdown
          label="Select an ingredient"
          value={selectedIngredient}
          options={getUniqueSortedValues((recipe) =>
            recipe.ingredients.map((ing) => ing.ingredient.toLowerCase())
          )}
          onChange={setSelectedIngredient}
        />

        <CustomDropdown
          label="Select an author"
          value={selectedAuthor}
          options={getUniqueSortedValues((recipe) =>
            recipe.authorLastName.toLowerCase()
          )}
          onChange={setSelectedAuthor}
        />

        <CustomDropdown
          label="Select a date"
          value={selectedDate}
          options={getUniqueSortedValues((recipe) => recipe.date)}
          onChange={setSelectedDate}
        />
      </div>

      <div className="flex gap-2 mb-5">
        <button
          className="border rounded-lg px-2 py-1 cursor-pointer bg-dark text-white"
          onClick={handleSearch}
        >
          Search
        </button>
        <button
          className="border border-dark text-dark rounded-lg px-2 py-1 cursor-pointer"
          onClick={() => {
            handleReset();
            setSelectedIngredient("");
            setSelectedAuthor("");
            setSelectedDate(0);
            setSearchQuery("");
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
