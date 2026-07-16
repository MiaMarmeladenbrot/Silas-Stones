import { useState } from "react";
import { DetailsPopUp } from "../components/DetailsPopUp";
import { RecipeCards } from "../components/RecipeCards";
import { SearchBar } from "../components/SearchBar";
import { Table } from "../components/Table";
import { Recipes } from "../types";
import data from "../data/data.json";
import { Hero } from "../components/Hero";

export function MainPage() {
  const [recipes, setRecipes] = useState<Recipes[]>(data);

  const [openDetails, setOpenDetails] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipes | null>(null);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const handleReset = () => {
    setRecipes(data);
    setSortColumn(null);
    setSortOrder("asc");
  };

  return (
    <>
      <Hero />
      <SearchBar
        originalData={data}
        setRecipes={setRecipes}
        handleReset={handleReset}
      />
      {/* card layout on phones, table from md up — toggled purely via CSS so
          there is no JS breakpoint to keep in sync with Tailwind's `md` */}
      <div className="md:hidden">
        <RecipeCards
          recipes={recipes}
          setOpenDetails={setOpenDetails}
          setSelectedRecipe={setSelectedRecipe}
        />
      </div>
      <div className="hidden md:block">
        <Table
          recipes={recipes}
          setOpenDetails={setOpenDetails}
          setSelectedRecipe={setSelectedRecipe}
          sortColumn={sortColumn}
          setSortColumn={setSortColumn}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
        />
      </div>
      {openDetails && (
        <DetailsPopUp
          setOpenDetails={setOpenDetails}
          selectedRecipe={selectedRecipe}
        />
      )}
    </>
  );
}
