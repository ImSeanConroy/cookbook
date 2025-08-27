import dotenv from "dotenv";
dotenv.config();

import { createRecipeService } from "../services/recipe.service";
import connectDatabase from "../common/config/database.config";
import { recipes } from "../data/recipe.data";

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
    // Connect to the database
    await connectDatabase();

    // Iterate and create recipes
    for (const recipe of recipes) {
      const result = await createRecipeService(recipe);
      console.log(`✅ Seeded recipe: ${result.title}`);
    }

    console.log(`🎉 ${recipes.length} recipes seeded successfully.`);
    process.exit(0);
  } catch (error: any) {
    console.error("❌ Error seeding recipes:", error.message ?? error);
    process.exit(1);
  }
}

// Execute the seeding function
seedRecipes();
