import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import RecipeHeader from "@/components/ui/recipe-header";
import RecipeInfoBar from "@/components/ui/recipe-info-bar";
import IngredientsList from "@/components/ui/Ingredients-list";
import InstructionSteps from "@/components/ui/instruction-steps";
import type { Recipe } from "@/types/recipe";
import { config } from "@/config";

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
    <div className="flex flex-col gap-10 md:gap-12">
      <RecipeHeader title={data.title} />
      <RecipeInfoBar data={data} />
      <div className="flex flex-col lg:flex-row gap-x-8 gap-y-10 md:gap-y-12">
        <div className="lg:w-7/10 w-full flex flex-col gap-10 md:gap-12">
          <p className="text-zinc-500 leading-6.5 pb-6 md:pb-12">{data.description}</p>
          <IngredientsList ingredients={data.ingredients} />
          <InstructionSteps steps={data.steps} />
        </div>

        <div className="lg:w-3/10 w-full flex flex-col gap-8">
          <div className="px-10 py-10 bg-zinc-100 rounded-2xl h-[250px] flex flex-col justify-end"></div>
          <div className="px-10 py-10 bg-zinc-100 rounded-2xl h-[450px] flex flex-col justify-end"></div>
        </div>
      </div>
    </div>
  );
};

export default RecipePage;
