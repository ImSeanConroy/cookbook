import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  IoEarthOutline,
  IoPersonOutline,
  IoTimeOutline,
  IoFastFoodOutline,
  IoStarOutline,
} from "react-icons/io5";

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
    <div className="flex flex-col gap-12 px-16">
      <div className="px-10 py-10 bg-zinc-100 rounded-3xl h-[350px] flex flex-col justify-end">
        <div>
        <p>Let's Cook</p>
        <h1 className="text-5xl font-semibold">{data.title}</h1>
        </div>
      </div>

      {/* <img src={data.imageUrl} alt={data.title} style={{ width: "300px" }} /> */}

      <div className="flex flex-row justify-between pr-6">
        <div className="flex flex-row gap-3 items-center">
          <div className="rounded-full bg-zinc-100 text-zinc-600 p-3 text-2xl">
            <IoEarthOutline />
          </div>
          <div>
            <p className="text-zinc-500">Cuisine</p>
            <p className="font-bold text-lg">{data.cuisine} Food</p>
          </div>
        </div>
        <div className="flex flex-row gap-3 items-center">
          <div className="rounded-full bg-zinc-100 text-zinc-600 p-3 text-xl">
            <IoPersonOutline />
          </div>
          <div>
            <p className="text-zinc-500">Servings</p>
            <p className="font-bold text-lg">{data.servings} Persons</p>
          </div>
        </div>
        <div className="flex flex-row gap-3 items-center">
          <div className="rounded-full bg-zinc-100 text-zinc-600 p-3 text-xl">
            <IoTimeOutline />
          </div>
          <div>
            <p className="text-zinc-500">Prep Time</p>
            <p className="font-bold text-lg">{data.prepTime} minutes</p>
          </div>
        </div>

        <div className="flex flex-row gap-3 items-center">
          <div className="rounded-full bg-zinc-100 text-zinc-600 p-3 text-xl">
            <IoFastFoodOutline />
          </div>
          <div>
            <p className="text-zinc-500">Cook Time</p>
            <p className="font-bold text-lg">{data.cookTime} minutes</p>
          </div>
        </div>

        <div className="flex flex-row gap-3 items-center">
          <div className="rounded-full bg-zinc-100 text-zinc-600 p-3 text-xl">
            <IoStarOutline />
          </div>
          <div>
            <p className="text-zinc-500">Difficulty</p>
            <p className="font-bold text-lg">
              {data.difficulty.charAt(0).toUpperCase() +
                data.difficulty.slice(1).toLowerCase()}{" "}
              Level
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-x-8 gap-y-12">
        {/* Right column: 2/3 width */}
        <div className="w-2/3 flex flex-col gap-12">
          <p className="text-zinc-500 leading-6.5">{data.description}</p>

          <div className="gap-6 items-center bg-zinc-100 p-8 rounded-2xl">
            <h2 className="text-2xl mb-3 font-semibold">Ingredients</h2>
            <ul className="columns-2 gap-4">
              {data.ingredients.map((ingredient, i) => (
                <li key={i} className="py-1">
                  {ingredient.name} {ingredient.quantity}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-3xl mb-5 font-semibold">
              Cooking <span className="text-zinc-400">Instructions</span>
            </h2>
            {data.steps.map((step, i) => (
              <div
                key={i}
                className="flex flex-row gap-6 items-center bg-zinc-100 p-8 rounded-2xl mb-4"
              >
                <p className="text-3xl font-semibold text-zinc-400">
                  {(i + 1).toString().padStart(2, "0")}
                </p>
                <p>{step}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="w-1/3 flex flex-col gap-8">
          <div className="px-10 py-10 bg-zinc-100 rounded-2xl h-[250px] flex flex-col justify-end"></div>
          <div className="px-10 py-10 bg-zinc-100 rounded-2xl h-[450px] flex flex-col justify-end"></div>
        </div>
      </div>
    </div>
  );
};

export default RecipePage;
