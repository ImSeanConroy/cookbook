export type DifficultyLevelType = "beginner" | "intermediate" | "advanced";
export type PortionPresetType = "2x2" | "3x2" | "4x2" | "4x3";
export type CookTimeFilterType =
  | "UNDER_15"
  | "BETWEEN_15_AND_30"
  | "BETWEEN_30_AND_60"
  | "OVER_60";

export interface MealPlanRecipeType {
  id: string;
  title: string;
  subtitle: string;
  portions: number;
  cookTime: number;
  difficulty: DifficultyLevelType;
  cuisine: string;
  calories: number | null;
  imageUrl: string;
  createdAt: string;
}

export interface WeeklyMealType {
  portions: number;
  recipe: MealPlanRecipeType;
}

export interface WeeklyMealPlanType {
  meals: WeeklyMealType[];
  metadata: {
    portionPreset: PortionPresetType;
    totalMeals: number;
    totalPortions: number;
    generatedAt: string;
  };
}

export interface GenerateMealPlanInput {
  cuisine?: string[];
  difficulty?: DifficultyLevelType[];
  cookTime?: CookTimeFilterType[];
  portionPreset?: PortionPresetType;
}
