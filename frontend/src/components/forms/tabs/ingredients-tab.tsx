import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TabsContent } from "@/components/ui/tabs";
import { X } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";
import { ingredientUnits } from "../create-recipe-form.constants";
import type { RecipeFormValues } from "../create-recipe-form.schema";

type IngredientsTabProps = {
  form: UseFormReturn<RecipeFormValues>;
  isLoading: boolean;
  ingredientFields: Array<{ id: string }>;
  onAddIngredient: () => void;
  onRemoveIngredient: (index: number) => void;
};

const IngredientsTab = ({
  form,
  isLoading,
  ingredientFields,
  onAddIngredient,
  onRemoveIngredient,
}: IngredientsTabProps) => {
  return (
    <TabsContent value="ingredients" className="flex-1 min-h-0 overflow-y-auto">
      <div className="space-y-4 py-6">
        <div className="flex flex-row justify-between">
          <Button type="button" size="sm" onClick={onAddIngredient}>
            Add Ingredient
          </Button>
        </div>

        {ingredientFields.map((item, index) => (
          <div key={item.id} className="space-y-2 rounded-md border p-3">
            <div className="flex gap-3">
              <Input
                placeholder="Name"
                className="flex-3"
                disabled={isLoading}
                {...form.register(`ingredients.${index}.name`)}
              />
              <Input
                type="number"
                min={0.1}
                step="0.1"
                placeholder="Qty"
                className="flex-1"
                disabled={isLoading}
                {...form.register(`ingredients.${index}.quantity`, {
                  valueAsNumber: true,
                })}
              />
              <Select
                value={form.watch(`ingredients.${index}.unit`) || undefined}
                onValueChange={(value) =>
                  form.setValue(`ingredients.${index}.unit`, value, {
                    shouldDirty: true,
                    shouldTouch: true,
                    shouldValidate: true,
                  })
                }
                disabled={isLoading}
              >
                <SelectTrigger className="flex-1 w-full">
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent>
                  {ingredientUnits.map((unitOption) => (
                    <SelectItem key={unitOption.value} value={unitOption.value}>
                      {unitOption.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                type="button"
                variant="destructive"
                disabled={isLoading || ingredientFields.length <= 1}
                onClick={() => onRemoveIngredient(index)}
              >
                <X size={16} />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </TabsContent>
  );
};

export default IngredientsTab;
