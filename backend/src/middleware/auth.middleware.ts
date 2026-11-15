import { NextFunction, Request, Response } from "express";
import { fromNodeHeaders } from "better-auth/node";
import { auth } from "../lib/auth/auth";
import { UnauthorizedException } from "../utils/app-error";

export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
      asResponse: false,
    });

    if (!session) {
      throw new UnauthorizedException("Authentication required");
    }

    res.locals.session = session;
    next();
  } catch (error) {
    next(error);
  }
};
