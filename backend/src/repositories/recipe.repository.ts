import { Recipe } from "../common/interface/recipe.interface";
import { toCamelCase } from "../utils/to-camel-case";
import { query } from "../common/config/database.config";

/**
 * Creates a new recipe in the database.
 *
 * @param data - Recipe data excluding id, ingredients, steps, created_at, and updated_at
 * @returns The newly created recipe
 */
export const create = async (
  data: Omit<
    Recipe,
    "id" | "ingredients" | "steps" | "created_at" | "updated_at"
  >
): Promise<Recipe> => {
  const res = await query(
    `INSERT INTO recipes (
      title, subtitle, description, prep_time, cook_time, servings, difficulty,
      cuisine, image_url, utensils, meal_types, dietary_preferences,
      calories, protein, carbs, fat, sugars, fiber, saturated_fat, sodium
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
      $11, $12, $13, $14, $15, $16, $17, $18, $19, $20
    )
    RETURNING *`,
    [
      data.title,
      data.subtitle,
      data.description,
      data.prep_time,
      data.cook_time,
      data.servings,
      data.difficulty,
      data.cuisine,
      data.image_url,
      data.utensils,
      data.meal_types,
      data.dietary_preferences,
      data.calories,
      data.protein,
      data.carbs,
      data.fat,
      data.sugars,
      data.fiber,
      data.saturated_fat,
      data.sodium,
    ],
  );
  return toCamelCase(res.rows)[0];
};

/**
 * Finds a recipe by its ID.
 *
 * @param id - Recipe ID
 * @returns The recipe object or null if not found
 */
export const findById = async (id: string): Promise<Recipe | null> => {
  const res = await query("SELECT * FROM recipes WHERE id = $1", [id]);
  return toCamelCase(res.rows)[0] || null;
};

/**
 * Returns the count of recipes, optionally filtered.
 *
 * @param filters - Optional filters: queryText, difficulty, cuisine, cookTime
 * @returns The total number of matching recipes
 */
export const getCount = async ({
  queryText,
  difficulty,
  cuisine,
  mealTypes,
  dietaryPreferences,
  totalTime,
}: {
  queryText?: string;
  difficulty?: string[];
  cuisine?: string[];
  mealTypes?: string[];
  dietaryPreferences?: string[];
  totalTime?: string[];
}): Promise<number> => {
  let baseQuery = "SELECT COUNT(*) FROM recipes";
  const values: any[] = [];
  const whereClauses: string[] = [];

  if (queryText) {
    values.push(`%${queryText}%`);
    whereClauses.push(`title ILIKE $${values.length} OR subtitle ILIKE $${values.length + 1}`);
    values.push(`%${queryText}%`);
  }

  if (difficulty?.length) {
    values.push(difficulty);
    whereClauses.push(`difficulty = ANY($${values.length})`);
  }

  if (cuisine?.length) {
    values.push(cuisine);
    whereClauses.push(`cuisine = ANY($${values.length})`);
  }

  if (mealTypes?.length) {
    values.push(mealTypes);
    whereClauses.push(`meal_types && $${values.length}`);
  }

  if (dietaryPreferences?.length) {
    values.push(dietaryPreferences);
    whereClauses.push(`dietary_preferences && $${values.length}`);
  }

  if (totalTime?.length) {
    const timeConditions: string[] = [];

    totalTime.forEach((time) => {
      switch (time) {
        case "UNDER_15":
          timeConditions.push("cook_time + prep_time < 15");
          break;
        case "BETWEEN_15_AND_30":
          timeConditions.push("cook_time + prep_time BETWEEN 15 AND 30");
          break;
        case "OVER_30":
          timeConditions.push("cook_time + prep_time > 30");
          break;
      }
    });

    if (timeConditions.length) {
      whereClauses.push(`(${timeConditions.join(" OR ")})`);
    }
  }

  if (whereClauses.length) {
    baseQuery += " WHERE " + whereClauses.join(" AND ");
  }

  const res = await query(baseQuery, values);
  return parseInt(res.rows[0].count, 10);
};

/**
 * Retrieves all recipes with optional filters, sorting, and pagination.
 *
 * @param params - Filters, sort option, limit, and offset
 * @returns Array of recipe objects
 */
