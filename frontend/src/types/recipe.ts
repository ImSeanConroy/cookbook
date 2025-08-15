type DifficultyLevel = "easy" | "medium" | "hard" | "intermediate";

export interface Ingredient {
  name: string;
  quantity: string;
}

export interface Recipe {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty: DifficultyLevel;
  cuisine: string;
  imageUrl: string;
  cardImageUrl: string;
  calories: number | null;
  protein: number | null;
  carbs: number | null;
  fat: number | null;
  sugars: number | null;
  fiber: number | null;
  saturatedFat: number | null;
  sodium: number | null;
  createdAt: string;
  updatedAt: string;
  ingredients: Ingredient[];
  steps: string[];
  utensils: string[];
}

export interface RecipeSummary {
  id: string;
  title: string;
  subtitle: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty: string;
  cuisine: string;
  cardImageUrl: string;
  createdAt: string;
  updatedAt: string;
}