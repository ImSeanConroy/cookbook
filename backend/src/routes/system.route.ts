import { Router, Request, Response } from "express";
import { logger } from "../common/config/logger.config";

import { asyncHandler } from "../middleware/async-handler.middleware";
import { HTTPSTATUS } from "../common/config/http.config";

/**
 * Router for system-related endpoints.
 */
const systemRoutes = Router();

/**
 * @openapi
 * /status:
 *   get:
 *     summary: Health check
 *     tags:
 *       - System
 *     responses:
 *       200:
 *         description: Service is healthy
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StatusResponse'
 */
systemRoutes.get("/", asyncHandler(async (req: Request, res: Response) => {
    logger.debug("Health check endpoint called", {
      context: "Application",
    });
    return res.status(HTTPSTATUS.OK).json({ status: "ok" });
  })
);

export default systemRoutes;
