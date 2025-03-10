import { useState } from "react";
import { Recipes } from "../types";
import CustomDropdown from "./CustomDropDown";

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
  const [selectedIngredient, setSelectedIngredient] = useState<string>("");
  const [selectedAuthor, setSelectedAuthor] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>("");

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

      return matchesIngredient && matchesAuthor && matchesDate;
    });

    setRecipes(filtered);
  };

  return (
    <div className="flex gap-4 justify-center mb-5">
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
        options={getUniqueSortedValues((recipe) => recipe.date.toString())}
        onChange={setSelectedDate}
      />

      <button
        className="border rounded-lg px-2 py-1 cursor-pointer bg-[#dca87a] text-white"
        onClick={handleSearch}
      >
        Search
      </button>
      <button
        className="border rounded-lg px-2 py-1 cursor-pointer"
        onClick={() => {
          handleReset();
          setSelectedIngredient("");
          setSelectedAuthor("");
          setSelectedDate("");
        }}
      >
        Reset
      </button>
    </div>
  );
}
