import React from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

interface Ingredient {
  ingredient: string;
  measure: string;
}

interface Recipe {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strMealThumb: string;
  strInstructions: string;
  ingredients: Ingredient[];
}

const RecipeDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  const [recipe, setRecipe] = React.useState<Recipe | null>(null);

  React.useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        const data = await response.json();
        if (data.meals) {
          const meal = data.meals[0];
          const ingredients = Array.from({ length: 20 }, (_, i) => ({
            ingredient: meal[`strIngredient${i + 1}`],
            measure: meal[`strMeasure${i + 1}`],
          })).filter((item) => item.ingredient);
          setRecipe({
            idMeal: meal.idMeal,
            strMeal: meal.strMeal,
            strCategory: meal.strCategory,
            strArea: meal.strArea,
            strMealThumb: meal.strMealThumb,
            strInstructions: meal.strInstructions,
            ingredients,
          });
        }
      } catch (error) {
        console.error("Помилка при завантаженні деталей рецепта:", error);
      }
    };

    fetchRecipeDetails();
  }, [id]);

  const handleBackClick = () => {
    const from = location.state?.from || "/";
    navigate(from); // Повернення на попередню сторінку
  };

  if (!recipe) {
    return <p>Завантаження деталей рецепта...</p>;
  }

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <button
        onClick={handleBackClick}
        style={{
          padding: "10px 20px",
          marginBottom: "20px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Повернутись назад
      </button>
      <h1>{recipe.strMeal}</h1>
      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        style={{ width: "100%", borderRadius: "10px", marginBottom: "20px" }}
      />
      <p>
        <strong>Категорія:</strong> {recipe.strCategory}
      </p>
      <p>
        <strong>Регіон:</strong> {recipe.strArea}
      </p>
      <h3>Інструкції</h3>
      <p>{recipe.strInstructions || "Немає інструкцій"}</p>
      <h3>Інгредієнти:</h3>
      {recipe.ingredients.length > 0 ? (
        <ul>
          {recipe.ingredients.map((item, index) => (
            <li key={index}>
              {item.measure} {item.ingredient}
            </li>
          ))}
        </ul>
      ) : (
        <p>Немає інгредієнтів</p>
      )}
    </div>
  );
};

export default RecipeDetailPage;
