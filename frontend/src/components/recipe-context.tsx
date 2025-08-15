import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import type { ReactNode } from "react";
import { config } from "@/config";
import type { RecipeSummary } from "@/types/recipe";

type RecipesContextType = {
  recipes: RecipeSummary[];
  isLoading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
  query: string;
  setQuery: (query: string) => void;
  limit: number;
  setLimit: (limit: number) => void;
};

const RecipesContext = createContext<RecipesContextType | undefined>(undefined);

export const RecipesProvider = ({ children }: { children: ReactNode }) => {
  const [recipes, setRecipes] = useState<RecipeSummary[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [limit, setLimit] = useState(12);

  useEffect(() => {
    setCurrentPage(1);
  }, [query]);

  useEffect(() => {
    setIsLoading(true);

    const searchParams = new URLSearchParams({
      page: currentPage.toString(),
      limit: limit.toString(),
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
        setError(null);
      })
      .catch((err) => {
        setError(err.message || "Unknown error");
        setRecipes([]);
      })
      .finally(() => setIsLoading(false));
  }, [currentPage, limit, query]);

  return (
    <RecipesContext.Provider
      value={{
        recipes,
        isLoading,
        error,
        currentPage,
        totalPages,
        setCurrentPage,
        query,
        setQuery,
        limit,
        setLimit,
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
