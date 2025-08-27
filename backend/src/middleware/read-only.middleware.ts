import { NextFunction, Request, Response } from "express";
import { UnauthorizedException } from "../utils/app-error";
import { config } from "../common/config/app.config";

/**
 * Middleware to block write operations when the application
 * is running in READ_ONLY mode.
 *
 * If `config.READ_ONLY` is set to "true" (case-insensitive),
 * this middleware will throw an UnauthorizedException.
 *
 * @param req - Express Request object
 * @param res - Express Response object
 * @param next - Express NextFunction
 */
const isReadOnly = (req: Request, res: Response, next: NextFunction) => {
  if ((config.READ_ONLY || "").toLowerCase() === "true") {
    throw new UnauthorizedException("Unauthorized.");
  }
  next();
};

export default isReadOnly;
