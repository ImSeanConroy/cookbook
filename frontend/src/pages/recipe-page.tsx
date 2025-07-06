import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import RecipeHeader from "@/components/ui/recipe-header";
import RecipeInfoBar from "@/components/ui/recipe-info-bar";
import IngredientsList from "@/components/ui/Ingredients-list";
import InstructionSteps from "@/components/ui/instruction-steps";
import RecipeCard from "@/components/ui/recipe-card";

import type { Recipe, RecipeSummary } from "@/types/recipe";
import { config } from "@/config";

const RecipePage = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<Recipe | null>(null);
  const [relatedRecipes, setRelatedRecipes] = useState<RecipeSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch the main recipe data
  useEffect(() => {
    if (!id) return;

    const fetchRecipe = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`${config.BASE_URL}/api/recipe/${id}`);
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        const json = await res.json();
        setData(json.recipe);
        setError(null);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
        setData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  // Fetch related recipes, excluding the current recipe by ID
  useEffect(() => {
    if (!id) return;

    const fetchRelated = async () => {
      try {
        const res = await fetch(
          `${config.BASE_URL}/api/recipe?limit=4&exclude=${id}`
        );
        if (!res.ok) throw new Error("Failed to fetch related recipes");
        const json = await res.json();
        setRelatedRecipes(json.recipes || []);
      } catch (err) {
        console.error("Related recipes error:", err);
      }
    };

    fetchRelated();
  }, [id]);

  if (isLoading) return <p>Loading recipe...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!data) return <p>No recipe found.</p>;

  const sidebarSections = [
    {
      title: "Nutritional information",
      items: ["Test", "Test", "Test", "Test"],
    },
    {
      title: "Utensils",
      items: ["Test", "Test", "Test", "Test"],
    },
  ];

  return (
    <div className="flex flex-col gap-12">
      {/* Header and Info */}
      <div className="flex flex-col gap-6">
        <RecipeHeader title={data.title} />
        <RecipeInfoBar data={data} />
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Section */}
        <div className="lg:w-7/10 w-full flex flex-col gap-10">
          <p className="text-zinc-500 leading-6.5">{data.description}</p>
          <IngredientsList ingredients={data.ingredients} />
          <InstructionSteps steps={data.steps} />
        </div>

        {/* Right Section */}
        <div className="lg:w-3/10 w-full flex flex-col gap-6">
          <div className="px-10 py-10 bg-neutral-100 rounded-2xl h-[450px] flex flex-col justify-end" />

          {sidebarSections.map(({ title, items }) => (
            <div
              key={title}
              className="gap-6 items-center bg-neutral-100 p-6 md:p-8 rounded-2xl"
            >
              <h2 className="text-2xl mb-3 font-semibold">{title}</h2>
              <ul className="columns-1 md:columns-2 gap-4">
                {items.map((item, idx) => (
                  <li key={idx} className="py-1 text-zinc-500">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Related Recipes */}
      <div>
        <h2 className="text-4xl mb-5 font-semibold">
          Related <span className="text-lime-500">Recipes</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedRecipes.map(
            ({ id, title, imageUrl, difficulty, cuisine, cookTime, prepTime }) => (
        <RecipeCard
          key={id}
          id={id}
          title={title}
          imageUrl={imageUrl}
          difficulty={difficulty}
          cuisine={cuisine}
          time={prepTime + cookTime}
        />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipePage;
