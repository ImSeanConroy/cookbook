// --------------------
// Difficulty Enum
// --------------------
export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

// --------------------
// Ingredient / Step Interfaces
// --------------------
export interface Ingredient {
  name: string;
  quantity: string;
}

export interface Step {
  step_number: number;
  instruction: string;
}

// --------------------
// Recipe Interface
// --------------------
export interface Recipe {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  prep_time: number;
  cook_time: number;
  servings: number;
  difficulty: DifficultyLevel;
  cuisine: string;
  image_url: string;
  card_image_url: string;
  calories: number | null;
  protein: number | null;
  carbs: number | null;
  fat: number | null;
  sugars: number | null;
  fiber: number | null;
  saturated_fat: number | null;
  sodium: number | null;
  utensils: string[];
  ingredients: Ingredient[];
  steps: string[];
  created_at: string;
  updated_at: string;
}

// --------------------
// Recipe Input Type
// --------------------
// This is the shape expected when creating or updating a recipe.
export type RecipeInput = Omit<Recipe, 'id' | 'created_at' | 'updated_at'>;
