import { Router } from "express";
import {
  createRecipeController,
  deleteRecipeController,
  getAllRecipesController,
  getRecipeByIdController,
  updateRecipeController,
} from "../controllers/recipe.controller";
import isReadOnly from "../middleware/read-only.middleware";

/**
 * Router for recipe-related endpoints.
 * Includes CRUD operations with optional READ_ONLY middleware for write operations.
 */
const recipeRoutes = Router();

/**
 * @route POST /recipes
 * @description Create a new recipe. Disabled if app is in READ_ONLY mode.
 * @middleware isReadOnly
 */
recipeRoutes.post("/", isReadOnly, createRecipeController);

/**
 * @route GET /recipes
 * @description Get all recipes with optional filters, pagination, and sorting
 */
recipeRoutes.get("/", getAllRecipesController);

/**
 * @route GET /recipes/:id
 * @description Get a single recipe by its ID
 */
recipeRoutes.get("/:id", getRecipeByIdController);

/**
 * @route PUT /recipes/:id
 * @description Update a recipe by its ID. Disabled if app is in READ_ONLY mode.
 * @middleware isReadOnly
 */
recipeRoutes.put("/:id", isReadOnly, updateRecipeController);

/**
 * @route DELETE /recipes/:id
 * @description Delete a recipe by its ID. Disabled if app is in READ_ONLY mode.
 * @middleware isReadOnly
 */
recipeRoutes.delete("/:id", isReadOnly, deleteRecipeController);

export default recipeRoutes;
