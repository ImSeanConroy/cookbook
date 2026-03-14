import { useEffect, useState } from "react";
import { AlertCircle, Loader2 } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useModal } from "@/context/modal-context";
import CreateRecipeForm from "@/components/forms/create-recipe-form";
import { config } from "@/config";
import type { RecipeType } from "@/types/recipe";
import InfoState from "@/components/other/info-state";
import type { RecipeFormValues } from "@/components/forms/create-recipe-form.schema";

const toDifficultyValue = (
  difficulty: RecipeType["meta"]["difficulty"],
): RecipeFormValues["difficulty"] => {
  if (difficulty === "advanced") return "advanced";
  if (difficulty === "beginner") return "beginner";
  return "intermediate";
};

const toFormValues = (recipe: RecipeType): RecipeFormValues => ({
  title: recipe.title,
  subtitle: recipe.subtitle,
  description: recipe.description,
  cook_time: Math.max(1, recipe.meta.cookTime ?? 1),
  servings: Math.max(1, recipe.meta.servings ?? 1),
  difficulty: toDifficultyValue(recipe.meta.difficulty),
  mealTypes: recipe.meta.mealTypes ?? [],
  dietaryPreferences: recipe.meta.dietaryPreferences ?? [],
  cuisine: recipe.meta.cuisine,
  image_url: recipe.media.imageUrl,
  calories: Math.max(1, recipe.nutrition.calories ?? 1),
  protein: Math.max(0, recipe.nutrition.protein ?? 0),
  carbs: Math.max(0, recipe.nutrition.carbs ?? 0),
  fat: Math.max(0, recipe.nutrition.fat ?? 0),
  fiber: Math.max(0, recipe.nutrition.fiber ?? 0),
  sugars: Math.max(0, recipe.nutrition.sugars ?? 0),
  saturated_fat: Math.max(0, recipe.nutrition.saturatedFat ?? 0),
  sodium: Math.max(0, recipe.nutrition.sodium ?? 0),
  ingredients: recipe.ingredients.map((ingredient) => ({
    name: ingredient.name,
    quantity: Math.max(0, ingredient.quantity ?? 0),
    unit: ingredient.unit,
  })),
  steps: recipe.steps,
});

const EditRecipeModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const isModelOpen = isOpen && type === "editRecipe";
  const recipeId = data?.recipeId;

  const [initialValues, setInitialValues] = useState<RecipeFormValues | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isModelOpen || !recipeId) {
      setInitialValues(null);
      setError(null);
      setIsLoading(false);
      return;
    }

    const controller = new AbortController();

    const fetchRecipeForEdit = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const res = await fetch(`${config.BASE_URL}/api/recipe/${recipeId}`, {
          signal: controller.signal,
        });

        if (!res.ok) {
          throw new Error("We could not load this recipe. Please try again.");
        }

        const json = await res.json();
        setInitialValues(toFormValues(json.recipe));
      } catch (err: unknown) {
        const isAbortError = err instanceof Error && err.name === "AbortError";
        if (!isAbortError) {
          const message =
            err instanceof Error ? err.message : "Something went wrong. Please try again.";
          setError(message);
          setInitialValues(null);
        }
      } finally {
        setIsLoading(false);
      }
    };

    void fetchRecipeForEdit();

    return () => controller.abort();
  }, [isModelOpen, recipeId]);

  return (
    <Dialog open={isModelOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-162.5 h-[80vh] flex flex-col overflow-hidden">
        <div className="h-full min-h-0 space-y-5 flex flex-col">
          <DialogHeader>
            <DialogTitle>Edit Recipe</DialogTitle>
            <DialogDescription>
              Update the details of your recipe below and click "Update" when
              finished.
            </DialogDescription>
          </DialogHeader>

          {isLoading && (
            <InfoState
              title="Loading recipe..."
              description="Please wait while we load the recipe for editing."
              Icon={Loader2}
            />
          )}

          {!isLoading && error && (
            <InfoState
              title="Failed to load recipe"
              description={error}
              Icon={AlertCircle}
            />
          )}

          {!isLoading && !error && initialValues && (
            <CreateRecipeForm mode="update" initialValues={initialValues} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditRecipeModal;
