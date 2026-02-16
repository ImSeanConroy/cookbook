import { z } from "zod";
import {
  createRecipeSchema,
  updateRecipeSchema,
} from "../schema/recipe.schema";

// --------------------
// Enums
// --------------------

export type DifficultyLevel =
  | "beginner"
  | "intermediate"
  | "advanced";

// --------------------
// Shared Types
// --------------------

export interface Ingredient {
  name: string;
  quantity: number;
  unit: string;
  optional?: boolean;
}

export interface Step {
  step_number: number;
  instruction: string;
}

// --------------------
// Database Model (Flat)
// --------------------

export interface RecipeEntity {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  cookTime: number;
  servings: number;
  difficulty: DifficultyLevel;
  mealTypes: string[];
  dietaryPreferences: string[];
  cuisine: string;
  imageUrl: string;
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
}

// --------------------
// API Response Model (Nested)
// --------------------

export interface RecipeResponse {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  meta: {
    cookTime: number;
    servings: number;
    difficulty: DifficultyLevel;
    mealTypes: string[];
    dietaryPreferences: string[];
    cuisine: string;
  };
  nutrition: {
    calories: number | null;
    protein: number | null;
    carbs: number | null;
    fat: number | null;
    sugars: number | null;
    fiber: number | null;
    saturatedFat: number | null;
    sodium: number | null;
  };
  media: {
    imageUrl: string;
  };
  ingredients: Ingredient[];
  steps: string[];
  timestamps: {
    createdAt: string;
    updatedAt: string;
  };
}

// --------------------
// DTO Types (Derived from Zod)
// --------------------

export type RecipeInput = z.infer<typeof createRecipeSchema>;
export type UpdateRecipeInput = z.infer<typeof updateRecipeSchema>;
