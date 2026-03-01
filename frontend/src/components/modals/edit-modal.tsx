import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useModal } from "@/context/modal-context";
import CreateRecipeForm from "@/components/forms/create-recipe-form";


const EditRecipeModal = () => {
  const { isOpen, onClose, type } = useModal();
  const isModelOpen = isOpen && type === "editRecipe";

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
         <CreateRecipeForm mode="update" />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditRecipeModal;
