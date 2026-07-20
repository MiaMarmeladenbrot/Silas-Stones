import { useState } from "react";
import { IoMdClose, IoIosArrowDown } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import { SelectedFilters, Setters } from "./Filter";

type FilterOptionsProps = {
  sortedDates: number[];
  sortedAuthors: string[];
  allIngredients: string[];
  commonIngredients: string[];
  ingredientCounts: Map<string, number>;
  sourceIds: { id: string; name: string }[];
  typeCounts: [string, number][];
  selected: SelectedFilters;
  setters: Setters;
};

const selectClass =
  "w-full appearance-none border border-line rounded-xl bg-paper pl-4 pr-10 py-2.5 text-ink outline-none focus:border-sandDeep transition-colors cursor-pointer capitalize";

const dateInputClass =
  "w-full border border-line rounded-xl bg-paper px-4 py-2.5 text-ink outline-none focus:border-sandDeep transition-colors placeholder:text-inkSoft/50 tabular-nums";

export function FilterOptions({
  sortedDates,
  sortedAuthors,
  allIngredients,
  commonIngredients,
  ingredientCounts,
  sourceIds,
  typeCounts,
  selected,
  setters,
}: FilterOptionsProps) {
  const {
    setSelectedAuthor,
    setSelectedId,
    setDateFrom,
    setDateTo,
    setSelectedIngredients,
    setSelectedTypes,
  } = setters;
  const {
    selectedAuthor,
    selectedId,
    dateFrom,
    dateTo,
    selectedIngredients,
    selectedTypes,
  } = selected;

  const toggleType = (type: string) =>
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );

  const [ingQuery, setIngQuery] = useState("");
  const [idQuery, setIdQuery] = useState("");

  const minYear = sortedDates[0];
  const maxYear = sortedDates[sortedDates.length - 1];

  const query = ingQuery.trim().toLowerCase();
  const matches = query
    ? allIngredients.filter((i) => i.includes(query)).slice(0, 40)
    : commonIngredients;

  const idq = idQuery.trim().toLowerCase();
  const idMatches = idq
    ? sourceIds.filter((s) => s.id.toLowerCase().includes(idq)).slice(0, 40)
    : [];

  const toggleIngredient = (ing: string) =>
    setSelectedIngredients((prev) =>
      prev.includes(ing) ? prev.filter((i) => i !== ing) : [...prev, ing]
    );

  return (
    <div className="flex flex-col gap-6 mb-2">
      {/* Author */}
      <div>
        <label
          htmlFor="filter-author"
          className="block text-xs uppercase tracking-widest text-inkSoft mb-2"
        >
          Author
        </label>
        <div className="relative">
          <select
            id="filter-author"
            value={selectedAuthor}
            onChange={(e) => setSelectedAuthor(e.target.value)}
            className={selectClass}
          >
            <option value="">All authors</option>
            {sortedAuthors.map((author) => (
              <option key={author} value={author} className="capitalize">
                {author}
              </option>
            ))}
          </select>
          <IoIosArrowDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-inkSoft" />
        </div>
      </div>

      {/* Source type */}
      <div>
        <span className="block text-xs uppercase tracking-widest text-inkSoft mb-2">
          Type
        </span>
        <div className="flex flex-wrap gap-1.5">
          {typeCounts.map(([type, count]) => {
            const isSelected = selectedTypes.includes(type);
            return (
              <button
                key={type}
                onClick={() => toggleType(type)}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-sm cursor-pointer transition-colors ${
                  isSelected
                    ? "bg-ink text-paper"
                    : "bg-sand/20 text-ink/80 hover:bg-sand/40"
                }`}
              >
                {type}
                <span className="opacity-60 tabular-nums">{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Source ID */}
      <div>
        <span className="block text-xs uppercase tracking-widest text-inkSoft mb-2">
          Source ID
        </span>

        {/* current selection, removable */}
        {selectedId && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            <button
              onClick={() => setSelectedId("")}
              className="flex items-center gap-1 rounded-full bg-ink text-paper px-3 py-1 text-sm cursor-pointer font-mono"
            >
              {selectedId}
              <IoMdClose className="text-base" />
            </button>
          </div>
        )}

        {/* search field */}
        <div className="flex items-center gap-2 rounded-xl border border-line bg-paper px-3 py-2.5 focus-within:border-sandDeep transition-colors">
          <IoSearchOutline className="text-lg text-inkSoft shrink-0" />
          <input
            type="search"
            value={idQuery}
            onChange={(e) => setIdQuery(e.target.value)}
            placeholder="Search source id…"
            className="outline-none w-full bg-transparent text-ink placeholder:text-inkSoft/60 font-mono"
          />
        </div>

        {/* suggestions — only while typing */}
        {idq && (
          <div className="mt-2 max-h-44 overflow-y-auto rounded-xl border border-line divide-y divide-line">
            {idMatches.length > 0 ? (
              idMatches.map((s) => (
                <button
                  key={s.id}
                  onClick={() => {
                    setSelectedId(s.id);
                    setIdQuery("");
                  }}
                  className={`flex w-full items-baseline gap-3 px-3 py-2 text-left transition-colors hover:bg-ink/5 ${
                    s.id === selectedId ? "bg-ink/5" : ""
                  }`}
                >
                  <span className="font-mono text-sm text-ink shrink-0">
                    {s.id}
                  </span>
                  <span className="truncate text-sm text-inkSoft">
                    {s.name}
                  </span>
                </button>
              ))
            ) : (
              <p className="px-3 py-2 text-sm text-inkSoft">
                No matching source id
              </p>
            )}
          </div>
        )}
      </div>

      {/* Date range */}
      <div>
        <span className="block text-xs uppercase tracking-widest text-inkSoft mb-2">
          Date
        </span>
        <div className="flex items-center gap-3">
          <input
            type="number"
            inputMode="numeric"
            aria-label="From year"
            value={dateFrom ?? ""}
            min={minYear}
            max={maxYear}
            placeholder={`From ${minYear}`}
            onChange={(e) =>
              setDateFrom(e.target.value ? Number(e.target.value) : null)
            }
            className={dateInputClass}
          />
          <span className="text-inkSoft shrink-0">—</span>
          <input
            type="number"
            inputMode="numeric"
            aria-label="To year"
            value={dateTo ?? ""}
            min={minYear}
            max={maxYear}
            placeholder={`To ${maxYear}`}
            onChange={(e) =>
              setDateTo(e.target.value ? Number(e.target.value) : null)
            }
            className={dateInputClass}
          />
        </div>
      </div>

      {/* Ingredients */}
      <div>
        <span className="block text-xs uppercase tracking-widest text-inkSoft mb-2">
          Ingredients
        </span>

        {/* currently selected, removable */}
        {selectedIngredients.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {selectedIngredients.map((ing) => (
              <button
                key={ing}
                onClick={() => toggleIngredient(ing)}
                className="flex items-center gap-1 rounded-full bg-ink text-paper px-3 py-1 text-sm cursor-pointer capitalize"
              >
                {ing}
                <IoMdClose className="text-base" />
              </button>
            ))}
          </div>
        )}

        {/* search field */}
        <div className="flex items-center gap-2 rounded-xl border border-line bg-paper px-3 py-2.5 focus-within:border-sandDeep transition-colors">
          <IoSearchOutline className="text-lg text-inkSoft shrink-0" />
          <input
            type="search"
            value={ingQuery}
            onChange={(e) => setIngQuery(e.target.value)}
            placeholder="Search ingredients…"
            className="outline-none w-full bg-transparent text-ink placeholder:text-inkSoft/60"
          />
        </div>

        {/* matches / common quick-picks */}
        <p className="mt-3 mb-2 text-xs text-inkSoft">
          {query ? "Matches" : "Most common"}
        </p>
        <div className="flex flex-wrap gap-1.5 max-h-40 overflow-y-auto">
          {matches.map((ing) => {
            const isSelected = selectedIngredients.includes(ing);
            return (
              <button
                key={ing}
                onClick={() => toggleIngredient(ing)}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-sm cursor-pointer capitalize transition-colors ${
                  isSelected
                    ? "bg-ink text-paper"
                    : "bg-sand/20 text-ink/80 hover:bg-sand/40"
                }`}
              >
                {ing}
                <span className="opacity-60 tabular-nums">
                  {ingredientCounts.get(ing)}
                </span>
              </button>
            );
          })}
          {query && matches.length === 0 && (
            <span className="text-sm text-inkSoft">No matching ingredients</span>
          )}
        </div>
      </div>
    </div>
  );
}
