"use client";

import type { Table } from "@tanstack/react-table";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  cuisines,
  totalTime,
  difficulties,
  mealTypes,
  dietaryPreferences,
} from "./data";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import ThemeToggle from "../ui/theme-toggle";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getRandomImageUrl } from "@/lib/images";
import {
  LucideActivity,
  LucideClock,
  LucideFlame,
  LucideUtensils,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const recipe = {
  title: "Herby Crusted Chicken",
  subtitle: "with Garlic Bread and Roasted Vegetables",
  description:
    "Juicy chicken breasts are coated in creamy mayonnaise, then topped with a crisp, golden layer of panko breadcrumbs mixed with fragrant Italian herbs. As the chicken bakes, it develops a deliciously crunchy crust that gives way to tender, succulent meat inside. Served alongside warm, buttery garlic bread and a colorful medley of roasted seasonal vegetables, this dish offers the perfect balance of comfort and freshness. Finished with a sweet chilli mayonnaise for a subtle kick, it’s a hearty yet elegant dinner that’s as easy to make as it is satisfying to eat.",
  prep_time: 20,
  cook_time: 25,
  servings: 2,
  difficulty: "beginner",
  cuisine: "Classic",
  calories: 620,
  ingredients: [
    { name: "Chicken Breast", quantity: "2" },
    { name: "Mayonnaise", quantity: "50g" },
    { name: "Panko Breadcrumbs", quantity: "25g" },
    { name: "Italian Style Herbs", quantity: "1 tsp" },
    { name: "Olive Oil", quantity: "1 tbsp" },
    { name: "Sweet Chilli Sauce", quantity: "32g" },
    { name: "Garlic Bread", quantity: "2 slices" },
    {
      name: "Mixed Vegetables (carrots, courgette, peppers)",
      quantity: "250g",
    },
    { name: "Salt & Pepper", quantity: "to taste" },
  ],
  steps: [
    "Preheat your oven to 200°C (180°C fan) / 400°F. Place the chicken breasts onto a baking tray and season with salt and pepper. Spread mayonnaise over the chicken. Mix breadcrumbs, herbs, and olive oil.",
    "Press the breadcrumb mixture onto the chicken. Roast on the top shelf for 25–30 minutes until golden and cooked through.",
    "Roast the vegetables on a separate tray with olive oil, salt, and pepper for 20–25 minutes. Bake garlic bread per packet instructions.",
    "Mix remaining mayonnaise with sweet chilli sauce. Slice the chicken and serve with vegetables, garlic bread, and sweet chilli mayo.",
  ],
};

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center gap-2">
        {table.getColumn("cuisine") && (
          <DataTableFacetedFilter
            column={table.getColumn("cuisine")}
            title="Cuisine"
            options={cuisines}
          />
        )}

        {table.getColumn("totalTime") && (
          <DataTableFacetedFilter
            column={table.getColumn("totalTime")}
            title="Cook Time"
            options={totalTime}
          />
        )}

        {table.getColumn("difficulty") && (
          <DataTableFacetedFilter
            column={table.getColumn("difficulty")}
            title="Difficulty"
            options={difficulties}
          />
        )}

        {table.getColumn("dietaryPreference") && (
          <DataTableFacetedFilter
            column={table.getColumn("dietaryPreference")}
            title="Dietary Preference"
            options={dietaryPreferences}
          />
        )}

        {table.getColumn("mealType") && (
          <DataTableFacetedFilter
            column={table.getColumn("mealType")}
            title="Meal Type"
            options={mealTypes}
          />
        )}

        <Dialog>
          <DialogTrigger>
            <Button variant="outline" size="sm">
              Open Recipe
            </Button>
          </DialogTrigger>

          <DialogContent className="min-w-[70vw] max-h-[90vh] overflow-y-auto">
            {/* Hero Image */}
            <div className="-mx-6 -mt-6 mb-4">
              <img
                src={getRandomImageUrl()}
                alt={recipe.title}
                className="w-full h-[300px] md:h-[275px] object-cover rounded-t-lg"
              />
            </div>

            <DialogHeader className="mb-6 mx-4">
              <div className="flex flex-row justify-between items-start">
                <div>
                  <DialogTitle className="text-3xl font-bold text-foreground">
                    {recipe.title}
                  </DialogTitle>
                  <p className="text-xl text-muted-foreground">
                    {recipe.subtitle}
                  </p>
                </div>

                <div className="mt-1 flex items-center gap-4 text-md text-muted-foreground">
                  <Button variant="outline">
                    <LucideUtensils className="h-5 w-5" />
                    <span>American</span>
                  </Button>
                  <Button variant="outline">
                    <LucideClock className="h-5 w-5" />
                    <span>30 minutes</span>
                  </Button>
                  <Button variant="outline">
                    <LucideActivity className="h-5 w-5" />
                    <span>500 cals</span>
                  </Button>
                  <Button variant="outline">
                    <LucideFlame className="h-5 w-5" />
                    <span>Intermedate</span>
                  </Button>
                </div>
              </div>

              <DialogDescription className="mt-4 text-base">
                {recipe.description}
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-3 md:grid-cols-3 gap-10 mx-4 mb-4">
              <Card className="shadow-2xs rounded-lg">
                <CardContent>
                  <h3 className="text-xl font-semibold mb-4">Ingredients</h3>
                  <ul className="space-y-2">
                    {recipe.ingredients.map((ingredient, index) => (
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
                    {recipe.steps.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            </div>
          </DialogContent>
        </Dialog>

        {isFiltered && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => table.resetColumnFilters()}
          >
            Reset <X />
          </Button>
        )}
      </div>

      <div className="flex items-center gap-2">
        <Input
          placeholder="Search recipes..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        <ThemeToggle />
      </div>
    </div>
  );
}
