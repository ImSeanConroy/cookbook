import * as IngredientRepo from "../../src/repositories/ingredient.repository";
import { vi, describe, it, expect, beforeEach } from "vitest";
import { query } from "../../src/common/config/database.config";

vi.mock("../../src/common/config/database.config", () => ({
  query: vi.fn(),
}));

vi.mock("../../src/utils/to-camel-case", () => ({
  toCamelCase: (rows: any[]) => rows,
}));

const mockedQuery = vi.mocked(query);

describe("Ingredient Repository", () => {
  const recipeId = "abc123";
  const ingredient = {
    name: "salt",
    quantity: 1,
    unit: "tsp",
    optional: false,
  };
  const mockRow = {
    name: "salt",
    quantity: 1,
    unit: "tsp",
    optional: false,
  };
  const mockRows = [
    { name: "salt", quantity: 1, unit: "tsp", optional: false },
    { name: "pepper", quantity: 2, unit: "tsp", optional: true },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("create", () => {
    it("inserts an ingredient and returns it", async () => {
      mockedQuery.mockResolvedValue([mockRow]);

      const result = await IngredientRepo.create(recipeId, ingredient);

      expect(mockedQuery).toHaveBeenCalledWith(
        `INSERT INTO ingredients (recipe_id, name, quantity, unit, optional) VALUES ($1, $2, $3, $4, $5) RETURNING name, quantity`,
        [recipeId, "salt", 1, "tsp", false],
      );
      expect(result).toEqual(mockRow);
    });

    it("throws if the database query fails", async () => {
      mockedQuery.mockRejectedValue(new Error("DB failure"));

      await expect(IngredientRepo.create(recipeId, ingredient)).rejects.toThrow(
        "DB failure",
      );
    });
  });

  describe("findByRecipeId", () => {
    it("returns all ingredients for a recipe", async () => {
      mockedQuery.mockResolvedValue(mockRows);

      const result = await IngredientRepo.findByRecipeId(recipeId);

      expect(mockedQuery).toHaveBeenCalledWith(
        `SELECT name, quantity, unit, optional FROM ingredients WHERE recipe_id = $1 ORDER BY name ASC`,
        [recipeId],
      );
      expect(result).toEqual(mockRows);
    });

    it("returns empty array if no ingredients found", async () => {
      mockedQuery.mockResolvedValue([]);

      const result = await IngredientRepo.findByRecipeId(recipeId);

      expect(result).toEqual([]);
    });

    it("throws if DB query fails", async () => {
      mockedQuery.mockRejectedValue(new Error("DB failure"));

      await expect(IngredientRepo.findByRecipeId(recipeId)).rejects.toThrow(
        "DB failure",
      );
    });
  });

  describe("deleteByRecipeId", () => {
    it("deletes ingredients and returns null", async () => {
      mockedQuery.mockResolvedValue([]);

      const result = await IngredientRepo.deleteByRecipeId(recipeId);

      expect(mockedQuery).toHaveBeenCalledWith(
        `DELETE FROM ingredients WHERE recipe_id = $1`,
        [recipeId],
      );
      expect(result).toBeNull();
    });

    it("throws if DB query fails", async () => {
      mockedQuery.mockRejectedValue(new Error("DB failure"));

      await expect(IngredientRepo.deleteByRecipeId(recipeId)).rejects.toThrow(
        "DB failure",
      );
    });
  });
});
