import { ActiveOptions, SelectedFilters, Setters } from "./Filter";

type FilterOptionsProps = {
  sortedDates: (number | null)[];
  sortedAuthors: string[];
  sortedIngredients: string[];
  selected: SelectedFilters;
  setters: Setters;
  activeOptions: ActiveOptions;
};

export function FilterOptions({
  sortedDates,
  sortedAuthors,
  sortedIngredients,
  setters,
  selected,
  activeOptions,
}: FilterOptionsProps) {
  const { setSelectedAuthor, setSelectedDate, setSelectedIngredients } =
    setters;
  const { selectedAuthor, selectedDate, selectedIngredients } = selected;
  const { activeAuthorOptions, activeDateOptions, activeIngredientOptions } =
    activeOptions;

  return (
    <div className="mb-5">
      <p className="text-darkSand mb-2">Select a date:</p>
      <div className="flex flex-wrap gap-2 mb-6">
        {sortedDates.map((date) => {
          const isDisabled = !activeDateOptions.includes(date);

          return (
            <p
              key={date}
              className={`py-1 px-2 rounded cursor-pointer ${
                selectedDate === date
                  ? "bg-darkSand"
                  : "text-darkSand border-darkSand border"
              } ${isDisabled ? "opacity-40 pointer-events-none" : ""}`}
              onClick={() => {
                setSelectedDate(selectedDate === date ? 0 : date);
              }}
            >
              {date}
            </p>
          );
        })}
      </div>

      <p className="text-darkSand mb-2">Select an author:</p>
      <div className="flex flex-wrap gap-2 mb-6">
        {sortedAuthors?.map((author) => {
          const isDisabled = !activeAuthorOptions.includes(author);
          return (
            <p
              key={author}
              className={`py-1 px-2 rounded cursor-pointer ${
                selectedAuthor === author
                  ? "bg-darkSand"
                  : "text-darkSand border-darkSand border"
              } ${isDisabled ? "opacity-30 pointer-events-none" : ""}`}
              onClick={() =>
                setSelectedAuthor(selectedAuthor === author ? "" : author)
              }
            >
              {author}
            </p>
          );
        })}
      </div>

      <p className="text-darkSand mb-2">Select one or more ingredients:</p>
      <div className="flex flex-wrap gap-2 mb-6">
        {sortedIngredients?.map((ingredient) => {
          const isSelected = selectedIngredients.includes(ingredient);
          const isDisabled =
            !isSelected && !activeIngredientOptions.includes(ingredient);

          return (
            <p
              key={ingredient}
              className={`py-1 px-2 rounded cursor-pointer ${
                isSelected
                  ? "bg-darkSand text-white"
                  : "text-darkSand border-darkSand border"
              } ${isDisabled ? "opacity-30 pointer-events-none" : ""}`}
              onClick={() => {
                if (isSelected) {
                  setSelectedIngredients((prev) =>
                    prev.filter((i) => i !== ingredient)
                  );
                } else {
                  setSelectedIngredients((prev) => [...prev, ingredient]);
                }
              }}
            >
              {ingredient}
            </p>
          );
        })}
      </div>
    </div>
  );
}
