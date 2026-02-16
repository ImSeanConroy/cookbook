type DifficultyLevelType = "beginner" | "intermedate" | "advanced";
type MealTypeType = "breakfast" | "lunch" | "dinner" | "snack" | "dessert";

export interface IngredientType {
  name: string;
  quantity: number;
  unit: string;
  optional: boolean;
}

export interface RecipeType {
  id: string;
  title: string;
  subtitle: string;
  description: string;

  meta: {
    cookTime: number;
    servings: number;
    difficulty: DifficultyLevelType;
    mealTypes: MealTypeType[];
    dietaryPreferences: string[];
    cuisine: string;
  }
  
  media: {
    imageUrl: string;
  }

  nutrition: {
    calories: number | null;
    protein: number | null;
    carbs: number | null;
    fat: number | null;
    sugars: number | null;
    fiber: number | null;
    saturatedFat: number | null;
    sodium: number | null;
  }

  ingredients: IngredientType[];
  steps: string[];

  timestamp: {
    createdAt: string;
    updatedAt: string;
  }
}

export interface RecipeSummaryType {
  id: string;
  title: string;
  subtitle: string;
  
  cookTime: number;
  servings: number;
  
  cuisine: string;
  difficulty: DifficultyLevelType;
  calories: number;
  
  imageUrl: string;
  
  createdAt: string;
}