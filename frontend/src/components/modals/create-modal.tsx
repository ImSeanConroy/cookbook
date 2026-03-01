import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useModal } from "@/context/modal-context";
import CreateRecipeForm from "@/components/forms/create-recipe-form";

const CreateRecipeModal = () => {
  const { isOpen, onClose, type } = useModal();
  const isModelOpen = isOpen && type === "createRecipe";

  return (
    <Dialog open={isModelOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-162.5 h-[80vh] flex flex-col overflow-hidden">
        <div className="h-full min-h-0 space-y-5 flex flex-col">
          <DialogHeader>
            <DialogTitle>Create Recipe</DialogTitle>
            <DialogDescription>
              Add details for your new recipe below. Click create when you're
              done.
            </DialogDescription>
          </DialogHeader>
          <CreateRecipeForm mode="create" />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateRecipeModal;
