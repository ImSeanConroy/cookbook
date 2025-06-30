import express from "express";
import request from "supertest";
import { describe, it, expect } from "vitest";
import { z } from "zod";

import { errorHandler } from "../../src/middleware/error-handler.middleware";
import { BadRequestException } from "../../src/utils/app-error";
import { ErrorCodeEnum } from "../../src/common/enums/error-code.enum";
import { HTTPSTATUS } from "../../src/common/config/http.config";

const createTestApp = () => {
  const app = express();
  app.use(express.json());

  app.post("/zod", (req, res, next) => {
    const schema = z.object({ name: z.string() });
    try {
      schema.parse(req.body);
      res.status(200).send("OK");
    } catch (err) {
      next(err);
    }
  });

  app.get("/app-error", (_req, _res, next) => {
    next(new BadRequestException("Invalid input"));
  });

  app.post("/syntax-error", (_req, _res) => {});

  app.get("/generic-error", (_req, _res, next) => {
    next(new Error("Unexpected failure"));
  });

  app.use(errorHandler);

  return app;
};

beforeEach(() => {
  vi.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("errorHandler Middleware", () => {
  const app = createTestApp();

  it("handles ZodError properly", async () => {
    const res = await request(app).post("/zod").send({});

    expect(res.status).toBe(HTTPSTATUS.BAD_REQUEST);
    expect(res.body.message).toBe("Validation failed");
    expect(res.body.errors[0]).toHaveProperty("field", "name");
    expect(res.body.errorCode).toBe(ErrorCodeEnum.VALIDATION_ERROR);
  });

  it("handles AppError properly", async () => {
    const res = await request(app).get("/app-error");

    expect(res.status).toBe(HTTPSTATUS.BAD_REQUEST);
    expect(res.body.message).toBe("Invalid input");
    expect(res.body.errorCode).toBe(ErrorCodeEnum.VALIDATION_ERROR);
  });

  it("handles SyntaxError (invalid JSON)", async () => {
    const res = await request(app)
      .post("/syntax-error")
      .set("Content-Type", "application/json")
      .send('{"invalid":');

    expect(res.status).toBe(HTTPSTATUS.BAD_REQUEST);
    expect(res.body.message).toMatch(/Invalid JSON format/i);
  });

  it("handles unknown errors with 500", async () => {
    const res = await request(app).get("/generic-error");

    expect(res.status).toBe(HTTPSTATUS.INTERNAL_SERVER_ERROR);
    expect(res.body.message).toBe("Internal Server Error");
    expect(res.body.error).toBe("Unexpected failure");
  });
});
