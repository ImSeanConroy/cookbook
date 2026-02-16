import { RecipeEntity, RecipeInput } from "../common/interface/recipe.interface";

export const toRecipeEntity = (
  input: RecipeInput
): Omit<RecipeEntity, "id" | "createdAt" | "updatedAt"> => ({
  title: input.title,
  subtitle: input.subtitle,
  description: input.description,
  cookTime: input.meta.cookTime,
  servings: input.meta.servings,
  difficulty: input.meta.difficulty,
  mealTypes: input.meta.mealTypes,
  dietaryPreferences: input.meta.dietaryPreferences,
  cuisine: input.meta.cuisine,
  imageUrl: input.media.imageUrl,
  calories: input.nutrition.calories,
  protein: input.nutrition.protein,
  carbs: input.nutrition.carbs,
  fat: input.nutrition.fat,
  sugars: input.nutrition.sugars,
  fiber: input.nutrition.fiber,
  saturatedFat: input.nutrition.saturatedFat,
  sodium: input.nutrition.sodium,
});
