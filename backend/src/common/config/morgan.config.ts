import morgan from "morgan";
import { Request, Response } from "express";
import { logger } from "../config/logger.config";

/**
 * Morgan middleware configured to log HTTP requests with structured metadata
 * Logs method, path, status, response time, IP, and user agent
 */
export const morganMiddleware = morgan(
  (tokens, req: Request, res: Response) => {
    const method = tokens.method(req, res);
    const url = tokens.url(req, res);
    const status = tokens.status(req, res);
    const responseTime = tokens["response-time"](req, res);
    const contentLength = tokens.res(req, res, "content-length");
    const remoteAddr = tokens["remote-addr"](req, res);
    const userAgent = tokens["user-agent"](req, res);

    // Determine log level based on status code
    const statusCode = parseInt(status || "0", 10);
    let logLevel: "info" | "warn" | "error" = "info";
    
    if (statusCode >= 500) {
      logLevel = "error";
    } else if (statusCode >= 400) {
      logLevel = "warn";
    }

    // Log with structured metadata
    logger[logLevel](`${method} ${url} ${status} - ${responseTime}ms`, {
      context: "HTTP",
      method,
      path: url?.split("?")[0], // Path without query params
      status: statusCode,
      responseTime: responseTime ? parseFloat(responseTime) : undefined,
      contentLength: contentLength || undefined,
      ip: remoteAddr,
      userAgent: userAgent || undefined,
    });

    return null; // Return null to prevent default logging
  },
  {
    skip: (req: Request) => req.method === "OPTIONS",
    immediate: false, // Log after response
  }
);
