import dotenv from "dotenv";
dotenv.config();

import { createRecipeService } from "../services/recipe.service";
import connectDatabase from "../common/config/database.config";
import { recipes } from "../data/recipe.data";
import { logger } from "../common/config/logger.config";

/**
 * Seeds the database with initial recipe data.
 *
 * Connects to the database, iterates through the `recipes` array,
 * creates each recipe using `createRecipeService`, and logs the result.
 *
 * Exits the process with code 0 on success, or 1 on failure.
 */
async function seedRecipes(): Promise<void> {
  try {
    logger.info("Starting recipe seeding process", {
      context: "RecipeSeeder",
      totalRecipes: recipes.length,
    });

    // Connect to the database
    await connectDatabase();

    // Iterate and create recipes
    for (const recipe of recipes) {
      const result = await createRecipeService(recipe);
      logger.info(`Seeded recipe: ${result.title}`, {
        context: "RecipeSeeder",
        recipeId: result.id,
      });
    }

    logger.info(`Recipe seeding completed successfully`, {
      context: "RecipeSeeder",
      totalSeeded: recipes.length,
    });
    process.exit(0);
  } catch (error: any) {
    logger.error("Error seeding recipes", {
      context: "RecipeSeeder",
      error: error.message ?? error,
      stack: error.stack,
    });
    process.exit(1);
  }
}

// Execute the seeding function
seedRecipes();
