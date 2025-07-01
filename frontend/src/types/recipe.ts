type DifficultyLevel = "easy" | "medium" | "hard" | "intermediate";

export interface Ingredient {
  name: string;
  quantity: string;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty: DifficultyLevel;
  cuisine: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  ingredients: Ingredient[];
  steps: string[];
}

export interface RecipeSummary {
  id: string;
  title: string;
  description: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty: string;
  cuisine: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}