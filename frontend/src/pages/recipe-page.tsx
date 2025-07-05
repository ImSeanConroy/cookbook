import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import RecipeHeader from "@/components/ui/recipe-header";
import RecipeInfoBar from "@/components/ui/recipe-info-bar";
import IngredientsList from "@/components/ui/Ingredients-list";
import InstructionSteps from "@/components/ui/instruction-steps";
import type { Recipe } from "@/types/recipe";
import { config } from "@/config";
import RecipeCard from "@/components/ui/recipe-card";

const RecipePage = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    fetch(`${config.BASE_URL}/api/recipe/${id}`)
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
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-6">
        <RecipeHeader title={data.title} />
        <RecipeInfoBar data={data} />
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-7/10 w-full flex flex-col gap-10">
          <p className="text-zinc-500 leading-6.5">{data.description}</p>
          <IngredientsList ingredients={data.ingredients} />
          <InstructionSteps steps={data.steps} />
        </div>

        <div className="lg:w-3/10 w-full flex flex-col gap-6">
          <div className="px-10 py-10 bg-neutral-100 rounded-2xl h-[450px] flex flex-col justify-end"></div>

          <div className="gap-6 items-center bg-neutral-100 p-6 md:p-8 rounded-2xl">
            <h2 className="text-2xl mb-3 font-semibold">
              Nutritional information
            </h2>
            <ul className="columns-1 md:columns-2 gap-4">
              <li className="py-1 text-zinc-500">Test</li>
              <li className="py-1 text-zinc-500">Test</li>
              <li className="py-1 text-zinc-500">Test</li>
              <li className="py-1 text-zinc-500">Test</li>
            </ul>
          </div>

          <div className="gap-6 items-center bg-neutral-100 p-6 md:p-8 rounded-2xl">
            <h2 className="text-2xl mb-3 font-semibold">Utensils</h2>
            <ul className="columns-1 md:columns-2 gap-4">
              <li className="py-1 text-zinc-500">Test</li>
              <li className="py-1 text-zinc-500">Test</li>
              <li className="py-1 text-zinc-500">Test</li>
              <li className="py-1 text-zinc-500">Test</li>
            </ul>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-4xl mb-5 font-semibold">
          Related <span className="text-lime-500">Recipes</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-4 gap-6">
          <RecipeCard id="1" title="Chicken and Bacon Pie" imageUrl="" />
          <RecipeCard id="1" title="Chicken and Bacon Pie" imageUrl="" />
          <RecipeCard id="1" title="Chicken and Bacon Pie" imageUrl="" />
          <RecipeCard id="1" title="Chicken and Bacon Pie" imageUrl="" />
        </div>
      </div>
    </div>
  );
};

export default RecipePage;
