"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { Recipe } from "./schema";

export const columns: ColumnDef<Recipe>[] = [
  {
    accessorKey: "id",
  },
  {
    accessorKey: "title",
  },
  {
    accessorKey: "subtitle",
  },
  {
    accessorKey: "cuisine",
    filterFn: (row, id, value: string[]) => value.includes(row.getValue(id)),
  },
  {
    accessorKey: "cookTime",
  },
  {
    accessorKey: "prepTime",
  },
  {
    accessorKey: "totalTime",
    accessorFn: (row) => {
      const totalTime = (row.cookTime ?? 0) + (row.prepTime ?? 0)
      if (totalTime < 15) return "UNDER_15"
      if (totalTime <= 30) return "BETWEEN_15_AND_30"
      return "OVER_30"
    },
    filterFn: (row, id, value: string[]) => value.includes(row.getValue(id)),
  },
  {
    accessorKey: "difficulty",
    filterFn: (row, id, value: string[]) => value.includes(row.getValue(id)),
  },
  {
    accessorKey: "mealType",
    filterFn: (row, id, value: string[]) => value.includes(row.getValue(id)),
  },
  {
    accessorKey: "dietaryPreference",
    filterFn: (row, id, value: string[]) => value.includes(row.getValue(id)),
  },
  {
    accessorKey: "imageUrl",
    filterFn: (row, id, value: string[]) => value.includes(row.getValue(id)),
  },
];
