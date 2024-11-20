import apiClient from "./apiClient";


export interface Recipe {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strYoutube?: string;
  strIngredient1?: string;
  strMeasure1?: string;
  [key: string]: string | null | undefined; 
}


export const fetchAllRecipes = async (): Promise<Recipe[]> => {
  const response = await apiClient.get("/search.php?s="); 
  return response.data.meals as Recipe[];
};


export const fetchRecipeById = async (id: string) => {
    const response = await apiClient.get(`/lookup.php?i=${id}`);
    return response.data; 
  };
  
