import { useState } from "react";
import { Recipes } from "../types";

type SearchProps = {
  recipes: Recipes[];
  setRecipes: React.Dispatch<React.SetStateAction<Recipes[]>>;
  handleReset: () => void;
};

export function SearchBar({ recipes, setRecipes, handleReset }: SearchProps) {
  const [selectedIngredient, setSelectedIngredient] = useState<string>("");

  const handleSearch = () => {
    const filtered = recipes.filter((recipe) =>
      recipe.ingredients.some((ing) => ing.ingredient === selectedIngredient)
    );

    console.log(filtered);
    setRecipes(filtered);
  };

  return (
    <div className="flex gap-4 justify-center mb-5">
      <select
        name="ingredients"
        id="ingredients"
        className="border rounded px-2 py-1"
        onChange={(e) => setSelectedIngredient(e.target.value)}
        value={selectedIngredient}
      >
        <option value="">Select an ingredient</option>
        {recipes
          ?.map((recipe) => recipe.ingredients)
          .flat()
          .map((ing, index) => (
            <option key={index} value={ing.ingredient}>
              {ing.ingredient}
            </option>
          ))}
      </select>

      <button
        className="border rounded px-2 py-1 cursor-pointer"
        onClick={handleSearch}
      >
        Search
      </button>
      <button
        className="border rounded px-2 py-1 cursor-pointer"
        onClick={() => {
          handleReset();
          setSelectedIngredient("");
        }}
      >
        Reset
      </button>
    </div>
  );
}
