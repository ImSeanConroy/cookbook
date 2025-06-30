import express from "express";
import request from "supertest";
import { describe, it, expect, vi, beforeAll } from "vitest";

import router from "../../src/routes/recipe.route";

vi.mock("../../src/middleware/read-only.middleware", () => ({
  default: (req, res, next) => next(),
}));

vi.mock("../../src/controllers/recipe.controller", () => ({
  createRecipeController: vi.fn((req, res) => res.status(201).send("createRecipe")),
  deleteRecipeController: vi.fn((req, res) => res.send("deleteRecipe")),
  getAllRecipesController: vi.fn((req, res) => res.send("getAllRecipes")),
  getRecipeByIdController: vi.fn((req, res) => res.send("getRecipeById")),
  updateRecipeController: vi.fn((req, res) => res.send("updateRecipe")),
}));

describe("Recipe Routes", () => {
  let app;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    app.use("/recipes", router);
  });

  it("POST /recipes calls createRecipeController and middleware", async () => {
    const res = await request(app).post("/recipes").send({});

    expect(res.status).toBe(201);
    expect(res.text).toBe("createRecipe");
  });

  it("GET /recipes calls getAllRecipesController", async () => {
    const res = await request(app).get("/recipes");

    expect(res.status).toBe(200);
    expect(res.text).toBe("getAllRecipes");
  });

  it("GET /recipes/:id calls getRecipeByIdController", async () => {
    const res = await request(app).get("/recipes/123");

    expect(res.status).toBe(200);
    expect(res.text).toBe("getRecipeById");
  });

  it("PUT /recipes/:id calls updateRecipeController and middleware", async () => {
    const res = await request(app).put("/recipes/123").send({});

    expect(res.status).toBe(200);
    expect(res.text).toBe("updateRecipe");
  });

  it("DELETE /recipes/:id calls deleteRecipeController and middleware", async () => {
    const res = await request(app).delete("/recipes/123");

    expect(res.status).toBe(200);
    expect(res.text).toBe("deleteRecipe");
  });
});
