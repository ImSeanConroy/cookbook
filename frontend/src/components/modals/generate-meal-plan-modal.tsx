import { useEffect, useState } from "react";
import {
  AlertCircle,
  CalendarDays,
  LucideActivity,
  LucideClock,
  LucideFlame,
} from "lucide-react";

import { cookTime, cuisines, difficulties } from "@/components/table/filters";
import { useModal } from "@/context/modal-context";
import { useRecipeMutations } from "@/context/use-recipe-mutations";
import type {
  CookTimeFilterType,
  DifficultyLevelType,
  PortionPresetType,
  WeeklyMealPlanType,
} from "@/types/meal-plan";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { TableFilter } from "@/components/table/table-filter";

const PORTION_PRESET_OPTIONS: Array<{
  value: PortionPresetType;
  label: string;
  description: string;
  profile: number[];
}> = [
    {
      value: "2x2",
      label: "2x2",
      description: "5 meals, 2 portions each",
      profile: [2, 2, 2, 2, 2],
    },
    {
      value: "3x2",
      label: "3x2",
      description: "2 meals at 3 portions, 3 meals at 2 portions",
      profile: [3, 3, 2, 2, 2],
    },
    {
      value: "4x2",
      label: "4x2",
      description: "2 meals at 4 portions, 3 meals at 2 portions",
      profile: [4, 4, 2, 2, 2],
    },
    {
      value: "4x3",
      label: "4x3",
      description: "3 meals at 4 portions, 2 meals at 3 portions",
      profile: [4, 4, 4, 3, 3],
    },
  ];

const GenerateMealPlanModal = () => {
  const { isOpen, onClose, onOpen, type } = useModal();
  const { generateMealPlan, isMutating, error } = useRecipeMutations();

  const isModalOpen = isOpen && type === "generateMealPlan";

  const [selectedCuisine, setSelectedCuisine] = useState<string[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevelType[]>([]);
  const [selectedCookTime, setSelectedCookTime] = useState<CookTimeFilterType[]>([]);
  const [portionPreset, setPortionPreset] = useState<PortionPresetType>("2x2");

  const [mealPlan, setMealPlan] = useState<WeeklyMealPlanType | null>(null);

  const selectedPortionPreset =
    PORTION_PRESET_OPTIONS.find((option) => option.value === portionPreset) ??
    PORTION_PRESET_OPTIONS[0];
  const selectedPresetTotalPortions = selectedPortionPreset.profile.reduce(
    (total, portions) => total + portions,
    0,
  );

  useEffect(() => {
    if (!isModalOpen) {
      setSelectedCuisine([]);
      setSelectedDifficulty([]);
      setSelectedCookTime([]);
      setPortionPreset("2x2");
      setMealPlan(null);
      return;
    }
  }, [isModalOpen]);

  const handleGenerate = async (event: React.FormEvent) => {
    event.preventDefault();
    setMealPlan(null);

    try {
      const generated = await generateMealPlan({
        cuisine: selectedCuisine,
        difficulty: selectedDifficulty,
        cookTime: selectedCookTime,
        portionPreset,
      });
      setMealPlan(generated);
    } catch {
      console.error("Error generating meal plan:", error);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-175 h-[88vh] flex flex-col overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CalendarDays className="h-5 w-5" />
            Meals This Week
          </DialogTitle>
          <DialogDescription>
            Choose a clear portion format and optional cuisine, difficulty, and cook-time filters to generate 5 recipes for this week.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 min-h-0 overflow-y-auto pr-1 space-y-6">
          <form onSubmit={handleGenerate} className="mb-0">

            <div className="flex flex-col gap-4">
              <div className="space-y-3">
                <Label>Portion format</Label>
                <div className="grid grid-cols-4 gap-2">
                  {PORTION_PRESET_OPTIONS.map((option) => {
                    const isSelected = option.value === portionPreset;

                    return (
                      <button
                        key={option.value}
                        type="button"
                        disabled={isMutating}
                        onClick={() => setPortionPreset(option.value)}
                        className={cn(
                          "rounded-md border p-3 text-left transition-colors",
                          isSelected
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/40",
                          isMutating && "cursor-not-allowed opacity-70",
                        )}
                      >
                        <p className="text-sm font-semibold">{option.label}</p>
                        <p className="text-xs text-muted-foreground">{option.description}</p>
                      </button>
                    );
                  })}
                </div>
                <p className="text-xs text-muted-foreground">
                  Selected: {selectedPortionPreset.label} ({selectedPresetTotalPortions} total portions)
                </p>
              </div>

              <div className="flex flex-row gap-2 justify-between items-end mb-3">
                <div className="flex flex-row gap-2 flex-wrap">
                  <TableFilter
                    title="Cuisine"
                    filterKey="cuisine"
                    value={selectedCuisine}
                    onChange={setSelectedCuisine}
                    options={cuisines}
                  />
                  <TableFilter
                    title="Cook time"
                    filterKey="cookTime"
                    value={selectedCookTime}
                    onChange={(values) =>
                      setSelectedCookTime(values as CookTimeFilterType[])
                    }
                    options={cookTime}
                  />
                  <TableFilter
                    title="Difficulty"
                    filterKey="difficulty"
                    value={selectedDifficulty}
                    onChange={(values) =>
                      setSelectedDifficulty(values as DifficultyLevelType[])
                    }
                    options={difficulties}
                  />
                </div>

                <Button type="submit" disabled={isMutating} className="cursor-pointer">
                  {isMutating && <Spinner className="mr-2 h-4 w-4" />}
                  Generate
                </Button>
              </div>
            </div>

            {error && (
              <div className="rounded-md border border-destructive/20 bg-destructive/10 px-3 py-2 text-sm text-destructive flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                <span>{error}</span>
              </div>
            )}


          </form>

          {mealPlan && (
            <div className="space-y-4 pt-2">
              <div className="space-y-4">
                {mealPlan.meals.map((meal) => (
                  <Card
                    key={meal.recipe.id}
                    className="group overflow-hidden rounded-lg border-border/60 p-0 shadow-xs cursor-pointer"
                    onClick={() => onOpen("showRecipe", { recipeId: meal.recipe.id })}
                  >
                    <div className="grid grid-cols-5 items-stretch">
                      <img
                        src={meal.recipe.imageUrl}
                        alt={meal.recipe.title}
                        className="block h-full min-h-32 w-full object-cover object-center col-span-2"
                        loading="lazy"
                      />

                      <CardContent className="space-y-3 p-4 col-span-3">
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge variant="secondary" className="rounded-sm">
                            {meal.recipe.cuisine}
                          </Badge>
                          <Badge variant="outline" className="rounded-sm">
                            {meal.recipe.portions} portions
                          </Badge>
                        </div>

                        <div className="space-y-1">
                          <p className="truncate text-base font-semibold">{meal.recipe.title}</p>
                          <p className="line-clamp-2 text-sm text-muted-foreground">
                            {meal.recipe.subtitle}
                          </p>
                        </div>

                        <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <LucideClock className="h-3 w-3" />
                            <span>{meal.recipe.cookTime} min</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <LucideActivity className="h-3 w-3" />
                            <span>{meal.recipe.portions} portions</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <LucideFlame className="h-3 w-3" />
                            <span className="capitalize">{meal.recipe.difficulty}</span>
                          </div>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GenerateMealPlanModal;
