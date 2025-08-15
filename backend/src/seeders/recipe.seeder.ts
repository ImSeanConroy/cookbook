import dotenv from "dotenv";
dotenv.config();

import { createRecipeService } from "../services/recipe.service";
import connectDatabase from "../common/config/database.config";
import { recipes } from "../data/recipe.data";

async function seedRecipes() {
  try {
    await connectDatabase();

    for (const recipe of recipes) {
      const result = await createRecipeService(recipe);
      console.log(`✅ Seeded recipe: ${result.title}`);
    }

    console.log(`🎉 ${recipes.length} recipes seeded successfully.`);
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding recipes:", error);
    process.exit(1);
  }
}

seedRecipes();
