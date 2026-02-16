import { query } from "../common/config/database.config";
import { Step } from "../common/interface/recipe.interface";

/**
 * Creates a new step for a specific recipe.
 *
 * @param recipe_id - The ID of the recipe the step belongs to
 * @param data - The step data (step number and instruction)
 * @returns The created step object
 */
export const create = async (recipe_id: string, data: Step): Promise<Step> => {
  const res = await query(
    `INSERT INTO steps (recipe_id, step_number, instruction) VALUES ($1, $2, $3) RETURNING step_number, instruction`,
    [recipe_id, data.step_number, data.instruction]
  );
  return res[0];
};

/**
 * Retrieves all steps for a specific recipe, ordered by step number.
 *
 * @param recipe_id - The ID of the recipe
 * @returns An array of step objects
 */
export const findByRecipeId = async (recipe_id: string): Promise<Step[]> => {
  const res = await query(
    `SELECT step_number, instruction FROM steps WHERE recipe_id = $1 ORDER BY step_number ASC`,
    [recipe_id]
  );
  return res || null;
};

/**
 * Deletes all steps associated with a specific recipe.
 *
 * @param recipe_id - The ID of the recipe
 * @returns void
 */
export const deleteByRecipeId = async (recipe_id: string): Promise<void> => {
  const res = await query(`DELETE FROM steps WHERE recipe_id = $1`, [
    recipe_id,
  ]);
  return res[0] || null;
};
