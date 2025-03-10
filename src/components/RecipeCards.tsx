import { Recipes } from "../types";
import { RecipeCard } from "./RecipeCard";

type RecipeCardsProps = {
  recipes: Recipes[];
  setOpenDetails: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedRecipe: React.Dispatch<React.SetStateAction<Recipes | null>>;
};

export function RecipeCards({
  recipes,
  setOpenDetails,
  setSelectedRecipe,
}: RecipeCardsProps) {
  return (
    <>
      <div className="flex gap-4 flex-wrap justify-center">
        {recipes.map((recipe) => (
          <RecipeCard
            recipe={recipe}
            setOpenDetails={setOpenDetails}
            setSelectedRecipe={setSelectedRecipe}
          />
        ))}
      </div>
    </>
  );
}
