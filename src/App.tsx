import { useState } from "react";
import "./App.css";
import { SearchBar } from "./components/SearchBar";
import { Table } from "./components/Table";
import data from "./data/data.json";

function App() {
  const [recipes, setRecipes] = useState(data);

  const handleReset = () => {
    setRecipes(data);
  };

  return (
    <>
      <div className="bg-[url(/img/detail.jpg)] h-[60vh] flex justify-center items-center text-center">
        <div>
          <h1 className="text-white">Silas' Stones</h1>
          <p className="text-white">Find your adhesive now</p>
        </div>
      </div>

      <h1 className="text-center py-10">Recipes</h1>
      <SearchBar
        recipes={recipes}
        originalData={data}
        setRecipes={setRecipes}
        handleReset={handleReset}
      />
      <Table recipes={recipes} />
    </>
  );
}

export default App;
