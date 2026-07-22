import CreateRecipeModal from "@/components/modals/create-modal";
import EditRecipeModal from "@/components/modals/edit-modal";
import DeleteRecipeModal from "@/components/modals/delete-modal";
import RecipeModel from "@/components/modals/recipe-modal";
import GenerateMealPlanModal from "@/components/modals/generate-meal-plan-modal";

export const Modals = () => {
  return (
    <>
      <CreateRecipeModal />
      <EditRecipeModal />
      <DeleteRecipeModal />
      <RecipeModel />
      <GenerateMealPlanModal />
    </>
  );
};
