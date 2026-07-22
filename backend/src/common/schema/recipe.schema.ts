import { z } from "zod";

/**
 * @openapi
 * components:
 *   schemas:
 *     StatusResponse:
 *       type: object
 *       required:
 *         - status
 *       properties:
 *         status:
 *           type: string
 *           example: ok
 *     Ingredient:
 *       type: object
 *       required:
 *         - name
 *         - quantity
 *         - unit
 *       properties:
 *         name:
 *           type: string
 *         quantity:
 *           type: number
 *         unit:
 *           type: string
 *         optional:
 *           type: boolean
 *           default: false
 *     RecipeMeta:
 *       type: object
 *       required:
 *         - cookTime
 *         - servings
 *         - difficulty
 *         - mealTypes
 *         - dietaryPreferences
 *         - cuisine
 *       properties:
 *         cookTime:
 *           type: integer
 *           minimum: 0
 *         servings:
 *           type: integer
 *           minimum: 1
 *         difficulty:
 *           type: string
 *           enum: [beginner, intermediate, advanced]
 *         mealTypes:
 *           type: array
 *           items:
 *             type: string
 *             enum: [breakfast, brunch, lunch, dinner, snack, dessert, appetizer]
 *         dietaryPreferences:
 *           type: array
 *           items:
 *             type: string
 *             enum: [vegetarian, vegan, gluten-free, keto, pescatarian, paleo, low-carb, dairy-free]
 *         cuisine:
 *           type: string
 *           enum: [American, African, Asian, British, Caribbean, European, French, Italian, Latin American, Middle Eastern]
 *     RecipeNutrition:
 *       type: object
 *       required:
 *         - calories
 *         - protein
 *         - carbs
 *         - fat
 *         - sugars
 *         - fiber
 *         - saturatedFat
 *         - sodium
 *       properties:
 *         calories:
 *           type: integer
 *           nullable: true
 *         protein:
 *           type: number
 *           nullable: true
 *         carbs:
 *           type: number
 *           nullable: true
 *         fat:
 *           type: number
 *           nullable: true
 *         sugars:
 *           type: number
 *           nullable: true
 *         fiber:
 *           type: number
 *           nullable: true
 *         saturatedFat:
 *           type: number
 *           nullable: true
 *         sodium:
 *           type: integer
 *           nullable: true
 *     RecipeMedia:
 *       type: object
 *       required:
 *         - imageUrl
 *       properties:
 *         imageUrl:
 *           type: string
 *           format: uri
 *     RecipeInput:
 *       type: object
 *       required:
 *         - title
 *         - subtitle
 *         - description
 *         - meta
 *         - nutrition
 *         - media
 *         - ingredients
 *         - steps
 *       properties:
 *         title:
 *           type: string
 *         subtitle:
 *           type: string
 *         description:
 *           type: string
 *         meta:
 *           $ref: '#/components/schemas/RecipeMeta'
 *         nutrition:
 *           $ref: '#/components/schemas/RecipeNutrition'
 *         media:
 *           $ref: '#/components/schemas/RecipeMedia'
 *         ingredients:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Ingredient'
 *         steps:
 *           type: array
 *           items:
 *             type: string
 *     UpdateRecipe:
 *       allOf:
 *         - $ref: '#/components/schemas/RecipeInput'
 *     RecipeResponse:
 *       allOf:
 *         - $ref: '#/components/schemas/RecipeInput'
 *         - type: object
 *           required:
 *             - id
 *             - timestamps
 *           properties:
 *             id:
 *               type: string
 *             timestamps:
 *               type: object
 *               required:
 *                 - createdAt
 *                 - updatedAt
 *               properties:
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *     RecipeMutationResponse:
 *       type: object
 *       required:
 *         - message
 *         - recipe
 *       properties:
 *         message:
 *           type: string
 *         recipe:
 *           $ref: '#/components/schemas/RecipeResponse'
 *     RecipeListMeta:
 *       type: object
 *       required:
 *         - totalItems
 *         - currentPage
 *         - totalPages
 *         - pageSize
 *       properties:
 *         totalItems:
 *           type: integer
 *         currentPage:
 *           type: integer
 *         totalPages:
 *           type: integer
 *         pageSize:
 *           type: integer
 *     RecipeFilters:
 *       type: object
 *       properties:
 *         difficulty:
 *           type: array
 *           items:
 *             type: string
 *         cuisine:
 *           type: array
 *           items:
 *             type: string
 *         mealTypes:
 *           type: array
 *           items:
 *             type: string
 *         dietaryPreferences:
 *           type: array
 *           items:
 *             type: string
 *         cookTime:
 *           type: array
 *           items:
 *             type: string
 *         sortBy:
 *           type: string
 *     RecipeListResponse:
 *       type: object
 *       required:
 *         - message
 *         - recipes
 *         - meta
 *         - filters
 *       properties:
 *         message:
 *           type: string
 *         recipes:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/RecipeResponse'
 *         meta:
 *           $ref: '#/components/schemas/RecipeListMeta'
 *         filters:
 *           $ref: '#/components/schemas/RecipeFilters'
 *     DeleteResponse:
 *       type: object
 *       required:
 *         - message
 *       properties:
 *         message:
 *           type: string
 */

// --------------------
// Enums / constants
// --------------------
export const cuisinesEnum = [
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

export const difficultiesEnum = ["beginner", "intermediate", "advanced"] as const;

export const mealTypesEnum = [
  "breakfast",
  "brunch",
  "lunch",
  "dinner",
  "snack",
  "dessert",
  "appetizer",
] as const;

export const dietaryPreferencesEnum = [
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
export const includeInMealPlanSchema = z.boolean().optional();

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
    includeInMealPlan: includeInMealPlanSchema,
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
