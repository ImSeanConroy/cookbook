import {
  Flame,
  Clock,
  ChefHat,
  Leaf,
  Utensils,
  Timer,
} from "lucide-react"


export const cuisines = [
  { value: "italian", label: "Italian", icon: Utensils },
  { value: "mexican", label: "Mexican", icon: Utensils },
  { value: "indian", label: "Indian", icon: Utensils },
  { value: "chinese", label: "Chinese", icon: Utensils },
  { value: "american", label: "American", icon: Utensils },
  { value: "mediterranean", label: "Mediterranean", icon: Utensils },
  { value: "japanese", label: "Japanese", icon: Utensils },
  { value: "thai", label: "Thai", icon: Utensils },
  { value: "greek", label: "Greek", icon: Utensils },
  { value: "french", label: "French", icon: Utensils },
]

// ⏱️ Cook Time
export const cookTimes = [
  { value: "quick", label: "Under 15 min", icon: Timer },
  { value: "medium", label: "15–30 min", icon: Clock },
  { value: "long", label: "30+ min", icon: Clock },
]

// 🔥 Difficulty
export const difficulties = [
  { value: "easy", label: "Easy", icon: Leaf },
  { value: "medium", label: "Medium", icon: ChefHat },
  { value: "hard", label: "Hard", icon: Flame },
]

// 🍽️ Meal Type
export const mealTypes = [
  { value: "breakfast", label: "Breakfast", icon: Utensils },
  { value: "lunch", label: "Lunch", icon: Utensils },
  { value: "dinner", label: "Dinner", icon: Utensils },
  { value: "snack", label: "Snack", icon: Utensils },
  { value: "dessert", label: "Dessert", icon: Utensils },
]

// 🌱 Dietary Preferences
export const dietaryPreferences = [
  { value: "vegetarian", label: "Vegetarian", icon: Leaf },
  { value: "vegan", label: "Vegan", icon: Leaf },
  { value: "gluten-free", label: "Gluten Free", icon: Leaf },
  { value: "keto", label: "Keto", icon: Leaf },
]