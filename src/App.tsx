import { useEffect, useState } from "react";
import "./App.css";
import { SearchBar } from "./components/SearchBar";
import { Table } from "./components/Table";
import data from "./data/data.json";
import { DetailsPopUp } from "./components/DetailsPopUp";
import { Recipes } from "./types";
import { RecipeCards } from "./components/RecipeCards";
import { ScrollToTop } from "./components/ScrollToTop";
import { Header } from "./components/Header";
import ContactPopUp from "./components/ContactPopUp";

function App() {
  const [recipes, setRecipes] = useState<Recipes[]>(data);
  const [openDetails, setOpenDetails] = useState(false);
  const [openContact, setOpenContact] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipes | null>(null);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const handleReset = () => {
    setRecipes(data);
    setSortColumn(null);
    setSortOrder("asc");
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section className="bg-[url(/img/BG.jpg)] pb-20 bg-fixed">
      <Header onOpenContact={() => setOpenContact(true)} />
      {openContact && (
        <ContactPopUp onCloseContact={() => setOpenContact(false)} />
      )}

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
          sortColumn={sortColumn}
          setSortColumn={setSortColumn}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
        />
      )}
      {openDetails && (
        <DetailsPopUp
          setOpenDetails={setOpenDetails}
          selectedRecipe={selectedRecipe}
        />
      )}
      <ScrollToTop />
    </section>
  );
}

export default App;
