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
        // trim so authorless records (first name "") don't sort under a
        // leading space ahead of "A" — "unknown" then sorts under U instead.
        return `${recipe.authorFirstName} ${recipe.authorLastName}`.trim();
      case "date":
        return recipe.date ?? 0;
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
    <div className="mx-auto w-full max-w-6xl px-5 mt-4">
      {/* frame on a plain wrapper (no overflow-clip) so the sticky thead can
          stick relative to the page instead of being trapped in the table box */}
      <div className="rounded-2xl border border-line shadow-sm bg-paperRaised">
        <table className="w-full text-left table-fixed">
          <colgroup>
          <col style={{ width: "15%" }} />
          <col style={{ width: "15%" }} />
          <col style={{ width: "7%" }} />
          <col style={{ width: "17%" }} />
          <col style={{ width: "22%" }} />
          <col style={{ width: "20%" }} />
          <col style={{ width: "4%" }} />
        </colgroup>
        <thead className="sticky top-56 z-20">
          <tr>
            {tableHeader.map(({ key, label }, idx) => {
              const isActive = sortColumn === key;
              const isSortable =
                key === "author" || key === "manual" || key === "date";
              return (
                <th
                  key={key}
                  onClick={isSortable ? () => handleSort(key) : undefined}
                  className={`px-5 py-4 select-none bg-paperRaised border-b border-line ${
                    idx === 0 ? "rounded-tl-2xl" : ""
                  } ${isSortable ? "cursor-pointer hover:text-ink" : ""} ${
                    isActive ? "text-sandDeep" : "text-inkSoft"
                  }`}
                >
                  <h5
                    className={`flex items-center gap-1 ${
                      isActive ? "text-sandDeep" : ""
                    }`}
                  >
                    {label}
                    {isSortable && (
                      <span className="flex flex-col leading-none -space-y-1">
                        <IoIosArrowUp
                          className={`text-xs ${
                            sortOrder === "asc" && isActive
                              ? "text-sandDeep"
                              : "text-inkSoft/40"
                          }`}
                        />
                        <IoIosArrowDown
                          className={`text-xs ${
                            sortOrder === "desc" && isActive
                              ? "text-sandDeep"
                              : "text-inkSoft/40"
                          }`}
                        />
                      </span>
                    )}
                  </h5>
                </th>
              );
            })}
            <th
              className="px-2 bg-paperRaised border-b border-line rounded-tr-2xl"
              aria-hidden="true"
            />
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
    </div>
  );
}
