import axios from "axios";
import { Recipe, PaginatedRecipiesResponse } from "../interfaces/recipe";
import { APIResponse } from "../interfaces/response";
export async function getRecipeDetailsById(recipeId: string) {
  try {
    const result = await axios.get<APIResponse<Recipe>>(
      `/api/recipe/${recipeId}`
    );
    return result.data;
  } catch (e) {
    throw e;
  }
}

export async function getPaginatedRecipies(
  pageNumber: number,
  pageSize: number
) {
  try {
    const result = await axios.get<APIResponse<PaginatedRecipiesResponse>>(
      "/api/recipe",
      {
        params: {
          page_number: pageNumber + 1,
          page_size: pageSize,
        },
      }
    );
    return result.data;
  } catch (e) {
    throw new Error(e);
  }
}

export async function editRecipe(recipe: Recipe) {
  try {
    const result = await axios.put(
      "/api/recipe",
      { ...recipe },
      { params: { recipe_id: recipe.id } }
    );
  } catch (e) {
    throw e;
  }
}

export async function createRecipe(recipe: Recipe) {
  try {
    const result = await axios.post("/api/recipe", { ...recipe });
  } catch (e) {
    throw e;
  }
}
export async function deleteRecipe(recipeId: string) {
  try {
    const result = await axios.delete("/api/recipe", {
      params: { recipe_id: recipeId },
    });
    return ``;
  } catch (error) {}
}
