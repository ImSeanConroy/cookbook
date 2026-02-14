import { useEffect, useState } from "react";
import { LucideClock, LucideFlame, LucideUtensils, User } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { config } from "@/config";
import type { RecipeType } from "@/types/recipe";
import { useRecipes } from "@/context/recipe-context";
import RecipeError from "@/components/other/recipe-error";
import RecipeSkeleton from "@/components/other/recipe-skeleton";

const RecipeModel = () => {
  const [data, setData] = useState<RecipeType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { recipe, setCurrentRecipe } = useRecipes();
  const isModelOpen = recipe != null;

  useEffect(() => {
    if (!recipe) return;

    const fetchRecipe = async () => {
      setIsLoading(true);
      setError(null);
      fetch(`${config.BASE_URL}/api/recipe/${recipe}`)
        .then((res) => {
          if (!res.ok)
            throw new Error("We couldn’t load this recipe. Please try again.");
          return res.json();
        })
        .then((json) => {
          setData(json.recipe);
          setError(null);
        })
        .catch((err) => {
          setError(err.message || "Something went wrong. Please try again.");
          setData(null);
        })
        .finally(() => setIsLoading(false));
    };

    fetchRecipe();
  }, [recipe]);

  return (
    <Dialog
      open={isModelOpen}
      onOpenChange={() => {
        if (isModelOpen) setCurrentRecipe(null);
      }}
    >
      <DialogContent className="min-w-[70vw] max-h-[95vh] overflow-y-auto">
        {isLoading && <RecipeSkeleton />}

        {error && !isLoading && (
          <RecipeError
            message={error}
            onRetry={() => {
              if (recipe) setCurrentRecipe(recipe);
            }}
          />
        )}

        {!isLoading && !error && data && (
          <>
            <div className="-mx-6 -mt-6 mb-4">
              <img
                src={data.imageUrl}
                alt={data.title}
                className="w-full h-[300px] md:h-[300px] object-cover object-center rounded-t-lg bg-foreground"
              />
            </div>

            <DialogHeader className="mb-6 mx-4">
              <div className="flex flex-row justify-between items-start">
                <div>
                  <DialogTitle className="text-3xl font-bold text-accent-foreground">
                    {data.title}
                  </DialogTitle>
                  <p className="text-xl text-muted-foreground">
                    {data.subtitle}
                  </p>
                </div>

                <div className="mt-1 hidden xl:flex items-center gap-4 text-md text-muted-foreground">
                  <Button variant="outline">
                    <LucideUtensils className="h-5 w-5" />
                    <span>{data.cuisine}</span>
                  </Button>
                  <Button variant="outline">
                    <User className="h-5 w-5" />
                    <span>{data.servings} servings</span>
                  </Button>
                  <Button variant="outline">
                    <LucideClock className="h-5 w-5" />
                    <span>{data.cookTime + data.prepTime} minutes</span>
                  </Button>
                  <Button variant="outline">
                    <LucideFlame className="h-5 w-5" />
                    <span>
                      {data.difficulty.charAt(0).toUpperCase() +
                        data.difficulty.slice(1)}
                    </span>
                  </Button>
                </div>
              </div>

              <DialogDescription className="mt-4 text-base">
                {data.description}
              </DialogDescription>

              <div className="mt-4 xl:hidden flex items-center gap-4 text-md text-muted-foreground">
                <Button variant="outline">
                  <LucideUtensils className="h-5 w-5" />
                  <span>{data.cuisine}</span>
                </Button>
                <Button variant="outline">
                  <User className="h-5 w-5" />
                  <span>{data.servings} servings</span>
                </Button>
                <Button variant="outline">
                  <LucideClock className="h-5 w-5" />
                  <span>{data.cookTime + data.prepTime} minutes</span>
                </Button>
                <Button variant="outline">
                  <LucideFlame className="h-5 w-5" />
                  <span>
                    {data.difficulty.charAt(0).toUpperCase() +
                      data.difficulty.slice(1)}
                  </span>
                </Button>
              </div>
            </DialogHeader>

            <div className="flex flex-col xl:grid grid-cols-3 xl:grid-cols-3 gap-10 mx-4 mb-4">
              <Card className="shadow-2xs rounded-lg">
                <CardContent>
                  <h3 className="text-xl font-semibold mb-4">Ingredients</h3>
                  <ul className="space-y-2 mt-4">
                    {data.ingredients.map((ingredient, index) => (
                      <li key={index} className="flex justify-between">
                        <span className="text-muted-foreground">
                          {ingredient.name}
                        </span>
                        <span>
                          {ingredient.quantity &&
                            ingredient.quantity > 0 &&
                            ingredient.quantity}
                          {ingredient.unit != "g" && " "}
                          {ingredient.unit}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="shadow-2xs rounded-lg xl:col-span-2">
                <CardContent>
                  <h3 className="text-xl font-semibold mb-4">Instructions</h3>
                  <ol className="space-y-6">
                    {data.steps.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ol>
                </CardContent>
              </Card>

              <div className="mt-1 col-span-2 flex flex-wrap items-center gap-3 text-md text-muted-foreground">
                {[
                  { label: "calories", value: data.calories, unit: "" },
                  { label: "carbs", value: data.carbs, unit: "g" },
                  { label: "fat", value: data.fat, unit: "g" },
                  { label: "fiber", value: data.fiber, unit: "g" },
                  { label: "protein", value: data.protein, unit: "g" },
                  {
                    label: "saturated fat",
                    value: data.saturatedFat,
                    unit: "g",
                  },
                  { label: "sodium", value: data.sodium, unit: "mg" },
                  { label: "sugar", value: data.sugars, unit: "g" },
                ].map((nutrient) => (
                  <Button key={nutrient.label} variant="outline">
                    <span>
                      {nutrient.value} {nutrient.unit} {nutrient.label}
                    </span>
                  </Button>
                ))}

                {/* {data.dietaryPreferences &&
                  data.dietaryPreferences.map((peference) => (
                    <Button key={peference} variant="outline">
                      <span>{peference.charAt(0).toLocaleUpperCase() + peference.slice(1)}</span>
                    </Button>
                  ))}

                {data.mealTypes &&
                  data.mealTypes.map((type) => (
                    <Button key={type} variant="outline">
                      <span>{type.charAt(0).toLocaleUpperCase() + type.slice(1)}</span>
                    </Button>
                  ))} */}
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default RecipeModel;
