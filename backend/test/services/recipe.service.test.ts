import * as RecipeService from "../../src/services/recipe.service";
import * as RecipeRepo from "../../src/repositories/recipe.repository";
import * as IngredientRepo from "../../src/repositories/ingredient.repository";
import * as StepRepo from "../../src/repositories/step.repository";
import { vi, describe, it, expect, beforeEach } from "vitest";

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
    cook_time: 15,
    servings: 2,
    difficulty: "beginner",
    cuisine: "Italian",
    image_url: "http://image.com",
    meal_type: "lunch",
    dietary_preferences: [],
    ingredients: [
      { name: "salt", quantity: 1, unit: "tsp", optional: false },
    ],
    steps: ["Boil water", "Cook pasta"],
  };

  const sampleRecipe = {
    id: "1",
    ...sampleRecipeInput,
    ingredients: sampleRecipeInput.ingredients,
    steps: sampleRecipeInput.steps,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("createRecipeService", () => {
    it("creates a recipe with ingredients and steps", async () => {
      mockedRecipeRepo.create.mockResolvedValue({ id: "1", ...sampleRecipeInput });
      mockedIngredientRepo.create.mockResolvedValue(sampleRecipeInput.ingredients[0]);
      mockedStepRepo.create.mockResolvedValue({ step_number: 1, instruction: "Boil water" });

      const result = await RecipeService.createRecipeService(sampleRecipeInput);

      expect(mockedRecipeRepo.create).toHaveBeenCalledTimes(1);
      expect(mockedIngredientRepo.create).toHaveBeenCalledTimes(1);
      expect(mockedStepRepo.create).toHaveBeenCalledTimes(2);
      expect(result.steps).toEqual(["Boil water", "Boil water"]); // step instructions from mocked StepRepo
      expect(result.ingredients).toEqual(sampleRecipeInput.ingredients);
    });

    it("throws if recipe creation fails", async () => {
      mockedRecipeRepo.create.mockResolvedValue(null as any);

      await expect(RecipeService.createRecipeService(sampleRecipeInput)).rejects.toThrow();
    });
  });

  describe("getRecipeByIdService", () => {
    it("returns recipe with ingredients and steps", async () => {
      mockedRecipeRepo.findById.mockResolvedValue(sampleRecipe);
      mockedIngredientRepo.findByRecipeId.mockResolvedValue(sampleRecipe.ingredients);
      mockedStepRepo.findByRecipeId.mockResolvedValue(
        sampleRecipe.steps.map((s, i) => ({ step_number: i + 1, instruction: s }))
      );

      const result = await RecipeService.getRecipeByIdService("1");

      expect(result.id).toBe("1");
      expect(result.ingredients).toEqual(sampleRecipe.ingredients);
      expect(result.steps).toEqual(sampleRecipe.steps);
    });

    it("throws if recipe not found", async () => {
      mockedRecipeRepo.findById.mockResolvedValue(null as any);
      await expect(RecipeService.getRecipeByIdService("999")).rejects.toThrow();
    });
  });

  describe("updateRecipeService", () => {
    it("updates a recipe and its ingredients/steps", async () => {
      const updatedInput = { title: "Updated Pasta", ingredients: sampleRecipeInput.ingredients, steps: ["Step 1"] };

      mockedRecipeRepo.findById.mockResolvedValue(sampleRecipe);
      mockedRecipeRepo.update.mockResolvedValue({ ...sampleRecipe, title: "Updated Pasta" });
      mockedIngredientRepo.deleteByRecipeId.mockResolvedValue(null as any);
      mockedIngredientRepo.create.mockResolvedValue(sampleRecipeInput.ingredients[0]);
      mockedStepRepo.deleteByRecipeId.mockResolvedValue(null as any);
      mockedStepRepo.create.mockResolvedValue({ step_number: 1, instruction: "Step 1" });

      const result = await RecipeService.updateRecipeService("1", updatedInput);

      expect(result.title).toBe("Updated Pasta");
      expect(result.steps).toEqual(["Step 1"]);
      expect(result.ingredients).toEqual(sampleRecipeInput.ingredients);
    });

    it("throws if recipe not found", async () => {
      mockedRecipeRepo.findById.mockResolvedValue(null as any);
      await expect(RecipeService.updateRecipeService("999", {})).rejects.toThrow();
    });
  });

  describe("deleteRecipeService", () => {
    it("deletes a recipe successfully", async () => {
      mockedRecipeRepo.deleteById.mockResolvedValue(sampleRecipe);

      await expect(RecipeService.deleteRecipeService("1")).resolves.toBeUndefined();
    });

    it("throws if recipe not found", async () => {
      mockedRecipeRepo.deleteById.mockResolvedValue(null as any);

      await expect(RecipeService.deleteRecipeService("999")).rejects.toThrow();
    });
  });
});
