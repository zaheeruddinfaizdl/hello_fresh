import { Recipe } from "./recipe";

export interface WeeklyMenuWithRecipeIds {
  id: string;
  recipies_list: string[];
  week_number: number;
  start_date?: string;
  end_date?: string;
}
export interface WeeklyMenuWithRecipeDetails {
  id: string;
  recipies_list: Recipe[];
  week_number: number;
}
