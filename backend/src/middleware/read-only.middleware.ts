import { NextFunction, Request, Response } from "express";
import { UnauthorizedException } from "../utils/app-error";
import { config } from "../common/config/app.config";

const isReadOnly = (req: Request, res: Response, next: NextFunction) => {
  if ((config.READ_ONLY || "").toLowerCase() === "true") {
    throw new UnauthorizedException("Unauthorized.");
  }
  next();
};

export default isReadOnly;