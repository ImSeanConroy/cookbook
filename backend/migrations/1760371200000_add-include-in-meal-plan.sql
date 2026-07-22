-- Up Migration

ALTER TABLE recipes
ADD COLUMN include_in_meal_plan BOOLEAN NOT NULL DEFAULT true;

-- Down Migration

ALTER TABLE recipes
DROP COLUMN IF EXISTS include_in_meal_plan;