export const getAll = async ({
  offset = 0,
  limit = 12,
  queryText,
  difficulty,
  cuisine,
  mealTypes,
  dietaryPreferences,
  totalTime,
  sortBy = "newest",
}: {
  offset?: number;
  limit?: number;
  queryText?: string;
  difficulty?: string[];
  cuisine?: string[];
  mealTypes?: string[];
  dietaryPreferences?: string[];
  totalTime?: string[];
  sortBy?: string;
}): Promise<Recipe[]> => {
  const values: any[] = [];
  let baseQuery = `
    SELECT id, title, subtitle, prep_time, cook_time,
    difficulty, cuisine, calories, image_url,
    created_at, updated_at FROM recipes
  `;

  const whereClauses: string[] = [];

  if (queryText) {
    values.push(`%${queryText}%`);
    whereClauses.push(`title ILIKE $${values.length} OR subtitle ILIKE $${values.length + 1}`);
    values.push(`%${queryText}%`);
  }

  if (difficulty?.length) {
    values.push(difficulty);
    whereClauses.push(`difficulty = ANY($${values.length})`);
  }

  if (cuisine?.length) {
    values.push(cuisine);
    whereClauses.push(`cuisine = ANY($${values.length})`);
  }

  if (mealTypes?.length) {
    values.push(mealTypes);
    whereClauses.push(`meal_types && $${values.length}`);
  }

  if (dietaryPreferences?.length) {
    values.push(dietaryPreferences);
    whereClauses.push(`dietary_preferences && $${values.length}`);
  }

  if (totalTime?.length) {
    const timeConditions: string[] = [];

    totalTime.forEach((time) => {
      switch (time) {
        case "UNDER_15":
          timeConditions.push("cook_time + prep_time < 15");
          break;
        case "BETWEEN_15_AND_30":
          timeConditions.push("cook_time + prep_time BETWEEN 15 AND 30");
          break;
        case "BETWEEN_30_AND_60":
          timeConditions.push("cook_time + prep_time BETWEEN 30 AND 60");
          break;
        case "OVER_60":
          timeConditions.push("cook_time + prep_time > 60");
          break;
      }
    });

    if (timeConditions.length) {
      whereClauses.push(`(${timeConditions.join(" OR ")})`);
    }
  }

  if (whereClauses.length) {
    baseQuery += " WHERE " + whereClauses.join(" AND ");
  }

  // Sorting
  let orderClause = "ORDER BY created_at DESC";

  switch (sortBy) {
    case "oldest":
      orderClause = "ORDER BY created_at ASC";
      break;
    case "az":
      orderClause = "ORDER BY title ASC";
      break;
    case "za":
      orderClause = "ORDER BY title DESC";
      break;
  }

  values.push(limit, offset);

  baseQuery += ` ${orderClause}
    LIMIT $${values.length - 1}
    OFFSET $${values.length}`;

  const res = await query(baseQuery, values);
  return toCamelCase(res.rows);
};

/**
 * Updates a recipe by its ID.
 *
 * @param data - Partial recipe object including `id`
 * @returns The updated recipe object or null if not found
 */
export const update = async (
  data: Partial<Omit<Recipe, "created_at" | "updated_at">>,
): Promise<Recipe | null> => {
  const fields = [];
  const values = [];
  let i = 1;

  for (const [key, val] of Object.entries(data)) {
    if (val !== undefined && key !== "id") {
      fields.push(`${key} = $${i++}`);
      values.push(val);
    }
  }

  values.push(data.id);
  const res = await query(
    `UPDATE recipes SET ${fields.join(", ")} WHERE id = $${i} RETURNING *;`,
    values,
  );

  return toCamelCase(res.rows)[0] || null;
};

/**
 * Deletes a recipe by its ID.
 *
 * @param id - Recipe ID
 * @returns The deleted recipe object or null if not found
 */
export const deleteById = async (id: string): Promise<Recipe | null> => {
  const res = await query("DELETE FROM recipes WHERE id = $1 RETURNING *", [
    id,
  ]);
  return toCamelCase(res.rows)[0] || null;
};
