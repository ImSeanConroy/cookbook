import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { TabsContent } from "@/components/ui/tabs";
import type { UseFormReturn } from "react-hook-form";
import type { RecipeFormValues } from "../create-recipe-form.schema";

type BasicTabProps = {
  form: UseFormReturn<RecipeFormValues>;
  isLoading: boolean;
};

const BasicTab = ({ form, isLoading }: BasicTabProps) => {
  return (
    <TabsContent value="basic" className="flex-1 min-h-0 overflow-y-auto">
      <div className="space-y-4 py-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input disabled={isLoading} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subtitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subtitle</FormLabel>
              <FormControl>
                <Input disabled={isLoading} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea disabled={isLoading} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL</FormLabel>
              <FormControl>
                <Input {...field} className="col-span-2" disabled={isLoading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </TabsContent>
  );
};

export default BasicTab;
