import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { config } from "./common/config/app.config";
import connectDatabase from "./common/config/database.config";
import { errorHandler } from "./middleware/error-handler.middleware";

import { toNodeHandler } from "better-auth/node";

import { auth } from "./lib/auth/auth";
import recipeRoutes from "./routes/recipe.route";
import systemRoutes from "./routes/system.route";
import mealPlanRoutes from "./routes/meal-plan.route";
import { logger } from "./common/config/logger.config";
import { morganMiddleware } from "./common/config/morgan.config";
import { registerSwagger } from "./common/config/swagger.config";

const app = express();
const BASE_PATH = config.BASE_PATH;
const trustedOrigins = config.TRUSTED_ORIGINS;

logger.info("Starting application", {
  context: "Application",
  environment: config.NODE_ENV,
  port: config.PORT,
});

// ---------------------------
// Middleware
// ---------------------------

// Enable CORS
app.use(
  cors({
    origin: trustedOrigins,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.all(`${BASE_PATH}/auth/*s`, toNodeHandler(auth));

// Parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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