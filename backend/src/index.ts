import dotenv from "dotenv";
dotenv.config();

import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { config } from "./common/config/app.config";
import connectDatabase from "./common/config/database.config";
import { errorHandler } from "./middleware/error-handler.middleware";
import { asyncHandler } from "./middleware/async-handler.middleware";
import { HTTPSTATUS } from "./common/config/http.config";

import recipeRoutes from "./routes/recipe.route";
import { logger } from "./common/config/logger.config";
import { morganMiddleware } from "./common/config/morgan.config";

const app = express();
const BASE_PATH = config.BASE_PATH;

logger.info("Starting application", {
  context: "Application",
  environment: config.NODE_ENV,
  port: config.PORT,
});

if ((config.READ_ONLY || "").toLowerCase() === "true") {
  logger.warn("Application running in READ_ONLY mode", {
    context: "Application",
  });
}

// ---------------------------
// Middleware
// ---------------------------

// Parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS
app.use(
  cors({
    origin: config.FRONTEND_ORIGIN,
    credentials: true,
  })
);

// HTTP request logging
app.use(morganMiddleware);

// ---------------------------
// Routes
// ---------------------------

// Health check endpoint
app.get(
  `${BASE_PATH}/status`,
  asyncHandler(async (_req: Request, res: Response, _next: NextFunction) => {
    logger.debug("Health check endpoint called", {
      context: "Application",
    });
    return res.status(HTTPSTATUS.OK).json({ status: "ok" });
  })
);

// Recipe routes
app.use(`${BASE_PATH}/recipe`, recipeRoutes);

// ---------------------------
// Error handler
// ---------------------------
app.use(errorHandler);

// ---------------------------
// Server startup
// ---------------------------

app.listen(config.PORT, async () => {
  logger.info("Server listening", {
    context: "Application",
    environment: config.NODE_ENV,
    port: config.PORT,
  });
  await connectDatabase();
});