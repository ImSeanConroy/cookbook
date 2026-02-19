import { query } from "../common/config/database.config";
import { Ingredient } from "../common/interface/recipe.interface";

/**
 * Creates a new ingredient for a given recipe.
 *
 * @param recipe_id - The ID of the recipe the ingredient belongs to
 * @param data - The ingredient data (name and quantity)
 * @returns The created ingredient object
 */
export const create = async (
  recipe_id: string,
  data: Ingredient,
): Promise<Ingredient> => {
  const res = await query(
    `INSERT INTO ingredients (recipe_id, name, quantity, unit, optional) VALUES ($1, $2, $3, $4, $5) RETURNING name, quantity`,
    [recipe_id, data.name, data.quantity, data.unit, data.optional || false],
  );

  return res[0];
};

/**
 * Retrieves all ingredients associated with a specific recipe.
 *
 * @param recipe_id - The ID of the recipe
 * @returns An array of ingredient objects
 */
export const findByRecipeId = async (
  recipe_id: string,
): Promise<Ingredient[]> => {
  const res = await query(
    `SELECT name, quantity, unit, optional FROM ingredients WHERE recipe_id = $1 ORDER BY name ASC`,
    [recipe_id],
  );

  return res;
};

/**
 * Deletes all ingredients for a specific recipe.
 *
 * @param recipe_id - The ID of the recipe
 * @returns void
 */
export const deleteByRecipeId = async (recipe_id: string): Promise<void> => {
  const res = await query(`DELETE FROM ingredients WHERE recipe_id = $1`, [
    recipe_id,
  ]);

  return res[0] || null;
};
