
import FilterGroup from "@/components/ui/filter-group";
import FilterResetButton from "@/components/ui/filter-reset-button";
import { recipeFilters, sortOptions } from "@/constants/filters";

import { useState } from "react";

const FilterSection = () => {
  const [showFilters, setShowFilters] = useState(false);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <>
      <div className="p-5 bg-zinc-100 dark:bg-zinc-900 rounded-2xl hidden md:grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <FilterGroup filters={recipeFilters} />
        <div className="hidden xl:flex flex-row justify-end">
          <FilterResetButton />
        </div>
        <FilterGroup filters={sortOptions} />
        <div className="flex xl:hidden flex-row justify-start pt-4 md:pt-0">
          <FilterResetButton />
        </div>
      </div>

      <div className="md:hidden p-5 bg-zinc-100 dark:bg-zinc-900 rounded-2xl">
        <div className="flex flex-row gap-2">
          <button
            onClick={toggleFilters}
            className="flex-1 items-center justify-between px-4 py-3 rounded-lg cursor-pointer text-sm bg-zinc-800 hover:bg-zinc-600 dark:bg-zinc-800 text-white"
          >
            {showFilters ? "Hide Filters Options" : "Show Filters Options"}
          </button>

          <FilterResetButton />
        </div>
        {showFilters && (
          <div className="mt-8 flex flex-col gap-4">
            <FilterGroup filters={recipeFilters} />
            <div className="hidden xl:flex flex-row justify-end">
              <FilterResetButton />
            </div>
            <FilterGroup filters={sortOptions} />
          </div>
        )}
      </div>
    </>
  );
};

export default FilterSection;
