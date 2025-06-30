import { ErrorRequestHandler, Response } from "express";
import { HTTPSTATUS } from "../common/config/http.config";
import { AppError } from "../utils/app-error";
import { ZodError } from "zod";
import { ErrorCodeEnum } from "../common/enums/error-code.enum";

const formatZodError = (res: Response, error: ZodError) => {
  const errors = error.issues.map((issue) => ({
    field: issue.path.join("."),
    message: issue.message,
  }));

  return res.status(HTTPSTATUS.BAD_REQUEST).json({
    message: "Validation failed",
    errors,
    errorCode: ErrorCodeEnum.VALIDATION_ERROR,
  });
};

export const errorHandler: ErrorRequestHandler = (
  error,
  req,
  res,
  next
): any => {
  console.error(`Error on ${req.method} ${req.path}`, error);

  // Handle malformed JSON
  if (error instanceof SyntaxError && "body" in error) {
    return res.status(HTTPSTATUS.BAD_REQUEST).json({
      message: "Invalid JSON format. Please check your request body.",
      errorCode: ErrorCodeEnum.VALIDATION_ERROR,
    });
  }

  // Handle Zod validation errors
  if (error instanceof ZodError) {
    return formatZodError(res, error);
  }

  // Handle known application errors
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      message: error.message,
      errorCode: error.errorCode,
    });
  }

  // Fallback: unhandled errors
  return res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({
    message: "Internal Server Error",
    error: error?.message ?? "Unknown error occurred",
  });
};
