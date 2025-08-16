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
    label: "Cook Time",
    name: "time",
    defaultValue: "Any",
    options: [
      "Any",
      "Under 15 minutes",
      "15–30 minutes",
      "30–60 minutes",
      "Over 60 minutes",
    ],
  },
];

export const sortOptions = [
  {
    label: "Sort By",
    name: "sortBy",
    defaultValue: "Newest",
    options: ["Newest",
    "Oldest",
    "Alphabetical (A–Z)",
    "Alphabetical (Z–A)",],
  },
  {
    label: "Results Per Page",
    name: "perPage",
    defaultValue: "12",
    options: ["8", "12", "24", "48"],
  },
];
