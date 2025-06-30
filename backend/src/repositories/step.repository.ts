import { query } from "../common/config/database.config";
import { Step } from "../common/interface/recipe.interface";
import { toCamelCase } from "../utils/to-camel-case";

export const create = async (recipe_id: string, data: Step): Promise<Step> => {
  const res = await query(
    `INSERT INTO steps (recipe_id, step_number, instruction) VALUES ($1, $2, $3) RETURNING instruction`,
    [recipe_id, data.step_number, data.instruction]
  );
  return toCamelCase(res.rows)[0];
};

export const findByRecipeId = async (recipe_id: string): Promise<Step[]> => {
  const res = await query(
    `SELECT step_number, instruction FROM steps WHERE recipe_id = $1 ORDER BY step_number ASC`,
    [recipe_id]
  );
  return toCamelCase(res.rows) || null;
};

export const deleteByRecipeId = async (recipe_id: string): Promise<void> => {
  const res = await query(`DELETE FROM steps WHERE recipe_id = $1`, [
    recipe_id,
  ]);
  return toCamelCase(res.rows)[0] || null;
};
