import {
  Ingredient,
  Recipe,
  RecipeInput,
  Step,
} from "../common/interface/recipe.interface";
import { BadRequestException, NotFoundException } from "../utils/app-error";
import * as RecipeRepo from "../repositories/recipe.repository";
import * as IngredientRepo from "../repositories/ingredient.repository";
import * as StepRepo from "../repositories/step.repository";

/**
 * Creates a new recipe along with its ingredients and steps.
 *
 * @param body - Recipe input data
 * @returns The newly created recipe including ingredients and steps
 * @throws BadRequestException if creation fails
 */
export const createRecipeService = async (body: RecipeInput): Promise<Recipe> => {
  const { ingredients, steps, ...recipeData } = body;

  const newRecipe = await RecipeRepo.create(recipeData);
  if (!newRecipe) throw new BadRequestException("Failed to create recipe");

  const newIngredients = await Promise.all(
    ingredients.map(async (ingredient: Ingredient) => {
      const created = await IngredientRepo.create(newRecipe.id, ingredient);
      if (!created) throw new BadRequestException("Failed to create recipe ingredient");
      return created;
    })
  );

  const stepsWithNumbers: Step[] = steps.map((instruction, index) => ({
    step_number: index + 1,
    instruction,
  }));

  const newSteps = await Promise.all(
    stepsWithNumbers.map(async (step) => {
      const created = await StepRepo.create(newRecipe.id, step);
      if (!created) throw new BadRequestException("Failed to create recipe step");
      return created;
    })
  );

  return {
    ...newRecipe,
    ingredients: newIngredients,
    steps: newSteps.map((s) => s.instruction),
  };
};

/**
 * Retrieves a recipe by its ID including ingredients and steps.
 *
 * @param recipeId - Recipe ID
 * @returns The recipe with ingredients and steps
 * @throws NotFoundException if the recipe or related data is not found
 */
export const getRecipeByIdService = async (recipeId: string): Promise<Recipe> => {
  const recipe = await RecipeRepo.findById(recipeId);
  if (!recipe) throw new NotFoundException("Recipe not found");

  const ingredients = await IngredientRepo.findByRecipeId(recipeId);
  const steps = await StepRepo.findByRecipeId(recipeId);

  if (!ingredients || !steps)
    throw new NotFoundException("Ingredients or steps not found");

  return {
    ...recipe,
    ingredients,
    steps: steps.map((s) => s.instruction),
  };
};

/**
 * Retrieves all recipes with optional filters, sorting, and pagination.
 *
 * @param page - Page number (default 1)
 * @param limit - Number of results per page (default 12)
 * @param query - Optional search text
 * @param filters - Optional filters: difficulty, cuisine, cookTime, sortBy
 * @returns Paginated recipes with metadata
 */
export const getAllRecipesService = async (
  page = 1,
  limit = 12,
  query?: string,
  filters?: { difficulty?: string; cuisine?: string; cookTime?: string; sortBy?: string }
) => {
  const offset = (page - 1) * limit;

  const [recipes, totalItems] = await Promise.all([
    RecipeRepo.getAll({
      offset,
      limit,
      queryText: query,
      difficulty: filters?.difficulty,
      cuisine: filters?.cuisine,
      cookTime: filters?.cookTime,
      sortBy: filters?.sortBy,
    }),
    RecipeRepo.getCount({
      queryText: query,
      difficulty: filters?.difficulty,
      cuisine: filters?.cuisine,
      cookTime: filters?.cookTime,
    }),
  ]);

  return {
    data: recipes,
    currentPage: page,
    totalPages: Math.ceil(totalItems / limit),
    totalItems,
  };
};

/**
 * Updates a recipe by its ID, including ingredients and steps if provided.
 *
 * @param recipeId - Recipe ID
 * @param body - Partial recipe data to update
 * @returns The updated recipe including ingredients and steps
 * @throws NotFoundException if the recipe does not exist
 * @throws BadRequestException if update fails
 */
export const updateRecipeService = async (
  recipeId: string,
  body: Partial<RecipeInput>
): Promise<Recipe> => {
  const existingRecipe = await RecipeRepo.findById(recipeId);
  if (!existingRecipe) throw new NotFoundException("Recipe not found");

  const { created_at, updated_at, ...safeExistingRecipe } = existingRecipe;

  const mergedRecipe = {
    id: recipeId,
    title: body.title || safeExistingRecipe.title,
    subtitle: body.subtitle || safeExistingRecipe.subtitle,
    description: body.description || safeExistingRecipe.description,
    prep_time: body.prep_time || safeExistingRecipe.prep_time,
    cook_time: body.cook_time || safeExistingRecipe.cook_time,
    servings: body.servings || safeExistingRecipe.servings,
    difficulty: body.difficulty || safeExistingRecipe.difficulty,
    cuisine: body.cuisine || safeExistingRecipe.cuisine,
    image_url: body.image_url || safeExistingRecipe.image_url,
    card_image_url: body.card_image_url || safeExistingRecipe.card_image_url,
  };

  const updatedRecipe = await RecipeRepo.update(mergedRecipe);
  if (!updatedRecipe) throw new BadRequestException("Update failed");

  // Update ingredients
  let updatedIngredients: Ingredient[] = [];
  if (body.ingredients) {
    await IngredientRepo.deleteByRecipeId(recipeId);
    updatedIngredients = await Promise.all(
      body.ingredients.map(async (ingredient) => {
        const created = await IngredientRepo.create(recipeId, ingredient);
        if (!created) throw new BadRequestException("Failed to update recipe ingredient");
        return created;
      })
    );
  } else {
    updatedIngredients = await IngredientRepo.findByRecipeId(recipeId);
  }

  // Update steps
  let updatedSteps: Step[] = [];
  if (body.steps) {
    await StepRepo.deleteByRecipeId(recipeId);
    const stepsWithNumbers: Step[] = body.steps.map((instruction, index) => ({
      step_number: index + 1,
      instruction,
    }));
    updatedSteps = await Promise.all(
      stepsWithNumbers.map(async (step) => {
        const created = await StepRepo.create(recipeId, step);
        if (!created) throw new BadRequestException("Failed to create recipe step");
        return created;
      })
    );
  } else {
    updatedSteps = await StepRepo.findByRecipeId(recipeId);
  }

  return {
    ...updatedRecipe,
    ingredients: updatedIngredients,
    steps: updatedSteps.map((s) => s.instruction),
  };
};

/**
 * Deletes a recipe by its ID.
 *
 * @param recipeId - Recipe ID
 * @throws NotFoundException if the recipe does not exist
 */
export const deleteRecipeService = async (recipeId: string): Promise<void> => {
  const deleted = await RecipeRepo.deleteById(recipeId);
  if (!deleted) throw new NotFoundException("Recipe not found or already deleted");
};
