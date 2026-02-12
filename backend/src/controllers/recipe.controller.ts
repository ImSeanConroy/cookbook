import { Request, Response } from "express";
import { asyncHandler } from "../middleware/async-handler.middleware";
import {
  createRecipeSchema,
  recipeIdSchema,
  updateRecipeSchema,
  getAllRecipesQuerySchema,
} from "../common/schema/recipe.schema";
import {
  createRecipeService,
  deleteRecipeService,
  getAllRecipesService,
  getRecipeByIdService,
  updateRecipeService,
} from "../services/recipe.service";
import { HTTPSTATUS } from "../common/config/http.config";

/**
 * Controller to create a new recipe.
 */
export const createRecipeController = asyncHandler(
  async (req: Request, res: Response) => {
    const body = createRecipeSchema.parse(req.body);

    const recipe = await createRecipeService(body);

    return res.status(HTTPSTATUS.OK).json({
      message: "Recipe created successfully",
      recipe,
    });
  }
);

/**
 * Controller to update an existing recipe by ID.
 */
export const updateRecipeController = asyncHandler(
  async (req: Request, res: Response) => {
    const recipeId = recipeIdSchema.parse(req.params.id);
    const body = updateRecipeSchema.parse(req.body);

    const updatedRecipe = await updateRecipeService(recipeId, body);

    return res.status(HTTPSTATUS.OK).json({
      message: "Recipe updated successfully",
      recipe: updatedRecipe,
    });
  },
);

/**
 * Controller to fetch all recipes with optional filters, pagination, and sorting.
 */
export const getAllRecipesController = asyncHandler(
  async (req: Request, res: Response) => {
    const {
      page,
      limit,
      query,
      difficulty,
      cuisine,
      mealTypes,
      dietaryPreferences,
      totalTime,
      sortBy,
    } = getAllRecipesQuerySchema.parse(req.query);

    const filters = {
      difficulty,
      cuisine,
      mealTypes,
      dietaryPreferences,
      totalTime,
      sortBy,
    };

    const result = await getAllRecipesService(page, limit, query, filters);

    return res.status(HTTPSTATUS.OK).json({
      message: "All recipes fetched successfully",
      recipes: result.data,
      recipeCount: result.totalItems,
      currentPage: result.currentPage,
      totalPages: result.totalPages,
    });
  }
);

/**
 * Controller to fetch a single recipe by ID.
 */
export const getRecipeByIdController = asyncHandler(
  async (req: Request, res: Response) => {
    const recipeId = recipeIdSchema.parse(req.params.id);

    const recipe = await getRecipeByIdService(recipeId);

    return res.status(HTTPSTATUS.OK).json({
      message: "Recipe fetched successfully",
      recipe,
    });
  }
);

/**
 * Controller to delete a recipe by ID.
 */
export const deleteRecipeController = asyncHandler(
  async (req: Request, res: Response) => {
    const recipeId = recipeIdSchema.parse(req.params.id);

    await deleteRecipeService(recipeId);

    return res.status(HTTPSTATUS.OK).json({
      message: "Recipe deleted successfully",
    });
  }
);
