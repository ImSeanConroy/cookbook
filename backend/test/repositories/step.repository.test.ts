import * as StepRepo from "../../src/repositories/step.repository";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { query } from "../../src/common/config/database.config";

vi.mock("../../src/common/config/database.config", () => ({
  query: vi.fn(),
}));

vi.mock("../../src/utils/to-camel-case", () => ({
  toCamelCase: (rows: any[]) => rows,
}));

const mockedQuery = vi.mocked(query);

describe("Step Repository", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const recipeId = "recipe-1";
  const step = { step_number: 1, instruction: "Boil water" };
  const mockRow = { ...step };
  const mockRows = [
    { step_number: 1, instruction: "Step 1" },
    { step_number: 2, instruction: "Step 2" },
  ];

  describe("create", () => {
    it("should insert a step and return it", async () => {
      mockedQuery.mockResolvedValue([mockRow]);

      const result = await StepRepo.create(recipeId, step);

      expect(mockedQuery).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockRow);
    });

    it("should throw if the database query fails", async () => {
      mockedQuery.mockRejectedValue(new Error("DB failure"));

      await expect(StepRepo.create(recipeId, step)).rejects.toThrow("DB failure");
    });
  });

  describe("findByRecipeId", () => {
    it("should return steps for the given recipe", async () => {
      mockedQuery.mockResolvedValue(mockRows);

      const result = await StepRepo.findByRecipeId(recipeId);

      expect(mockedQuery).toHaveBeenCalledWith(
        `SELECT step_number, instruction FROM steps WHERE recipe_id = $1 ORDER BY step_number ASC`,
        [recipeId]
      );
      expect(result).toEqual(mockRows);
    });

    it("should return empty array if no steps found", async () => {
      mockedQuery.mockResolvedValue([]);

      const result = await StepRepo.findByRecipeId(recipeId);

      expect(result).toEqual([]);
    });

    it("should throw if the database query fails", async () => {
      mockedQuery.mockRejectedValue(new Error("DB failure"));

      await expect(StepRepo.findByRecipeId(recipeId)).rejects.toThrow("DB failure");
    });
  });

  describe("deleteByRecipeId", () => {
    it("should delete steps and return deleted row if present", async () => {
      mockedQuery.mockResolvedValue([mockRow]);

      const result = await StepRepo.deleteByRecipeId(recipeId);

      expect(mockedQuery).toHaveBeenCalledWith(
        `DELETE FROM steps WHERE recipe_id = $1`,
        [recipeId]
      );
      expect(result).toEqual(mockRow);
    });

    it("should return null if no steps were deleted", async () => {
      mockedQuery.mockResolvedValue([]);

      const result = await StepRepo.deleteByRecipeId(recipeId);

      expect(result).toBeNull();
    });

    it("should throw if the database query fails", async () => {
      mockedQuery.mockRejectedValue(new Error("DB failure"));

      await expect(StepRepo.deleteByRecipeId(recipeId)).rejects.toThrow("DB failure");
    });
  });
});
