import axios from "axios";
import {
  RatingInterface,
  RatingWithUserDetailsInterface,
} from "../interfaces/rating";
import { APIResponse } from "../interfaces/response";

export async function addRatingOnRecipe(
  recipeId: string,
  rating: RatingInterface
) {
  try {
    const res = await axios.put(`/api/recipe/rating/${recipeId}`, {
      ...rating,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function getRatingForRecipe(recipeId: string) {
  try {
    const res = await axios.get<
      APIResponse<Array<RatingWithUserDetailsInterface>>
    >(`/api/recipe/rating/${recipeId}`);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function addRatingOnWeeklyMenu(
  weeklyMenuId: string,
  rating: RatingInterface
) {
  try {
    const res = await axios.put(`/api/weekly_menu/rating/${weeklyMenuId}`, {
      ...rating,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function getRatingForWeeklyMenu(weeklyMenuId: string) {
  try {
    const res = await axios.get<
      APIResponse<Array<RatingWithUserDetailsInterface>>
    >(`/api/weekly_menu/rating/${weeklyMenuId}`);
    return res.data;
  } catch (error) {
    throw error;
  }
}
