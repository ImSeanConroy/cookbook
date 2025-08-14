type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

export interface Recipe {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  prep_time: number;
  cook_time: number;
  servings: number;
  difficulty: DifficultyLevel;
  cuisine: string;
  image_url: string;
  card_image_url: string;
  created_at: string;
  updated_at: string;
  ingredients: Ingredient[];
  steps: string[];
}

export interface Ingredient {
  name: string;
  quantity: string;
}

export interface Step {
  step_number: number;
  instruction: string;
}

export type RecipeInput = Omit<Recipe, 'id' | 'created_at' | 'updated_at'>;