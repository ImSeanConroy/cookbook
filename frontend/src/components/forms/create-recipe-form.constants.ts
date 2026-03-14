import type { NutritionFieldName } from "./create-recipe-form.schema";

export const nutritionFields: NutritionFieldName[] = [
  "calories",
  "protein",
  "carbs",
  "fat",
  "fiber",
  "sugars",
  "saturated_fat",
  "sodium",
];

export const ingredientUnits = [
  { label: "Gram (g)", value: "g" },
  { label: "Kilogram (kg)", value: "kg" },
  { label: "Milliliter (ml)", value: "ml" },
  { label: "Liter (l)", value: "l" },
  { label: "Teaspoon (tsp)", value: "tsp" },
  { label: "Tablespoon (tbsp)", value: "tbsp" },
  { label: "Cup", value: "cup" },
  { label: "Bunch", value: "bunch" },
  { label: "Pack", value: "pack" },
  { label: "Sachet", value: "sachet" },
  { label: "Nest", value: "nest" },
  { label: "Slice", value: "slice" },
  { label: "Piece", value: "piece" },
  { label: "Unit", value: "unit" },
  { label: "Pinch", value: "pinch" },
  { label: "To taste", value: "to taste" },
];

export const nutritionInputConfig: Record<
  NutritionFieldName,
  { min: number; step: string; unit: string }
> = {
  calories: { min: 1, step: "1", unit: "kcal" },
  protein: { min: 0, step: "0.1", unit: "g" },
  carbs: { min: 0, step: "0.1", unit: "g" },
  fat: { min: 0, step: "0.1", unit: "g" },
  fiber: { min: 0, step: "0.1", unit: "g" },
  sugars: { min: 0, step: "0.1", unit: "g" },
  saturated_fat: { min: 0, step: "0.1", unit: "g" },
  sodium: { min: 0, step: "1", unit: "mg" },
};

export const formatFieldLabel = (value: string) =>
  value
    .split("_")
    .join(" ")
    .replace(/^./, (character) => character.toUpperCase());
