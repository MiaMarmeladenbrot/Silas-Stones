import { useEffect, useState } from "react";
import "./App.css";

import { ScrollToTop } from "./components/ScrollToTop";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainPage } from "./pages/MainPage";
import { ImpressumPage } from "./pages/ImpressumPage";
import { AboutPage } from "./pages/AboutPage";

function App() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);

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
    <BrowserRouter>
      <section className=" min-h-screen bg-[url(/img/BG.jpg)] pb-20 bg-fixed bg-cover bg-no-repeat flex flex-col justify-between">
        <Header />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<MainPage isMobile={isMobile} />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/impressum" element={<ImpressumPage />} />
          </Routes>
        </main>

        <Footer />

        <ScrollToTop />
      </section>
    </BrowserRouter>
  );
}

export default App;
