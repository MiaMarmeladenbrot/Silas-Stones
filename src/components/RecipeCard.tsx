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
      className="w-full rounded-xl border border-line bg-paperRaised py-4 px-5 cursor-pointer shadow-sm transition-shadow hover:shadow-md border-l-2 border-l-sand"
      onClick={() => {
        setOpenDetails(true);
        setSelectedRecipe(recipe);
      }}
    >
      <div className="mb-2 flex items-start justify-between gap-2">
        <h3 className="text-ink">{recipe.name}</h3>
        {recipe.type && (
          <span className="shrink-0 inline-block rounded-full border border-line bg-sand/15 text-ink/80 px-2.5 py-0.5 text-xs whitespace-nowrap">
            {recipe.type}
          </span>
        )}
      </div>
      <p className="text-sm text-inkSoft">
        {recipe.authorFirstName} {recipe.authorLastName}
        {recipe.date ? ` · ${recipe.date}` : ""}
      </p>
      <p className="text-sm text-inkSoft italic">in: {recipe.manual}</p>
    </div>
  );
}
