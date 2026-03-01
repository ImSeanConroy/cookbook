import * as z from "zod";

export const ingredientSchema = z.object({
  name: z.string().trim().min(1, "Ingredient name is required"),
  quantity: z.number().positive("Quantity must be greater than 0"),
  unit: z.string().trim().min(1, "Unit is required"),
});

export const recipeFormSchema = z.object({
  title: z.string().trim().min(3, "Title must be at least 3 characters"),
  subtitle: z.string().trim().min(3, "Subtitle is required"),
  description: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters"),

  cook_time: z.number().min(1, "Cook time required"),
  servings: z.number().min(1, "Servings required"),

  difficulty: z.enum(["beginner", "intermediate", "advanced"], {
    message: "Difficulty is required",
  }),
  mealTypes: z
    .array(z.string().trim().min(1))
    .min(1, "At least one meal type is required"),
  dietaryPreferences: z
    .array(z.string().trim().min(1))
    .min(1, "At least one dietary preference is required"),

  cuisine: z.string().trim().min(2, "Cuisine is required"),

  image_url: z
    .string()
    .trim()
    .min(1, "Image URL is required")
    .url("Must be a valid URL"),

  calories: z.number().min(1, "Calories required"),
  protein: z.number().min(0, "Protein required"),
  carbs: z.number().min(0, "Carbs required"),
  fat: z.number().min(0, "Fat required"),
  fiber: z.number().min(0, "Fiber required"),
  sugars: z.number().min(0, "Sugars required"),
  saturated_fat: z.number().min(0, "Saturated fat required"),
  sodium: z.number().min(0, "Sodium required"),

  ingredients: z
    .array(ingredientSchema)
    .min(1, "At least one ingredient is required"),

  steps: z
    .array(z.string().trim().min(5, "Each step must be at least 5 characters"))
    .min(1, "At least one step is required"),
});

export type RecipeFormValues = z.infer<typeof recipeFormSchema>;

export type NutritionFieldName =
  | "calories"
  | "protein"
  | "carbs"
  | "fat"
  | "fiber"
  | "sugars"
  | "saturated_fat"
  | "sodium";
