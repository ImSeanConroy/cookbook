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

export const createRecipeService = async (
  body: RecipeInput
): Promise<Recipe> => {
  const { ingredients, steps, ...recipeData } = body;

  const newRecipe = await RecipeRepo.create(recipeData);
  if (!newRecipe) {
    throw new BadRequestException("Failed to create recipe");
  }

  const newIngredients = await Promise.all(
    ingredients.map(async (ingredient: Ingredient) => {
      const newIngredient = await IngredientRepo.create(
        newRecipe.id,
        ingredient
      );
      if (!newIngredient) {
        throw new BadRequestException("Failed to create recipe ingredient");
      }
      return newIngredient;
    })
  );

  const stepsWithNumbers: Step[] = steps.map((instruction, index) => ({
    step_number: index + 1,
    instruction,
  }));

  const newSteps = await Promise.all(
    stepsWithNumbers.map(async (step) => {
      const newStep = await StepRepo.create(newRecipe.id, step);
      if (!newStep) {
        throw new BadRequestException("Failed to create recipe step");
      }
      return newStep;
    })
  );

  return {
    ...newRecipe,
    ingredients: newIngredients,
    steps: newSteps.map((step) => step.instruction),
  };
};

export const getRecipeByIdService = async (
  recipeId: string
): Promise<Recipe> => {
  const recipe = await RecipeRepo.findById(recipeId);
  if (!recipe) {
    throw new NotFoundException("Recipe not found");
  }

  const ingredients = await IngredientRepo.findByRecipeId(recipeId);
  if (!ingredients) {
    throw new NotFoundException("Ingredients not found");
  }

  const steps = await StepRepo.findByRecipeId(recipeId);
  if (!steps) {
    throw new NotFoundException("Steps not found");
  }

  return {
    ...recipe,
    ingredients,
    steps: steps.map((step) => step.instruction),
  };
};

export const getAllRecipesService = async (page = 1, limit = 12) => {
  const offset = (page - 1) * limit;

  const [recipes, totalItems] = await Promise.all([
    RecipeRepo.getAll({ offset, limit }),
    RecipeRepo.getCount(),
  ]);

  return {
    data: recipes,
    currentPage: page,
    totalPages: Math.ceil(totalItems / limit),
    totalItems,
  };
};

export const updateRecipeService = async (
  recipeId: string,
  body: Partial<RecipeInput>
): Promise<Recipe> => {
  const existingRecipe = await RecipeRepo.findById(recipeId);
  if (!existingRecipe) {
    throw new NotFoundException("Recipe not found");
  }

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
  if (!updatedRecipe) {
    throw new BadRequestException("Update failed");
  }

  let updatedIngredients: Ingredient[] = [];
  if (body.ingredients) {
    await IngredientRepo.deleteByRecipeId(recipeId);

    updatedIngredients = await Promise.all(
      body.ingredients.map(async (ingredient: Ingredient) => {
        const newIngredient = await IngredientRepo.create(recipeId, ingredient);
        if (!newIngredient) {
          throw new BadRequestException("Failed to update recipe ingredient");
        }
        return newIngredient;
      })
    );
  } else {
    updatedIngredients = await IngredientRepo.findByRecipeId(recipeId);
  }

  let updatedSteps: Step[] = [];
  if (body.steps) {
    await StepRepo.deleteByRecipeId(recipeId);

    const stepsWithNumbers: Step[] = body.steps.map((instruction, index) => ({
      step_number: index + 1,
      instruction,
    }));

    updatedSteps = await Promise.all(
      stepsWithNumbers.map(async (step) => {
        const newStep = await StepRepo.create(recipeId, step);
        if (!newStep) {
          throw new BadRequestException("Failed to create recipe step");
        }
        return newStep;
      })
    );
  } else {
    updatedSteps = await StepRepo.findByRecipeId(recipeId);
  }

  return {
    ...updatedRecipe,
    ingredients: updatedIngredients,
    steps: updatedSteps.map((step) => step.instruction),
  };
};

export const deleteRecipeService = async (recipeId: string): Promise<void> => {
  const deleted = await RecipeRepo.deleteById(recipeId);
  if (!deleted) {
    throw new NotFoundException("Recipe not found or already deleted");
  }
};
