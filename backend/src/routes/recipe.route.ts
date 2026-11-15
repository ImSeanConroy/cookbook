import { Router } from "express";
import {
  createRecipeController,
  deleteRecipeController,
  getAllRecipesController,
  getRecipeByIdController,
  updateRecipeController,
} from "../controllers/recipe.controller";
import { requireAuth } from "../middleware/auth.middleware";

/**
 * Router for recipe-related endpoints.
 * Includes CRUD operations.
 */
const recipeRoutes = Router();

/**
 * @openapi
 * /recipe:
 *   post:
 *     summary: Create a new recipe
 *     tags:
 *       - Recipes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RecipeInput'
 *     responses:
 *       200:
 *         description: Recipe created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RecipeMutationResponse'
 */
recipeRoutes.post("/", requireAuth, createRecipeController);

/**
 * @openapi
 * /recipe:
 *   get:
 *     summary: Get all recipes
 *     tags:
 *       - Recipes
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 12
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *       - in: query
 *         name: difficulty
 *         schema:
 *           type: string
 *         description: Comma-separated list of difficulty values.
 *       - in: query
 *         name: cuisine
 *         schema:
 *           type: string
 *         description: Comma-separated list of cuisine values.
 *       - in: query
 *         name: mealTypes
 *         schema:
 *           type: string
 *         description: Comma-separated list of meal type values.
 *       - in: query
 *         name: dietaryPreferences
 *         schema:
 *           type: string
 *         description: Comma-separated list of dietary preference values.
 *       - in: query
 *         name: cookTime
 *         schema:
 *           type: string
 *         description: Comma-separated cook time filter buckets.
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           default: newest
 *     responses:
 *       200:
 *         description: Recipes fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RecipeListResponse'
 */
recipeRoutes.get("/", getAllRecipesController);

/**
 * @openapi
 * /recipe/{id}:
 *   get:
 *     summary: Get a recipe by ID
 *     tags:
 *       - Recipes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Recipe fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RecipeMutationResponse'
 */
recipeRoutes.get("/:id", getRecipeByIdController);

/**
 * @openapi
 * /recipe/{id}:
 *   put:
 *     summary: Update a recipe by ID
 *     tags:
 *       - Recipes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateRecipe'
 *     responses:
 *       200:
 *         description: Recipe updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RecipeMutationResponse'
 */
recipeRoutes.put("/:id", requireAuth, updateRecipeController);

/**
 * @openapi
 * /recipe/{id}:
 *   delete:
 *     summary: Delete a recipe by ID
 *     tags:
 *       - Recipes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Recipe deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeleteResponse'
 */
recipeRoutes.delete("/:id", requireAuth, deleteRecipeController);

export default recipeRoutes;
