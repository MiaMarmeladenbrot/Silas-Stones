import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DetailsPopUp } from "../components/DetailsPopUp";
import { RecipeCards } from "../components/RecipeCards";
import { SearchBar } from "../components/SearchBar";
import { Table } from "../components/Table";
import { Recipes } from "../types";
import data from "../data/data.json";
import { Hero } from "../components/Hero";

export function MainPage() {
  const [recipes, setRecipes] = useState<Recipes[]>(data);

  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // the open recipe lives in the URL, so every detail view is a shareable link
  const { id } = useParams();
  const navigate = useNavigate();
  const selectedRecipe = id
    ? (data.find((recipe) => recipe.id === id) ?? null)
    : null;

  // an unknown id (typo, renamed record) falls back to the list
  useEffect(() => {
    if (id && !selectedRecipe) navigate("/", { replace: true });
  }, [id, selectedRecipe, navigate]);

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
          onSelect={(recipe) => navigate(`/recipe/${recipe.id}`)}
        />
      </div>
      <div className="hidden md:block">
        <Table
          recipes={recipes}
          onSelect={(recipe) => navigate(`/recipe/${recipe.id}`)}
          sortColumn={sortColumn}
          setSortColumn={setSortColumn}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
        />
      </div>
      {selectedRecipe && (
        <DetailsPopUp
          onClose={() => navigate("/")}
          selectedRecipe={selectedRecipe}
        />
      )}
    </>
  );
}
