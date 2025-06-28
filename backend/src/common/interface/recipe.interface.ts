type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

export interface Recipe {
  id: string;
  title: string;
  description: string;
  prep_time: number;
  cook_time: number;
  servings: number;
  difficulty: DifficultyLevel;
  cuisine: string;
  image_url: string;
  created_at: string;
  updated_at: string;
}
