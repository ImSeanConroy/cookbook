"use client";

import { Input } from "@/components/ui/input";
import { useRecipes } from "../../context/recipe-context";
import { cuisines, totalTime, difficulties, mealTypes, dietaryPreferences } from "./data";
import { TableFilter } from "./table-filter";
import { Button } from "../ui/button";
import { X } from "lucide-react";

export function TableToolbar() {
  const { filters, setFilters } = useRecipes();

  const hasActiveFilters =
    filters.query ||
    filters.cuisine?.length ||
    filters.difficulty?.length ||
    filters.mealType?.length ||
    filters.dietaryPreference?.length ||
    filters.totalTime?.length;

  const handleReset = () => {
    setFilters((prev) => ({
      page: 1,
      limit: prev.limit, // keep current page size
    }));
  };

  return (
    <div className="flex items-center justify-between gap-4 flex-wrap">
      <div className="flex flex-wrap gap-2">

        <TableFilter
          title="Cuisine"
          filterKey="cuisine"
          options={cuisines}
        />

        <TableFilter
          title="Cook Time"
          filterKey="totalTime"
          options={totalTime}
        />

        <TableFilter
          title="Difficulty"
          filterKey="difficulty"
          options={difficulties}
        />

        <TableFilter
          title="Meal Type"
          filterKey="mealType"
          options={mealTypes}
        />

        <TableFilter
          title="Dietary Preference"
          filterKey="dietaryPreference"
          options={dietaryPreferences}
        />

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            className="h-8 cursor-pointer"
          >
            Reset
            <X className="ml-1 size-4" />
          </Button>
        )}
      </div>

      <Input
        placeholder="Search recipes..."
        value={filters.query ?? ""}
        onChange={(e) =>
          setFilters((prev) => ({
            ...prev,
            page: 1,
            query: e.target.value || undefined,
          }))
        }
        className="h-8 w-[250px]"
      />
    </div>
  );
}
