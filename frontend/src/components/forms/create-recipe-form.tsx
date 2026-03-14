import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { useEffect } from "react";

import { Form } from "@/components/ui/form";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useModal } from "@/context/modal-context";
import {
  useRecipeMutations,
  type RecipeMutationInput,
} from "@/context/use-recipe-mutations";
import BasicTab from "./tabs/basic-tab";
import IngredientsTab from "./tabs/ingredients-tab";
import MetaTab from "./tabs/meta-tab";
import NutritionTab from "./tabs/nutrition-tab";
import StepsTab from "./tabs/steps-tab";
import { recipeFormSchema, type RecipeFormValues } from "./create-recipe-form.schema";

type CreateRecipeFormProps = {
  mode?: "create" | "update";
  initialValues?: RecipeFormValues;
};

const defaultRecipeFormValues: RecipeFormValues = {
  title: "",
  subtitle: "",
  description: "",

  cook_time: 1,
  servings: 1,
  difficulty: "beginner",
  cuisine: "",
  mealTypes: [],
  dietaryPreferences: [],
  image_url: "",

  calories: 1,
  protein: 0,
  carbs: 0,
  fat: 0,
  fiber: 0,
  sugars: 0,
  saturated_fat: 0,
  sodium: 0,

  ingredients: [{ name: "", quantity: 1, unit: "" }],
  steps: [""],
};

const CreateRecipeForm = ({
  mode = "create",
  initialValues,
}: CreateRecipeFormProps) => {
  const { onClose, data } = useModal();
  const { createRecipe, updateRecipe, isMutating } = useRecipeMutations();

  const form = useForm<RecipeFormValues>({
    resolver: zodResolver(recipeFormSchema),
    defaultValues: initialValues ?? defaultRecipeFormValues,
  });

  useEffect(() => {
    if (mode === "update" && initialValues) {
      form.reset(initialValues);
      return;
    }

    if (mode === "create") {
      form.reset(defaultRecipeFormValues);
    }
  }, [mode, initialValues, form]);

  const ingredientsArray = useFieldArray({
    control: form.control,
    name: "ingredients",
  });

  const onSubmit = async (values: RecipeFormValues) => {
    const payload: RecipeMutationInput = {
      ...values,
      dietaryPreferences: values.dietaryPreferences ?? [],
    };

    try {
      if (mode === "update") {
        if (!data?.recipeId) {
          throw new Error("Missing recipe id for update");
        }

        await updateRecipe(data.recipeId, payload);
      } else {
        await createRecipe(payload);
      }
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  const addIngredient = () => {
    ingredientsArray.append({ name: "", quantity: 1, unit: "" });
  };

  const removeIngredient = (indexToRemove: number) => {
    if (ingredientsArray.fields.length <= 1) {
      return;
    }

    ingredientsArray.remove(indexToRemove);
  };

  const addStep = () => {
    form.setValue("steps", [...form.getValues("steps"), ""], {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const steps = form.watch("steps");

  const removeStep = (indexToRemove: number) => {
    const currentSteps = form.getValues("steps");
    if (currentSteps.length <= 1) {
      return;
    }

    form.setValue(
      "steps",
      currentSteps.filter((_, index) => index !== indexToRemove),
      { shouldDirty: true, shouldTouch: true, shouldValidate: true },
    );
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="h-full min-h-0 space-y-6 flex flex-col"
      >
        <Tabs defaultValue="basic" className="w-full flex-1 min-h-0 flex flex-col">
          <TabsList className="grid grid-cols-5 w-full shrink-0">
            <TabsTrigger value="basic">Basic</TabsTrigger>
            <TabsTrigger value="meta">Meta</TabsTrigger>
            <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
            <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
            <TabsTrigger value="steps">Steps</TabsTrigger>
          </TabsList>

          <BasicTab form={form} isLoading={isMutating} />
          <MetaTab form={form} isLoading={isMutating} />
          <NutritionTab form={form} isLoading={isMutating} />
          <IngredientsTab
            form={form}
            isLoading={isMutating}
            ingredientFields={ingredientsArray.fields}
            onAddIngredient={addIngredient}
            onRemoveIngredient={removeIngredient}
          />
          <StepsTab
            form={form}
            isLoading={isMutating}
            steps={steps}
            onAddStep={addStep}
            onRemoveStep={removeStep}
          />
        </Tabs>

        <div className="flex justify-end gap-4 mt-auto shrink-0 pt-2">
          <Button
            type="button"
            disabled={isMutating}
            variant="outline"
            onClick={onClose}
          >
            {isMutating && <Spinner />}
            Close
          </Button>
          <Button type="submit" disabled={isMutating}>
            {isMutating && <Spinner />}
            {mode === "update" ? "Update Recipe" : "Create Recipe"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateRecipeForm;
