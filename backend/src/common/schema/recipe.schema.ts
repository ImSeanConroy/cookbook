import { optional, z } from "zod";

// --------------------
// Enums / constants
// --------------------
const cuisinesEnum = [
  "American",
  "African",
  "Asian",
  "British",
  "Caribbean",
  "European",
  "French",
  "Italian",
  "Latin American",
  "Middle Eastern",
] as const;

const difficultiesEnum = ["beginner", "intermediate", "advanced"] as const;

const mealTypesEnum = [
  "breakfast",
  "brunch",
  "lunch",
  "dinner",
  "snack",
  "dessert",
  "appetizer",
] as const;

const dietaryPreferencesEnum = [
  "vegetarian",
  "vegan",
  "gluten-free",
  "keto",
  "pescatarian",
  "paleo",
  "low-carb",
  "dairy-free",
] as const;

// --------------------
// Field Schemas
// --------------------
export const recipeIdSchema = z.string().trim().min(1);
export const titleSchema = z.string().trim().min(1).max(100);
export const subtitleSchema = z.string().trim().min(1).max(150);
export const descriptionSchema = z.string().trim().min(1);
export const imageUrlSchema = z.string().url();

export const cookTimeSchema = z.number().int().nonnegative();
export const servingsSchema = z.number().int().positive();

export const difficultySchema = z.enum(difficultiesEnum);
export const cuisineSchema = z.enum(cuisinesEnum);
export const mealTypeSchema = z.array(z.enum(mealTypesEnum));
export const dietaryPreferenceSchema = z.array(z.enum(dietaryPreferencesEnum));

export const stepsSchema = z.array(z.string().trim().min(1));
export const ingredientsSchema = z.array(
  z.object({
    name: z.string().trim().min(1),
    quantity: z.number(),
    unit: z.string().trim().min(1),
    optional: z.boolean().default(false).optional(),
  }),
);

// --------------------
// Create / Update Recipe Schemas
// --------------------
export const createRecipeSchema = z.object({
  title: titleSchema,
  subtitle: subtitleSchema,
  description: descriptionSchema,
  meta: z.object({
    cookTime: cookTimeSchema,
    servings: servingsSchema,
    difficulty: difficultySchema,
    mealTypes: mealTypeSchema,
    dietaryPreferences: dietaryPreferenceSchema,
    cuisine: cuisineSchema,
  }),
  nutrition: z.object({
    calories: z.number().int().positive().nullable(),
    protein: z.number().nonnegative().nullable(),
    carbs: z.number().nonnegative().nullable(),
    fat: z.number().nonnegative().nullable(),
    sugars: z.number().nonnegative().nullable(),
    fiber: z.number().nonnegative().nullable(),
    saturatedFat: z.number().nonnegative().nullable(),
    sodium: z.number().int().nonnegative().nullable(),
  }),
  media: z.object({
    imageUrl: imageUrlSchema,
  }),
  ingredients: ingredientsSchema,
  steps: stepsSchema,
});

export const updateRecipeSchema = createRecipeSchema.partial();

// --------------------
// Query / Filter Schema for getAllRecipes
// --------------------
export const getAllRecipesQuerySchema = z.object({
  page: z.string().regex(/^\d+$/).transform(Number).default("1"),
  limit: z.string().regex(/^\d+$/).transform(Number).default("12"),
  query: z.string().optional(),
  difficulty: z
    .string()
    .optional()
    .transform((val) => (val ? val.split(",") : undefined)),
  cuisine: z
    .string()
    .optional()
    .transform((val) => (val ? val.split(",") : undefined)),
  mealTypes: z
    .string()
    .optional()
    .transform((val) => (val ? val.split(",") : undefined)),
  dietaryPreferences: z
    .string()
    .optional()
    .transform((val) => (val ? val.split(",") : undefined)),
  cookTime: z
    .string()
    .optional()
    .transform((val) => (val ? val.split(",") : undefined)),
  sortBy: z.string().optional().default("newest"),
});
