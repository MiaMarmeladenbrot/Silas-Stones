import { useEffect, useState } from "react";
import "./App.css";
import { SearchBar } from "./components/SearchBar";
import { Table } from "./components/Table";
import data from "./data/data.json";
import { DetailsPopUp } from "./components/DetailsPopUp";
import { Recipes } from "./types";
import { RecipeCards } from "./components/RecipeCards";

function App() {
  const [recipes, setRecipes] = useState<Recipes[]>(data);
  const [openDetails, setOpenDetails] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipes | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  console.log(isMobile);

  const handleReset = () => {
    setRecipes(data);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div className="bg-[url(/img/detail.jpg)] h-[40vh] flex justify-center items-center text-center">
        <div>
          <h1 className="text-white">Silas' Stones</h1>
          <p className="text-white">Find your adhesive now</p>
        </div>
      </div>

      <h1 className="text-center pt-10 mb-5">
        {recipes.length} {recipes.length === 1 ? "recipe" : "recipes"} found
      </h1>
      <SearchBar
        originalData={data}
        setRecipes={setRecipes}
        handleReset={handleReset}
        isMobile={isMobile}
      />
      {isMobile && (
        <RecipeCards
          recipes={recipes}
          setOpenDetails={setOpenDetails}
          setSelectedRecipe={setSelectedRecipe}
        />
      )}
      {!isMobile && (
        <Table
          recipes={recipes}
          setOpenDetails={setOpenDetails}
          setSelectedRecipe={setSelectedRecipe}
        />
      )}
      {openDetails && (
        <DetailsPopUp
          setOpenDetails={setOpenDetails}
          selectedRecipe={selectedRecipe}
        />
      )}
    </>
  );
}

export default App;
