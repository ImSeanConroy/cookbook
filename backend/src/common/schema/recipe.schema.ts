
import { z } from "zod";

export const recipeIdSchema = z.string().trim().min(1);
export const titleSchema = z.string().trim().min(1).max(100);
export const descriptionSchema = z.string().trim().min(1);
export const prepTimeSchema = z.number().int().nonnegative();
export const cookTimeSchema = z.number().int().nonnegative();
export const servingsSchema = z.number().int().positive();
export const difficultySchema = z.enum(["beginner", "intermediate", "advanced"]);
export const cuisineSchema = z.string().trim().min(1);
export const imageUrlSchema = z.string().url();

export const createRecipeSchema = z.object({
  title: titleSchema,
  description: descriptionSchema,
  prep_time: prepTimeSchema,
  cook_time: cookTimeSchema,
  servings: servingsSchema,
  difficulty: difficultySchema,
  cuisine: cuisineSchema,
  image_url: imageUrlSchema,
});

export const updateRecipeSchema = createRecipeSchema.partial();