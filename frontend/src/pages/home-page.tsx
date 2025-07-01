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
    <div>
      <h1>Recipes</h1>
      <div>
        {recipes.map((recipe) => (
          <div key={recipe.id}>
            <Link to={`/recipe/${recipe.id}`}>
              <h2>{recipe.title}</h2>
              <img
                src={recipe.imageUrl}
                alt={recipe.title}
                width="300"
                height="200"
              />
            </Link>
            <p>{recipe.description}</p>
            <p>Total Time: {recipe.prepTime + recipe.cookTime} minutes</p>
            <p>Servings: {recipe.servings}</p>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
