import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TabsContent } from "@/components/ui/tabs";
import type { UseFormReturn } from "react-hook-form";
import {
  cuisines,
  dietaryPreferences,
  difficulties,
  mealTypes,
} from "../../table/filters";
import MultiSelectCommand from "../fields/multi-select-command";
import type { RecipeFormValues } from "../create-recipe-form.schema";

type MetaTabProps = {
  form: UseFormReturn<RecipeFormValues>;
  isLoading: boolean;
};

const MetaTab = ({ form, isLoading }: MetaTabProps) => {
  return (
    <TabsContent value="meta" className="flex-1 min-h-0 overflow-y-auto">
      <div className="space-y-4 py-3">
        <div className="grid md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="cook_time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cook Time (min)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={1}
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
          <FormField
            control={form.control}
            name="servings"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Servings</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={1}
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
          <FormField
            control={form.control}
            name="difficulty"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Difficulty</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={isLoading}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {difficulties.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="mealTypes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Meal Types</FormLabel>
                <FormControl>
                  <MultiSelectCommand
                    value={field.value}
                    onChange={field.onChange}
                    options={mealTypes}
                    placeholder="Select meal types"
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dietaryPreferences"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dietary Preferences</FormLabel>
                <FormControl>
                  <MultiSelectCommand
                    value={field.value ?? []}
                    onChange={field.onChange}
                    options={dietaryPreferences}
                    placeholder="Select dietary preferences"
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cuisine"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cuisine</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={isLoading}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select cuisine" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {cuisines.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </TabsContent>
  );
};

export default MetaTab;
