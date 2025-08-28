import type { FilterProps } from "@/types/filter";

export const recipeFilters: FilterProps[] = [
  {
    label: "Difficulty",
    name: "difficulty",
    defaultValue: "All Levels",
    options: [
      { label: "All Levels", value: "any" },
      { label: "Beginner", value: "beginner" },
      { label: "Intermediate", value: "intermediate" },
      { label: "Advanced", value: "advanced" },
    ],
  },
  {
    label: "Cuisine",
    name: "cuisine",
    defaultValue: "All Cuisines",
    options: [
      { label: "All Cuisines", value: "any" },
      { label: "Italian", value: "italian" },
      { label: "Indian", value: "indian" },
      { label: "Mexican", value: "mexican" },
      { label: "Japanese", value: "japanese" },
    ],
  },
  {
    label: "Cook Time",
    name: "cookTime",
    defaultValue: "Any",
    options: [
      { label: "Any", value: "any" },
      { label: "Under 15 minutes", value: "under15" },
      { label: "15–30 minutes", value: "15to30" },
      { label: "30–60 minutes", value: "30to60" },
      { label: "Over 60 minutes", value: "over60" },
    ],
  },
];

export const sortOptions: FilterProps[] = [
  {
    label: "Sort By",
    name: "sortBy",
    defaultValue: "Newest",
    options: [
      { label: "Newest", value: "newest" },
      { label: "Oldest", value: "oldest" },
      { label: "Alphabetical (A–Z)", value: "az" },
      { label: "Alphabetical (Z–A)", value: "za" },
    ],
  },
  {
    label: "Results Per Page",
    name: "limit",
    defaultValue: "12",
    options: [
      { label: "8", value: "8" },
      { label: "12", value: "12" },
      { label: "24", value: "24" },
      { label: "48", value: "48" },
    ],
  },
] as const;
