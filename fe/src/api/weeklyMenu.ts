import axios from "axios";
import { APIResponse } from "../interfaces/response";
import {
  WeeklyMenuWithRecipeIds,
  WeeklyMenuWithRecipeDetails,
} from "../interfaces/weekly_menu";

export async function getWeeklyMenuBuId(
  weeklyMenuId: string
): Promise<APIResponse<WeeklyMenuWithRecipeDetails>> {
  try {
    const reuslt = await axios.get<APIResponse<WeeklyMenuWithRecipeDetails>>(
      `/api/weekly_menu/${weeklyMenuId}`
    );
    return reuslt.data;
  } catch (error) {
    throw error;
  }
}

export async function createNewWeeklyMenuAPI(recipeIds: string[]) {
  try {
    const result = await axios.post<APIResponse<null>>("/api/weekly_menu", {
      recipies_list: recipeIds,
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data;
    } else {
      throw error;
    }
  }
}

export async function editWeeklyMenuAPI(
  weeklyMenuWithRecipeIds: WeeklyMenuWithRecipeIds
) {
  try {
    const result = await axios.put<APIResponse<null>>("/api/weekly_menu", {
      ...weeklyMenuWithRecipeIds,
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data;
    } else {
      throw error;
    }
  }
}

export async function getPaginatedWeeklyMenus(
  pageNumber: number,
  pageSize: number
) {
  try {
    const result = await axios.get<APIResponse<Array<WeeklyMenuWithRecipeIds>>>(
      "/api/weekly_menu",
      {
        params: {
          page_number: pageNumber,
          page_size: pageSize,
        },
      }
    );
    return result.data;
  } catch (error) {
    throw error;
  }
}
