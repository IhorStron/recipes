import React from "react";
import { Link } from "react-router-dom";
import "./RecipeCard.css";

interface RecipeCardProps {
  recipe: any;
  onAddToFavorites: (recipe: any) => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onAddToFavorites }) => {
  return (
    <div className="recipe-card">
      <h2>{recipe.strMeal}</h2>
      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        className="recipe-card-img"
      />
      <p><strong>Категорія:</strong> {recipe.strCategory}</p>
      <p><strong>Регіон:</strong> {recipe.strArea}</p>
      <div className="recipe-card-buttons">
        <button
          onClick={() => onAddToFavorites(recipe)}
          className="add-to-favorites-btn"
        >
          Додати в улюблені
        </button>
        <Link to={`/recipe/${recipe.idMeal}`} className="details-btn">
          Деталі
        </Link>
      </div>
    </div>
  );
};

export default RecipeCard;
