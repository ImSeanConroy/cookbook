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
  const ingredient = { name: "salt", quantity: "1 tsp" };
  const mockRow = { name: "salt", quantity: "1 tsp" };
  const mockRows = [
    { name: "salt", quantity: "1 tsp" },
    { name: "pepper", quantity: "2 tsp" },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("create", () => {
    it("should insert an ingredient and return the inserted row", async () => {
      mockedQuery.mockResolvedValue({ rows: [mockRow] });

      const result = await IngredientRepo.create(recipeId, ingredient);

      expect(mockedQuery).toHaveBeenCalledWith(
        `INSERT INTO ingredients (recipe_id, name, quantity) VALUES ($1, $2, $3) RETURNING name, quantity`,
        [recipeId, "salt", "1 tsp"]
      );
      expect(result).toEqual(mockRow);
    });

    it("should throw an error if the database query fails", async () => {
      mockedQuery.mockRejectedValue(new Error("DB failure"));

      await expect(IngredientRepo.create(recipeId, ingredient)).rejects.toThrow(
        "DB failure"
      );
    });
  });

  describe("findByRecipeId", () => {
    it("should return ingredients for the given recipe ID", async () => {
      mockedQuery.mockResolvedValue({ rows: mockRows });

      const result = await IngredientRepo.findByRecipeId(recipeId);

      expect(mockedQuery).toHaveBeenCalledWith(
        `SELECT name, quantity FROM ingredients WHERE recipe_id = $1 ORDER BY id ASC`,
        [recipeId]
      );
      expect(result).toEqual(mockRows);
    });

    it("should return empty array if no ingredients found", async () => {
      mockedQuery.mockResolvedValue({ rows: [] });

      const result = await IngredientRepo.findByRecipeId(recipeId);

      expect(result).toEqual([]);
    });

    it("should throw an error if the database query fails", async () => {
      mockedQuery.mockRejectedValue(new Error("DB failure"));

      await expect(IngredientRepo.findByRecipeId(recipeId)).rejects.toThrow(
        "DB failure"
      );
    });
  });

  describe("deleteByRecipeId", () => {
    it("should delete ingredients for a recipe and return null", async () => {
      mockedQuery.mockResolvedValue({ rows: [] });

      const result = await IngredientRepo.deleteByRecipeId(recipeId);

      expect(mockedQuery).toHaveBeenCalledWith(
        `DELETE FROM ingredients WHERE recipe_id = $1`,
        [recipeId]
      );
      expect(result).toBeNull();
    });

    it("should throw an error if the database query fails", async () => {
      mockedQuery.mockRejectedValue(new Error("DB failure"));

      await expect(IngredientRepo.deleteByRecipeId(recipeId)).rejects.toThrow(
        "DB failure"
      );
    });
  });
});
