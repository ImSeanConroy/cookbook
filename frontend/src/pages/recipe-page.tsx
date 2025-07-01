import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type DifficultyLevel = "easy" | "medium" | "hard" | "intermediate";

interface Ingredient {
  name: string;
  quantity: string;
}

interface Recipe {
  id: string;
  title: string;
  description: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty: DifficultyLevel;
  cuisine: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  ingredients: Ingredient[];
  steps: string[];
}

const RecipePage = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    fetch(`http://localhost:8000/api/recipe/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((json) => {
        setData(json.recipe);
        setError(null);
      })
      .catch((err) => {
        setError(err.message || "Something went wrong");
        setData(null);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading recipe...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!data) return <p>No recipe found.</p>;

  return (
    <div>
      <h1>{data.title}</h1>
      <img src={data.imageUrl} alt={data.title} style={{ width: "300px" }} />
      <p>{data.description}</p>
      <p><strong>Prep Time:</strong> {data.prepTime} min</p>
      <p><strong>Cook Time:</strong> {data.cookTime} min</p>
      <p><strong>Servings:</strong> {data.servings}</p>
      <p><strong>Difficulty:</strong> {data.difficulty}</p>
      <p><strong>Cuisine:</strong> {data.cuisine}</p>

      <h2>Ingredients</h2>
      <ul>
        {data.ingredients.map((ingredient, i) => (
          <li key={i}>
             {ingredient.name} {ingredient.quantity}
          </li>
        ))}
      </ul>

      <h2>Steps</h2>
      <ol>
        {data.steps.map((step, i) => (
          <li key={i}>{step}</li>
        ))}
      </ol>
    </div>
  );
};

export default RecipePage