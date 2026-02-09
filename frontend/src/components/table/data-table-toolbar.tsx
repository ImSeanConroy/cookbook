"use client";

import type { Table } from "@tanstack/react-table";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  cuisines,
  totalTime,
  difficulties,
  mealTypes,
  dietaryPreferences,
} from "./data";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import ThemeToggle from "../ui/theme-toggle";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center gap-2">
        {table.getColumn("cuisine") && (
          <DataTableFacetedFilter
            column={table.getColumn("cuisine")}
            title="Cuisine"
            options={cuisines}
          />
        )}

        {table.getColumn("totalTime") && (
          <DataTableFacetedFilter
            column={table.getColumn("totalTime")}
            title="Cook Time"
            options={totalTime}
          />
        )}

        {table.getColumn("difficulty") && (
          <DataTableFacetedFilter
            column={table.getColumn("difficulty")}
            title="Difficulty"
            options={difficulties}
          />
        )}

        {table.getColumn("dietaryPreference") && (
          <DataTableFacetedFilter
            column={table.getColumn("dietaryPreference")}
            title="Dietary Preference"
            options={dietaryPreferences}
          />
        )}

        {table.getColumn("mealType") && (
          <DataTableFacetedFilter
            column={table.getColumn("mealType")}
            title="Meal Type"
            options={mealTypes}
          />
        )}

        {isFiltered && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => table.resetColumnFilters()}
          >
            Reset <X />
          </Button>
        )}
      </div>

      <div className="flex items-center gap-2">
        <Input
          placeholder="Search recipes..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        <ThemeToggle />
      </div>
    </div>
  );
}
