import { Recipes } from "../types";

type RecipeCardProps = {
  recipe: Recipes;
  setOpenDetails: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedRecipe: React.Dispatch<React.SetStateAction<Recipes | null>>;
};

export function RecipeCard({
  recipe,
  setOpenDetails,
  setSelectedRecipe,
}: RecipeCardProps) {
  return (
    <div
      className="mb-4 bg-[#dca87a] text-white rounded-sm p-2 max-w-72 cursor-pointer"
      onClick={() => {
        setOpenDetails(true);
        setSelectedRecipe(recipe);
      }}
    >
      <h3>{recipe.name}</h3>
      <ul className="list-disc ml-10">
        {recipe.ingredients.map((ing) => (
          <li key={ing.ingredient} className="diagonal-fractions">
            {ing.amount} {ing.unit} {ing.ingredient}
          </li>
        ))}
      </ul>
    </div>
  );
}
