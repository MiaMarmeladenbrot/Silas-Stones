import { useState } from "react";
import { Recipes } from "../types";

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
  const [selectedDate, setSelectedDate] = useState<number>(0);

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
      <select
        name="ingredients"
        id="ingredients"
        className="border rounded-lg px-2 py-1"
        onChange={(e) => setSelectedIngredient(e.target.value)}
        value={selectedIngredient}
      >
        <option value="">Select an ingredient</option>
        {getUniqueSortedValues((recipe) =>
          recipe.ingredients.map((ing) => ing.ingredient.toLowerCase())
        ).map((ingredient, index) => (
          <option key={index} value={ingredient}>
            {ingredient}
          </option>
        ))}
      </select>

      <select
        name="author"
        id="author"
        className="border rounded-lg px-2 py-1"
        onChange={(e) => setSelectedAuthor(e.target.value)}
        value={selectedAuthor}
      >
        <option value="">Select an author</option>
        {getUniqueSortedValues((recipe) =>
          recipe.authorLastName.toLowerCase()
        ).map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>

      <select
        name="date"
        id="date"
        className="border rounded-lg px-2 py-1"
        onChange={(e) => setSelectedDate(Number(e.target.value))}
        value={selectedDate}
      >
        <option value="">Select a date</option>
        {getUniqueSortedValues((recipe) => recipe.date).map((date) => (
          <option key={date} value={date}>
            {date}
          </option>
        ))}
      </select>

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
          setSelectedDate(0);
        }}
      >
        Reset
      </button>
    </div>
  );
}
