import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

import { useModal } from "@/context/modal-context";

const EditRecipeModal = () => {
  const { isOpen, onClose, type } = useModal();
  const isModelOpen = isOpen && type === "editRecipe";

  return (
    <Dialog open={isModelOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[450px] max-h-[90%] overflow-scroll">
        <div className="space-y-5">
          <DialogHeader>
            <DialogTitle>Edit Recipe</DialogTitle>
            <DialogDescription>
              Update the details of your recipe below and click "Update" when
              finished.
            </DialogDescription>
          </DialogHeader>
          <Separator />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditRecipeModal;
