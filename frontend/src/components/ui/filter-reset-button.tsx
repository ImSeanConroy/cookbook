import { IoCloseCircleOutline } from "react-icons/io5";

import { useRecipesContext } from "@/components/recipe-context";

const FilterResetButton = () => {
  const { query, filters, setFilters, setQuery, setCurrentPage } = useRecipesContext();

  const defaultFilters = {
    query: "",
    difficulty: "any",
    cuisine: "any",
    cookTime: "any",
    sortBy: "newest",
    limit: 12,
  };

  const handleReset = () => {
    setFilters(defaultFilters);
    setQuery("")
    setCurrentPage(1);
  };

  const isDefault =
    query === defaultFilters.query &&
    filters.difficulty === defaultFilters.difficulty &&
    filters.cuisine === defaultFilters.cuisine &&
    filters.cookTime === defaultFilters.cookTime &&
    filters.sortBy === defaultFilters.sortBy &&
    filters.limit === defaultFilters.limit;

  if (isDefault) return null;

  return (
    <div className="flex flex-col justify-end gap-1 text-white dark:text-zinc-200">
      <button
        onClick={handleReset}
        className="inline-flex items-center justify-center w-fit rounded-lg cursor-pointer disabled:opacity-50 bg-zinc-800 hover:bg-zinc-600 dark:bg-zinc-800 p-1"
      >
        <IoCloseCircleOutline className="text-2xl m-1" />
      </button>
    </div>
  );
};

export default FilterResetButton;
