import * as RecipeRepo from "../../src/repositories/recipe.repository";
import { vi, describe, it, expect, beforeEach } from "vitest";
import { query } from "../../src/common/config/database.config";

vi.mock("../../src/common/config/database.config", () => ({
  query: vi.fn(),
}));

vi.mock("../../src/utils/to-camel-case", () => ({
  toCamelCase: (rows: any[]) => rows,
}));

const mockedQuery = vi.mocked(query);

describe("Recipe Repository", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("create", () => {
    it("inserts recipe and returns it", async () => {
      const mockRow = {
        id: "1",
        title: "Pasta",
        description: "Yummy",
        prep_time: 10,
        cook_time: 15,
        servings: 2,
        difficulty: "beginner",
        cuisine: "Italian",
        image_url: "http://image.com",
      };
      mockedQuery.mockResolvedValue({ rows: [mockRow] });

      const result = await RecipeRepo.create({
        title: "Pasta",
        description: "Yummy",
        prep_time: 10,
        cook_time: 15,
        servings: 2,
        difficulty: "beginner",
        cuisine: "Italian",
        image_url: "http://image.com",
      });

      expect(mockedQuery).toHaveBeenCalledOnce();
      expect(result).toEqual(mockRow);
    });

    it("throws if DB query fails", async () => {
      mockedQuery.mockRejectedValue(new Error("DB failure"));

      await expect(
        RecipeRepo.create({
          title: "Pasta",
          description: "Yummy",
          prep_time: 10,
          cook_time: 15,
          servings: 2,
          difficulty: "beginner",
          cuisine: "Italian",
          image_url: "http://image.com",
        })
      ).rejects.toThrow("DB failure");
    });
  });

  describe("findById", () => {
    it("returns recipe if found", async () => {
      const mockRow = { id: "1", title: "Soup" };
      mockedQuery.mockResolvedValue({ rows: [mockRow] });

      const result = await RecipeRepo.findById("1");
      expect(result).toEqual(mockRow);
    });

    it("returns null if not found", async () => {
      mockedQuery.mockResolvedValue({ rows: [] });

      const result = await RecipeRepo.findById("99");
      expect(result).toBeNull();
    });

    it("throws if DB query fails", async () => {
      mockedQuery.mockRejectedValue(new Error("DB failure"));

      await expect(RecipeRepo.findById("1")).rejects.toThrow("DB failure");
    });
  });

  describe("getAll", () => {
    it("returns paginated recipes with offset and limit", async () => {
      const mockRows = [{ title: "A" }, { title: "B" }];
      mockedQuery.mockResolvedValue({ rows: mockRows });

      const result = await RecipeRepo.getAll({ offset: 0, limit: 2 });

      expect(mockedQuery).toHaveBeenCalledWith(
        "SELECT * FROM recipes ORDER BY created_at DESC LIMIT $1 OFFSET $2",
        [2, 0]
      );
      expect(result).toEqual(mockRows);
    });

    it("uses default pagination params if none passed", async () => {
      const mockRows = [{ title: "X" }];
      mockedQuery.mockResolvedValue({ rows: mockRows });
      
      const result = await RecipeRepo.getAll({});

      expect(mockedQuery).toHaveBeenCalledWith(
        "SELECT * FROM recipes ORDER BY created_at DESC LIMIT $1 OFFSET $2",
        [10, 0]
      );
      expect(result).toEqual(mockRows);
    });

    it("throws if DB query fails", async () => {
      mockedQuery.mockRejectedValue(new Error("DB failure"));

      await expect(RecipeRepo.getAll({ offset: 0, limit: 10 })).rejects.toThrow(
        "DB failure"
      );
    });
  });

  describe("getCount", () => {
    it("returns total number of recipes", async () => {
      mockedQuery.mockResolvedValue({ rows: [{ count: "42" }] });

      const result = await RecipeRepo.getCount();

      expect(mockedQuery).toHaveBeenCalledWith("SELECT COUNT(*) FROM recipes");
      expect(result).toBe(42);
    });

    it("throws if DB query fails", async () => {
      mockedQuery.mockRejectedValue(new Error("DB failure"));

      await expect(RecipeRepo.getCount()).rejects.toThrow("DB failure");
    });
  });

  describe("update", () => {
    it("updates and returns recipe", async () => {
      const updated = { id: "1", title: "Updated" };
      mockedQuery.mockResolvedValue({ rows: [updated] });

      const result = await RecipeRepo.update({ id: "1", title: "Updated" });

      expect(result).toEqual(updated);
    });

    it("returns null if update fails", async () => {
      mockedQuery.mockResolvedValue({ rows: [] });

      const result = await RecipeRepo.update({ id: "1", title: "Nothing" });

      expect(result).toBeNull();
    });

    it("throws if DB query fails", async () => {
      mockedQuery.mockRejectedValue(new Error("DB failure"));

      await expect(
        RecipeRepo.update({ id: "1", title: "Updated" })
      ).rejects.toThrow("DB failure");
    });
  });

  describe("deleteById", () => {
    it("deletes and returns recipe", async () => {
      const deleted = { id: "1", title: "Deleted" };
      mockedQuery.mockResolvedValue({ rows: [deleted] });

      const result = await RecipeRepo.deleteById("1");
      expect(result).toEqual(deleted);
    });

    it("returns null if not found", async () => {
      mockedQuery.mockResolvedValue({ rows: [] });

      const result = await RecipeRepo.deleteById("999");
      expect(result).toBeNull();
    });

    it("throws if DB query fails", async () => {
      mockedQuery.mockRejectedValue(new Error("DB failure"));

      await expect(RecipeRepo.deleteById("1")).rejects.toThrow("DB failure");
    });
  });
});
