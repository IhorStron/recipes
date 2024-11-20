import React, { useEffect, useState } from "react";


interface Ingredient {
  ingredient: string;
  measure: string;
}


interface Recipe {
  id: string;
  name: string;
  category: string;
  area: string;
  thumbnail: string;
  instructions: string;
  ingredients: Ingredient[];
}

const FavoritesPage: React.FC = () => {
  const [favorites, setFavorites] = useState<Recipe[]>([]);

 
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]") as Recipe[];
    setFavorites(storedFavorites);
  }, []);

 
  const removeFromFavorites = (id: string) => {
    const updatedFavorites = favorites.filter((recipe) => recipe.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites)); 
    alert("Рецепт видалено з улюблених!");
  };

  if (!favorites || favorites.length === 0) {
    return <p>У вас немає улюблених рецептів.</p>;
  }

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1>Улюблені рецепти</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
        {favorites.map((recipe) => (
          <div
            key={recipe.id}
            style={{
              border: "1px solid #ddd",
              padding: "20px",
              borderRadius: "5px",
              textAlign: "center",
              backgroundColor: "#f9f9f9",
            }}
          >
            <h2>{recipe.name}</h2>
            {recipe.thumbnail ? (
              <img
                src={recipe.thumbnail}
                alt={recipe.name}
                style={{ width: "100%", maxWidth: "300px", borderRadius: "5px" }}
              />
            ) : (
              <p>Немає зображення</p>
            )}
            <p><strong>Категорія:</strong> {recipe.category || "Невідомо"}</p>
            <p><strong>Регіон:</strong> {recipe.area || "Невідомо"}</p>
            <h3>Інструкції</h3>
            <p>{recipe.instructions || "Немає інструкцій"}</p>
            <h3>Інгредієнти:</h3>
            {recipe.ingredients && recipe.ingredients.length > 0 ? (
              <ul style={{ textAlign: "left" }}>
                {recipe.ingredients.map((item, index) => (
                  <li key={`${recipe.id}-${index}`}>
                    {item.measure} {item.ingredient}
                  </li>
                ))}
              </ul>
            ) : (
              <p>Немає інгредієнтів</p>
            )}
            <button
              onClick={() => removeFromFavorites(recipe.id)}
              style={{
                marginTop: "10px",
                padding: "10px 20px",
                backgroundColor: "#ff4d4d",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Видалити
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;
