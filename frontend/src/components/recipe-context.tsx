import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { config } from "@/config";
import type { RecipeSummary } from "@/types/recipe";

type FiltersType = {
  difficulty: string;
  cuisine: string;
  cookTime: string;
  sortBy: string;
  limit: number;
};

type RecipesContextType = {
  recipes: RecipeSummary[];
  isLoading: boolean;
  error: string | null;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
  totalResults: number;
  query: string;
  setQuery: (query: string) => void;
  filters: FiltersType;
  setFilters: (filters: Partial<FiltersType>) => void;
};

const RecipesContext = createContext<RecipesContextType | undefined>(undefined);

export const RecipesProvider = ({ children }: { children: ReactNode }) => {
  const [recipes, setRecipes] = useState<RecipeSummary[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [filters, setFiltersState] = useState<FiltersType>({
    difficulty: "any",
    cuisine: "any",
    cookTime: "any",
    sortBy: "newest",
    limit: 12,
  });

  const setFilters = (partial: Partial<FiltersType>) => {
    setFiltersState((prev) => ({ ...prev, ...partial }));
    setCurrentPage(1);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [query]);

  useEffect(() => {
    setIsLoading(true);

    const searchParams = new URLSearchParams({
      page: currentPage.toString(),
      limit: filters.limit.toString(),
      difficulty: filters.difficulty,
      cuisine: filters.cuisine,
      cookTime: filters.cookTime,
      sortBy: filters.sortBy,
    });

    if (query.trim()) {
      searchParams.append("query", query.trim());
    }

    fetch(`${config.BASE_URL}/api/recipe?${searchParams.toString()}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch recipes");
        return res.json();
      })
      .then((json) => {
        setRecipes(json.recipes);
        setTotalPages(json.totalPages || 1);
        setTotalResults(json.recipeCount || 1);
        setError(null);
      })
      .catch((err) => {
        setError(err.message || "Something went wrong. Please try again.");
        setRecipes([]);
      })
      .finally(() => setIsLoading(false));
  }, [currentPage, query, filters]);

  return (
    <RecipesContext.Provider
      value={{
        recipes,
        isLoading,
        error,
        currentPage,
        totalPages,
        totalResults,
        setCurrentPage,
        query,
        setQuery,
        filters,
        setFilters,
      }}
    >
      {children}
    </RecipesContext.Provider>
  );
};

export const useRecipesContext = () => {
  const context = useContext(RecipesContext);
  if (!context) {
    throw new Error("useRecipesContext must be used inside RecipesProvider");
  }
  return context;
};
