import React, { useEffect, useState } from "react";
import { fetchAllRecipes } from "../../api/recipes";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import Pagination from "../../components/Pagination/Pagination";
import "./AllRecipesPage.css";

const AllRecipesPage: React.FC = () => {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>(""); 
  const [selectedCategory, setSelectedCategory] = useState<string>(""); 
  const [categories, setCategories] = useState<string[]>([]); 
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 3;

  useEffect(() => {
    const loadRecipes = async () => {
      const data = await fetchAllRecipes();
      setRecipes(data);
      setFilteredRecipes(data);
      const uniqueCategories = Array.from(
        new Set(data.map((recipe: any) => recipe.strCategory))
      );
      setCategories(uniqueCategories);
    };

    loadRecipes();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    filterRecipes(query, selectedCategory);
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const category = event.target.value;
    setSelectedCategory(category);
    filterRecipes(searchQuery, category);
  };

  const filterRecipes = (query: string, category: string) => {
    const filtered = recipes.filter((recipe) => {
      const matchesQuery = recipe.strMeal.toLowerCase().includes(query);
      const matchesCategory = category === "" || recipe.strCategory === category;
      return matchesQuery && matchesCategory;
    });

    setFilteredRecipes(filtered);
    setCurrentPage(1); 
  };

  const addToFavorites = (recipe: any) => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");

    if (storedFavorites.some((item: any) => item.id === recipe.idMeal)) {
      alert("Цей рецепт вже доданий до улюблених!");
      return;
    }

    const fullRecipe = {
      id: recipe.idMeal,
      name: recipe.strMeal,
      category: recipe.strCategory,
      area: recipe.strArea,
      thumbnail: recipe.strMealThumb,
      instructions: recipe.strInstructions || "Немає інструкцій",
      ingredients: Array.from({ length: 20 }, (_, i) => ({
        ingredient: recipe[`strIngredient${i + 1}`],
        measure: recipe[`strMeasure${i + 1}`],
      })).filter((item) => item.ingredient && item.ingredient.trim() !== ""),
    };

    const updatedFavorites = [...storedFavorites, fullRecipe];
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    alert("Рецепт додано до улюблених!");
  };

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = filteredRecipes.slice(
    indexOfFirstRecipe,
    indexOfLastRecipe
  );

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="all-recipes-page">
      <h1>Всі рецепти</h1>

      <div className="filter-bar">
        <input
          type="text"
          placeholder="Пошук рецептів..."
          value={searchQuery}
          onChange={handleSearch}
          className="search-input"
        />
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="category-select"
        >
          <option value="">Всі категорії</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="recipes-container">
        {currentRecipes.map((recipe) => (
          <RecipeCard
            key={recipe.idMeal}
            recipe={recipe}
            onAddToFavorites={addToFavorites}
          />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(filteredRecipes.length / recipesPerPage)}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default AllRecipesPage;
