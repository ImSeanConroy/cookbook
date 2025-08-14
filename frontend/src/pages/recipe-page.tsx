import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import RecipeHeader from "@/components/ui/recipe-header";
import RecipeInfoBar from "@/components/ui/recipe-info-bar";
import IngredientsList from "@/components/ui/Ingredients-list";
import InstructionSteps from "@/components/ui/instruction-steps";
import RecipeCard from "@/components/ui/recipe-card";

import type { Recipe, RecipeSummary } from "@/types/recipe";
import { config } from "@/config";
import { getRandomImageUrl } from "@/lib/images";
import RecipeImage from "@/components/ui/recipe-image";
import UtensilsList from "@/components/ui/utentils-list";
import NutritionalList from "@/components/ui/nutritional-list";

const RecipePage = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<Recipe | null>(null);
  const [relatedRecipes, setRelatedRecipes] = useState<RecipeSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Something went wrong");
        }
        setData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

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

  const words = data.title.trim().split(" ");
  const highlightIndex = words.length >= 2 ? words.length - 2 : -1;

  return (
    <div className="flex flex-col gap-12">
      {/* Header and Info */}
      <div className="flex flex-col gap-6">
        <RecipeHeader position="bottom">
          <h1 className="text-4xl sm:text-5xl font-semibold dark:text-white pb-2">
            {words.map((word, index) => (
              <span
                key={index}
                className={index === highlightIndex ? "text-lime-500" : ""}
              >
                {word + " "}
              </span>
            ))}
          </h1>
          <p className="text-2xl font-normal text-zinc-800 dark:text-white">{data.subtitle}</p>
        </RecipeHeader>
        <RecipeInfoBar data={data} />
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Section */}
        <div className="lg:w-7/10 w-full flex flex-col gap-10">
          <p className="text-zinc-500 leading-6.5 pb-12 md:pb-16">{data.description}</p>
          <IngredientsList ingredients={data.ingredients} />
          <InstructionSteps steps={data.steps} />
        </div>

        {/* Right Section */}
        <div className="lg:w-3/10 w-full flex flex-col gap-6">
          <RecipeImage image={data.cardImageUrl != "" ? data.cardImageUrl : getRandomImageUrl()} />
          <NutritionalList
            nutrition={{
              calories: "320 kcal",
              protein: "15g",
              carbs: "45g",
              sugars: "12g",
              fiber: "5g",
              fat: "10g",
              saturatedFat: "3g",
              transFat: "0g",
              cholesterol: "30mg",
              sodium: "250mg",
              potassium: "400mg",
              calcium: "80mg",
              iron: "2.5mg",
              vitaminD: "2mcg",
            }}
          />
          <UtensilsList utensils={["Spatula", "Whisk", "Bowl", "Knife"]} />
        </div>
      </div>

      {/* Related Recipes */}
      <div>
        <h2 className="text-4xl mb-5 font-semibold dark:text-white">
          Related <span className="text-lime-500">Recipes</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedRecipes.map(
            ({
              id,
              title,
              subtitle,
              cardImageUrl,
              difficulty,
              cuisine,
              cookTime,
              prepTime,
            }) => (
              <RecipeCard
                key={id}
                id={id}
                title={title}
                subtitle={subtitle}
                imageUrl={cardImageUrl}
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
