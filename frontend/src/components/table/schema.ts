import { z } from "zod";

export const recipeSchema = z.object({
  id: z.string(),
  title: z.string(),
  subtitle: z.string(),
  cuisine: z.string(),
  prepTime: z.number().int().min(0),
  cookTime: z.number().int().min(0),
  difficulty: z.enum(["beginner", "intermedate", "advanced"]),
  mealType: z.enum(["breakfast", "lunch", "dinner", "snack", "dessert"]),
  dietaryPreference: z
    .enum(["vegetarian", "vegan", "gluten-free", "keto"])
    .nullable()
    .optional(),
  imageUrl: z.string().optional(),
});

export type Recipe = z.infer<typeof recipeSchema>;
