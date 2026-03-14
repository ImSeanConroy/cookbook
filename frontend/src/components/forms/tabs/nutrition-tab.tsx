import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TabsContent } from "@/components/ui/tabs";
import type { UseFormReturn } from "react-hook-form";
import {
  formatFieldLabel,
  nutritionFields,
  nutritionInputConfig,
} from "../create-recipe-form.constants";
import type { RecipeFormValues } from "../create-recipe-form.schema";

type NutritionTabProps = {
  form: UseFormReturn<RecipeFormValues>;
  isLoading: boolean;
};

const NutritionTab = ({ form, isLoading }: NutritionTabProps) => {
  return (
    <TabsContent value="nutrition" className="flex-1 min-h-0 overflow-y-auto">
      <div className="space-y-4 py-3">
        <div className="grid md:grid-cols-2 gap-4">
          {nutritionFields.map((fieldName) => (
            <FormField
              key={fieldName}
              control={form.control}
              name={fieldName}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {formatFieldLabel(fieldName)} ({nutritionInputConfig[fieldName].unit})
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={nutritionInputConfig[fieldName].min}
                      step={nutritionInputConfig[fieldName].step}
                      disabled={isLoading}
                      value={field.value}
                      onChange={(event) => field.onChange(Number(event.target.value))}
                      onBlur={field.onBlur}
                      name={field.name}
                      ref={field.ref}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>
      </div>
    </TabsContent>
  );
};

export default NutritionTab;
