import { Request, Response } from "express";
import { asyncHandler } from "../middleware/async-handler.middleware";
import {
  createRecipeSchema,
  recipeIdSchema,
  updateRecipeSchema,
} from "../common/schema/recipe.schema";
import {
  createRecipeService,
  deleteRecipeService,
  getAllRecipesService,
  getRecipeByIdService,
  updateRecipeService,
} from "../services/recipe.service";
import { HTTPSTATUS } from "../common/config/http.config";

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

export const updateRecipeController = asyncHandler(
  async (req: Request, res: Response) => {
    const body = updateRecipeSchema.parse(req.body);
    const recipeId = recipeIdSchema.parse(req.params.id);

    const updatedRecipe = await updateRecipeService(recipeId, body);

    return res.status(HTTPSTATUS.OK).json({
      message: "Recipe updated successfully",
      recipe: updatedRecipe,
    });
  }
);

export const getAllRecipesController = asyncHandler(
  async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 12;
    const query = req.query.query as string | undefined;

    const result = await getAllRecipesService(page, limit, query);

    return res.status(HTTPSTATUS.OK).json({
      message: "All recipes fetched successfully",
      recipes: result.data,
      recipeCount: result.totalItems,
      currentPage: result.currentPage,
      totalPages: result.totalPages
    });
  }
);

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

export const deleteRecipeController = asyncHandler(
  async (req: Request, res: Response) => {
    const recipeId = recipeIdSchema.parse(req.params.id);

    await deleteRecipeService(recipeId);

    return res.status(HTTPSTATUS.OK).json({
      message: "Recipe deleted successfully",
    });
  }
);