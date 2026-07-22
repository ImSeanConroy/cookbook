import { Router } from "express";
import { generateMealPlanController } from "../controllers/meal-plan.controller";

const mealPlanRoutes = Router();

/**
 * @openapi
 * /meal-plan/generate:
 *   post:
 *     summary: Generate a weekly meal plan
 *     tags:
 *       - Meal Plan
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MealPlanGenerateInput'
 *     responses:
 *       200:
 *         description: Meal plan generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MealPlanGenerateResponse'
 */
mealPlanRoutes.post("/generate", generateMealPlanController);

export default mealPlanRoutes;
