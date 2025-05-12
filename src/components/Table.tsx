import { Recipes } from "../types";
import { TableBody } from "./TableBody";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

type TableProps = {
  recipes: Recipes[];
  setOpenDetails: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedRecipe: React.Dispatch<React.SetStateAction<Recipes | null>>;
  sortColumn: string | null;
  setSortColumn: React.Dispatch<React.SetStateAction<string | null>>;
  sortOrder: "asc" | "desc";
  setSortOrder: React.Dispatch<React.SetStateAction<"asc" | "desc">>;
};

export function Table({
  recipes,
  setOpenDetails,
  setSelectedRecipe,
  sortColumn,
  setSortColumn,
  sortOrder,
  setSortOrder,
}: TableProps) {
  const tableHeader = [
    { key: "author", label: "Author" },
    { key: "manual", label: "Manual" },
    { key: "date", label: "Date" },
    { key: "name", label: "Recipe Name" },
    { key: "ingredients", label: "Ingredients" },
    { key: "description", label: "Description" },
  ];
  const extractValue = (recipe: Recipes, key: string) => {
    switch (key) {
      case "author":
        return `${recipe.authorFirstName} ${recipe.authorLastName}`;
      case "date":
        return recipe.date !== null ? new Date(recipe.date).getTime() : 0;
      default:
        return recipe[key as keyof Recipes];
    }
  };

  const sortedRecipes = [...recipes].sort((a, b) => {
    if (!sortColumn) return 0;

    let aValue = extractValue(a, sortColumn);
    let bValue = extractValue(b, sortColumn);

    if (aValue === undefined || aValue === null) aValue = "";
    if (bValue === undefined || bValue === null) bValue = "";

    if (typeof aValue === "string" && typeof bValue === "string") {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }

    return sortOrder === "asc"
      ? aValue > bValue
        ? 1
        : -1
      : aValue < bValue
      ? 1
      : -1;
  });

  const handleSort = (key: string) => {
    if (sortColumn === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(key);
      setSortOrder("asc");
    }
  };
  return (
    <div className="px-24 relative flex flex-col w-full h-full text-black">
      <table className="w-full text-left table-auto border border-slate-400 bg-white/80 rounded-xl overflow-hidden">
        <thead className="bg-darkSand text-white">
          <tr>
            {tableHeader.map(({ key, label }) => {
              const isActive = sortColumn === key;
              const isSortable =
                key === "author" || key === "manual" || key === "date";
              return (
                <th
                  key={key}
                  onClick={
                    isSortable
                      ? () => handleSort(key)
                      : () => {
                          return;
                        }
                  }
                  className={`p-4 border-b border-slate-400 border-l ${
                    isSortable && "cursor-pointer"
                  }`}
                >
                  <h5 className="flex items-center gap-1">
                    {label}

                    {isSortable && (
                      <span
                        className={`transition-transform flex gap-1 ${
                          isActive ? "text-xl font-bold" : "text-sm"
                        }`}
                      >
                        <IoIosArrowUp
                          className={
                            sortOrder === "asc" && isActive
                              ? "text-lg font-bold text-gray-500"
                              : "text-sm"
                          }
                        />
                        <IoIosArrowDown
                          className={
                            sortOrder === "desc" && isActive
                              ? "text-lg font-bold text-gray-500"
                              : "text-sm"
                          }
                        />
                      </span>
                    )}
                  </h5>
                </th>
              );
            })}
          </tr>
        </thead>
        {sortedRecipes?.map((recipe) => (
          <TableBody
            key={recipe.id}
            recipe={recipe}
            setOpenDetails={setOpenDetails}
            setSelectedRecipe={setSelectedRecipe}
          />
        ))}
      </table>
    </div>
  );
}
