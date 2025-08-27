import dotenv from "dotenv";
dotenv.config();

import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import session from "cookie-session";
import { config } from "./common/config/app.config";
import connectDatabase from "./common/config/database.config";
import { errorHandler } from "./middleware/error-handler.middleware";
import { asyncHandler } from "./middleware/async-handler.middleware";
import { HTTPSTATUS } from "./common/config/http.config";

import recipeRoutes from "./routes/recipe.route";

const app = express();
const BASE_PATH = config.BASE_PATH;

// ---------------------------
// Middleware
// ---------------------------

// Parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session configuration
app.use(
  session({
    name: "session",
    keys: [config.SESSION_SECRET],
    maxAge: 24 * 60 * 60 * 1000,
    secure: config.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax",
  })
);

// Enable CORS
app.use(
  cors({
    origin: config.FRONTEND_ORIGIN,
    credentials: true,
  })
);

// ---------------------------
// Routes
// ---------------------------

// Health check endpoint
app.get(
  `${BASE_PATH}/status`,
  asyncHandler(async (_req: Request, res: Response, _next: NextFunction) => {
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
  console.log(`Server listening on port ${config.PORT} in ${config.NODE_ENV} mode`);
  await connectDatabase();
});