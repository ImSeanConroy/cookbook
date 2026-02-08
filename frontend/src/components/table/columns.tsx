"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

import type { Task } from "./schema";
import { DataTableColumnHeader } from "./data-table-column-header";
// import { DataTableRowActions } from "./data-table-row-actions"

import { dietaryPreferences } from "./data";
import { cuisines, cookTimes, difficulties, mealTypes } from "./data";

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Task" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => row.getValue("title"),
  },
  {
    accessorKey: "subtitle",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => row.getValue("subtitle"),
  },
  {
    accessorKey: "cuisine",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Cuisine" />
    ),
    cell: ({ row }) => {
      const cuisine = cuisines.find((c) => c.value === row.getValue("cuisine"));

      if (!cuisine) return null;

      return (
        <div className="flex items-center gap-2">
          {cuisine.icon && (
            <cuisine.icon className="size-4 text-muted-foreground" />
          )}
          <span>{cuisine.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    accessorKey: "cookTime",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Cook Time" />
    ),
    cell: ({ row }) => {
      const cookTime = cookTimes.find(
        (t) => t.value === row.getValue("cookTime"),
      );

      if (!cookTime) return null;

      return (
        <div className="flex items-center gap-2">
          {cookTime.icon && (
            <cookTime.icon className="size-4 text-muted-foreground" />
          )}
          <span>{cookTime.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    accessorKey: "difficulty",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Difficulty" />
    ),
    cell: ({ row }) => {
      const difficulty = difficulties.find(
        (d) => d.value === row.getValue("difficulty"),
      );

      if (!difficulty) return null;

      return (
        <div className="flex items-center gap-2">
          {difficulty.icon && (
            <difficulty.icon className="size-4 text-muted-foreground" />
          )}
          <span>{difficulty.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    accessorKey: "mealType",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Meal Type" />
    ),
    cell: ({ row }) => {
      const mealType = mealTypes.find(
        (m) => m.value === row.getValue("mealType"),
      );

      if (!mealType) return null;

      return (
        <div className="flex items-center gap-2">
          {mealType.icon && (
            <mealType.icon className="size-4 text-muted-foreground" />
          )}
          <span>{mealType.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    accessorKey: "dietaryPreference",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Dietary Preference" />
    ),
    cell: ({ row }) => {
      const preference = dietaryPreferences.find(
        (m) => m.value === row.getValue("dietaryPreferences"),
      );

      if (!preference) return null;

      return (
        <div className="flex items-center gap-2">
          <span>{preference.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
];
