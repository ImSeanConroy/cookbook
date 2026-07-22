import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { config } from "./common/config/app.config";
import connectDatabase from "./common/config/database.config";
import { errorHandler } from "./middleware/error-handler.middleware";

import recipeRoutes from "./routes/recipe.route";
import systemRoutes from "./routes/system.route";
import mealPlanRoutes from "./routes/meal-plan.route";
import { logger } from "./common/config/logger.config";
import { morganMiddleware } from "./common/config/morgan.config";
import { registerSwagger } from "./common/config/swagger.config";

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
// Swagger Documentation
// ---------------------------

registerSwagger(app);

// ---------------------------
// Routes
// ---------------------------

app.use(`${BASE_PATH}/status`, systemRoutes);
app.use(`${BASE_PATH}/recipe`, recipeRoutes);
app.use(`${BASE_PATH}/meal-plan`, mealPlanRoutes);

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