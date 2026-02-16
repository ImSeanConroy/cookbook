"use client";

import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { config } from "@/config";
import type { RecipeSummaryType } from "@/types/recipe";
import axios from "axios";

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
  deleteRecipe: (recipeId: string) => void;
};

const baseURL = "http://localhost:8000/api";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = baseURL;

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
    fetchRecipes();
    return () => controller.abort();
  }, [filters]);

  const controller = new AbortController();

  /**
   * Fetch all recipe
   */
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
        { signal: controller.signal },
      );

      if (!res.ok) throw new Error("Failed to fetch recipes");

      const json = await res.json();

      setRecipes(json.recipes || []);
      setTotalPages(json.meta.totalPages || 1);
      setTotalCount(json.meta.totalItems || 0);
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

  /**
   * Delete a recipe
   */
  const deleteRecipe = async (recipeId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      await axios.delete(`/recipe/${recipeId}`);
      await fetchRecipes();
    } catch (err: any) {
      setError(err);
      console.log(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <RecipesContext.Provider
      value={{
        recipes,
        isLoading,
        error,
        filters,
        setFilters,
        totalPages,
        totalCount,
        deleteRecipe,
      }}
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
