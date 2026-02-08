import { z } from "zod";

// --------------------
// Enums / constants
// --------------------
export const difficulties = ["beginner", "intermediate", "advanced"] as const;

// --------------------
// Field Schemas
// --------------------
export const recipeIdSchema = z.string().trim().min(1);
export const titleSchema = z.string().trim().min(1).max(100);
export const subtitleSchema = z.string().trim().min(1).max(150);
export const descriptionSchema = z.string().trim().min(1);
export const prepTimeSchema = z.number().int().nonnegative();
export const cookTimeSchema = z.number().int().nonnegative();
export const servingsSchema = z.number().int().positive();
export const difficultySchema = z.enum(difficulties);
export const cuisineSchema = z.string().trim().min(1);
export const imageUrlSchema = z.string().url();

export const ingredientsSchema = z.array(
  z.object({
    name: z.string().trim().min(1),
    quantity: z.string().trim().min(1),
  })
);

export const stepsSchema = z.array(z.string().trim().min(1));

// --------------------
// Create / Update Recipe Schemas
// --------------------
export const createRecipeSchema = z.object({
  title: titleSchema,
  subtitle: subtitleSchema,
  description: descriptionSchema,
  prep_time: prepTimeSchema,
  cook_time: cookTimeSchema,
  servings: servingsSchema,
  difficulty: difficultySchema,
  cuisine: cuisineSchema,
  image_url: imageUrlSchema,
  card_image_url: imageUrlSchema,
  calories: z.number().int().positive().nullable(),
  protein: z.number().nonnegative().nullable(),
  carbs: z.number().nonnegative().nullable(),
  fat: z.number().nonnegative().nullable(),
  sugars: z.number().nonnegative().nullable(),
  fiber: z.number().nonnegative().nullable(),
  saturated_fat: z.number().nonnegative().nullable(),
  sodium: z.number().int().nonnegative().nullable(),
  ingredients: ingredientsSchema,
  steps: stepsSchema,
  utensils: stepsSchema,
});

export const updateRecipeSchema = createRecipeSchema.partial();

// --------------------
// Query / Filter Schema for getAllRecipes
// --------------------
export const getAllRecipesQuerySchema = z.object({
  page: z.string().regex(/^\d+$/).transform(Number).default("1"),
  limit: z.string().regex(/^\d+$/).transform(Number).default("12"),
});
