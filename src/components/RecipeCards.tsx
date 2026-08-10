import { Recipes } from "../types";
import { RecipeCard } from "./RecipeCard";

type RecipeCardsProps = {
  recipes: Recipes[];
  onSelect: (recipe: Recipes) => void;
};

export function RecipeCards({ recipes, onSelect }: RecipeCardsProps) {
  return (
    <>
      <div className="mx-auto w-full max-w-2xl px-5 mt-4 flex flex-col gap-3 mb-10">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} onSelect={onSelect} />
        ))}
      </div>
    </>
  );
}
