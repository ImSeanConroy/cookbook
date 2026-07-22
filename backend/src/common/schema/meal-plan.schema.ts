import { z } from "zod";
import {
  cuisinesEnum,
  difficultiesEnum,
  mealTypesEnum,
} from "./recipe.schema";

/**
 * @openapi
 * components:
 *   schemas:
 *     MealPlanGenerateInput:
 *       type: object
 *       properties:
 *         cuisine:
 *           type: array
 *           items:
 *             type: string
 *             enum: [American, African, Asian, British, Caribbean, European, French, Italian, Latin American, Middle Eastern]
 *           default: []
 *         difficulty:
 *           type: array
 *           items:
 *             type: string
 *             enum: [beginner, intermediate, advanced]
 *           default: []
 *         cookTime:
 *           type: array
 *           items:
 *             type: string
 *             enum: [UNDER_15, BETWEEN_15_AND_30, BETWEEN_30_AND_60, OVER_60]
 *           default: []
 *         portionPreset:
 *           type: string
 *           enum: [2x2, 3x2, 4x2, 4x3]
 *           default: 2x2
 *     MealPlanRecipe:
 *       type: object
 *       required:
 *         - id
 *         - title
 *         - subtitle
 *         - portions
 *         - cookTime
 *         - difficulty
 *         - cuisine
 *         - calories
 *         - imageUrl
 *         - createdAt
 *       properties:
 *         id:
 *           type: string
 *         title:
 *           type: string
 *         subtitle:
 *           type: string
 *         portions:
 *           type: integer
 *         cookTime:
 *           type: integer
 *         difficulty:
 *           type: string
 *           enum: [beginner, intermediate, advanced]
 *         cuisine:
 *           type: string
 *         calories:
 *           type: integer
 *           nullable: true
 *         imageUrl:
 *           type: string
 *           format: uri
 *         createdAt:
 *           type: string
 *           format: date-time
 *     WeeklyMeal:
 *       type: object
 *       required:
 *         - portions
 *         - recipe
 *       properties:
 *         portions:
 *           type: integer
 *         recipe:
 *           $ref: '#/components/schemas/MealPlanRecipe'
 *     WeeklyMealPlanMeta:
 *       type: object
 *       required:
 *         - portionPreset
 *         - totalMeals
 *         - totalPortions
 *         - generatedAt
 *       properties:
 *         portionPreset:
 *           type: string
 *           enum: [2x2, 3x2, 4x2, 4x3]
 *         totalMeals:
 *           type: integer
 *         totalPortions:
 *           type: integer
 *         generatedAt:
 *           type: string
 *           format: date-time
 *     WeeklyMealPlan:
 *       type: object
 *       required:
 *         - meals
 *         - metadata
 *       properties:
 *         meals:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/WeeklyMeal'
 *         metadata:
 *           $ref: '#/components/schemas/WeeklyMealPlanMeta'
 *     MealPlanGenerateResponse:
 *       type: object
 *       required:
 *         - message
 *         - mealPlan
 *       properties:
 *         message:
 *           type: string
 *         mealPlan:
 *           $ref: '#/components/schemas/WeeklyMealPlan'
 */

const cookTimeEnum = [
  "UNDER_15",
  "BETWEEN_15_AND_30",
  "BETWEEN_30_AND_60",
  "OVER_60",
] as const;

export const generateMealPlanSchema = z.object({
  mealTypes: z.array(z.enum(mealTypesEnum)).default([]),
  cuisine: z.array(z.enum(cuisinesEnum)).default([]),
  difficulty: z.array(z.enum(difficultiesEnum)).default([]),
  cookTime: z.array(z.enum(cookTimeEnum)).default([]),
  portionPreset: z.enum(["2x2", "3x2", "4x2", "4x3"]).default("2x2"),
});
