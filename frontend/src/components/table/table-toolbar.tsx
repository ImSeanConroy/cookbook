"use client";

import { X } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useRecipes } from "@/context/recipe-context";
import ThemeToggle from "@/components/other/theme-toggle";
import { TableFilter } from "@/components/table/table-filter";
import {
  cuisines,
  cookTime,
  difficulties,
  mealTypes,
  dietaryPreferences,
} from "@/components/table/filters";
import { useEffect, useState } from "react";
import { useModal } from "@/context/modal-context";
import { config } from "@/config";

export function TableToolbar() {
  const { filters, setFilters } = useRecipes();
  const { onOpen } = useModal();
  const [searchValue, setSearchValue] = useState(filters.query ?? "");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFilters((prev) => ({
        ...prev,
        page: 1,
        query: searchValue || undefined,
      }));
    }, 400);

    return () => clearTimeout(timeout);
  }, [searchValue, setFilters]);

  const hasActiveFilters =
    filters.query ||
    filters.cuisine?.length ||
    filters.difficulty?.length ||
    filters.mealTypes?.length ||
    filters.dietaryPreferences?.length ||
    filters.cookTime?.length;

  const handleReset = () => {
    setSearchValue("");
    setFilters((prev) => ({
      page: 1,
      limit: prev.limit,
    }));
  };

  return (
    <div className="flex items-center justify-between gap-4 flex-wrap">
      <div className="flex flex-wrap gap-2">
        <TableFilter title="Cuisine" filterKey="cuisine" options={cuisines} />

        <TableFilter
          title="Cook Time"
          filterKey="cookTime"
          options={cookTime}
        />

        <TableFilter
          title="Difficulty"
          filterKey="difficulty"
          options={difficulties}
        />

        <TableFilter
          title="Meal Type"
          filterKey="mealTypes"
          options={mealTypes}
        />

        <TableFilter
          title="Dietary Preference"
          filterKey="dietaryPreferences"
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

      <div className="flex items-center gap-2">
        <Input
          placeholder="Search recipes..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="h-8 w-[250px]"
        />
        <ThemeToggle />
        {config.READ_ONLY == false && (
          <Button
            size="sm"
            className="cursor-pointer"
            onClick={() => onOpen("createRecipe")}
          >
            Create Recipe
          </Button>
        )}
      </div>
    </div>
  );
}
