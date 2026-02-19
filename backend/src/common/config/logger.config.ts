import winston from "winston";
import path from "path";
import { config } from "../config/app.config";

const logDir = path.join(process.cwd(), "logs");

// Define custom log levels with numeric values
// Lower numbers = higher priority in Winston
const customLevels = {
  levels: {
    fatal: 0,
    error: 1,
    warn: 2,
    info: 3,
    debug: 4,
    trace: 5,
  },
  colors: {
    trace: "grey",
    debug: "blue",
    info: "green",
    warn: "yellow",
    error: "red",
    fatal: "magenta",
  },
};

winston.addColors(customLevels.colors);

/**
 * Centralized logger used for structured logging (trace, debug, info, warn, error, fatal).
 * Provides both console and file outputs with appropriate levels and formatting.
 */
export const logger = winston.createLogger({
  levels: customLevels.levels,
  level: config.LOG_LEVEL || "info",
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss.SSS" }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
  ),
  transports: [
    // Console transport with colored output using Winston's built-in cli format
    new winston.transports.Console({
      level: config.LOG_LEVEL || "info",
      format: winston.format.combine(
        winston.format.colorize({ all: true }),
        
        winston.format.printf(
          ({ timestamp, level, message, ...meta }) =>
            `${timestamp} [${level}]: ${message} ${Object.keys(meta).length > 0 ? JSON.stringify(meta, null, 2) : ""}`,
        ),
      ),
    }),
    // Error log file
    new winston.transports.File({
      filename: path.join(logDir, "error.log"),
      level: "error",
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      format: winston.format.combine(
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss.SSS" }),
        winston.format.json()
      ),
    }),
    // Combined log file
    new winston.transports.File({
      filename: path.join(logDir, "combined.log"),
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      format: winston.format.combine(
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss.SSS" }),
        winston.format.json()
      ),
    }),
    // Debug log file
    new winston.transports.File({
      filename: path.join(logDir, "debug.log"),
      level: "debug",
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      format: winston.format.combine(
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss.SSS" }),
        winston.format.json()
      ),
    }),
  ],
});
