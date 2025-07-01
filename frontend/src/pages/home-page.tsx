import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface RecipeSummary {
  id: string;
  title: string;
  description: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty: string;
  cuisine: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

const HomePage = () => {
  const [recipes, setRecipes] = useState<RecipeSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:8000/api/recipe")
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
    <div className="flex flex-col gap-10 px-16">
      <div className="px-10 py-10 bg-zinc-100 rounded-3xl h-[350px] flex flex-col justify-center">
        <p>Let's Cook</p>
        <h1 className="text-5xl font-semibold">All your recipes in one place</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 ">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="px-6 py-5 bg-zinc-100 rounded-3xl">
            <Link to={`/recipe/${recipe.id}`} className="flex flex-col gap-5">
              <h2 className="text-4xl font-semibold  flex-grow">{recipe.title}</h2>
              <img
                src={recipe.imageUrl}
                alt={recipe.title}
                className="rounded-2xl bg-zinc-200 w-full h-[450px]"
              />
              <div className="bg-zinc-900 rounded-full">
                <p className="text-white p-3 px-5">See complete recipe</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>

  );
};

export default HomePage;
