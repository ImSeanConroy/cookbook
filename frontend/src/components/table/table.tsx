"use client";

import RecipeCard from "@/components/other/recipe-card";
import { useRecipes } from "../../context/recipe-context";
import { TableToolbar } from "./table-toolbar";
import { TablePagination } from "./table-pagination";
import InfoState from "../other/info-state";
import { Loader2, AlertCircle } from "lucide-react";

export function Table() {
  const { recipes, isLoading, error } = useRecipes();

  return (
    <div className="flex min-h-[80vh] flex-col gap-6">
      <TableToolbar />

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
          description="Something went wrong while fetching recipes."
          Icon={AlertCircle}
        />
      )}

      {!isLoading && !error && recipes.length === 0 && <InfoState />}

      {recipes.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} {...recipe} />
          ))}
        </div>
      )}

      <div className="mt-auto pt-4">
        <TablePagination />
      </div>
    </div>
  );
}
