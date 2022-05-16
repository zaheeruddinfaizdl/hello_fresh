export interface Ingredient {
  name: string;
  quantity: string;
}

export interface Nutirtion {
  name: string;
  amount: string;
}

export interface Recipe {
  id: string;
  name: string;
  ingredients: Array<Ingredient>;
  instructions: Array<string>;
  nutirtional_info: Array<Nutirtion>;
  classification: string;
}

export interface PaginatedRecipiesResponse {
  paginated_recipies: Recipe[];
  total_recipies: number;
}
