import { useEffect, useState } from "react";
import {
  AlertCircle,
  Loader2,
  LucideClock,
  LucideFlame,
  LucideUtensils,
  User,
} from "lucide-react";

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
import { useModal } from "@/context/modal-context";
import InfoState from "@/components/other/info-state";

const formatIngredientAmount = (quantity: number, unit: string) => {
  const normalizedUnit = unit.trim();

  if (quantity <= 0) {
    return normalizedUnit;
  }

  return normalizedUnit ? `${quantity} ${normalizedUnit}` : `${quantity}`;
};

const RecipeModel = () => {
  const [recipeData, setRecipeData] = useState<RecipeType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { isOpen, onClose, type, data } = useModal();
  const isModalOpen = isOpen && type === "showRecipe";

  const recipe = data?.recipeId;

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
        setRecipeData(json.recipe);
        setError(null);
      })
      .catch((err) => {
        setError(err.message || "Something went wrong. Please try again.");
        setRecipeData(null);
      })
      .finally(() => setIsLoading(false));
    };

    fetchRecipe();
  }, [recipe]);

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="min-w-[70vw] max-h-[95vh] overflow-y-auto">
        {isLoading && (
          <InfoState
            title="Loading recipe..."
            description="Please wait while we fetch the recipe."
            Icon={Loader2}
            spinner={true}
          />
        )}

        {error && !isLoading && (
          <InfoState
            title="Failed to load recipe"
            description="Something went wrong while fetching the recipe."
            Icon={AlertCircle}
          />
        )}

        {!isLoading && !error && recipeData && (
          <>
            <div className="-mx-6 -mt-6 mb-4">
              <img
                src={recipeData.media.imageUrl}
                alt={recipeData.title}
                className="w-full h-[300px] object-cover rounded-t-lg"
              />
            </div>

            <DialogHeader className="sm:mb-6 sm:mx-4">
              <div className="flex flex-col gap-4 xl:flex-row xl:justify-between xl:items-start">
                <div className="min-w-0 flex-1">
                  <DialogTitle className="text-3xl font-bold break-words mb-1">
                    {recipeData.title}
                  </DialogTitle>
                  <p className="text-xl text-muted-foreground break-words">
                    {recipeData.subtitle}
                  </p>
                </div>

                <div className="hidden xl:flex flex-wrap items-center gap-4 text-md text-muted-foreground">
                  <Button variant="outline" size="sm">
                    <LucideUtensils className="h-5 w-5" />
                    {recipeData.meta.cuisine}
                  </Button>
                  <Button variant="outline" size="sm">
                    <User className="h-5 w-5" />
                    {recipeData.meta.servings} servings
                  </Button>
                  <Button variant="outline" size="sm">
                    <LucideClock className="h-5 w-5" />
                    {recipeData.meta.cookTime} minutes
                  </Button>
                  <Button variant="outline" size="sm">
                    <LucideFlame className="h-5 w-5" />
                    {recipeData.meta.difficulty.charAt(0).toUpperCase() +
                      recipeData.meta.difficulty.slice(1)}
                  </Button>
                </div>
              </div>

              <DialogDescription className="mt-4 text-base">
                {recipeData.description}
              </DialogDescription>

              <div className="mt-4 xl:hidden flex flex-wrap items-center gap-2 text-md text-muted-foreground">
                <Button variant="outline" size="sm">
                  <LucideUtensils className="h-5 w-5" />
                  {recipeData.meta.cuisine}
                </Button>
                <Button variant="outline" size="sm">
                  <User className="h-5 w-5" />
                  {recipeData.meta.servings} servings
                </Button>
                <Button variant="outline" size="sm">
                  <LucideClock className="h-5 w-5" />
                  {recipeData.meta.cookTime} minutes
                </Button>
                <Button variant="outline" size="sm">
                  <LucideFlame className="h-5 w-5" />
                  {recipeData.meta.difficulty.charAt(0).toUpperCase() +
                    recipeData.meta.difficulty.slice(1)}
                </Button>
              </div>
            </DialogHeader>

            <div className="flex flex-col xl:grid xl:grid-cols-3 gap-6 sm:gap-8 sm:mx-4 sm:mb-4">
              <Card className="shadow-2xs rounded-lg">
                <CardContent>
                  <h3 className="text-xl font-semibold mb-4">Ingredients</h3>
                  <ul className="space-y-2 mt-4">
                    {recipeData.ingredients.map((ingredient, index) => (
                      <li key={index} className="flex justify-between gap-4">
                        <span className="min-w-0 break-words text-muted-foreground">
                          {ingredient.name}
                        </span>
                        <span className="shrink-0">
                          {formatIngredientAmount(
                            ingredient.quantity,
                            ingredient.unit
                          )}
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
                    {recipeData.steps.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ol>
                </CardContent>
              </Card>

              <div className="xl:col-span-3 flex flex-wrap items-center gap-3 text-md text-muted-foreground">
                {[
                  ["calories", recipeData.nutrition.calories, ""],
                  ["carbs", recipeData.nutrition.carbs, "g"],
                  ["fat", recipeData.nutrition.fat, "g"],
                  ["fiber", recipeData.nutrition.fiber, "g"],
                  ["protein", recipeData.nutrition.protein, "g"],
                  ["saturated fat", recipeData.nutrition.saturatedFat, "g"],
                  ["sodium", recipeData.nutrition.sodium, "mg"],
                  ["sugar", recipeData.nutrition.sugars, "g"],
                ].map(([label, value, unit]) => (
                  <Button
                    key={label}
                    variant="outline"
                    size="sm"
                    className="whitespace-nowrap"
                  >
                    {value}
                    {unit} {label}
                  </Button>
                ))}
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default RecipeModel;
