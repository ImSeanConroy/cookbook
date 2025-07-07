import { useState, useEffect } from "react";
import { config } from "@/config";
import type { RecipeSummary } from "@/types/recipe";

export const useRecipes = (limit: number) => {
  const [recipes, setRecipes] = useState<RecipeSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setIsLoading(true);
    fetch(`${config.BASE_URL}/api/recipe?page=${currentPage}&limit=${limit}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch recipes");
        return res.json();
      })
      .then((json) => {
        setRecipes(json.recipes);
        setTotalPages(json.totalPages || 1);
        setError(null);
      })
      .catch((err) => {
        setError(err.message || "Unknown error");
        setRecipes([]);
      })
      .finally(() => setIsLoading(false));
  }, [currentPage, limit]);

  return {
    recipes,
    isLoading,
    error,
    currentPage,
    totalPages,
    setCurrentPage,
  };
};
