type DifficultyLevelType = "easy" | "medium" | "hard" | "intermediate";

export interface IngredientType {
  name: string;
  quantity: string;
}

export interface RecipeType {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty: DifficultyLevelType;
  cuisine: string;
  imageUrl: string;
  cardImageUrl: string;
  calories: number | null;
  protein: number | null;
  carbs: number | null;
  fat: number | null;
  sugars: number | null;
  fiber: number | null;
  saturatedFat: number | null;
  sodium: number | null;
  createdAt: string;
  updatedAt: string;
  ingredients: IngredientType[];
  steps: string[];
  utensils: string[];
}

export interface RecipeSummaryType {
  id: string;
  title: string;
  subtitle: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  cuisine: string;
  difficulty: "beginner" | "intermedate" | "advanced";
  mealType: "breakfast" | "lunch" | "dinner" | "snack" | "dessert";
  dietaryPreference: "vegetarian" | "vegan" | "gluten-free" | "keto";
  cardImageUrl: string;
  createdAt: string;
  updatedAt: string;
}