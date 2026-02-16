import {
  RecipeEntity,
  RecipeResponse,
  Ingredient,
} from "../common/interface/recipe.interface";

type RecipeAggregate = RecipeEntity & {
  ingredients: Ingredient[];
  steps: string[];
};

export const toRecipeResponse = (
  recipe: RecipeAggregate
): RecipeResponse => ({
  id: recipe.id,
  title: recipe.title,
  subtitle: recipe.subtitle,
  description: recipe.description,
  meta: {
    cookTime: recipe.cookTime,
    servings: recipe.servings,
    difficulty: recipe.difficulty,
    cuisine: recipe.cuisine,
    mealTypes: recipe.mealTypes,
    dietaryPreferences: recipe.dietaryPreferences,
  },
  nutrition: {
    calories: recipe.calories,
    protein: recipe.protein,
    carbs: recipe.carbs,
    fat: recipe.fat,
    sugars: recipe.sugars,
    fiber: recipe.fiber,
    saturatedFat: recipe.saturatedFat,
    sodium: recipe.sodium,
  },
  media: {
    imageUrl: recipe.imageUrl,
  },
  ingredients: recipe.ingredients,
  steps: recipe.steps,
  timestamps: {
    createdAt: recipe.createdAt,
    updatedAt: recipe.updatedAt,
  },
});
