import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  LucideActivity,
  LucideClock,
  LucideFlame,
  LucideUtensils,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useRecipes } from "@/context/recipe-context";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { config } from "@/config";
import type { RecipeType } from "@/types/recipe";
import RecipeError from "./recipe-error";
import RecipeSkeleton from "./recipe-skeleton";

const RecipeModel = () => {
  const [data, setData] = useState<RecipeType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
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
          if (!res.ok) throw new Error(`Failed to fetch recipe`);
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
                className="w-full h-[300px] md:h-[275px] object-cover rounded-t-lg bg-foreground"
              />
            </div>

            <DialogHeader className="mb-6 mx-4">
              <div className="flex flex-row justify-between items-start">
                <div>
                  <DialogTitle className="text-3xl font-bold text-foreground">
                    {data.title}
                  </DialogTitle>
                  <p className="text-xl text-muted-foreground">
                    {data.subtitle}
                  </p>
                </div>

                <div className="mt-1 flex items-center gap-4 text-md text-muted-foreground">
                  <Button variant="outline">
                    <LucideUtensils className="h-5 w-5" />
                    <span>{data.cuisine}</span>
                  </Button>
                  <Button variant="outline">
                    <LucideClock className="h-5 w-5" />
                    <span>{data.cookTime + data.prepTime} minutes</span>
                  </Button>
                  <Button variant="outline">
                    <LucideActivity className="h-5 w-5" />
                    <span>500 cals</span>
                  </Button>
                  <Button variant="outline">
                    <LucideFlame className="h-5 w-5" />
                    <span>{data.difficulty.charAt(0).toUpperCase() + data.difficulty.slice(1)}</span>
                  </Button>
                </div>
              </div>

              <DialogDescription className="mt-4 text-base">
                {data.description}
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-3 md:grid-cols-3 gap-10 mx-4 mb-4">
              <Card className="shadow-2xs rounded-lg">
                <CardContent>
                  <h3 className="text-xl font-semibold mb-4">Ingredients</h3>
                  <ul className="space-y-2">
                    {data.ingredients.map((ingredient, index) => (
                      <li key={index} className="flex justify-between">
                        <span>{ingredient.name}</span>
                        <span className="text-muted-foreground">
                          {ingredient.quantity}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="shadow-2xs rounded-lg md:col-span-2">
                <CardContent>
                  <h3 className="text-xl font-semibold mb-4">Instructions</h3>
                  <ol className="space-y-6">
                    {data.steps.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default RecipeModel;
