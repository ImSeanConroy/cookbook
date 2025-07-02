import RecipeGrid from "@/components/ui/recipe-grid";
import { config } from "@/config";
import type { RecipeSummary } from "@/types/recipe";
import { useEffect, useState } from "react";

const HomePage = () => {
  const [recipes, setRecipes] = useState<RecipeSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${config.BASE_URL}/api/recipe`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch recipes");
        return res.json();
      })
      .then((json) => {
        setRecipes(json.recipes);
        setError(null);
      })
      .catch((err) => {
        setError(err.message || "Unknown error");
        setRecipes([]);
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (recipes.length === 0) return <p>No recipes found.</p>;

  return (
    <div className="flex flex-col gap-6">
      <div className="p-6 lg:p-10 bg-zinc-100 rounded-3xl h-[450px] flex flex-col justify-center">
        <p className="text-zinc-500">Let's Cook</p>
        <h1 className="text-4xl sm:text-5xl font-semibold">All your <span className="text-lime-500">recipes</span> in one place</h1>
      </div>

      <RecipeGrid recipes={recipes} />
    </div>

  );
};

export default HomePage;
