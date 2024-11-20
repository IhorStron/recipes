import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AllRecipesPage from "./pages/AllRecipesPage/AllRecipesPage";
import FavoritesPage from "./pages/FavoritesPage";
import RecipeDetailPage from "./pages/RecipeDetailPage";
import Navbar from "./components/Navbar/Navbar";

const App: React.FC = () => {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Navbar />
      <Routes>
        <Route path="/" element={<AllRecipesPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/recipe/:id" element={<RecipeDetailPage />} />
        <Route path="*" element={<h1>404: Сторінка не знайдена</h1>} />
      </Routes>
    </Router>
  );
};

export default App;
