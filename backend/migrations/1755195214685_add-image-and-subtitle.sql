-- Up Migration

ALTER TABLE recipes
ADD COLUMN subtitle VARCHAR(150) NOT NULL,
ADD COLUMN card_image_url TEXT NOT NULL;

-- Down Migration

ALTER TABLE recipes
DROP COLUMN IF EXISTS subtitle,
DROP COLUMN IF EXISTS card_image;
