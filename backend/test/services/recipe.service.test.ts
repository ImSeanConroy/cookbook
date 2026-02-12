import { describe, it, expect, vi, beforeEach } from "vitest";
import * as RecipeService from "../../src/services/recipe.service";
import * as RecipeRepo from "../../src/repositories/recipe.repository";
import * as IngredientRepo from "../../src/repositories/ingredient.repository";
import * as StepRepo from "../../src/repositories/step.repository";
import {
  BadRequestException,
  NotFoundException,
} from "../../src/utils/app-error";

const recipeId: string = "1";

describe("Recipe Service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("createRecipeService", () => {
    it("creates recipe with ingredients and steps", async () => {
      const recipeInput = {
        title: "Test Recipe",
        subtitle: "Test Recipe",
        description: "Test Desc",
        prep_time: 10,
        cook_time: 20,
        servings: 4,
        difficulty: "beginner" as const,
        cuisine: "Italian",
        image_url: "image-url",
        ingredients: [{ name: "salt", quantity: "1 tsp" }],
        steps: ["Step 1", "Step 2"],
        calories: 450,
        protein: 20.5,
        carbs: 55.0,
        fat: 15.0,
        sugars: 8.0,
        fiber: 4.0,
        saturated_fat: 5.0,
        sodium: 600,
        utensils: ["example-1", "example-2"],
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
          subtitle: "fail",
          description: "",
          prep_time: 0,
          cook_time: 0,
          servings: 0,
          difficulty: "beginner",
          cuisine: "",
          image_url: "",
          ingredients: [],
          steps: [],
          calories: 450,
          protein: 20.5,
          carbs: 55.0,
          fat: 15.0,
          sugars: 8.0,
          fiber: 4.0,
          saturated_fat: 5.0,
          sodium: 600,
          utensils: [],
        })
      ).rejects.toThrow(BadRequestException);
    });

    it("propagates error if ingredient creation fails", async () => {
      const recipeInput = {
        title: "Test",
        subtitle: "Test",
        description: "desc",
        prep_time: 5,
        cook_time: 10,
        servings: 2,
        difficulty: "beginner" as const,
        cuisine: "",
        image_url: "",
        ingredients: [{ name: "fail", quantity: "1 tsp" }],
        steps: [],
        calories: 450,
        protein: 20.5,
        carbs: 55.0,
        fat: 15.0,
        sugars: 8.0,
        fiber: 4.0,
        saturated_fat: 5.0,
        sodium: 600,
        utensils: [],
      };

      vi.spyOn(RecipeRepo, "create").mockResolvedValue({
        id: recipeId,
        created_at: "",
        updated_at: "",
        ...recipeInput,
      });
      vi.spyOn(IngredientRepo, "create").mockRejectedValue(
        new Error("Ingredient creation failed")
      );

      await expect(
        RecipeService.createRecipeService(recipeInput)
      ).rejects.toThrow("Ingredient creation failed");
    });
  });

  describe("getRecipeByIdService", () => {
    it("returns recipe with ingredients and steps", async () => {
      const recipe = {
        id: recipeId,
        title: "title",
        subtitle: "subtitle",
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
      expect(result.steps).toEqual(["step 1"]);
    });

    it("throws NotFoundException if recipe not found", async () => {
      vi.spyOn(RecipeRepo, "findById").mockResolvedValue(null);
      await expect(
        RecipeService.getRecipeByIdService(recipeId)
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe("getAllRecipesService", () => {
    it("returns filtered recipes when query and filters are provided", async () => {
      const mockRecipes = [{ id: "10", title: "Pasta Carbonara" }];
      const mockTotal = 1;
      const filters = {
        difficulty: "beginner",
        cuisine: "Italian",
        cookTime: "15to30",
      };
      const getAllSpy = vi
        .spyOn(RecipeRepo, "getAll")
        .mockResolvedValue(mockRecipes);
      const getCountSpy = vi
        .spyOn(RecipeRepo, "getCount")
        .mockResolvedValue(mockTotal);

      const result = await RecipeService.getAllRecipesService(
        1,
        10,
        "pasta",
        filters
      );

      expect(getAllSpy).toHaveBeenCalledWith({
        offset: 0,
        limit: 10,
        queryText: "pasta",
        ...filters,
      });
      expect(getCountSpy).toHaveBeenCalledWith({
        queryText: "pasta",
        ...filters,
      });
      expect(result.data).toEqual(mockRecipes);
      expect(result.totalItems).toBe(mockTotal);
      expect(result.totalPages).toBe(1);
      expect(result.currentPage).toBe(1);
    });
  });

  describe("updateRecipeService", () => {
    const existingRecipe = {
      id: recipeId,
      title: "Old title",
      subtitle: "Old subtitle",
      description: "Old description",
      prep_time: 10,
      cook_time: 15,
      servings: 2,
      difficulty: "beginner" as const,
      cuisine: "Italian",
      image_url: "old-url",
      calories: 450,
      protein: 20.5,
      carbs: 55.0,
      fat: 15.0,
      sugars: 8.0,
      fiber: 4.0,
      saturated_fat: 5.0,
      sodium: 600,
      utensils: ["example-1", "example-2"],
      created_at: "2021-01-01",
      updated_at: "2021-01-01",
    };

    it("updates recipe with partial input and ingredients/steps", async () => {
      const updateBody = {
        title: "New title",
        subtitle: "New subtitle",
        ingredients: [{ name: "pepper", quantity: "2 tsp" }],
        steps: ["Step 1", "Step 2"],
        utensils: ["example-1", "example-2"],
      };

      vi.spyOn(RecipeRepo, "findById").mockResolvedValue(existingRecipe);
      vi.spyOn(RecipeRepo, "update").mockImplementation(async (recipe) => ({
        ...recipe,
        created_at: existingRecipe.created_at,
        updated_at: new Date().toISOString(),
      }));

      vi.spyOn(IngredientRepo, "deleteByRecipeId").mockResolvedValue();
      vi.spyOn(IngredientRepo, "create").mockImplementation(
        async (recipeId, ingredient) => ({
          id: "newIngredientId",
          recipeId,
          ...ingredient,
        })
      );
      vi.spyOn(IngredientRepo, "findByRecipeId").mockResolvedValue([
        { id: "newIngredientId", recipeId, name: "pepper", quantity: "2 tsp" },
      ]);

      vi.spyOn(StepRepo, "deleteByRecipeId").mockResolvedValue();
      vi.spyOn(StepRepo, "create").mockImplementation(
        async (recipeId, step) => ({
          id: "newStepId",
          recipeId,
          instruction: step.instruction,
          step_number: step.step_number,
        })
      );
      vi.spyOn(StepRepo, "findByRecipeId").mockResolvedValue([
        { id: "newStepId", recipeId, step_number: 1, instruction: "Step 1" },
        { id: "newStepId2", recipeId, step_number: 2, instruction: "Step 2" },
      ]);

      const result = await RecipeService.updateRecipeService(
        recipeId,
        updateBody
      );

      expect(result.title).toBe("New title");
      expect(result.ingredients).toHaveLength(1);
      expect(result.steps).toEqual(["Step 1", "Step 2"]);
    });

    it("throws NotFoundException if recipe not found", async () => {
      vi.spyOn(RecipeRepo, "findById").mockResolvedValue(null);
      await expect(
        RecipeService.updateRecipeService("missing-id", {
          title: "Doesn't exist",
        })
      ).rejects.toThrow(NotFoundException);
    });

    it("throws BadRequestException if update fails", async () => {
      vi.spyOn(RecipeRepo, "findById").mockResolvedValue(existingRecipe);
      vi.spyOn(RecipeRepo, "update").mockResolvedValue(null);

      await expect(
        RecipeService.updateRecipeService(recipeId, {})
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe("deleteRecipeService", () => {
    it("deletes recipe successfully", async () => {
      vi.spyOn(RecipeRepo, "deleteById").mockResolvedValue(true);

      await RecipeService.deleteRecipeService(recipeId);
    });

    it("throws NotFoundException if recipe does not exist", async () => {
      vi.spyOn(RecipeRepo, "deleteById").mockResolvedValue(false);
      await expect(RecipeService.deleteRecipeService("bad-id")).rejects.toThrow(
        NotFoundException
      );
    });
  });
});
