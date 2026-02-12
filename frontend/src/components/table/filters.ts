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
  Drumstick,
  Milk,
  Sparkles,
} from "lucide-react";

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
  { value: "Spanish", label: "Spanish" },
  { value: "Korean", label: "Korean" },
  { value: "Vietnamese", label: "Vietnamese" },
  { value: "Turkish", label: "Turkish" },
  { value: "British", label: "British" },
  { value: "Caribbean", label: "Caribbean" },
  { value: "Moroccan", label: "Moroccan" },
  { value: "Ethiopian", label: "Ethiopian" },
];

export const totalTime = [
  { value: "UNDER_15", label: "Under 15 mins", icon: Clock },
  { value: "BETWEEN_15_AND_30", label: "15–30 mins", icon: Clock },
  { value: "BETWEEN_30_AND_60", label: "30–60 mins", icon: Clock },
  { value: "OVER_60", label: "Over 60 mins", icon: Clock },
];

export const difficulties = [
  { value: "beginner", label: "Beginner", icon: Leaf },
  { value: "intermediate", label: "Intermediate", icon: ChefHat },
  { value: "advanced", label: "Advanced", icon: Flame },
];

export const mealTypes = [
  { value: "breakfast", label: "Breakfast", icon: Croissant },
  { value: "lunch", label: "lunch", icon: Sandwich },
  { value: "dinner", label: "Dinner", icon: Pizza },
  { value: "snack", label: "Snack", icon: Apple },
  { value: "dessert", label: "Dessert", icon: Candy },
];

export const dietaryPreferences = [
  { value: "vegetarian", label: "Vegetarian", icon: Leaf },
  { value: "vegan", label: "Vegan", icon: Leaf },
  { value: "gluten-free", label: "Gluten-Free", icon: Wheat },
  { value: "keto", label: "Keto", icon: Zap },
  { value: "pescatarian", label: "Pescatarian", icon: Fish },
  { value: "paleo", label: "Paleo", icon: Drumstick },
  { value: "low-carb", label: "Low Carb", icon: Sparkles },
  { value: "dairy-free", label: "Dairy-Free", icon: Milk },
];
