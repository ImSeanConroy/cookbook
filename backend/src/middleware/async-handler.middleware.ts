import { NextFunction, Request, Response } from "express";

/**
 * Type definition for an async Express controller function.
 */
export type AsyncControllerType = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>;

/**
 * Wraps an async Express controller to automatically catch errors
 * and forward them to the Express error-handling middleware.
 *
 * @param controller - An async controller function
 * @returns A new controller function with error handling
 *
 * @example
 * app.get("/recipes", asyncHandler(async (req, res) => {
 *   const recipes = await getAllRecipes();
 *   res.json(recipes);
 * }));
 */
export const asyncHandler =
  (controller: AsyncControllerType): AsyncControllerType =>
  async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      next(error);
    }
  };
