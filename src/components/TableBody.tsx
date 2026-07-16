import { Recipes } from "../types";
import { IoIosArrowForward } from "react-icons/io";

type TableBodyProps = {
  recipe: Recipes;
  setOpenDetails: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedRecipe: React.Dispatch<React.SetStateAction<Recipes | null>>;
};

export function TableBody({
  recipe,
  setOpenDetails,
  setSelectedRecipe,
}: TableBodyProps) {
  return (
    <tbody key={recipe.id}>
      <tr
        onClick={() => {
          setOpenDetails(true);
          setSelectedRecipe(recipe);
        }}
        className="group cursor-pointer border-b border-line transition-colors hover:bg-sand/15"
      >
        <td className="px-5 py-4 align-top break-words">
          <p className="font-normal text-ink">
            {recipe.authorFirstName} {recipe.authorLastName}
          </p>
        </td>
        <td className="px-5 py-4 align-top">
          {recipe.type && (
            <span className="inline-block rounded-full border border-line bg-sand/15 text-ink/80 px-2.5 py-0.5 text-xs whitespace-nowrap">
              {recipe.type}
            </span>
          )}
        </td>
        <td className="px-5 py-4 align-top text-inkSoft break-words">
          <p>{recipe.manual}</p>
        </td>
        <td className="px-5 py-4 align-top text-inkSoft tabular-nums">
          <p>{recipe.date}</p>
        </td>
        <td className="px-5 py-4 align-top break-words">
          <p className="text-ink">{recipe.name}</p>
        </td>
        <td className="px-5 py-4 align-top">
          <div className="flex flex-wrap gap-1.5">
            {recipe.ingredients.map((ing) => (
              <span
                key={ing.ingredient}
                className="rounded-full bg-sand/20 text-ink/80 px-2.5 py-0.5 text-xs"
                title={`${ing.amount} ${ing.unit} ${ing.ingredient}`.trim()}
              >
                {ing.ingredient}
              </span>
            ))}
          </div>
        </td>
        <td className="px-5 py-4 align-top text-inkSoft">
          <p className="whitespace-pre-line line-clamp-4 text-sm leading-relaxed">
            {recipe.description}
          </p>
        </td>
        <td className="px-2 align-middle text-center">
          <IoIosArrowForward className="inline text-inkSoft/0 group-hover:text-sandDeep transition-colors" />
        </td>
      </tr>
    </tbody>
  );
}
