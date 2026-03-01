import { Button } from "@/components/ui/button";
import { TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";
import type { RecipeFormValues } from "../create-recipe-form.schema";

type StepsTabProps = {
  form: UseFormReturn<RecipeFormValues>;
  isLoading: boolean;
  steps: string[];
  onAddStep: () => void;
  onRemoveStep: (index: number) => void;
};

const StepsTab = ({
  form,
  isLoading,
  steps,
  onAddStep,
  onRemoveStep,
}: StepsTabProps) => {
  return (
    <TabsContent value="steps" className="flex-1 min-h-0 overflow-y-auto">
      <div className="space-y-4 py-6">
        <div className="flex flex-row justify-between">
          <Button size="sm" type="button" onClick={onAddStep}>
            Add Step
          </Button>
        </div>
        {steps.map((_, index) => (
          <div key={index} className="space-y-2 rounded-md border p-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Step {index + 1}</p>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                disabled={isLoading || steps.length <= 1}
                onClick={() => onRemoveStep(index)}
              >
                <X size={16} />
              </Button>
            </div>
            <div>
              <Textarea
                placeholder={`Describe step ${index + 1}`}
                disabled={isLoading}
                {...form.register(`steps.${index}`)}
              />
            </div>
          </div>
        ))}
      </div>
    </TabsContent>
  );
};

export default StepsTab;
