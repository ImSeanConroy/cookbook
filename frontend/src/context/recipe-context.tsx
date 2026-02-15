"use client";

import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { config } from "@/config";
import type { RecipeSummaryType } from "@/types/recipe";

type Filters = {
  page: number;
  limit: number;
  query?: string;
  cuisine?: string[];
  difficulty?: string[];
  mealTypes?: string[];
  dietaryPreferences?: string[];
  cookTime?: string[];
};

type RecipesContextType = {
  recipes: RecipeSummaryType[];
  isLoading: boolean;
  error: string | null;
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  totalPages: number;
  totalCount: number;
};

const RecipesContext = createContext<RecipesContextType | undefined>(undefined);

export const RecipesProvider = ({ children }: { children: ReactNode }) => {
  const [recipes, setRecipes] = useState<RecipeSummaryType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const [filters, setFilters] = useState<Filters>({
    page: 1,
    limit: 12,
  });

  useEffect(() => {
    const controller = new AbortController();

    const fetchRecipes = async () => {
      setIsLoading(true);

      try {
        const params = new URLSearchParams();

        Object.entries(filters).forEach(([key, value]) => {
          if (!value) return;

          if (Array.isArray(value)) {
            if (value.length > 0) {
              params.append(key, value.join(","));
            }
          } else {
            params.append(key, String(value));
          }
        });

        const res = await fetch(
          `${config.BASE_URL}/api/recipe?${params.toString()}`,
          { signal: controller.signal }
        );

        if (!res.ok) throw new Error("Failed to fetch recipes");

        const json = await res.json();

        setRecipes(json.recipes || []);
        setTotalPages(json.totalPages || 1);
        setTotalCount(json.recipeCount || 0);
        setError(null);
      } catch (err: any) {
        if (err.name !== "AbortError") {
          setError(err.message || "Something went wrong.");
          setRecipes([]);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipes();

    return () => controller.abort();
  }, [filters]);

  return (
    <RecipesContext.Provider
      value={{ recipes, isLoading, error, filters, setFilters, totalPages, totalCount }}
    >
      {children}
    </RecipesContext.Provider>
  );
};

export const useRecipes = () => {
  const context = useContext(RecipesContext);
  if (!context) {
    throw new Error("useRecipes must be used inside RecipesProvider");
  }
  return context;
};
