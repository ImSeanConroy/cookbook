import { Recipe } from "../common/interface/recipe.interface";
import { toCamelCase } from "../utils/to-camel-case";
import { query } from "../common/config/database.config";

export const create = async (
  data: Omit<
    Recipe,
    "id" | "ingredients" | "steps" | "created_at" | "updated_at"
  >
): Promise<Recipe> => {
  const res = await query(
    `INSERT INTO recipes (
      title, description, prep_time, cook_time, servings, difficulty,
      cuisine, image_url
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *`,
    [
      data.title,
      data.description,
      data.prep_time,
      data.cook_time,
      data.servings,
      data.difficulty,
      data.cuisine,
      data.image_url,
    ]
  );
  return toCamelCase(res.rows)[0];
};

export const findById = async (id: string): Promise<Recipe | null> => {
  const res = await query("SELECT * FROM recipes WHERE id = $1", [id]);
  return toCamelCase(res.rows)[0] || null;
};

export const getCount = async (): Promise<number> => {
  const res = await query("SELECT COUNT(*) FROM recipes");
  return parseInt(res.rows[0].count, 10);
};

export const getAll = async ({
  offset = 0,
  limit = 10,
}: {
  offset?: number;
  limit?: number;
}): Promise<Recipe[]> => {
  const res = await query(
    "SELECT * FROM recipes ORDER BY created_at DESC LIMIT $1 OFFSET $2",
    [limit, offset]
  );
  return toCamelCase(res.rows);
};

export const update = async (
  data: Partial<Omit<Recipe, "created_at" | "updated_at">>
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
    values
  );

  return toCamelCase(res.rows)[0] || null;
};

export const deleteById = async (id: string): Promise<Recipe | null> => {
  const res = await query("DELETE FROM recipes WHERE id = $1 RETURNING *", [
    id,
  ]);
  return toCamelCase(res.rows)[0] || null;
};
