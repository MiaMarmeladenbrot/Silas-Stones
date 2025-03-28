import { Recipes } from "../types";

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
        className="cursor-pointer hover:bg-light"
      >
        <td className="p-4 border-b border-slate-400 border-l align-text-top">
          <p>
            {recipe.authorFirstName} {recipe.authorLastName}
          </p>
        </td>
        <td className="p-4 border-b border-slate-400 border-l align-text-top">
          <p>{recipe.manual}</p>
        </td>
        <td className="p-4 border-b border-slate-400 border-l align-text-top">
          <p>{recipe.date}</p>
        </td>
        <td className="p-4 border-b border-slate-400 border-l align-text-top">
          <p>{recipe.name}</p>
        </td>
        <td className="p-4 border-b border-slate-400 border-l align-text-top">
          <ul className="list-disc ml-4">
            {recipe.ingredients.map((ing) => (
              <li key={ing.ingredient} className="diagonal-fractions">
                {ing.amount} {ing.unit} {ing.ingredient}
              </li>
            ))}
          </ul>
        </td>
        <td className="p-4 border-b border-slate-400 border-l align-text-top whitespace-pre-line max-w-[2000px]">
          <p>{recipe.description}</p>
        </td>
      </tr>
    </tbody>
  );
}
