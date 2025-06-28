import { Recipe } from "../common/interface/recipe.interface";
import { BadRequestException, NotFoundException } from "../utils/appError";
import * as RecipeRepo from "../repositories/recipe.repository";

export const createRecipeService = async (
  body: Omit<Recipe, "id" | "created_at" | "updated_at">
): Promise<Recipe> => {
  return await RecipeRepo.create(body);
};

export const updateRecipeService = async (
  recipeId: string,
  body: Partial<Omit<Recipe, "id" | "created_at" | "updated_at">>
): Promise<Recipe> => {
  const existingRecipe = await RecipeRepo.findById(recipeId);
  if (!existingRecipe) {
    throw new NotFoundException("Recipe not found");
  }

  const {
    created_at,
    updated_at,
    ...safeExistingRecipe
  } = existingRecipe;

  const merged = {
    id: recipeId,
    title: body.title || safeExistingRecipe.title,
    description: body.description || safeExistingRecipe.description,
    prep_time: body.prep_time || safeExistingRecipe.prep_time,
    cook_time: body.cook_time || safeExistingRecipe.cook_time,
    servings: body.servings || safeExistingRecipe.servings,
    difficulty: body.difficulty || safeExistingRecipe.difficulty,
    cuisine: body.cuisine || safeExistingRecipe.cuisine,
    image_url: body.image_url || safeExistingRecipe.image_url,
  };

  const updated = await RecipeRepo.update(merged);
  if (!updated) {
    throw new BadRequestException("Update failed");
  }

  return updated;
};

export const getAllRecipesService = async () => {
  return await RecipeRepo.getAll();
};

export const getRecipeByIdService = async (
  recipeId: string
): Promise<Recipe> => {
  const recipe = await RecipeRepo.findById(recipeId);
  if (!recipe) {
    throw new NotFoundException("Recipe not found");
  }
  return recipe;
};

export const deleteRecipeService = async (recipeId: string): Promise<void> => {
  const deleted = await RecipeRepo.deleteById(recipeId);
  if (!deleted) {
    throw new NotFoundException("Recipe not found or already deleted");
  }
};
