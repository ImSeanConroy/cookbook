// constants/filters.ts
export const recipeFilters = [
  {
    label: "Difficulty",
    name: "difficulty",
    defaultValue: "All Levels",
    options: ["All Levels", "Beginner", "Intermediate", "Advanced"],
  },
  {
    label: "Cuisine",
    name: "cuisine",
    defaultValue: "All Cuisines",
    options: ["All Cuisines", "Italian", "Indian", "Mexican", "Japanese"],
  },
  {
    label: "Dietary",
    name: "dietary",
    defaultValue: "Any",
    options: ["Any", "Vegetarian", "Vegan", "Gluten-Free"],
  },
];

export const sortOptions = [
  {
    label: "Sort By",
    name: "sortBy",
    defaultValue: "Newest",
    options: ["Newest", "Oldest", "Popular", "Rating"],
  },
  {
    label: "Per Page",
    name: "perPage",
    defaultValue: "12",
    options: ["6", "12", "24", "48"],
  },
];
