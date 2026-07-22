import { z } from "zod";
import { DifficultyLevel } from "./recipe.interface";
import { generateMealPlanSchema } from "../schema/meal-plan.schema";

export type PortionPreset = "2x2" | "3x2" | "4x2" | "4x3";
export type GenerateMealPlanInput = z.infer<typeof generateMealPlanSchema>;

export interface MealPlanRecipe {
  id: string;
  title: string;
  subtitle: string;
  portions: number;
  cookTime: number;
  difficulty: DifficultyLevel;
  cuisine: string;
  calories: number | null;
  imageUrl: string;
  createdAt: string;
}

export interface WeeklyMeal {
  portions: number;
  recipe: MealPlanRecipe;
}

export interface WeeklyMealPlan {
  meals: WeeklyMeal[];
  metadata: {
    portionPreset: PortionPreset;
    totalMeals: number;
    totalPortions: number;
    generatedAt: string;
  };
}
