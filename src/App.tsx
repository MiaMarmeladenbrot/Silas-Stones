import { useState } from "react";
import "./App.css";
import { SearchBar } from "./components/SearchBar";
import { Table } from "./components/Table";
import data from "./data/data.json";
import { DetailsPopUp } from "./components/DetailsPopUp";
import { Recipes } from "./types";

function App() {
  const [recipes, setRecipes] = useState<Recipes[]>(data);
  const [openDetails, setOpenDetails] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipes | null>(null);

  const handleReset = () => {
    setRecipes(data);
  };

  return (
    <>
      <div className="bg-[url(/img/detail.jpg)] h-[40vh] flex justify-center items-center text-center">
        <div>
          <h1 className="text-white">Silas' Stones</h1>
          <p className="text-white">Find your adhesive now</p>
        </div>
      </div>

      <h1 className="text-center py-10">Recipes</h1>
      <SearchBar
        originalData={data}
        setRecipes={setRecipes}
        handleReset={handleReset}
      />
      <Table
        recipes={recipes}
        setOpenDetails={setOpenDetails}
        setSelectedRecipe={setSelectedRecipe}
      />
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
