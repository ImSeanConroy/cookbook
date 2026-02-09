"use client";

import { useState } from "react";

import {
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import type {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table";

import RecipeCard from "@/components/other/recipe-card";
import { DataTablePagination } from "./data-table-pagination";
import { DataTableToolbar } from "./data-table-toolbar";
import { Loader2, AlertCircle } from "lucide-react";
import { useRecipes } from "../../context/recipe-context";
import InfoState from "../other/info-state";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const { isLoading, error } = useRecipes();

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    initialState: { pagination: { pageSize: 12 } },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  const rows = table.getRowModel().rows;

  return (
    <div className="flex min-h-[80vh] flex-col gap-6">
      <DataTableToolbar table={table} />
      {isLoading && (
        <InfoState
          title="Loading recipes..."
          description="Please wait while we fetch the recipes."
          showButton={false}
          Icon={Loader2}
        />
      )}
      {error && (
        <InfoState
          title="Failed to load recipes"
          description="Something went wrong while fetching recipes. Please try again later."
          Icon={AlertCircle}
        />
      )}
      {!isLoading && !error && rows.length === 0 && <InfoState />}{" "}
      {rows.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {rows.map((row) => (
            <RecipeCard
              key={row.id}
              id={row.id}
              title={row.getValue("title")}
              subtitle={row.getValue("subtitle")}
              imageUrl={row.getValue("imageUrl") || ""}
              difficulty={row.getValue("difficulty") || "intermediate"}
              cuisine={row.getValue("cuisine") || "Unknown"}
              cookTime={row.getValue("cookTime") || 0}
              prepTime={row.getValue("prepTIme") || 0}
              selected={row.getIsSelected()}
            />
          ))}
        </div>
      )}
      <div className="mt-auto pt-4">
        <DataTablePagination table={table} />
      </div>
    </div>
  );
}
