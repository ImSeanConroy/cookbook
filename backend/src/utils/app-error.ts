import { HTTPSTATUS, HttpStatusCodeType } from "../common/config/http.config";
import { ErrorCodeEnum, ErrorCodeEnumType } from "../common/enums/error-code.enum";

/**
 * Base class for all application errors.
 * Extends the native Error class and adds HTTP status codes and optional error codes.
 */
export class AppError extends Error {
  public readonly statusCode: HttpStatusCodeType;
  public readonly errorCode?: ErrorCodeEnumType;

  /**
   * @param message - Human-readable error message
   * @param statusCode - HTTP status code (default 500)
   * @param errorCode - Optional internal error code
   */
  constructor(
    message: string,
    statusCode: HttpStatusCodeType = HTTPSTATUS.INTERNAL_SERVER_ERROR,
    errorCode?: ErrorCodeEnumType
  ) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.errorCode = errorCode;

    // Capture stack trace
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Generic HTTP exception with configurable status code and message.
 */
export class HttpException extends AppError {
  constructor(
    message = "Http Exception Error",
    statusCode: HttpStatusCodeType,
    errorCode?: ErrorCodeEnumType
  ) {
    super(message, statusCode, errorCode);
  }
}

/**
 * Represents a 500 Internal Server Error.
 */
export class InternalServerException extends AppError {
  constructor(
    message = "Internal Server Error",
    errorCode: ErrorCodeEnumType = ErrorCodeEnum.INTERNAL_SERVER_ERROR
  ) {
    super(message, HTTPSTATUS.INTERNAL_SERVER_ERROR, errorCode);
  }
}

/**
 * Represents a 404 Not Found Error.
 */
export class NotFoundException extends AppError {
  constructor(
    message = "Resource not found",
    errorCode: ErrorCodeEnumType = ErrorCodeEnum.RESOURCE_NOT_FOUND
  ) {
    super(message, HTTPSTATUS.NOT_FOUND, errorCode);
  }
}

/**
 * Represents a 400 Bad Request Error.
 */
export class BadRequestException extends AppError {
  constructor(
    message = "Bad Request",
    errorCode: ErrorCodeEnumType = ErrorCodeEnum.VALIDATION_ERROR
  ) {
    super(message, HTTPSTATUS.BAD_REQUEST, errorCode);
  }
}

/**
 * Represents a 401 Unauthorized Error.
 */
export class UnauthorizedException extends AppError {
  constructor(
    message = "Unauthorized Access",
    errorCode: ErrorCodeEnumType = ErrorCodeEnum.ACCESS_UNAUTHORIZED
  ) {
    super(message, HTTPSTATUS.UNAUTHORIZED, errorCode);
  }
}
