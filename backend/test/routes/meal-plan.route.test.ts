import express from "express";
import request from "supertest";
import { describe, it, expect, vi, beforeAll } from "vitest";

import router from "../../src/routes/meal-plan.route";

vi.mock("../../src/controllers/meal-plan.controller", () => ({
  generateMealPlanController: vi.fn((req, res) => res.send("generateMealPlan")),
}));

describe("Meal Plan Routes", () => {
  let app: express.Express;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    app.use("/meal-plan", router);
  });

  it("POST /meal-plan/generate calls generateMealPlanController", async () => {
    const res = await request(app).post("/meal-plan/generate").send({});

    expect(res.status).toBe(200);
    expect(res.text).toBe("generateMealPlan");
  });
});
