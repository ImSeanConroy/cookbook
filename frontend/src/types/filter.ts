export interface FilterOption {
  label: string;
  value: string;
}

export interface FilterProps {
  label: string;
  name: "difficulty" | "cuisine" | "cookTime" | "sortBy" | "limit";
  defaultValue: string;
  options: FilterOption[];
}
