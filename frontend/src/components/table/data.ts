import {
  Flame,
  Clock,
  ChefHat,
  Leaf,
  Wheat,
  Candy,
  Sandwich,
  Pizza,
  Croissant,
  Apple,
  Zap,
  Fish,
} from "lucide-react"

export const cuisines = [
  { value: "Italian", label: "Italian" },
  { value: "Mexican", label: "Mexican" },
  { value: "Indian", label: "Indian" },
  { value: "Chinese", label: "Chinese" },
  { value: "American", label: "American" },
  { value: "Mediterranean", label: "Mediterranean" },
  { value: "Japanese", label: "Japanese" },
  { value: "Thai", label: "Thai" },
  { value: "Greek", label: "Greek" },
  { value: "French", label: "French" },
]

export const totalTime = [
  { value: "UNDER_15", label: "Under 15 min", icon: Clock },
  { value: "BETWEEN_15_AND_30", label: "15–30 min", icon: Clock },
  { value: "OVER_30", label: "30+ min", icon: Clock },
];

export const difficulties = [
  { value: "beginner", label: "Beginner", icon: Leaf },
  { value: "intermediate", label: "Intermedate", icon: ChefHat },
  { value: "advanced", label: "Advanced", icon: Flame },
]

export const mealTypes = [
  { value: "breakfast", label: "Breakfast", icon: Croissant },
  { value: "lunch", label: "Lunch", icon: Sandwich },
  { value: "dinner", label: "Dinner", icon: Pizza },
  { value: "snack", label: "Snack", icon: Apple },
  { value: "dessert", label: "Dessert", icon: Candy },
]

export const dietaryPreferences = [
  { value: "vegetarian", label: "Vegetarian", icon: Fish },
  { value: "vegan", label: "Vegan", icon: Leaf },
  { value: "gluten-free", label: "Gluten Free", icon: Wheat },
  { value: "keto", label: "Keto", icon: Zap },
]