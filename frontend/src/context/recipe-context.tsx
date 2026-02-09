"use client";

import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

import { config } from "@/config";
import type { RecipeSummary } from "@/types/recipe";

type RecipesContextType = {
  recipe: string | null;
  setCurrentRecipe: (recipeId: string | null) => void;
  recipes: RecipeSummary[];
  isLoading: boolean;
  error: string | null;
};

const RecipesContext = createContext<RecipesContextType | undefined>(undefined);

export const RecipesProvider = ({ children }: { children: ReactNode }) => {
  const [recipe, setRecipe] = useState<string | null>(null);
  const [recipes, setRecipes] = useState<RecipeSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isCancelled = false;

    const fetchAllRecipes = async () => {
      setIsLoading(true);
      let allRecipes: RecipeSummary[] = [];
      let currentPage = 1;
      let totalPages = 1;

      try {
        do {
          const res = await fetch(
            `${config.BASE_URL}/api/recipe?page=${currentPage}&limit=12`
          );
          if (!res.ok) throw new Error("Failed to fetch recipes");

          const json = await res.json();
          allRecipes = allRecipes.concat(json.recipes || []);
          totalPages = json.totalPages || 1;
          currentPage += 1;
        } while (currentPage <= totalPages && !isCancelled);

        if (!isCancelled) {
          setRecipes(allRecipes);
          setError(null);
        }
      } catch (err: any) {
        if (!isCancelled) {
          setError(err.message || "Something went wrong. Please try again.");
          setRecipes([]);
        }
      } finally {
        if (!isCancelled) setIsLoading(false);
      }
    };

    fetchAllRecipes();

    return () => {
      isCancelled = true;
    };
  }, []);

  const setCurrentRecipe = (recipeId: string | null) => {
    setRecipe(recipeId);
  };

  return (
    <RecipesContext.Provider
      value={{
        recipe,
        setCurrentRecipe,
        recipes,
        isLoading,
        error,
      }}
    >
      {children}
    </RecipesContext.Provider>
  );
};

export const useRecipes = () => {
  const context = useContext(RecipesContext);
  if (!context) {
    throw new Error(
      "useRecipes must be used inside RecipesProvider"
    );
  }
  return context;
};
