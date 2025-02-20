import { Props } from "../types";

export function Table({ recipes }: Props) {
  const tableHeader = [
    "Author",
    "Manual",
    "Date",
    "Recipename",
    "Ingredients",
    "Description",
    "Page",
  ];

  return (
    <div className="relative flex flex-col w-full h-full overflow-scroll shadow-md rounded-xl bg-clip-border mb-5">
      <table className="w-full text-left table-auto min-w-max border border-slate-400 ">
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
            <tr>
              <td className="p-4 border-b border-slate-400 border-l">
                <p>
                  {recipe.authorFirstName} {recipe.authorLastName}
                </p>
              </td>
              <td className="p-4 border-b border-slate-400 border-l">
                <p>{recipe.manual}</p>
              </td>
              <td className="p-4 border-b border-slate-400 border-l">
                <p>{recipe.date}</p>
              </td>
              <td className="p-4 border-b border-slate-400 border-l">
                <p>{recipe.name}</p>
              </td>
              <td className="p-4 border-b border-slate-400 border-l">
                <ul className="list-disc ml-4">
                  {recipe.ingredients.map((ing) => (
                    <li key={ing.ingredient}>
                      {ing.amount}
                      {ing.unit} {ing.ingredient}
                    </li>
                  ))}
                </ul>
              </td>
              <td className="p-4 border-b border-slate-400 border-l">
                <p>{recipe.description}</p>
              </td>
              <td className="p-4 border-b border-slate-400 border-l">
                <p>{recipe.page}</p>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
}
