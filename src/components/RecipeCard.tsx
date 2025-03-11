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
      className="mb-4 rounded-sm p-2 max-w-72 cursor-pointer shadow hover:shadow-lg bg-[#dca87a16]"
      onClick={() => {
        setOpenDetails(true);
        setSelectedRecipe(recipe);
      }}
    >
      <h3 className="mb-1">{recipe.name}</h3>
      <p>in: {recipe.manual}</p>
      <p>
        {recipe.authorFirstName} {recipe.authorLastName}
      </p>
    </div>
  );
}
