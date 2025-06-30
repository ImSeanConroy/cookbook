import { Router } from "express";
import {
  createRecipeController,
  deleteRecipeController,
  getAllRecipesController,
  getRecipeByIdController,
  updateRecipeController,
} from "../controllers/recipe.controller";
import isReadOnly from "../middleware/read-only.middleware";

const taskRoutes = Router();

taskRoutes.post("/", isReadOnly, createRecipeController);
taskRoutes.get("/", getAllRecipesController);
taskRoutes.get("/:id", getRecipeByIdController);
taskRoutes.put("/:id", isReadOnly, updateRecipeController);
taskRoutes.delete("/:id", isReadOnly, deleteRecipeController);

export default taskRoutes;
