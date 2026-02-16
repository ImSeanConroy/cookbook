import * as RecipeService from "../../src/services/recipe.service";
import * as RecipeRepo from "../../src/repositories/recipe.repository";
import * as IngredientRepo from "../../src/repositories/ingredient.repository";
import * as StepRepo from "../../src/repositories/step.repository";
import { vi, describe, it, expect, beforeEach } from "vitest";
import { DifficultyLevel } from "../../src/common/interface/recipe.interface";

vi.mock("../../src/repositories/recipe.repository");
vi.mock("../../src/repositories/ingredient.repository");
vi.mock("../../src/repositories/step.repository");

const mockedRecipeRepo = vi.mocked(RecipeRepo);
const mockedIngredientRepo = vi.mocked(IngredientRepo);
const mockedStepRepo = vi.mocked(StepRepo);

describe("Recipe Service", () => {
  const sampleRecipeInput = {
    title: "Pasta",
    subtitle: "Yummy Pasta",
    description: "Delicious",
    meta: {
      cookTime: 15,
      servings: 2,
      difficulty: "beginner" as DifficultyLevel,
      cuisine: "Italian",
      mealTypes: ["lunch"],
      dietaryPreferences: [],
    },
    media: {
      imageUrl: "http://image.com",
    },
    nutrition: {
      calories: 200,
      protein: 10,
      carbs: 30,
      fat: 5,
      sugars: 2,
      fiber: 3,
      saturatedFat: 1,
      sodium: 100,
    },
    ingredients: [
      { name: "salt", quantity: 1, unit: "tsp", optional: false },
    ],
    steps: ["Boil water", "Cook pasta"],
  };

  const sampleRecipeEntity = {
    id: "1",
    title: "Pasta",
    subtitle: "Yummy Pasta",
    description: "Delicious",
    cookTime: 15,
    servings: 2,
    difficulty: "beginner" as DifficultyLevel,
    cuisine: "Italian",
    mealTypes: ["lunch"],
    dietaryPreferences: [],
    imageUrl: "http://image.com",
    calories: 200,
    protein: 10,
    carbs: 30,
    fat: 5,
    sugars: 2,
    fiber: 3,
    saturatedFat: 1,
    sodium: 100,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("createRecipeService", () => {
    it("creates a recipe with ingredients and steps", async () => {
      mockedRecipeRepo.create.mockResolvedValue(sampleRecipeEntity);

      mockedIngredientRepo.create.mockResolvedValue(
        sampleRecipeInput.ingredients[0],
      );

      mockedStepRepo.create
        .mockResolvedValueOnce({
          step_number: 1,
          instruction: "Boil water",
        })
        .mockResolvedValueOnce({
          step_number: 2,
          instruction: "Cook pasta",
        });

      const result =
        await RecipeService.createRecipeService(sampleRecipeInput);

      expect(mockedRecipeRepo.create).toHaveBeenCalledTimes(1);
      expect(mockedIngredientRepo.create).toHaveBeenCalledTimes(1);
      expect(mockedStepRepo.create).toHaveBeenCalledTimes(2);

      expect(result.steps).toEqual(["Boil water", "Cook pasta"]);
      expect(result.ingredients).toEqual(
        sampleRecipeInput.ingredients,
      );
    });

    it("throws if recipe creation fails", async () => {
      mockedRecipeRepo.create.mockResolvedValue(null as any);

      await expect(
        RecipeService.createRecipeService(sampleRecipeInput),
      ).rejects.toThrow();
    });
  });

  describe("getRecipeByIdService", () => {
    it("returns recipe with ingredients and steps", async () => {
      mockedRecipeRepo.findById.mockResolvedValue(sampleRecipeEntity);

      mockedIngredientRepo.findByRecipeId.mockResolvedValue(
        sampleRecipeInput.ingredients,
      );

      mockedStepRepo.findByRecipeId.mockResolvedValue([
        { step_number: 1, instruction: "Boil water" },
        { step_number: 2, instruction: "Cook pasta" },
      ]);

      const result =
        await RecipeService.getRecipeByIdService("1");

      expect(result.id).toBe("1");
      expect(result.ingredients).toEqual(
        sampleRecipeInput.ingredients,
      );
      expect(result.steps).toEqual([
        "Boil water",
        "Cook pasta",
      ]);
    });

    it("throws if recipe not found", async () => {
      mockedRecipeRepo.findById.mockResolvedValue(null as any);

      await expect(
        RecipeService.getRecipeByIdService("999"),
      ).rejects.toThrow();
    });
  });

  describe("updateRecipeService", () => {
    it("updates a recipe and its ingredients/steps", async () => {
      const updatedInput = {
        title: "Updated Pasta",
        ingredients: sampleRecipeInput.ingredients,
        steps: ["Step 1"],
      };

      mockedRecipeRepo.findById.mockResolvedValue(
        sampleRecipeEntity,
      );

      mockedRecipeRepo.update.mockResolvedValue({
        ...sampleRecipeEntity,
        title: "Updated Pasta",
      });

      mockedIngredientRepo.deleteByRecipeId.mockResolvedValue(
        undefined,
      );
      mockedIngredientRepo.create.mockResolvedValue(
        sampleRecipeInput.ingredients[0],
      );

      mockedStepRepo.deleteByRecipeId.mockResolvedValue(
        undefined,
      );
      mockedStepRepo.create.mockResolvedValue({
        step_number: 1,
        instruction: "Step 1",
      });

      const result =
        await RecipeService.updateRecipeService(
          "1",
          updatedInput as any,
        );

      expect(result.title).toBe("Updated Pasta");
      expect(result.steps).toEqual(["Step 1"]);
      expect(result.ingredients).toEqual(
        sampleRecipeInput.ingredients,
      );
    });

    it("throws if recipe not found", async () => {
      mockedRecipeRepo.findById.mockResolvedValue(null as any);

      await expect(
        RecipeService.updateRecipeService("999", {}),
      ).rejects.toThrow();
    });
  });

  describe("deleteRecipeService", () => {
    it("deletes a recipe successfully", async () => {
      mockedRecipeRepo.deleteById.mockResolvedValue(
        sampleRecipeEntity,
      );

      await expect(
        RecipeService.deleteRecipeService("1"),
      ).resolves.toBeUndefined();
    });

    it("throws if recipe not found", async () => {
      mockedRecipeRepo.deleteById.mockResolvedValue(null as any);

      await expect(
        RecipeService.deleteRecipeService("999"),
      ).rejects.toThrow();
    });
  });
});
