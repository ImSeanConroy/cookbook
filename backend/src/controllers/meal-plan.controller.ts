import { Request, Response } from "express";
import { asyncHandler } from "../middleware/async-handler.middleware";
import { generateMealPlanSchema } from "../common/schema/meal-plan.schema";
import { generateMealPlanService } from "../services/meal-plan.service";
import { HTTPSTATUS } from "../common/config/http.config";

/**
 * Controller to generate a weekly meal plan.
 */
export const generateMealPlanController = asyncHandler(
  async (req: Request, res: Response) => {
    const body = generateMealPlanSchema.parse(req.body);

    const mealPlan = await generateMealPlanService(body);

    return res.status(HTTPSTATUS.OK).json({
      message: "Meal plan generated successfully",
      mealPlan,
    });
  },
);
