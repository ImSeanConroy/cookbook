import { describe, it, expect, vi, beforeEach } from "vitest";
import * as RecipeService from "../../src/services/recipe.service";
import * as RecipeRepo from "../../src/repositories/recipe.repository";
import * as IngredientRepo from "../../src/repositories/ingredient.repository";
import * as StepRepo from "../../src/repositories/step.repository";
import {
  BadRequestException,
  NotFoundException,
} from "../../src/utils/app-error";

describe("Recipe Service", () => {
  const recipeId = "1";

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("createRecipeService", () => {
    it("creates recipe with ingredients and steps", async () => {
      const recipeInput = {
        title: "Test Recipe",
        description: "Test Desc",
        prep_time: 10,
        cook_time: 20,
        servings: 4,
        difficulty: "beginner" as const,
        cuisine: "Italian",
        image_url: "image-url",
        ingredients: [{ name: "salt", quantity: "1 tsp" }],
        steps: ["Step 1", "Step 2"],
      };

      vi.spyOn(RecipeRepo, "create").mockResolvedValue({
        id: recipeId,
        created_at: "date",
        updated_at: "date",
        ...recipeInput,
      });
      vi.spyOn(IngredientRepo, "create").mockImplementation(
        async (_recipeId, ingredient) => ({
          id: "ingId",
          recipeId,
          ...ingredient,
        })
      );
      vi.spyOn(StepRepo, "create").mockImplementation(
        async (_recipeId, step) => ({ id: "stepId", recipeId, ...step })
      );

      const result = await RecipeService.createRecipeService(recipeInput);

      expect(result.id).toBe(recipeId);
      expect(result.ingredients).toHaveLength(recipeInput.ingredients.length);
      expect(result.steps).toEqual(recipeInput.steps);
    });

    it("throws BadRequestException if recipe creation fails", async () => {
      vi.spyOn(RecipeRepo, "create").mockResolvedValue(null as any);

      await expect(
        RecipeService.createRecipeService({
          title: "fail",
          description: "",
          prep_time: 0,
          cook_time: 0,
          servings: 0,
          difficulty: "beginner",
          cuisine: "",
          image_url: "",
          ingredients: [],
          steps: [],
        })
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe("getRecipeByIdService", () => {
    it("returns recipe with ingredients and steps", async () => {
      const recipe = {
        id: recipeId,
        title: "title",
        description: "desc",
        prep_time: 1,
        cook_time: 2,
        servings: 1,
        difficulty: "beginner" as const,
        cuisine: "",
        image_url: "",
        created_at: "date",
        updated_at: "date",
      };
      const ingredients = [{ name: "salt", quantity: "1 tsp" }];
      const steps = [{ step_number: 1, instruction: "step 1" }];

      vi.spyOn(RecipeRepo, "findById").mockResolvedValue(recipe);
      vi.spyOn(IngredientRepo, "findByRecipeId").mockResolvedValue(ingredients);
      vi.spyOn(StepRepo, "findByRecipeId").mockResolvedValue(steps);

      const result = await RecipeService.getRecipeByIdService(recipeId);

      expect(result.id).toBe(recipeId);
      expect(result.ingredients).toEqual(ingredients);
      expect(result.steps).toEqual(steps.map((s) => s.instruction));
    });

    it("throws NotFoundException if recipe not found", async () => {
      vi.spyOn(RecipeRepo, "findById").mockResolvedValue(null);
      await expect(
        RecipeService.getRecipeByIdService(recipeId)
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe("getAllRecipesService", () => {
    it("returns all recipes", async () => {
      const recipes = [{ id: "1" }, { id: "2" }];
      vi.spyOn(RecipeRepo, "getAll").mockResolvedValue(recipes);

      const result = await RecipeService.getAllRecipesService();

      expect(result).toEqual(recipes);
    });
  });

  describe("updateRecipeService", () => {
    it("updates recipe with partial input and ingredients/steps", async () => {
      const existingRecipe = {
        id: recipeId,
        title: "Old title",
        description: "Old description",
        prep_time: 10,
        cook_time: 15,
        servings: 2,
        difficulty: "beginner" as const,
        cuisine: "Italian",
        image_url: "old-url",
        created_at: "2021-01-01",
        updated_at: "2021-01-01",
      };

      const updateBody = {
        title: "New title",
        ingredients: [{ name: "pepper", quantity: "2 tsp" }],
        steps: ["Step 1", "Step 2"],
      };

      vi.spyOn(RecipeRepo, "findById").mockResolvedValue(existingRecipe);
      vi.spyOn(RecipeRepo, "update").mockImplementation(async (recipe) => ({
        ...recipe,
        created_at: existingRecipe.created_at,
        updated_at: new Date().toISOString(),
      }));

      vi.spyOn(IngredientRepo, "deleteByRecipeId").mockResolvedValue(undefined);
      vi.spyOn(IngredientRepo, "create").mockImplementation(
        async (recipeId, ingredient) => ({
          id: "newIngredientId",
          recipeId,
          ...ingredient,
        })
      );
      vi.spyOn(IngredientRepo, "findByRecipeId").mockResolvedValue([]);

      vi.spyOn(StepRepo, "deleteByRecipeId").mockResolvedValue(undefined);
      vi.spyOn(StepRepo, "create").mockImplementation(
        async (recipeId, step) => ({
          id: "newStepId",
          recipeId,
          ...step,
        })
      );
      vi.spyOn(StepRepo, "findByRecipeId").mockResolvedValue([]);

      const result = await RecipeService.updateRecipeService(
        recipeId,
        updateBody
      );

      expect(result.title).toBe(updateBody.title);
      expect(result.description).toBe(existingRecipe.description);

      expect(result.ingredients).toHaveLength(updateBody.ingredients.length);
      updateBody.ingredients.forEach((ingredient, i) => {
        expect(result.ingredients[i]).toMatchObject(ingredient);
      });

      expect(result.steps).toEqual(updateBody.steps);
    });

    it("throws NotFoundException if recipe to update does not exist", async () => {
      vi.spyOn(RecipeRepo, "findById").mockResolvedValue(null);
      await expect(
        RecipeService.updateRecipeService(recipeId, {})
      ).rejects.toThrow(NotFoundException);
    });

    it("throws BadRequestException if update fails", async () => {
      vi.spyOn(RecipeRepo, "findById").mockResolvedValue({
        id: recipeId,
        title: "title",
        description: "desc",
        prep_time: 1,
        cook_time: 2,
        servings: 1,
        difficulty: "beginner" as const,
        cuisine: "",
        image_url: "",
        created_at: "date",
        updated_at: "date",
      });
      vi.spyOn(RecipeRepo, "update").mockResolvedValue(null);

      await expect(
        RecipeService.updateRecipeService(recipeId, {})
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe("deleteRecipeService", () => {
    it("deletes a recipe", async () => {
      vi.spyOn(RecipeRepo, "deleteById").mockResolvedValue(true);
      await expect(
        RecipeService.deleteRecipeService(recipeId)
      ).resolves.toBeUndefined();
    });

    it("throws NotFoundException if delete fails", async () => {
      vi.spyOn(RecipeRepo, "deleteById").mockResolvedValue(false);
      await expect(RecipeService.deleteRecipeService(recipeId)).rejects.toThrow(
        NotFoundException
      );
    });
  });
});
