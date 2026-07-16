import "./App.css";

import { ScrollToTop } from "./components/ScrollToTop";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainPage } from "./pages/MainPage";
import { ImpressumPage } from "./pages/ImpressumPage";
import { AboutPage } from "./pages/AboutPage";
// import { MaintenancePage } from "./pages/MaintenancePage";

function App() {
  return (
    <BrowserRouter>
      <section className="min-h-screen bg-paper text-ink pb-16 flex flex-col justify-between">
        <Header />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<MainPage />} />
            {/* <Route path="/" element={<MaintenancePage />} /> */}
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
