import * as MealPlanService from "../../src/services/meal-plan.service";
import * as RecipeRepo from "../../src/repositories/recipe.repository";
import type { RecipeEntity } from "../../src/common/interface/recipe.interface";
import { vi, describe, it, expect, beforeEach } from "vitest";

vi.mock("../../src/repositories/recipe.repository");

const mockedRecipeRepo = vi.mocked(RecipeRepo);

const sampleRecipes: RecipeEntity[] = [
  {
    id: "1",
    title: "Oats",
    subtitle: "Quick breakfast",
    description: "Test recipe description",
    cookTime: 10,
    servings: 1,
    difficulty: "beginner",
    cuisine: "American",
    mealTypes: ["lunch"],
    dietaryPreferences: ["vegetarian"],
    includeInMealPlan: true,
    calories: 350,
    protein: null,
    carbs: null,
    fat: null,
    sugars: null,
    fiber: null,
    saturatedFat: null,
    sodium: null,
    imageUrl: "https://img.test/oats.png",
    createdAt: "2026-07-21T17:45:39.204Z",
    updatedAt: "2026-07-21T17:45:39.204Z",
  },
  {
    id: "2",
    title: "Wrap",
    subtitle: "Protein lunch",
    description: "Test recipe description",
    cookTime: 20,
    servings: 1,
    difficulty: "beginner",
    cuisine: "American",
    mealTypes: ["lunch"],
    dietaryPreferences: ["vegetarian"],
    includeInMealPlan: true,
    calories: 480,
    protein: null,
    carbs: null,
    fat: null,
    sugars: null,
    fiber: null,
    saturatedFat: null,
    sodium: null,
    imageUrl: "https://img.test/wrap.png",
    createdAt: "2026-07-21T17:45:39.204Z",
    updatedAt: "2026-07-21T17:45:39.204Z",
  },
  {
    id: "3",
    title: "Rice Bowl",
    subtitle: "Balanced dinner",
    description: "Test recipe description",
    cookTime: 30,
    servings: 1,
    difficulty: "beginner",
    cuisine: "Asian",
    mealTypes: ["lunch"],
    dietaryPreferences: ["vegetarian"],
    includeInMealPlan: true,
    calories: 520,
    protein: null,
    carbs: null,
    fat: null,
    sugars: null,
    fiber: null,
    saturatedFat: null,
    sodium: null,
    imageUrl: "https://img.test/rice-bowl.png",
    createdAt: "2026-07-21T17:45:39.204Z",
    updatedAt: "2026-07-21T17:45:39.204Z",
  },
  {
    id: "4",
    title: "Pasta",
    subtitle: "Comfort meal",
    description: "Test recipe description",
    cookTime: 35,
    servings: 1,
    difficulty: "intermediate",
    cuisine: "Italian",
    mealTypes: ["lunch"],
    dietaryPreferences: ["vegetarian"],
    includeInMealPlan: true,
    calories: 560,
    protein: null,
    carbs: null,
    fat: null,
    sugars: null,
    fiber: null,
    saturatedFat: null,
    sodium: null,
    imageUrl: "https://img.test/pasta.png",
    createdAt: "2026-07-21T17:45:39.204Z",
    updatedAt: "2026-07-21T17:45:39.204Z",
  },
  {
    id: "5",
    title: "Chickpea Curry",
    subtitle: "High protein",
    description: "Test recipe description",
    cookTime: 40,
    servings: 1,
    difficulty: "intermediate",
    cuisine: "Indian",
    mealTypes: ["lunch"],
    dietaryPreferences: ["vegetarian"],
    includeInMealPlan: true,
    calories: 500,
    protein: null,
    carbs: null,
    fat: null,
    sugars: null,
    fiber: null,
    saturatedFat: null,
    sodium: null,
    imageUrl: "https://img.test/curry.png",
    createdAt: "2026-07-21T17:45:39.204Z",
    updatedAt: "2026-07-21T17:45:39.204Z",
  },
  {
    id: "6",
    title: "Tofu Stir Fry",
    subtitle: "Quick skillet",
    description: "Test recipe description",
    cookTime: 18,
    servings: 1,
    difficulty: "beginner",
    cuisine: "Asian",
    mealTypes: ["lunch"],
    dietaryPreferences: ["vegetarian"],
    includeInMealPlan: true,
    calories: 430,
    protein: null,
    carbs: null,
    fat: null,
    sugars: null,
    fiber: null,
    saturatedFat: null,
    sodium: null,
    imageUrl: "https://img.test/stir-fry.png",
    createdAt: "2026-07-21T17:45:39.204Z",
    updatedAt: "2026-07-21T17:45:39.204Z",
  }
]

describe("Meal Plan Service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("generates a fixed 5-meal weekly plan with the expected portions split", async () => {
    mockedRecipeRepo.getMealPlan.mockResolvedValue(sampleRecipes);

    const result = await MealPlanService.generateMealPlanService({
      cuisine: ["American", "Asian"],
      difficulty: ["beginner"],
      portionPreset: "4x2",
    });

    expect(result.meals).toHaveLength(5);
    expect(result.metadata.portionPreset).toBe("4x2");
    expect(result.metadata.totalMeals).toBe(5);
    expect(result.metadata.totalPortions).toBe(14);

    expect(result.meals.filter((meal) => meal.portions === 4)).toHaveLength(2);
    expect(result.meals.filter((meal) => meal.portions === 2)).toHaveLength(3);
    expect(result.meals.every((meal) => meal.recipe.cookTime > 0)).toBe(true);
    expect(result.meals.every((meal) => meal.recipe.portions === meal.portions)).toBe(true);

  });

  it("supports the 3x2 portion preset", async () => {
    mockedRecipeRepo.getMealPlan.mockResolvedValue(sampleRecipes);

    const result = await MealPlanService.generateMealPlanService({
      cuisine: ["American", "Asian", "Italian"],
      difficulty: ["beginner", "intermediate"],
      portionPreset: "3x2"
    });

    expect(result.metadata.portionPreset).toBe("3x2");
    expect(result.meals.filter((meal) => meal.portions === 3)).toHaveLength(2);
    expect(result.meals.filter((meal) => meal.portions === 2)).toHaveLength(3);
    expect(result.metadata.totalPortions).toBe(12);
  });

  it("supports the 2x2 portion preset", async () => {
    mockedRecipeRepo.getMealPlan.mockResolvedValue(sampleRecipes);

    const result = await MealPlanService.generateMealPlanService({
      cuisine: [],
      difficulty: [],
      portionPreset: "2x2"
    });

    expect(result.metadata.portionPreset).toBe("2x2");
    expect(result.meals.filter((meal) => meal.portions === 2)).toHaveLength(5);
    expect(result.metadata.totalPortions).toBe(10);
  });

  it("throws when no recipes are available for selected filters", async () => {
    mockedRecipeRepo.getMealPlan.mockResolvedValue([]);

    await expect(
      MealPlanService.generateMealPlanService({
        cuisine: ["French"],
        difficulty: ["advanced"],
        portionPreset: "4x2"
      }),
    ).rejects.toThrow("No recipes found for the selected filters.");
  });

  it("throws when fewer than five recipes are available", async () => {
    mockedRecipeRepo.getMealPlan.mockResolvedValue([sampleRecipes[0]]);

    await expect(
      MealPlanService.generateMealPlanService({
        cuisine: ["Italian"],
        difficulty: ["beginner"],
        portionPreset: "4x2"
      }),
    ).rejects.toThrow("At least 5 matching recipes are required to build this week's plan.");
  });
});
