import { Recipes } from "../types";
import { FaArrowUp } from "react-icons/fa";

type TableProps = {
  recipes: Recipes[];
  setOpenDetails: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedRecipe: React.Dispatch<React.SetStateAction<Recipes | null>>;
};

export function Table({
  recipes,
  setOpenDetails,
  setSelectedRecipe,
}: TableProps) {
  const tableHeader = [
    "Author",
    "Manual",
    "Date",
    "Recipename",
    "Ingredients",
    "Description",
  ];

  return (
    <div className="px-10 mb-20 relative flex flex-col w-full h-full">
      <table className="w-full text-left table-auto border border-slate-400">
        <thead>
          <tr>
            {tableHeader.map((header) => (
              <th
                key={header}
                className="p-4 border-b border-slate-400 border-l"
              >
                <p>{header}</p>
              </th>
            ))}
          </tr>
        </thead>
        {recipes?.map((recipe) => (
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
        ))}
      </table>

      <div
        className="fixed bottom-5 right-11 bg-dark text-white p-3 rounded-full cursor-pointer"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <FaArrowUp />
      </div>
    </div>
  );
}
