import {
  GenerateMealPlanInput,
  MealPlanRecipe,
  PortionPreset,
  WeeklyMeal,
  WeeklyMealPlan,
} from "../common/interface/meal-plan.interface";
import type { RecipeEntity } from "../common/interface/recipe.interface";
import { BadRequestException } from "../utils/app-error";
import * as RecipeRepo from "../repositories/recipe.repository";
import { logger } from "../common/config/logger.config";

const DEFAULT_PORTION_PRESET: PortionPreset = "2x2";
const PORTION_PRESET_PROFILES: Record<PortionPreset, number[]> = {
  "2x2": [2, 2, 2, 2, 2],
  "3x2": [3, 3, 2, 2, 2],
  "4x2": [4, 4, 2, 2, 2],
  "4x3": [4, 4, 4, 3, 3],
};

const shuffle = <T>(items: T[]): T[] => {
  const copy = [...items];

  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }

  return copy;
};

const toMealPlanRecipe = (
  recipe: RecipeEntity,
  portions: number,
): MealPlanRecipe => ({
  id: recipe.id,
  title: recipe.title,
  subtitle: recipe.subtitle,
  portions,
  cookTime: recipe.cookTime,
  difficulty: recipe.difficulty,
  cuisine: recipe.cuisine,
  calories: recipe.calories,
  imageUrl: recipe.imageUrl,
  createdAt: recipe.createdAt,
});

export const generateMealPlanService = async (
  input: GenerateMealPlanInput,
): Promise<WeeklyMealPlan> => {

  const portionPreset = input.portionPreset ?? DEFAULT_PORTION_PRESET;
  const portionProfile = PORTION_PRESET_PROFILES[portionPreset];
  const weeklyMealTarget = portionProfile.length;

  const recipes = await RecipeRepo.getMealPlan({
    cuisine: input.cuisine,
    difficulty: input.difficulty,
    cookTime: input.cookTime,
  });

  if (recipes.length === 0) {
    throw new BadRequestException(
      "No recipes found for the selected filters.",
    );
  }

  if (recipes.length < weeklyMealTarget) {
    throw new BadRequestException(
      `At least ${weeklyMealTarget} matching recipes are required to build this week's plan.`,
    );
  }

  const selectedRecipes = shuffle(recipes).slice(0, weeklyMealTarget);
  const meals: WeeklyMeal[] = selectedRecipes.map((recipe, index) => {
    const portions = portionProfile[index] ?? 2;
    return {
      portions,
      recipe: toMealPlanRecipe(recipe, portions),
    };
  });

  const totalPortions = meals.reduce((total, meal) => total + meal.portions, 0);

  logger.info("Meal prep plan generated", {
    context: "MealPlanService",
    portionPreset,
    totalMeals: weeklyMealTarget,
    totalPortions,
  });

  return {
    meals,
    metadata: {
      portionPreset,
      totalMeals: weeklyMealTarget,
      totalPortions,
      generatedAt: new Date().toISOString(),
    },
  };
};
