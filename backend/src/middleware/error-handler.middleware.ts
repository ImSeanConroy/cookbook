import { ErrorRequestHandler, Response, Request, NextFunction } from "express";
import { HTTPSTATUS } from "../common/config/http.config";
import { AppError } from "../utils/app-error";
import { ZodError } from "zod";
import { ErrorCodeEnum } from "../common/enums/error-code.enum";
import { logger } from "../common/config/logger.config";

/**
 * Formats Zod validation errors into a consistent API response.
 *
 * @param res - Express Response object
 * @param error - ZodError instance
 * @returns Express JSON response with validation errors
 */
const formatZodError = (res: Response, error: ZodError, req: Request) => {
  const errors = error.issues.map((issue) => ({
    field: issue.path.join("."),
    message: issue.message,
  }));

  logger.warn("Validation error", {
    context: "ErrorHandler",
    method: req.method,
    path: req.path,
    errors,
  });

  return res.status(HTTPSTATUS.BAD_REQUEST).json({
    message: "Validation failed",
    errors,
    errorCode: ErrorCodeEnum.VALIDATION_ERROR,
  });
};

/**
 * Global Express error-handling middleware.
 *
 * Catches:
 * - SyntaxError (malformed JSON)
 * - Zod validation errors
 * - Known application errors (AppError)
 * - Unhandled errors
 *
 * @param error - The thrown error
 * @param req - Express Request object
 * @param res - Express Response object
 * @param next - Express NextFunction
 * @returns Express JSON response with error details
 */
export const errorHandler: ErrorRequestHandler = (
  error,
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  // Handle malformed JSON
  if (error instanceof SyntaxError && "body" in error) {
    logger.warn("Malformed JSON in request body", {
      context: "ErrorHandler",
      method: req.method,
      path: req.path,
      error: error.message,
    });

    return res.status(HTTPSTATUS.BAD_REQUEST).json({
      message: "Invalid JSON format. Please check your request body.",
      errorCode: ErrorCodeEnum.VALIDATION_ERROR,
    });
  }

  // Handle Zod validation errors
  if (error instanceof ZodError) {
    return formatZodError(res, error, req);
  }

  // Handle known application errors
  if (error instanceof AppError) {
    logger.warn("Application error", {
      context: "ErrorHandler",
      method: req.method,
      path: req.path,
      statusCode: error.statusCode,
      errorCode: error.errorCode,
      message: error.message,
    });

    return res.status(error.statusCode).json({
      message: error.message,
      errorCode: error.errorCode,
    });
  }

  // Fallback: unhandled errors
  logger.error(`Unhandled exception on ${req.method} ${req.path}`, {
    context: "ErrorHandler",
    method: req.method,
    path: req.path,
    error: error instanceof Error ? error.message : error,
    stack: error instanceof Error ? error.stack : undefined,
  });

  return res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({
    message: "Internal Server Error",
    error: error?.message ?? "Unknown error occurred",
  });
};
