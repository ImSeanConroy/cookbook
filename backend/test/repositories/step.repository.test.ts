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

  describe("create", () => {
    it("should insert a step and return it", async () => {
      const mockRow = {
        step_number: 1,
        instruction: "Boil water",
      };
      mockedQuery.mockResolvedValue({ rows: [mockRow] });

      const result = await StepRepo.create("recipe-1", mockRow);

      expect(mockedQuery).toHaveBeenCalledOnce();
      expect(result).toEqual(mockRow);
    });

    it("should throw an error if the database query fails", async () => {
      mockedQuery.mockRejectedValue(new Error("DB failure"));

      await expect(StepRepo.create("recipe-1", {
        step_number: 1,
        instruction: "Boil water",
      })).rejects.toThrow("DB failure");
    });
  });

  describe("findByRecipeId", () => {
    it("should return steps for the given recipe", async () => {
      const mockRows = [
        { step_number: 1, instruction: "Step 1" },
        { step_number: 2, instruction: "Step 2" },
      ];
      mockedQuery.mockResolvedValue({ rows: mockRows });

      const result = await StepRepo.findByRecipeId("recipe-1");

      expect(mockedQuery).toHaveBeenCalledWith(
        expect.stringContaining("SELECT"),
        ["recipe-1"]
      );
      expect(result).toEqual(mockRows);
    });

    it("should return empty array if no steps found", async () => {
      mockedQuery.mockResolvedValue({ rows: [] });

      const result = await StepRepo.findByRecipeId("recipe-1");

      expect(result).toEqual([]);
    });

    it("should throw an error if the database query fails", async () => {
      mockedQuery.mockRejectedValue(new Error("DB failure"));

      await expect(StepRepo.findByRecipeId("recipe-1")).rejects.toThrow("DB failure");
    });
  });

  describe("deleteByRecipeId", () => {
    it("should delete steps and return result when deletion occurs", async () => {
      const mockRow = { deleted: true };
      mockedQuery.mockResolvedValue({ rows: [mockRow] });

      const result = await StepRepo.deleteByRecipeId("recipe-1");

      expect(mockedQuery).toHaveBeenCalledWith(
        expect.stringContaining("DELETE"),
        ["recipe-1"]
      );
      expect(result).toEqual(mockRow);
    });

    it("should return null if no steps were deleted", async () => {
      mockedQuery.mockResolvedValue({ rows: [] });

      const result = await StepRepo.deleteByRecipeId("recipe-1");

      expect(result).toBeNull();
    });

    it("should throw an error if the database query fails", async () => {
      mockedQuery.mockRejectedValue(new Error("DB failure"));

      await expect(StepRepo.deleteByRecipeId("recipe-1")).rejects.toThrow("DB failure");
    });
  });
});
