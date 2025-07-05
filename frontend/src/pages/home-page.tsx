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
      <div className="p-6 lg:p-8 bg-zinc-100 rounded-2xl h-[450px] flex flex-col justify-center">
        <p className="text-zinc-500">Let's Cook</p>
        <h1 className="text-4xl sm:text-5xl font-semibold pb-5">
          All your <span className="text-lime-500">recipes</span> in one place
        </h1>
        <input
          placeholder="Search..."
          className="bg-white rounded-xl text-md px-4 py-3 w-1/2"
        />
      </div>

      <div className="p-5 bg-zinc-100 rounded-2xl flex flex-col md:flex-row gap-5 justify-between">
        <div className="flex flex-row gap-5">
          <div className="bg-zinc-900 rounded-xl">
            <p className="text-white text-sm p-3 px-5">See Complete Recipe</p>
          </div>
          <div className="bg-zinc-900 rounded-xl">
            <p className="text-white text-sm p-3 px-5">See Complete Recipe</p>
          </div>
          <div className="bg-zinc-900 rounded-xl">
            <p className="text-white text-sm p-3 px-5">See Complete Recipe</p>
          </div>
        </div>
        <div className="flex flex-row gap-5">
          <div className="bg-zinc-900 rounded-xl">
            <p className="text-white text-sm p-3 px-5">See Complete Recipe</p>
          </div>
          <div className="bg-zinc-900 rounded-xl">
            <p className="text-white text-sm p-3 px-5">See Complete Recipe</p>
          </div>
        </div>
      </div>
      <RecipeGrid recipes={recipes} />
      <div className="p-5 bg-zinc-100 rounded-2xl flex flex-col md:flex-row gap-5 justify-between">
        <div className="flex flex-row gap-5">
          <div className="bg-zinc-900 rounded-xl">
            <p className="text-white text-sm p-3 px-5">See Complete</p>
          </div>
          <div className="bg-zinc-900 rounded-xl">
            <p className="text-white text-sm p-3 px-5">See Complete</p>
          </div>
        </div>
        <div className="flex flex-row gap-5">
          <div className="bg-zinc-900 rounded-xl">
            <p className="text-white text-sm p-3 px-5">See Complete</p>
          </div>
          <div className="bg-zinc-900 rounded-xl">
            <p className="text-white text-sm p-3 px-5">See Complete</p>
          </div>
                    <div className="bg-zinc-900 rounded-xl">
            <p className="text-white text-sm p-3 px-5">See Complete</p>
          </div>
                    <div className="bg-zinc-900 rounded-xl">
            <p className="text-white text-sm p-3 px-5">See Complete</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
