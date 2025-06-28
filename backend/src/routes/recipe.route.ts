import { Router } from "express";
import {
  createRecipeController,
  deleteRecipeController,
  getAllRecipesController,
  getRecipeByIdController,
  updateRecipeController,
} from "../controllers/recipe.controller";

const taskRoutes = Router();

taskRoutes.post("/", createRecipeController);
taskRoutes.get("/all", getAllRecipesController);
taskRoutes.get("/:id", getRecipeByIdController);
taskRoutes.put("/:id", updateRecipeController);
taskRoutes.delete("/:id", deleteRecipeController);

export default taskRoutes;
